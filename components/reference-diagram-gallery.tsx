import { Card } from "@/components/card";
import type { ReactNode } from "react";

const layers = [
  ["Signal", "Telemetry, alerts, events"],
  ["Transaction", "Journey, hops, timing"],
  ["Topology", "Dependencies, owners"],
  ["Evidence", "Facts, gaps, contradictions"],
  ["Reasoning", "Hypotheses, falsification"],
  ["Memory", "Patterns, outcomes"],
  ["Evaluation", "Gates, regression checks"],
  ["Decision", "Reviewable options"],
  ["Operator", "Approve, reject, escalate"],
  ["Learning", "Replay, update, improve"]
];

const states = [
  ["Proposed", 16, 24],
  ["Supported", 42, 24],
  ["Contradicted", 68, 24],
  ["Confirmed", 42, 62],
  ["Rejected", 68, 62]
] as const;

const evidenceNodes = [
  ["E1", "Observation", "Latency increased", 13, 22, "mint"],
  ["E2", "Observation", "Payment hop slow", 13, 50, "mint"],
  ["E3", "Change", "Deployment event", 13, 78, "signal"],
  ["E4", "Contradiction", "Dependency normal", 49, 22, "amber"],
  ["E5", "Missing", "Trace gap", 49, 78, "amber"],
  ["H1", "Hypothesis", "Change caused delay", 80, 35, "signal"],
  ["DP", "Decision", "Rollback review", 80, 68, "mint"]
] as const;

function Arrow({ x1, y1, x2, y2, tone = "mint", dashed = false }: { x1: number; y1: number; x2: number; y2: number; tone?: "mint" | "signal" | "amber"; dashed?: boolean }) {
  const color = tone === "amber" ? "#f3c969" : tone === "signal" ? "#73a7ff" : "#5ff2b5";
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" strokeLinecap="round" strokeDasharray={dashed ? "2 2" : undefined} markerEnd={`url(#arrow-${tone})`} opacity="0.78" />;
}

function SvgShell({ title, description, children, viewBox = "0 0 100 100" }: { title: string; description: string; children: ReactNode; viewBox?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      <svg className="h-72 w-full overflow-hidden" viewBox={viewBox} role="img" aria-label={`${title}: ${description}`}>
        <defs>
          <marker id="arrow-mint" markerHeight="6" markerWidth="6" orient="auto" refX="5" refY="3">
            <path d="M0,0 L6,3 L0,6 Z" fill="#5ff2b5" />
          </marker>
          <marker id="arrow-signal" markerHeight="6" markerWidth="6" orient="auto" refX="5" refY="3">
            <path d="M0,0 L6,3 L0,6 Z" fill="#73a7ff" />
          </marker>
          <marker id="arrow-amber" markerHeight="6" markerWidth="6" orient="auto" refX="5" refY="3">
            <path d="M0,0 L6,3 L0,6 Z" fill="#f3c969" />
          </marker>
          <filter id="reference-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {children}
      </svg>
    </div>
  );
}

function DiagramNode({ x, y, title, detail, tone = "mint", wide = false }: { x: number; y: number; title: string; detail: string; tone?: "mint" | "signal" | "amber"; wide?: boolean }) {
  const stroke = tone === "amber" ? "#f3c969" : tone === "signal" ? "#73a7ff" : "#5ff2b5";
  const fill = tone === "amber" ? "rgba(243, 201, 105, 0.12)" : tone === "signal" ? "rgba(115, 167, 255, 0.12)" : "rgba(95, 242, 181, 0.12)";
  const width = wide ? 24 : 19;
  return (
    <g filter="url(#reference-glow)">
      <rect x={x - width / 2} y={y - 6.5} width={width} height="13" rx="2" fill={fill} stroke={stroke} strokeWidth="0.55" />
      <text x={x} y={y - 1.2} textAnchor="middle" className="sim-graph-label">
        {title}
      </text>
      <text x={x} y={y + 3.8} textAnchor="middle" className="sim-graph-detail">
        {detail}
      </text>
    </g>
  );
}

function ArchitectureFlow() {
  return (
    <SvgShell title="Ten-layer Architecture Flow" description="The doctrine as an inspectable path from emitted signals to accountable learning." viewBox="0 0 160 88">
      {layers.map(([title, detail], index) => {
        const x = 15 + (index % 5) * 32;
        const y = index < 5 ? 24 : 62;
        return <DiagramNode key={title} x={x} y={y} title={title} detail={detail} tone={index % 3 === 1 ? "signal" : index % 3 === 2 ? "amber" : "mint"} wide />;
      })}
      {[0, 1, 2, 3].map((index) => <Arrow key={`top-${index}`} x1={25 + index * 32} y1={24} x2={37 + index * 32} y2={24} />)}
      <Arrow x1={143} y1={31} x2={143} y2={55} tone="signal" />
      {[5, 6, 7, 8].map((index) => <Arrow key={`bottom-${index}`} x1={15 + (index % 5) * 32 + 10} y1={62} x2={15 + ((index + 1) % 5) * 32 - 10} y2={62} tone="signal" />)}
      <Arrow x1={15} y1={55} x2={15} y2={31} tone="amber" dashed />
    </SvgShell>
  );
}

