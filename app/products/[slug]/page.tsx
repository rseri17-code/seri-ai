import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Boxes, GitBranch, Network, Radar, Route, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { builderDna, canonicalDefinition, harnessThesis, operationalLayers, products } from "@/content/site";

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
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Product surface</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-7xl">{product.name}</h1>
      <p className="mt-5 max-w-3xl text-2xl leading-9 text-slate-200">{product.tagline}</p>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">{product.summary}</p>
      <div className="mt-6 max-w-4xl rounded-lg border border-mint/20 bg-mint/[0.06] p-5">
        <p className="text-sm font-semibold uppercase text-mint">Category contract</p>
        <p className="mt-3 text-xl leading-8 text-white">{canonicalDefinition.short}</p>
        <p className="mt-3 text-sm leading-6 text-slate-300">ReasonOps is the product expression of that category: a runtime contract for evidence, replay, evaluation, memory, and human review.</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/investigation-room" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
          Open Operations Room <ArrowRight size={18} />
        </Link>
        <Link href="/manifesto" className="rounded border border-white/15 px-5 py-3 font-semibold text-white">
          Read the manifesto
        </Link>
        <Link href="/map" className="rounded border border-white/15 px-5 py-3 font-semibold text-white">
          Explore the map
        </Link>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="border-signal/30 bg-signal/[0.055]">
          <Network className="mb-5 text-signal" />
          <h2 className="text-2xl font-semibold text-white">Where it sits in the enterprise stack</h2>
          <p className="mt-4 leading-8 text-slate-300">
            Observability systems expose signals. Incident systems coordinate response. ReasonOps turns operational context into explainable reasoning, evaluated recommendations, and reviewable action.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            {["Signals", "Topology", "Agents", "Decisions"].map((item) => (
              <span key={item} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase text-slate-300">
                {item}
              </span>
            ))}
          </div>
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

      <div className="mt-12 rounded-lg border border-signal/25 bg-signal/[0.055] p-5 md:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">Runtime thesis</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{harnessThesis.headline}</h2>
        <p className="mt-4 max-w-4xl leading-8 text-slate-300">{harnessThesis.statement}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {harnessThesis.proofObjects.map((object) => (
            <div key={object} className="rounded border border-white/10 bg-black/20 p-4 text-sm font-semibold text-slate-100">
              {object}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">Operating principles</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">The control plane must make AI behavior inspectable.</h2>
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

      <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-mint/25 bg-mint/[0.045]">
          <Route className="mb-5 text-mint" />
          <h2 className="text-2xl font-semibold text-white">Runtime flow</h2>
          <div className="mt-5 grid gap-2">
            {["Observe signals", "Correlate evidence", "Rank hypotheses", "Evaluate behavior", "Gate action", "Write memory"].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded border border-white/10 bg-black/20 p-3">
                <span className="grid h-8 w-8 place-items-center rounded bg-mint/10 font-mono text-xs text-mint">{index + 1}</span>
                <span className="font-semibold text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-amber/25 bg-amber/[0.045]">
          <Boxes className="mb-5 text-amber" />
          <h2 className="text-2xl font-semibold text-white">What makes it trustworthy</h2>
          <p className="mt-4 leading-8 text-slate-300">
            A recommendation is not accepted because an agent sounds confident. It must carry evidence receipts, losing hypotheses, uncertainty, eval status, and a human review boundary.
          </p>
        </Card>
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
