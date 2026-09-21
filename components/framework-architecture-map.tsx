import { operationalIntelligenceFramework } from "@/content/site";

const summaryId = "framework-architecture-summary";

export function FrameworkArchitectureMap() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
      <figure aria-labelledby="framework-architecture-title" aria-describedby={summaryId}>
        <figcaption className="mb-4 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint">Architecture map</p>
          <h2 id="framework-architecture-title" className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            What sits under what.
          </h2>
          <p id={summaryId} className="mt-3 text-base leading-7 text-slate-300">
            Operational Intelligence is the umbrella. The Enterprise Context Layer is the shared substrate.
            The SRE Agent Harness is the loop that runs on that substrate. The ten layers are a filing
            taxonomy, not a competing architecture. Batch Intelligence is a context-layer capability — an
            execution-graph proof — not one of those ten layers.
          </p>
        </figcaption>

        <div className="overflow-hidden rounded-xl border border-mint/25 bg-mint/[0.04]">
          <div className="border-b border-white/10 bg-black/20 px-4 py-3 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Umbrella</p>
            <p className="mt-1 text-lg font-semibold text-white">Operational Intelligence</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">{operationalIntelligenceFramework.subtitle}</p>
          </div>

          <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-[1.15fr_auto_0.95fr] lg:items-stretch">
            <div className="min-w-0 rounded-lg border border-signal/30 bg-signal/[0.07] p-4">
              <a href="#context-layer" className="block min-h-11 rounded-md transition hover:text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Shared substrate</p>
                <p className="mt-2 text-base font-semibold text-white">Enterprise Context Layer</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Maintained once. Consumed by humans, workflows, and agents.</p>
              </a>
              <a
                href="#batch-intelligence"
                className="mt-3 block min-h-11 rounded-md border border-signal/25 bg-black/25 p-3 transition hover:border-signal/50"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">Context-layer capability</p>
                <p className="mt-1 text-sm font-semibold text-white">Batch Intelligence</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Synthetic public-safe proof of the execution graph. Not one of the ten taxonomy layers.
                </p>
              </a>
            </div>

            <div className="flex items-center justify-center px-1 py-1 text-center lg:flex-col lg:px-0" aria-hidden="true">
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:block">grounds</span>
              <span className="text-signal lg:hidden">↓</span>
              <span className="hidden text-signal lg:block">↔</span>
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:block">writes back</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:hidden">runs on / writes back</span>
            </div>

            <a
              href="#harness"
              className="block min-h-11 min-w-0 rounded-lg border border-mint/30 bg-mint/[0.07] p-4 transition hover:border-mint/55"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Loop on the substrate</p>
              <p className="mt-2 text-base font-semibold text-white">SRE Agent Harness</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Grounds in the context layer, investigates, records outcomes, and writes learning back.
              </p>
            </a>
          </div>

          <div className="border-t border-white/10 bg-black/20 p-3 sm:p-4">
            <a href="#taxonomy" className="block min-h-11 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/25">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Filing / taxonomy</p>
                  <p className="mt-1 text-base font-semibold text-white">Ten layers</p>
                </div>
                <p className="text-sm text-slate-300">Indexes notes, patterns, and artifacts. If this disagrees with the harness, the harness wins.</p>
              </div>
              <ol className="mt-3 flex flex-wrap gap-1.5">
                {operationalIntelligenceFramework.layers.map((layer, index) => (
                  <li
                    key={layer.name}
                    className="rounded border border-white/10 bg-black/30 px-2 py-1 font-mono text-[0.65rem] text-slate-300"
                  >
                    {String(index + 1).padStart(2, "0")} {layer.name.replace(" Layer", "")}
                  </li>
                ))}
              </ol>
            </a>
          </div>
        </div>

        <dl className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-mint">Building now</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-300">
              <a href="#context-layer" className="underline-offset-4 hover:underline">The Enterprise Context Layer</a>
              {" "}as shared substrate, and{" "}
              <a href="#harness" className="underline-offset-4 hover:underline">the SRE Agent Harness</a>
              {" "}that runs on it.
            </dd>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">Public-safe proof</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-300">
              <a href="#batch-intelligence" className="underline-offset-4 hover:underline">Batch Intelligence</a>
              : for batch, context is the execution graph. Not a taxonomy layer.
            </dd>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">Where this is headed</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-300">
              <a href="#evaluation" className="underline-offset-4 hover:underline">Eval gates and falsifiers</a>
              {" "}before trust — then human-reviewed action, not a bigger alert console.
            </dd>
          </div>
        </dl>
      </figure>
    </div>
  );
}
