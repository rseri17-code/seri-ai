import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(180),
  topic: z.string().max(80),
  message: z.string().min(1).max(3000)
});

export async function POST(request: Request) {
  const parsed = ContactSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    if (error) {
      return NextResponse.json({ error: "Could not save message" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
