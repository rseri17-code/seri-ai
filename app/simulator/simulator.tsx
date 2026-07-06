"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GitBranch,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  UserCheck
} from "lucide-react";
import { operationalIntelligenceSystem } from "@/content/site";

const steps = [
  {
    label: "Evidence",
    title: "Build the evidence board",
    description: "Separate observable facts from interpretation before the system is allowed to name a cause.",
    icon: Radar,
    mode: "Signal intake"
  },
  {
    label: "Timeline",
    title: "Replay the transaction path",
    description: "Align changes, symptoms, topology, and customer impact into a shared operational sequence.",
    icon: Activity,
    mode: "Temporal reasoning"
  },
  {
    label: "Hypotheses",
    title: "Rank competing explanations",
    description: "Score each explanation against evidence instead of letting the loudest alert win.",
    icon: GitBranch,
    mode: "Confidence model"
  },
  {
    label: "RCA",
    title: "Gate the recommended action",
    description: "Create a reviewable conclusion with missing context, owner approval, and a reversible path.",
    icon: ClipboardCheck,
    mode: "Human review"
  },
  {
    label: "Eval",
    title: "Grade the investigation behavior",
    description: "Treat the assistant behavior as a product surface: groundedness, refusal, escalation, usefulness.",
    icon: ShieldCheck,
    mode: "Trust release"
  }
];

const evidence = [
  {
    id: "signal",
    type: "Signal",
    fact: "Transaction completion rate drops for a critical customer journey.",
    confidence: "High",
    used: true,
    weight: 92
  },
  {
    id: "change",
    type: "Change",
    fact: "A configuration update occurred shortly before the symptom window.",
    confidence: "Medium",
    used: true,
    weight: 74
  },
  {
    id: "topology",
    type: "Topology",
    fact: "The affected journey crosses three public-safe dependency groups.",
    confidence: "Medium",
    used: true,
    weight: 68
  },
  {
    id: "noise",
    type: "Noise",
    fact: "A separate warning appears in an unrelated dependency group.",
    confidence: "Low",
    used: false,
    weight: 18
  }
];

const timeline = [
  ["09:00", "Baseline", "Journey completion and latency are within expected range.", "Stable"],
  ["09:18", "Change", "A non-secret configuration update is recorded for a dependency group.", "Correlate"],
  ["09:24", "Symptom", "Completion rate declines and retries increase.", "Investigate"],
  ["09:31", "Impact", "Customer-facing workflow experiences intermittent failure.", "Prioritize"],
  ["09:43", "Mitigation", "Rollback candidate is identified for human approval.", "Review"]
];

const hypotheses = [
  {
    name: "Configuration regression in a dependency path",
    confidence: 82,
    rationale: "Best explains timing, affected transaction path, and recovery option.",
    signals: ["Change timing", "Journey impact", "Reversible mitigation"]
  },
  {
    name: "Capacity saturation",
    confidence: 46,
    rationale: "Some latency evidence exists, but it does not explain the change correlation.",
    signals: ["Retry increase", "Partial latency evidence", "Weak change fit"]
  },
  {
    name: "Unrelated warning cascade",
    confidence: 18,
    rationale: "Visible signal lacks transaction alignment and should be ignored for RCA.",
    signals: ["Low confidence", "No journey alignment", "Noise candidate"]
  }
];

const actions = [
  {
    name: "Recommend rollback review with owner approval",
    quality: "Best",
    rationale: "Matches the evidence while preserving human accountability for operational change."
  },
  {
    name: "Autonomously roll back the dependency",
    quality: "Risky",
    rationale: "Moves too fast for a high-impact operational change without owner confirmation."
  },
  {
    name: "Only monitor until more alerts appear",
    quality: "Weak",
    rationale: "Avoids action even though the evidence is strong enough for a focused review."
  }
];

const evalChecks = [
  ["Evidence coverage", "Pass", "Uses signals, topology, timeline, and change context."],
  ["Uncertainty", "Pass", "Names missing context and avoids absolute claims."],
  ["Confidentiality", "Pass", "Uses generic public-safe names only."],
  ["Human review", "Pass", "Requires approval before operational action."],
  ["Actionability", "Pass", "Suggests a focused rollback review and monitoring plan."]
];

