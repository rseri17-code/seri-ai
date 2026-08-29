import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { FrameworkTeacher } from "@/components/framework-teacher";
import { Section } from "@/components/section";
import { TechnicalReviewPath } from "@/components/technical-review-path";
import { operationalIntelligenceFramework, thesisRadar } from "@/content/site";

export const metadata: Metadata = {
  title: "Operational Intelligence Framework | Ravikanth Seri",
  description:
    "Ravikanth Seri's ten-layer Operational Intelligence Framework for evidence-backed Agentic SRE, replayable investigations, eval-gated agents, and human-reviewed action.",
  alternates: { canonical: "/framework" },
  openGraph: {
    title: "Operational Intelligence Framework | Ravikanth Seri",
    description: "The ten-layer framework for turning signals, transactions, topology, evidence, memory, evaluation, and operator control into accountable action.",
    url: "/framework",
    type: "website"
  }
};


const argumentsForCategory = [
  {
    title: "Telemetry is not enough",
    body:
      "Modern enterprises do not lack data. They lack shared reasoning over distributed data. Logs, metrics, traces, changes, topology, tickets, and transaction signals only become useful when they are connected to evidence, impact, confidence, and review."
  },
  {
    title: "AIOps plateaued at correlation",
    body:
      "Correlation helps reduce noise, but enterprise operators need provenance, timeline reconstruction, hypothesis comparison, and a reviewable path to action. The useful layer is explanation, not another alert summary."
  },
  {
    title: "Transactions are under-modeled",
    body:
      "Enterprise customers experience journeys, not services. Operational Intelligence treats the transaction path as the unit of reasoning so impact can be explained across gateways, APIs, applications, dependencies, and external systems."
  },
  {
    title: "Memory should compound",
    body:
      "Incident investigations repeat when operational learning disappears after the ticket closes. A durable system should remember approved patterns, mitigations, ownership, failure modes, and decisions without leaking confidential implementation detail."
  },
  {
    title: "Evaluation is the control system",
    body:
      "Enterprise AI quality cannot be based on vibes. Replay, grounding, evidence coverage, refusal behavior, confidence calibration, and escalation judgment are the release gates for trustworthy operational AI."
  },
  {
    title: "Evidence must become infrastructure",
    body:
      "The future system is not a transcript plus a model answer. It is an evidence graph, hypothesis lifecycle, decision trace, replay seed, outcome memory, and learning loop that operators can inspect."
  },
  {
    title: "Humans remain accountable",
    body:
      "AI should accelerate investigation, reduce ambiguity, and prepare decisions. Humans should own high-impact actions, especially when evidence is partial, risk is high, or the action is difficult to reverse."
  }
];

export default function FrameworkPage() {
  return (
    <>
      <Section eyebrow="Framework" title={operationalIntelligenceFramework.title} level="h1">
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
              <Link href="/library" className="inline-flex items-center gap-2 rounded border border-signal/40 px-5 py-3 font-semibold text-signal">
                View the Map
              </Link>
            </div>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase text-slate-500">Operator questions</p>
            <div className="mt-4 grid gap-3">
              {operationalIntelligenceFramework.operatorQuestions.map((question, index) => (
                <Link key={question} href={`/ask?prompt=${encodeURIComponent(question)}`} className="flex items-start gap-3 rounded border border-white/10 bg-black/20 p-3 transition hover:border-signal/40">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-mint/30 bg-mint/10 font-mono text-xs text-mint">
                    {index + 1}
                  </span>
                  <p className="leading-7 text-slate-200">{question}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="The argument" title="Why this needs to be a layer rather than a feature.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {argumentsForCategory.map((entry) => (
            <Card key={entry.title} className="h-full p-5">
              <h2 className="text-lg font-semibold leading-7 text-white sm:text-xl">{entry.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{entry.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Where the market is moving" title="Every claim below is paired with what would prove it wrong.">
        <p className="max-w-4xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
          A market moving the same direction is a signal, not a confirmation. The last column is the one that matters &mdash; what
          would have to show up for the claim to be wrong. Updated {thesisRadar.updatedAt}.
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-amber">
          Evidence posture. These signals do not prove Operational Intelligence as a finished category. They show the market
          moving toward the same problem.
        </p>
        <Card className="mt-4 p-0">
          <div className="divide-y divide-white/10">
            {thesisRadar.proofChain.map((item) => (
              <div key={item.theme} className="grid min-w-0 gap-4 p-4 sm:p-5 md:grid-cols-2 lg:grid-cols-[0.8fr_1fr_1fr]">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{item.theme}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.marketSignal}</p>
                </div>
                <div className="min-w-0 rounded border border-mint/20 bg-mint/[0.045] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint">OI claim</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.operationalClaim}</p>
                </div>
                <div className="min-w-0 rounded border border-amber/25 bg-amber/[0.045] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">Falsification</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.falsificationQuestion}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Teaching sequence" title="Follow one synthetic investigation through all ten layers.">
        <FrameworkTeacher />
      </Section>

      <Section eyebrow="Review path" title="How to challenge the framework.">
        <TechnicalReviewPath />
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
