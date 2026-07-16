"use client";

type SafeEventProperties = Record<string, string | number | boolean | null | undefined>;

export function captureSafeEvent(name: string, properties: SafeEventProperties = {}) {
  if (typeof window === "undefined") {
    return;
  }

  void import("posthog-js").then(({ default: posthog }) => {
    if (!posthog.__loaded) {
      return;
    }

    posthog.capture(name, {
      ...properties,
      captured_at_route: window.location.pathname
    });
  });
}

export function categorizeQuestion(question: string) {
  const lower = question.toLowerCase();
  if (/confidential|internal|private|proprietary|dashboard|logs?|screenshots?/.test(lower)) return "public_safety_boundary";
  if (/observability|telemetry|metric|trace|alert|signal/.test(lower)) return "observability";
  if (/aiops|agent|sre|incident/.test(lower)) return "aiops_agentic_sre";
  if (/transaction|journey|workflow|latency/.test(lower)) return "transaction_intelligence";
  if (/evidence|citation|source|graph|hypothesis|rca/.test(lower)) return "evidence_reasoning";
  if (/eval|evaluation|gate|trust|quality/.test(lower)) return "evaluation";
  if (/resume|background|work|experience|certification/.test(lower)) return "background";
  return "general";
}
