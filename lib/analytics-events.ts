"use client";

type SafeEventProperties = Record<string, string | number | boolean | null | undefined>;

export const safeAnalyticsEvents = [
  "ask_question_submit",
  "ask_response_success",
  "ask_response_failure",
  "background_page_visit",
  "beta_feedback_submit",
  "beta_feedback_toggle",
  "contact_initiation",
  "contact_submit_result",
  "framework_layer_select",
  "homepage_cta_click",
  "operations_room_expert_mode",
  "operations_room_guided_completion",
  "operations_room_guided_start",
  "practitioner_review_submit",
  "profile_link_click",
  "resume_download",
  "source_link_click",
  "work_page_visit"
] as const;

const blockedPropertyPatterns = [/prompt/i, /question/i, /message/i, /email/i, /name/i, /contact/i, /clear/i, /confusing/i, /memorable/i, /missing/i];

function sanitizeEventProperties(properties: SafeEventProperties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => {
      if (value === undefined) return false;
      return !blockedPropertyPatterns.some((pattern) => pattern.test(key));
    })
  );
}

export function captureSafeEvent(name: string, properties: SafeEventProperties = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (!(safeAnalyticsEvents as readonly string[]).includes(name)) {
    return;
  }

  void import("posthog-js").then(({ default: posthog }) => {
    if (!posthog.__loaded) {
      return;
    }

    posthog.capture(name, {
      ...sanitizeEventProperties(properties),
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
