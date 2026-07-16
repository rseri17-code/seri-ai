import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { ReadingProgress } from "@/components/reading-tools";
import { getPublishedWikiNotes, markdownToParagraphs } from "@/lib/content";
import { buildPublishingIndex, getRelatedAssets } from "@/lib/publishing";

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
  const asset = buildPublishingIndex().find((item) => item.url === note.url);
  const relatedAssets = asset ? getRelatedAssets(asset, 4) : [];
  const paragraphs = markdownToParagraphs(note.body);
  const toc = paragraphs
    .map((paragraph, index) => ({ id: `section-${index + 1}`, title: paragraph.split(".")[0].slice(0, 84) }))
    .slice(0, 6);

  return (
    <>
    <ReadingProgress />
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">{note.category}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{note.title}</h1>
          <p className="mt-5 text-xl leading-8 text-slate-300">{note.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
            <span>Created {note.createdAt}</span>
            <span>Updated {note.updatedAt}</span>
            <span>{note.readingTime}</span>
            <span>{asset?.author ?? "Ravikanth Seri"}</span>
          </div>
          <div className="mt-10 space-y-6 text-lg leading-8 text-slate-200">
            {paragraphs.map((paragraph, index) => (
              <p id={`section-${index + 1}`} key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
          <Card className="p-4">
            <h2 className="text-sm font-semibold uppercase text-slate-500">Contents</h2>
            <div className="mt-3 space-y-2">
              {toc.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="block text-sm leading-5 text-slate-300 hover:text-mint">
                  {item.title}
                </a>
              ))}
            </div>
          </Card>
          {asset ? (
            <Card className="p-4">
              <h2 className="text-sm font-semibold uppercase text-slate-500">Ask questions</h2>
              <div className="mt-3 space-y-2">
                {asset.askQuestions.map((question) => (
                  <Link key={question} href={`/ask?prompt=${encodeURIComponent(question)}`} className="block text-sm leading-5 text-slate-300 hover:text-mint">
                    {question}
                  </Link>
                ))}
              </div>
            </Card>
          ) : null}
        </aside>
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
      {asset ? (
        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-white">Version history</h2>
          <div className="mt-4 space-y-2">
            {asset.versionHistory.map((entry) => (
              <p key={`${entry.version}-${entry.date}`} className="text-sm leading-6 text-slate-300">
                <span className="font-mono text-mint">{entry.version}</span> · {entry.date} · {entry.note}
              </p>
            ))}
          </div>
        </Card>
      ) : null}
      {relatedAssets.length ? (
        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-white">Related reading</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedAssets.map((item) => (
              <Link key={item.id} href={item.url} className="rounded border border-white/10 bg-black/20 p-3 hover:border-mint/40">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </Card>
      ) : null}
    </article>
    </>
  );
}