const investigationLanes = ["Customer journey", "Change record", "Dependency path", "Human owner"];
const defaultEvidenceIds = evidence.filter((item) => item.used).map((item) => item.id);
const replayTrace = [
  ["Collect", "Accepted public-safe operational facts"],
  ["Correlate", "Mapped facts to the transaction path"],
  ["Compare", "Scored competing explanations"],
  ["Gate", "Kept irreversible action behind human review"]
];
const evidenceImpact: Record<string, string> = {
  signal: "Raises incident priority because customer journey impact is visible.",
  change: "Raises regression confidence because the symptom window follows a recorded change.",
  topology: "Improves blast-radius reasoning by tying symptoms to a dependency path.",
  noise: "Reduces confidence in the primary RCA when unrelated alerts are treated as evidence."
};
const replayNodes = [
  { id: "journey", label: "Customer journey", detail: "completion drop", x: 12, y: 48, evidence: "signal" },
  { id: "change", label: "Change record", detail: "09:18 update", x: 35, y: 20, evidence: "change" },
  { id: "path", label: "Dependency path", detail: "3 groups", x: 55, y: 58, evidence: "topology" },
  { id: "hypothesis", label: "RCA hypothesis", detail: "regression", x: 76, y: 30, evidence: "change" },
  { id: "review", label: "Human review", detail: "approval gate", x: 88, y: 70, evidence: "topology" },
  { id: "noise", label: "Noise", detail: "unrelated alert", x: 36, y: 78, evidence: "noise" }
];
const replayEdges = [
  ["journey", "path", "signal"],
  ["change", "path", "change"],
  ["path", "hypothesis", "topology"],
  ["hypothesis", "review", "change"],
  ["noise", "hypothesis", "noise"]
];

function adjustedConfidence(name: string, activeEvidenceIds: string[]) {
  const activeSet = new Set(activeEvidenceIds);

  if (name === hypotheses[0].name) {
    return Math.min(
      94,
      20 + (activeSet.has("signal") ? 26 : 0) + (activeSet.has("change") ? 24 : 0) + (activeSet.has("topology") ? 22 : 0) - (activeSet.has("noise") ? 10 : 0)
    );
  }

  if (name === hypotheses[1].name) {
    return Math.min(76, 26 + (activeSet.has("signal") ? 12 : 0) + (activeSet.has("topology") ? 8 : 0) + (activeSet.has("noise") ? 12 : 0));
  }

  return Math.min(52, 12 + (activeSet.has("noise") ? 24 : 0) + (activeSet.has("signal") ? 4 : 0));
}

