import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
import { IncidentSimulator } from "./simulator";
import { operationalIntelligenceSystem } from "@/content/site";

export const metadata: Metadata = {
  title: "Operations Room | seri.ai",
  description: "A public-safe Operational Intelligence workbench for OI-ROOM-001: evidence graph, hypothesis lifecycle, replay, evaluation gates, and human approval."
};

const caseAskPrompt = "Explain the OI-ROOM-001 case using the Operational Intelligence layers.";

export default function SimulatorPage() {
  return (
    <>
      <section className="grid-bg border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-5xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 text-xs font-semibold uppercase text-signal">
                <ShieldCheck size={16} />
                Signature artifact
              </div>
              <h1 className="text-3xl font-semibold text-white md:text-5xl">Operational Intelligence Operations Room</h1>
              <p className="mt-3 hidden max-w-3xl text-base leading-7 text-slate-300 sm:block">
                A public-safe investigation workbench for evidence-backed Agentic SRE. Run {operationalIntelligenceSystem.caseId},
                replay evidence, compare branches, inspect eval gates, export the RCA packet, and keep irreversible action behind human review.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/ask?prompt=${encodeURIComponent(caseAskPrompt)}`} className="inline-flex items-center gap-2 rounded bg-mint px-4 py-2 text-sm font-semibold text-ink">
                Ask Ravi <ArrowRight size={18} />
              </Link>
              <Link href="/wiki/operational-intelligence-publication-pack" className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white">
                Review packet <FileText size={16} />
              </Link>
              <Link href="/downloads/oi-room-001-printable-walkthrough.pdf" className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white">
                Walkthrough PDF <FileText size={16} />
              </Link>
              <Link href="/ideas/incident-investigation-as-a-product-experience" className="rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white">
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
