/**
 * Server Ask LLM helpers. Keep this module off Client Component import graphs
 * (`components/chat.tsx` imports `lib/ai.ts` only). Runtime env is read with
 * bracket access so Vercel Preview secrets are not inlined empty at build.
 */
import { isPublicSafe } from "@/lib/compliance";

export const ASK_LLM_PROVIDERS = ["none", "groq", "ollama"] as const;
export type AskLlmProvider = (typeof ASK_LLM_PROVIDERS)[number];
export type AskLlmSkipReason =
  | "provider_none"
  | "missing_credentials"
  | "thin_retrieval"
  | "validation_rejected"
  | "provider_error";

export type AskLlmContextSource = {
  title: string;
  url: string;
  content: string;
};

export type AskLlmPassage = AskLlmContextSource & {
  id: string;
};

export type ResolvedAskLlmProvider =
  | { kind: "none"; skipReason: "provider_none" | "missing_credentials" }
  | {
      kind: "groq";
      model: string;
      apiKey: string;
      completionsUrl: string;
    }
  | {
      kind: "ollama";
      model: string;
      apiKey: string;
      completionsUrl: string;
    };

export const DEFAULT_GROQ_MODEL = "openai/gpt-oss-120b";
const DEFAULT_OLLAMA_MODEL = "llama3.1";
export const GROQ_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const MIN_RETRIEVAL_CHARS = 80;
const MIN_PASSAGE_CHARS = 40;
const GROQ_MODEL_ALIASES: Record<string, string> = {
  "llama-3.3-70b-versatile": "openai/gpt-oss-120b",
  "llama-3.1-8b-instant": "openai/gpt-oss-20b"
};

export function resolveGroqModel(requested: string) {
  const normalized = requested.trim();
  return GROQ_MODEL_ALIASES[normalized] || normalized || DEFAULT_GROQ_MODEL;
}

type ChatCompletionMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export function readRuntimeEnv(name: string, env: NodeJS.ProcessEnv = process.env): string {
  // Bracket access keeps Preview/runtime secrets from being inlined as empty at build.
  const raw = env[name];
  if (typeof raw !== "string") {
    return "";
  }
  return raw.trim().replace(/^['"]+|['"]+$/g, "");
}

function normalizeProvider(value: string | undefined): AskLlmProvider {
  const normalized = (value ?? "none").trim().toLowerCase();
  if (normalized === "groq" || normalized === "ollama") {
    return normalized;
  }
  return "none";
}

function ollamaCompletionsUrl(baseUrl: string) {
  const trimmed = baseUrl.trim().replace(/\/$/, "");
  if (trimmed.endsWith("/chat/completions")) {
    return trimmed;
  }
  if (trimmed.endsWith("/v1")) {
    return `${trimmed}/chat/completions`;
  }
  return `${trimmed}/v1/chat/completions`;
}

export function resolveAskLlmProvider(env: NodeJS.ProcessEnv = process.env): ResolvedAskLlmProvider {
  const provider = normalizeProvider(readRuntimeEnv("ASK_LLM_PROVIDER", env));
  if (provider === "groq") {
    const apiKey = readRuntimeEnv("GROQ_API_KEY", env);
    if (!apiKey) {
      return { kind: "none", skipReason: "missing_credentials" };
    }
    return {
      kind: "groq",
      apiKey,
      model: resolveGroqModel(readRuntimeEnv("GROQ_MODEL", env) || DEFAULT_GROQ_MODEL),
      completionsUrl: GROQ_COMPLETIONS_URL
    };
  }
  if (provider === "ollama") {
    const baseUrl = readRuntimeEnv("OLLAMA_BASE_URL", env);
    if (!baseUrl) {
      return { kind: "none", skipReason: "missing_credentials" };
    }
    return {
      kind: "ollama",
      apiKey: "ollama",
      model: readRuntimeEnv("OLLAMA_MODEL", env) || DEFAULT_OLLAMA_MODEL,
      completionsUrl: ollamaCompletionsUrl(baseUrl)
    };
  }
  return { kind: "none", skipReason: "provider_none" };
}

export function formatApprovedPassages(context: AskLlmContextSource[]): AskLlmPassage[] {
  return context.map((source, index) => ({
    ...source,
    id: `P${index + 1}`
  }));
}

export function isAskRetrievalSufficient(context: AskLlmContextSource[] | undefined | null) {
  if (!Array.isArray(context) || context.length === 0) {
    return false;
  }
  const usable = context.filter((source) => (source.content ?? "").replace(/\s+/g, " ").trim().length >= MIN_PASSAGE_CHARS);
  if (usable.length === 0) {
    return false;
  }
  const total = usable.reduce((sum, source) => sum + source.content.replace(/\s+/g, " ").trim().length, 0);
  return total >= MIN_RETRIEVAL_CHARS;
}

function siteOrigin(env: NodeJS.ProcessEnv = process.env) {
  return readRuntimeEnv("NEXT_PUBLIC_SITE_URL", env) || "https://seri-ai.vercel.app";
}

const PUBLIC_SITE_ORIGINS = [
  "https://seri-ai.vercel.app",
  "https://seri.ai",
  "https://www.seri.ai",
  "https://raviseri.com",
  "https://www.raviseri.com"
];

function knownSiteOrigins(env: NodeJS.ProcessEnv = process.env) {
  const origins = new Set(PUBLIC_SITE_ORIGINS);
  origins.add(siteOrigin(env).replace(/\/$/, ""));
  const canonical = readRuntimeEnv("NEXT_PUBLIC_CANONICAL_DOMAIN", env).replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (canonical) {
    origins.add(`https://${canonical}`);
  }
  return [...origins];
}

function stripTrailingPunctuation(value: string) {
  return value.replace(/[).,;:]+$/g, "").replace(/[>'"]+$/g, "");
}

function urlVariants(raw: string, origin: string, env: NodeJS.ProcessEnv = process.env) {
  const variants = new Set<string>();
  const trimmed = raw.trim();
  if (!trimmed) {
    return variants;
  }
  variants.add(trimmed);
  const withoutHash = trimmed.split("#")[0];
  const withoutQuery = withoutHash.split("?")[0];
  variants.add(withoutHash);
  variants.add(withoutQuery);
  try {
    const absolute = trimmed.startsWith("/") ? new URL(trimmed, origin) : new URL(trimmed);
    variants.add(absolute.href);
    variants.add(`${absolute.origin}${absolute.pathname}${absolute.hash}`);
    variants.add(`${absolute.origin}${absolute.pathname}`);
    variants.add(`${absolute.pathname}${absolute.hash}`);
    variants.add(absolute.pathname);
    for (const knownOrigin of knownSiteOrigins(env)) {
      variants.add(`${knownOrigin}${absolute.pathname}${absolute.hash}`);
      variants.add(`${knownOrigin}${absolute.pathname}`);
    }
  } catch {
    // Ignore unparseable values; they remain as the raw string only.
  }
  return variants;
}

export function allowedAskCitationUrls(context: AskLlmContextSource[], env: NodeJS.ProcessEnv = process.env) {
  const origin = siteOrigin(env);
  const allowed = new Set<string>();
  for (const source of context) {
    for (const variant of urlVariants(source.url, origin, env)) {
      allowed.add(variant);
    }
    for (const found of extractCitedUrls(source.content ?? "")) {
      for (const variant of urlVariants(found, origin, env)) {
        allowed.add(variant);
      }
    }
  }
  return allowed;
}

function extractCitedUrls(text: string) {
  const matches = [
    ...text.matchAll(/https?:\/\/[^\s)\]>'"]+/gi),
    ...text.matchAll(/\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/gi),
    ...text.matchAll(/(?:^|[\s(])(\/[a-z0-9][a-z0-9#?=&_./-]*)/gi)
  ];
  return [...new Set(matches.map((match) => stripTrailingPunctuation((match[1] ?? match[0]).trim())))].filter(Boolean);
}

function extractCitedPassageIds(text: string) {
  return [...new Set([...text.matchAll(/\[P(\d+)\]|\bP(\d+)\b/gi)].map((match) => `P${match[1] ?? match[2]}`))];
}

export function extractAskCitations(text: string) {
  return {
    urls: extractCitedUrls(text),
    passageIds: extractCitedPassageIds(text)
  };
}

export type AskCitationSubset = {
  ok: boolean;
  extraUrls: string[];
  extraPassageIds: string[];
  allowedUrls: string[];
  allowedPassageIds: string[];
};

export function citationsAreSubsetOfRetrieved(
  answer: string,
  context: AskLlmContextSource[],
  env: NodeJS.ProcessEnv = process.env
): AskCitationSubset {
  const passages = formatApprovedPassages(context);
  const allowedPassageIds = passages.map((passage) => passage.id);
  const allowedIds = new Set(allowedPassageIds);
  const allowedUrlSet = allowedAskCitationUrls(context, env);
  const origin = siteOrigin(env);
  const extraPassageIds = extractCitedPassageIds(answer).filter((id) => !allowedIds.has(id));
  const extraUrls = extractCitedUrls(answer).filter((url) => ![...urlVariants(url, origin, env)].some((variant) => allowedUrlSet.has(variant)));
  return {
    ok: extraPassageIds.length === 0 && extraUrls.length === 0,
    extraUrls,
    extraPassageIds,
    allowedUrls: [...allowedUrlSet],
    allowedPassageIds
  };
}

export type AskSynthesisValidation = {
  ok: boolean;
  reason?: "invented_url" | "unknown_passage_id" | "missing_refusal" | "empty_answer" | "missing_citation";
  inventedUrls?: string[];
  unknownPassageIds?: string[];
};

export function validateSynthesizedAnswer(
  answer: string,
  context: AskLlmContextSource[],
  options: { question?: string; env?: NodeJS.ProcessEnv } = {}
): AskSynthesisValidation {
  const trimmed = answer.replace(/\s+/g, " ").trim();
  if (!trimmed) {
    return { ok: false, reason: "empty_answer" };
  }

  const question = options.question ?? "";
  if (question && !isPublicSafe(question)) {
    const refused = /can't discuss employer-specific or confidential|public knowledge base does not contain|outside the public-safe boundary|not in the public record/i.test(
      trimmed
    );
    if (!refused) {
      return { ok: false, reason: "missing_refusal" };
    }
  }

  const subset = citationsAreSubsetOfRetrieved(answer, context, options.env);
  if (subset.extraPassageIds.length) {
    return { ok: false, reason: "unknown_passage_id", unknownPassageIds: subset.extraPassageIds };
  }
  if (subset.extraUrls.length) {
    return { ok: false, reason: "invented_url", inventedUrls: subset.extraUrls };
  }

  const cited = extractAskCitations(answer);
  const origin = siteOrigin(options.env);
  const allowedUrlSet = new Set(subset.allowedUrls);
  const knownCitedUrls = cited.urls.filter((url) => [...urlVariants(url, origin, options.env)].some((variant) => allowedUrlSet.has(variant)));
  const knownCitedIds = cited.passageIds.filter((id) => subset.allowedPassageIds.includes(id));
  if (context.length > 0 && knownCitedIds.length === 0 && knownCitedUrls.length === 0) {
    return { ok: false, reason: "missing_citation" };
  }

  return { ok: true };
}

export function buildAskSynthesisMessages(question: string, context: AskLlmContextSource[]): ChatCompletionMessage[] {
  const passages = formatApprovedPassages(context);
  const contextBlock = passages
    .map((passage) => `[${passage.id}] ${passage.title} (${passage.url})\n${passage.content.replace(/\s+/g, " ").trim()}`)
    .join("\n\n");
  const allowedCitations = passages.map((passage) => `${passage.id} ${passage.url}`).join("; ");

  return [
    {
      role: "system",
      content: [
        "You are a retrieval-bound synthesizer for seri.ai Ask Ravikanth.",
        "Answer ONLY from the CONTEXT passages.",
        "Do not research, browse, search the web, fill gaps, or invent sources, employers, metrics, or URLs.",
        "Every answer MUST cite at least one passage id in square brackets, such as [P1], and may repeat only the urls listed with those passages.",
        "End with a Citations line that uses only those passage ids and urls.",
        "If CONTEXT is insufficient, say the topic is not in the public record and the public knowledge base does not cover it yet.",
        "Do not mention internal employer product names, private systems, logs, dashboards, or confidential architecture.",
        "If the question asks for confidential or out-of-scope material, refuse and stay on public architecture patterns.",
        "Do not write as Ravikanth in the first person. Do not become a generic chatbot."
      ].join(" ")
    },
    {
      role: "user",
      content: [`CONTEXT:`, contextBlock, "", `ALLOWED CITATIONS: ${allowedCitations}`, "", `Question: ${question}`].join("\n")
    }
  ];
}

class AskLlmProviderError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.name = "AskLlmProviderError";
    this.code = code;
  }
}

function groqCompletionBody(model: string, messages: ChatCompletionMessage[]) {
  const body: Record<string, unknown> = {
    model,
    messages,
    temperature: 0,
    max_completion_tokens: 700,
    stream: false
  };
  if (/gpt-oss/i.test(model)) {
    body.reasoning_effort = "low";
  }
  return body;
}

function safeHttpErrorCode(status: number) {
  if (status >= 500) {
    return "http_5xx";
  }
  return `http_${status}`;
}

function logProviderError(code: string, status?: number) {
  console.warn("[ask-llm]", status ? { code, status } : { code });
}

// Completions are buffered and post-validated before any client sees them.
// Token SSE is deferred: invented URLs cannot be rejected until the answer is complete.
async function completeChat(options: {
  completionsUrl: string;
  apiKey: string;
  model: string;
  messages: ChatCompletionMessage[];
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  let response: Response;
  try {
    response = await fetchImpl(options.completionsUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${options.apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(groqCompletionBody(options.model, options.messages)),
      signal: AbortSignal.timeout(Math.max(1, options.timeoutMs ?? 10_000))
    });
  } catch {
    throw new AskLlmProviderError("network_error", "Ask LLM provider request failed");
  }

  if (!response.ok) {
    await response.text().catch(() => "");
    throw new AskLlmProviderError(safeHttpErrorCode(response.status), `Ask LLM provider returned ${response.status}`);
  }

  let payload: { choices?: Array<{ message?: { content?: unknown } }> };
  try {
    payload = (await response.json()) as { choices?: Array<{ message?: { content?: unknown } }> };
  } catch {
    throw new AskLlmProviderError("invalid_json", "Ask LLM provider returned invalid JSON");
  }
  const content = completionText(payload.choices?.[0]?.message?.content);
  if (!content) {
    throw new AskLlmProviderError("empty_completion", "Ask LLM provider returned an empty completion");
  }
  return content;
}

function completionText(content: unknown) {
  if (typeof content === "string") {
    return content.trim();
  }
  if (!Array.isArray(content)) {
    return "";
  }
  return content
    .map((part) => {
      if (typeof part === "string") {
        return part;
      }
      if (part && typeof part === "object" && "text" in part && typeof (part as { text?: unknown }).text === "string") {
        return (part as { text: string }).text;
      }
      return "";
    })
    .join("")
    .trim();
}

export type AskSynthesisAttempt =
  | { ok: true; answer: string; provider: Exclude<AskLlmProvider, "none"> }
  | { ok: false; reason: AskLlmSkipReason; errorCode?: string };

export async function trySynthesizeAskAnswer(args: {
  question: string;
  context: AskLlmContextSource[];
  provider?: ResolvedAskLlmProvider;
  env?: NodeJS.ProcessEnv;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}): Promise<AskSynthesisAttempt> {
  const provider = args.provider ?? resolveAskLlmProvider(args.env);
  if (provider.kind === "none") {
    return { ok: false, reason: provider.skipReason };
  }
  if (!isAskRetrievalSufficient(args.context)) {
    return { ok: false, reason: "thin_retrieval" };
  }

  try {
    const answer = await completeChat({
      completionsUrl: provider.completionsUrl,
      apiKey: provider.apiKey,
      model: provider.model,
      messages: buildAskSynthesisMessages(args.question, args.context),
      fetchImpl: args.fetchImpl,
      timeoutMs: args.timeoutMs
    });
    const validation = validateSynthesizedAnswer(answer, args.context, {
      question: args.question,
      env: args.env
    });
    if (!validation.ok) {
      return { ok: false, reason: "validation_rejected" };
    }
    return { ok: true, answer, provider: provider.kind };
  } catch (error) {
    const errorCode = error instanceof AskLlmProviderError ? error.code : "network_error";
    logProviderError(errorCode);
    return { ok: false, reason: "provider_error", errorCode };
  }
}
