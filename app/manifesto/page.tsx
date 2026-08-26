import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { canonicalDefinition, operationalLayers, sentinelContextModel } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Operational Intelligence Is the New Control Plane | seri.ai",
  description:
    "The founding thesis for seri.ai: Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.",
  path: "/manifesto"
});

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

export default function ManifestoPage() {
  return (
    <>
      <Section eyebrow="Founding thesis" title="Operational Intelligence Is the New Control Plane" level="h1">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <FileText className="mb-5 text-mint" />
            <p className="text-3xl leading-10 text-white">{canonicalDefinition.short}</p>
            <p className="mt-6 text-lg leading-8 text-slate-300">{canonicalDefinition.support}</p>
          </Card>
          <Card>
            <p className="text-sm font-semibold uppercase text-signal">Ravikanth Seri built seri.ai because</p>
            <p className="mt-4 text-2xl leading-10 text-slate-100">
              Enterprises can observe more than ever, but they still struggle to explain what changed, why it matters, what evidence supports it, and what should happen next.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/map" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Explore the map <ArrowRight size={18} />
              </Link>
              <Link href="/investigation-room" className="rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Open Operations Room
              </Link>
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Argument" title="Why Operational Intelligence becomes the next layer.">
        <div className="grid gap-4 md:grid-cols-2">
          {argumentsForCategory.map((item) => (
            <Card key={item.title}>
              <CheckCircle2 className="mb-4 text-mint" />
              <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 leading-8 text-slate-300">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Field model" title={sentinelContextModel.publicThesis}>
        <div className="grid gap-4 md:grid-cols-3">
          {sentinelContextModel.primitives.map((primitive) => (
            <Card key={primitive.name}>
              <h2 className="text-xl font-semibold text-white">{primitive.name}</h2>
              <p className="mt-4 leading-7 text-slate-300">{primitive.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Operating model" title="The layers that make the thesis concrete.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {operationalLayers.map((layer, index) => (
            <Link key={layer.slug} href={layer.href}>
              <Card className="h-full p-4 transition hover:border-signal/40">
                <span className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 font-semibold text-white">{layer.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{layer.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Relationship" title="seri.ai, Operational Intelligence, and ReasonOps are not the same thing.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["seri.ai", "The public operating system, product lab, and knowledge base for the body of work."],
            ["Operational Intelligence", "The category: the reasoning layer between enterprise telemetry and human decision."],
            ["ReasonOps", "The product/platform expression of the thesis, built as a public-safe concept."]
          ].map(([title, text]) => (
            <Card key={title}>
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
              <p className="mt-4 leading-7 text-slate-300">{text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
