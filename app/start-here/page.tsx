import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { startHerePaths } from "@/content/site";

export const metadata: Metadata = {
  title: "Start Here | Ravikanth Seri — Operational Intelligence",
  description: "Audience-specific paths through Operational Intelligence, agentic systems, enterprise AI architecture, and evaluation work."
};

const routeLabels: Record<string, string> = {
  "/wiki/operational-intelligence-canonical-doctrine": "Canonical Doctrine",
  "/wiki/operational-intelligence-reference-architecture": "Reference Architecture",
  "/wiki/operational-intelligence-evidence-pack": "Evidence Pack",
  "/wiki/operational-intelligence-publication-pack": "Publication Pack",
  "/publication-pack/operational-intelligence-executive-summary.md": "Executive Summary",
  "/publication-pack/operational-intelligence-diagrams.md": "Diagram Pack",
  "/framework": "Framework",
  "/map": "Knowledge Map",
  "/work": "Work Index",
  "/background": "Background",
  "/resume": "Resume",
  "/artifacts": "Artifacts",
  "/patterns": "Patterns",
  "/manifesto": "Manifesto",
  "/products/reasonops": "ReasonOps",
  "/investigation-room": "Operations Room",
  "/evals": "Trust Evals",
  "/radar": "Radar",
  "/now": "Now",
  "/contact": "Contact"
};

const reviewSpine = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine"],
  ["/wiki/operational-intelligence-reference-architecture", "Architecture"],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence"],
  ["/wiki/operational-intelligence-publication-pack", "Exports"],
  ["/investigation-room", "Operations Room"]
] as const;

function labelFor(href: string) {
  return routeLabels[href] ?? href.replace(/^\//, "").replace(/-/g, " ");
}

export default function StartHerePage() {
  return (
    <Section eyebrow="Start here" title="Choose the path that matches why you came." level="h1">
      <Card className="mb-6 border-mint/25 bg-mint/[0.04]">
        <h2 className="text-2xl font-semibold text-white">Serious technical review path</h2>
        <p className="mt-3 max-w-4xl leading-7 text-slate-300">
          If you are evaluating the thesis rather than browsing the site, start with the doctrine, inspect the architecture,
          challenge the evidence, download the reference assets, then run the synthetic Operations Room case.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {reviewSpine.map(([href, label]) => (
            <Link key={href} href={href} className="rounded border border-mint/30 bg-mint/10 px-3 py-2 text-sm font-semibold text-mint hover:border-mint/60">
              {label}
            </Link>
          ))}
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {startHerePaths.map((path) => (
          <Card key={path.audience}>
            <h2 className="text-2xl font-semibold text-white">{path.audience}</h2>
            <p className="mt-3 leading-7 text-slate-300">{path.care}</p>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-mint">Read first</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {path.readFirst.map((href) => (
                <Link key={href} href={href} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-mint/40">
                  {labelFor(href)}
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-signal">Query the system</p>
            <Link href={`/ask?prompt=${encodeURIComponent(path.ask)}`} className="mt-2 block rounded border border-signal/25 bg-ink p-3 text-sm leading-6 text-slate-200 transition hover:border-signal/50 hover:text-signal">
              {path.ask}
            </Link>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-amber">Most relevant</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {path.matters.map((href) => (
                <Link key={href} href={href} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-amber/40">
                  {labelFor(href)}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
