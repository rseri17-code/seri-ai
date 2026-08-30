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
 *
 * 2026-08-29 Project Lead: patterns grouped into four stages (structure). Stage framing
 * copy is Claude's next pass — do not invent long stage descriptions here.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { patterns, type Pattern } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Architecture Patterns | Ravikanth Seri — Operational Intelligence",
  description:
    "Public-safe architecture patterns for Operational Intelligence, AI incident investigation, transaction intelligence, operational memory, and evaluation.",
  path: "/patterns"
});

/** Ordered operating model — stage order is fixed by Project Lead assignment 2026-08-29. */
const patternStages: Array<{
  id: string;
  title: string;
  slugs: string[];
}> = [
  {
    id: "investigation-core",
    title: "Investigation Core",
    slugs: [
      "evidence-driven-rca",
      "confidence-calibrated-rca",
      "transaction-journey-reconstruction",
      "change-impact-reasoning"
    ]
  },
  {
    id: "structural-reality",
    title: "Structural Reality",
    slugs: ["topology-aware-reasoning"]
  },
  {
    id: "memory-and-shared-context",
    title: "Memory & Shared Context",
    slugs: ["operational-memory", "shared-context-for-enterprise-agents"]
  },
  {
    id: "agent-control-plane",
    title: "Agent Control Plane",
    slugs: [
      "agentic-incident-investigation",
      "human-in-the-loop-operational-ai",
      "evaluation-and-replay"
    ]
  }
];

function patternsForStage(slugs: string[]): Pattern[] {
  const bySlug = new Map(patterns.map((pattern) => [pattern.slug, pattern]));
  return slugs.flatMap((slug) => {
    const pattern = bySlug.get(slug);
    return pattern ? [pattern] : [];
  });
}

export default function PatternsPage() {
  return (
    <Section eyebrow="Patterns" title="Architecture patterns for AI-native operational systems." level="h1">
      <div className="space-y-14">
        {patternStages.map((stage, index) => {
          const stagePatterns = patternsForStage(stage.slugs);
          if (stagePatterns.length === 0) return null;

          return (
            <section key={stage.id} aria-labelledby={`stage-${stage.id}`} className="scroll-mt-28">
              <div className="mb-5 flex flex-wrap items-baseline gap-3 border-b border-white/10 pb-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-mint">
                  Stage {index + 1}
                </p>
                <h2 id={`stage-${stage.id}`} className="text-xl font-semibold text-white md:text-2xl">
                  {stage.title}
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {stagePatterns.map((pattern) => (
                  <Link key={pattern.slug} href={`/patterns/${pattern.slug}`}>
                    <Card className="h-full transition hover:border-signal/40">
                      <h3 className="text-2xl font-semibold text-white">{pattern.title}</h3>
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
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </Section>
  );
}
