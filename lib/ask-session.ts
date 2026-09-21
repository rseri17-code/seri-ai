import type { ChatMessage } from "@/lib/ai";

export const ASK_SESSION_VERSION = "v2";
export const LEGACY_ASK_SESSION_VERSIONS = ["v1"] as const;
export const ASK_SESSION_MAX_MESSAGES = 20;
export const ASK_SESSION_MAX_CONTENT_LENGTH = 2000;
export const ASK_THREAD_HASH_PARAM = "ask";
export const ASK_THREAD_MAX_HASH_CHARS = 6000;

export type AskSessionSource = {
  title: string;
  url: string;
  excerpt: string;
};

export type AskSessionPacket = {
  sources: AskSessionSource[];
  meta?: {
    answer_mode?: string;
    retrieval_mode?: string;
    source_count?: number;
    question_category?: string;
    framework_layers?: string[];
    related_pages?: string[];
    public_boundary?: string;
    assistant_identity?: string;
    llm_provider?: string;
    llm_used?: boolean;
    llm_skip_reason?: string | null;
    latency_ms?: number;
    budget?: {
      rate_limit?: number;
      rate_window_ms?: number;
      embedding_timeout_ms?: number;
      vector_timeout_ms?: number;
      synthesis_timeout_ms?: number;
      vector_match_count?: number;
      returned_source_limit?: number;
    };
  };
  followUps?: string[];
};

export type AskSessionMessage = ChatMessage & {
  packet?: AskSessionPacket;
};

export function askSessionKey(mode: "ask" | "interview") {
  // Shared by /ask and the site-wide Ask dock so a thread continues across those surfaces.
  return `seri.ai:ask-session:${ASK_SESSION_VERSION}:${mode}`;
}

export function legacyAskSessionKeys(mode: "ask" | "interview") {
  return LEGACY_ASK_SESSION_VERSIONS.map((version) => `seri.ai:ask-session:${version}:${mode}`);
}

function isChatRole(value: unknown): value is ChatMessage["role"] {
  return value === "user" || value === "assistant";
}

function isSource(value: unknown): value is AskSessionSource {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as AskSessionSource).title === "string" &&
    typeof (value as AskSessionSource).url === "string" &&
    typeof (value as AskSessionSource).excerpt === "string"
  );
}

function sanitizePacket(value: unknown): AskSessionPacket | undefined {
  if (typeof value !== "object" || value === null || !("sources" in value) || !Array.isArray((value as AskSessionPacket).sources)) {
    return undefined;
  }
  const raw = value as AskSessionPacket;
  const sources = raw.sources.filter(isSource).slice(0, 4).map((source) => ({
    title: source.title.slice(0, 180),
    url: source.url.slice(0, 240),
    excerpt: source.excerpt.slice(0, 220)
  }));
  const followUps = Array.isArray(raw.followUps)
    ? raw.followUps.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.slice(0, 240)).slice(0, 4)
    : undefined;
  const meta = raw.meta && typeof raw.meta === "object" ? raw.meta : undefined;
  return {
    sources,
    ...(meta ? { meta } : {}),
    ...(followUps?.length ? { followUps } : {})
  };
}

function boundMessages(messages: AskSessionMessage[]): AskSessionMessage[] {
  return messages
    .filter((message) => isChatRole(message.role) && typeof message.content === "string" && message.content.trim().length > 0)
    .map((message) => {
      const packet = sanitizePacket(message.packet);
      return {
        role: message.role,
        content: message.content.slice(0, ASK_SESSION_MAX_CONTENT_LENGTH),
        ...(packet ? { packet } : {})
      };
    })
    .slice(-ASK_SESSION_MAX_MESSAGES);
}

export function serializeAskSession(messages: AskSessionMessage[]): string | null {
  const bounded = boundMessages(messages);
  if (!bounded.some((message) => message.role === "user")) {
    return null;
  }
  return JSON.stringify({ version: ASK_SESSION_VERSION, messages: bounded });
}

export function deserializeAskSession(raw: string | null): AskSessionMessage[] | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as { version?: unknown; messages?: unknown };
    if (parsed?.version !== ASK_SESSION_VERSION || !Array.isArray(parsed.messages)) {
      return null;
    }
    const messages = boundMessages(
      parsed.messages.filter(
        (message): message is AskSessionMessage =>
          typeof message === "object" &&
          message !== null &&
          isChatRole((message as AskSessionMessage).role) &&
          typeof (message as AskSessionMessage).content === "string" &&
          (message as AskSessionMessage).content.trim().length > 0
      )
    );
    if (!messages.some((message) => message.role === "user")) {
      return null;
    }
    return messages;
  } catch {
    return null;
  }
}

function compactMessagesForHash(messages: AskSessionMessage[], includePackets: boolean): AskSessionMessage[] {
  return boundMessages(messages)
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, includePackets ? 800 : 1200),
      ...(includePackets && message.packet
        ? {
            packet: {
              sources: message.packet.sources.map((source) => ({
                title: source.title.slice(0, 120),
                url: source.url.slice(0, 180),
                excerpt: source.excerpt.slice(0, 140)
              })),
              ...(message.packet.meta
                ? {
                    meta: {
                      answer_mode: message.packet.meta.answer_mode,
                      retrieval_mode: message.packet.meta.retrieval_mode,
                      source_count: message.packet.meta.source_count,
                      question_category: message.packet.meta.question_category,
                      framework_layers: message.packet.meta.framework_layers,
                      related_pages: message.packet.meta.related_pages?.slice(0, 4),
                      public_boundary: message.packet.meta.public_boundary,
                      assistant_identity: message.packet.meta.assistant_identity,
                      llm_provider: message.packet.meta.llm_provider,
                      llm_used: message.packet.meta.llm_used,
                      llm_skip_reason: message.packet.meta.llm_skip_reason ?? null,
                      latency_ms: message.packet.meta.latency_ms
                    }
                  }
                : {}),
              ...(message.packet.followUps?.length ? { followUps: message.packet.followUps } : {})
            }
          }
        : message.packet?.followUps?.length
          ? { packet: { sources: [], followUps: message.packet.followUps } }
          : {})
    }));
}

export function encodeAskThreadHash(messages: AskSessionMessage[]): string | null {
  for (const includePackets of [true, false]) {
    const serialized = serializeAskSession(compactMessagesForHash(messages, includePackets));
    if (!serialized) {
      return null;
    }
    const encoded = encodeURIComponent(serialized);
    const hashBody = `${ASK_THREAD_HASH_PARAM}=${encoded}`;
    if (hashBody.length <= ASK_THREAD_MAX_HASH_CHARS) {
      return hashBody;
    }
  }
  return null;
}

export function decodeAskThreadHash(hash: string | null | undefined): AskSessionMessage[] | null {
  if (!hash) {
    return null;
  }
  const trimmed = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!trimmed) {
    return null;
  }
  try {
    const params = new URLSearchParams(trimmed);
    return deserializeAskSession(params.get(ASK_THREAD_HASH_PARAM));
  } catch {
    return null;
  }
}

export function toChatHistory(messages: AskSessionMessage[], limit = 6): ChatMessage[] {
  return messages
    .filter((message) => isChatRole(message.role) && message.content.trim().length > 0)
    .slice(-limit)
    .map((message) => ({ role: message.role, content: message.content }));
}

export function fullAskHref(messages: AskSessionMessage[]): string {
  const hashBody = encodeAskThreadHash(messages);
  return hashBody ? `/ask#${hashBody}` : "/ask";
}
