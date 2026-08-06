"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  FileText,
  GitBranch,
  Network,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
  UserCheck
} from "lucide-react";
import { operationalIntelligenceSystem, sentinelContextModel } from "@/content/site";
import { captureSafeEvent } from "@/lib/analytics-events";

const steps = [
  {
    label: "Evidence",
    title: "Build the evidence board",
    description: "Separate observable facts from interpretation before the system is allowed to name a cause.",
    icon: Radar,
    mode: "Signal intake",
    frameworkLayers: ["Signal Layer", "Transaction Layer", "Topology Layer", "Evidence Layer"]
  },
  {
    label: "Replay",
    title: "Replay the transaction path",
    description: "Align changes, symptoms, topology, and customer impact into a shared operational sequence.",
    icon: Activity,
    mode: "Temporal reasoning",
    frameworkLayers: ["Transaction Layer", "Topology Layer", "Memory Layer"]
  },
  {
    label: "Hypotheses",
    title: "Rank competing explanations",
    description: "Score each explanation against evidence instead of letting the loudest alert win.",
    icon: GitBranch,
    mode: "Confidence model",
    frameworkLayers: ["Evidence Layer", "Reasoning Layer"]
  },
  {
    label: "Action Gate",
    title: "Gate the recommended action",
    description: "Create a reviewable conclusion with missing context, owner approval, and a reversible path.",
    icon: ClipboardCheck,
    mode: "Human review",
    frameworkLayers: ["Decision Layer", "Operator Layer"]
  },
  {
    label: "Release Gate",
    title: "Grade the investigation behavior",
    description: "Treat the assistant behavior as a product surface: groundedness, refusal, escalation, usefulness.",
    icon: ShieldCheck,
    mode: "Trust release",
    frameworkLayers: ["Evaluation Layer", "Learning Layer"]
  }
];

const stepContracts = [
  {
    question: "Which receipts are facts, and which are interpretations?",
    output: "Typed evidence board with observation, contradiction, and missing-evidence labels.",
    confidence: "No hypothesis confidence moves until evidence is classified.",
    failure: "A fluent RCA appears before facts and gaps are separated."
  },
  {
    question: "What changed along the transaction path, and when?",
    output: "Replayable sequence connecting symptom, change, dependency, and impact.",
    confidence: "Confidence can move only when timing and topology agree.",
    failure: "Sequence is treated as causality without contradiction checks."
  },
  {
    question: "Which explanation survives competing evidence?",
    output: "Ranked hypotheses with support, contradiction, and explicit uncertainty.",
    confidence: "Confidence must fall when active evidence weakens the branch.",
    failure: "The loudest alert wins without preserving alternate hypotheses."
  },
  {
    question: "What action is reviewable, reversible, and owner-approved?",
    output: "Decision packet with approval class, owner, action boundary, and unknowns.",
    confidence: "Readiness rises only when human review and reversibility are explicit.",
    failure: "The system recommends operational change without accountable approval."
  },
  {
    question: "Would this investigation behavior be safe to reuse?",
    output: "Evaluation record for groundedness, refusal, confidentiality, and learning.",
    confidence: "Release requires passing evidence, safety, and usefulness gates.",
    failure: "The assistant learns from an unreviewed or non-public incident narrative."
  }
] as const;

const scenarios = [
  {
    id: "transaction-degradation",
    caseId: "OI-ROOM-001",
    title: "Customer transaction degradation",
    summary:
      "A critical customer journey degrades after a public-safe configuration change. The harness must connect signal, transaction, topology, evidence, memory, evaluation, and human review before recommending action.",
    trigger: "Completion drop after change window",
    impact: "Customer-facing workflow interruption",
    operatorGoal: "Protect customers while keeping operational change behind approval.",
    learningTarget: "Configuration-regression replay fixture"
  },
  {
    id: "ai-answer-drift",
    caseId: "OI-ROOM-002",
    title: "AI answer drift under missing context",
    summary:
      "An operational assistant begins giving overconfident answers when approved context is incomplete. The harness must separate grounded evidence from unknowns and prove refusal behavior.",
    trigger: "Confidence rises while evidence coverage falls",
    impact: "Operator trust and escalation quality risk",
    operatorGoal: "Force uncertainty, citation discipline, and escalation instead of confident guessing.",
    learningTarget: "Grounding and refusal eval fixture"
  },
  {
    id: "batch-latency-regression",
    caseId: "OI-ROOM-003",
    title: "Batch workflow latency regression",
    summary:
      "A cross-system batch workflow misses its expected completion window. The harness must reconstruct the transaction path, isolate weak evidence, and produce a bounded review packet.",
    trigger: "SLA pressure without a single obvious red alert",
    impact: "Downstream operational readiness risk",
    operatorGoal: "Find the smallest reviewable mitigation without inventing private system details.",
    learningTarget: "Transaction-path latency replay fixture"
  }
];

const evidence = [
  {
    id: "signal",
    type: "Signal",
    fact: "Transaction completion rate drops for a critical customer journey.",
    confidence: "High",
    used: true,
    weight: 92,
    sourceType: "synthetic transaction monitor",
    timestamp: "09:24",
    scope: "customer journey",
    provenance: "public-safe scenario fixture",
    reliability: "high: repeated across retry and completion signals",
    relatedEntity: "checkout transaction",
    relatedHypothesis: "configuration regression",
    stance: "supports",
    classification: "Observation"
  },
  {
    id: "change",
    type: "Change",
    fact: "A configuration update occurred shortly before the symptom window.",
    confidence: "Medium",
    used: true,
    weight: 74,
    sourceType: "synthetic change record",
    timestamp: "09:18",
    scope: "dependency group",
    provenance: "approved public-safe change metadata",
    reliability: "medium: temporal fit requires more evidence",
    relatedEntity: "routing configuration",
    relatedHypothesis: "configuration regression",
    stance: "supports",
    classification: "Observation"
  },
  {
    id: "topology",
    type: "Topology",
    fact: "The affected journey crosses three public-safe dependency groups.",
    confidence: "Medium",
    used: true,
    weight: 68,
    sourceType: "synthetic topology map",
    timestamp: "09:27",
    scope: "gateway, service, data path",
    provenance: "public-safe dependency model",
    reliability: "medium: dependency freshness is assumed",
    relatedEntity: "dependency path",
    relatedHypothesis: "configuration regression",
    stance: "supports",
    classification: "Inference"
  },
  {
    id: "noise",
    type: "Noise",
    fact: "A separate warning appears in an unrelated dependency group.",
    confidence: "Low",
    used: false,
    weight: 18,
    sourceType: "synthetic alert stream",
    timestamp: "09:29",
    scope: "unrelated dependency group",
    provenance: "public-safe alert fixture",
    reliability: "low: no transaction alignment",
    relatedEntity: "background warning",
    relatedHypothesis: "unrelated warning cascade",
    stance: "weakens",
    classification: "Observation"
  },
  {
    id: "contradiction",
    type: "Contradiction",
    fact: "Synthetic capacity headroom remains stable while the customer journey degrades.",
    confidence: "Medium",
    used: false,
    weight: 42,
    sourceType: "synthetic capacity sample",
    timestamp: "09:28",
    scope: "dependency group",
    provenance: "public-safe contradiction fixture",
    reliability: "medium: contradicts capacity saturation but does not prove configuration cause",
    relatedEntity: "capacity envelope",
    relatedHypothesis: "capacity saturation",
    stance: "contradicts",
    classification: "Confirmed fact"
  }
];

