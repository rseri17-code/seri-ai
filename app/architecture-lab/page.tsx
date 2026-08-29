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
import { ArrowRight, ClipboardCheck, GitBranch, Network, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { architectureCards, operationalIntelligenceFramework } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Architecture Lab | seri.ai",
  description: "Reusable architecture cards for Operational Intelligence, Agentic SRE, evidence graphs, evaluation gates, and operator-controlled AI systems.",
  path: "/architecture-lab"
});

const labContracts = [
  {
    name: "Evidence contract",
    route: "/publication-pack/decision-packet-example.md",
    input: "Signals, transaction timing, topology, memory, and policy constraints.",
    output: "Cited evidence, contradictory evidence, missing evidence, and a reviewable decision packet.",
    failure: "A fluent explanation appears without receipts, uncertainty, or source boundaries."
  },
  {
    name: "Replay contract",
    route: "/publication-pack/oi-room-001-printable-walkthrough.md",
    input: "A synthetic scenario, expected evidence states, hypothesis transitions, and approval outcome.",
    output: "Replay seed, regression fixture, learning note, and future retrieval context.",
    failure: "The incident becomes a one-off narrative that cannot be reproduced or tested."
  },
  {
    name: "Evaluation contract",
    route: "/ask",
    input: "Questions, expected behaviors, refusal cases, citation requirements, and related-page routing.",
    output: "Deterministic trust fixtures with explicit pass/fail behavior and known limitations.",
    failure: "Assistant quality is judged by confidence prose instead of reproducible behavior."
  },
  {
    name: "Operator control contract",
    route: "/investigation-room",
    input: "Recommendation, risk, reversibility, owner, approval class, and unresolved unknowns.",
    output: "Approved action, rejected action, escalation, or request for more evidence.",
    failure: "A consequential action is recommended or implied without human approval."
  }
] as const;

const reviewSequence = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine", "What the category is, and what it explicitly is not."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "Precise enough to implement without a conversation first."],
  ["/wiki/operational-intelligence-publication-pack", "Publication Pack", "The diagrams and worked examples, in a form you can forward."],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence Pack", "How to check the claims, and what would break them."]
] as const;

export default function ArchitectureLabPage() {
  const layers = operationalIntelligenceFramework.layers;

  return (
    <>
      <Section eyebrow="Architecture lab" title="Implementation-facing patterns for AI-native operational platforms." level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.055]">
            <Network className="mb-5 text-mint" />
            <h2 className="text-3xl font-semibold text-white">The lab translates the doctrine into reusable implementation contracts.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Each pattern must preserve the same operating discipline: evidence before conclusion, replay before trust, evaluation before action, and explicit human approval for consequential decisions.
            </p>
            <Link href="/wiki/operational-intelligence-reference-architecture" className="mt-6 inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
              Open reference architecture <ArrowRight size={18} />
            </Link>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {reviewSequence.map(([href, title, description], index) => (
              <Link key={href} href={href}>
                <Card className="h-full p-4 transition hover:border-mint/40">
                  <span className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 text-xl font-semibold text-white">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Pattern cards" title="Reusable architectures with reviewable boundaries.">
        <div className="grid gap-4 md:grid-cols-2">
          {architectureCards.map((card, index) => {
            const relatedLayer = layers[index % layers.length];
            return (
              <Card key={card.title} className="h-full">
                <div className="flex items-start justify-between gap-4">
                  <Network className="text-signal" />
                  <ShieldCheck className="text-mint" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-white">{card.title}</h2>
                <p className="mt-4 rounded border border-white/10 bg-ink p-4 font-mono text-sm leading-6 text-slate-200">{card.pattern}</p>
                <div className="mt-5 rounded border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase text-slate-500">Related framework layer</p>
                  <p className="mt-2 font-semibold text-white">{relatedLayer.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{relatedLayer.definition}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded bg-white/10 px-3 py-1 text-sm text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Contracts" title="What every architecture pattern must make inspectable.">
        <div className="grid gap-4 md:grid-cols-2">
          {labContracts.map((contract) => (
            <Link key={contract.name} href={contract.route}>
              <Card className="h-full transition hover:border-signal/40">
                <ClipboardCheck className="mb-5 text-signal" />
                <h2 className="text-2xl font-semibold text-white">{contract.name}</h2>
                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">Input</dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-300">{contract.input}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">Output</dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-300">{contract.output}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">Failure mode</dt>
                    <dd className="mt-1 text-sm leading-6 text-slate-300">{contract.failure}</dd>
                  </div>
                </dl>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint">
                  Inspect contract <ArrowRight size={15} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Layer handoff" title="The architecture is a chain of responsibility, not a loose set of ideas.">
        <Card className="overflow-hidden p-0">
          <div className="grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-5">
            {layers.map((layer, index) => (
              <Link key={layer.name} href={layer.relatedPattern} className="bg-card p-4 transition hover:bg-mint/[0.06]">
                <GitBranch className="mb-4 text-mint" />
                <p className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-semibold text-white">{layer.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{layer.output}</p>
              </Link>
            ))}
          </div>
        </Card>
      </Section>
    </>
  );
}
