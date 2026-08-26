import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, SearchCheck } from "lucide-react";
import { Card } from "@/components/card";
import { ContentSearch } from "@/components/content-search";
import { Section } from "@/components/section";
import { buildPublicSourceIndex } from "@/lib/content";
import { publicRouteMetadata } from "@/lib/metadata";
import { buildKnowledgeGraph, buildPublishingIndex } from "@/lib/publishing";

export const metadata: Metadata = publicRouteMetadata({
  title: "Search | seri.ai",
  description: "Search Ravikanth Seri's public Operational Intelligence wiki, principles, patterns, projects, and essays.",
  path: "/search"
});

const researchPrompts = [
  ["Doctrine", "What is Operational Intelligence and what is it not?", "/wiki/operational-intelligence-canonical-doctrine"],
  ["Architecture", "Which contracts make two implementations comparable?", "/wiki/operational-intelligence-reference-architecture"],
  ["Evidence", "What would convince a skeptical engineer that this model is useful?", "/wiki/operational-intelligence-evidence-pack"],
  ["Operations Room", "How does OI-ROOM-001 move from evidence to a decision packet?", "/investigation-room"],
  ["Evaluation", "Which trust fixtures gate Ask Ravi behavior?", "/evals"],
  ["Public work", "Where is Ravikanth's public work connected to proof objects?", "/work"]
] as const;

export default function SearchPage() {
  const sources = buildPublicSourceIndex();
  const clientSources = sources.map((source) => ({
    ...source,
    content: source.content.length > 420 ? `${source.content.slice(0, 420)}...` : source.content
  }));
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
            <h2 className="text-2xl font-semibold text-white">A public research index for the doctrine, reference architecture, proof objects, and public work.</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Search is part of the public record: every public asset should be findable by layer, artifact type, pattern, work connection, and review question.
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
              {researchPrompts.map(([label, prompt, href]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{prompt}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href={`/ask?prompt=${encodeURIComponent(prompt)}`} className="inline-flex items-center gap-2 rounded bg-signal px-3 py-2 text-xs font-semibold text-ink">
                      Ask <ArrowRight size={13} />
                    </Link>
                    <Link href={href} className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-signal/40">
                      Source <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="mt-6">
          <ContentSearch sources={clientSources} />
        </div>
      </Section>
    </>
  );
}
