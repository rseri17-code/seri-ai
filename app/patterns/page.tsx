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
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { patterns } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Architecture Patterns | Ravikanth Seri — Operational Intelligence",
  description: "Public-safe architecture patterns for Operational Intelligence, AI incident investigation, transaction intelligence, operational memory, and evaluation.",
  path: "/patterns"
});

const stages = [
  {
    id: "investigation-core",
    number: "1",
    name: "Investigation Core",
    description:
      "How the system turns signals into a reviewable explanation under uncertainty — evidence, confidence, transaction journeys, and change impact.",
    patternSlugs: [
      "evidence-driven-rca",
      "confidence-calibrated-rca",
      "transaction-journey-reconstruction",
      "change-impact-reasoning"
    ]
  },
  {
    id: "structural-reality",
    number: "2",
    name: "Structural Reality",
    description:
      "How dependency, ownership, and blast radius become first-class reasoning inputs instead of afterthoughts.",
    patternSlugs: ["topology-aware-reasoning"]
  },
  {
    id: "memory-shared-context",
    number: "3",
    name: "Memory & Shared Context",
    description:
      "How context accumulates and stays coherent across humans and agents — governed memory and shared state.",
    patternSlugs: ["operational-memory", "shared-context-for-enterprise-agents"]
  },
  {
    id: "agent-control-plane",
    number: "4",
    name: "Agent Control Plane",
    description:
      "How agents are bounded, gated, and regression-tested so they consume the context layer instead of replacing it.",
    patternSlugs: [
      "agentic-incident-investigation",
      "human-in-the-loop-operational-ai",
      "evaluation-and-replay"
    ]
  }
] as const;

const patternBySlug = new Map(patterns.map((pattern) => [pattern.slug, pattern]));

export default function PatternsPage() {
  return (
    <Section
      eyebrow="Operating model"
      title="Architecture patterns as an ordered operating model."
      level="h1"
    >
      <div className="mx-auto max-w-3xl space-y-4">
        <p className="text-base leading-7 text-slate-300">
          These are not a catalog of features. They are the operating model of the context layer — the layer that makes
          operations and data intelligent before any model is called. Agents consume it; they do not replace it. The agent
          is not the moat.
        </p>
        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">How to read this</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Investigation → Structure → Memory → Control. Start with how explanations are formed, then how the system sees
            dependencies, then how context accumulates, then how agents are bounded and tested.
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-12">
        {stages.map((stage) => (
          <section key={stage.id} id={stage.id} className="scroll-mt-28">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">
                  Stage {stage.number}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{stage.name}</h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-400">{stage.description}</p>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {stage.patternSlugs.map((slug) => {
                const pattern = patternBySlug.get(slug);
                if (!pattern) return null;
                return (
                  <Link key={pattern.slug} href={`/patterns/${pattern.slug}`}>
                    <Card className="h-full transition hover:border-signal/40">
                      <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-mint">
                        Stage {stage.number} · {stage.name}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold text-white">{pattern.title}</h3>
                      <p className="mt-3 leading-7 text-slate-300">{pattern.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {pattern.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded border border-white/10 px-2 py-1 text-xs text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </Section>
  );
}
