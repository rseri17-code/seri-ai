import type { ChatMessage } from "@/lib/ai";

export const ASK_SESSION_VERSION = "v1";
export const ASK_SESSION_MAX_MESSAGES = 20;
export const ASK_SESSION_MAX_CONTENT_LENGTH = 2000;

export function askSessionKey(mode: "ask" | "interview") {
  return `seri.ai:ask-session:${ASK_SESSION_VERSION}:${mode}`;
}

function isChatRole(value: unknown): value is ChatMessage["role"] {
  return value === "user" || value === "assistant";
}

export function serializeAskSession(messages: ChatMessage[]): string | null {
  const bounded = messages
    .filter((message) => isChatRole(message.role) && typeof message.content === "string" && message.content.trim().length > 0)
    .map((message) => ({ role: message.role, content: message.content.slice(0, ASK_SESSION_MAX_CONTENT_LENGTH) }))
    .slice(-ASK_SESSION_MAX_MESSAGES);
  if (!bounded.some((message) => message.role === "user")) {
    return null;
  }
  return JSON.stringify({ version: ASK_SESSION_VERSION, messages: bounded });
}

export function deserializeAskSession(raw: string | null): ChatMessage[] | null {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as { version?: unknown; messages?: unknown };
    if (parsed?.version !== ASK_SESSION_VERSION || !Array.isArray(parsed.messages)) {
      return null;
    }
    const messages = parsed.messages
      .filter(
        (message): message is ChatMessage =>
          typeof message === "object" &&
          message !== null &&
          isChatRole((message as ChatMessage).role) &&
          typeof (message as ChatMessage).content === "string" &&
          (message as ChatMessage).content.trim().length > 0
      )
      .map((message) => ({ role: message.role, content: message.content.slice(0, ASK_SESSION_MAX_CONTENT_LENGTH) }))
      .slice(-ASK_SESSION_MAX_MESSAGES);
    if (!messages.some((message) => message.role === "user")) {
      return null;
    }
    return messages;
  } catch {
    return null;
  }
}