const timeline = [
  ["09:00", "Baseline", "Journey completion and latency are within expected range.", "Stable", "P50 142ms / P95 311ms"],
  ["09:18", "Change", "A non-secret configuration update is recorded for a dependency group.", "Correlate", "Gateway 46ms, service 83ms, data 114ms"],
  ["09:24", "Symptom", "Completion rate declines and retries increase.", "Investigate", "Gateway 91ms, service 214ms, data 387ms"],
  ["09:31", "Impact", "Customer-facing workflow experiences intermittent failure.", "Prioritize", "End-to-end 1.8s, retry hop +620ms"],
  ["09:43", "Mitigation", "Rollback candidate is identified for human approval.", "Review", "Expected recovery path under 5 minutes"]
];

const missingEvidence = [
  "Direct owner confirmation for the rollback candidate is not present in the synthetic case.",
  "Post-mitigation validation is required before the outcome becomes operational memory."
];

const evidenceTaxonomy = [
  ["Observation", "Directly present in approved evidence.", "mint"],
  ["Inference", "A reasoned interpretation that still needs challenge.", "signal"],
  ["Contradiction", "Evidence that weakens or redirects a hypothesis.", "amber"],
  ["Missing evidence", "A known gap the system must not hide.", "amber"],
  ["Confirmed fact", "Validated by enough evidence or responsible human review.", "mint"]
] as const;

