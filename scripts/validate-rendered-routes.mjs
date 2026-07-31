import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const serverAppDir = path.join(root, ".next", "server", "app");
const errors = [];

const routeContracts = [
  {
    route: "/",
    file: "index.html",
    maxBytes: 210_000,
    required: [
      "Operations should explain themselves before AI acts.",
      "Ravikanth Seri",
      "Run OI-ROOM-001",
      "Decision packet preview",
      "The posts converge on one enterprise failure mode"
    ],
    before: [["Run OI-ROOM-001", "The material is public-safe by design"]]
  },
  {
    route: "/radar",
    file: "radar.html",
    maxBytes: 130_000,
    required: [
      "Operational Intelligence Thesis Radar",
      "Thesis spine",
      "Enterprise Context Layer",
      "Context Acquisition Tax",
      "Harness over model",
      "Shared operational reasoning",
      "Public thought process",
      "Evidence posture"
    ],
    before: [
      ["Thesis spine", "Public thought process"],
      ["Public thought process", "Market signals"]
    ]
  },
  {
    route: "/investigation-room",
    file: "investigation-room.html",
    maxBytes: 260_000,
    required: [
      "Operations Room for evidence-backed decisions",
      "Live investigation graph",
      "Evidence taxonomy",
      "Accessible graph summary",
      "Operator question",
      "Human approval required"
    ],
    before: [["Live investigation graph", "Decision packet"]]
  },
  {
    route: "/work",
    file: "work.html",
    maxBytes: 180_000,
    required: [
      "The operating record behind Operational Intelligence",
      "Operating arc",
      "GitHub",
      "LinkedIn",
      "Public proof"
    ]
  },
  {
    route: "/background",
    file: "background.html",
    maxBytes: 140_000,
    required: [
      "The operating background behind the Operational Intelligence thesis",
      "Ravikanth Seri",
      "Operational Intelligence",
      "public-safe"
    ]
  },
  {
    route: "/wiki/operational-intelligence-canonical-doctrine",
    file: "wiki/operational-intelligence-canonical-doctrine.html",
    maxBytes: 260_000,
    required: [
      "Operational Intelligence Canonical Doctrine",
      "Operational Intelligence is not a replacement",
      "Ten-layer framework",
      "OI-ROOM-001",
      "Glossary"
    ]
  },
  {
    route: "/ideas/oi-room-001-control-comparison",
    file: "ideas/oi-room-001-control-comparison.html",
    maxBytes: 220_000,
    required: [
      "OI-ROOM-001 Control Comparison",
      "Reviewer worksheet",
      "Scoring dimensions",
      "Falsification checks",
      "Dashboard-only",
      "Chatbot-only",
      "Ticket-only"
    ],
    before: [["Reviewer worksheet", "Version history"]]
  }
];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function htmlText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

if (!fs.existsSync(serverAppDir)) {
  errors.push(".next/server/app is missing. Run next build before rendered-route validation.");
} else {
  for (const contract of routeContracts) {
    const file = path.join(serverAppDir, contract.file);
    expect(fs.existsSync(file), `${contract.route}: missing prerendered artifact ${path.relative(root, file)}`);
    if (!fs.existsSync(file)) {
      continue;
    }

    const raw = fs.readFileSync(file, "utf8");
    const text = htmlText(raw);
    const size = fs.statSync(file).size;
    expect(size <= contract.maxBytes, `${contract.route}: rendered HTML is ${size} bytes, above ${contract.maxBytes} byte budget`);

    for (const required of contract.required) {
      expect(text.includes(required), `${contract.route}: rendered HTML missing "${required}"`);
    }

    for (const [first, second] of contract.before ?? []) {
      const firstIndex = text.indexOf(first);
      const secondIndex = text.indexOf(second);
      expect(firstIndex >= 0 && secondIndex >= 0 && firstIndex < secondIndex, `${contract.route}: expected "${first}" to appear before "${second}"`);
    }

    for (const banned of [
      "This assistant should answer in Ravikanth",
      "demo version",
      "Lorem ipsum",
      "TODO:",
      "FIXME:"
    ]) {
      expect(!text.includes(banned), `${contract.route}: rendered HTML contains banned placeholder or defensive copy "${banned}"`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated rendered production contracts for ${routeContracts.length} critical routes.`);
