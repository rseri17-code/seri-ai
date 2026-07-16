import type { ReactNode } from "react";
import { Card } from "@/components/card";

function PrimitiveCard({ label, title, children }: { label: string; title?: string; children: ReactNode }) {
  return (
    <Card className="my-6 border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-semibold uppercase text-mint">{label}</p>
      {title ? <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3> : null}
      <div className="mt-3 text-sm leading-6 text-slate-300">{children}</div>
    </Card>
  );
}

export function FrameworkDiagram({ title, layers }: { title?: string; layers: string[] }) {
  return (
    <PrimitiveCard label="Framework diagram" title={title}>
      <div className="grid gap-2 md:grid-cols-5">
        {layers.map((layer, index) => (
          <div key={layer} className="rounded border border-mint/20 bg-mint/[0.06] p-3">
            <p className="font-mono text-xs text-mint">{String(index + 1).padStart(2, "0")}</p>
            <p className="mt-2 font-semibold text-white">{layer}</p>
          </div>
        ))}
      </div>
    </PrimitiveCard>
  );
}

export function EvidenceCard({ title, source, confidence, children }: { title: string; source: string; confidence?: string; children: ReactNode }) {
  return (
    <PrimitiveCard label="Evidence" title={title}>
      <div className="mb-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded border border-white/10 px-2 py-1 text-slate-300">Source: {source}</span>
        {confidence ? <span className="rounded border border-signal/25 px-2 py-1 text-signal">Confidence: {confidence}</span> : null}
      </div>
      {children}
    </PrimitiveCard>
  );
}

export function HypothesisTimeline({ states }: { states: Array<{ state: string; detail: string }> }) {
  return (
    <PrimitiveCard label="Hypothesis timeline">
      <div className="grid gap-3 md:grid-cols-4">
        {states.map((item) => (
          <div key={item.state} className="rounded border border-white/10 bg-black/20 p-3">
            <p className="text-xs font-semibold uppercase text-signal">{item.state}</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">{item.detail}</p>
          </div>
        ))}
      </div>
    </PrimitiveCard>
  );
}

export function DecisionTable({ rows }: { rows: Array<{ option: string; evidence: string; decision: string }> }) {
  return (
    <PrimitiveCard label="Decision table">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="border-b border-white/10 py-2">Option</th>
              <th className="border-b border-white/10 py-2">Evidence</th>
              <th className="border-b border-white/10 py-2">Decision</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.option}>
                <td className="border-b border-white/10 py-3 text-white">{row.option}</td>
                <td className="border-b border-white/10 py-3 text-slate-300">{row.evidence}</td>
                <td className="border-b border-white/10 py-3 text-mint">{row.decision}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrimitiveCard>
  );
}

export function TradeoffMatrix({ tradeoffs }: { tradeoffs: Array<{ choice: string; upside: string; risk: string }> }) {
  return (
    <PrimitiveCard label="Tradeoff matrix">
      <div className="grid gap-3 md:grid-cols-2">
        {tradeoffs.map((tradeoff) => (
          <div key={tradeoff.choice} className="rounded border border-white/10 bg-black/20 p-3">
            <h3 className="font-semibold text-white">{tradeoff.choice}</h3>
            <p className="mt-2 text-sm text-mint">Upside: {tradeoff.upside}</p>
            <p className="mt-2 text-sm text-amber">Risk: {tradeoff.risk}</p>
          </div>
        ))}
      </div>
    </PrimitiveCard>
  );
}

export function OperatorQuestion({ children }: { children: ReactNode }) {
  return <PrimitiveCard label="Operator question">{children}</PrimitiveCard>;
}

export function FailureMode({ title, children }: { title: string; children: ReactNode }) {
  return <PrimitiveCard label="Failure mode" title={title}>{children}</PrimitiveCard>;
}

export function ReplaySeed({ id, children }: { id: string; children: ReactNode }) {
  return <PrimitiveCard label={`Replay seed ${id}`}>{children}</PrimitiveCard>;
}

export function EvaluationGate({ name, checks }: { name: string; checks: string[] }) {
  return (
    <PrimitiveCard label="Evaluation gate" title={name}>
      <ul className="space-y-2">
        {checks.map((check) => (
          <li key={check} className="rounded border border-white/10 bg-black/20 px-3 py-2">{check}</li>
        ))}
      </ul>
    </PrimitiveCard>
  );
}

export function TransactionJourney({ hops }: { hops: Array<{ hop: string; timing: string; note: string }> }) {
  return (
    <PrimitiveCard label="Transaction journey">
      <div className="space-y-2">
        {hops.map((hop) => (
          <div key={hop.hop} className="grid gap-2 rounded border border-white/10 bg-black/20 p-3 md:grid-cols-[10rem_8rem_1fr]">
            <span className="font-semibold text-white">{hop.hop}</span>
            <span className="font-mono text-xs text-signal">{hop.timing}</span>
            <span>{hop.note}</span>
          </div>
        ))}
      </div>
    </PrimitiveCard>
  );
}

export function ArchitecturePattern({ name, children }: { name: string; children: ReactNode }) {
  return <PrimitiveCard label="Architecture pattern" title={name}>{children}</PrimitiveCard>;
}

export function Callout({ tone = "mint", children }: { tone?: "mint" | "signal" | "amber"; children: ReactNode }) {
  const toneClass = tone === "amber" ? "border-amber/25 bg-amber/[0.07]" : tone === "signal" ? "border-signal/25 bg-signal/[0.07]" : "border-mint/25 bg-mint/[0.07]";
  return <div className={`my-6 rounded-lg border p-4 text-sm leading-6 text-slate-200 ${toneClass}`}>{children}</div>;
}

export function ResearchNote({ source, children }: { source?: string; children: ReactNode }) {
  return (
    <PrimitiveCard label="Research note" title={source}>
      {children}
    </PrimitiveCard>
  );
}

export function Quote({ attribution, children }: { attribution?: string; children: ReactNode }) {
  return (
    <blockquote className="my-6 border-l-2 border-mint pl-5 text-lg leading-8 text-slate-200">
      {children}
      {attribution ? <footer className="mt-3 text-sm text-slate-500">{attribution}</footer> : null}
    </blockquote>
  );
}

export function Diagram({ title, children }: { title?: string; children: ReactNode }) {
  return <PrimitiveCard label="Diagram" title={title}>{children}</PrimitiveCard>;
}

export function InteractiveCode({ code, language = "text" }: { code: string; language?: string }) {
  return (
    <PrimitiveCard label={`Interactive code · ${language}`}>
      <pre className="overflow-x-auto rounded border border-white/10 bg-black/40 p-4 text-xs text-slate-200">
        <code>{code}</code>
      </pre>
    </PrimitiveCard>
  );
}

export const mdxComponents = {
  FrameworkDiagram,
  EvidenceCard,
  HypothesisTimeline,
  DecisionTable,
  TradeoffMatrix,
  OperatorQuestion,
  FailureMode,
  ReplaySeed,
  EvaluationGate,
  TransactionJourney,
  ArchitecturePattern,
  Callout,
  ResearchNote,
  Quote,
  Diagram,
  InteractiveCode
};
