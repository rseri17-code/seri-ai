"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Pause, Play, RotateCcw, StepForward, X } from "lucide-react";
import { runSnapshot, sreReferenceRun, type OperatorDecision } from "@/lib/operational-intelligence/sre-reference-run";

const sourceTone = { logs: "border-signal/40", metrics: "border-mint/40", traces: "border-amber/40", topology: "border-violet-400/40", change: "border-cyan-400/40", memory: "border-fuchsia-400/40" } as const;
const receiptTone = { Observation: "text-signal", Inference: "text-violet-300", Contradiction: "text-amber", "Missing Evidence": "text-amber", "Confirmed Fact": "text-mint" } as const;

export function SreReferenceRun() {
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [decision, setDecision] = useState<OperatorDecision | null>(null);
  const snapshot = useMemo(() => runSnapshot(index, decision), [index, decision]);

  useEffect(() => {
    if (!playing) return;
    if (index >= sreReferenceRun.events.length - 1) { setPlaying(false); return; }
    const timer = window.setTimeout(() => setIndex((value) => value + 1), 900);
    return () => window.clearTimeout(timer);
  }, [playing, index]);

  const reset = () => { setPlaying(false); setIndex(-1); setDecision(null); };
  const step = () => setIndex((value) => Math.min(value + 1, sreReferenceRun.events.length - 1));

  return (
    <section id="operations-room" aria-labelledby="reference-run-title" className="overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-glow">
      <header className="border-b border-white/10 bg-gradient-to-r from-signal/10 via-transparent to-mint/10 p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-mint">{sreReferenceRun.label} · public-safe fixture</p>
            <h2 id="reference-run-title" className="mt-2 text-2xl font-semibold text-white">{sreReferenceRun.scenario}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{sreReferenceRun.policy}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-slate-300">{sreReferenceRun.id} · event {Math.max(index + 1, 0)}/{sreReferenceRun.events.length}</div>
        </div>
        <details className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
          <summary className="cursor-pointer font-semibold text-white">Deterministic event stream</summary>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {sreReferenceRun.events.map((event) => (
              <li key={`summary-${event.id}`} className="leading-5">
                <span className="font-mono text-xs uppercase text-slate-500">{event.stage}{event.source ? ` · ${event.source}` : ""}</span>
                <span className="block">{event.title}</span>
              </li>
            ))}
          </ol>
        </details>
        <div className="mt-5 flex flex-wrap gap-2" aria-label="Reference run controls">
          <button type="button" onClick={() => setPlaying((value) => !value)} className="inline-flex min-h-11 items-center gap-2 rounded bg-mint px-4 py-2 text-sm font-semibold text-ink">{playing ? <Pause size={17} /> : <Play size={17} />}{playing ? "Pause" : "Play"}</button>
          <button type="button" onClick={step} disabled={playing || index >= sreReferenceRun.events.length - 1} className="inline-flex min-h-11 items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"><StepForward size={17} />Step</button>
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white"><RotateCcw size={17} />Reset</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,.55fr)]">
        <div className="border-b border-white/10 p-4 lg:border-b-0 lg:border-r lg:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Deterministic event stream</p>
            <p aria-live="polite" className="font-mono text-xs text-slate-400">{playing ? "RUNNING" : index < 0 ? "READY" : "PAUSED"}</p>
          </div>
          <ol className="space-y-3" aria-live="polite">
            {snapshot.visible.length === 0 && <li className="rounded-xl border border-dashed border-white/15 p-6 text-sm text-slate-400">Press Play or Step to open the incident.</li>}
            {snapshot.visible.map((event) => (
              <li key={event.id} className={`rounded-xl border bg-white/[0.025] p-4 ${event.source ? sourceTone[event.source] : "border-white/10"}`}>
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-slate-400"><time>{event.at}</time><span>·</span><span>{event.stage}</span>{event.source && <><span>·</span><span>{event.source}</span></>}</div>
                <div className="mt-2 flex flex-wrap items-start justify-between gap-2"><h3 className="font-semibold text-white">{event.title}</h3>{event.receipt && <span className={`rounded-full bg-black/30 px-2 py-1 text-xs font-semibold ${receiptTone[event.receipt]}`}>{event.receipt}</span>}</div>
                <p className="mt-1 text-sm leading-6 text-slate-300">{event.detail}</p>
                {event.freshness && <p className="mt-2 font-mono text-[11px] text-slate-500">provenance: checked-in OI-ROOM-001 fixture · freshness: {event.freshness}</p>}
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-5 p-4 lg:p-6" aria-label="Run state and control boundaries">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400"><span>Leading confidence</span><span className="font-mono text-white">{snapshot.latestConfidence}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-gradient-to-r from-amber to-mint transition-[width] motion-reduce:transition-none" style={{ width: `${snapshot.latestConfidence}%` }} /></div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Evaluation gate</p>
            {snapshot.gate ? <ul className="mt-3 space-y-2 text-sm">{Object.entries(snapshot.gate).filter(([key]) => key !== "blocked").map(([key, pass]) => <li key={key} className="flex items-center justify-between capitalize text-slate-300"><span>{key}</span>{pass ? <Check className="text-mint" size={16} /> : <X className="text-amber" size={16} />}</li>)}</ul> : <p className="mt-3 text-sm text-slate-500">Waiting for evidence coverage.</p>}
            {snapshot.gate && <p className={`mt-3 text-sm font-semibold ${snapshot.gate.blocked ? "text-amber" : "text-mint"}`}>{snapshot.gate.blocked ? "BLOCKED · unsupported recommendation" : "REVIEWABLE · human decision required"}</p>}
          </div>
          <fieldset disabled={!snapshot.awaitingDecision} className="rounded-xl border border-white/10 p-4 disabled:opacity-50">
            <legend className="px-1 text-xs font-semibold uppercase tracking-wide text-slate-400">Operator decision packet</legend>
            <div className="mt-2 grid gap-2">{(["approve", "reject", "escalate"] as const).map((choice) => <button key={choice} type="button" onClick={() => setDecision(choice)} aria-pressed={decision === choice} className="min-h-11 rounded border border-white/15 px-3 text-left text-sm font-semibold capitalize text-white aria-pressed:border-mint aria-pressed:bg-mint/10">{choice}</button>)}</div>
          </fieldset>
          <div className={`rounded-xl border p-4 ${snapshot.memoryStored ? "border-mint/40 bg-mint/5" : "border-white/10"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Operational Memory</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{snapshot.memoryStored ? `Reviewed ${decision} outcome stored as replay seed.` : "No outcome stored. Review is required before promotion."}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
