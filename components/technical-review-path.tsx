import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileText, GitBranch, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";

const reviewSteps = [
  {
    href: "/wiki/operational-intelligence-canonical-doctrine",
    label: "Classify claims",
    detail: "Separate established practice, derived application, original synthesis, speculative guidance, and unsupported claims.",
    Icon: FileText
  },
  {
    href: "/wiki/operational-intelligence-reference-architecture",
    label: "Inspect contracts",
    detail: "Review implementation-neutral layer contracts, states, governance, conformance, and approval boundaries.",
    Icon: GitBranch
  },
  {
    href: "/wiki/operational-intelligence-evidence-pack",
    label: "Challenge evidence",
    detail: "Use benchmark criteria, control comparisons, falsification tests, and evidence-ledger expectations.",
    Icon: ShieldCheck
  },
  {
    href: "/contact",
    label: "Submit review",
    detail: "Send structured practitioner criticism from SRE, architecture, AI engineering, governance, or executive perspectives.",
    Icon: ClipboardCheck
  }
];

export function TechnicalReviewPath() {
  return (
    <Card className="border-amber/25 bg-amber/[0.045]">
      <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber">Technical review path</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">The model is meant to be challenged before it is believed.</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            seri.ai should earn trust through classification, contracts, benchmarkable evidence, and practitioner criticism. This is the shortest path for a serious reviewer.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {reviewSteps.map(({ href, label, detail, Icon }, index) => (
            <Link key={href} href={href} className="rounded-lg border border-white/10 bg-black/25 p-4 transition hover:border-amber/40">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded border border-amber/25 bg-amber/10 font-mono text-xs text-amber">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon size={18} className="text-amber" />
                </div>
                <ArrowRight size={16} className="mt-1 shrink-0 text-slate-500" />
              </div>
              <h3 className="mt-4 font-semibold text-white">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
