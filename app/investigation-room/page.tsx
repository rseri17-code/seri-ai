/**
 * VISITOR-FACING COPY — Claude's lane. Codex: do not edit prose in this file.
 *
 * Every string a visitor reads on this page is owned by one agent, by Ravikanth's ruling on
 * 2026-08-29. Two agents rewriting the same copy produced draft-quality output and repeated
 * reversions, so ownership is now split by kind of change, not by file:
 *
 *   Claude  — headings, paragraphs, labels, link text, alt text, microcopy, section order.
 *   Codex   — data wiring, imports, props, components, layout mechanics, accessibility
 *             attributes, performance. Structural work here is welcome.
 *
 * If a validator pin fails because copy moved, do not rewrite the copy to satisfy the pin.
 * Repoint the pin, or leave it and say so in CLAUDE_HANDOFF.md. Copy written to satisfy a
 * grep target is how this page ended up with a paragraph that existed only to hold pins.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { IncidentSimulator } from "../simulator/simulator";
import { operationalIntelligenceSystem } from "@/content/site";

export const metadata: Metadata = {
  title: "Operations Room | seri.ai",
  description: "Watch an investigation hold itself accountable: a synthetic production incident where every conclusion shows its evidence, contradictions stay visible, and nothing ships without a named human approving it.",
  alternates: { canonical: "/investigation-room" },
  openGraph: {
    title: "Operations Room | seri.ai",
    description: "Run a synthetic production incident where conclusions must show their evidence, contradictions stay visible, and no action ships without human approval.",
    url: "/investigation-room",
    type: "website"
  }
};

const caseAskPrompt = "Explain the OI-ROOM-001 case using the Operational Intelligence layers.";

export default function InvestigationRoomPage() {
  return (
    <>
      <section className="grid-bg border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid gap-4">
            <div className="max-w-5xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-semibold uppercase text-signal">
                <ShieldCheck size={16} />
                Signature artifact
              </div>
              <h1 className="text-balance text-3xl font-semibold text-white md:text-5xl">Operations Room for evidence-backed decisions</h1>
              <p className="mt-3 hidden max-w-3xl text-base leading-7 text-slate-300 sm:block">
                Run {operationalIntelligenceSystem.caseId} as a controlled investigation: reconstruct the transaction path,
                preserve contradiction, expose missing evidence, compare hypotheses, inspect eval gates, export the decision packet,
                and keep operational change behind accountable human approval.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/ask?prompt=${encodeURIComponent(caseAskPrompt)}`} className="inline-flex items-center gap-2 rounded bg-mint px-4 py-2 text-sm font-semibold text-ink">
                Ask Ravikanth <ArrowRight size={18} />
              </Link>
              <Link href="/wiki/operational-intelligence-publication-pack" className="hidden items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white sm:inline-flex">
                Review packet <FileText size={16} />
              </Link>
              <Link href="/downloads/oi-room-001-printable-walkthrough.pdf" className="hidden items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white sm:inline-flex">
                Walkthrough PDF <FileText size={16} />
              </Link>
              <Link href="/ideas/incident-investigation-as-a-product-experience" className="hidden rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white sm:inline-flex">
                Read the essay
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <IncidentSimulator />
      </section>
    </>
  );
}
