import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

const doctrinePath = "content/wiki/operational-intelligence-canonical-doctrine.mdx";
const referencePath = "content/wiki/operational-intelligence-reference-architecture.mdx";
const evidencePath = "public/publication-pack/operational-intelligence-evidence-pack.md";
const comparisonPath = "public/publication-pack/operational-intelligence-comparison-tables.md";

const layers = [
  "Signal Layer",
  "Transaction Layer",
  "Topology Layer",
  "Evidence Layer",
  "Reasoning Layer",
  "Memory Layer",
  "Evaluation Layer",
  "Decision Layer",
  "Learning Layer",
  "Operator Layer"
];

const glossaryTerms = [
  "Operational Intelligence",
  "Transaction Intelligence",
  "Evidence Graph",
  "Hypothesis Lifecycle",
  "Replay Seed",
  "Evaluation Gate",
  "Operator Control Plane",
  "Operational Memory"
];

const adjacentDisciplines = [
  "observability",
  "AIOps",
  "AgentOps",
  "incident management",
  "SRE",
  "ITSM",
  "Knowledge graphs",
  "AI evaluation"
];

const claimClasses = ["Established", "Derived", "Original synthesis", "Unsupported"];
const requiredCitationHosts = [
  "sre.google",
  "opentelemetry.io",
  "csrc.nist.gov",
  "nist.gov",
  "w3.org",
  "doi.org",
  "github.com/openai/evals",
  "hai.stanford.edu"
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function expectIncludes(file, content, values) {
  for (const value of values) {
    if (!content.includes(value)) {
      errors.push(`${file}: missing "${value}"`);
    }
  }
}

function expectMatch(file, content, pattern, message) {
  if (!pattern.test(content)) {
    errors.push(`${file}: ${message}`);
  }
}

const doctrine = read(doctrinePath);
const reference = read(referencePath);
const evidence = read(evidencePath);
const comparison = read(comparisonPath);

expectIncludes(doctrinePath, doctrine, [
  "Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.",
  "Core problem.",
  "Adjacent domains.",
  "Foundational citations versus original contribution.",
  "Claim classification ledger.",
  "Ten-layer framework.",
  "Layer interactions.",
  "Synthetic case OI-ROOM-001.",
  "Observation, inference, confirmed fact.",
  "Glossary.",
  "Boundaries.",
  "Foundational bibliography.",
  "Preferred cross-references.",
  ...layers,
  ...glossaryTerms,
  ...adjacentDisciplines,
  ...claimClasses,
  ...requiredCitationHosts
]);

for (const layer of layers) {
  const escaped = layer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  expectMatch(
    doctrinePath,
    doctrine,
    new RegExp(`${escaped}[\\s\\S]*?Input:[\\s\\S]*?Output:[\\s\\S]*?Operator question:[\\s\\S]*?Failure mode:`),
    `${layer} must define input, output, operator question, and failure mode`
  );
}

const claimRows = doctrine.split("\n").filter((line) => line.startsWith("| ") && !line.includes("---"));
expect(claimRows.length >= 8, `${doctrinePath}: claim classification ledger should include at least 8 substantive rows`);
expectMatch(doctrinePath, doctrine, /what evidence supports a hypothesis[\s\S]*what remains unknown[\s\S]*what action requires review/i, "boundary between evidence, unknowns, and action review is not explicit enough");
expectMatch(doctrinePath, doctrine, /does not prove causality from sequence alone/i, "missing causality boundary");
expectMatch(doctrinePath, doctrine, /does not justify autonomous production changes without approval/i, "missing autonomous-action boundary");
expectMatch(doctrinePath, doctrine, /does not ingest confidential employer material/i, "missing public-safe ingestion boundary");

expectIncludes(referencePath, reference, [
  "Publication status: Draft for Technical Review, not Final Standard.",
  "implementation-neutral contracts",
  "two independent engineering teams can build substantially similar systems",
  "minimum architectural invariant",
  "Every consequential action needs approval boundaries",
  "Relationship to the doctrine",
  "Relationship to Ask Ravikanth"
]);

expectIncludes(evidencePath, evidence, [
  "Falsification Criteria",
  "Minimum Conformance Checklist",
  "Control Comparisons",
  "Evidence Ledger Template",
  "Current Evidence Ledger",
  "The current public Operations Room should be treated as a synthetic conformance example, not production evidence."
]);

expectIncludes(comparisonPath, comparison, [
  "Adjacent Discipline Comparison",
  "Claim Classification",
  "Conformance Levels",
  "Observability",
  "AIOps",
  "AgentOps",
  "ITSM",
  "Knowledge Graphs",
  "AI Evaluation"
]);

function expect(condition, message) {
  if (!condition) errors.push(message);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated doctrine quality: definitions, boundaries, layers, claims, glossary, citations, evidence posture, and reference handoff.");
