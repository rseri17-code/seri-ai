import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { professionalGraph, startHerePaths, visitorReviewKit } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Start Here | Ravikanth Seri — Operational Intelligence",
  description: "Audience-specific paths through Operational Intelligence, agentic systems, enterprise AI architecture, and evaluation work.",
  path: "/start-here"
});

const routeLabels: Record<string, string> = {
  "/wiki/operational-intelligence-canonical-doctrine": "Doctrine",
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
  "/contact": "Contact",
  "https://github.com/rseri17-code": "GitHub",
  "https://www.linkedin.com/in/ravikanthseri/": "LinkedIn"
};

const reviewSpine = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine"],
  ["/wiki/operational-intelligence-reference-architecture", "Architecture"],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence"],
  ["/wiki/operational-intelligence-publication-pack", "Exports"],
  ["/investigation-room", "Operations Room"]
] as const;

const tenMinuteProofRoute = [
  {
    minutes: "00-02",
    href: "/background",
    title: "Establish the operator",
    question: "Who is Ravikanth, and why is this work grounded in production systems?",
    proof: "Career arc, production-delivery chain, and the infrastructure-to-AI operating path."
  },
  {
    minutes: "02-04",
    href: "/work",
    title: "Inspect the operating record",
    question: "What has he built or made inspectable?",
    proof: "Public work, GitHub signal, project-proof boundaries, and what each artifact does not prove."
  },
  {
    minutes: "04-06",
    href: "/wiki/operational-intelligence-canonical-doctrine",
    title: "Read the thesis",
    question: "What is the model, and where does it differ from observability or AIOps?",
    proof: "Canonical definition, boundaries, ten layers, glossary, citations, and claim posture."
  },
  {
    minutes: "06-08",
    href: "/investigation-room",
    title: "Run the case",
    question: "Does the idea behave like an operational system rather than prose?",
    proof: "OI-ROOM-001 evidence graph, hypotheses, contradiction, missing evidence, replay, gates, and approval."
  },
  {
    minutes: "08-10",
    href: "/wiki/operational-intelligence-evidence-pack",
    title: "Challenge the claim",
    question: "What would prove, weaken, or falsify the thesis?",
    proof: "Proof backlog, control-comparison protocol, practitioner review packet, and known limitations."
  }
] as const;

const orientationPath = [
  {
    href: "/background",
    label: "1. Person",
    title: "Who is Ravikanth Seri?",
    detail: "Start with the professional arc: enterprise integration, platform engineering, observability, production AI systems, and agentic operations."
  },
  {
    href: "/work",
    label: "2. Proof",
    title: "What has the work produced?",
    detail: "Inspect the operating record: projects, artifacts, public writing, architecture material, GitHub signal, and review spine."
  },
  {
    href: "/now",
    label: "3. Current focus",
    title: "What is he building now?",
    detail: "See the current thesis around Operational Intelligence, AI-assisted operations, evaluation, replay, and governed agentic systems."
  },
  {
    href: "/wiki/operational-intelligence-canonical-doctrine",
    label: "4. Doctrine",
    title: "How does he think about architecture and engineering?",
    detail: "Read the canonical model that separates observability, AIOps, incident practice, knowledge graphs, and AI evaluation."
  },
  {
    href: "/ask",
    label: "5. Ask",
    title: "Can the body of work answer back?",
    detail: "Ask questions against approved public content, with citations, refusal boundaries, and deterministic trust fixtures."
  }
] as const;

