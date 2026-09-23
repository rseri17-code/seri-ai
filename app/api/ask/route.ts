import { NextResponse } from "next/server";
import { z } from "zod";
import { classifyAskQuestion, inferFollowUpChips, inferFrameworkLayers, inferRelatedArtifacts } from "@/lib/ai";
import { generateRaviAnswer, type AskAnswerMode } from "@/lib/ask-answer";
import { resolveAskLlmProvider } from "@/lib/ask-llm";
import { isPublicSafe } from "@/lib/compliance";
import { getRuntimeEnvironment } from "@/lib/env";
import { rateLimitAsk, rateLimitedResponse, withTimeout } from "@/lib/production-guards";
import { localSearch, resolveAskContext } from "@/lib/search";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 15;

const ASK_RATE_LIMIT = 20;
const ASK_RATE_WINDOW_MS = 60_000;
const ASK_EMBEDDING_TIMEOUT_MS = 4_500;
const ASK_VECTOR_TIMEOUT_MS = 4_500;
const ASK_SYNTHESIS_TIMEOUT_MS = 12_000;
const ASK_OVERALL_BUDGET_MS = 12_000;
const ASK_HISTORY_TURN_LIMIT = 6;
const ASK_QUESTION_MAX = 1200;
const ASK_BODY_MAX_BYTES = 16_000;
const ASK_VECTOR_MATCH_COUNT = 6;
const ASK_RETURNED_SOURCE_COUNT = 4;

const latencySamples: number[] = [];
const LATENCY_SAMPLE_LIMIT = 200;

const AskSchema = z.object({
  question: z.string().trim().min(1).max(ASK_QUESTION_MAX),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000)
      })
    )
    .max(ASK_HISTORY_TURN_LIMIT)
    .optional(),
  mode: z.enum(["ask", "interview"]).optional()
});

function logAskLatency(entry: { latency_ms: number; status: number; answer_mode: string; retrieval_mode: string }) {
  latencySamples.push(entry.latency_ms);
  if (latencySamples.length > LATENCY_SAMPLE_LIMIT) {
    latencySamples.shift();
  }
  const sorted = [...latencySamples].sort((left, right) => left - right);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * 0.99) - 1));
  console.info(
    JSON.stringify({
      event: "ask_latency",
      ...entry,
      sample_n: sorted.length,
      sample_p99_ms: sorted[index]
    })
  );
}

