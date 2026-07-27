import { NextResponse } from "next/server";
import { z } from "zod";
import { generateRaviAnswer } from "@/lib/ai";
import { isPublicSafe } from "@/lib/compliance";
import { getRuntimeEnvironment } from "@/lib/env";
import { clientKey, rateLimit, rateLimitedResponse, withTimeout } from "@/lib/production-guards";
import { localSearch } from "@/lib/search";
import { getSupabaseAdmin } from "@/lib/supabase";

const ASK_RATE_LIMIT = 20;
const ASK_RATE_WINDOW_MS = 60_000;
const ASK_EMBEDDING_TIMEOUT_MS = 4_500;
const ASK_VECTOR_TIMEOUT_MS = 4_500;
const ASK_SYNTHESIS_TIMEOUT_MS = 12_000;
const ASK_VECTOR_MATCH_COUNT = 6;
const ASK_RETURNED_SOURCE_COUNT = 4;

const AskSchema = z.object({
  question: z.string().min(1).max(1200),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000)
      })
    )
    .optional(),
  mode: z.enum(["ask", "interview"]).optional()
});

export async function POST(request: Request) {
  const startedAt = Date.now();
  const limit = rateLimit(`ask:${clientKey(request)}`, ASK_RATE_LIMIT, ASK_RATE_WINDOW_MS);
  if (!limit.allowed) {
    return rateLimitedResponse(limit.retryAfterSeconds);
  }

  const parsed = AskSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { question, history } = parsed.data;
  const runtime = getRuntimeEnvironment();
  if (!isPublicSafe(question)) {
    return NextResponse.json({
      answer:
        "I can't discuss employer-specific or confidential systems, proprietary projects, private screenshots, logs, dashboards, or internal architecture. I can explain the public architecture patterns behind the question, including evidence-driven investigation, transaction journey reconstruction, replayable reasoning, evaluation gates, operational memory, and human-in-the-loop review.",
      sources: [],
      meta: {
        answer_mode: "public_safety_refusal",
        retrieval_mode: "blocked",
        source_count: 0,
        latency_ms: Date.now() - startedAt,
        budget: {
          rate_limit: ASK_RATE_LIMIT,
          rate_window_ms: ASK_RATE_WINDOW_MS,
          synthesis_timeout_ms: ASK_SYNTHESIS_TIMEOUT_MS,
          returned_source_limit: ASK_RETURNED_SOURCE_COUNT
        }
      }
    });
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
      const embedding = await withTimeout(embedText(question), ASK_EMBEDDING_TIMEOUT_MS, "Embedding");
      if (embedding) {
        const { data } = await withTimeout(
          Promise.resolve(
            supabase.rpc("match_documents", {
            query_embedding: embedding,
            match_count: ASK_VECTOR_MATCH_COUNT,
            filter: { public_safe: true }
            })
          ),
          ASK_VECTOR_TIMEOUT_MS,
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

  let answer: string;
  let answerMode: "ai_synthesis" | "timeout_fallback" = "ai_synthesis";
  try {
    answer = await withTimeout(generateRaviAnswer({ question, context, history }), ASK_SYNTHESIS_TIMEOUT_MS, "Ask Ravi");
  } catch {
    answerMode = "timeout_fallback";
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

  return NextResponse.json({
    answer,
    sources: context.slice(0, ASK_RETURNED_SOURCE_COUNT).map((source) => ({
      title: source.title,
      url: source.url,
      excerpt: source.content.slice(0, 220)
    })),
    meta: {
      answer_mode: answerMode,
      retrieval_mode: retrievalMode,
      source_count: Math.min(context.length, ASK_RETURNED_SOURCE_COUNT),
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
  });
}
