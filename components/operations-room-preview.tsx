/**
 * VISITOR-FACING COPY — Claude's lane. Codex: do not edit prose in this file.
 *   Claude  — headings, paragraphs, labels, link text, alt text, microcopy, step order.
 *   Codex   — data wiring, imports, props, components, layout mechanics, accessibility
 *             attributes, performance. Structural work here is welcome.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Kind = "observation" | "contradiction" | "unknown" | "confirmed" | "gate" | "decision";

type Step = {
  label: string;
  heading: string;
  body: string;
  kind: Kind;
  note: string;
  confidence: number;
};

/**
 * Ten stages of OI-ROOM-001, the synthetic case that already drives the Operations Room,
 * the doctrine and Ask. Nothing here is drawn from a real incident.
 */
const steps: Step[] = [
  {
    label: "Question",
    heading: "What changed, and does it explain what customers are seeing?",
    body: "An investigation opens as a question, not an alert. The question is what the evidence has to answer, and it is what the final decision gets checked against.",
    kind: "observation",
    note: "Case OI-ROOM-001 — synthetic. No employer data.",
    confidence: 0
  },
  {
    label: "Degradation",
    heading: "A critical customer journey starts failing after a configuration change.",
    body: "The signal is real but thin: error rate and latency move together on one path. On its own that is a symptom with three plausible causes and no ranking between them.",
    kind: "observation",
    note: "Signal alone does not identify a cause",
    confidence: 10
  },
  {
    label: "Path",
    heading: "The journey is reconstructed hop by hop, not summarized.",
    body: "Which services the transaction actually crossed, in order, with timing per hop and ownership attached. A dashboard shows that a service is unhealthy. This shows where the journey broke and who owns that segment.",
    kind: "observation",
    note: "Topology and ownership travel with the transaction",
    confidence: 20
  },
  {
    label: "Evidence",
    heading: "Every fact is typed and carries where it came from.",
    body: "Observation, contradiction, unknown, confirmed fact. Each one keeps its source and how fresh it is. Untyped evidence is how a confident wrong answer gets built.",
    kind: "observation",
    note: "Source and freshness travel with each item",
    confidence: 35
  },
  {
    label: "Hypothesis",
    heading: "Leading explanation: a configuration regression in a dependency path.",
    body: "It fits the timing and it fits the failing hop. At this point it is the best available explanation — which is not the same as the answer, and the system does not treat it as one.",
    kind: "observation",
    note: "Ranked against rivals, not asserted",
    confidence: 62
  },
  {
    label: "Contradiction",
    heading: "One signal rules out the obvious explanation — and it looks like good news.",
    body: "A healthy-looking metric is inconsistent with the leading hypothesis. Contradictions are kept and shown rather than averaged away, because this is the exact point where an agent talks itself into an action.",
    kind: "contradiction",
    note: "Kept in the record, never smoothed over",
    confidence: 41
  },
  {
    label: "Unknown",
    heading: "What the evidence does not cover is named out loud.",
    body: "A gap in coverage is stated as a gap. The alternative — inferring across it — is how a system produces an answer that reads well and is wrong.",
    kind: "unknown",
    note: "A gap is a finding, not a silence",
    confidence: 38
  },
  {
    label: "Confidence",
    heading: "Confidence falls when the evidence weakens.",
    body: "It moved from 62 to 38 because a contradiction landed and a gap was named. Confidence that only ever rises is a presentation, not a measurement.",
    kind: "unknown",
    note: "Movement is traceable to specific evidence",
    confidence: 38
  },
  {
    label: "Gates",
    heading: "Nothing is released until the checks pass.",
    body: "Evidence coverage, deterministic replay, budget discipline, stated uncertainty, confidentiality, human review, and whether the conclusion is actionable at all. A failed gate stops the packet.",
    kind: "gate",
    note: "20-call budget · policy gate · hash-checked replay",
    confidence: 38
  },
  {
    label: "Decision",
    heading: "The output is a rollback review packet that a named owner has to approve.",
    body: "The system recommends. It cannot execute the change. The packet carries the evidence, the contradiction, the gap, and the confidence — so the person approving it is deciding with the same information the system had.",
    kind: "decision",
    note: "Recommend, then stop. The owner acts.",
    confidence: 38
  }
];

