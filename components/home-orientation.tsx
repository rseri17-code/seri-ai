import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EvidenceLadder } from "@/components/evidence-ladder";
import { TrackedLink } from "@/components/tracked-link";

/**
 * Compact homepage orientation. The longer architecture map, sticky index, and
 * ten-layer table live on /framework. This strip only answers: umbrella,
 * substrate, loop, public proof, filing system, destination, first visit.
 *
 * The hire strip and evidence ladder live here, inside the hero, so they are
 * not a seventh homepage section. Case-study teasers (Codebase Memory →
 * /projects/codebase-memory) belong in Selected work on app/page.tsx, not here.
 *
 * Do not grow this component into a second homepage.
 */
const inspectLinks = [
  {
    href: "/investigation-room",
    label: "Operations Room",
    cta: "hire_strip_operations_room"
  },
  {
    href: "/framework",
    label: "Framework",
    cta: "hire_strip_framework"
  },
  {
    href: "/projects/codebase-memory",
    label: "Codebase Memory",
    cta: "hire_strip_codebase_memory"
  }
] as const;

function HireStrip() {
  return (
    <aside
      aria-labelledby="hire-strip-title"
      className="mt-8 rounded-xl border border-mint/25 bg-mint/[0.04] p-4 sm:p-5"
    >
      <p id="hire-strip-title" className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">
        Hiring conversations
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-start">
        <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-signal">For</dt>
            <dd className="mt-1 text-sm leading-6 text-white sm:text-base sm:leading-7">
              Staff / Principal conversations in AIOps, observability, agentic operations, and AI
              platform leadership.
            </dd>
          </div>
          <div>
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-signal">Done</dt>
            <dd className="mt-1 text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
              Enterprise SRE investigation agent: thesis to production, owned end to end. The system
              stays private. This site stands on its own.
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-signal">Inspect</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {inspectLinks.map((item) => (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  eventName="homepage_cta_click"
                  eventProperties={{ cta: item.cta }}
                  className="inline-flex min-h-11 items-center rounded-md border border-white/15 bg-black/25 px-3 text-sm font-semibold text-white underline decoration-mint/35 underline-offset-4 hover:border-mint/40 hover:text-mint hover:decoration-mint"
                >
                  {item.label}
                </TrackedLink>
              ))}
            </dd>
          </div>
        </dl>
        <TrackedLink
          href="/contact"
          eventName="homepage_cta_click"
          eventProperties={{ cta: "hire_strip_hiring" }}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 self-start rounded bg-mint px-5 py-3 text-sm font-semibold text-ink"
        >
          Contact / Hiring <ArrowRight size={16} aria-hidden="true" />
        </TrackedLink>
      </div>
    </aside>
  );
}

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
            Skip it, and every investigation pays the Context Acquisition Tax &mdash; reconstructing ownership,
            change, dependency, and transaction by hand. The SRE / Agent Harness is the loop on that substrate.
            Batch Intelligence is public-safe proof of an execution graph, not a taxonomy layer. The ten layers
            are a filing system.
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
                Ownership, change, dependency, transaction &mdash; maintained once. Without it, every investigation
                pays the <strong className="font-semibold text-white">Context Acquisition Tax</strong> &mdash;
                reconstructing those four answers by hand.
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

            <div className="flex items-center justify-center px-1 py-2 text-center lg:min-w-[5.5rem] lg:flex-col lg:px-2" aria-hidden="true">
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

      <HireStrip />
      <EvidenceLadder source="home" />

      <div className="mt-8 max-w-3xl">
        <h3 className="text-lg font-semibold text-white sm:text-xl">What I&apos;m building, and where it is headed.</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base sm:leading-7">
          I&apos;m building Operational Intelligence: a reasoning layer between enterprise telemetry and a human
          decision. The shared piece is the Enterprise Context Layer — ownership, change, dependency, and
          transaction truth, maintained once instead of reconstructed by every agent. An SRE / Agent Harness
          runs on that layer: evidence, hypothesis, eval gate, then learning, with a person still owning
          anything consequential. Batch Intelligence is the public-safe proof of that idea on an execution
          graph; it is not a taxonomy layer. The destination is agents that can sit near production because
          context, evaluation, and human authority are first-class.
        </p>
      </div>
    </div>
  );
}
