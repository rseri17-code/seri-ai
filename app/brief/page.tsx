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
 */
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, CheckCircle2, Compass, FileText, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { categoryBrief } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Brief | Ravikanth Seri — Operational Intelligence",
  description: "An executive brief on Operational Intelligence, AI-native operations, observability for AI, and ops for observability.",
  path: "/brief"
});

const decisionBrief = [
  ["Category", "Operational Intelligence is the reasoning layer between enterprise telemetry and accountable human decision."],
  ["Why now", "AI agents are entering operational workflows faster than enterprise evidence, governance, and evaluation systems are maturing."],
  ["Risk", "Without evidence graphs, replay, refusal behavior, and approval gates, AI operations becomes confident automation without accountable reasoning."],
  ["Wedge", "Start with incident investigation. It is the one workflow that exposes every weakness at once — bad telemetry, missing ownership, and untested judgment all surface in the same hour."]
] as const;

const executiveProofPath = [
  ["/publication-pack/operational-intelligence-executive-summary.md", "One-page executive summary", "The fastest shareable framing for leaders."],
  ["/wiki/operational-intelligence-canonical-doctrine", "Canonical doctrine", "What the category claims, and where the claim stops."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference architecture", "Precise enough for a team to build from without a conversation."],
  ["/investigation-room", "Operations Room", "A synthetic case that makes the thesis inspectable rather than assertable."],
  ["/framework", "Thesis radar", "Where the market is moving, and what would prove this thesis wrong."],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence pack", "The case against, assembled as carefully as the case for."],
  ["/contact", "Practitioner review", "A structured way for practitioners to tell us this is wrong."]
] as const;

export default function BriefPage() {
  return (
    <>
      <Section eyebrow="Category brief" title={categoryBrief.title} level="h1">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <FileText className="mb-5 text-mint" />
            <p className="text-2xl leading-10 text-white">{categoryBrief.subtitle}</p>
            <p className="mt-6 text-lg leading-8 text-slate-300">{categoryBrief.thesis}</p>
            <p className="mt-5 rounded-lg border border-white/10 bg-ink p-4 text-sm leading-6 text-slate-300">
              Audience: {categoryBrief.audience}
            </p>
          </Card>
          <Card>
            <Compass className="mb-5 text-signal" />
            <h2 className="text-2xl font-semibold text-white">Contrarian insight</h2>
            <p className="mt-4 text-lg leading-8 text-slate-200">{categoryBrief.contrarianInsight}</p>
            <Link href="/investigation-room" className="mt-6 inline-flex items-center gap-2 rounded bg-signal px-4 py-3 font-semibold text-ink">
              Inspect the case <ArrowRight size={18} />
            </Link>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Decision brief" title="The executive readout in one screen.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {decisionBrief.map(([label, statement]) => (
            <Card key={label} className="h-full">
              <p className="text-sm font-semibold uppercase text-mint">{label}</p>
              <p className="mt-3 text-lg leading-8 text-slate-200">{statement}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why now" title="The market is moving toward Operational Intelligence.">
        <div className="grid gap-4 md:grid-cols-2">
          {categoryBrief.whyNow.map((item) => (
            <Card key={item}>
              <Sparkles className="mb-4 text-mint" />
              <p className="leading-7 text-slate-300">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Wedge" title="Why this angle is credible.">
        <Card>
          <BrainCircuit className="mb-5 text-signal" />
          <p className="text-xl leading-9 text-slate-200">{categoryBrief.wedge}</p>
        </Card>
      </Section>

      <Section eyebrow="Proof" title="What makes this more than positioning.">
        <div className="grid gap-4 md:grid-cols-2">
          {categoryBrief.proofPoints.map((point) => (
            <Card key={point}>
              <CheckCircle2 className="mb-4 text-mint" />
              <p className="leading-7 text-slate-300">{point}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Proof path" title="How a serious reviewer should evaluate the brief.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {executiveProofPath.map(([href, title, description], index) => (
            <Link key={href} href={href}>
              <Card className="h-full transition hover:border-mint/40">
                <p className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint">
                  Inspect evidence <ArrowRight size={15} />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Memory hooks" title="What a visitor should remember.">
        <div className="space-y-3">
          {categoryBrief.whatToRemember.map((item, index) => (
            <Card key={item} className="flex items-start gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-mint/10 font-mono text-sm text-mint">{index + 1}</span>
              <p className="text-lg leading-8 text-slate-200">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Next" title="What follows from the thesis.">
        <div className="grid gap-4 md:grid-cols-2">
          {categoryBrief.nextMoves.map((move) => (
            <Card key={move}>
              <p className="leading-7 text-slate-300">{move}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
