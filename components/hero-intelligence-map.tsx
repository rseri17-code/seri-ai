"use client";

import { motion } from "framer-motion";
import { Activity, BrainCircuit, CheckCircle2, GitBranch, Network, ShieldCheck, UserCheck } from "lucide-react";

const nodes = [
  { id: "signals", label: "Signals", detail: "metrics, traces, events", x: 14, y: 30, tone: "mint" },
  { id: "transactions", label: "Transactions", detail: "journey impact", x: 15, y: 70, tone: "signal" },
  { id: "graph", label: "Knowledge graph", detail: "owners, topology, memory", x: 47, y: 18, tone: "amber" },
  { id: "reasoning", label: "ReasonOps", detail: "evidence to explanation", x: 50, y: 52, tone: "mint" },
  { id: "evals", label: "Evaluation", detail: "grounding, refusal, risk", x: 47, y: 84, tone: "signal" },
  { id: "review", label: "Human review", detail: "approval before action", x: 84, y: 52, tone: "amber" }
];

const edges = [
  ["signals", "reasoning"],
  ["transactions", "reasoning"],
  ["graph", "reasoning"],
  ["reasoning", "evals"],
  ["reasoning", "review"],
  ["evals", "review"]
];

const decisions = ["What changed?", "What is affected?", "What evidence supports it?", "What should a human review?"];

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
      <div className="relative z-10 border-b border-white/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">ReasonOps console</p>
            <p className="mt-1 text-lg font-semibold text-white">Operational Intelligence graph</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">
            <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_14px_rgba(95,242,181,0.8)]" />
            Live thesis
          </div>
        </div>
      </div>

      <div className="relative z-10 grid gap-4 p-4 xl:grid-cols-[1fr_18rem]">
        <div className="overflow-hidden rounded-lg border border-white/10 bg-black/25">
          <svg className="h-[31rem] w-full" viewBox="0 0 100 100" role="img" aria-label="Operational Intelligence graph connecting signals, transactions, graph context, reasoning, evaluation, and human review">
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
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="rgba(7,16,24,0.74)" />
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
              <g key={node.id} filter={node.id === "reasoning" ? "url(#hero-glow)" : undefined}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.id === "reasoning" ? 6.8 : 5.4}
                  fill={nodeColor(node.tone)}
                  stroke="rgba(255,255,255,0.78)"
                  strokeWidth="0.65"
                  animate={{ scale: node.id === "reasoning" ? [1, 1.08, 1] : [1, 1.04, 1] }}
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
          <div className="rounded-lg border border-mint/25 bg-mint/[0.08] p-4">
            <BrainCircuit className="text-mint" />
            <p className="mt-3 text-xl font-semibold text-white">Reasoning layer</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Connects signals, transactions, graph context, evals, and human review.</p>
          </div>
          {decisions.map((decision) => (
            <div key={decision} className="flex items-start gap-2 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-sm leading-6 text-slate-200">
              <CheckCircle2 size={15} className="mt-1 shrink-0 text-mint" />
              {decision}
            </div>
          ))}
          <div className="grid grid-cols-3 gap-2">
            {[
              [Activity, "Signals"],
              [Network, "Impact"],
              [GitBranch, "Graph"],
              [ShieldCheck, "Evals"],
              [UserCheck, "Review"]
            ].map(([Icon, label]) => {
              const TypedIcon = Icon as typeof Activity;
              return (
                <div key={String(label)} className="rounded border border-white/10 bg-white/[0.04] p-2 text-center">
                  <TypedIcon className="mx-auto text-signal" size={17} />
                  <p className="mt-1 text-[11px] text-slate-300">{String(label)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
