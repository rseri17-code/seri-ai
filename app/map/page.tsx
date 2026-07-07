import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, GitBranch, Layers, Network, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { canonicalDefinition, operationalIntelligenceSystem, operationalLayers, sentinelContextModel } from "@/content/site";

export const metadata: Metadata = {
  title: "Operational Intelligence Map | seri.ai",
  description:
    "The public knowledge map for Operational Intelligence: signal, transaction, topology, evidence, reasoning, memory, evaluation, decision, learning, and operator layers."
};

const mapNodes = [
  { label: "Signal", x: 12, y: 30, href: "/library" },
  { label: "Transaction", x: 14, y: 70, href: "/patterns/transaction-journey-reconstruction" },
  { label: "Topology", x: 38, y: 18, href: "/patterns/topology-aware-reasoning" },
  { label: "Evidence", x: 40, y: 50, href: "/patterns/evidence-driven-rca" },
  { label: "Memory", x: 38, y: 82, href: "/patterns/operational-memory" },
  { label: "ReasonOps", x: 64, y: 50, href: "/products/reasonops" },
  { label: "Evaluation", x: 82, y: 26, href: "/patterns/evaluation-and-replay" },
  { label: "Decision", x: 88, y: 58, href: "/patterns/human-in-the-loop-operational-ai" },
  { label: "Learning", x: 80, y: 84, href: "/now" }
];

const mapEdges = [
  ["Signal", "Evidence"],
  ["Transaction", "Evidence"],
  ["Topology", "ReasonOps"],
  ["Evidence", "ReasonOps"],
  ["Memory", "ReasonOps"],
  ["ReasonOps", "Evaluation"],
  ["ReasonOps", "Decision"],
  ["Evaluation", "Learning"],
  ["Decision", "Learning"]
];

export default function MapPage() {
  const nodeMap = new Map(mapNodes.map((node) => [node.label, node]));

  return (
    <>
      <Section eyebrow="Operational Intelligence Map" title="The operating model from signal to accountable action.">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden p-0">
            <div className="border-b border-white/10 p-5">
              <p className="text-sm leading-7 text-slate-300">
                {canonicalDefinition.short}. {canonicalDefinition.support}
              </p>
            </div>
            <div className="relative overflow-hidden bg-[#071018]">
              <div className="absolute inset-0 intelligence-field opacity-50" />
              <svg className="relative z-10 h-[34rem] w-full" viewBox="0 0 100 100" role="img" aria-label="Operational Intelligence knowledge map">
                <defs>
                  <linearGradient id="map-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5ff2b5" />
                    <stop offset="55%" stopColor="#73a7ff" />
                    <stop offset="100%" stopColor="#f3c969" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="rgba(7,16,24,0.72)" />
                {mapEdges.map(([from, to]) => {
                  const source = nodeMap.get(from);
                  const target = nodeMap.get(to);
                  if (source == null || target == null) {
                    return null;
                  }
                  return <line key={`${from}-${to}`} x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="url(#map-edge)" strokeDasharray="3 3" strokeLinecap="round" strokeWidth="0.9" opacity="0.8" />;
                })}
                {mapNodes.map((node) => (
                  <a key={node.label} href={node.href}>
                    <g className="cursor-pointer">
                      <circle cx={node.x} cy={node.y} r={node.label === "ReasonOps" ? 7.4 : 5.7} fill={node.label === "ReasonOps" ? "#5ff2b5" : "#73a7ff"} stroke="rgba(255,255,255,0.82)" strokeWidth="0.7" />
                      <text x={node.x} y={node.y + 10} textAnchor="middle" className="sim-graph-label">
                        {node.label}
                      </text>
                    </g>
                  </a>
                ))}
              </svg>
            </div>
          </Card>
          <div className="grid gap-3">
            {canonicalDefinition.questions.map((question, index) => (
              <Card key={question} className="flex items-start gap-3 p-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-mint/30 bg-mint/10 font-mono text-xs text-mint">{index + 1}</span>
                <p className="leading-7 text-slate-200">{question}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="System mode" title="One case, multiple proof surfaces.">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.055]">
            <p className="font-mono text-sm text-mint">{operationalIntelligenceSystem.caseId}</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{operationalIntelligenceSystem.caseTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">{operationalIntelligenceSystem.caseSummary}</p>
            <p className="mt-5 rounded border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
              {operationalIntelligenceSystem.promise}
            </p>
          </Card>
          <div className="grid gap-3">
            {operationalIntelligenceSystem.loop.map((step, index) => (
              <Link key={step.href} href={step.href}>
                <Card className="flex h-full items-start gap-4 p-4 transition hover:border-mint/40">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded border border-signal/35 bg-signal/10 font-mono text-sm text-signal">
                    0{index + 1}
                  </span>
                  <div>
                    <h2 className="font-semibold text-white">{step.name}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-mint">Open <ArrowRight size={15} /></p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Vocabulary" title="The ten layers of Operational Intelligence.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {operationalLayers.map((layer, index) => {
            const layerState = operationalIntelligenceSystem.layerStates.find((item) => item.layer === layer.name);
            const askHref = `/ask?prompt=${encodeURIComponent(layerState?.question ?? `Explain the ${layer.name} in Operational Intelligence.`)}`;
            return (
            <Link key={layer.slug} href={layerState ? askHref : layer.href}>
              <Card className="h-full p-4 transition hover:border-mint/40">
                {index % 4 === 0 ? <Layers className="mb-4 text-mint" /> : index % 4 === 1 ? <Network className="mb-4 text-signal" /> : index % 4 === 2 ? <GitBranch className="mb-4 text-amber" /> : <ShieldCheck className="mb-4 text-mint" />}
                <h2 className="font-semibold text-white">{layer.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{layer.description}</p>
                {layerState ? (
                  <>
                    <p className="mt-4 border-t border-white/10 pt-4 text-xs font-semibold uppercase text-slate-500">Case state</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{layerState.state}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-mint">
                      Ask this layer <ArrowRight size={13} />
                    </span>
                  </>
                ) : null}
              </Card>
            </Link>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Evidence infrastructure" title="The primitives behind the map.">
        <div className="grid gap-4 md:grid-cols-3">
          {sentinelContextModel.primitives.map((primitive) => (
            <Card key={primitive.name} className="h-full p-4">
              <ShieldCheck className="mb-4 text-mint" />
              <h2 className="font-semibold text-white">{primitive.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{primitive.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Layer questions" title="Interrogate the map like an operating system.">
        <div className="grid gap-3 md:grid-cols-2">
          {operationalIntelligenceSystem.layerStates.slice(0, 6).map((item) => (
            <Link key={item.layer} href={`/ask?prompt=${encodeURIComponent(item.question)}`}>
              <Card className="h-full p-4 transition hover:border-signal/40">
                <p className="text-xs font-semibold uppercase text-signal">{item.layer}</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{item.question}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">Query the reasoning layer with this frame.</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>


      <Section eyebrow="Category architecture" title="How the site fits together.">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["/manifesto", "Manifesto", "The canonical argument for the category."],
            ["/products/reasonops", "ReasonOps", "The product expression of the thesis."],
            ["/investigation-room", "Operations Room", "The signature workbench."],
            ["/ask", "Reasoning Interface", "The grounded assistant over approved public content."]
          ].map(([href, title, text]) => (
            <Link key={href} href={href}>
              <Card className="h-full transition hover:border-signal/40">
                <BrainCircuit className="mb-4 text-signal" />
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mint">Open <ArrowRight size={15} /></p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
