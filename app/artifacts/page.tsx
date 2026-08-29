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
    description: "The whole argument in one place — what the doctrine claims, how the architecture works, and the diagrams that show it. Start here if you want the full thesis rather than a slice.",
    icon: FileText
  },
  {
    href: "/wiki/operational-intelligence-evidence-pack",
    title: "Operational Intelligence Evidence Pack",
    type: "Evidence Pack",
    description: "The skeptic’s version. What would have to be true for the thesis to hold, what would falsify it, and what has not been measured yet.",
    icon: ClipboardCheck
  },
  {
    href: "/investigation-room",
    title: "Operational Intelligence Operations Room",
    type: "Workbench",
    description: "Work a synthetic incident end to end. Evidence accumulates, competing explanations stay open, and the decision packet assembles where you can watch it.",
    icon: ClipboardCheck
  },
  {
    href: "/map",
    title: "Operational Intelligence Map",
    type: "Map",
    description: "How every piece here connects, in one diagram — for readers who would rather see the structure than read about it.",
    icon: Map
  },
  {
    href: "/products/reasonops",
    title: "ReasonOps Public Brief",
    type: "Public Brief",
    description: "What the doctrine looks like as a product, described concretely enough to argue with.",
    icon: Boxes
  },
  {
    href: "/patterns/evidence-driven-rca",
    title: "Evidence-Driven RCA Field Guide",
    type: "Field Guide",
    description: "How to keep facts, hypotheses, and confidence apart during an investigation so the write-up survives review. Reusable as written.",
    icon: GitBranch
  },
  {
    href: "/patterns/evaluation-and-replay",
    title: "AI Evaluation Rubric",
    type: "Pattern",
    description: "The gate an AI system should pass before it ships: is it grounded, does it refuse well, does it cite. Applied to the assistant on this site.",
    icon: FileText
  }
];

const downloadableArtifacts = [
  ["/publication-pack/operational-intelligence-diagrams.md", "Diagram Pack", "Architecture, state-machine, sequence, evidence graph, and replay-loop diagrams."],
  ["/publication-pack/decision-packet-example.md", "Decision Packet Example", "A reviewable action packet with approval class, risks, alternatives, contradictory evidence, and missing evidence."],
  ["/publication-pack/oi-room-001-control-comparison-run-001.md", "Control Comparison, Run 001", "The first execution of the comparison protocol, including the two findings that went against the thesis."],
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
      <Section eyebrow="Artifacts" title="Objects you can open, read, and argue with." level="h1">
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
