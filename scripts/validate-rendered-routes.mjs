import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const serverAppDir = path.join(root, ".next", "server", "app");
const siteUrl = "https://seri.ai";
const errors = [];

const routeContracts = [
  {
    route: "/",
    file: "index.html",
    maxBytes: 210_000,
    required: [
      "Operations should explain themselves before AI acts.",
      "Ravikanth Seri",
      "Ravikanth Seri / Operational Intelligence",
      "preserve context",
      "separate evidence from inference",
      "keep human judgment in control",
      "The work is inspectable without private systems",
      "Field origin",
      "the team is rebuilding who owns this,",
      "Begin with the thesis",
      "Open the Operations Room",
      "Visitor Proof Map",
      "Decision packet preview",
      "The posts converge on one enterprise failure mode"
    ],
    before: [
      ["Begin with the thesis", "Open the Operations Room"],
      ["Begin with the thesis", "The work is inspectable without private systems"],
      ["Open the Operations Room", "The work is inspectable without private systems"],
      ["Begin with the thesis", "Field origin"],
      ["Open the Operations Room", "Field origin"]
    ]
  },
  {
    route: "/start-here",
    file: "start-here.html",
    maxBytes: 190_000,
    required: [
      "Choose the path that matches why you came.",
      "3-minute orientation",
      "Ravikanth Seri, explained through the work.",
      "Public-safe boundary",
      "First read in order",
      "10-minute proof route",
      "A serious visitor should leave with a defensible read.",
      "Establish the operator",
      "Inspect the operating record",
      "Challenge the claim",
      "Who is Ravikanth Seri?",
      "What has he built?",
      "What is he building now?",
      "How has his career evolved?",
      "Visitor proof map",
      "Serious technical review path"
    ],
    before: [
      ["3-minute orientation", "First read in order"],
      ["First read in order", "10-minute proof route"],
      ["10-minute proof route", "Serious technical review path"],
      ["Serious technical review path", "Visitor proof map"]
    ]
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
    maxBytes: 195_000,
    required: [
      "The operating record behind Operational Intelligence",
      "Operating arc",
      "Architecture judgment",
      "The operating taste is visible in the constraints he chooses to preserve.",
      "Start with operational evidence before model reasoning.",
      "Treat AI action as governed execution, not autonomous heroics.",
      "Inspect the public engineering signal without over-reading it",
      "Sentinalai",
      "Do not claim production adoption, private deployment details, internal integrations, repository metrics, or code behavior that is not visible in public source.",
      "GitHub",
      "LinkedIn",
      "Public proof"
    ]
  },
  {
    route: "/background",
    file: "background.html",
    maxBytes: 150_000,
    required: [
      "The operating background behind the Operational Intelligence thesis",
      "What the career arc trained him to protect.",
      "Preserved constraint",
      "Ravikanth Seri",
      "Operational Intelligence",
      "public-safe"
    ]
  },
  {
    route: "/resume",
    file: "resume.html",
    maxBytes: 180_000,
    required: [
      "Architecture judgment ledger",
      "The resume evidence is strongest when it shows which constraints Ravikanth preserves while designing AI-native operational systems.",
      "Public code inspection path",
      "Public repositories are treated as inspectable signal, not as a substitute for private production evidence.",
      "Sentinalai",
      "Start with operational evidence before model reasoning.",
      "Make replay and evaluation first-class architecture surfaces.",
      "Impact ledger",
      "Capability evidence matrix"
    ],
    before: [["Architecture judgment ledger", "Strengths"]]
  },
  {
    route: "/now",
    file: "now.html",
    maxBytes: 175_000,
    required: [
      "What Ravikanth is actively building and thinking through.",
      "Research ledger",
      "What Ravikanth is trying to prove next.",
      "Can operational agents preserve evidence quality under incident pressure?",
      "What is the minimum replay record required before an AI recommendation is trusted?",
      "Can transaction journeys become the shared unit of AI-native operations?",
      "Where should human approval sit in governed operational AI?",
      "Would change the model",
      "Builder ledger",
      "Proof loop"
    ],
    before: [
      ["Research ledger", "Builder ledger"],
      ["Builder ledger", "Proof loop"]
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

function metadataContent(html, selector) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<(?:meta|link)[^>]+${escapedSelector}[^>]+>`, "i");
  const tag = html.match(pattern)?.[0] ?? "";
  return tag.match(/(?:href|content)="([^"]+)"/)?.[1] ?? "";
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
    const canonicalPath = contract.canonicalPath ?? contract.route;
    const expectedCanonical = canonicalPath === "/" ? siteUrl : `${siteUrl}${canonicalPath}`;
    const canonical = metadataContent(raw, `rel="canonical"`);
    const ogUrl = metadataContent(raw, `property="og:url"`);
    expect(size <= contract.maxBytes, `${contract.route}: rendered HTML is ${size} bytes, above ${contract.maxBytes} byte budget`);
    expect(canonical === expectedCanonical, `${contract.route}: expected canonical ${expectedCanonical}, found ${canonical || "none"}`);
    expect(ogUrl === expectedCanonical, `${contract.route}: expected og:url ${expectedCanonical}, found ${ogUrl || "none"}`);

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
