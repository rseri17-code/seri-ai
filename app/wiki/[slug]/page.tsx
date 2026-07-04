import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { getPublishedWikiNotes, markdownToParagraphs } from "@/lib/content";

export function generateStaticParams() {
  return getPublishedWikiNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublishedWikiNotes().find((item) => item.slug === slug);
  return {
    title: note ? `${note.title} | seri.ai Wiki` : "Wiki | seri.ai",
    description: note?.description
  };
}

export default async function WikiNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const notes = getPublishedWikiNotes();
  const note = notes.find((item) => item.slug === slug);

  if (!note) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">{note.category}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{note.title}</h1>
      <p className="mt-5 text-xl leading-8 text-slate-300">{note.description}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
        <span>Created {note.createdAt}</span>
        <span>Updated {note.updatedAt}</span>
        <span>{note.readingTime}</span>
      </div>
      <div className="mt-10 space-y-6 text-lg leading-8 text-slate-200">
        {markdownToParagraphs(note.body).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {note.related.length ? (
        <Card className="mt-10">
          <h2 className="text-xl font-semibold text-white">Related notes</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {note.related.map((relatedSlug) => {
              const related = notes.find((item) => item.slug === relatedSlug);
              return related ? (
                <Link key={relatedSlug} href={related.url} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-mint/40">
                  {related.title}
                </Link>
              ) : null;
            })}
          </div>
        </Card>
      ) : null}
    </article>
  );
}
