export const askSafeMetadataFields = [
  "category",
  "mode",
  "route",
  "latency_ms",
  "server_latency_ms",
  "answer_mode",
  "retrieval_mode",
  "source_count"
] as const;

export const askBlockedMetadataFields = [
  "prompt",
  "question",
  "message",
  "email",
  "name",
  "contact",
  "clear",
  "confusing",
  "memorable",
  "missing"
] as const;

export const askOperationalModes = {
  answerModes: ["ai_synthesis", "timeout_fallback", "public_safety_refusal"],
  retrievalModes: ["local", "vector", "vector_fallback", "blocked"]
} as const;

export const askSloTargets = [
  ["Availability posture", "Ask remains usable through local approved-content fallback when AI or vector services are unavailable."],
  ["Latency target", "Track p95 client latency and server latency; timeout fallback should release before synthesis exceeds 12 seconds."],
  ["Grounding target", "Track source_count and retrieval_mode so zero-source or fallback spikes are visible without storing raw questions."],
  ["Safety target", "Track public_safety_refusal and ask_response_failure rates by safe category only."],
  ["Cost guard", "Track answer_mode, retrieval_mode, and source_count as budget signals before adding provider-level spend telemetry."]
] as const;

export const askAlertSignals = [
  ["Failure rate", "ask_response_failure increases across a rolling window."],
  ["Timeout fallback", "answer_mode=timeout_fallback rises above normal baseline."],
  ["Retrieval degradation", "retrieval_mode=vector_fallback or source_count=0 spikes."],
  ["Safety pressure", "category=public_safety_boundary volume rises unexpectedly."],
  ["Latency regression", "client latency or server_latency_ms breaches the 12s synthesis budget."]
] as const;