function HypothesisStateMachine() {
  return (
    <SvgShell title="Hypothesis State Machine" description="A claim must move through explicit states; confident prose is not a state transition.">
      <Arrow x1={25} y1={24} x2={32} y2={24} />
      <Arrow x1={52} y1={24} x2={58} y2={24} tone="amber" />
      <Arrow x1={68} y1={31} x2={50} y2={56} tone="mint" />
      <Arrow x1={68} y1={31} x2={68} y2={55} tone="amber" />
      <Arrow x1={42} y1={31} x2={42} y2={55} tone="signal" />
      <Arrow x1={52} y1={62} x2={58} y2={62} tone="amber" dashed />
      {states.map(([title, x, y], index) => (
        <DiagramNode key={title} x={x} y={y} title={title} detail={index === 0 ? "candidate" : index === 1 ? "has support" : index === 2 ? "challenged" : index === 3 ? "reviewed" : "falsified"} tone={index === 2 || index === 4 ? "amber" : index === 3 ? "mint" : "signal"} wide />
      ))}
    </SvgShell>
  );
}

function EvidenceGraph() {
  return (
    <SvgShell title="Evidence Graph" description="Observations, contradictions, gaps, and memory connect to hypotheses without pretending every edge proves causality.">
      <Arrow x1={22} y1={22} x2={70} y2={35} />
      <Arrow x1={22} y1={50} x2={70} y2={35} />
      <Arrow x1={22} y1={78} x2={70} y2={35} tone="signal" />
      <Arrow x1={57} y1={22} x2={70} y2={35} tone="amber" dashed />
      <Arrow x1={57} y1={78} x2={70} y2={35} tone="amber" dashed />
      <Arrow x1={80} y1={43} x2={80} y2={60} tone="mint" />
      {evidenceNodes.map(([id, title, detail, x, y, tone]) => (
        <DiagramNode key={id} x={x} y={y} title={`${id} ${title}`} detail={detail} tone={tone} wide />
      ))}
    </SvgShell>
  );
}

function OperatorSequence() {
  const actors = [
    ["Operator", 13],
    ["Ask", 32],
    ["Evidence", 51],
    ["Eval", 70],
    ["Decision", 89]
  ] as const;
  const messages = [
    ["Investigate latency", 13, 32, 24, "signal"],
    ["Retrieve approved context", 32, 51, 37, "mint"],
    ["Return facts, contradiction, gap", 51, 32, 50, "amber"],
    ["Check gates", 32, 70, 63, "mint"],
    ["Draft packet", 70, 89, 76, "signal"]
  ] as const;
  return (
    <SvgShell title="Operator Decision Sequence" description="The assistant prepares the review packet; the accountable operator remains the approval boundary.">
      {actors.map(([name, x]) => (
        <g key={name}>
          <rect x={x - 8} y="10" width="16" height="8" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
          <text x={x} y="15.4" textAnchor="middle" className="sim-graph-label">{name}</text>
          <line x1={x} y1="20" x2={x} y2="88" stroke="rgba(255,255,255,0.16)" strokeDasharray="2 2" />
        </g>
      ))}
      {messages.map(([label, x1, x2, y, tone]) => (
        <g key={label}>
          <Arrow x1={x1} y1={y} x2={x2} y2={y} tone={tone} />
          <text x={(x1 + x2) / 2} y={y - 2.8} textAnchor="middle" className="sim-graph-detail">{label}</text>
        </g>
      ))}
      <rect x="8" y="86" width="84" height="8" rx="2" fill="rgba(243,201,105,0.1)" stroke="#f3c969" strokeWidth="0.55" />
      <text x="50" y="91.3" textAnchor="middle" className="sim-graph-detail">Approval, rejection, escalation, or request for more evidence</text>
    </SvgShell>
  );
}

export function ReferenceDiagramGallery() {
  return (
    <Card className="mt-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Visual reference</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">The architecture as reviewable diagrams.</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          These native SVG views mirror the shareable diagram pack and keep the doctrine inspectable for visitors who will not open raw Markdown.
        </p>
      </div>
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <ArchitectureFlow />
        <HypothesisStateMachine />
        <EvidenceGraph />
        <OperatorSequence />
      </div>
    </Card>
  );
}
