import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { articles } from "@/content/site";

export default function IdeasPage() {
  return (
    <Section eyebrow="Library" title="Essays, memos, and field notes on Operational Intelligence." level="h1">
      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.slug} href={`/ideas/${article.slug}`}>
            <Card className="h-full transition hover:border-mint/40">
              <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                <span className="text-mint">{article.theme}</span>
                <span>{article.readingTime}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{article.title}</h2>
              <p className="mt-3 text-slate-300">{article.dek}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
