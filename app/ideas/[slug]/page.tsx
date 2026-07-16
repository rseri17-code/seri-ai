import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { ReadingProgress } from "@/components/reading-tools";
import { articles } from "@/content/site";
import { buildPublishingIndex, getRelatedAssets } from "@/lib/publishing";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }
  const assets = buildPublishingIndex();
  const asset = assets.find((item) => item.url === `/ideas/${article.slug}`);
  const related = asset ? getRelatedAssets(asset, 4) : [];
  const articleAssets = assets.filter((item) => item.assetType === "article");
  const currentIndex = articleAssets.findIndex((item) => item.url === `/ideas/${article.slug}`);
  const previous = currentIndex > 0 ? articleAssets[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < articleAssets.length - 1 ? articleAssets[currentIndex + 1] : null;
  const toc = article.body
    .map((paragraph, index) => ({
      id: `section-${index + 1}`,
      title: paragraph.split(".")[0].slice(0, 84)
    }))
    .slice(0, 6);

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">{article.theme}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{article.title}</h1>
            <p className="mt-5 text-xl leading-8 text-slate-300">{article.dek}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-400">
              <span>Published {article.date}</span>
              <span>Updated {asset?.updatedAt ?? article.date}</span>
              <span>{asset?.readingTime ?? article.readingTime}</span>
              <span>{asset?.author ?? "Ravikanth Seri"}</span>
            </div>
            <div className="mt-10 space-y-6 text-lg leading-8 text-slate-200">
              {article.body.map((paragraph, index) => (
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
                <h2 className="text-sm font-semibold uppercase text-slate-500">Framework layers</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {asset.frameworkLayers.slice(0, 6).map((layer) => (
                    <span key={layer} className="rounded border border-mint/20 px-2 py-1 text-xs text-mint">{layer}</span>
                  ))}
                </div>
              </Card>
            ) : null}
          </aside>
        </div>
        {asset ? (
          <Card className="mt-10">
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
        {related.length ? (
          <Card className="mt-6">
            <h2 className="text-xl font-semibold text-white">Related reading</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.id} href={item.url} className="rounded border border-white/10 bg-black/20 p-3 hover:border-mint/40">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                </Link>
              ))}
            </div>
          </Card>
        ) : null}
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {previous ? <Link href={previous.url} className="rounded border border-white/10 p-4 text-sm text-slate-300 hover:border-mint/40">Previous: {previous.title}</Link> : <span />}
          {next ? <Link href={next.url} className="rounded border border-white/10 p-4 text-sm text-slate-300 hover:border-mint/40">Next: {next.title}</Link> : null}
        </div>
      </article>
    </>
  );
}
