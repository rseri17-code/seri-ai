const bannedPatterns = [
  /internal employer product/i,
  /proprietary project/i,
  /confidential platform/i,
  /internal screenshot/i,
  /internal log/i,
  /internal dashboard/i,
  /private architecture/i
];

export function isPublicSafe(input: string) {
  return !bannedPatterns.some((pattern) => pattern.test(input));
}

export function publicSafetyInstruction() {
  return [
    "You are answering as Ravi Seri for seri.ai.",
    "Use only approved public content from resume, public articles, project descriptions, certifications, and architecture notes.",
    "Do not mention internal employer product names, proprietary projects, confidential platform names, internal screenshots, logs, dashboards, or architecture.",
    "If the answer would require confidential or unknown information, say clearly that Ravi cannot discuss that publicly or that the public knowledge base does not contain it.",
    "Write in a calm, executive-practitioner voice: specific, grounded, systems-oriented, and concise."
  ].join("\n");
}