const hypothesisTransitions = [
  ["Proposed", "Configuration regression enters because timing aligns with the symptom window."],
  ["Supported", "Signal, change, and topology receipts move the leading hypothesis above competing explanations."],
  ["Challenged", "Capacity headroom contradicts the capacity-saturation branch and keeps uncertainty visible."],
  ["Review-ready", "The recommendation remains a human-approved review packet, not autonomous execution."]
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

const scenarioCopy = {
  "transaction-degradation": {
    primaryHypothesis: "Configuration regression in a dependency path",
    secondaryHypothesis: "Capacity saturation on the customer journey",
    tertiaryHypothesis: "Unrelated warning cascade",
    primaryRationale: "Best explains timing, affected transaction path, and reversible mitigation.",
    bestAction: "Recommend rollback review with owner approval",
    riskyAction: "Autonomously roll back the dependency",
    weakAction: "Only monitor until more alerts appear"
  },
  "ai-answer-drift": {
    primaryHypothesis: "Approved-context gap causing overconfident answer drift",
    secondaryHypothesis: "Retrieval freshness regression",
    tertiaryHypothesis: "Prompt-noise false lead",
    primaryRationale: "Best explains confidence rising while evidence coverage and citation quality fall.",
    bestAction: "Require refusal and escalation review before the answer is trusted",
    riskyAction: "Let the assistant continue answering without a grounding gate",
    weakAction: "Only add more prompts without changing the eval harness"
  },
  "batch-latency-regression": {
    primaryHypothesis: "Dependency-path latency regression in a batch workflow",
    secondaryHypothesis: "Downstream capacity pressure",
    tertiaryHypothesis: "Unrelated scheduler warning",
    primaryRationale: "Best explains the missed completion window, transaction path, and bounded mitigation option.",
    bestAction: "Recommend bounded mitigation review with owner approval",
    riskyAction: "Autonomously reroute the workflow without approval",
    weakAction: "Only wait for the next batch window"
  }
};

const evalChecks = [
  {
    name: "Evidence completeness",
    status: "Pass",
    definition: "The conclusion must use enough independent public-safe evidence to justify a reviewed recommendation.",
    evidence: "Signal, change, topology, and transaction timing receipts are available.",
    limitation: "Direct owner confirmation is still outside the synthetic fixture.",
    reason: "The recommendation is allowed only as a review packet, not as autonomous action."
  },
  {
    name: "Claim support",
    status: "Pass",
    definition: "Every RCA claim must trace back to evidence or be marked as inference.",
    evidence: "The leading hypothesis cites timing, transaction impact, and dependency-path alignment.",
    limitation: "The case cannot prove production causality because it is a public-safe synthetic scenario.",
    reason: "The UI separates observed facts from inferred cause."
  },
  {
    name: "Contradiction handling",
    status: "Pass",
    definition: "The system must keep weak or contradictory evidence visible instead of hiding it.",
    evidence: "The unrelated warning remains visible as a noisy candidate.",
    limitation: "More contradictory evidence would be needed for a harder case.",
    reason: "The noise item can be included or excluded and changes confidence."
  },
  {
    name: "Replay readiness",
    status: "Pass",
    definition: "The case must preserve enough context to replay the reasoning path later.",
    evidence: "Case identity, evidence references, timeline, hypotheses, action boundary, and learning target are exported.",
    limitation: "Replay is deterministic within the fixture, not a production event replay.",
    reason: "The exported packet is a replay seed, not just an incident summary."
  },
  {
    name: "Human-review requirement",
    status: "Pass",
    definition: "High-impact operational action must stay behind accountable human review.",
    evidence: "The best action is rollback review with owner approval.",
    limitation: "The synthetic controls do not execute real changes.",
    reason: "The operator can approve, reject, request evidence, escalate, or preserve unresolved state."
  }
];

const executionStages = [
  { label: "Intake", detail: "Normalize the incident", status: "complete" },
  { label: "Collect", detail: "Gather public-safe evidence", status: "complete" },
  { label: "Graph", detail: "Connect evidence relationships", status: "running" },
  { label: "Score", detail: "Move hypothesis confidence", status: "running" },
  { label: "Gate", detail: "Prepare human review", status: "pending" },
  { label: "Learn", detail: "Create future memory candidate", status: "pending" }
];
const receiptLedger = [
  ["R-001", "Signal receipt", "completion drop", "verified"],
  ["R-002", "Change receipt", "09:18 config update", "correlated"],
  ["R-003", "Topology receipt", "dependency path", "linked"],
  ["R-004", "Decision receipt", "rollback review packet", "pending approval"]
];
const replayModes = [
  ["Fast", "Replay the evidence chain at compressed speed."],
  ["Live", "Replay with original timing and sequence."],
  ["Step", "Advance one receipt and decision at a time."]
];
const memorySignals = [
  ["Outcome memory", "Was the recommended action accepted and effective?"],
  ["False lead", "Which evidence looked relevant but failed the hypothesis?"],
  ["Pattern signature", "Which graph shape should be recognized next time?"]
];
const investigationLanes = ["Customer journey", "Change record", "Dependency path", "Human owner"];
const defaultEvidenceIds = evidence.filter((item) => item.used).map((item) => item.id);
const replayTrace = [
  ["Collect", "Accepted public-safe operational facts"],
  ["Correlate", "Mapped facts to the transaction path"],
  ["Compare", "Scored competing explanations"],
  ["Gate", "Kept irreversible action behind human review"]
];
const replayChapters = [
  {
    id: "RX-01",
    label: "Signal normalized",
    time: "09:24:08",
    evidenceId: "signal",
    summary: "Customer journey degradation enters the harness as typed evidence.",
    stage: "Intake"
  },
  {
    id: "RX-02",
    label: "Change correlated",
    time: "09:25:41",
    evidenceId: "change",
    summary: "A public-safe change record is linked to the symptom window.",
    stage: "Collect"
  },
  {
    id: "RX-03",
    label: "Path reconstructed",
    time: "09:27:12",
    evidenceId: "topology",
    summary: "The affected transaction path is connected to dependency groups.",
    stage: "Graph"
  },
  {
    id: "RX-04",
    label: "Noise rejected",
    time: "09:30:27",
    evidenceId: "noise",
    summary: "An unrelated alert is kept visible but prevented from dominating RCA.",
    stage: "Score"
  },
  {
    id: "RX-05",
    label: "Review packet drafted",
    time: "09:43:03",
    evidenceId: "topology",
    summary: "The recommended rollback review remains behind a human approval gate.",
    stage: "Gate"
  },
  {
    id: "RX-06",
    label: "Outcome memory queued",
    time: "09:51:30",
    evidenceId: "change",
    summary: "The case becomes a future replay fixture after operator validation.",
    stage: "Learn"
  }
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
  { id: "contradiction", label: "Contradiction", detail: "capacity stable", x: 58, y: 84, evidence: "contradiction" },
  { id: "noise", label: "Noise", detail: "unrelated alert", x: 36, y: 78, evidence: "noise" }
];
const replayEdges = [
  ["journey", "path", "signal"],
  ["change", "path", "change"],
  ["path", "hypothesis", "topology"],
  ["hypothesis", "review", "change"],
  ["contradiction", "hypothesis", "contradiction"],
  ["noise", "hypothesis", "noise"]
];

function scenarioHypothesisLabel(scenario: (typeof scenarios)[number], index: number) {
  const copy = scenarioCopy[scenario.id as keyof typeof scenarioCopy];
  if (index === 0) {
    return copy.primaryHypothesis;
  }
  if (index === 1) {
    return copy.secondaryHypothesis;
  }
  return copy.tertiaryHypothesis;
}

function scenarioHypothesisRationale(scenario: (typeof scenarios)[number], index: number, fallback: string) {
  const copy = scenarioCopy[scenario.id as keyof typeof scenarioCopy];
  return index === 0 ? copy.primaryRationale : fallback;
}

function scenarioActionLabel(scenario: (typeof scenarios)[number], index: number) {
  const copy = scenarioCopy[scenario.id as keyof typeof scenarioCopy];
  if (index === 0) {
    return copy.bestAction;
  }
  if (index === 1) {
    return copy.riskyAction;
  }
  return copy.weakAction;
}

function branchOutcomeForAction(actionQuality: string) {
  if (actionQuality === "Best") {
    return "Approved-review path: safest recommendation, strong auditability, and reusable outcome memory.";
  }

  if (actionQuality === "Risky") {
    return "Automation-risk path: fast but not release-ready because irreversible change skipped owner approval.";
  }

  return "Delay-risk path: avoids unsafe automation but leaves customer impact unresolved despite enough review evidence.";
}

function adjustedConfidence(name: string, activeEvidenceIds: string[]) {
  const activeSet = new Set(activeEvidenceIds);

  if (name === hypotheses[0].name) {
    return Math.min(
      94,
      20 +
        (activeSet.has("signal") ? 26 : 0) +
        (activeSet.has("change") ? 24 : 0) +
        (activeSet.has("topology") ? 22 : 0) +
        (activeSet.has("contradiction") ? 6 : 0) -
        (activeSet.has("noise") ? 10 : 0)
    );
  }

  if (name === hypotheses[1].name) {
    return Math.min(
      76,
      26 + (activeSet.has("signal") ? 12 : 0) + (activeSet.has("topology") ? 8 : 0) + (activeSet.has("noise") ? 12 : 0) - (activeSet.has("contradiction") ? 14 : 0)
    );
  }

  return Math.min(52, 12 + (activeSet.has("noise") ? 24 : 0) + (activeSet.has("signal") ? 4 : 0));
}

export function IncidentSimulator() {
  const [active, setActive] = useState(0);
  const [selectedScenarioId, setSelectedScenarioId] = useState(scenarios[0].id);
  const [activeEvidenceIds, setActiveEvidenceIds] = useState<string[]>(defaultEvidenceIds);
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(hypotheses[0].name);
  const [selectedAction, setSelectedAction] = useState<string | null>(actions[0].name);
  const [replayMode, setReplayMode] = useState<"step" | "live">("step");
  const [replayIndex, setReplayIndex] = useState(2);
  const [guidedMode, setGuidedMode] = useState(true);
  const guidedCompletionCaptured = useRef(false);
  const selectedScenario = scenarios.find((scenario) => scenario.id === selectedScenarioId) ?? scenarios[0];
  useEffect(() => {
    if (replayMode !== "live") {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setReplayIndex((value) => (value + 1) % replayChapters.length);
    }, 1800);

    return () => window.clearInterval(timer);
  }, [replayMode]);

  function chooseScenario(id: string) {
    setSelectedScenarioId(id);
    setActive(0);
    setActiveEvidenceIds(defaultEvidenceIds);
    setSelectedHypothesis(hypotheses[0].name);
    setSelectedAction(actions[0].name);
    setReplayMode("step");
    setReplayIndex(2);
  }

  const visibleReplayChapters = replayChapters.slice(0, replayIndex + 1);
  const currentReplayChapter = replayChapters[replayIndex];
  const currentStepLayers = steps[active].frameworkLayers;
  const replayProgress = Math.round(((replayIndex + 1) / replayChapters.length) * 100);
  const score = useMemo(() => {
    const progress = ((active + 1) / steps.length) * 45;
    const hypothesisConfidence = selectedHypothesis == null ? 0 : adjustedConfidence(selectedHypothesis, activeEvidenceIds);
    const hypothesisScore = selectedHypothesis == null ? 0 : Math.round(hypothesisConfidence * 0.36);
    const actionScore = selectedAction == null ? 0 : selectedAction === actions[0].name ? 25 : selectedAction === actions[1].name ? 8 : 12;
    const evidenceScore = Math.max(0, activeEvidenceIds.filter((id) => id !== "noise").length * 4 - (activeEvidenceIds.includes("noise") ? 6 : 0));
    return Math.min(100, Math.round(progress + hypothesisScore + actionScore + evidenceScore));
  }, [active, activeEvidenceIds, selectedAction, selectedHypothesis]);
  useEffect(() => {
    if (guidedMode && active === steps.length - 1 && !guidedCompletionCaptured.current) {
      guidedCompletionCaptured.current = true;
      captureSafeEvent("operations_room_guided_completion", {
        case_id: selectedScenario.caseId,
        replay_index: replayIndex,
        score
      });
    }
  }, [active, guidedMode, replayIndex, score, selectedScenario.caseId]);
  const selectedHypothesisDetail = hypotheses.find((item) => item.name === selectedHypothesis);
  const selectedHypothesisIndex = selectedHypothesisDetail == null ? -1 : hypotheses.indexOf(selectedHypothesisDetail);
  const selectedActionDetail = actions.find((item) => item.name === selectedAction);
  const selectedActionIndex = selectedActionDetail == null ? -1 : actions.indexOf(selectedActionDetail);
  const selectedHypothesisLabel =
    selectedHypothesisDetail == null || selectedHypothesisIndex < 0 ? "Not selected" : scenarioHypothesisLabel(selectedScenario, selectedHypothesisIndex);
  const selectedHypothesisRationale =
    selectedHypothesisDetail == null || selectedHypothesisIndex < 0
      ? "Select a hypothesis to build the review packet."
      : scenarioHypothesisRationale(selectedScenario, selectedHypothesisIndex, selectedHypothesisDetail.rationale);
  const selectedActionLabel = selectedActionDetail == null || selectedActionIndex < 0 ? "Not selected" : scenarioActionLabel(selectedScenario, selectedActionIndex);
  const selectedHypothesisConfidence = selectedHypothesis == null ? 0 : adjustedConfidence(selectedHypothesis, activeEvidenceIds);
  const activeEvidenceTypes = activeEvidenceIds
    .map((id) => evidence.find((item) => item.id === id)?.type)
    .filter(Boolean)
    .join(" / ");
  const commandStrip: Array<[string, string, string, "mint" | "signal" | "amber"]> = [
    ["Active case", selectedScenario.caseId, selectedScenario.trigger, "mint"],
    ["Replay state", `${currentReplayChapter.id} / ${replayProgress}%`, currentReplayChapter.stage, "signal"],
    ["Release gate", `${score}%`, score >= 85 ? "Review-ready" : "Needs review", "mint"],
    ["Evidence", `${activeEvidenceIds.length}/${evidence.length}`, activeEvidenceTypes || "No facts selected", "signal"],
    ["Action control", selectedActionDetail?.quality ?? "Pending", "Human approval required", "amber"]
  ];
  const releaseChecks: Array<[string, boolean]> = [
    ["Grounded", activeEvidenceIds.length >= 3],
    ["Cited", replayIndex >= 2],
    ["Bounded", selectedActionDetail?.quality !== "Risky"],
    ["Human gate", selectedActionDetail?.quality === "Best"]
  ];
  const CurrentIcon = steps[active].icon;
  const activeStepContract = stepContracts[active];
  const branchOutcome = branchOutcomeForAction(selectedActionDetail?.quality ?? "Weak");
  const evidenceReportLines = evidence.map((item) => {
    const included = activeEvidenceIds.includes(item.id);
    return `- ${item.type}: ${included ? "included" : "excluded"} | ${item.confidence} confidence | ${item.fact}`;
  });
  const timelineReportLines = timeline.map(([time, label, detail, state]) => `- ${time} | ${label} | ${state} | ${detail}`);
  const decisionTraceLines = [
    `- Intake: ${selectedScenario.trigger}`,
    `- Evidence: ${activeEvidenceIds.length} active evidence items (${activeEvidenceTypes || "none"})`,
    `- Hypothesis: ${selectedHypothesisLabel} at ${selectedHypothesisConfidence}% confidence`,
    `- Action gate: ${selectedActionLabel} (${selectedActionDetail?.quality ?? "Not scored"})`,
    `- Replay cursor: ${currentReplayChapter.id} ${currentReplayChapter.label}`,
    `- Learning target: ${selectedScenario.learningTarget}`
  ];
  const branchReportLines = actions.map((action, index) => `- ${action.quality}: ${scenarioActionLabel(selectedScenario, index)} | ${branchOutcomeForAction(action.quality)}`);
  const actionGateStatus = selectedActionDetail?.quality === "Best" ? "Approval required" : selectedActionDetail?.quality === "Risky" ? "Blocked by policy" : "More evidence needed";
  const decisionPacketRows: Array<[string, string, "mint" | "signal" | "amber"]> = [
    ["Packet state", score >= 85 ? "Review-ready" : "Draft under review", score >= 85 ? "mint" : "amber"],
    ["Approval class", "Reversible operational change", "amber"],
    ["Required owner", "Authorized service owner or incident commander", "signal"],
    ["Action boundary", actionGateStatus, selectedActionDetail?.quality === "Risky" ? "amber" : "mint"],
    ["Active receipts", `${activeEvidenceIds.length} evidence items / ${visibleReplayChapters.length} replay chapters`, "signal"],
    ["Unknowns", `${missingEvidence.length} explicit missing-evidence conditions`, "amber"]
  ];
  const report = [
    "Operational Intelligence Operations Room Report",
    "===============================================",
    "",
    "Executive summary",
    "-----------------",
    `Case: ${selectedScenario.caseId} - ${selectedScenario.title}`,
    `Trigger: ${selectedScenario.trigger}`,
    `Impact: ${selectedScenario.impact}`,
    `Operator goal: ${selectedScenario.operatorGoal}`,
    `Mode: ${steps[active].mode}`,
    "",
    "Replay state",
    "------------",
    `Replay cursor: ${currentReplayChapter.id} - ${currentReplayChapter.label}`,
    `Replay progress: ${replayProgress}%`,
    `Visible replay chapters: ${visibleReplayChapters.map((chapter) => chapter.id).join(", ")}`,
    "",
    "Evidence packet",
    "---------------",
    ...evidenceReportLines,
    "",
    "Timeline reconstruction",
    "-----------------------",
    ...timelineReportLines,
    "",
    "Decision trace",
    "--------------",
    ...decisionTraceLines,
    "",
    "Selected recommendation",
    "-----------------------",
    `Hypothesis: ${selectedHypothesisLabel}`,
    `Hypothesis confidence: ${selectedHypothesisDetail ? `${selectedHypothesisConfidence}%` : "Not scored"}`,
    `Action: ${selectedActionLabel}`,
    `Action quality: ${selectedActionDetail?.quality ?? "Not scored"}`,
    `Branch outcome: ${branchOutcome}`,
    `Readiness score: ${score}%`,
    "",
    "Branch comparison",
    "-----------------",
    ...branchReportLines,
    "",
    "Evaluation release gate",
    "-----------------------",
    `Learning target: ${selectedScenario.learningTarget}`,
    "Release gate: publish only if evidence coverage, uncertainty, confidentiality, human review, and actionability remain green.",
    "Public-safe boundary: no private logs, internal product names, screenshots, dashboards, or proprietary architecture.",
    "",
    "Operating model",
    "---------------",
    "Evidence before conclusions. Timeline before RCA. Evaluation before trust. Human review before irreversible action."
  ].join("\n");

  return (
    <div className="reasonops-room ops-command-shell overflow-hidden rounded-lg border border-white/10 bg-[#080b12] shadow-2xl shadow-black/50">
      <div className="relative border-b border-white/10 p-4 md:p-5">
        <div className="absolute inset-0 intelligence-field opacity-50" />
        <div className="relative z-10 grid gap-4 xl:grid-cols-[1fr_20rem] xl:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs font-semibold uppercase text-mint">
              <Sparkles size={14} />
              Operational Intelligence Operations Room
            </div>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-white md:text-4xl">Do the investigation before the narrative hardens.</h2>
            <p className="mt-3 hidden max-w-3xl text-base leading-7 text-slate-300 md:block">
              This room keeps the system honest: facts stay separate from inference, weak evidence remains visible,
              confidence moves only when receipts support it, and action waits for a human owner.
            </p>
            <div className="mt-4 rounded-lg border border-mint/20 bg-black/25 p-3 shadow-[0_0_40px_rgba(95,242,181,0.08)]">
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Live investigation graph</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">
                    Evidence paths update as replay advances; unsupported paths stay visible instead of disappearing.
                  </p>
                </div>
                <p className="font-mono text-xs text-signal">{currentReplayChapter.id} active</p>
              </div>
              <MiniReplayGraph activeEvidenceIds={activeEvidenceIds} />
              <div className="mt-3 border-t border-white/10 pt-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Evidence taxonomy</p>
                  <p className="font-mono text-xs text-slate-500">public-safe labels</p>
                </div>
                <p className="sr-only">The room is useful only if it refuses to collapse facts, interpretations, gaps, and contradictions into one fluent RCA.</p>
                <div className="flex flex-wrap gap-2">
                {evidenceTaxonomy.map(([label, detail, tone]) => (
                  <span
                    key={label}
                    title={detail}
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      tone === "amber" ? "border-amber/25 bg-amber/[0.07] text-amber" : tone === "signal" ? "border-signal/25 bg-signal/[0.07] text-signal" : "border-mint/25 bg-mint/[0.07] text-mint"
                    }`}
                  >
                    {label}
                  </span>
                ))}
                </div>
              </div>
            </div>
            <div className="ops-command-strip mt-4 grid gap-2 md:grid-cols-5">
              {commandStrip.map(([label, value, detail, tone]) => (
                <div key={label} className={`ops-command-cell ${tone === "amber" ? "ops-command-cell-amber" : tone === "signal" ? "ops-command-cell-signal" : ""}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[0.68rem] font-semibold uppercase text-slate-500">{label}</p>
                    <span className={`ops-status-dot ${tone === "amber" ? "bg-amber" : tone === "signal" ? "bg-signal" : "bg-mint"}`} />
                  </div>
                  <p className="mt-2 truncate font-mono text-sm font-semibold text-white md:text-base">{value}</p>
                  <p className="mt-1 truncate text-xs text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-3 xl:hidden">
              {scenarios.map((scenario) => {
                const selected = scenario.id === selectedScenarioId;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => chooseScenario(scenario.id)}
                    className={`rounded-lg border p-3 text-left transition ${selected ? "border-mint/35 bg-mint/[0.09]" : "border-white/10 bg-black/20 hover:border-white/25"}`}
                  >
                    <p className={selected ? "font-mono text-xs text-mint" : "font-mono text-xs text-slate-500"}>{scenario.caseId}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{scenario.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{scenario.trigger}</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 xl:hidden">
              <button
                type="button"
                onClick={() => {
                  setGuidedMode(true);
                  guidedCompletionCaptured.current = false;
                  setActive(0);
                  setReplayIndex(0);
                  setReplayMode("step");
                  captureSafeEvent("operations_room_guided_start", { case_id: selectedScenario.caseId });
                }}
                className={guidedMode ? "rounded bg-mint px-4 py-2 text-sm font-semibold text-ink" : "rounded border border-mint/35 px-4 py-2 text-sm font-semibold text-mint"}
              >
                Walk me through the investigation
              </button>
              <button
                type="button"
                onClick={() => {
                  setGuidedMode(false);
                  captureSafeEvent("operations_room_expert_mode", { case_id: selectedScenario.caseId });
                }}
                className={!guidedMode ? "rounded bg-signal px-4 py-2 text-sm font-semibold text-ink" : "rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white"}
              >
                Expert exploration
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-black/25 p-3 xl:hidden">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">Replay cursor</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {currentReplayChapter.id} · {currentReplayChapter.label} · {replayProgress}% complete
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setReplayMode((mode) => (mode === "live" ? "step" : "live"))}
                    className={replayMode === "live" ? "rounded bg-signal px-3 py-2 text-xs font-semibold text-ink" : "rounded border border-white/15 px-3 py-2 text-xs font-semibold text-white"}
                  >
                    {replayMode === "live" ? "Live replay" : "Step replay"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplayIndex((value) => Math.max(0, value - 1))}
                    className="rounded border border-white/15 px-3 py-2 text-xs font-semibold text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplayIndex((value) => Math.min(replayChapters.length - 1, value + 1))}
                    className="rounded border border-mint/35 px-3 py-2 text-xs font-semibold text-mint"
                  >
                    Advance
                  </button>
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-white/10">
                <motion.div className="h-1.5 rounded-full bg-signal" animate={{ width: `${replayProgress}%` }} transition={{ duration: 0.35 }} />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3 xl:hidden">
              <ReplaySignalCard
                label="Evidence replay"
                value={`${activeEvidenceIds.length} active`}
                detail={activeEvidenceTypes || "No evidence selected"}
                tone="mint"
              />
              <ReplaySignalCard
                label="Confidence moves"
                value={`${selectedHypothesisConfidence}%`}
                detail={selectedHypothesisLabel}
                tone="signal"
              />
              <ReplaySignalCard
                label="Action gate"
                value={selectedActionDetail?.quality ?? "Pending"}
                detail="Human approval before irreversible change"
                tone="amber"
              />
              <ReplaySignalCard
                label="Budget guard"
                value={`${Math.min(20, 4 + activeEvidenceIds.length + active * 3)}/20`}
                detail="Bounded investigation calls before escalation"
                tone="signal"
              />
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4 backdrop-blur md:p-5">
            <div className="mb-4 rounded-lg border border-signal/25 bg-signal/[0.07] p-4">
              <p className="font-mono text-xs text-signal">{selectedScenario.caseId}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{selectedScenario.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{selectedScenario.summary}</p>
              <div className="mt-3 rounded border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Operator goal</p>
                <p className="mt-1 text-sm leading-6 text-slate-200">{selectedScenario.operatorGoal}</p>
              </div>
              <Link
                href={`/ask?prompt=${encodeURIComponent(`Explain the ${selectedScenario.caseId} Operations Room case and the public-safe decision packet.`)}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-mint"
              >
                Ask about this case <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mb-4 hidden rounded-lg border border-white/10 bg-black/20 p-3 xl:block">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Case switch</p>
              <div className="mt-3 grid gap-2">
                {scenarios.map((scenario) => {
                  const selected = scenario.id === selectedScenarioId;
                  return (
                    <button
                      key={scenario.id}
                      type="button"
                      onClick={() => chooseScenario(scenario.id)}
                      className={`rounded border px-3 py-2 text-left transition ${selected ? "border-mint/35 bg-mint/[0.09]" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}
                    >
                      <span className={selected ? "font-mono text-xs text-mint" : "font-mono text-xs text-slate-500"}>{scenario.caseId}</span>
                      <span className="mt-1 block text-xs font-semibold leading-4 text-white">{scenario.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <MiniReplayGraph activeEvidenceIds={activeEvidenceIds} compact />
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">Release readiness</p>
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
            <div className="mt-5 grid grid-cols-2 gap-2">
              {releaseChecks.map(([label, passed]) => (
                <div key={label} className={`rounded border p-2 ${passed ? "border-mint/25 bg-mint/[0.07]" : "border-amber/25 bg-amber/[0.07]"}`}>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${passed ? "bg-mint" : "bg-amber"}`} />
                    <p className="text-xs font-semibold text-white">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">Score increases when the system proves evidence, confidence, confidentiality, and human review discipline.</p>
          </div>
        </div>
      </div>

      <ControlPlaneConsole
        active={active}
        score={score}
        confidence={selectedHypothesisConfidence}
        activeEvidenceIds={activeEvidenceIds}
        selectedActionQuality={selectedActionDetail?.quality ?? "Pending"}
        replayIndex={replayIndex}
        currentReplayChapter={currentReplayChapter}
      />

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

      <div className="grid gap-0 lg:grid-cols-[15rem_minmax(0,1fr)] 2xl:grid-cols-[16rem_minmax(0,1fr)_18rem]">
        <aside className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase text-slate-500">Framework walkthrough</p>
          <div className="mt-4 space-y-2">
            {operationalIntelligenceSystem.layerStates.map((item, index) => {
              const activeLayer = currentStepLayers.includes(item.layer);
              return (
                <button
                  key={item.layer}
                  type="button"
                  onClick={() => {
                    const nextStep = steps.findIndex((step) => step.frameworkLayers.includes(item.layer));
                    if (nextStep >= 0) setActive(nextStep);
                  }}
                  className={`w-full rounded border p-2 text-left transition ${
                    activeLayer ? "border-mint/35 bg-mint/[0.08]" : "border-white/10 bg-white/[0.03] hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={activeLayer ? "font-mono text-xs text-mint" : "font-mono text-xs text-slate-500"}>{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-[0.65rem] uppercase text-slate-500">{activeLayer ? "active" : "jump"}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-white">{item.layer}</p>
                  <p className="mt-1 text-[0.7rem] leading-4 text-slate-400">{item.question}</p>
                </button>
              );
            })}
          </div>
          <div className="mt-6 border-t border-white/10 pt-5">
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
          </div>
          <div className="mt-6 rounded-lg border border-amber/20 bg-amber/10 p-4 text-amber">
            <div className="flex items-center gap-2">
              <AlertTriangle size={17} />
              <p className="text-sm font-semibold">Boundary</p>
            </div>
            <p className="mt-2 text-sm leading-6">No internal logs, proprietary names, screenshots, or confidential architecture.</p>
          </div>
          <div className="mt-4 rounded-lg border border-signal/20 bg-signal/[0.06] p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Control plane DNA</p>
            <div className="mt-3 space-y-2">
              {operationalIntelligenceSystem.decisionPacket.operatingControls.map((control) => (
                <div key={control} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                  {control}
                </div>
              ))}
            </div>
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
                <div className="mt-4 flex flex-wrap gap-2">
                  {steps[active].frameworkLayers.map((layer) => (
                    <Link
                      key={layer}
                      href={`/ask?prompt=${encodeURIComponent(`Explain how the ${layer} applies to the ${selectedScenario.caseId} Operations Room case.`)}`}
                      className="rounded border border-mint/25 bg-mint/[0.07] px-3 py-1.5 text-xs font-semibold text-mint"
                    >
                      {layer}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6 grid gap-2 rounded-lg border border-white/10 bg-black/20 p-3 md:grid-cols-4">
              {[
                ["Operator question", activeStepContract.question, "signal"],
                ["Required output", activeStepContract.output, "mint"],
                ["Confidence rule", activeStepContract.confidence, "amber"],
                ["Failure mode", activeStepContract.failure, "amber"]
              ].map(([label, value, tone]) => (
                <div key={label} className="rounded border border-white/10 bg-white/[0.03] p-3">
                  <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${tone === "mint" ? "text-mint" : tone === "signal" ? "text-signal" : "text-amber"}`}>{label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{value}</p>
                </div>
              ))}
            </div>

            <VisualReplayLayer
              active={active}
              activeEvidenceIds={activeEvidenceIds}
              selectedHypothesis={selectedHypothesis}
              selectedAction={selectedAction}
              replayIndex={replayIndex}
              visibleReplayChapters={visibleReplayChapters}
              scenario={selectedScenario}
            />

            {active === 0 && (
              <EvidenceBoard activeEvidenceIds={activeEvidenceIds} onToggleEvidence={setActiveEvidenceIds} />
            )}
            {active === 1 && <TimelineReplay />}
            {active === 2 && (
              <HypothesisBoard activeEvidenceIds={activeEvidenceIds} selectedHypothesis={selectedHypothesis} onSelect={setSelectedHypothesis} scenario={selectedScenario} />
            )}
            {active === 3 && (
              <ActionGate selectedHypothesisDetail={selectedHypothesisDetail} selectedAction={selectedAction} onSelect={setSelectedAction} branchOutcome={branchOutcome} scenario={selectedScenario} />
            )}
            {active === 4 && (
              <EvalBoard
                report={report}
                branchOutcome={branchOutcome}
                scenario={selectedScenario}
                score={score}
                selectedAction={selectedAction}
              />
            )}
          </motion.div>
        </main>

        <aside className="border-t border-white/10 p-5 lg:col-span-2 2xl:col-span-1 2xl:border-l 2xl:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Decision packet</p>
            <span className="rounded border border-amber/30 bg-amber/10 px-2 py-1 font-mono text-xs text-amber">No execution</span>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start gap-3">
              <BrainCircuit className="mt-1 shrink-0 text-mint" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Selected hypothesis</p>
                <p className="mt-2 font-semibold text-white">{selectedHypothesisLabel}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{selectedHypothesisRationale}</p>
                <p className="mt-3 font-mono text-sm text-mint">{selectedHypothesisConfidence}% confidence from active evidence</p>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-start gap-3">
              <UserCheck className="mt-1 shrink-0 text-signal" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Recommended action</p>
                <p className="mt-2 font-semibold text-white">{selectedActionDetail?.quality ?? "Action pending"}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{selectedActionDetail == null ? "Choose the action that preserves human accountability." : selectedActionLabel}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-sm font-semibold text-white">Operator review contract</p>
            <div className="mt-3 space-y-2">
              {decisionPacketRows.map(([label, value, tone]) => (
                <div key={label} className="rounded border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                    <span className={`h-2 w-2 shrink-0 rounded-full ${tone === "amber" ? "bg-amber" : tone === "signal" ? "bg-signal" : "bg-mint"}`} />
                  </div>
                  <p className={`mt-2 text-sm font-semibold leading-5 ${tone === "amber" ? "text-amber" : tone === "signal" ? "text-signal" : "text-mint"}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-amber/25 bg-amber/[0.07] p-4">
            <p className="text-sm font-semibold text-amber">Explicit unknowns</p>
            <div className="mt-3 space-y-2">
              {missingEvidence.map((item) => (
                <p key={item} className="text-sm leading-6 text-slate-300">{item}</p>
              ))}
            </div>
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
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Receipt model</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Every evidence item, hypothesis movement, and action recommendation should be inspectable, replayable, and challengeable by the operator.
            </p>
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Next control-plane surfaces</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sentinelContextModel.controlPlane.slice(0, 6).map((surface) => (
                <span key={surface} className="rounded border border-white/10 bg-black/20 px-2 py-1 text-xs text-slate-300">
                  {surface}
                </span>
              ))}
            </div>
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

function ControlPlaneConsole({
  active,
  score,
  confidence,
  activeEvidenceIds,
  selectedActionQuality,
  replayIndex,
  currentReplayChapter
}: {
  active: number;
  score: number;
  confidence: number;
  activeEvidenceIds: string[];
  selectedActionQuality: string;
  replayIndex: number;
  currentReplayChapter: (typeof replayChapters)[number];
}) {
  const budgetUsed = Math.min(20, 4 + activeEvidenceIds.length + active * 3);
  const risk = selectedActionQuality === "Risky" ? "High" : score > 78 ? "Managed" : "Open";
  const activeStage = executionStages[Math.min(active + 1, executionStages.length - 1)]?.label ?? "Score";

  return (
    <div className="border-b border-white/10 bg-black/20 p-4 md:p-5">
      <div className="grid gap-4 xl:grid-cols-[0.8fr_1.25fr_0.95fr]">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">Risk and confidence strip</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ["Confidence", `${confidence}%`, "text-mint"],
              ["Risk", risk, risk === "High" ? "text-amber" : "text-signal"],
              ["Budget", `${budgetUsed}/20`, budgetUsed > 16 ? "text-amber" : "text-mint"],
              ["Stage", activeStage, "text-signal"]
            ].map(([label, value, tone]) => (
              <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                <p className="text-xs text-slate-500">{label}</p>
                <p className={`mt-1 font-mono text-lg font-semibold ${tone}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#071018] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Execution graph</p>
            <span className="rounded border border-mint/25 bg-mint/10 px-2 py-1 font-mono text-xs text-mint">{currentReplayChapter.id} active</span>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-6">
            {executionStages.map((stage, index) => {
              const current = index === Math.min(active + 1, executionStages.length - 1);
              const complete = index <= active;
              return (
                <div key={stage.label} className={`relative min-h-28 rounded-lg border p-3 ${current ? "border-signal/50 bg-signal/[0.09]" : complete ? "border-mint/30 bg-mint/[0.06]" : "border-white/10 bg-white/[0.03]"}`}>
                  <span className={`absolute right-3 top-3 h-2 w-2 rounded-full ${current ? "bg-signal" : complete ? "bg-mint" : "bg-slate-600"}`} />
                  <p className="font-mono text-xs text-slate-500">0{index + 1}</p>
                  <h3 className="mt-3 text-sm font-semibold text-white">{stage.label}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{stage.detail}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-4">
            {receiptLedger.map(([id, label, subject, state], index) => {
              const activeReceipt = index <= replayIndex;
              return (
              <div key={id} className={`rounded border p-3 ${activeReceipt ? "border-mint/25 bg-mint/[0.06]" : "border-white/10 bg-black/20 opacity-60"}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-xs text-signal">{id}</p>
                  <p className={activeReceipt ? "text-xs text-mint" : "text-xs text-slate-500"}>{activeReceipt ? state : "queued"}</p>
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{subject}</p>
              </div>
            );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2">
            <Database className="text-mint" size={18} />
            <p className="text-xs font-semibold uppercase text-slate-500">Memory and replay</p>
          </div>
          <div className="mt-4 space-y-3">
            {memorySignals.map(([label, detail]) => (
              <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded border border-signal/20 bg-signal/[0.06] p-3">
            <div className="flex items-center gap-2">
              <Play className="text-signal" size={15} />
              <p className="text-xs font-semibold uppercase text-slate-500">Replay modes</p>
            </div>
            <p className="mt-3 font-mono text-sm text-white">{currentReplayChapter.time} · {currentReplayChapter.label}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">{currentReplayChapter.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {replayModes.map(([label]) => (
                <span key={label} className="rounded border border-white/10 bg-black/20 px-2 py-1 text-xs text-slate-300">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualReplayLayer({
  active,
  activeEvidenceIds,
  selectedHypothesis,
  selectedAction,
  replayIndex,
  visibleReplayChapters,
  scenario
}: {
  active: number;
  activeEvidenceIds: string[];
  selectedHypothesis: string | null;
  selectedAction: string | null;
  replayIndex: number;
  visibleReplayChapters: typeof replayChapters;
  scenario: (typeof scenarios)[number];
}) {
  const activeSet = new Set(activeEvidenceIds);
  const selectedConfidence = selectedHypothesis == null ? 0 : adjustedConfidence(selectedHypothesis, activeEvidenceIds);
  const pathProgress = Math.max(18, Math.min(100, ((replayIndex + 1) / replayChapters.length) * 100));
  const selectedActionQuality = actions.find((action) => action.name === selectedAction)?.quality ?? "Pending";
  const primaryBaseline = adjustedConfidence(hypotheses[0].name, defaultEvidenceIds);
  const primaryNow = adjustedConfidence(hypotheses[0].name, activeEvidenceIds);
  const delta = primaryNow - primaryBaseline;
  const nodeById = new Map(replayNodes.map((node) => [node.id, node]));
  const reviewStateRows: Array<[string, string, string, "mint" | "signal" | "amber"]> = [
    ["Observation", "Customer journey degradation", activeSet.has("signal") ? "active receipt" : "not selected", "mint"],
    ["Inference", selectedHypothesis ?? "No hypothesis selected", `${selectedConfidence}% confidence`, "signal"],
    ["Contradiction", "Capacity headroom remains stable", activeSet.has("contradiction") ? "challenging capacity branch" : "available but not selected", "amber"],
    ["Missing evidence", "Owner confirmation and validation", `${missingEvidence.length} open gaps`, "amber"],
    ["Confirmed fact", "Replay uses synthetic public-safe evidence only", "fixture boundary", "mint"],
    ["Approval gate", selectedActionQuality, selectedActionQuality === "Best" ? "human approval required" : "not release-ready", "amber"]
  ];

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

      <div className="grid gap-2 border-b border-white/10 bg-black/10 p-3 md:grid-cols-3 2xl:grid-cols-6">
        {reviewStateRows.map(([label, value, detail, tone]) => (
          <div key={label} className="min-h-24 rounded border border-white/10 bg-white/[0.03] p-3">
            <p className={`text-[0.66rem] font-semibold uppercase tracking-[0.14em] ${tone === "mint" ? "text-mint" : tone === "signal" ? "text-signal" : "text-amber"}`}>{label}</p>
            <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-white">{value}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 p-4 2xl:grid-cols-[0.95fr_1.15fr_0.9fr]">
        <div className="order-2 rounded-lg border border-white/10 bg-white/[0.03] p-4 2xl:order-1">
          <p className="text-xs font-semibold uppercase text-slate-500">Evidence ledger</p>
          <div className="mt-4 space-y-3">
            {evidence.map((item) => {
              const enabled = activeSet.has(item.id);
              const replayed = visibleReplayChapters.some((chapter) => chapter.evidenceId === item.id);
              return (
                <div key={item.id} className={`rounded-lg border p-3 ${enabled && replayed ? "border-mint/30 bg-mint/[0.07]" : enabled ? "border-signal/25 bg-signal/[0.05]" : "border-white/10 bg-white/[0.03] opacity-60"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{item.type}</p>
                    <p className={enabled && replayed ? "font-mono text-xs text-mint" : enabled ? "font-mono text-xs text-signal" : "font-mono text-xs text-slate-500"}>{enabled && replayed ? "replayed" : enabled ? "armed" : "off"}</p>
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
                  const activeEdge = activeSet.has(evidenceId) && (index <= replayIndex || evidenceId === "contradiction");
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
                      stroke={activeEdge ? (evidenceId === "contradiction" ? "#f3c969" : "url(#replay-edge)") : "rgba(148,163,184,0.28)"}
                      strokeDasharray={activeEdge ? (evidenceId === "contradiction" ? "2 2" : "3 3") : "1 4"}
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
                  const focus = index <= replayIndex + 1 || node.id === "review";
                  const replayed = visibleReplayChapters.some((chapter) => chapter.evidenceId === node.evidence) || node.evidence === "contradiction";
                  return (
                    <g key={node.id} className={enabled && replayed ? "sim-graph-node-active" : "sim-graph-node-muted"} filter={enabled && replayed ? "url(#node-glow)" : undefined}>
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={enabled && replayed ? 4.9 : enabled ? 4.1 : 3.7}
                        fill={enabled && replayed ? (node.id === "review" || node.id === "contradiction" ? "#f3c969" : "#5ff2b5") : enabled ? "#73a7ff" : "#334155"}
                        stroke={focus ? "#ffffff" : "rgba(255,255,255,0.35)"}
                        strokeWidth={focus ? 0.65 : 0.35}
                        animate={{ scale: enabled && replayed && focus ? [1, 1.12, 1] : 1 }}
                        transition={{ duration: 1.55, repeat: enabled && replayed && focus ? Infinity : 0 }}
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
              <p className="sr-only">
                Accessible graph summary: signal, change, topology, contradiction, and noise evidence connect into a transaction path, competing RCA hypotheses, and a human review gate.
              </p>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {timeline.slice(1).map(([time, label], index) => {
                const unlocked = index <= replayIndex;
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
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              {visibleReplayChapters.slice(-3).map((chapter) => (
                <div key={chapter.id} className="rounded border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-xs text-mint">{chapter.time}</p>
                    <p className="text-xs text-signal">{chapter.stage}</p>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{chapter.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{chapter.summary}</p>
                </div>
              ))}
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
              const hypothesisIndex = hypotheses.indexOf(hypothesis);
              return (
                <div key={hypothesis.name}>
                  <div className="flex items-start justify-between gap-3">
                    <p className={selected ? "text-sm font-semibold text-white" : "text-sm text-slate-300"}>{scenarioHypothesisLabel(scenario, hypothesisIndex)}</p>
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
                const complete = index <= Math.min(active, replayIndex);
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

function MiniReplayGraph({ activeEvidenceIds, compact = false }: { activeEvidenceIds: string[]; compact?: boolean }) {
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
    <div className={`${compact ? "mb-5" : "mt-4"} overflow-hidden rounded-lg border border-white/10 bg-black/25`}>
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <p className="text-xs font-semibold uppercase text-slate-500">Live visual graph</p>
        <p className="font-mono text-xs text-mint">{activeEvidenceIds.length} evidence paths</p>
      </div>
      <svg className={`${compact ? "h-32" : "h-40"} w-full`} viewBox="0 0 100 100" role="img" aria-label="Live visual graph preview of evidence, transaction path, RCA, and review gate">
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
      <div className="mb-4 grid gap-2 md:grid-cols-5">
        {evidenceTaxonomy.map(([label, detail, tone]) => (
          <div key={label} className={`rounded border px-3 py-2 ${tone === "amber" ? "border-amber/25 bg-amber/[0.06]" : tone === "signal" ? "border-signal/25 bg-signal/[0.06]" : "border-mint/25 bg-mint/[0.06]"}`}>
            <p className={`text-xs font-semibold uppercase ${tone === "amber" ? "text-amber" : tone === "signal" ? "text-signal" : "text-mint"}`}>{label}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p>
          </div>
        ))}
      </div>
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        {missingEvidence.map((item) => (
          <div key={item} className="rounded-lg border border-amber/25 bg-amber/[0.07] p-4">
            <p className="text-xs font-semibold uppercase text-amber">Missing evidence condition</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{item}</p>
          </div>
        ))}
      </div>
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
            <div className="mt-3 inline-flex rounded border border-white/10 bg-black/25 px-2 py-1 text-xs font-semibold uppercase text-slate-300">
              {item.classification}
            </div>
            <p className="mt-4 min-h-16 text-slate-100">{item.fact}</p>
            <div className="mt-4 grid gap-2 text-xs text-slate-300">
              {[
                ["Source", item.sourceType],
                ["Timestamp", item.timestamp],
                ["Scope", item.scope],
                ["Provenance", item.provenance],
                ["Reliability", item.reliability],
                ["Entity", item.relatedEntity],
                ["Hypothesis", item.relatedHypothesis],
                ["Effect", item.stance]
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-3 rounded border border-white/10 bg-black/20 px-2 py-1.5">
                  <span className="shrink-0 font-semibold uppercase text-slate-500">{label}</span>
                  <span className="text-right leading-5 text-slate-300">{value}</span>
                </div>
              ))}
            </div>
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
        {timeline.map(([time, label, detail, state, timing], index) => (
          <motion.div
            key={`${time}-${label}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="relative grid gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 pl-12 md:grid-cols-[6rem_8rem_1fr_10rem_7rem]"
          >
            <span className="absolute left-[1.05rem] top-6 h-4 w-4 rounded-full border border-mint bg-ink shadow-[0_0_18px_rgba(95,242,181,0.5)]" />
            <span className="font-mono text-sm text-mint">{time}</span>
            <span className="font-semibold text-white">{label}</span>
            <span className="text-slate-300">{detail}</span>
            <span className="font-mono text-xs leading-5 text-signal">{timing}</span>
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
  onSelect,
  scenario
}: {
  activeEvidenceIds: string[];
  selectedHypothesis: string | null;
  onSelect: (value: string) => void;
  scenario: (typeof scenarios)[number];
}) {
  return (
    <div className="space-y-4">
      <PanelIntro
        eyebrow="Hypothesis stack"
        title="Competing explanations are scored against active evidence."
        description="Confidence is not decorative. Remove signal evidence and the leading explanation loses strength; include noise and weak explanations become easier to spot."
      />
      <div className="grid gap-3 md:grid-cols-4">
        {hypothesisTransitions.map(([state, detail]) => (
          <div key={state} className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-xs font-semibold uppercase text-signal">{state}</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">{detail}</p>
          </div>
        ))}
      </div>
      {hypotheses.map((item) => {
        const selected = selectedHypothesis === item.name;
        const confidence = adjustedConfidence(item.name, activeEvidenceIds);
        const hypothesisIndex = hypotheses.indexOf(item);
        return (
          <button
            key={item.name}
            type="button"
            onClick={() => onSelect(item.name)}
            className={`w-full rounded-lg border p-4 text-left transition ${selected ? "border-signal/50 bg-signal/[0.08]" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span className="font-semibold text-white">{scenarioHypothesisLabel(scenario, hypothesisIndex)}</span>
              <span className="font-mono text-mint">{confidence}%</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-signal" style={{ width: `${confidence}%` }} />
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{scenarioHypothesisRationale(scenario, hypothesisIndex, item.rationale)}</p>
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
  onSelect,
  branchOutcome,
  scenario
}: {
  selectedHypothesisDetail: (typeof hypotheses)[number] | undefined;
  selectedAction: string | null;
  onSelect: (value: string) => void;
  branchOutcome: string;
  scenario: (typeof scenarios)[number];
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
            The selected explanation is{" "}
            <span className="font-semibold text-white">
              {selectedHypothesisDetail == null ? "still pending" : scenarioHypothesisLabel(scenario, hypotheses.indexOf(selectedHypothesisDetail))}
            </span>.
            A strong RCA connects timing, impact scope, topology alignment, and a reversible mitigation path.
          </p>
          <div className="mt-5 flex items-start gap-3 rounded border border-amber/30 bg-amber/10 p-4 text-amber">
            <AlertTriangle size={20} />
            <p className="text-sm leading-6">Missing context: direct owner confirmation and post-mitigation validation. Human approval required before change.</p>
          </div>
          <div className="mt-4 rounded border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Scenario pressure</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{scenario.impact}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{scenario.operatorGoal}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border border-amber/30 bg-amber/[0.08] p-4">
            <p className="text-xs font-semibold uppercase text-amber">Human approval required</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              The system may prepare a rollback review packet, but it cannot execute the change. An accountable owner must approve, reject, escalate, or request more evidence.
            </p>
          </div>
          {actions.map((action, index) => (
            <button
              key={action.name}
              type="button"
              onClick={() => onSelect(action.name)}
              className={`w-full rounded-lg border p-4 text-left transition ${selectedAction === action.name ? "border-signal bg-signal/10" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-white">{scenarioActionLabel(scenario, index)}</span>
                <span className={action.quality === "Best" ? "text-mint" : "text-amber"}>{action.quality}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">{action.rationale}</p>
            </button>
          ))}
          <div className="rounded-lg border border-signal/25 bg-signal/[0.07] p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Branch outcome</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{branchOutcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EvalBoard({
  report,
  branchOutcome,
  scenario,
  score,
  selectedAction
}: {
  report: string;
  branchOutcome: string;
  scenario: (typeof scenarios)[number];
  score: number;
  selectedAction: string | null;
}) {
  const releaseVerdict = score >= 85 ? "Ready for reviewed recommendation" : score >= 70 ? "Needs operator review before recommendation" : "Not release-ready";
  const reportFileName = `${scenario.caseId.toLowerCase()}-reasonops-report.txt`;
  const reportHref = `data:text/plain;charset=utf-8,${encodeURIComponent(report)}`;

  return (
    <div>
      <PanelIntro
        eyebrow="AI evaluation"
        title="The investigation is graded before the answer is trusted."
        description="Evidence grounded answer quality, confidentiality, uncertainty, human review, and actionability are treated as release criteria."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3">
          <div className="rounded-lg border border-mint/25 bg-mint/[0.07] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">Release verdict</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{releaseVerdict}</h3>
              </div>
              <p className="font-mono text-4xl font-semibold text-mint">{score}%</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{branchOutcome}</p>
          </div>
          <div className="rounded-lg border border-signal/25 bg-signal/[0.06] p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Branch comparison</p>
            <div className="mt-4 grid gap-3">
              {actions.map((action, index) => {
                const selected = selectedAction === action.name;
                return (
                  <div
                    key={action.name}
                    className={`rounded border p-3 ${selected ? "border-mint/35 bg-mint/[0.08]" : "border-white/10 bg-black/20"}`}
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <p className="font-semibold text-white">{scenarioActionLabel(scenario, index)}</p>
                      <span className={action.quality === "Best" ? "text-sm font-semibold text-mint" : "text-sm font-semibold text-amber"}>
                        {action.quality}{selected ? " selected" : ""}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{branchOutcomeForAction(action.quality)}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Case", `${scenario.caseId} - ${scenario.title}`],
              ["Learning target", scenario.learningTarget],
              ["Operator goal", scenario.operatorGoal],
              ["Public-safe boundary", "No private logs, names, screenshots, dashboards, or proprietary architecture."]
            ].map(([label, value]) => (
              <div key={label} className="rounded border border-white/10 bg-white/[0.03] p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{value}</p>
              </div>
            ))}
          </div>
          {evalChecks.map((check) => (
            <div key={check.name} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-semibold text-white">{check.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{check.definition}</p>
                </div>
                <span className="rounded border border-mint/30 bg-mint/10 px-2 py-1 text-xs font-semibold text-mint">{check.status}</span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {[
                  ["Evidence", check.evidence],
                  ["Limitation", check.limitation],
                  ["Pass reason", check.reason]
                ].map(([label, value]) => (
                  <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                    <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-signal" />
              <h3 className="text-xl font-semibold text-white">Exportable RCA packet</h3>
            </div>
            <a
              href={reportHref}
              download={reportFileName}
              className="inline-flex items-center justify-center gap-2 rounded bg-white px-4 py-2 text-sm font-semibold text-ink"
            >
              <Download size={16} />
              Download
            </a>
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
