import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const handoffPath = path.join(root, "CLAUDE_HANDOFF.md");
const packagePath = path.join(root, "package.json");
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

const handoff = fs.readFileSync(handoffPath, "utf8");
const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));

for (const required of [
  "# Claude Handoff for seri.ai",
  "Build and continuously maintain seri.ai / raviseri.com",
  "Ravikanth Seri -> Career -> Work -> Ideas -> Evidence -> Reusable Engineering Knowledge",
  "The person and the work must remain inseparable.",
  "Do not publish confidential employer product names",
  "Preserve the existing route architecture",
  "Codex owns implementation, integration, validation, repo hygiene",
  "Claude should act as adversarial editor, knowledge architect, technical brand strategist, and reviewer.",
  "Recommended Claude output format",
  "Keep",
  "Fix",
  "Replace with",
  "Why it matters",
  "Evidence needed",
  "Public-safety risk",
  "Codex work window: 10 PM to midnight local time unless Ravikanth confirms a different window.",
  "Use git as the source of truth.",
  "Never overwrite another agent's uncommitted work.",
  "Current Highest-Value Gaps",
  "Evidence Quality",
  "Overall Memorability",
  "Ask Ravi",
  "Reliability",
  "Visual Design",
  "Professional Representation",
  "Claude's Next Best Review",
  "Do not redesign the site.",
  "Do not add routes.",
  "Do not inflate claims.",
  "Do not invent private details.",
  "Codex Validation Gates",
  "npm run validate:content",
  "npm run validate:coherence",
  "npm run validate:routes",
  "npm run validate:links",
  "npm run validate:viewport",
  "npm run evals",
  "npm run typecheck",
  "npm run lint",
  "npm run scan:public-safety",
  "npm run build",
  "Handoff Checklist",
  "Latest commit hash.",
  "Whether the repo is clean and pushed.",
  "What remains unproven."
]) {
  expect(handoff.includes(required), `CLAUDE_HANDOFF.md missing required contract: ${required}`);
}

for (const banned of [
  "Ravikanth is a visionary",
  "Ravikanth is a thought leader",
  "Ravikanth is industry-leading",
  "Ravikanth is a pioneer",
  "private implementation details are okay",
  "skip validation",
  "rewrite the architecture"
]) {
  expect(!handoff.toLowerCase().includes(banned.toLowerCase()), `CLAUDE_HANDOFF.md contains banned collaboration language: ${banned}`);
}

expect(/`[a-f0-9]{7,40} [^`]+`/.test(handoff), "CLAUDE_HANDOFF.md must include a commit-shaped sync point.");
expect(pkg.scripts["validate:handoff"] === "node scripts/validate-agent-handoff.mjs", "package.json missing validate:handoff script");
expect(pkg.scripts.test.includes("validate:handoff"), "npm test must run validate:handoff");
expect(pkg.scripts.build.includes("validate:handoff"), "npm run build must run validate:handoff");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated Claude/Codex handoff contract.");
