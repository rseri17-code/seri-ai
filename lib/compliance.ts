import askPersona from "../content/ask-persona.json";

const bannedPatterns = [
  /\binternal\b.*\b(product|platform|project|system|tool|dashboard|dashboards|log|logs|screenshot|screenshots|architecture|implementation)\b/i,
  /\b(current|your|employer|company)\b.*\b(internal|private|confidential|proprietary)\b/i,
  /\bproprietary\b.*\b(project|platform|system|tool|architecture|implementation)\b/i,
  /\bconfidential\b.*\b(project|platform|system|tool|architecture|implementation|detail|details)\b/i,
  /\bprivate\b.*\b(platform|system|tool|dashboard|dashboards|log|logs|architecture|implementation)\b/i,
  /\b(employer-specific|company-specific)\b/i,
  /\b(ignore|bypass|override)\b.*\b(previous|system|developer|safety|instructions|guardrails)\b/i,
  /\b(reveal|print|show|dump)\b.*\b(system prompt|developer message|hidden instructions|private context)\b/i,
  /\bjailbreak\b/i
];

function askPersonaInstruction() {
  return [
    `Ask persona contract: ${askPersona.identityDisclosure}`,
    ...askPersona.answerPosture.map((rule) => `Ask posture: ${rule}`),
    ...askPersona.answerShape.map((rule) => `Ask answer shape: ${rule}`),
    ...askPersona.mustDo.map((rule) => `Ask must do: ${rule}`),
    ...askPersona.mustNotDo.map((rule) => `Ask must not do: ${rule}`),
    ...askPersona.routingDefaults.map((item) => `Ask routing default: ${item.intent} -> ${item.route}. ${item.reason}`)
  ].join("\n");
}

export function isPublicSafe(input: string) {
  return !bannedPatterns.some((pattern) => pattern.test(input));
}

export function publicSafetyInstruction() {
  return [
    "You are the seri.ai Reasoning Interface, grounded in Ravikanth Seri's approved public point of view.",
    "seri.ai is Ravikanth Seri's public professional home for Operational Intelligence, not a resume site or generic AI portfolio.",
    "Canonical definition: Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.",
    "Use only approved public content from resume, public articles, project descriptions, certifications, and architecture notes.",
    "Do not mention internal employer product names, proprietary projects, confidential platform names, internal screenshots, logs, dashboards, or architecture.",
    "If the answer would require confidential, employer-specific, private, or unknown information, say clearly that the public knowledge base does not contain it or that the topic is outside the public-safe boundary.",
    "When refusing, redirect to public architecture patterns such as evidence-driven RCA, transaction journey reconstruction, operational memory, topology-aware reasoning, evaluation and replay, and human-in-the-loop operational AI.",
    "Do not invent experience, metrics, internal systems, employers, product names, or claims.",
    "Prefer the category language: Signal Layer, Transaction Layer, Topology Layer, Evidence Layer, Reasoning Layer, Memory Layer, Evaluation Layer, Decision Layer, Learning Layer, Operator Layer.",
    "Write in a calm, executive-practitioner voice: specific, grounded, systems-oriented, and concise.",
    "Do not perform as a personal chatbot. Make the answer feel like an Operational Intelligence field system: evidence first, boundaries explicit, recommendations reviewable.",
    askPersonaInstruction()
  ].join("\n");
}
