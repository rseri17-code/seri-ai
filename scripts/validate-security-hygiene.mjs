import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function gitLines(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" })
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

const trackedFiles = gitLines(["ls-files"]);
const trackedEnvFiles = trackedFiles.filter((file) => /^\.env(?:\.|$)/.test(file) && file !== ".env.example");
expect(trackedEnvFiles.length === 0, `Tracked runtime env files are not allowed: ${trackedEnvFiles.join(", ")}`);

const gitignore = fs.readFileSync(path.join(root, ".gitignore"), "utf8");
for (const required of [".env", ".env.local"]) {
  expect(gitignore.split("\n").map((line) => line.trim()).includes(required), `.gitignore must include ${required}`);
}

const envExample = fs.readFileSync(path.join(root, ".env.example"), "utf8");
for (const line of envExample.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...valueParts] = trimmed.split("=");
  const value = valueParts.join("=").trim();
  const isPublic = key.startsWith("NEXT_PUBLIC_");
  const allowedPlaceholder = value === "" || ["openai", "change-me"].includes(value) || /^https?:\/\//.test(value) || /^gpt-|^text-embedding-|^claude-/.test(value);
  expect(isPublic || allowedPlaceholder, `.env.example should not contain a real-looking value for ${key}`);
}

const textFiles = trackedFiles.filter((file) => /\.(?:ts|tsx|js|mjs|json|md|mdx|txt|sql|yml|yaml|toml|example)$/.test(file));
const secretPatterns = [
  ["OpenAI API key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{24,}\b/],
  ["Anthropic API key", /\bsk-ant-[A-Za-z0-9_-]{24,}\b/],
  ["PostHog project key", /\bphc_[A-Za-z0-9]{20,}\b/],
  ["Private key block", /-----BEGIN (?:RSA |EC |OPENSSH |)?PRIVATE KEY-----/],
  ["Supabase JWT", /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/],
  ["Bearer token literal", /\bBearer\s+[A-Za-z0-9._-]{24,}\b/i]
];

for (const file of textFiles) {
  const absolute = path.join(root, file);
  const content = fs.readFileSync(absolute, "utf8");
  for (const [label, pattern] of secretPatterns) {
    if (pattern.test(content)) {
      errors.push(`${file}: contains ${label}-shaped secret material`);
    }
  }
}

const operationsRunbook = fs.readFileSync(path.join(root, "OPERATIONS_RUNBOOK.md"), "utf8");
for (const required of ["Secret Hygiene", "npm run validate:security"]) {
  expect(operationsRunbook.includes(required), `OPERATIONS_RUNBOOK.md missing security hygiene guidance: ${required}`);
}
expect(/Do not commit runtime `?\.env`? files/.test(operationsRunbook), "OPERATIONS_RUNBOOK.md missing security hygiene guidance: Do not commit runtime .env files");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated security hygiene across ${trackedFiles.length} tracked files and ${textFiles.length} text-like files.`);
