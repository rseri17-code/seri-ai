import { NextResponse } from "next/server";
import { z } from "zod";
import { getRuntimeEnvironment } from "@/lib/env";
import { clientKey, rateLimit, rateLimitedResponse, withTimeout } from "@/lib/production-guards";
import { getSupabaseAdmin } from "@/lib/supabase";

const ContactSchema = z.object({
  name: z.string().min(1).max(120).default("Beta visitor"),
  email: z.string().email().max(180).optional().or(z.literal("")),
  topic: z.string().max(80),
  message: z.string().min(1).max(3000),
  kind: z.enum(["contact", "beta-feedback", "practitioner-review"]).default("contact"),
  visitorType: z.string().max(80).optional(),
  visitIntent: z.string().max(120).optional(),
  proofPathCompleted: z.string().max(120).optional(),
  canExplainRavikanth: z.string().max(80).optional(),
  canNameThesis: z.string().max(80).optional(),
  confidenceLevel: z.string().max(80).optional(),
  clear: z.string().max(1000).optional(),
  confusing: z.string().max(1000).optional(),
  memorable: z.string().max(1000).optional(),
  missing: z.string().max(1000).optional(),
  evidenceInspected: z.string().max(1000).optional(),
  evidenceWouldChangeMind: z.string().max(1000).optional(),
  reviewerRole: z.string().max(80).optional(),
  doctrineVerdict: z.string().max(120).optional(),
  reviewMode: z.string().max(120).optional(),
  reviewDimension: z.string().max(120).optional(),
  reviewVerdict: z.string().max(80).optional(),
  evidenceObserved: z.string().max(1000).optional(),
  reasoningLoss: z.string().max(1000).optional(),
  reviewLimitation: z.string().max(1000).optional(),
  doctrineImpact: z.string().max(120).optional(),
  strongestClaim: z.string().max(1000).optional(),
  weakestClaim: z.string().max(1000).optional(),
  evidenceNeeded: z.string().max(1000).optional(),
  implementationQuestion: z.string().max(1000).optional()
});

export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientKey(request)}`, 8, 60_000);
  if (!limit.allowed) {
    return rateLimitedResponse(limit.retryAfterSeconds);
  }

  const parsed = ContactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const runtime = getRuntimeEnvironment();
  const supabase = getSupabaseAdmin();
  if (supabase && runtime.contactPersistenceConfigured) {
    const message =
      parsed.data.kind === "beta-feedback"
        ? [
            "Beta feedback",
            `Visitor type: ${parsed.data.visitorType ?? "unspecified"}`,
            `Visit intent: ${parsed.data.visitIntent ?? "unspecified"}`,
            `Proof path completed: ${parsed.data.proofPathCompleted ?? "unspecified"}`,
            `Can explain Ravikanth: ${parsed.data.canExplainRavikanth ?? "unspecified"}`,
            `Can name thesis: ${parsed.data.canNameThesis ?? "unspecified"}`,
            `Confidence level: ${parsed.data.confidenceLevel ?? "unspecified"}`,
            `Clear: ${parsed.data.clear ?? "unspecified"}`,
            `Confusing: ${parsed.data.confusing ?? "unspecified"}`,
            `Memorable: ${parsed.data.memorable ?? "unspecified"}`,
            `Missing: ${parsed.data.missing ?? "unspecified"}`,
            `Evidence inspected: ${parsed.data.evidenceInspected ?? "unspecified"}`,
            `Evidence that would change mind: ${parsed.data.evidenceWouldChangeMind ?? "unspecified"}`,
            `Notes: ${parsed.data.message}`
          ].join("\n")
        : parsed.data.kind === "practitioner-review"
          ? [
              "Practitioner review",
              `Reviewer role: ${parsed.data.reviewerRole ?? "unspecified"}`,
              `Doctrine verdict: ${parsed.data.doctrineVerdict ?? "unspecified"}`,
              `Mode reviewed: ${parsed.data.reviewMode ?? "unspecified"}`,
              `Dimension: ${parsed.data.reviewDimension ?? "unspecified"}`,
              `Dimension verdict: ${parsed.data.reviewVerdict ?? "unspecified"}`,
              `Evidence observed: ${parsed.data.evidenceObserved ?? "unspecified"}`,
              `Reasoning loss: ${parsed.data.reasoningLoss ?? "unspecified"}`,
              `Limitation: ${parsed.data.reviewLimitation ?? "unspecified"}`,
              `Doctrine impact: ${parsed.data.doctrineImpact ?? "unspecified"}`,
              `Strongest claim: ${parsed.data.strongestClaim ?? "unspecified"}`,
              `Weakest claim: ${parsed.data.weakestClaim ?? "unspecified"}`,
              `Evidence needed: ${parsed.data.evidenceNeeded ?? "unspecified"}`,
              `Implementation question: ${parsed.data.implementationQuestion ?? "unspecified"}`,
              `Notes: ${parsed.data.message}`
            ].join("\n")
          : parsed.data.message;
    const row = {
      name: parsed.data.name,
      email: parsed.data.email || "unknown@example.invalid",
      topic: parsed.data.topic,
      kind: parsed.data.kind,
      message,
      metadata: {
        visitorType: parsed.data.visitorType,
        visitIntent: parsed.data.visitIntent,
        proofPathCompleted: parsed.data.proofPathCompleted,
        canExplainRavikanth: parsed.data.canExplainRavikanth,
        canNameThesis: parsed.data.canNameThesis,
        confidenceLevel: parsed.data.confidenceLevel,
        clear: parsed.data.clear,
        confusing: parsed.data.confusing,
        memorable: parsed.data.memorable,
        missing: parsed.data.missing,
        evidenceInspected: parsed.data.evidenceInspected,
        evidenceWouldChangeMind: parsed.data.evidenceWouldChangeMind,
        reviewerRole: parsed.data.reviewerRole,
        doctrineVerdict: parsed.data.doctrineVerdict,
        reviewMode: parsed.data.reviewMode,
        reviewDimension: parsed.data.reviewDimension,
        reviewVerdict: parsed.data.reviewVerdict,
        evidenceObserved: parsed.data.evidenceObserved,
        reasoningLoss: parsed.data.reasoningLoss,
        reviewLimitation: parsed.data.reviewLimitation,
        doctrineImpact: parsed.data.doctrineImpact,
        strongestClaim: parsed.data.strongestClaim,
        weakestClaim: parsed.data.weakestClaim,
        evidenceNeeded: parsed.data.evidenceNeeded,
        implementationQuestion: parsed.data.implementationQuestion
      }
    };

    try {
      const { error } = await withTimeout(Promise.resolve(supabase.from("contact_messages").insert(row)), 5_000, "Contact persistence");
      if (error) {
        return NextResponse.json({ error: "Could not save message" }, { status: 500 });
      }
    } catch {
      return NextResponse.json({ ok: true, stored: false, fallback: "Persistence unavailable; request accepted for beta usability." });
    }
  }

  return NextResponse.json({ ok: true, stored: Boolean(supabase) });
}
