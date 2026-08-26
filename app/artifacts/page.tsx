import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Boxes, ClipboardCheck, FileText, GitBranch, Map } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { releaseModel } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Artifacts | seri.ai",
  description: "Public-safe artifacts for Operational Intelligence: maps, simulators, briefs, frameworks, and evaluation rubrics.",
  path: "/artifacts"
});

const artifacts = [
  {
    href: "/wiki/operational-intelligence-publication-pack",
    title: "Operational Intelligence Publication Pack",
    type: "Reference Pack",
    description: "The navigable package for diagrams, comparison tables, decision packet example, printable walkthrough, executive summary, glossary, and PDFs.",
    icon: FileText
  },
  {
    href: "/wiki/operational-intelligence-evidence-pack",
    title: "Operational Intelligence Evidence Pack",
    type: "Evidence Pack",
    description: "Benchmark rubric, control comparisons, minimum conformance checklist, practitioner review path, evidence ledger, and falsification criteria.",
    icon: ClipboardCheck
  },
  {
    href: "/investigation-room",
    title: "Operational Intelligence Operations Room",
    type: "Workbench",
    description: "Interactive evidence-first operations room with graph replay, timeline, hypotheses, confidence, RCA packet, and release gates.",
    icon: ClipboardCheck
  },
  {
    href: "/map",
    title: "Operational Intelligence Map",
    type: "Map",
    description: "The visual operating system connecting layers, patterns, product surfaces, and public assets.",
    icon: Map
  },
  {
    href: "/products/reasonops",
    title: "ReasonOps Public Brief",
    type: "Public Brief",
    description: "The public expression of Operational Intelligence.",
    icon: Boxes
  },
  {
    href: "/patterns/evidence-driven-rca",
    title: "Evidence-Driven RCA Field Guide",
    type: "Field Guide",
    description: "A reusable public-safe pattern for separating facts, hypotheses, confidence, and action.",
    icon: GitBranch
  },
  {
    href: "/patterns/evaluation-and-replay",
    title: "AI Evaluation Rubric",
    type: "Pattern",
    description: "A release-gate model for groundedness, refusal behavior, evidence coverage, and usefulness.",
    icon: FileText
  }
];

const downloadableArtifacts = [
  ["/publication-pack/operational-intelligence-diagrams.md", "Diagram Pack", "Architecture, state-machine, sequence, evidence graph, and replay-loop diagrams."],
  ["/publication-pack/decision-packet-example.md", "Decision Packet Example", "A reviewable action packet with approval class, risks, alternatives, contradictory evidence, and missing evidence."],
  ["/publication-pack/oi-room-001-printable-walkthrough.md", "OI-ROOM-001 Walkthrough", "The printable synthetic case walkthrough through evidence, hypotheses, gates, action, and learning."],
  ["/downloads/operational-intelligence-publication-pack.pdf", "Publication Pack PDF", "Shareable PDF for the doctrine, reference architecture, diagrams, tables, and walkthrough."],
  ["/downloads/operational-intelligence-evidence-pack.pdf", "Evidence Pack PDF", "Shareable PDF for benchmarks, control comparisons, practitioner review, and falsification criteria."],
  ["/downloads/oi-room-001-printable-walkthrough.pdf", "Walkthrough PDF", "Printable OI-ROOM-001 investigation packet for review conversations."]
] as const;

const reviewerSharePackets = [
  ["Executive reviewer", "/downloads/operational-intelligence-executive-summary.pdf", "Send the one-page summary first, then the Evidence Pack if the conversation turns to proof."],
  ["Systems architect", "/wiki/operational-intelligence-reference-architecture", "Start with contracts, state machines, schemas, conformance, and the diagram pack."],
  ["SRE or operations reviewer", "/downloads/oi-room-001-printable-walkthrough.pdf", "Use OI-ROOM-001 to inspect evidence flow, hypotheses, missing evidence, approval, and learning."],
  ["AI governance reviewer", "/downloads/operational-intelligence-evidence-pack.pdf", "Use the evidence pack for benchmarks, refusal boundaries, practitioner review, and falsification criteria."]
] as const;

export default function ArtifactsPage() {
  return (
    <>
      <Section eyebrow="Artifacts" title="Public-safe proof objects for the Operational Intelligence thesis." level="h1">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {artifacts.map((artifact) => {
            const Icon = artifact.icon;
            return (
              <Link key={artifact.href} href={artifact.href}>
                <Card className="h-full transition hover:border-signal/40">
                  <Icon className="mb-5 text-signal" />
                  <p className="text-sm font-semibold uppercase text-mint">{artifact.type}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{artifact.title}</h2>
                  <p className="mt-3 leading-7 text-slate-300">{artifact.description}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal">Open artifact <ArrowRight size={15} /></p>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section eyebrow="Downloadable artifacts" title="Reference objects a reviewer can inspect or share.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {downloadableArtifacts.map(([href, title, description]) => (
            <Link key={href} href={href}>
              <Card className="h-full transition hover:border-mint/40">
                <p className="text-sm font-semibold uppercase text-mint">{href.endsWith(".pdf") ? "PDF export" : "Markdown artifact"}</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-signal">Open artifact <ArrowRight size={15} /></p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Reviewer share packets" title="Send the smallest artifact that matches the review question.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reviewerSharePackets.map(([audience, href, description]) => (
            <Link key={audience} href={href}>
              <Card className="h-full border-signal/20 bg-signal/[0.04] transition hover:border-signal/45">
                <p className="text-sm font-semibold uppercase text-signal">{audience}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{description}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint">Open packet <ArrowRight size={15} /></p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Release model" title="seri.ai should compound through proof objects.">
        <Card className="grid gap-5 md:grid-cols-[1fr_1.2fr] md:items-center">
          <div>
            <p className="text-2xl font-semibold text-white">{releaseModel.cadence}</p>
            <p className="mt-4 text-sm font-semibold uppercase text-mint">{releaseModel.currentRelease}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {releaseModel.assets.map((asset) => (
              <span key={asset} className="rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300">{asset}</span>
            ))}
          </div>
        </Card>
      </Section>
    </>
  );
}
