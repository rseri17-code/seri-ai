import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const expectedEvents = [
  "homepage_cta_click",
  "framework_layer_select",
  "operations_room_guided_start",
  "operations_room_guided_completion",
  "ask_question_submit",
  "ask_response_success",
  "ask_response_failure",
  "source_link_click",
  "work_page_visit",
  "background_page_visit",
  "resume_download",
  "contact_initiation",
  "beta_feedback_submit",
  "profile_link_click"
];

const safeMetadataHints = [
  "category",
  "mode",
  "route",
  "latency_ms",
  "server_latency_ms",
  "source_count",
  "answer_mode",
  "retrieval_mode",
  "case_id",
  "scenario",
  "visitor_type",
  "success",
  "topic",
  "destination",
  "placement"
];

const forbiddenAnalyticsFragments = [
  "searchParams",
  "$current_url: `${pathname}",
  "capture_pageview: true",
  "autocapture: true",
  "disable_session_recording: false"
];

const forbiddenEventPropertyKeyPattern = /(?:^|[,{]\s*)(prompt|question|message|email|name|contact|clear|confusing|memorable|missing)\s*:/i;

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(dir) {
  return fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(relative);
    return relative;
  });
}

const sourceFiles = [...walk("app"), ...walk("components"), ...walk("lib")]
  .filter((file) => /\.(tsx?|mts|mjs)$/.test(file))
  .filter((file) => !file.includes(".next"));

const source = sourceFiles.map((file) => read(file)).join("\n");
const instrumentationSource = sourceFiles.filter((file) => file !== "lib/analytics-events.ts").map((file) => read(file)).join("\n");
const analyticsEventsSource = read("lib/analytics-events.ts");
const analyticsComponentSource = read("components/analytics.tsx");
const askObservabilitySource = read("lib/ask-observability.ts");
const adminSource = read("app/admin/page.tsx");

for (const event of expectedEvents) {
  if (!analyticsEventsSource.includes(`"${event}"`)) {
    errors.push(`lib/analytics-events.ts: safeAnalyticsEvents missing "${event}"`);
  }
  if (!source.includes(`"${event}"`)) {
    errors.push(`source: no instrumentation found for "${event}"`);
  }
}

for (const hint of safeMetadataHints) {
  if (!source.includes(hint)) {
    errors.push(`analytics metadata: missing safe metadata hint "${hint}"`);
  }
}

for (const fragment of forbiddenAnalyticsFragments) {
  if (analyticsComponentSource.includes(fragment)) {
    errors.push(`components/analytics.tsx: forbidden privacy fragment "${fragment}"`);
  }
}

for (const required of ["capture_pageview: false", "autocapture: false", "disable_session_recording: true", "$current_url: pathname"]) {
  if (!analyticsComponentSource.includes(required)) {
    errors.push(`components/analytics.tsx: missing "${required}"`);
  }
}

const captureCalls = [...instrumentationSource.matchAll(/captureSafeEvent\(([\s\S]*?)\);/g)].map((match) => match[1]);
for (const call of captureCalls) {
  if (forbiddenEventPropertyKeyPattern.test(call)) {
    errors.push(`analytics call captures forbidden raw-field property: ${call.replace(/\s+/g, " ").slice(0, 180)}`);
  }
}

if (!analyticsEventsSource.includes("sanitizeEventProperties")) {
  errors.push("lib/analytics-events.ts: missing sanitizeEventProperties");
}

if (!analyticsEventsSource.includes("safeAnalyticsEvents")) {
  errors.push("lib/analytics-events.ts: missing safeAnalyticsEvents allowlist");
}

for (const required of [
  "askSafeMetadataFields",
  "askBlockedMetadataFields",
  "askOperationalModes",
  "askSloTargets",
  "askAlertSignals",
  "latency_ms",
  "server_latency_ms",
  "answer_mode",
  "retrieval_mode",
  "source_count",
  "prompt",
  "question",
  "message",
  "email",
  "contact"
]) {
  if (!askObservabilitySource.includes(required)) {
    errors.push(`lib/ask-observability.ts: missing observability contract term "${required}"`);
  }
}

for (const required of [
  "Ask Ravi observability contract",
  "metadata-only",
  "askSafeMetadataFields",
  "askBlockedMetadataFields",
  "askSloTargets",
  "askAlertSignals"
]) {
  if (!adminSource.includes(required)) {
    errors.push(`app/admin/page.tsx: missing Ask observability dashboard contract "${required}"`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated privacy-safe analytics contract across ${expectedEvents.length} required events.`);
