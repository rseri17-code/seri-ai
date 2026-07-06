import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { principles } from "@/content/site";

export const metadata: Metadata = {
  title: "Ravikanth's Principles | Operational Intelligence and Enterprise AI",
  description: "Ravikanth Seri's public principles for Operational Intelligence, trustworthy agents, evidence-driven RCA, and enterprise AI evaluation."
};

export default function PrinciplesPage() {
  return (
    <Section eyebrow="Ravikanth's principles" title="A compact operating philosophy for AI-native enterprise operations.">
      <div className="grid gap-4">
        {principles.map((principle, index) => (
          <Card key={principle.slug} className="scroll-mt-28" >
            <div id={principle.slug} className="scroll-mt-28" />
            <p className="text-sm text-mint">Principle {index + 1}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{principle.statement}</h2>
            <p className="mt-3 leading-7 text-slate-300">{principle.explanation}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded border border-white/10 bg-ink p-4">
                <p className="text-sm font-semibold text-mint">Why it matters</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{principle.whyItMatters}</p>
              </div>
              <div className="rounded border border-white/10 bg-ink p-4">
                <p className="text-sm font-semibold text-amber">Failure mode prevented</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{principle.prevents}</p>
              </div>
              <div className="rounded border border-white/10 bg-ink p-4">
                <p className="text-sm font-semibold text-signal">Example</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{principle.example}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {principle.related.map((href) => (
                <Link key={href} href={href} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-mint/40">
                  {href}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
