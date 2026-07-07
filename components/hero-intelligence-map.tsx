"use client";

import { motion } from "framer-motion";
import { AlertTriangle, BrainCircuit, CheckCircle2, Clock3, FileCheck2, ShieldCheck } from "lucide-react";

const nodes = [
  { id: "signal", label: "Signal", detail: "latency + retry spike", x: 15, y: 31, tone: "mint" },
  { id: "journey", label: "Journey", detail: "checkout path impacted", x: 17, y: 72, tone: "signal" },
  { id: "change", label: "Change", detail: "config delta", x: 43, y: 18, tone: "amber" },
  { id: "graph", label: "Graph", detail: "owner + topology", x: 48, y: 53, tone: "mint" },
  { id: "memory", label: "Memory", detail: "similar pattern", x: 45, y: 86, tone: "signal" },
  { id: "decision", label: "Decision", detail: "review-gated action", x: 82, y: 54, tone: "amber" }
];

const edges = [
  ["signal", "graph"],
  ["journey", "graph"],
  ["change", "graph"],
  ["memory", "graph"],
  ["graph", "decision"],
  ["change", "decision"],
  ["memory", "decision"]
];

const replayEvents = [
  ["00:00", "Impact detected", "Completion dropped across checkout journey"],
  ["00:04", "Evidence linked", "Retry spike aligns with non-secret config change"],
  ["00:07", "Hypothesis ranked", "Misroute pattern moves to leading explanation"],
  ["00:11", "Action gated", "Rollback candidate requires human approval"]
];

const caseTelemetry = [
  ["Case", "OI-ROOM-001"],
  ["Mode", "Replay + eval"],
  ["Impact", "Checkout degradation"],
  ["Gate", "Human review"]
];

const hypotheses = [
  ["H1", "Config-driven routing regression", "82%", "supported"],
  ["H2", "Downstream latency saturation", "41%", "partial"],
  ["H3", "Telemetry-only alert noise", "18%", "rejected"]
];

const evalGates = [
  ["Grounded", "pass"],
  ["Cites evidence", "pass"],
  ["Names uncertainty", "pass"],
  ["Action bounded", "review"]
];

function nodeColor(tone: string) {
  if (tone === "amber") return "#f3c969";
  if (tone === "signal") return "#73a7ff";
  return "#5ff2b5";
}

