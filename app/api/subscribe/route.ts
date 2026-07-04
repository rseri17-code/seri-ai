import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const SubscribeSchema = z.object({
  email: z.string().email().max(180)
});

export async function POST(request: Request) {
  const parsed = SubscribeSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("newsletter_subscribers").upsert(
      {
        email: parsed.data.email,
        source: "seri.ai"
      },
      { onConflict: "email" }
    );
    if (error) {
      return NextResponse.json({ error: "Could not subscribe" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
