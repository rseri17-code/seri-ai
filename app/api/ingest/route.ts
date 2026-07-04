import { NextResponse } from "next/server";
import { z } from "zod";
import { embedText } from "@/lib/ai";
import { isPublicSafe } from "@/lib/compliance";
import { getSupabaseAdmin } from "@/lib/supabase";

const IngestSchema = z.object({
  title: z.string().min(1).max(200),
  source_type: z.enum(["resume", "article", "project", "certification", "architecture_note"]),
  source_url: z.string().url().optional(),
  content: z.string().min(1).max(20000),
  public_safe: z.boolean().default(true)
});

export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = IngestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const payload = parsed.data;
  if (!payload.public_safe || !isPublicSafe(payload.content)) {
    return NextResponse.json({ error: "Content failed public-safety checks" }, { status: 422 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  const chunks = payload.content.match(/[\s\S]{1,1400}/g) ?? [];
  const rows = await Promise.all(
    chunks.map(async (chunk, index) => ({
      title: payload.title,
      source_type: payload.source_type,
      source_url: payload.source_url,
      content: chunk,
      chunk_index: index,
      public_safe: true,
      embedding: await embedText(chunk)
    }))
  );

  const { error } = await supabase.from("documents").insert(rows);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, chunks: rows.length });
}
