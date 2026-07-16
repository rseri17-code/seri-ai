import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [];
const errors = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full);
    } else if (/\.(ts|tsx|md|mdx|json|txt)$/.test(entry.name)) {
      files.push(full);
    }
  }
}

walk(root);

const allowedGuardrail = /(do not|no |avoid|refuse|public-safe|outside the public-safe|must not|without exposing|excludes confidential|guardrail|boundary|compliance|can't discuss|cannot discuss|without leaking|without naming|not contain|private system details|public resume language|give me exact private)/i;
const riskyPatterns = [
  /\binternal\s+(employer\s+)?(product|platform|project|system|tool|dashboard|log|screenshot|incident|metric|architecture)\b/i,
  /\bproprietary\s+(project|platform|system|tool|architecture|implementation)\b/i,
  /\bconfidential\s+(project|platform|system|tool|architecture|implementation|incident|metric|detail)\b/i,
  /\bprivate\s+(repository|service|platform|system|dashboard|log|architecture|implementation)\b/i,
  /\bfake\s+(live\s+)?data\b/i,
  /\b(invented|fabricated)\s+(testimonial|adoption|outcome|metric|user)\b/i
];

for (const file of files) {
  const relative = path.relative(root, file);
  if (relative.startsWith("PUBLIC_RELEASE_SAFETY_REPORT") || relative.startsWith("CONSOLIDATION_AUDIT")) continue;
  const lines = fs.readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    if (allowedGuardrail.test(line)) return;
    for (const pattern of riskyPatterns) {
      if (pattern.test(line)) {
        errors.push(`${relative}:${index + 1}: ${line.trim()}`);
      }
    }
  });
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Public-safety scan passed across ${files.length} files.`);
