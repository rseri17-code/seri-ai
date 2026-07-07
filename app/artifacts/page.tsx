import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Boxes, ClipboardCheck, FileText, GitBranch, Map } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { releaseModel } from "@/content/site";

export const metadata: Metadata = {
  title: "Artifacts | seri.ai",
  description: "Public-safe artifacts for Operational Intelligence: maps, simulators, product briefs, frameworks, and evaluation rubrics."
};

const artifacts = [
  {
    href: "/investigation-room",
    title: "ReasonOps Operations Room",
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
    title: "ReasonOps Product Brief",
    type: "Product Brief",
    description: "The product/platform expression of Operational Intelligence.",
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

export default function ArtifactsPage() {
  return (
    <>
      <Section eyebrow="Artifacts" title="Public-safe proof objects for the Operational Intelligence thesis.">
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
