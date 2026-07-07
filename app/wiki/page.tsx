import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { ContentSearch } from "@/components/content-search";
import { EmailCapture } from "@/components/email-capture";
import { Section } from "@/components/section";
import { buildPublicSourceIndex, getPublishedWikiNotes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Wiki | Ravikanth Seri — Operational Intelligence, Agentic Systems, Enterprise AI Architecture",
  description: "Public wiki notes on Operational Intelligence, agentic systems, transaction intelligence, incident intelligence, AI evaluation, and knowledge graphs."
};

export default function WikiPage() {
  const notes = getPublishedWikiNotes();
  const sources = buildPublicSourceIndex();

  return (
    <Section eyebrow="Public wiki" title="Approved public notes for the Operational Intelligence body of work.">
      <div className="mb-8">
        <EmailCapture />
      </div>
      <div className="mb-10 grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <Link key={note.slug} href={note.url}>
            <Card className="h-full transition hover:border-mint/40">
              <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
                <span>{note.category}</span>
                <span>{note.readingTime}</span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-white">{note.title}</h2>
              <p className="mt-3 text-slate-300">{note.description}</p>
              <p className="mt-4 text-xs text-slate-500">Updated {note.updatedAt}</p>
            </Card>
          </Link>
        ))}
      </div>
      <ContentSearch sources={sources} />
    </Section>
  );
}
