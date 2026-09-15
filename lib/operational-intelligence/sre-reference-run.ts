export type EvidenceKind = "Observation" | "Inference" | "Contradiction" | "Missing Evidence" | "Confirmed Fact";
export type EvidenceSource = "logs" | "metrics" | "traces" | "topology" | "change" | "memory";
export type RunStage = "alert" | "incident" | "context" | "hypothesis" | "contradiction" | "gate" | "decision" | "memory";

export type SreRunEvent = {
  id: string;
  at: string;
  stage: RunStage;
  title: string;
  detail: string;
  source?: EvidenceSource;
  receipt?: EvidenceKind;
  freshness?: string;
  confidence?: number;
  gate?: { coverage: boolean; freshness: boolean; policy: boolean; uncertainty: boolean; blocked: boolean };
};

export type RcaVerdict = "EXPLICIT UNKNOWN" | "GROUNDED RCA";

export const owlPaperSource = {
  title: "Peering through the Dark: An Owl’s View of Inter-job Dependencies and Jobs’ Impact in Shared Clusters",
  authors: "Andrew Chung, Carlo Curino, Subru Krishnan, Konstantinos Karanasos, Panagiotis Garefalakis, and Gregory R. Ganger",
  venue: "SIGMOD ’19",
  doi: "https://doi.org/10.1145/3299869.3320239",
  localSource: "project_sources/01-2602.11988.pdf",
  groundedClaims: [
    "File provenance can expose job-to-job dependencies by connecting a consuming job to the last job that wrote its input.",
    "Historical job telemetry and provenance can be combined to inspect recurring dependencies and downstream impact.",
    "An upstream modification can disrupt otherwise hidden downstream consumers, but dependency sequence alone does not establish incident causality.",
  ],
  boundary: "The paper grounds the dependency model only. OI-ROOM-001 is a synthetic deterministic fixture, not a reproduction of Microsoft Cosmos or an Owl benchmark result.",
} as const;

export const dependencyFixture = {
  nodes: [
    { id: "catalog", label: "Catalog extract", owner: "Data products" },
    { id: "journey", label: "Journey transform", owner: "Experience data" },
    { id: "score", label: "Completion score", owner: "Reliability analytics" },
    { id: "report", label: "Operations report", owner: "Service operations" },
  ],
  edges: [
    { from: "catalog", to: "journey", evidence: "journey read catalog output" },
    { from: "journey", to: "score", evidence: "score read journey output" },
    { from: "score", to: "report", evidence: "report read score output" },
  ],
} as const;

export const sreReferenceRun = {
  id: "OI-ROOM-001",
  label: "Synthetic Reference Run",
  scenario: "Customer journey degradation after a recorded change",
  policy: "Read-only evidence access. Human authority required for consequential action.",
  events: [
    { id: "alert", at: "09:24:00", stage: "alert", title: "Journey completion alert", detail: "Completion drops below the synthetic fixture threshold.", source: "metrics", receipt: "Observation", freshness: "8s" },
    { id: "incident", at: "09:24:04", stage: "incident", title: "Incident OI-ROOM-001 opened", detail: "Customer-impacting degradation; investigation priority high.", receipt: "Confirmed Fact", freshness: "12s" },
    { id: "logs", at: "09:24:09", stage: "context", title: "MCP request · logs", detail: "Read-only request finds retry growth after the recorded change.", source: "logs", receipt: "Observation", freshness: "21s" },
    { id: "metrics", at: "09:24:13", stage: "context", title: "MCP request · metrics", detail: "Latency rises while completion falls along the customer journey.", source: "metrics", receipt: "Observation", freshness: "17s" },
    { id: "traces", at: "09:24:18", stage: "context", title: "MCP request · traces", detail: "A trace segment at the dependency boundary is unavailable.", source: "traces", receipt: "Missing Evidence", freshness: "26s" },
    { id: "topology", at: "09:24:22", stage: "context", title: "MCP request · topology + ownership", detail: "The affected path crosses three synthetic dependency groups; an accountable owner is identified.", source: "topology", receipt: "Confirmed Fact", freshness: "2m" },
    { id: "change", at: "09:24:27", stage: "context", title: "MCP request · recent change", detail: "A reversible configuration change precedes the symptom window by six minutes.", source: "change", receipt: "Observation", freshness: "6m" },
    { id: "memory", at: "09:24:32", stage: "context", title: "MCP request · approved similar cases", detail: "A reviewed replay seed suggests a configuration regression; candidate context is not current truth.", source: "memory", receipt: "Inference", freshness: "reviewed" },
    { id: "hypothesis", at: "09:24:38", stage: "hypothesis", title: "Hypothesis proposed", detail: "Configuration regression leads; next request tests capacity saturation.", receipt: "Inference", confidence: 82 },
    { id: "contradiction", at: "09:24:44", stage: "contradiction", title: "Contradiction received", detail: "Capacity headroom remains stable, weakening the saturation branch and lowering confidence.", source: "metrics", receipt: "Contradiction", freshness: "11s", confidence: 61 },
    { id: "gate-blocked", at: "09:24:49", stage: "gate", title: "Evaluation gate blocks recommendation", detail: "Evidence coverage and uncertainty checks fail; premature RCA cannot advance.", gate: { coverage: false, freshness: true, policy: true, uncertainty: false, blocked: true } },
    { id: "gate-ready", at: "09:24:55", stage: "gate", title: "Decision packet becomes reviewable", detail: "The packet names the contradiction, missing trace, reversible option, and approval boundary.", gate: { coverage: true, freshness: true, policy: true, uncertainty: true, blocked: false } },
    { id: "decision", at: "09:25:02", stage: "decision", title: "Operator decision required", detail: "Approve, reject, or escalate the bounded decision packet. No action is automatic." },
    { id: "memory-reviewed", at: "09:25:09", stage: "memory", title: "Reviewed outcome eligible for memory", detail: "Only the operator-reviewed outcome becomes a replay seed and retrieval note." }
  ] satisfies SreRunEvent[]
} as const;

export type OperatorDecision = "approve" | "reject" | "escalate";

export function runSnapshot(index: number, decision: OperatorDecision | null) {
  const bounded = Math.max(-1, Math.min(index, sreReferenceRun.events.length - 1));
  const visible = sreReferenceRun.events.slice(0, bounded + 1);
  const latestConfidence = [...visible].reverse().find((event) => event.confidence !== undefined)?.confidence ?? 0;
  const gate = [...visible].reverse().find((event) => event.gate)?.gate ?? null;
  const awaitingDecision = visible.some((event) => event.stage === "decision");
  return {
    index: bounded,
    visible,
    latestConfidence,
    gate,
    awaitingDecision,
    memoryStored: Boolean(decision && visible.some((event) => event.id === "memory-reviewed"))
  };
}

export function rcaVerdict(index: number): { verdict: RcaVerdict; reason: string; missing: readonly string[] } {
  const visibleIds = new Set(runSnapshot(index, null).visible.map((event) => event.id));
  const required = ["logs", "metrics", "topology", "change", "contradiction", "gate-ready"] as const;
  const missing = required.filter((id) => !visibleIds.has(id));
  if (missing.length > 0) {
    return {
      verdict: "EXPLICIT UNKNOWN",
      reason: "The checked-in evidence does not yet satisfy the deterministic coverage gate.",
      missing,
    };
  }
  return {
    verdict: "GROUNDED RCA",
    reason: "The fixture supports a bounded configuration-regression conclusion; the unavailable trace remains a named limitation.",
    missing: ["dependency-boundary trace segment"],
  };
}
