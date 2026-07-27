import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Filter } from "lucide-react";
import { Card } from "@/components/card";
import { EmailCapture } from "@/components/email-capture";
import { Section } from "@/components/section";
import { articles, assetTypes } from "@/content/site";
import { buildPublishingIndex } from "@/lib/publishing";

export const metadata: Metadata = {
  title: "Library | seri.ai",
  description: "Essays, memos, notes, field guides, and public assets for Operational Intelligence."
};

const referenceShelf = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Canonical Doctrine", "Definition, boundaries, ten-layer model, glossary, claim posture, and citations."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "Contracts, schemas, state machines, governance, evaluation gates, and conformance levels."],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence Pack", "Benchmark rubric, control comparisons, practitioner review, and falsification criteria."],
  ["/wiki/operational-intelligence-publication-pack", "Publication Pack", "Diagrams, comparison tables, decision packet, walkthrough, executive summary, glossary, and PDFs."],
  ["/publication-pack/operational-intelligence-diagrams.md", "Diagram Pack", "Architecture diagrams, state machines, sequence diagrams, evidence graph diagrams, and replay loops."],
  ["/downloads/operational-intelligence-publication-pack.pdf", "Publication PDF", "Shareable review artifact for technical reviewers, executives, architects, and founders."]
] as const;

const canonicalReadingPath = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Define the doctrine", "Start with the precise definition, boundaries, claims, glossary, and OI-ROOM-001 case."],
  ["/wiki/operational-intelligence-reference-architecture", "Inspect the architecture", "Move from thesis to contracts, state machines, schemas, evaluation gates, and conformance."],
  ["/investigation-room", "Run the artifact", "Watch the model behave through evidence, transaction timing, contradiction, missing evidence, and approval."],
  ["/wiki/operational-intelligence-evidence-pack", "Challenge the evidence", "Use falsification criteria, control comparisons, and practitioner review questions."],
  ["/ideas/operational-intelligence-is-the-new-control-plane", "Read the point of view", "Follow the category argument into essays, memos, and field notes."]
] as const;

export default function LibraryPage() {
  const themes = Array.from(new Set(articles.map((article) => article.theme)));
  const publishingAssets = buildPublishingIndex();
  const corpusStats = [
    ["Published assets", publishingAssets.filter((asset) => asset.status === "published").length],
    ["Framework links", publishingAssets.flatMap((asset) => asset.frameworkLayers).length],
    ["Ask prompts", publishingAssets.flatMap((asset) => asset.askQuestions).length],
    ["Reference exports", referenceShelf.length]
  ] as const;

  return (
    <>
      <Section eyebrow="Library" title="Public assets for Operational Intelligence." level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="h-fit">
            <BookOpen className="mb-5 text-mint" />
            <h2 className="text-2xl font-semibold text-white">Not a blog. A compounding body of work.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The Library collects doctrine, reference architecture, evidence packs, diagrams, field guides, memos, and essays that define the language of Operational Intelligence.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {corpusStats.map(([label, value]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-xs uppercase text-slate-500">{label}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold uppercase text-signal">Asset types</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {assetTypes.map((type) => (
                <span key={type} className="rounded border border-white/10 px-3 py-2 text-xs text-slate-300">{type}</span>
              ))}
            </div>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <Link key={article.slug} href={`/ideas/${article.slug}`}>
                <Card className="h-full transition hover:border-mint/40">
                  <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                    <span className="text-mint">{article.theme}</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{article.title}</h2>
                  <p className="mt-3 leading-7 text-slate-300">{article.dek}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Canonical reading path" title="Read the work in the order a serious reviewer should inspect it.">
        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-3">
            {canonicalReadingPath.map(([href, title, description], index) => (
              <Link key={href} href={href}>
                <Card className="flex h-full items-start gap-4 p-4 transition hover:border-mint/40">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded border border-signal/30 bg-signal/10 font-mono text-sm text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <div className="space-y-4">
            <EmailCapture />
            <Link href="/rss.xml">
              <Card className="transition hover:border-mint/40">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">RSS</p>
                <h2 className="mt-3 text-xl font-semibold text-white">Follow the publication feed.</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">Every published asset is indexed into RSS, sitemap, search, Ask Ravi retrieval, and the monthly export.</p>
              </Card>
            </Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="Reference shelf" title="The canonical assets before the essays.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {referenceShelf.map(([href, title, description]) => (
            <Link key={href} href={href}>
              <Card className="h-full transition hover:border-mint/40">
                <p className="text-xs font-semibold uppercase text-mint">Reference asset</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Filters" title="The current library themes.">
        <div className="flex flex-wrap gap-3">
          {themes.map((theme) => (
            <span key={theme} className="inline-flex items-center gap-2 rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
              <Filter size={15} className="text-signal" />
              {theme}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
