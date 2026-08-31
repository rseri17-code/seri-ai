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
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { ContentSearch } from "@/components/content-search";
import { EmailCapture } from "@/components/email-capture";
import { Section } from "@/components/section";
import { buildPublicSourceIndex, getPublishedWikiNotes } from "@/lib/content";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Wiki | Ravikanth Seri — Operational Intelligence, Agentic Systems, Enterprise AI Architecture",
  description: "Public wiki notes on Operational Intelligence, agentic systems, transaction intelligence, incident intelligence, AI evaluation, and knowledge graphs.",
  path: "/wiki"
});

export default function WikiPage() {
  const notes = getPublishedWikiNotes();
  const sources = buildPublicSourceIndex();
  const clientSources = sources.map((source) => ({
    ...source,
    content: source.content.length > 420 ? `${source.content.slice(0, 420)}...` : source.content
  }));
  const referenceSpine = [
    "operational-intelligence-canonical-doctrine",
    "operational-intelligence-reference-architecture",
    "operational-intelligence-publication-pack",
    "operational-intelligence-evidence-pack"
  ];
  const spineNotes = referenceSpine.flatMap((slug) => {
    const note = notes.find((item) => item.slug === slug);
    return note ? [note] : [];
  });

  return (
    <Section eyebrow="Public wiki" title="Approved public notes for the Operational Intelligence body of work." level="h1">
      <div className="mb-8">
        <EmailCapture />
      </div>
      <div className="mb-10 rounded-lg border border-mint/20 bg-mint/[0.045] p-5">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Reference spine</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-300">Start with the durable doctrine, implementation contracts, shareable artifacts, and evidence standard before reading individual notes.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {spineNotes.map((note) => (
            <Link key={note.slug} href={note.url} className="rounded border border-white/10 bg-black/20 p-4 transition hover:border-mint/40">
              <p className="text-xs font-semibold uppercase text-signal">{note.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{note.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{note.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mb-10 grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <Link key={note.slug} href={note.url}>
            <Card className="h-full transition hover:border-mint/40">
              <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                <span>{note.category}</span>
                <span>{note.readingTime}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-white">{note.title}</h3>
              <p className="mt-3 text-slate-300">{note.description}</p>
              <p className="mt-4 text-xs text-slate-500">Updated {note.updatedAt}</p>
            </Card>
          </Link>
        ))}
      </div>
      <ContentSearch sources={clientSources} />
    </Section>
  );
}
