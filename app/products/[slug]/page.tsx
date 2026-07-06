import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Boxes, GitBranch, Radar, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { builderDna, canonicalDefinition, operationalLayers, products } from "@/content/site";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return {
    title: product ? `${product.name} | seri.ai Products` : "Products | seri.ai",
    description: product?.summary
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Product concept</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-7xl">{product.name}</h1>
      <p className="mt-5 max-w-3xl text-2xl leading-9 text-slate-200">{product.tagline}</p>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">{product.summary}</p>
      <div className="mt-6 max-w-4xl rounded-lg border border-mint/20 bg-mint/[0.06] p-5">
        <p className="text-sm font-semibold uppercase text-mint">Category definition</p>
        <p className="mt-3 text-xl leading-8 text-white">{canonicalDefinition.short}</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">ReasonOps is one product expression of that category. seri.ai is the public operating system around the category.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/investigation-room" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
          Enter Investigation Room <ArrowRight size={18} />
        </Link>
        <Link href="/manifesto" className="rounded border border-white/15 px-5 py-3 font-semibold text-white">
          Read the manifesto
        </Link>
        <Link href="/map" className="rounded border border-white/15 px-5 py-3 font-semibold text-white">
          Explore the map
        </Link>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <Boxes className="mb-5 text-signal" />
          <h2 className="text-2xl font-semibold text-white">Relationship to Operational Intelligence</h2>
          <p className="mt-4 leading-8 text-slate-300">{product.relationship}</p>
        </Card>
        <Card>
          <GitBranch className="mb-5 text-mint" />
          <h2 className="text-2xl font-semibold text-white">Architecture concept</h2>
          <div className="mt-4 space-y-3">
            {product.architecture.map((item, index) => (
              <p key={item} className="rounded border border-white/10 bg-ink p-3 text-sm leading-6 text-slate-200">
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">Builder DNA</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">ReasonOps inherits Ravikanth&apos;s proof-driven operating model.</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {builderDna.principles.map((principle) => (
            <Card key={principle.name} className="p-4">
              <Radar className="mb-4 text-signal" />
              <h3 className="font-semibold text-white">{principle.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{principle.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Core layers</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">ReasonOps sits across the Operational Intelligence stack.</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {operationalLayers.map((layer, index) => (
            <Card key={layer.slug} className="p-4">
              <span className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-semibold text-white">{layer.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{layer.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {[
          ["What it is", product.whatItIs],
          ["Why it matters", product.whyItMatters],
          ["Core capabilities", product.capabilities],
          ["Use cases", product.useCases],
          ["Principles behind it", product.principles],
          ["What it is not", product.not],
          ["Roadmap", product.roadmap]
        ].map(([title, items]) => (
          <Card key={String(title)}>
            <ShieldCheck className="mb-4 text-mint" />
            <h2 className="text-xl font-semibold text-white">{String(title)}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {(items as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </article>
  );
}
