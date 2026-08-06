import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const { buildPublishingIndex, getShareableReferenceRoutes } = jiti("../lib/publishing.ts");
const sitemap = jiti("../app/sitemap.ts").default;

const errors = [];

const referenceLinks = [
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/investigation-room"
];

const markdownAssets = [
  {
    file: "public/publication-pack/operational-intelligence-diagrams.md",
    route: "/publication-pack/operational-intelligence-diagrams.md",
    minWords: 450,
    required: [
      "Architecture Diagram",
      "stateDiagram-v2",
      "sequenceDiagram",
      "Evidence Graph Diagram",
      "Replay and Learning Loop"
    ]
  },
  {
    file: "public/publication-pack/operational-intelligence-comparison-tables.md",
    route: "/publication-pack/operational-intelligence-comparison-tables.md",
    minWords: 450,
    required: [
      "Adjacent Discipline Comparison",
      "Claim Classification",
      "Conformance Levels",
      "Established",
      "Original",
      "Unsupported"
    ]
  },
  {
    file: "public/publication-pack/decision-packet-example.md",
    route: "/publication-pack/decision-packet-example.md",
    minWords: 250,
    required: [
      "Decision Packet",
      "Approval class",
      "Contradictory evidence",
      "Missing evidence",
      "MUST NOT execute"
    ]
  },
  {
    file: "public/publication-pack/oi-room-001-printable-walkthrough.md",
    route: "/publication-pack/oi-room-001-printable-walkthrough.md",
    minWords: 450,
    required: [
      "Transaction Hops",
      "Evidence Table",
      "Hypothesis Table",
      "Evaluation Gates",
      "Operator Decision"
    ]
  },
  {
    file: "public/publication-pack/operational-intelligence-executive-summary.md",
    route: "/publication-pack/operational-intelligence-executive-summary.md",
    minWords: 230,
    required: [
      "reasoning layer between enterprise telemetry and human decision",
      "Signal, Transaction, Topology, Evidence, Reasoning, Memory, Evaluation, Decision, Learning, and Operator",
      "does not replace observability",
      "evidence before conclusions"
    ]
  },
  {
    file: "public/publication-pack/operational-intelligence-glossary-card.md",
    route: "/publication-pack/operational-intelligence-glossary-card.md",
    minWords: 220,
    required: [
      "Operational Intelligence",
      "Transaction Intelligence",
      "Evidence Graph",
      "Replay Seed",
      "Evaluation Gate",
      "Operator Control Plane",
      "Operational Memory"
    ]
  },
  {
    file: "public/publication-pack/operational-intelligence-evidence-pack.md",
    route: "/publication-pack/operational-intelligence-evidence-pack.md",
    minWords: 1_700,
    required: [
      "OI-ROOM-001 Benchmark Rubric",
      "Version Discipline",
      "Future v1.x changes should be incremental, evidence-based, and backward-compatible",
      "Control Comparisons",
      "OI-ROOM-001 Control Comparison Protocol",
      "Reviewer-Run Worksheet",
      "Evidence Ledger Entry",
      "Do not publish one aggregate score.",
      "Minimum Conformance Checklist",
      "Falsification Criteria",
      "Structured practitioner review path: /contact"
    ]
  },
  {
    file: "public/publication-pack/operational-intelligence-conformance-profile.md",
    route: "/publication-pack/operational-intelligence-conformance-profile.md",
    minWords: 1_000,
    required: [
      "Conformance Rule",
      "Required Object Profiles",
      "Evidence Object",
      "Hypothesis State",
      "Replay Seed",
      "Evaluation Gate",
      "Decision Packet",
      "Minimum Conformance Levels",
      "OI-ROOM-001 Conformance Example",
      "Practitioner Review Questions",
      "If any consequential action can be recommended without a decision packet, the implementation is non-conformant."
    ]
  }
];

const pdfAssets = [
  { file: "public/downloads/operational-intelligence-executive-summary.pdf", minBytes: 3_000 },
  { file: "public/downloads/operational-intelligence-glossary-card.pdf", minBytes: 3_000 },
  { file: "public/downloads/oi-room-001-printable-walkthrough.pdf", minBytes: 4_500 },
  { file: "public/downloads/operational-intelligence-publication-pack.pdf", minBytes: 7_500 },
  { file: "public/downloads/operational-intelligence-evidence-pack.pdf", minBytes: 9_000 }
];

function read(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    errors.push(`${file}: missing`);
    return "";
  }
  return fs.readFileSync(full, "utf8");
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function assertIncludes(file, content, values) {
  for (const value of values) {
    if (!content.includes(value)) {
      errors.push(`${file}: missing "${value}"`);
    }
  }
}

const shareableRoutes = new Set(getShareableReferenceRoutes());
const publishingUrls = new Set(buildPublishingIndex().map((asset) => asset.url));
const sitemapUrls = new Set(sitemap().map((entry) => new URL(entry.url).pathname));

for (const asset of markdownAssets) {
  const content = read(asset.file);
  if (!content) continue;

  if (wordCount(content) < asset.minWords) {
    errors.push(`${asset.file}: ${wordCount(content)} words, expected at least ${asset.minWords}`);
  }

  assertIncludes(asset.file, content, ["Version:", "Status:", "Updated:", "## Related References", ...referenceLinks, ...asset.required]);

  if (!shareableRoutes.has(asset.route)) {
    errors.push(`${asset.route}: missing from getShareableReferenceRoutes()`);
  }
  if (!publishingUrls.has(asset.route)) {
    errors.push(`${asset.route}: missing from buildPublishingIndex()`);
  }
  if (!sitemapUrls.has(asset.route)) {
    errors.push(`${asset.route}: missing from sitemap()`);
  }
}

