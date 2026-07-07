import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { startHerePaths } from "@/content/site";

export const metadata: Metadata = {
  title: "Start Here | Ravikanth Seri — Operational Intelligence",
  description: "Audience-specific paths through Operational Intelligence, agentic systems, enterprise AI architecture, and evaluation work."
};

export default function StartHerePage() {
  return (
    <Section eyebrow="Start here" title="Choose the path that matches why you came.">
      <div className="grid gap-4 lg:grid-cols-2">
        {startHerePaths.map((path) => (
          <Card key={path.audience}>
            <h2 className="text-2xl font-semibold text-white">{path.audience}</h2>
            <p className="mt-3 leading-7 text-slate-300">{path.care}</p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-mint">Read first</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {path.readFirst.map((href) => (
                <Link key={href} href={href} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-mint/40">
                  {href}
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-signal">Query the system</p>
            <p className="mt-2 rounded border border-white/10 bg-ink p-3 text-sm text-slate-200">{path.ask}</p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-amber">Most relevant</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {path.matters.map((href) => (
                <Link key={href} href={href} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-amber/40">
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
