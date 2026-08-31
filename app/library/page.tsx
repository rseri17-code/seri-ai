/**
 * VISITOR-FACING COPY — Claude's lane. Codex: do not edit prose in this file.
 *
 * Every string a visitor reads on this page is owned by one agent, by Ravikanth's ruling on
 * 2026-08-29. Two agents rewriting the same copy produced draft-quality output and repeated
 * reversions, so ownership is now split by kind of change, not by file:
 *
 *   Claude  — headings, paragraphs, labels, link text, alt text, microcopy, section order.
 *   Codex   — data wiring, imports, props, components, layout mechanics, accessibility
 *             attributes, performance. Structural work here is welcome.
 *
 */
import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Filter } from "lucide-react";
import { Card } from "@/components/card";
import { EmailCapture } from "@/components/email-capture";
import { Section } from "@/components/section";
import { articles, assetTypes, publicationSpine } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";
import { buildPublishingIndex } from "@/lib/publishing";

export const metadata: Metadata = publicRouteMetadata({
  title: "Library | seri.ai",
  description: "Essays, memos, notes, field guides, and public assets for Operational Intelligence.",
  path: "/library"
});

const downloadableArtifacts = [
  ["/publication-pack/oi-room-001-control-comparison-run-001.md", "Control Comparison, Run 001", "The first execution of the comparison protocol, including the two findings that went against the thesis."],
  ["/publication-pack/operational-intelligence-diagrams.md", "Diagram Pack", "Architecture, state-machine, sequence, evidence graph, and replay-loop diagrams."],
  ["/publication-pack/decision-packet-example.md", "Decision Packet Example", "A reviewable action packet with approval class, risks, alternatives, and contradictory evidence."],
  ["/publication-pack/oi-room-001-printable-walkthrough.md", "OI-ROOM-001 Walkthrough", "The printable synthetic case, start to finish."],
  ["/downloads/operational-intelligence-publication-pack.pdf", "Publication Pack PDF", "The doctrine, reference architecture, diagrams and walkthrough in one file."],
  ["/downloads/operational-intelligence-evidence-pack.pdf", "Evidence Pack PDF", "Benchmarks, control comparisons, practitioner review, and falsification criteria."],
  ["/downloads/oi-room-001-printable-walkthrough.pdf", "Walkthrough PDF", "Printable investigation packet for review conversations."]
] as const;

const reviewerSharePackets = [
  ["Executive reviewer", "/downloads/operational-intelligence-executive-summary.pdf", "Send the one-page summary first, then the Evidence Pack if the conversation turns to proof."],
  ["Systems architect", "/wiki/operational-intelligence-reference-architecture", "Start with the contracts and state machines."],
  ["SRE or operations reviewer", "/downloads/oi-room-001-printable-walkthrough.pdf", "Use OI-ROOM-001 to see how the evidence actually moves."],
  ["AI governance reviewer", "/downloads/operational-intelligence-evidence-pack.pdf", "Benchmarks, refusal boundaries, and what would falsify the thesis."]
] as const;

const referenceShelf = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine", "Definition, boundaries, ten-layer model, glossary, claim posture, and citations."],
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
            <p className="text-2xl font-semibold text-white">Not a blog. A compounding body of work.</p>
            <p className="mt-4 leading-7 text-slate-300">
              Doctrine, reference architecture, evidence packs, and field guides &mdash; written to be cited, argued with, and reused by people building the same thing.
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
                  <h3 className="mt-4 text-2xl font-semibold text-white">{article.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{article.dek}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Publication spine" title="How the body of work is meant to be inspected.">
        <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
          <Card className="h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Editorial contract</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{publicationSpine.title}</h3>
            <p className="mt-4 leading-7 text-slate-300">{publicationSpine.summary}</p>
            <div className="mt-5 rounded border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Publishing rule</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{publicationSpine.principle}</p>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">{publicationSpine.audienceQuestion}</p>
          </Card>
          <div className="grid gap-3">
            {publicationSpine.stages.map((stage, index) => (
              <Card key={stage.name} className="p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded border border-mint/30 bg-mint/10 font-mono text-sm text-mint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <h3 className="text-xl font-semibold text-white">{stage.name}</h3>
                      <Link href={stage.primaryAsset} className="inline-flex min-h-[24px] items-center text-sm font-semibold text-signal hover:text-amber">
                        Primary asset
                      </Link>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{stage.purpose}</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="rounded border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-xs font-semibold uppercase text-slate-500">Reviewer question</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{stage.readerQuestion}</p>
                      </div>
                      <div className="rounded border border-white/10 bg-white/[0.03] p-3">
                        <p className="text-xs font-semibold uppercase text-slate-500">Proof standard</p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{stage.proofStandard}</p>
                      </div>
                    </div>
                    <details className="group mt-4">
                      <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center text-sm font-semibold text-mint marker:hidden">
                        {stage.supportingAssets.length} supporting assets
                        <span className="ml-2 font-normal text-slate-400 group-open:hidden">Show</span>
                        <span className="ml-2 hidden font-normal text-slate-400 group-open:inline">Hide</span>
                      </summary>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {stage.supportingAssets.map((asset) => (
                          <Link key={asset} href={asset} className="inline-flex min-h-[44px] items-center rounded border border-white/10 px-3 py-2 text-xs text-slate-300 transition hover:border-mint/40 hover:text-white">
                            {asset}
                          </Link>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>
              </Card>
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
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
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
                <h3 className="mt-3 text-xl font-semibold text-white">Follow the publication feed.</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">Every published asset is indexed into RSS, sitemap, search, Ask Ravikanth retrieval, and the monthly export.</p>
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
                <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Artifacts" title="Objects you can inspect, download, or forward.">
        <details className="group rounded-xl border border-white/10 bg-white/[0.02]">
          <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-white marker:hidden hover:bg-white/[0.03]">
            <span>
              Seven downloadable artifacts and four reviewer share packets
              <span className="ml-2 font-normal text-slate-400 group-open:hidden">Show</span>
              <span className="ml-2 hidden font-normal text-slate-400 group-open:inline">Hide</span>
            </span>
          </summary>
          <div className="border-t border-white/10 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-mint">Downloadable artifacts</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {downloadableArtifacts.map(([href, title, description]) => (
                <Link key={href} href={href}>
                  <Card className="h-full transition hover:border-mint/40">
                    <p className="text-xs font-semibold uppercase text-mint">{href.endsWith(".pdf") ? "PDF export" : "Markdown artifact"}</p>
                    <h4 className="mt-3 text-lg font-semibold text-white">{title}</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
                  </Card>
                </Link>
              ))}
            </div>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-signal">
              Reviewer share packets
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">Send the smallest artifact that matches the question.</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {reviewerSharePackets.map(([role, href, note]) => (
                <Card key={role} className="h-full p-4">
                  <p className="text-xs font-semibold uppercase text-signal">{role}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{note}</p>
                  <Link href={href} className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-mint">
                    Open the artifact
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </details>
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