for (const asset of pdfAssets) {
  const { file, minBytes } = asset;
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    errors.push(`${file}: missing`);
    continue;
  }
  const buffer = fs.readFileSync(full);
  if (buffer.length < minBytes) {
    errors.push(`${file}: ${buffer.length} bytes, expected at least ${minBytes} bytes`);
  }
  if (!buffer.subarray(0, 4).equals(Buffer.from("%PDF"))) {
    errors.push(`${file}: does not start with a PDF header`);
  }

  const route = `/${file.replace(/^public\//, "")}`;
  if (!shareableRoutes.has(route)) {
    errors.push(`${route}: missing from getShareableReferenceRoutes()`);
  }
  if (!sitemapUrls.has(route)) {
    errors.push(`${route}: missing from sitemap()`);
  }
}

const pdfGenerator = read("scripts/generate-publication-pdfs.py");
assertIncludes("scripts/generate-publication-pdfs.py", pdfGenerator, [
  "def flow_diagram",
  "def evidence_graph_visual",
  "def review_packet_visual",
  "Control Comparison Template",
  "Practitioner Review Rubric"
]);

const publicationPack = read("content/wiki/operational-intelligence-publication-pack.mdx");
assertIncludes("content/wiki/operational-intelligence-publication-pack.mdx", publicationPack, [
  "Reference asset matrix",
  "PDF exports are available for sharing",
  ...markdownAssets.map((asset) => asset.route),
  ...pdfAssets.map((asset) => `/${asset.file.replace(/^public\//, "")}`)
]);

const doctrine = read("content/wiki/operational-intelligence-canonical-doctrine.mdx");
assertIncludes("content/wiki/operational-intelligence-canonical-doctrine.mdx", doctrine, [
  "Reviewer packet",
  "Shareable exports",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/investigation-room",
  "/publication-pack/operational-intelligence-executive-summary.md",
  "/publication-pack/operational-intelligence-glossary-card.md",
  "/publication-pack/oi-room-001-printable-walkthrough.md",
  "/downloads/operational-intelligence-executive-summary.pdf",
  "/downloads/operational-intelligence-glossary-card.pdf",
  "/downloads/oi-room-001-printable-walkthrough.pdf",
  "/downloads/operational-intelligence-publication-pack.pdf"
]);

const referenceArchitecture = read("content/wiki/operational-intelligence-reference-architecture.mdx");
assertIncludes("content/wiki/operational-intelligence-reference-architecture.mdx", referenceArchitecture, [
  "Reviewer packet",
  "Shareable exports",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/investigation-room",
  "/publication-pack/operational-intelligence-diagrams.md",
  "/publication-pack/operational-intelligence-comparison-tables.md",
  "/publication-pack/operational-intelligence-conformance-profile.md",
  "/publication-pack/decision-packet-example.md",
  "/publication-pack/oi-room-001-printable-walkthrough.md",
  "/downloads/oi-room-001-printable-walkthrough.pdf",
  "/downloads/operational-intelligence-publication-pack.pdf"
]);

const operationsRoomPage = read("app/investigation-room/page.tsx");
assertIncludes("app/investigation-room/page.tsx", operationsRoomPage, [
  "const caseAskPrompt",
  "Explain the OI-ROOM-001 case using the Operational Intelligence layers.",
  "/ask?prompt=",
  "encodeURIComponent(caseAskPrompt)",
  "/wiki/operational-intelligence-publication-pack",
  "/downloads/oi-room-001-printable-walkthrough.pdf",
  "Review packet",
  "Walkthrough PDF"
]);

const operationsRoomWorkbench = read("app/simulator/simulator.tsx");
assertIncludes("app/simulator/simulator.tsx", operationsRoomWorkbench, [
  "const decisionPacketRows",
  "const evidenceTaxonomy",
  "Evidence taxonomy",
  "Observation",
  "Inference",
  "Contradiction",
  "Missing evidence",
  "Confirmed fact",
  "refuses to collapse facts, interpretations, gaps, and contradictions",
  "Operator review contract",
  "Packet state",
  "Approval class",
  "Reversible operational change",
  "Required owner",
  "Authorized service owner or incident commander",
  "Action boundary",
  "Active receipts",
  "Explicit unknowns",
  "No execution",
  "Blocked by policy",
  "More evidence needed",
  "Approval required"
]);

const artifactsPage = read("app/artifacts/page.tsx");
assertIncludes("app/artifacts/page.tsx", artifactsPage, [
  "const downloadableArtifacts",
  "const reviewerSharePackets",
  "Downloadable artifacts",
  "Reviewer share packets",
  "Executive reviewer",
  "Systems architect",
  "SRE or operations reviewer",
  "AI governance reviewer",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/wiki/operational-intelligence-reference-architecture",
  "/publication-pack/operational-intelligence-diagrams.md",
  "/publication-pack/decision-packet-example.md",
  "/publication-pack/oi-room-001-printable-walkthrough.md",
  "/downloads/operational-intelligence-executive-summary.pdf",
  "/downloads/operational-intelligence-publication-pack.pdf",
  "/downloads/operational-intelligence-evidence-pack.pdf",
  "/downloads/oi-room-001-printable-walkthrough.pdf"
]);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${markdownAssets.length} reference Markdown assets and ${pdfAssets.length} PDF exports.`);