function labelFor(href: string) {
  return routeLabels[href] ?? href.replace(/^\//, "").replace(/-/g, " ");
}

export default function StartHerePage() {
  return (
      <Section eyebrow="Start here" title="Choose the path that matches why you came." level="h1">
      <div className="mb-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-white/15 bg-white/[0.05]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint">3-minute orientation</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Ravikanth Seri, explained through the record.</h2>
          <p className="mt-4 leading-7 text-slate-300">{professionalGraph.identity.currentFocus}</p>
          <p className="mt-4 border-l border-mint/40 pl-4 text-sm leading-6 text-slate-300">
            {professionalGraph.identity.throughline}
          </p>
        </Card>
        <Card className="border-amber/25 bg-amber/[0.04]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber">Public-safe boundary</p>
          <p className="mt-3 leading-7 text-slate-300">{professionalGraph.identity.publicBoundary}</p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {professionalGraph.proofLinks.slice(0, 4).map((item) => (
              <Link key={item.href} href={item.href} className="rounded border border-white/10 bg-black/20 px-3 py-3 text-sm text-slate-200 hover:border-amber/50">
                <span className="block font-semibold text-white">{item.label}</span>
                <span className="mt-1 block leading-5 text-slate-400">{item.detail ?? item.detailTemplate}</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
      <Card className="mb-6 border-signal/25 bg-signal/[0.04]">
        <h2 className="text-2xl font-semibold text-white">Recommended reading order</h2>
        <p className="mt-3 max-w-4xl leading-7 text-slate-300">
          This sequence gives a new visitor the shortest path from person to evidence to doctrine to interactive system.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {orientationPath.map((step) => (
            <Link key={step.href} href={step.href} className="rounded border border-white/10 bg-black/20 p-4 hover:border-signal/45">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">{step.label}</span>
              <span className="mt-3 block font-semibold text-white">{step.title}</span>
              <span className="mt-2 block text-sm leading-6 text-slate-300">{step.detail}</span>
            </Link>
          ))}
        </div>
      </Card>
      <Card className="mb-6 border-white/15 bg-white/[0.045]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint">10-minute proof route</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Person, work, thesis, artifact, evidence.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            This route turns the success test into an inspection sequence: operator, work, thesis, artifact, evidence.
          </p>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-5">
          {tenMinuteProofRoute.map((step) => (
            <Link key={step.minutes} href={step.href} className="rounded border border-white/10 bg-black/20 p-4 hover:border-mint/45">
              <span className="font-mono text-xs font-semibold text-mint">{step.minutes}</span>
              <span className="mt-3 block font-semibold text-white">{step.title}</span>
              <span className="mt-2 block text-sm leading-5 text-slate-300">{step.question}</span>
              <span className="mt-3 block border-t border-white/10 pt-3 text-xs leading-5 text-slate-400">{step.proof}</span>
            </Link>
          ))}
        </div>
      </Card>
      <Card className="mb-6 border-white/15 bg-white/[0.045]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">Professional profile discovery</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Everything a profile visitor should find in one or two interactions.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            The profile is not hidden behind the doctrine. Each item routes to a primary page and an evidence page.
          </p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {professionalGraph.profileDiscovery.map((item) => (
            <div key={item.need} className="rounded border border-white/10 bg-black/20 p-4">
              <h3 className="font-semibold text-white">{item.need}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.proof}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={item.primaryHref} className="rounded border border-signal/35 px-3 py-2 text-xs font-semibold text-signal hover:border-signal/60">
                  {labelFor(item.primaryHref)}
                </Link>
                <Link href={item.evidenceHref} className="rounded border border-mint/30 px-3 py-2 text-xs font-semibold text-mint hover:border-mint/60">
                  Evidence: {labelFor(item.evidenceHref)}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mb-6 border-mint/25 bg-mint/[0.04]">
        <h2 className="text-2xl font-semibold text-white">Technical review path</h2>
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
      <Card className="mb-6 border-amber/25 bg-amber/[0.04]">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber">First-time visitor review kit</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{visitorReviewKit.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{visitorReviewKit.purpose}</p>
            <p className="mt-4 border-l border-amber/40 pl-4 text-sm leading-6 text-slate-300">{visitorReviewKit.principle}</p>
            <Link href="/contact" className="mt-5 inline-flex rounded border border-amber/35 px-4 py-3 text-sm font-semibold text-amber hover:border-amber/60">
              Submit review
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {visitorReviewKit.reviewPath.map((item) => (
              <Link key={item.step} href={item.href} className="rounded border border-white/10 bg-black/20 p-3 hover:border-amber/45">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">{item.step}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-200">{item.question}</span>
              </Link>
            ))}
          </div>
        </div>
      </Card>
      <Card className="mb-6 border-signal/25 bg-signal/[0.04]">
        <h2 className="text-2xl font-semibold text-white">Visitor proof map</h2>
        <p className="mt-3 max-w-4xl leading-7 text-slate-300">
          If you only have a few minutes, these are the questions the site should answer through evidence rather than self-description.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {professionalGraph.visitorSuccessQuestions.map((item) => (
            <div key={item.question} className="rounded border border-white/10 bg-black/20 p-4">
              <h3 className="font-semibold text-white">{item.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.answerLens}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={item.primaryHref} className="rounded border border-signal/35 px-3 py-2 text-xs font-semibold text-signal hover:border-signal/60">
                  {labelFor(item.primaryHref)}
                </Link>
                <Link href={item.evidenceHref} className="rounded border border-mint/30 px-3 py-2 text-xs font-semibold text-mint hover:border-mint/60">
                  Evidence: {labelFor(item.evidenceHref)}
                </Link>
                <Link href={`/ask?prompt=${encodeURIComponent(item.askPrompt)}`} className="rounded border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-white/30">
                  Ask
                </Link>
              </div>
            </div>
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