export function HeroIntelligenceMap() {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#071018] shadow-2xl shadow-black/40">
      <div className="absolute inset-0 intelligence-field opacity-70" />
      <div className="absolute inset-0 hero-scanline" />
      <div className="relative z-10 border-b border-white/10 bg-black/20 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">ReasonOps console</p>
            <p className="mt-1 text-lg font-semibold text-white">Operational Intelligence Room</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Replay active", "Evidence locked", "RCA draft ready"].map((item, index) => (
              <span
                key={item}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                  index === 0 ? "border-mint/30 bg-mint/10 text-mint" : index === 1 ? "border-signal/30 bg-signal/10 text-signal" : "border-amber/30 bg-amber/10 text-amber"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_14px_currentColor]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 grid gap-3 p-4">
        <div className="grid gap-3 md:grid-cols-4">
          {caseTelemetry.map(([label, value]) => (
            <div key={label} className="rounded border border-white/10 bg-black/25 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
              <p className="mt-1 truncate text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black/25">
            <svg className="h-[26rem] w-full" viewBox="0 0 100 100" role="img" aria-label="Operational Intelligence graph connecting signals, transactions, graph context, reasoning, evaluation, and human review">
            <defs>
              <linearGradient id="hero-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5ff2b5" />
                <stop offset="52%" stopColor="#73a7ff" />
                <stop offset="100%" stopColor="#f3c969" />
              </linearGradient>
              <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="hero-radar" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(95,242,181,0.25)" />
                <stop offset="100%" stopColor="rgba(95,242,181,0)" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="rgba(7,16,24,0.74)" />
            <motion.circle
              cx="48"
              cy="53"
              r="29"
              fill="url(#hero-radar)"
              animate={{ opacity: [0.18, 0.52, 0.18], scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 4.8, repeat: Infinity }}
            />
            <g opacity="0.24">
              {Array.from({ length: 8 }).map((_, index) => (
                <line key={`h-${index}`} x1="6" x2="94" y1={12 + index * 11} y2={12 + index * 11} stroke="rgba(255,255,255,0.14)" strokeWidth="0.25" />
              ))}
              {Array.from({ length: 8 }).map((_, index) => (
                <line key={`v-${index}`} x1={8 + index * 12} x2={8 + index * 12} y1="8" y2="92" stroke="rgba(255,255,255,0.14)" strokeWidth="0.25" />
              ))}
            </g>
            {edges.map(([from, to], index) => {
              const fromNode = nodeMap.get(from);
              const toNode = nodeMap.get(to);
              if (fromNode == null || toNode == null) {
                return null;
              }
              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="url(#hero-edge)"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  strokeWidth="1.1"
                  initial={{ pathLength: 0, opacity: 0.35 }}
                  animate={{ pathLength: 1, opacity: [0.45, 1, 0.45] }}
                  transition={{ duration: 2.4, delay: index * 0.14, repeat: Infinity, repeatDelay: 1.6 }}
                />
              );
            })}
            {nodes.map((node, index) => (
              <g key={node.id} filter={node.id === "graph" || node.id === "decision" ? "url(#hero-glow)" : undefined}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.id === "graph" ? 7.1 : node.id === "decision" ? 6.5 : 5.2}
                  fill={nodeColor(node.tone)}
                  stroke="rgba(255,255,255,0.78)"
                  strokeWidth="0.65"
                  animate={{ scale: node.id === "graph" || node.id === "decision" ? [1, 1.1, 1] : [1, 1.04, 1] }}
                  transition={{ duration: 2.1, delay: index * 0.12, repeat: Infinity }}
                />
                <text x={node.x} y={node.y + 10} textAnchor="middle" className="sim-graph-label">
                  {node.label}
                </text>
                <text x={node.x} y={node.y + 14.5} textAnchor="middle" className="sim-graph-detail">
                  {node.detail}
                </text>
              </g>
            ))}
            </svg>
          </div>

          <div className="grid gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <Clock3 size={16} className="text-mint" />
                Evidence replay
              </div>
              <div className="space-y-2">
                {replayEvents.map(([time, title, detail], index) => (
                  <motion.div
                    key={title}
                    className="grid grid-cols-[3.25rem_1fr] gap-3 rounded border border-white/10 bg-black/20 p-3"
                    animate={{ borderColor: index === 2 ? ["rgba(255,255,255,0.1)", "rgba(95,242,181,0.5)", "rgba(255,255,255,0.1)"] : "rgba(255,255,255,0.1)" }}
                    transition={{ duration: 2.6, delay: index * 0.28, repeat: Infinity }}
                  >
                    <span className="font-mono text-xs text-signal">{time}</span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-100">{title}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-400">{detail}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-lg border border-mint/25 bg-mint/[0.08] p-4">
                <BrainCircuit className="text-mint" />
                <p className="mt-3 text-lg font-semibold text-white">Hypothesis ranking</p>
                <div className="mt-3 space-y-2">
                  {hypotheses.map(([id, name, score, state]) => (
                    <div key={id} className="rounded border border-white/10 bg-black/20 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold text-slate-400">{id}</span>
                        <span className={state === "supported" ? "text-xs font-semibold text-mint" : state === "partial" ? "text-xs font-semibold text-amber" : "text-xs font-semibold text-slate-500"}>{score}</span>
                      </div>
                      <p className="mt-1 text-sm font-semibold leading-5 text-white">{name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">{state}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-signal/25 bg-signal/[0.08] p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <ShieldCheck size={16} className="text-signal" />
                  Evaluation gates
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {evalGates.map(([label, state]) => (
                    <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                      <div className="flex items-center gap-2">
                        {state === "pass" ? <CheckCircle2 size={14} className="text-mint" /> : <AlertTriangle size={14} className="text-amber" />}
                        <span className="text-xs font-semibold text-slate-200">{label}</span>
                      </div>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">{state}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded border border-amber/25 bg-amber/[0.08] p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber">
                    <FileCheck2 size={15} />
                    RCA packet exportable
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-300">Evidence receipts, losing hypotheses, confidence movement, and review gate preserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
