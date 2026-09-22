import Link from "next/link";
import { EvidenceLadder } from "@/components/evidence-ladder";
import { TrackedLink } from "@/components/tracked-link";

/**
 * Compact homepage orientation. The longer architecture map, sticky index, and
 * ten-layer table live on /framework. This strip only answers: store, loop,
 * public demo, filing system, destination, first visit.
 *
 * One map. One destination line. One path (the evidence ladder). The summary
 * under the map title is one store + loop sentence. House names stay on the
 * cards. Do not restore a work-plainly restatement or a "what I'm building"
 * essay — those were the four hero stacks. Case-study teasers (Codebase Memory)
 * belong in Selected work on app/page.tsx, not in a first-inspect chip row.
 *
 * Do not grow this component into a second homepage. Do not turn this strip into
 * a hiring brochure: the work leads; conversation is a quiet line under the path.
 */
export function HomeOrientation() {
  return (
    <div id="orientation" className="mt-6 border-t border-white/10 pt-6 sm:mt-8 sm:pt-8">
      <figure aria-labelledby="home-orientation-title" aria-describedby="home-orientation-summary">
        <figcaption className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">30-second map</p>
          <h2 id="home-orientation-title" className="mt-2 text-xl font-semibold leading-tight text-white sm:text-2xl">
            Store, loop, public demo, filing.
          </h2>
          <div id="home-orientation-summary" className="mt-3 max-w-2xl space-y-3 text-sm leading-7 text-slate-300 sm:text-base">
            <p>
              A shared store of current production context, and an investigation loop that reads that store
              and writes what happened back.
            </p>
          </div>
        </figcaption>

        <div className="mt-5 overflow-hidden rounded-xl border border-mint/25 bg-mint/[0.04]">
          <div className="border-b border-white/10 bg-black/20 px-4 py-3 sm:px-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-mint">Umbrella</p>
            <p className="mt-1 text-base font-semibold text-white sm:text-lg">Operational Intelligence</p>
            <p className="mt-1 text-sm leading-6 text-slate-300 max-[768px]:text-[clamp(1rem,0.92rem+0.35vw,1.0625rem)] max-[768px]:leading-7">
              The reasoning layer between live production signals (metrics, logs, traces, changes) and a human decision.
            </p>
          </div>

          <div className="grid gap-3 p-3 max-[768px]:gap-4 max-[768px]:p-4 max-[480px]:gap-3.5 max-[480px]:p-3.5 sm:grid-cols-2 sm:p-4 lg:grid-cols-[1.15fr_auto_0.95fr] lg:items-stretch">
            <div className="min-w-0 rounded-lg border border-signal/30 bg-signal/[0.07] p-4 max-[768px]:p-5 max-[480px]:p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-signal">Shared store</p>
              <p className="mt-2 text-sm font-semibold text-white sm:text-base">Enterprise Context Layer</p>
              <p className="mt-1 text-sm leading-6 text-slate-300 max-[768px]:text-[clamp(1rem,0.92rem+0.35vw,1.0625rem)] max-[768px]:leading-7">
                Four reusable records, maintained once for humans, workflows, and agents: owner, change in
                the symptom window, dependency (service path or job graph), and affected journey. Each
                record carries a source and an as-of time. If any of the four is missing, older than the
                decision, or contradicted, the loop must not treat it as safe to act on. Without this store,
                every investigation reconstructs the same four by hand — the Context Acquisition Tax.
              </p>
              <Link
                href="/framework#batch-intelligence"
                className="mt-3 block min-h-11 rounded-md border border-signal/25 bg-black/25 p-3 transition hover:border-signal/50 max-[768px]:p-4 max-[480px]:p-3.5"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-signal">Public demo of the store</p>
                <p className="mt-1 text-sm font-semibold text-white">Batch Intelligence</p>
                <p className="mt-1 text-xs leading-5 text-slate-300 max-[768px]:text-[clamp(0.875rem,0.8rem+0.4vw,1rem)] max-[768px]:leading-6">
                  For request-path services, the store&apos;s dependency record is topology and deploys. For
                  batch, it is which jobs ran, in what order, and what they read and wrote. This is a
                  shareable demo of that batch record (no employer data).
                </p>
              </Link>
            </div>

            <div className="flex items-center justify-center px-1 py-2 text-center sm:col-span-2 lg:col-span-1 lg:min-w-[5.5rem] lg:flex-col lg:px-2" aria-hidden="true">
              <span className="text-signal lg:hidden">↓</span>
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:block">reads from</span>
              <span className="hidden text-signal lg:block">↔</span>
              <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:block">writes back</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-slate-400 lg:hidden">reads from / writes back</span>
            </div>

            <div className="min-w-0 rounded-lg border border-mint/30 bg-mint/[0.07] p-4 max-[768px]:p-5 max-[480px]:p-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-mint">Investigation loop</p>
              <p className="mt-2 text-sm font-semibold text-white sm:text-base">SRE / Agent Harness</p>
              <p className="mt-1 text-sm leading-6 text-slate-300 max-[768px]:text-[clamp(1rem,0.92rem+0.35vw,1.0625rem)] max-[768px]:leading-7">
                The investigation loop that reads those records, investigates production reliability, then
                stops for a person. Evidence → working theory → checks before a recommendation is offered →
                write what happened back. Humans and agents consume the same store; the loop is not allowed
                to keep a private copy. A person still owns anything consequential.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 bg-black/20 p-3 max-[768px]:p-4 max-[480px]:p-3.5 sm:p-4">
            <Link
              href="/framework#taxonomy"
              className="block min-h-11 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/25 max-[768px]:p-5 max-[480px]:p-4"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-400">How this site tags notes</p>
              <p className="mt-1 text-sm font-semibold text-white sm:text-base">Ten layers</p>
              <p className="mt-1 text-sm leading-6 text-slate-300 max-[768px]:text-[clamp(1rem,0.92rem+0.35vw,1.0625rem)] max-[768px]:leading-7">
                How this site tags notes, patterns, and artifacts so they can be found. Ten demo stages in
                the Operations Room are a different ten. The runtime model is the store + the loop. The
                longer map is on Framework.
              </p>
            </Link>
          </div>
        </div>

        <p className="mt-4 max-w-3xl border-l-2 border-mint/50 pl-4 text-sm leading-7 text-slate-200 sm:text-base">
          Destination: agents that can sit near production because the shared context is current, the checks are visible, and a person still owns the action — not a model with a disclaimer attached.
        </p>
      </figure>

      <EvidenceLadder source="home" />

      <p className="mt-4 max-w-3xl text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
        Staff or Principal conversations about this work —{" "}
        <TrackedLink
          href="/contact"
          eventName="homepage_cta_click"
          eventProperties={{ cta: "work_plainly_conversation" }}
          className="font-semibold text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-mint hover:decoration-mint"
        >
          Contact
        </TrackedLink>
        .
      </p>
    </div>
  );
}