const kindStyles: Record<Kind, { dot: string; text: string; ring: string }> = {
  observation: { dot: "bg-mint", text: "text-mint", ring: "border-mint/40" },
  contradiction: { dot: "bg-signal", text: "text-signal", ring: "border-signal/45" },
  unknown: { dot: "bg-amber", text: "text-amber", ring: "border-amber/45" },
  confirmed: { dot: "bg-mint", text: "text-mint", ring: "border-mint/40" },
  gate: { dot: "bg-signal", text: "text-signal", ring: "border-signal/45" },
  decision: { dot: "bg-amber", text: "text-amber", ring: "border-amber/50" }
};

const kindLabel: Record<Kind, string> = {
  observation: "Observation",
  contradiction: "Contradiction",
  unknown: "Unknown",
  confirmed: "Confirmed fact",
  gate: "Evaluation gate",
  decision: "Bounded decision"
};

export function OperationsRoomPreview() {
  const [index, setIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  // Arrow keys move selection AND focus, per the ARIA tabs roving-tabindex pattern. Without this
  // the panel changed while focus stayed on a tab that had just become tabindex="-1", so the next
  // Tab jumped somewhere unexpected and the new tab was never announced.
  const moveFocusRef = useRef(false);
  const step = steps[index];
  const style = kindStyles[step.kind];

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(steps.length - 1, next)));
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
      if (!keys.includes(event.key)) return;
      event.preventDefault();
      moveFocusRef.current = true;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") go(index + 1);
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") go(index - 1);
      else if (event.key === "Home") go(0);
      else go(steps.length - 1);
    },
    [go, index]
  );

  // Keep the active rail button in view on narrow screens without scrolling the page itself.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const active = rail.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) return;
    if (moveFocusRef.current) {
      moveFocusRef.current = false;
      active.focus();
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({
      left: active.offsetLeft - rail.clientWidth / 2 + active.clientWidth / 2,
      behavior: reduce ? "auto" : "smooth"
    });
  }, [index]);

  return (
    <div className="overflow-hidden rounded-xl border border-white/12 bg-black/35">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-mint">OI-ROOM-001</span>
          <span className="text-xs text-slate-500">Synthetic case &middot; no employer data</span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
          Step {index + 1} of {steps.length}
        </p>
      </div>

      <div
        ref={railRef}
        role="tablist"
        aria-label="Investigation stages"
        onKeyDown={onKeyDown}
        className="flex gap-1.5 overflow-x-auto border-b border-white/10 px-4 py-3 sm:px-6"
      >
        {steps.map((item, i) => {
          const active = i === index;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              id={`ops-tab-${i}`}
              aria-selected={active}
              aria-controls="ops-panel"
              tabIndex={active ? 0 : -1}
              data-active={active}
              onClick={() => go(i)}
              className={`min-h-[44px] shrink-0 rounded border px-3 py-2 text-xs font-semibold transition ${
                active
                  ? `${kindStyles[item.kind].ring} bg-white/[0.07] text-white`
                  : "border-white/10 text-slate-400 hover:border-white/25 hover:text-slate-200"
              }`}
            >
              <span className="mr-2 font-mono text-[0.65rem] text-slate-500">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="ops-panel"
        role="tabpanel"
        aria-labelledby={`ops-tab-${index}`}
        tabIndex={0}
        className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.35fr_0.65fr]"
      >
        <div>
          <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] ${style.text}`}>
            <span aria-hidden className={`h-2 w-2 rounded-full ${style.dot}`} />
            {kindLabel[step.kind]}
          </p>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">{step.heading}</h3>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{step.body}</p>
          <p className="mt-4 font-mono text-xs leading-6 text-slate-500">{step.note}</p>
        </div>

        <div className="grid content-start gap-4">
          <div className={`rounded-lg border bg-black/30 p-4 ${style.ring}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Confidence in the leading explanation</p>
            <p className="mt-3 text-3xl font-semibold text-white">{step.confidence}%</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${style.dot} motion-safe:transition-[width] motion-safe:duration-500`}
                style={{ width: `${step.confidence}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              {index < 5
                ? "Rising as evidence is typed and the path is reconstructed."
                : "Falling. A contradiction landed and a gap was named."}
            </p>
          </div>
          <p className="text-sm leading-7 text-slate-400">
            A decision is not trusted until its evidence can be replayed.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-white/10 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="min-h-[44px] rounded border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/35 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === steps.length - 1}
          className="inline-flex min-h-[44px] items-center gap-2 rounded bg-mint px-5 py-2 font-semibold text-ink transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {index === 0 ? "Start the replay" : "Next"} <ArrowRight size={17} />
        </button>
        <Link
          href="/investigation-room"
          className="inline-flex min-h-[44px] items-center gap-2 px-1 py-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
        >
          Inspect the evidence yourself
        </Link>
      </div>
    </div>
  );
}
