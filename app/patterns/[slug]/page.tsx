import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { patterns } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return patterns.map((pattern) => ({ slug: pattern.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pattern = patterns.find((item) => item.slug === slug);
  return pattern
    ? publicRouteMetadata({
        title: `${pattern.title} | seri.ai Patterns`,
        description: pattern.description,
        path: `/patterns/${pattern.slug}`,
        type: "article"
      })
    : {
        title: "Patterns | seri.ai"
      };
}

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pattern = patterns.find((item) => item.slug === slug);

  if (!pattern) {
    notFound();
  }

  const sections = [
    ["Problem", pattern.problem],
    ["Context", pattern.context],
    ["Solution", pattern.solution],
    ["Architecture", pattern.architecture],
    ["Evaluation", pattern.evaluation],
    ["When to use", pattern.whenToUse],
    ["When not to use", pattern.whenNotToUse]
  ];

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">Architecture pattern</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">{pattern.title}</h1>
      <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-300">{pattern.description}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {sections.map(([title, body]) => (
          <Card key={title}>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 leading-7 text-slate-300">{body}</p>
          </Card>
        ))}
        <Card>
          <h2 className="text-xl font-semibold text-white">Architecture sketch</h2>
          <div className="mt-3 space-y-2 text-slate-300">
            {pattern.architectureSketch.map((step, index) => (
              <p key={step} className="rounded border border-white/10 bg-ink p-3 text-sm">
                {index + 1}. {step}
              </p>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Forces / tradeoffs</h2>
          <ul className="mt-3 space-y-2 text-slate-300">
            {pattern.forces.map((force) => (
              <li key={force}>{force}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Failure modes</h2>
          <ul className="mt-3 space-y-2 text-slate-300">
            {pattern.failureModes.map((failureMode) => (
              <li key={failureMode}>{failureMode}</li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="mt-5">
        <h2 className="text-xl font-semibold text-white">Related context</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-mint">Principles</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {pattern.relatedPrinciples.map((principle) => (
                <span key={principle} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200">
                  {principle}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-signal">Wiki</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {pattern.relatedWiki.map((href) => (
                <Link key={href} href={href} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-signal/40">
                  {href}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-amber">Other links</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {pattern.related.map((href) => (
                <Link key={href} href={href} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200 hover:border-amber/40">
                  {href}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </article>
  );
}
