import { notFound } from "next/navigation";
import { articles } from "@/content/site";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">{article.theme}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{article.title}</h1>
      <p className="mt-5 text-xl leading-8 text-slate-300">{article.dek}</p>
      <div className="mt-10 space-y-6 text-lg leading-8 text-slate-200">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