export function IncidentSimulator() {
  const [active, setActive] = useState(0);
  const [activeEvidenceIds, setActiveEvidenceIds] = useState<string[]>(defaultEvidenceIds);
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(hypotheses[0].name);
  const [selectedAction, setSelectedAction] = useState<string | null>(actions[0].name);
  const score = useMemo(() => {
    const progress = ((active + 1) / steps.length) * 45;
    const hypothesisConfidence = selectedHypothesis == null ? 0 : adjustedConfidence(selectedHypothesis, activeEvidenceIds);
    const hypothesisScore = selectedHypothesis == null ? 0 : Math.round(hypothesisConfidence * 0.36);
    const actionScore = selectedAction == null ? 0 : selectedAction === actions[0].name ? 25 : selectedAction === actions[1].name ? 8 : 12;
    const evidenceScore = Math.max(0, activeEvidenceIds.filter((id) => id !== "noise").length * 4 - (activeEvidenceIds.includes("noise") ? 6 : 0));
    return Math.min(100, Math.round(progress + hypothesisScore + actionScore + evidenceScore));
  }, [active, activeEvidenceIds, selectedAction, selectedHypothesis]);
  const selectedHypothesisDetail = hypotheses.find((item) => item.name === selectedHypothesis);
  const selectedActionDetail = actions.find((item) => item.name === selectedAction);
  const selectedHypothesisConfidence = selectedHypothesis == null ? 0 : adjustedConfidence(selectedHypothesis, activeEvidenceIds);
  const activeEvidenceTypes = activeEvidenceIds
    .map((id) => evidence.find((item) => item.id === id)?.type)
    .filter(Boolean)
    .join(" / ");
  const CurrentIcon = steps[active].icon;
  const report = [
    "ReasonOps Investigation Room Report",
    `Case: ${operationalIntelligenceSystem.caseId} - ${operationalIntelligenceSystem.caseTitle}`,
    `Mode: ${steps[active].mode}`,
    `Hypothesis: ${selectedHypothesisDetail?.name ?? "Not selected"}`,
    `Hypothesis confidence: ${selectedHypothesisDetail ? `${selectedHypothesisConfidence}%` : "Not scored"}`,
    `Evidence included: ${activeEvidenceIds.length ? activeEvidenceIds.join(", ") : "None"}`,
    `Action: ${selectedActionDetail?.name ?? "Not selected"}`,
    `Action quality: ${selectedActionDetail?.quality ?? "Not scored"}`,
    `Readiness score: ${score}%`,
    "Operating model: evidence before conclusions, timeline before RCA, evaluation before trust, human review before irreversible action."
  ].join("\n");

  return (
    <div className="reasonops-room overflow-hidden rounded-lg border border-white/10 bg-[#080b12] shadow-2xl shadow-black/50">
      <div className="relative border-b border-white/10 p-5 md:p-6">
        <div className="absolute inset-0 intelligence-field opacity-50" />
        <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_22rem] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold uppercase text-mint">
              <Sparkles size={14} />
              ReasonOps Investigation Room
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">Turn operational noise into a reviewable decision.</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              A public-safe incident room that demonstrates Ravikanth&apos;s operating model: evidence intake, transaction replay,
              hypothesis ranking, human review, and eval-gated trust.
            </p>
            <MiniReplayGraph activeEvidenceIds={activeEvidenceIds} />
            <div className="mt-5 grid grid-cols-3 gap-2 md:gap-3">
              <ReplaySignalCard
                label="Evidence replay"
                value={`${activeEvidenceIds.length} active`}
                detail={activeEvidenceTypes || "No evidence selected"}
                tone="mint"
              />
              <ReplaySignalCard
                label="Confidence moves"
                value={`${selectedHypothesisConfidence}%`}
                detail={selectedHypothesisDetail?.name ?? "Hypothesis pending"}
                tone="signal"
              />
              <ReplaySignalCard
                label="Action gate"
                value={selectedActionDetail?.quality ?? "Pending"}
                detail="Human approval before irreversible change"
                tone="amber"
              />
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4 backdrop-blur md:p-5">
            <div className="mb-5 rounded-lg border border-signal/25 bg-signal/[0.07] p-4">
              <p className="font-mono text-xs text-signal">{operationalIntelligenceSystem.caseId}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{operationalIntelligenceSystem.caseTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{operationalIntelligenceSystem.caseSummary}</p>
              <Link
                href={`/ask?prompt=${encodeURIComponent("Explain the OI-ROOM-001 Investigation Room case and the public-safe decision packet.")}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-mint"
              >
                Ask about this case <ArrowRight size={15} />
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Investigation readiness</p>
              <p className="font-mono text-sm text-mint">public-safe</p>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-5xl font-semibold text-white md:text-6xl">{score}</p>
              <p className="pb-2 text-2xl text-slate-400">%</p>
            </div>
            <div className="mt-5 h-2 rounded-full bg-white/10">
              <motion.div
                className="h-2 rounded-full bg-mint shadow-[0_0_24px_rgba(95,242,181,0.45)]"
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.45 }}
              />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">Score increases when the system proves evidence, confidence, and human review discipline.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 border-b border-white/10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const selected = index === active;
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => setActive(index)}
              aria-label={step.label}
              className={`group border-b border-white/10 p-3 text-left transition sm:border-b-0 sm:border-r md:p-4 ${
                selected ? "bg-mint/10 text-white" : "bg-white/[0.02] text-slate-300 hover:bg-white/[0.05]"
              }`}
              aria-pressed={selected}
            >
              <div className="flex items-center justify-between gap-3">
                <Icon className={selected ? "text-mint" : "text-slate-500 group-hover:text-slate-300"} size={20} />
                <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
              </div>
              <span className="mt-3 block text-xs font-semibold md:text-base">{step.label}</span>
              <span className="mt-1 hidden text-xs text-slate-500 sm:block">{step.mode}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[18rem_1fr_20rem]">
        <aside className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase text-slate-500">Investigation lanes</p>
          <div className="mt-4 space-y-3">
            {investigationLanes.map((lane, index) => (
              <div key={lane} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${index === active % investigationLanes.length ? "bg-mint" : "bg-slate-600"}`} />
                  <span className="text-sm font-medium text-slate-200">{lane}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-amber/20 bg-amber/10 p-4 text-amber">
            <div className="flex items-center gap-2">
              <AlertTriangle size={17} />
              <p className="text-sm font-semibold">Boundary</p>
            </div>
            <p className="mt-2 text-sm leading-6">No internal logs, proprietary names, screenshots, or confidential architecture.</p>
          </div>
        </aside>

        <main className="min-h-[34rem] p-5 md:p-6">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="h-full"
          >
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-lg border border-mint/30 bg-mint/10 text-mint">
                    <CurrentIcon size={21} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase text-mint">Step {active + 1} of {steps.length}</p>
                    <h3 className="text-2xl font-semibold text-white">{steps[active].title}</h3>
                  </div>
                </div>
                <p className="mt-3 max-w-3xl leading-7 text-slate-300">{steps[active].description}</p>
              </div>
            </div>

            <VisualReplayLayer
              active={active}
              activeEvidenceIds={activeEvidenceIds}
              selectedHypothesis={selectedHypothesis}
              selectedAction={selectedAction}
            />

            {active === 0 && (
              <EvidenceBoard activeEvidenceIds={activeEvidenceIds} onToggleEvidence={setActiveEvidenceIds} />
            )}
            {active === 1 && <TimelineReplay />}
            {active === 2 && (
              <HypothesisBoard activeEvidenceIds={activeEvidenceIds} selectedHypothesis={selectedHypothesis} onSelect={setSelectedHypothesis} />
            )}
            {active === 3 && (
              <ActionGate selectedHypothesisDetail={selectedHypothesisDetail} selectedAction={selectedAction} onSelect={setSelectedAction} />
            )}
            {active === 4 && <EvalBoard report={report} />}
          </motion.div>
        </main>

        <aside className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
          <p className="text-xs font-semibold uppercase text-slate-500">Decision packet</p>
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <BrainCircuit className="text-mint" />
            <p className="mt-3 font-semibold text-white">{selectedHypothesisDetail?.name ?? "Hypothesis pending"}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{selectedHypothesisDetail?.rationale ?? "Select a hypothesis to build the review packet."}</p>
            <p className="mt-3 font-mono text-sm text-mint">{selectedHypothesisConfidence}% confidence from active evidence</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">Active evidence: {activeEvidenceTypes || "None"}</p>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <UserCheck className="text-signal" />
            <p className="mt-3 font-semibold text-white">{selectedActionDetail?.quality ?? "Action pending"}</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">{selectedActionDetail?.name ?? "Choose the action that preserves human accountability."}</p>
          </div>
          <div className="mt-4 rounded-lg border border-mint/20 bg-mint/[0.06] p-4">
            <p className="text-sm font-semibold text-mint">Operating law</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">Evidence before conclusions. Timeline before RCA. Evaluation before trust.</p>
          </div>
          <div className="mt-4 rounded-lg border border-signal/20 bg-signal/[0.06] p-4">
            <p className="text-sm font-semibold text-signal">Decision packet standard</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{operationalIntelligenceSystem.decisionPacket.evalStandard}</p>
            <Link
              href={`/map`}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-mint"
            >
              Trace this in the Map <ArrowRight size={15} />
            </Link>
          </div>
        </aside>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 p-5">
        <button
          type="button"
          onClick={() => setActive((value) => Math.max(0, value - 1))}
          className="rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
          disabled={active === 0}
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setActive((value) => Math.min(steps.length - 1, value + 1))}
          className="inline-flex items-center gap-2 rounded bg-mint px-4 py-2 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
          disabled={active === steps.length - 1}
        >
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function VisualReplayLayer({
  active,
  activeEvidenceIds,
  selectedHypothesis,
  selectedAction
}: {
  active: number;
  activeEvidenceIds: string[];
  selectedHypothesis: string | null;
  selectedAction: string | null;
}) {
  const activeSet = new Set(activeEvidenceIds);
  const selectedConfidence = selectedHypothesis == null ? 0 : adjustedConfidence(selectedHypothesis, activeEvidenceIds);
  const pathProgress = Math.max(18, Math.min(100, (active + 1) * 20));
  const selectedActionQuality = actions.find((action) => action.name === selectedAction)?.quality ?? "Pending";
  const primaryBaseline = adjustedConfidence(hypotheses[0].name, defaultEvidenceIds);
  const primaryNow = adjustedConfidence(hypotheses[0].name, activeEvidenceIds);
  const delta = primaryNow - primaryBaseline;
  const nodeById = new Map(replayNodes.map((node) => [node.id, node]));

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-white/10 bg-black/20">
      <div className="flex flex-col gap-2 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-slate-500">Evidence replay workbench</p>
          <h4 className="mt-1 text-xl font-semibold text-white">Every conclusion has a visible evidence path.</h4>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded border border-mint/25 bg-mint/10 px-2 py-1 text-mint">{activeEvidenceIds.length} evidence items active</span>
          <span className="rounded border border-signal/25 bg-signal/10 px-2 py-1 text-signal">{selectedConfidence}% hypothesis confidence</span>
          <span className="rounded border border-amber/25 bg-amber/10 px-2 py-1 text-amber">{selectedActionQuality} action gate</span>
        </div>
      </div>

      <div className="grid gap-4 p-4 2xl:grid-cols-[0.95fr_1.15fr_0.9fr]">
        <div className="order-2 rounded-lg border border-white/10 bg-white/[0.03] p-4 2xl:order-1">
          <p className="text-xs font-semibold uppercase text-slate-500">Evidence ledger</p>
          <div className="mt-4 space-y-3">
            {evidence.map((item) => {
              const enabled = activeSet.has(item.id);
              return (
                <div key={item.id} className={`rounded-lg border p-3 ${enabled ? "border-mint/30 bg-mint/[0.07]" : "border-white/10 bg-white/[0.03] opacity-60"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{item.type}</p>
                    <p className={enabled ? "font-mono text-xs text-mint" : "font-mono text-xs text-slate-500"}>{enabled ? "active" : "off"}</p>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{evidenceImpact[item.id]}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-1 relative overflow-hidden rounded-lg border border-white/10 bg-[#071018] p-4 2xl:order-2">
          <div className="absolute inset-0 intelligence-field opacity-30" />
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Dynamic visual graph</p>
                <p className="mt-1 text-lg font-semibold text-white">Evidence-to-RCA transaction map</p>
              </div>
              <p className="font-mono text-sm text-signal">{pathProgress}% replayed</p>
            </div>

            <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-black/25">
              <svg className="min-h-[23rem] w-full" viewBox="0 0 100 100" role="img" aria-label="Dynamic visual graph showing evidence flowing through transaction path, hypothesis, and human review">
                <defs>
                  <linearGradient id="replay-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5ff2b5" />
                    <stop offset="55%" stopColor="#73a7ff" />
                    <stop offset="100%" stopColor="#f3c969" />
                  </linearGradient>
                  <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="2.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect x="0" y="0" width="100" height="100" fill="rgba(7,16,24,0.74)" />
                <g opacity="0.28">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <line key={`v-${index}`} x1={12 + index * 11} x2={12 + index * 11} y1="8" y2="92" stroke="rgba(255,255,255,0.14)" strokeWidth="0.25" />
                  ))}
                  {Array.from({ length: 7 }).map((_, index) => (
                    <line key={`h-${index}`} x1="6" x2="94" y1={14 + index * 12} y2={14 + index * 12} stroke="rgba(255,255,255,0.14)" strokeWidth="0.25" />
                  ))}
                </g>
                {replayEdges.map(([from, to, evidenceId], index) => {
                  const fromNode = nodeById.get(from);
                  const toNode = nodeById.get(to);
                  const activeEdge = activeSet.has(evidenceId);
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
                      stroke={activeEdge ? "url(#replay-edge)" : "rgba(148,163,184,0.28)"}
                      strokeDasharray={activeEdge ? "3 3" : "1 4"}
                      strokeLinecap="round"
                      strokeWidth={activeEdge ? 1.15 : 0.55}
                      initial={{ pathLength: 0, opacity: 0.35 }}
                      animate={{ pathLength: activeEdge ? Math.min(1, (active + 1 + index) / 6) : 0.55, opacity: activeEdge ? 1 : 0.35 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  );
                })}
                {replayNodes.map((node, index) => {
                  const enabled = activeSet.has(node.evidence);
                  const focus = index <= active + 1 || node.id === "review";
                  return (
                    <g key={node.id} className={enabled ? "sim-graph-node-active" : "sim-graph-node-muted"} filter={enabled ? "url(#node-glow)" : undefined}>
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={enabled ? 4.7 : 3.7}
                        fill={enabled ? (node.id === "review" ? "#f3c969" : "#5ff2b5") : "#334155"}
                        stroke={focus ? "#ffffff" : "rgba(255,255,255,0.35)"}
                        strokeWidth={focus ? 0.65 : 0.35}
                        animate={{ scale: enabled && focus ? [1, 1.08, 1] : 1 }}
                        transition={{ duration: 1.8, repeat: enabled && focus ? Infinity : 0 }}
                      />
                      <text x={node.x} y={node.y + 8.5} textAnchor="middle" className="sim-graph-label">
                        {node.label}
                      </text>
                      <text x={node.x} y={node.y + 13.2} textAnchor="middle" className="sim-graph-detail">
                        {node.detail}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {timeline.slice(1).map(([time, label], index) => {
                const unlocked = index <= active;
                return (
                  <div key={`${time}-${label}`} className={`min-h-28 rounded-lg border p-3 ${unlocked ? "border-signal/35 bg-signal/[0.08]" : "border-white/10 bg-white/[0.03] opacity-55"}`}>
                    <p className="font-mono text-xs text-signal">{time}</p>
                    <p className="mt-3 font-semibold text-white">{label}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{unlocked ? "included in replay" : "waiting for step"}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4">
              <div className="flex items-center gap-3">
                <Network className="text-signal" />
                <div className="h-2 flex-1 rounded-full bg-white/10">
                  <motion.div className="h-2 rounded-full bg-signal" animate={{ width: `${pathProgress}%` }} transition={{ duration: 0.45 }} />
                </div>
                <BrainCircuit className="text-mint" />
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                ReasonOps treats the transaction path as the unit of explanation, then shows why confidence moved before an RCA is trusted.
              </p>
            </div>
          </div>
        </div>

        <div className="order-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Confidence ledger</p>
            <span className={delta >= 0 ? "font-mono text-xs text-mint" : "font-mono text-xs text-amber"}>
              {delta >= 0 ? "+" : ""}{delta} vs baseline
            </span>
          </div>
          <div className="mt-4 space-y-4">
            {hypotheses.map((hypothesis) => {
              const confidence = adjustedConfidence(hypothesis.name, activeEvidenceIds);
              const selected = hypothesis.name === selectedHypothesis;
              return (
                <div key={hypothesis.name}>
                  <div className="flex items-start justify-between gap-3">
                    <p className={selected ? "text-sm font-semibold text-white" : "text-sm text-slate-300"}>{hypothesis.name}</p>
                    <p className="font-mono text-sm text-mint">{confidence}%</p>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/10">
                    <motion.div
                      className={`h-2 rounded-full ${selected ? "bg-mint" : "bg-signal"}`}
                      animate={{ width: `${confidence}%` }}
                      transition={{ duration: 0.45 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Decision trace</p>
            <div className="mt-3 space-y-2">
              {replayTrace.map(([label, detail], index) => {
                const complete = index <= active;
                return (
                  <div key={label} className="flex gap-3">
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full ${complete ? "bg-mint" : "bg-slate-600"}`} />
                    <p className="text-xs leading-5 text-slate-400"><span className="font-semibold text-slate-200">{label}:</span> {detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplaySignalCard({
  label,
  value,
  detail,
  tone
}: {
  label: string;
  value: string;
  detail: string;
  tone: "mint" | "signal" | "amber";
}) {
  const toneClass = {
    mint: "border-mint/25 bg-mint/[0.08] text-mint",
    signal: "border-signal/25 bg-signal/[0.08] text-signal",
    amber: "border-amber/25 bg-amber/[0.08] text-amber"
  }[tone];

  return (
    <div className={`rounded-lg border p-2 md:min-h-28 md:p-3 ${toneClass}`}>
      <p className="text-xs font-semibold uppercase opacity-80">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white md:mt-2 md:text-2xl">{value}</p>
      <p className="mt-1 hidden text-xs leading-5 text-slate-400 md:mt-2 sm:block">{detail}</p>
    </div>
  );
}

function MiniReplayGraph({ activeEvidenceIds }: { activeEvidenceIds: string[] }) {
  const activeSet = new Set(activeEvidenceIds);
  const miniNodes = [
    { id: "journey", label: "Journey", x: 12, y: 55, evidence: "signal" },
    { id: "change", label: "Change", x: 32, y: 27, evidence: "change" },
    { id: "path", label: "Path", x: 52, y: 55, evidence: "topology" },
    { id: "rca", label: "RCA", x: 74, y: 34, evidence: "change" },
    { id: "review", label: "Review", x: 88, y: 68, evidence: "topology" },
    { id: "noise", label: "Noise", x: 32, y: 78, evidence: "noise" }
  ];
  const miniEdges = [
    ["journey", "path", "signal"],
    ["change", "path", "change"],
    ["path", "rca", "topology"],
    ["rca", "review", "change"],
    ["noise", "rca", "noise"]
  ];
  const nodeMap = new Map(miniNodes.map((node) => [node.id, node]));

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-black/25">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <p className="text-xs font-semibold uppercase text-slate-500">Live visual graph</p>
        <p className="font-mono text-xs text-mint">{activeEvidenceIds.length} evidence paths</p>
      </div>
      <svg className="h-40 w-full" viewBox="0 0 100 100" role="img" aria-label="Live visual graph preview of evidence, transaction path, RCA, and review gate">
        <defs>
          <linearGradient id="mini-replay-edge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5ff2b5" />
            <stop offset="55%" stopColor="#73a7ff" />
            <stop offset="100%" stopColor="#f3c969" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="rgba(7,16,24,0.82)" />
        {miniEdges.map(([from, to, evidenceId]) => {
          const fromNode = nodeMap.get(from);
          const toNode = nodeMap.get(to);
          const enabled = activeSet.has(evidenceId);
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
              stroke={enabled ? "url(#mini-replay-edge)" : "rgba(148,163,184,0.25)"}
              strokeDasharray={enabled ? "4 3" : "1 5"}
              strokeLinecap="round"
              strokeWidth={enabled ? 1.5 : 0.8}
              animate={{ opacity: enabled ? [0.65, 1, 0.65] : 0.32 }}
              transition={{ duration: 1.8, repeat: enabled ? Infinity : 0 }}
            />
          );
        })}
        {miniNodes.map((node) => {
          const enabled = activeSet.has(node.evidence);
          return (
            <g key={node.id} className={enabled ? "sim-graph-node-active" : "sim-graph-node-muted"}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={enabled ? 5.4 : 4.4}
                fill={enabled ? (node.id === "review" ? "#f3c969" : "#5ff2b5") : "#334155"}
                stroke="rgba(255,255,255,0.75)"
                strokeWidth="0.6"
                animate={{ scale: enabled ? [1, 1.12, 1] : 1 }}
                transition={{ duration: 1.6, repeat: enabled ? Infinity : 0 }}
              />
              <text x={node.x} y={node.y + 10} textAnchor="middle" className="sim-graph-label">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function EvidenceBoard({
  activeEvidenceIds,
  onToggleEvidence
}: {
  activeEvidenceIds: string[];
  onToggleEvidence: (value: string[]) => void;
}) {
  const activeSet = new Set(activeEvidenceIds);
  function toggleEvidence(id: string) {
    if (activeSet.has(id)) {
      onToggleEvidence(activeEvidenceIds.filter((item) => item !== id));
      return;
    }
    onToggleEvidence([...activeEvidenceIds, id]);
  }

  return (
    <div>
      <PanelIntro
        eyebrow="Evidence board"
        title="Facts are toggled before conclusions are trusted."
        description="Toggle evidence to test whether the explanation survives missing, weak, or noisy signals. The replay workbench and confidence ledger should move immediately."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {evidence.map((item, index) => (
          <motion.button
            key={item.fact}
            type="button"
            onClick={() => toggleEvidence(item.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-lg border p-4 text-left transition ${
              activeSet.has(item.id)
                ? item.used
                  ? "border-mint/35 bg-mint/[0.08]"
                  : "border-amber/35 bg-amber/[0.08]"
                : "border-white/10 bg-white/[0.03] opacity-65 hover:opacity-100"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-signal">{item.type}</span>
              <span className={activeSet.has(item.id) ? "text-mint" : "text-slate-500"}>{activeSet.has(item.id) ? "Included" : "Excluded"}</span>
            </div>
            <p className="mt-4 min-h-16 text-slate-100">{item.fact}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-white/10">
                <div className={`h-2 rounded-full ${item.used ? "bg-mint" : "bg-amber"}`} style={{ width: `${item.weight}%` }} />
              </div>
              <span className="font-mono text-xs text-slate-400">{item.confidence}</span>
            </div>
            <p className="mt-3 text-xs text-slate-500">Click to {activeSet.has(item.id) ? "remove from" : "add to"} replay.</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function TimelineReplay() {
  return (
    <div>
      <PanelIntro
        eyebrow="Timeline reconstruction"
        title="The transaction path becomes the unit of explanation."
        description="Replay aligns baseline, change, symptom, impact, and mitigation so the RCA is attached to a temporal chain instead of a pile of alerts."
      />
      <div className="relative space-y-3">
        <div className="absolute bottom-8 left-5 top-8 w-px bg-gradient-to-b from-mint via-signal to-amber" />
        {timeline.map(([time, label, detail, state], index) => (
          <motion.div
            key={`${time}-${label}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="relative grid gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 pl-12 md:grid-cols-[6rem_8rem_1fr_7rem]"
          >
            <span className="absolute left-[1.05rem] top-6 h-4 w-4 rounded-full border border-mint bg-ink shadow-[0_0_18px_rgba(95,242,181,0.5)]" />
            <span className="font-mono text-sm text-mint">{time}</span>
            <span className="font-semibold text-white">{label}</span>
            <span className="text-slate-300">{detail}</span>
            <span className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-center text-xs text-slate-300">{state}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function HypothesisBoard({
  activeEvidenceIds,
  selectedHypothesis,
  onSelect
}: {
  activeEvidenceIds: string[];
  selectedHypothesis: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <PanelIntro
        eyebrow="Hypothesis stack"
        title="Competing explanations are scored against active evidence."
        description="Confidence is not decorative. Remove signal evidence and the leading explanation loses strength; include noise and weak explanations become easier to spot."
      />
      {hypotheses.map((item) => {
        const selected = selectedHypothesis === item.name;
        const confidence = adjustedConfidence(item.name, activeEvidenceIds);
        return (
          <button
            key={item.name}
            type="button"
            onClick={() => onSelect(item.name)}
            className={`w-full rounded-lg border p-4 text-left transition ${selected ? "border-signal/50 bg-signal/[0.08]" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span className="font-semibold text-white">{item.name}</span>
              <span className="font-mono text-mint">{confidence}%</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-signal" style={{ width: `${confidence}%` }} />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.rationale}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.signals.map((signal) => (
                <span key={signal} className="rounded border border-white/10 bg-black/20 px-2 py-1 text-xs text-slate-300">{signal}</span>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ActionGate({
  selectedHypothesisDetail,
  selectedAction,
  onSelect
}: {
  selectedHypothesisDetail: (typeof hypotheses)[number] | undefined;
  selectedAction: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <PanelIntro
        eyebrow="Root cause narrative"
        title="The system recommends review, not blind automation."
        description="A useful operational agent should explain the conclusion, name missing context, and keep high-impact changes behind accountable human approval."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-lg border border-mint/30 bg-mint/10 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-mint" />
            <h3 className="text-xl font-semibold text-white">Reviewable RCA draft</h3>
          </div>
          <p className="mt-4 leading-8 text-slate-200">
            The selected explanation is <span className="font-semibold text-white">{selectedHypothesisDetail?.name ?? "still pending"}</span>.
            A strong RCA connects timing, impact scope, topology alignment, and a reversible mitigation path.
          </p>
          <div className="mt-5 flex items-start gap-3 rounded border border-amber/30 bg-amber/10 p-4 text-amber">
            <AlertTriangle size={20} />
            <p className="text-sm leading-6">Missing context: direct owner confirmation and post-mitigation validation. Human approval required before change.</p>
          </div>
        </div>
        <div className="space-y-3">
          {actions.map((action) => (
            <button
              key={action.name}
              type="button"
              onClick={() => onSelect(action.name)}
              className={`w-full rounded-lg border p-4 text-left transition ${selectedAction === action.name ? "border-signal bg-signal/10" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-white">{action.name}</span>
                <span className={action.quality === "Best" ? "text-mint" : "text-amber"}>{action.quality}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{action.rationale}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EvalBoard({ report }: { report: string }) {
  return (
    <div>
      <PanelIntro
        eyebrow="AI evaluation"
        title="The investigation is graded before the answer is trusted."
        description="Evidence grounded answer quality, confidentiality, uncertainty, human review, and actionability are treated as release criteria."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3">
          {evalChecks.map(([name, status, detail]) => (
            <div key={name} className="grid gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[12rem_5rem_1fr]">
              <span className="font-semibold text-white">{name}</span>
              <span className="text-mint">{status}</span>
              <span className="text-slate-300">{detail}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-5">
          <div className="flex items-center gap-3">
            <FileText className="text-signal" />
            <h3 className="text-xl font-semibold text-white">Exportable RCA summary</h3>
          </div>
          <pre className="mt-4 whitespace-pre-wrap rounded border border-white/10 bg-black/30 p-4 text-sm leading-6 text-slate-200">{report}</pre>
        </div>
      </div>
    </div>
  );
}

function PanelIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-4 rounded-lg border border-white/10 bg-white/[0.025] p-4">
      <p className="text-xs font-semibold uppercase text-slate-500">{eyebrow}</p>
      <h4 className="mt-1 text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
