import Link from "next/link";
import type { Metadata } from "next";
import { BookOpen, Filter } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { articles, assetTypes } from "@/content/site";

export const metadata: Metadata = {
  title: "Library | seri.ai",
  description: "Essays, memos, notes, field guides, and public assets for Operational Intelligence."
};

export default function LibraryPage() {
  const themes = Array.from(new Set(articles.map((article) => article.theme)));

  return (
    <>
      <Section eyebrow="Library" title="Public assets for Operational Intelligence." level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="h-fit">
            <BookOpen className="mb-5 text-mint" />
            <h2 className="text-2xl font-semibold text-white">Not a blog. A compounding body of work.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The Library collects manifestos, field guides, memos, and essays that define the language of Operational Intelligence.
            </p>
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
