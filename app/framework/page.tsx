import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, CheckCircle2, GitBranch, Layers, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
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

      <Section eyebrow="Ten layers" title="From telemetry to accountable operational action.">
        <div className="grid gap-4 md:grid-cols-2">
          {operationalIntelligenceFramework.layers.map((layer, index) => (
            <Card key={layer.name} className="h-full p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{layer.name}</h2>
                </div>
                {index % 3 === 0 ? <Layers className="text-mint" /> : index % 3 === 1 ? <GitBranch className="text-signal" /> : <ShieldCheck className="text-amber" />}
              </div>
              <div className="mt-5 grid gap-3">
                <div className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">Input</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{layer.input}</p>
                </div>
                <div className="rounded border border-mint/20 bg-mint/[0.06] p-3">
                  <p className="text-xs font-semibold uppercase text-mint">Output</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{layer.output}</p>
                </div>
                <div className="rounded border border-amber/20 bg-amber/[0.06] p-3">
                  <p className="text-xs font-semibold uppercase text-amber">Failure mode</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{layer.failureMode}</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-white">{layer.operatorQuestion}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {layer.related.map((href) => (
                  <Link key={href} href={href} className="rounded border border-white/10 bg-black/20 px-2 py-1 text-xs text-slate-300 hover:border-mint/40">
                    {href}
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
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