export async function POST(request: Request) {
  const startedAt = Date.now();
  const remaining = () => Math.max(1, ASK_OVERALL_BUDGET_MS - (Date.now() - startedAt));
  let status = 200;
  let answerModeForLog = "rejected";
  let retrievalModeForLog = "none";

  const finish = (response: NextResponse, answerMode: string, retrievalMode: string, httpStatus = response.status) => {
    status = httpStatus;
    answerModeForLog = answerMode;
    retrievalModeForLog = retrievalMode;
    return response;
  };

  try {
  const limit = await rateLimitAsk(request, ASK_RATE_LIMIT, ASK_RATE_WINDOW_MS);
  if (!limit.allowed) {
    return finish(rateLimitedResponse(limit.retryAfterSeconds), "rate_limited", "blocked", 429);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > ASK_BODY_MAX_BYTES) {
    return finish(NextResponse.json({ error: "Invalid request" }, { status: 413 }), "rejected", "none", 413);
  }

  let raw = "";
  try {
    raw = await withTimeout(request.text(), Math.min(2_000, remaining()), "Body");
  } catch {
    return finish(NextResponse.json({ error: "Invalid request" }, { status: 400 }), "rejected", "none", 400);
  }
  if (raw.length > ASK_BODY_MAX_BYTES) {
    return finish(NextResponse.json({ error: "Invalid request" }, { status: 413 }), "rejected", "none", 413);
  }

  let payload: unknown = null;
  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = null;
    }
  }
  const parsed = AskSchema.safeParse(payload);
  if (!parsed.success) {
    return finish(NextResponse.json({ error: "Invalid request" }, { status: 400 }), "rejected", "none", 400);
  }

  const { question, history } = parsed.data;
  // Phase A: each turn retrieves independently from `question`.
  // `history` is scanned for public-safety only (and optional synthesis providers).
  // It is not concatenated into the retrieval query, so follow-ups cannot invent continuity.
  const isConversationPublicSafe =
    isPublicSafe(question) &&
    (history?.every((message) => message.role !== "user" || isPublicSafe(message.content)) ?? true);
  const questionCategory = classifyAskQuestion(question);
  const frameworkLayers = inferFrameworkLayers(question);
  const relatedPages = inferRelatedArtifacts(question);
  const followUps = inferFollowUpChips(question, relatedPages);
  const runtime = getRuntimeEnvironment();
  if (!isConversationPublicSafe) {
    return finish(NextResponse.json({
      answer:
        "I can't discuss employer-specific or confidential systems, proprietary projects, private screenshots, logs, dashboards, or internal architecture. I can explain the public architecture patterns behind the question, including evidence-driven investigation, transaction journey reconstruction, replayable reasoning, evaluation gates, operational memory, and human-in-the-loop review.",
      sources: [],
      follow_ups: followUps,
      meta: {
        answer_mode: "public_safety_refusal",
        retrieval_mode: "blocked",
        source_count: 0,
        question_category: questionCategory,
        framework_layers: frameworkLayers,
        related_pages: relatedPages,
        public_boundary: "public-safe refusal",
        assistant_identity: "AI assistant over approved public work",
        llm_provider: "none",
        llm_used: false,
        llm_skip_reason: null,
        llm_error_code: null,
        latency_ms: Date.now() - startedAt,
        budget: {
          rate_limit: ASK_RATE_LIMIT,
          rate_window_ms: ASK_RATE_WINDOW_MS,
          synthesis_timeout_ms: ASK_SYNTHESIS_TIMEOUT_MS,
          returned_source_limit: ASK_RETURNED_SOURCE_COUNT
        }
      }
    }), "public_safety_refusal", "blocked", 200);
  }

  const supabase = getSupabaseAdmin();
  let retrievalMode: "local" | "vector" | "vector_fallback" = "local";
  let context = localSearch(question).map((hit) => ({
    title: hit.source.title,
    url: hit.source.url,
    content: hit.content
  }));

  if (supabase && runtime.vectorSearchConfigured) {
    try {
      const { embedText } = await import("@/lib/ai");
      const embeddingBudget = Math.min(ASK_EMBEDDING_TIMEOUT_MS, remaining());
      const embedding = await withTimeout(embedText(question, embeddingBudget), embeddingBudget, "Embedding");
      if (embedding) {
        const vectorBudget = Math.min(ASK_VECTOR_TIMEOUT_MS, remaining());
        const vectorSignal = AbortSignal.timeout(vectorBudget);
        const { data } = await withTimeout(
          Promise.resolve(
            supabase.rpc("match_documents", {
            query_embedding: embedding,
            match_count: ASK_VECTOR_MATCH_COUNT,
            filter: { public_safe: true }
            }).abortSignal(vectorSignal)
          ),
          vectorBudget,
          "Vector search"
        );
        if (Array.isArray(data) && data.length) {
          retrievalMode = "vector";
          context = data.map((row: { title?: string; source_url?: string; content: string }) => ({
            title: row.title ?? "Approved public source",
            url: row.source_url ?? "/wiki",
            content: row.content
          }));
        }
      }
    } catch {
      retrievalMode = "vector_fallback";
      context = localSearch(question).map((hit) => ({
        title: hit.source.title,
        url: hit.source.url,
        content: hit.content
      }));
    }
  }

  context = resolveAskContext(question, context);

  const configuredProvider = resolveAskLlmProvider();
  let answer: string;
  let answerMode: AskAnswerMode = "ai_synthesis";
  let llmProvider: "none" | "groq" | "ollama" = configuredProvider.kind;
  let llmUsed = false;
  let llmSkipReason: string | null = configuredProvider.kind === "none" ? configuredProvider.skipReason : null;
  let llmErrorCode: string | null = null;
  try {
    const synthesisBudget = Math.min(ASK_SYNTHESIS_TIMEOUT_MS, remaining());
    const generated = await withTimeout(
      generateRaviAnswer({ question, context, history, env: process.env, timeoutMs: synthesisBudget }),
      synthesisBudget,
      "Ask Ravi"
    );
    answer = generated.answer;
    answerMode = generated.mode;
    llmProvider = generated.llmProvider;
    llmUsed = generated.llmUsed;
    llmSkipReason = generated.llmSkipReason ?? null;
    llmErrorCode = generated.llmErrorCode ?? null;
  } catch {
    answerMode = "timeout_fallback";
    llmProvider = configuredProvider.kind;
    llmUsed = false;
    llmSkipReason = "provider_error";
    llmErrorCode = "timeout";
    answer = [
      "Direct answer: The public knowledge system is available, but the AI synthesis path did not complete in time. The safest beta behavior is to fall back to the approved public sources instead of guessing.",
      "Relevant framework layers: Evidence Layer, Evaluation Layer, Operator Layer.",
      "Public source: approved local content registry.",
      "Concrete example: OI-ROOM-001 remains available as a public-safe way to inspect evidence, hypotheses, replay, evaluation gates, and human review.",
      "Tradeoff or limitation: this response is a production-safe timeout fallback, not a model-quality answer.",
      "Related page or artifact: start with /framework, then /investigation-room, /work, or /background.",
      "Explicit unknowns: anything unsupported by approved public content remains outside the public-safe knowledge base.",
      "Suggested next question: Show how the shared case moves through the ten-layer framework."
    ].join("\n\n");
  }

  return finish(NextResponse.json({
    answer,
    sources: context.slice(0, ASK_RETURNED_SOURCE_COUNT).map((source) => ({
      title: source.title,
      url: source.url,
      excerpt: source.content.slice(0, 220)
    })),
    follow_ups: followUps,
    meta: {
      answer_mode: answerMode,
      retrieval_mode: retrievalMode,
      source_count: Math.min(context.length, ASK_RETURNED_SOURCE_COUNT),
      question_category: questionCategory,
      framework_layers: frameworkLayers,
      related_pages: relatedPages,
      public_boundary: "approved public content only",
      assistant_identity: "AI assistant over approved public work",
      llm_provider: llmProvider,
      llm_used: llmUsed,
      llm_skip_reason: llmSkipReason,
      llm_error_code: llmErrorCode,
      latency_ms: Date.now() - startedAt,
      budget: {
        rate_limit: ASK_RATE_LIMIT,
        rate_window_ms: ASK_RATE_WINDOW_MS,
        embedding_timeout_ms: ASK_EMBEDDING_TIMEOUT_MS,
        vector_timeout_ms: ASK_VECTOR_TIMEOUT_MS,
        synthesis_timeout_ms: ASK_SYNTHESIS_TIMEOUT_MS,
        vector_match_count: ASK_VECTOR_MATCH_COUNT,
        returned_source_limit: ASK_RETURNED_SOURCE_COUNT
      }
    }
  }), answerMode, retrievalMode, 200);
  } catch (error) {
    status = 500;
    answerModeForLog = "error";
    throw error;
  } finally {
    logAskLatency({
      latency_ms: Date.now() - startedAt,
      status,
      answer_mode: answerModeForLog,
      retrieval_mode: retrievalModeForLog
    });
  }
}
