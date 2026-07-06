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
        "I can't discuss internal or employer-specific platforms, proprietary projects, private screenshots, logs, dashboards, or confidential architecture. I can explain the public architectural patterns Ravikanth works on, such as Operational Intelligence, AI incident investigation, transaction intelligence, and evidence-driven RCA.",
      sources: []
    });
  }

  const supabase = getSupabaseAdmin();
  let context = localSearch(question).map((hit) => ({
    title: hit.source.title,
    url: hit.source.url,
    content: hit.content
  }));

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
          context = data.map((row: { title?: string; source_url?: string; content: string }) => ({
            title: row.title ?? "Approved public source",
            url: row.source_url ?? "/wiki",
            content: row.content
          }));
        }
      }
    } catch {
      context = localSearch(question).map((hit) => ({
        title: hit.source.title,
        url: hit.source.url,
        content: hit.content
      }));
    }
  }

  const answer = await generateRaviAnswer({ question, context, history });

  return NextResponse.json({
    answer,
    sources: context.slice(0, 4).map((source) => ({
      title: source.title,
      url: source.url,
      excerpt: source.content.slice(0, 220)
    }))
  });
}
