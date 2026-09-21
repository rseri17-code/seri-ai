import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";

/**
 * Compact homepage orientation. The longer architecture map, sticky index, and
 * ten-layer table live on /framework. This strip only answers: umbrella,
 * substrate, loop, public proof, filing system, destination, first visit.
 */
const startHere = [
  {
    n: "01",
    label: "This map",
    detail: "Umbrella, substrate, loop, proof, filing system.",
    href: "#orientation",
    cta: "start_here_map"
  },
  {
    n: "02",
    label: "Operations Room",
    detail: "Synthetic investigation that has to account for itself.",
    href: "/investigation-room",
    secondaryHref: "/framework",
    secondaryLabel: "Batch proof",
    cta: "start_here_operations_room",
    secondaryCta: "start_here_batch_proof"
  },
  {
    n: "03",
    label: "Framework",
    detail: "Full map, context layer, harness, and the ten-layer filing system.",
    href: "/framework",
    cta: "start_here_framework"
  },
  {
    n: "04",
    label: "Ask a question",
    detail: "Against the public record — or start a conversation.",
    href: "/ask",
    secondaryHref: "/contact",
    secondaryLabel: "Contact",
    cta: "start_here_ask",
    secondaryCta: "start_here_contact"
  }
] as const;

export function HomeOrientation() {
  return (
    <div id="orientation" className="mt-10 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
      <figure aria-labelledby="home-orientation-title" aria-describedby="home-orientation-summary">
        <figcaption className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">30-second map</p>
          <h2 id="home-orientation-title" className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">
            The shape of the work.
          </h2>
          <p id="home-orientation-summary" className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Operational Intelligence is the umbrella. The Enterprise Context Layer is the shared substrate.
            The SRE / Agent Harness is the loop on that substrate. Batch Intelligence is public-safe proof of
            an execution graph, not a taxonomy layer. The ten layers are a filing system.
          </p>
        </figcaption>

        <div className="mt-5 overflow-hidden rounded-xl border border-mint/25 bg-mint/[0.04]">
          <div className="border-b border-white/10 bg-black/20 px-4 py-3 sm:px-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-mint">Umbrella</p>
            <p className="mt-1 text-base font-semibold text-white sm:text-lg">Operational Intelligence</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">
              The reasoning layer between enterprise telemetry and a human decision.
            </p>
          </div>

          <div className="grid gap-3 p-3 sm:p-4 lg:grid-cols-[1.15fr_auto_0.95fr] lg:items-stretch">
            <div className="min-w-0 rounded-lg border border-signal/30 bg-signal/[0.07] p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-signal">Shared substrate</p>
              <p className="mt-2 text-sm font-semibold text-white sm:text-base">Enterprise Context Layer</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Ownership, change, dependency, transaction — maintained once.
              </p>
              <Link
                href="/framework"
                className="mt-3 block min-h-11 rounded-md border border-signal/25 bg-black/25 p-3 transition hover:border-signal/50"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-signal">Public-safe proof</p>
                <p className="mt-1 text-sm font-semibold text-white">Batch Intelligence</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Execution-graph proof on the context layer. Not one of the ten taxonomy layers.
                </p>
              </Link>
            </div>

            <div className="flex items-center justify-center px-1 py-1 text-center lg:flex-col lg:px-0" aria-hidden="true">
              <span className="text-signal lg:hidden">↓</span>
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:block">grounds</span>
              <span className="hidden text-signal lg:block">↔</span>
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:block">writes back</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:hidden">runs on / writes back</span>
            </div>

            <div className="min-w-0 rounded-lg border border-mint/30 bg-mint/[0.07] p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-mint">Loop on the substrate</p>
              <p className="mt-2 text-sm font-semibold text-white sm:text-base">SRE / Agent Harness</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Evidence → hypothesis → eval gate → learn. A person still owns anything consequential.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/20 p-3 sm:p-4">
            <Link
              href="/framework"
              className="block min-h-11 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/25"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-400">Filing system</p>
              <p className="mt-1 text-sm font-semibold text-white sm:text-base">Ten layers</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">
                Indexes notes, patterns, and artifacts. The longer map lives on Framework.
              </p>
            </Link>
          </div>
        </div>

        <p className="mt-4 max-w-3xl border-l-2 border-mint/50 pl-4 text-sm leading-7 text-slate-200 sm:text-base">
          Destination: agents that can sit near production because context, evaluation, and human authority
          are first-class — not a model with a disclaimer attached.
        </p>
      </figure>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <h3 className="text-lg font-semibold text-white sm:text-xl">What I&apos;m building, and where it is headed.</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-7">
            I&apos;m building Operational Intelligence: a reasoning layer between enterprise telemetry and a human
            decision. The shared piece is the Enterprise Context Layer — ownership, change, dependency, and
            transaction truth, maintained once instead of reconstructed by every agent. An SRE / Agent Harness
            runs on that layer: evidence, hypothesis, eval gate, then learning, with a person still owning
            anything consequential. Batch Intelligence is the public-safe proof of that idea on an execution
            graph; it is not a taxonomy layer. The destination is agents that can sit near production because
            context, evaluation, and human authority are first-class.
          </p>
        </div>

        <nav aria-label="First visit" className="rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Start here</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">A first visit, in this order.</p>
          <ol className="mt-4 grid gap-2 sm:grid-cols-2">
            {startHere.map((step) => (
              <li key={step.n} className="rounded-lg border border-white/10 bg-black/25 p-3">
                <p className="font-mono text-xs text-mint">{step.n}</p>
                <TrackedLink
                  href={step.href}
                  eventName="homepage_cta_click"
                  eventProperties={{ cta: step.cta }}
                  className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white underline decoration-mint/35 underline-offset-4 hover:text-mint hover:decoration-mint"
                >
                  {step.label} <ArrowRight size={14} aria-hidden="true" />
                </TrackedLink>
                <p className="mt-1 text-xs leading-5 text-slate-400">{step.detail}</p>
                {"secondaryHref" in step && step.secondaryHref ? (
                  <TrackedLink
                    href={step.secondaryHref}
                    eventName="homepage_cta_click"
                    eventProperties={{ cta: step.secondaryCta }}
                    className="mt-2 inline-flex min-h-11 items-center text-xs font-semibold text-mint underline decoration-mint/30 underline-offset-4 hover:decoration-mint"
                  >
                    {step.secondaryLabel}
                  </TrackedLink>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
