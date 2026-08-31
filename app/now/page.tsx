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
import { ArrowRight, BrainCircuit, ClipboardCheck, Compass, Hammer, HelpCircle, PenLine, SearchCheck, Shield, type LucideIcon } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { nowPage } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Now | Ravikanth Seri",
  description: "Ravikanth Seri's current public focus areas across Operational Intelligence, agentic systems, transaction intelligence, and AI evaluation.",
  path: "/now"
});

const builderLedger = [
  [
    "/wiki/operational-intelligence-canonical-doctrine",
    "Doctrine frozen at v1.0",
    "Definitions, boundaries, ten layers, glossary, claim classification, and synthetic OI-ROOM-001 framing."
  ],
  [
    "/wiki/operational-intelligence-reference-architecture",
    "Reference architecture published",
    "Implementation contracts, state machines, schemas, evaluation gates, approval classes, and conformance levels."
  ],
  [
    "/investigation-room",
    "Operations Room live",
    "Synthetic incident workbench for evidence, transaction timing, hypotheses, replay, evaluation, and human approval."
  ],
  [
    "/ask",
    "Ask Ravikanth trust fixtures",
    "Deterministic behavior checks for grounding, refusal, citation presence, and related routing."
  ],
  [
    "/wiki/operational-intelligence-publication-pack",
    "Publication pack available",
    "Diagrams, comparison tables, decision packet, printable walkthrough, executive summary, glossary card, and PDFs."
  ],
  [
    "/wiki/operational-intelligence-evidence-pack",
    "Evidence pack open for review",
    "Benchmark rubric, control comparisons, falsification criteria, conformance checklist, and practitioner review path."
  ]
] as const;

const proofCheckpoints = [
  "Collect practitioner criticism from SRE, architecture, AI engineering, governance, founder, and executive reviewers.",
  "Compare OI-ROOM-001 against dashboard-only and chatbot-only baselines.",
  "Add more synthetic replay cases only when they test a distinct failure mode.",
  "Use review feedback to revise v1.x assets without drifting the canonical terminology.",
  "Keep Ask Ravikanth grounded in published assets rather than private memory or personality imitation."
] as const;

export default function NowPage() {
  const sections: Array<[string, string[], LucideIcon]> = [
    ["Current focus", nowPage.currentFocus, Compass],
    ["What I am building", nowPage.building, Hammer],
    ["What I am studying", nowPage.studying, SearchCheck],
    ["What I am writing about", nowPage.writing, PenLine],
    ["What I am avoiding", nowPage.avoiding, Shield],
    ["Current questions", nowPage.questions, HelpCircle]
  ];

  return (
    <>
      <Section eyebrow="Now" title="What Ravikanth is actively building and thinking through." level="h1">
        <Card className="mb-5 border-mint/25 bg-mint/[0.05]">
          <BrainCircuit className="mb-5 text-mint" />
          <h2 className="text-3xl font-semibold text-white">Ravikanth Seri is treating Agentic SRE as an inspectable operating system.</h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            Not generic AI adoption. The question is narrower: what does an operational agent have to do before anyone
            should let it near production? Gather evidence, hold competing explanations open, and hand the decision back
            to a human who can see exactly how it was reached.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded border border-white/10 bg-black/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Current focus</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{nowPage.currentFocus[0]}</p>
            </div>
            <div className="rounded border border-white/10 bg-black/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Building</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{nowPage.building[1]}</p>
            </div>
            <div className="rounded border border-white/10 bg-black/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Studying</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{nowPage.studying[0]}</p>
            </div>
            <Link href="/wiki/operational-intelligence-evidence-pack" className="rounded border border-white/10 bg-black/20 p-3 transition hover:border-mint/45">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Proof path</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{proofCheckpoints[0]}</p>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/work" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
              Review the work <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
              Challenge the model
            </Link>
          </div>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map(([title, items, Icon]) => (
            <Card key={title as string} className="h-full">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
                  <Icon size={18} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title as string}</h3>
              </div>
              <ul className="mt-4 space-y-3 text-slate-300">
                {(items as string[]).map((item) => (
                  <li key={item} className="leading-7">{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Research ledger" title="What Ravikanth is trying to prove next.">
        <div className="grid gap-4 lg:grid-cols-2">
          {nowPage.researchLedger.map((item) => (
            <Link key={item.question} href={item.href}>
              <Card className="h-full border-white/10 bg-white/[0.035] transition hover:border-signal/40">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Research question</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.question}</h3>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-mint">Why it matters</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.whyItMatters}</p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded border border-mint/20 bg-mint/[0.045] p-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mint">Current evidence</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{item.currentEvidence}</p>
                  </div>
                  <div className="rounded border border-signal/20 bg-signal/[0.045] p-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal">Next proof</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{item.nextProof}</p>
                  </div>
                  <div className="rounded border border-amber/20 bg-amber/[0.045] p-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-amber">Would change the model</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{item.wouldChangeMind}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <Section eyebrow="Builder ledger" title="Current public assets that make the work inspectable.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {builderLedger.map(([href, title, description], index) => (
            <Link key={href} href={href}>
              <Card className="h-full transition hover:border-mint/40">
                <ClipboardCheck className="mb-4 text-mint" />
                <p className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint">
                  Inspect asset <ArrowRight size={15} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Proof loop" title="The next work is evidence, not more slogans.">
        <Card className="border-signal/25 bg-signal/[0.055]">
          <h3 className="text-3xl font-semibold text-white">The useful question now is: what would convince another experienced engineer that the model works?</h3>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {proofCheckpoints.map((checkpoint, index) => (
              <div key={checkpoint} className="rounded border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-3 leading-7 text-slate-200">{checkpoint}</p>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </>
  );
}
