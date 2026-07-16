import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { FrameworkTeacher } from "@/components/framework-teacher";
import { Section } from "@/components/section";
import { operationalIntelligenceFramework } from "@/content/site";

export const metadata: Metadata = {
  title: "Operational Intelligence Framework | Ravikanth Seri",
  description:
    "Ravikanth Seri's ten-layer Operational Intelligence Framework for evidence-backed Agentic SRE, replayable investigations, eval-gated agents, and human-reviewed action."
};

export default function FrameworkPage() {
  return (
    <>
      <Section eyebrow="Framework" title={operationalIntelligenceFramework.title}>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.05]">
            <BrainCircuit className="mb-5 text-mint" />
            <h2 className="text-3xl font-semibold text-white">{operationalIntelligenceFramework.subtitle}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">{operationalIntelligenceFramework.promise}</p>
            <p className="mt-5 rounded border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
              {operationalIntelligenceFramework.thesis}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/investigation-room" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Run the Operations Room <ArrowRight size={18} />
              </Link>
              <Link href="/map" className="inline-flex items-center gap-2 rounded border border-signal/40 px-5 py-3 font-semibold text-signal">
                View the Map
              </Link>
            </div>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase text-slate-500">Operator questions</p>
            <div className="mt-4 grid gap-3">
              {operationalIntelligenceFramework.operatorQuestions.map((question, index) => (
                <div key={question} className="flex items-start gap-3 rounded border border-white/10 bg-black/20 p-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-mint/30 bg-mint/10 font-mono text-xs text-mint">
                    {index + 1}
                  </span>
                  <p className="leading-7 text-slate-200">{question}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Teaching sequence" title="Follow one synthetic investigation through all ten layers.">
        <FrameworkTeacher />
      </Section>

      <Section eyebrow="Design rules" title="How the framework should constrain systems.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CheckCircle2 className="mb-5 text-mint" />
            <h2 className="text-2xl font-semibold text-white">Design principles</h2>
            <div className="mt-4 grid gap-2">
              {operationalIntelligenceFramework.designPrinciples.map((principle) => (
                <div key={principle} className="rounded border border-white/10 bg-black/20 p-3 text-sm font-semibold text-slate-200">
                  {principle}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <ShieldCheck className="mb-5 text-signal" />
            <h2 className="text-2xl font-semibold text-white">Evaluation criteria</h2>
            <div className="mt-4 grid gap-2">
              {operationalIntelligenceFramework.evaluationCriteria.map((criterion) => (
                <div key={criterion} className="rounded border border-white/10 bg-black/20 p-3 text-sm font-semibold text-slate-200">
                  {criterion}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
