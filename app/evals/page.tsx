import type { Metadata } from "next";
import { CheckCircle2, ShieldAlert, Target } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { evalReport } from "@/content/site";

export const metadata: Metadata = {
  title: "Evals | Public Operational Intelligence Trust Report",
  description: "Public evaluation rubric for groundedness, refusal behavior, citation usefulness, and known limitations in the Operational Intelligence assistant."
};

export default function EvalsPage() {
  return (
    <>
      <Section eyebrow="Public trust report" title={evalReport.title}>
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <ShieldAlert className="mb-5 text-mint" />
            <p className="text-lg leading-8 text-slate-200">{evalReport.summary}</p>
            <div className="mt-6 rounded-lg border border-mint/25 bg-mint/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-mint">Current product score</p>
              <p className="mt-2 text-6xl font-semibold text-white">{evalReport.score}</p>
              <p className="mt-2 text-sm text-slate-300">Last reviewed {evalReport.lastRun}</p>
              <p className="mt-1 text-sm text-slate-300">Backed by {evalReport.generatedBy}</p>
            </div>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            {evalReport.dimensions.map((dimension) => (
              <Card key={dimension.name}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">{dimension.name}</h2>
                  <span className="font-mono text-mint">{dimension.score}</span>
                </div>
                <div className="mt-4 h-2 rounded bg-white/10">
                  <div className="h-2 rounded bg-mint" style={{ width: `${dimension.score}%` }} />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{dimension.target}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Regression fixtures" title="The questions the public assistant must handle correctly.">
        <div className="space-y-3">
          {evalReport.fixtures.map((fixture) => (
            <Card key={fixture.prompt} className="grid gap-4 md:grid-cols-[1fr_1fr_7rem] md:items-center">
              <div>
                <p className="text-sm text-slate-400">Prompt</p>
                <p className="mt-2 font-medium text-white">{fixture.prompt}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Expected behavior</p>
                <p className="mt-2 text-slate-300">{fixture.expected}</p>
              </div>
              <div className="flex items-center gap-2 text-mint">
                <CheckCircle2 size={18} />
                <span>{fixture.result}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Known limits" title="Trust grows when the system says what it cannot do yet.">
        <div className="grid gap-4 md:grid-cols-2">
          {evalReport.knownLimits.map((limit) => (
            <Card key={limit}>
              <Target className="mb-4 text-amber" />
              <p className="leading-7 text-slate-300">{limit}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
