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
  blurb: string;
  slugs: string[];
}> = [
  {
    id: "investigation-core",
    title: "Investigation Core",
    blurb:
      "Reconstruct what happened, along which transaction path, after which change \u2014 and say how confident you are. Everything downstream inherits the honesty of this stage.",
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
    blurb:
      "Reason about the system as it is right now, not as the architecture diagram remembers it. Topology is usually the difference between a plausible explanation and a correct one.",
    slugs: ["topology-aware-reasoning"]
  },
  {
    id: "memory-and-shared-context",
    title: "Memory & Shared Context",
    blurb:
      "Keep what the last investigation learned, and make it readable by every human and agent that comes next. Without this, every incident starts from zero.",
    slugs: ["operational-memory", "shared-context-for-enterprise-agents"]
  },
  {
    id: "agent-control-plane",
    title: "Agent Control Plane",
    blurb:
      "Only here does an agent belong in the loop: bounded in what it can do, evaluated against fixtures, replayable after the fact, and answerable to a named human. This stage is last for a reason.",
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
    <Section eyebrow="Patterns" title="Ten patterns, in the order you have to build them." level="h1">
      <div className="max-w-4xl">
        <p className="text-lg leading-8 text-slate-200">
          This is not a catalogue. The order is the argument: each stage depends on the one before it, and only the last stage
          mentions agents at all.
        </p>
        <p className="mt-4 leading-7 text-slate-300">
          Stages one to three are the context layer &mdash; what happened, what the system actually looks like, and what was already
          learned. Stage four is where an agent plugs into it. Most teams start at stage four and discover the first three were the
          hard part. That is the whole thesis in one page: <span className="text-white">the agent is not the moat.</span>
        </p>
        <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">How to read this</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-slate-200">
            <span className="text-mint">Investigation</span>
            <span aria-hidden="true" className="text-slate-600">&rarr;</span>
            <span>Structure</span>
            <span aria-hidden="true" className="text-slate-600">&rarr;</span>
            <span>Memory</span>
            <span aria-hidden="true" className="text-slate-600">&rarr;</span>
            <span className="text-amber">Control</span>
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Establish the facts, then the structure they sit in, then what you keep from them. Hand control to an agent last.
          </p>
        </div>
      </div>

      <div className="mt-12 space-y-14">
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
                <p className="mt-2 w-full max-w-3xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
                  {stage.blurb}
                </p>
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
