import { ArrowRight, CheckCircle2, CircleHelp } from "lucide-react";
import { dependencyFixture, owlPaperSource } from "@/lib/operational-intelligence/sre-reference-run";

const chain = [
  ["Failed workload", "Completion score misses its checked-in synthetic threshold."],
  ["Predecessor / trigger", "Journey transform follows a recorded catalog-output change."],
  ["Affected successors", "Completion score and operations report consume the downstream outputs."],
  ["Blast radius", "Two successor stages and their named synthetic owners require review."],
  ["Evidence packet", "Execution edges, read relationships, change timing, and the missing boundary trace stay visible."],
  ["Human-reviewed recovery", "A reversible response may be approved, rejected, or escalated; nothing executes automatically."],
] as const;

export function BatchIntelligenceProof() {
  return (
    <section id="batch-intelligence" aria-labelledby="batch-intelligence-title" className="mt-4 scroll-mt-40 overflow-hidden rounded-xl border border-signal/25 bg-signal/[0.035]">
      <header className="border-b border-white/10 p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Batch Intelligence · synthetic public proof</p>
        <h3 id="batch-intelligence-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">For services, context is the system map and deployments. For batch, context is the execution graph: which jobs depend on which.</h3>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">A failed job is only the visible endpoint. Dependency-aware context connects what ran before it, what consumes its output, and what evidence is still missing. No employer data.</p>
      </header>

      <ol className="grid gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-6">
        {chain.map(([title, detail], index) => (
          <li key={title} className="relative bg-panel p-4">
            <p className="font-mono text-xs text-mint">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-2 text-sm font-semibold text-white">{title}</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">{detail}</p>
            {index < chain.length - 1 ? <ArrowRight aria-hidden="true" className="absolute -right-3 top-4 z-10 hidden rounded-full bg-panel p-1 text-signal xl:block" size={24} /> : null}
          </li>
        ))}
      </ol>

      <div className="grid lg:grid-cols-[1.1fr_.9fr]">
        <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Inspectable execution edges</p>
          <ol className="mt-3 space-y-2">
            {dependencyFixture.edges.map((edge) => {
              const from = dependencyFixture.nodes.find((node) => node.id === edge.from)!;
              const to = dependencyFixture.nodes.find((node) => node.id === edge.to)!;
              return <li key={`${edge.from}-${edge.to}`} className="rounded border border-white/10 bg-black/20 p-3 text-sm text-slate-300"><span className="font-semibold text-white">{from.label} → {to.label}</span><span className="mt-1 block text-xs">{edge.evidence} · {from.owner} / {to.owner}</span></li>;
            })}
          </ol>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded border border-mint/30 bg-mint/5 p-3"><p className="flex items-center gap-2 font-mono text-xs font-semibold text-mint"><CheckCircle2 size={15} />GROUNDED RCA</p><p className="mt-2 text-xs leading-5 text-slate-300">Allowed only when the checked-in evidence covers the trigger, dependency path, affected successors, and review gate.</p></div>
            <div className="rounded border border-amber/30 bg-amber/5 p-3"><p className="flex items-center gap-2 font-mono text-xs font-semibold text-amber"><CircleHelp size={15} />EXPLICIT UNKNOWN</p><p className="mt-2 text-xs leading-5 text-slate-300">Required when any causal link is unsupported. This fixture keeps the unavailable boundary trace visible.</p></div>
          </div>
        </div>
        <aside aria-labelledby="batch-source-title" className="p-4 lg:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Research boundary</p>
          <h4 id="batch-source-title" className="mt-2 font-semibold text-white">Source, influence, and limit</h4>
          <p className="mt-3 text-sm leading-6 text-slate-300">{owlPaperSource.groundedClaims[1]}</p>
          <p className="mt-3 text-sm leading-6 text-amber">{owlPaperSource.boundary}</p>
          <p className="mt-3 text-xs leading-5 text-slate-400">{owlPaperSource.title} · {owlPaperSource.venue}</p>
          <a href={owlPaperSource.doi} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-mint underline decoration-mint/40 underline-offset-4">Inspect the published paper</a>
        </aside>
      </div>
    </section>
  );
}
