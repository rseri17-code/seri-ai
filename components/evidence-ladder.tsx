import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import { TrackedLink } from "@/components/tracked-link";

/**
 * Ordered public artifacts, strongest first. Homepage Start here and Work share
 * this list so a visitor gets the same path through the work.
 *
 * Do not turn these cards into essays. One kind label + one proof line.
 * This is a path through the work, not a recruiter brochure.
 */
export const evidenceLadder = [
  {
    n: "01",
    label: "Operations Room",
    kind: "Run",
    proves: "A synthetic investigation that has to account for itself.",
    href: "/investigation-room",
    cta: "ladder_operations_room"
  },
  {
    n: "02",
    label: "Framework",
    kind: "Full map",
    proves: "The shared store and the investigation loop. Batch Intelligence is a public demo of batch context; the ten layers file the writing.",
    href: "/framework",
    secondaryHref: "/framework#batch-intelligence",
    secondaryLabel: "Batch proof",
    cta: "ladder_framework",
    secondaryCta: "ladder_batch_proof"
  },
  {
    n: "03",
    label: "Codebase Memory",
    kind: "Case study",
    proves: "How a fresh agent locates code and notices when a lesson needs revalidation.",
    href: "/projects/codebase-memory",
    cta: "ladder_codebase_memory"
  },
  {
    n: "04",
    label: "Ask",
    kind: "Public record",
    proves: "What public pages on this site it will answer from, cite, or decline.",
    href: "/ask",
    cta: "ladder_ask"
  },
  {
    n: "05",
    label: "Writing",
    kind: "Patterns",
    proves: "The arguments and architecture patterns, in build order.",
    href: "/patterns",
    cta: "ladder_writing"
  }
] as const;

export function EvidenceLadder({ source }: { source: "home" | "work" }) {
  const track = source === "home";

  return (
    <nav
      aria-label={source === "home" ? "First visit" : "Path through the work"}
      className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Start here</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        A path through the work. Inspect these in this order.
      </p>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {evidenceLadder.map((step) => {
          const title = (
            <>
              {step.label} <ArrowIcon size={14} />
            </>
          );

          return (
            <li key={step.n} className="rounded-lg border border-white/10 bg-black/25 p-3">
              <p className="font-mono text-xs text-mint">{step.n}</p>
              {track ? (
                <TrackedLink
                  href={step.href}
                  eventName="homepage_cta_click"
                  eventProperties={{ cta: step.cta }}
                  className="ladder-title min-h-11"
                >
                  {title}
                </TrackedLink>
              ) : (
                <Link
                  href={step.href}
                  className="ladder-title min-h-11"
                >
                  {title}
                </Link>
              )}
              <p className="ladder-kind">{step.kind}</p>
              <p className="ladder-proves">
                <span className="font-semibold text-slate-300">Proves: </span>
                {step.proves}
              </p>
              {"secondaryHref" in step && step.secondaryHref ? (
                track ? (
                  <TrackedLink
                    href={step.secondaryHref}
                    eventName="homepage_cta_click"
                    eventProperties={{ cta: step.secondaryCta }}
                    className="ladder-secondary min-h-11"
                  >
                    {step.secondaryLabel}
                  </TrackedLink>
                ) : (
                  <Link
                    href={step.secondaryHref}
                    className="ladder-secondary min-h-11"
                  >
                    {step.secondaryLabel}
                  </Link>
                )
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
