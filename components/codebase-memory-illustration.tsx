/**
 * VISITOR-FACING COPY — Claude's lane. Codex: do not edit prose in this file.
 *   Claude  — headings, paragraphs, labels, link text, alt text, microcopy, step order.
 *   Codex   — data wiring, imports, props, components, layout mechanics, accessibility
 *             attributes, performance. Structural work here is welcome.
 * If a validator pin fails because copy moved, do not rewrite the copy to satisfy the pin.
 */
"use client";

import { useMemo, useState } from "react";
import {
  defaultCodebaseMemoryTaskId,
  listCodebaseMemoryTaskOptions,
  resolveCodebaseMemoryView
} from "@/lib/codebase-memory";

const taskOptions = listCodebaseMemoryTaskOptions();

export function CodebaseMemoryIllustration() {
  const [taskId, setTaskId] = useState(defaultCodebaseMemoryTaskId);
  const [supportingChanged, setSupportingChanged] = useState(false);
  const view = useMemo(() => resolveCodebaseMemoryView(taskId, supportingChanged), [taskId, supportingChanged]);
  const statusTone = view.status === "Revalidation required" ? "amber" : "mint";

  return (
    <section
      id="illustrative-example"
      aria-labelledby="codebase-memory-illustration-title"
      className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.035]"
    >
      <header className="border-b border-white/10 p-4 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Illustrative example</p>
        <h2 id="codebase-memory-illustration-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          A fresh agent, a retained lesson, and a source that can move.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Synthetic checkout code only. Nothing here is a live system, a private repository, or a measured result.
          Select a task, inspect the relationships and the lesson, then toggle a supporting-code change. The lesson
          status moves from Source unchanged to Revalidation required. The status is readable without animation.
        </p>
      </header>

      <div className="grid gap-px bg-white/10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="bg-ink p-4 sm:p-6">
          <fieldset className="min-w-0">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Coding task</legend>
            <div role="radiogroup" aria-label="Select a coding task" className="mt-3 grid gap-2">
              {taskOptions.map((option) => {
                const selected = option.id === view.task.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setTaskId(option.id)}
                    className={`min-h-11 rounded border px-4 py-3 text-left transition ${
                      selected ? "border-mint/50 bg-mint/[0.08] text-white" : "border-white/10 bg-black/20 text-slate-200 hover:border-white/25"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{option.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-400">{option.prompt}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Supporting-code change</p>
            <button
              type="button"
              role="switch"
              aria-checked={supportingChanged}
              aria-label={`Toggle a supporting-code change for ${view.supportingSource.label}`}
              onClick={() => setSupportingChanged((value) => !value)}
              className={`mt-3 inline-flex min-h-11 w-full items-center justify-between gap-3 rounded border px-4 py-3 text-left sm:w-auto ${
                supportingChanged ? "border-amber/40 bg-amber/[0.08] text-amber" : "border-white/10 bg-black/20 text-slate-200"
              }`}
            >
              <span className="text-sm font-semibold">
                {supportingChanged ? `${view.supportingSource.label} marked changed` : `${view.supportingSource.label} unchanged`}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-6 w-11 shrink-0 place-items-center rounded-full border ${
                  supportingChanged ? "border-amber/50 bg-amber/20" : "border-white/15 bg-white/10"
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full ${supportingChanged ? "translate-x-2 bg-amber" : "-translate-x-2 bg-slate-300"}`}
                />
              </span>
            </button>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Keyboard: tab to a task, then to this switch. Space or Enter changes the selection. Reduced motion keeps
              the lesson status as plain text.
            </p>
          </div>
        </div>

        <div className="bg-panel p-4 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Relevant code relationships</p>
          <ul className="mt-3 space-y-2">
            {view.edges.map((edge) => (
              <li key={`${edge.from}-${edge.to}`} className="rounded border border-white/10 bg-black/20 p-3">
                <p className="text-sm font-semibold text-white">
                  {edge.fromLabel} <span className="font-normal text-slate-400">{edge.label}</span> {edge.toLabel}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {view.nodes.find((node) => node.id === edge.from)?.summary} → {view.nodes.find((node) => node.id === edge.to)?.summary}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Task-specific capability guide</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{view.task.guide}</p>
          </div>

          <div className="mt-4 rounded border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Retained lesson</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{view.task.lesson}</p>
            <dl className="mt-4 grid gap-3 text-sm leading-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Reuse when</dt>
                <dd className="mt-1 text-slate-300">{view.task.reuseWhen}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Invalidate when</dt>
                <dd className="mt-1 text-slate-300">{view.task.invalidateWhen}</dd>
              </div>
            </dl>
          </div>

          <div
            className={`mt-4 rounded border p-4 ${
              statusTone === "amber" ? "border-amber/35 bg-amber/[0.08]" : "border-mint/35 bg-mint/[0.08]"
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Lesson status</p>
            <p className={`mt-2 text-lg font-semibold ${statusTone === "amber" ? "text-amber" : "text-mint"}`}>{view.status}</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{view.freshnessNote}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{view.correctnessNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
