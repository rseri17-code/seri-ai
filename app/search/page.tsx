import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, SearchCheck } from "lucide-react";
import { Card } from "@/components/card";
import { ContentSearch } from "@/components/content-search";
import { Section } from "@/components/section";
import { buildPublicSourceIndex } from "@/lib/content";
import { buildKnowledgeGraph, buildPublishingIndex } from "@/lib/publishing";

export const metadata: Metadata = {
  title: "Search | seri.ai",
  description: "Search Ravikanth Seri's public Operational Intelligence wiki, principles, patterns, projects, and essays."
};

const researchPrompts = [
  ["Doctrine", "What is Operational Intelligence and what is it not?", "/wiki/operational-intelligence-canonical-doctrine"],
  ["Architecture", "Which contracts make two implementations comparable?", "/wiki/operational-intelligence-reference-architecture"],
  ["Evidence", "What would convince a skeptical engineer that this model is useful?", "/wiki/operational-intelligence-evidence-pack"],
  ["Operations Room", "How does OI-ROOM-001 move from evidence to a decision packet?", "/investigation-room"],
  ["Evaluation", "Which trust fixtures gate Ask Ravikanth behavior?", "/evals"],
  ["Builder proof", "Where is Ravikanth's public work connected to proof objects?", "/work"]
] as const;

export default function SearchPage() {
  const sources = buildPublicSourceIndex();
  const publishingAssets = buildPublishingIndex();
  const graph = buildKnowledgeGraph();
  const stats = [
    ["Searchable sources", sources.length],
    ["Published assets", publishingAssets.filter((asset) => asset.status === "published").length],
    ["Graph relationships", graph.relationships.length]
  ] as const;
  const referenceDownloadCount = sources.filter((source) => source.category === "Reference Downloads").length;

  return (
    <>
      <Section eyebrow="Search" title="Search the public Operational Intelligence knowledge base." level="h1">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.045] p-5">
            <SearchCheck className="mb-5 text-mint" />
            <h2 className="text-2xl font-semibold text-white">A research console for the doctrine, reference architecture, proof objects, and public work.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Search is part of the product contract: every public asset should be findable by layer, artifact type, pattern, product connection, and review question.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-2">
                  <p className="text-xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-[0.68rem] uppercase text-slate-500">{label}</p>
                </div>
              ))}
              <div className="rounded border border-white/10 bg-black/20 p-2">
                <p className="text-xl font-semibold text-white">{referenceDownloadCount}</p>
                <p className="mt-1 text-[0.68rem] uppercase text-slate-500">Reference downloads</p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">Canonical research prompts</p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {researchPrompts.map(([label, , href]) => (
                <Link key={label} href={href} className="flex items-center justify-between gap-3 rounded border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-signal/40 hover:text-white">
                  <span>{label}</span>
                  <ArrowRight size={15} className="text-signal" />
                </Link>
              ))}
            </div>
          </Card>
        </div>
        <div className="mt-6">
          <ContentSearch sources={sources} />
        </div>
      </Section>
    </>
  );
}
