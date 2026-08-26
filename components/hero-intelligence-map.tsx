import { FileCheck2 } from "lucide-react";

const nodes = [
  { id: "signal", label: "Observation", detail: "latency + retries", x: 15, y: 31, tone: "mint" },
  { id: "journey", label: "Transaction", detail: "checkout path", x: 17, y: 72, tone: "signal" },
  { id: "change", label: "Change", detail: "reviewed event", x: 43, y: 18, tone: "amber" },
  { id: "graph", label: "Evidence Graph", detail: "owner + topology", x: 48, y: 53, tone: "mint" },
  { id: "memory", label: "Memory", detail: "prior pattern", x: 45, y: 86, tone: "signal" },
  { id: "decision", label: "Decision Packet", detail: "approval required", x: 86, y: 62, tone: "amber" }
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

const caseTelemetry = [
  ["Case", "OI-ROOM-001"],
  ["Question", "What changed?"],
  ["Output", "Decision packet"],
  ["Boundary", "Owner approval"]
];

const packetRows = [
  ["Observation", "Transaction degradation is accepted as evidence", "mint"],
  ["Inference", "Recent change is the leading hypothesis", "signal"],
  ["Contradiction", "Capacity headroom weakens saturation", "amber"],
  ["Unknown", "Owner approval is still missing", "amber"]
] as const;

const contextLedger = [
  ["Owner", "Required"],
  ["Replay", "6 receipts"],
  ["Memory", "Pattern candidate"],
  ["Eval gates", "3 pass / 1 review"],
  ["Hypothesis", "Supported"],
  ["Action", "No execution"]
] as const;

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
            <p className="text-xs font-semibold uppercase text-slate-400">Operational Intelligence under test</p>
            <p className="mt-1 text-lg font-semibold text-white">A decision is not trusted until its evidence can be replayed.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Replayable", "Evidence typed", "Action gated"].map((item, index) => (
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

          <div className="grid gap-3">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-black/25">
            <svg className="h-[12rem] w-full sm:h-[13.5rem]" viewBox="0 0 100 100" role="img" aria-label="Operational Intelligence graph connecting observations, transactions, evidence graph context, memory, decision packet, and human approval">
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
            <circle
              className="hero-radar-pulse"
              cx="48"
              cy="53"
              r="29"
              fill="url(#hero-radar)"
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
                <line
                  className="hero-flow-line"
                  key={`${from}-${to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="url(#hero-edge)"
                  strokeDasharray="4 4"
                  strokeLinecap="round"
                  strokeWidth="1.1"
                  style={{ animationDelay: `${index * 140}ms` }}
                />
              );
            })}
            {nodes.map((node, index) => (
              <g key={node.id} filter={node.id === "graph" || node.id === "decision" ? "url(#hero-glow)" : undefined}>
                <circle
                  className={node.id === "graph" || node.id === "decision" ? "hero-node-pulse hero-node-pulse-strong" : "hero-node-pulse"}
                  cx={node.x}
                  cy={node.y}
                  r={node.id === "graph" ? 7.1 : node.id === "decision" ? 6.5 : 5.2}
                  fill={nodeColor(node.tone)}
                  stroke="rgba(255,255,255,0.78)"
                  strokeWidth="0.65"
                  style={{ animationDelay: `${index * 120}ms`, transformOrigin: `${node.x}px ${node.y}px` }}
                />
                <text x={node.x} y={node.y + 10} textAnchor="middle" className="sim-graph-label">
                  {node.label}
                </text>
                <text x={node.x} y={node.y + 14.5} textAnchor="middle" className="sim-graph-detail">
                  {node.detail}
                </text>
              </g>
            ))}
            <g>
              <rect x="64.2" y="5.8" width="29.8" height="23.8" rx="2.2" fill="rgba(0,0,0,0.44)" stroke="rgba(243,201,105,0.45)" strokeWidth="0.35" />
              <text x="67" y="12" className="sim-graph-label" fill="#f3c969">Decision packet</text>
              <text x="67" y="17" className="sim-graph-detail" fill="#cbd5e1">action: review only</text>
              <text x="67" y="22" className="sim-graph-detail" fill="#cbd5e1">unknowns: visible</text>
              <text x="67" y="27" className="sim-graph-detail" fill="#cbd5e1">owner: required</text>
            </g>
            </svg>
          </div>

          <div className="rounded-lg border border-amber/25 bg-amber/[0.06] p-3">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                <FileCheck2 size={16} className="text-amber" />
                Decision packet contract
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {packetRows.map(([label, value, tone]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</span>
                    <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${tone === "amber" ? "bg-amber" : tone === "signal" ? "bg-signal" : "bg-mint"}`} />
                  </div>
                  <p className="mt-1 text-xs font-semibold leading-4 text-slate-100">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.035] p-3 md:grid-cols-6">
            {contextLedger.map(([label, value]) => (
              <div key={label} className="rounded border border-white/10 bg-black/20 px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
