import { NextResponse } from "next/server";
import { z } from "zod";
import { generateRaviAnswer } from "@/lib/ai";
import { isPublicSafe } from "@/lib/compliance";
import { localSearch } from "@/lib/search";
import { getSupabaseAdmin } from "@/lib/supabase";

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
  const parsed = AskSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { question, history } = parsed.data;
  if (!isPublicSafe(question)) {
    return NextResponse.json({
      answer:
        "I cannot discuss confidential employer-specific systems, internal product names, private screenshots, logs, dashboards, or proprietary architecture. I can answer using Ravi's approved public content.",
      sources: []
    });
  }

  const supabase = getSupabaseAdmin();
  let context = localSearch(question).map((hit) => hit.content);

  if (supabase && process.env.OPENAI_API_KEY) {
    try {
      const { embedText } = await import("@/lib/ai");
      const embedding = await embedText(question);
      if (embedding) {
        const { data } = await supabase.rpc("match_documents", {
          query_embedding: embedding,
          match_count: 6,
          filter: { public_safe: true }
        });
        if (Array.isArray(data) && data.length) {
          context = data.map((row: { content: string }) => row.content);
        }
      }
    } catch {
      context = localSearch(question).map((hit) => hit.content);
    }
  }

  const answer = await generateRaviAnswer({ question, context, history });

  return NextResponse.json({
    answer,
    sources: context.slice(0, 4)
  });
}
