import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, CheckCircle2, Compass, FileText, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { categoryBrief } from "@/content/site";

export const metadata: Metadata = {
  title: "Brief | Ravikanth Seri — Operational Intelligence",
  description: "An executive brief on Operational Intelligence, AI-native operations, observability for AI, and ops for observability."
};

export default function BriefPage() {
  return (
    <>
      <Section eyebrow="Category brief" title={categoryBrief.title}>
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
            <Link href="/simulator" className="mt-6 inline-flex items-center gap-2 rounded bg-signal px-4 py-3 font-semibold text-ink">
              See it as a product <ArrowRight size={18} />
            </Link>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Why now" title="The market is moving toward Ravikanth's thesis.">
        <div className="grid gap-4 md:grid-cols-2">
          {categoryBrief.whyNow.map((item) => (
            <Card key={item}>
              <Sparkles className="mb-4 text-mint" />
              <p className="leading-7 text-slate-300">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Wedge" title="Why Ravikanth can own this angle.">
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

      <Section eyebrow="Next" title="The product roadmap that follows the thesis.">
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
