import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const serverAppDir = path.join(root, ".next", "server", "app");
const siteUrl = "https://seri-ai.vercel.app";
const errors = [];

const routeContracts = [
  {
    route: "/",
    file: "index.html",
    maxBytes: 210_000,
    // Repointed 2026-08-30 for the homepage redesign. Rendered-HTML assertions for the seven
    // ruled sections, checked against the built page rather than the source.
    required: [
      "I build evidence-grounded AI systems for enterprise operations.",
      "Ravikanth Seri",
      "Production AI systems",
      "enterprise SRE investigation",
      "Enter the Operations Room",
      "Explore the body of work",
      "misfire because they lack intelligence",
      "the Authorized Misfire",
      "rebuild what is happening now",
      "show how the findings connect",
      "keep the unknowns visible",
      "The Operations Room",
      "OI-ROOM-001",
      "Three bodies of work.",
      // Repointed 2026-08-30: the five-stage arc became a one-sentence bridge; /background owns it.
      "Fifteen years across enterprise integration",
      "Four arguments worth disagreeing with.",
      "Start a conversation",
      "That system stays private"
    ],
    before: [
      // A mobile visitor reaches an action before the page starts explaining itself.
      ["Enter the Operations Room", "The failure I design against"],
      ["Explore the body of work", "The failure I design against"],
      ["Enter the Operations Room", "Fifteen years across enterprise integration"],
      // Ruled section order, asserted end to end on the rendered page.
      ["I build evidence-grounded AI systems for enterprise operations.", "The failure I design against"],
      ["The failure I design against", "The Operations Room"],
      ["The Operations Room", "Three bodies of work."],
      ["Three bodies of work.", "Fifteen years across enterprise integration"],
      ["Fifteen years across enterprise integration", "Four arguments worth disagreeing with."],
      ["Four arguments worth disagreeing with.", "Start a conversation"]
    ]
  },
  {
    route: "/framework",
    file: "framework.html",
    maxBytes: 190_000,
    required: [
      "Enterprise Context Layer",
      "Context Acquisition Tax",
      "Harness over model",
      "Shared operational reasoning",
      "Evidence posture",
      "Why this needs to be a layer rather than a feature.",
      "Telemetry is not enough",
      "Humans remain accountable",
      "Falsification"
    ],
    before: [
      ["Why this needs to be a layer rather than a feature.", "Evidence posture"],
      ["Evidence posture", "Falsification"]
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
      "What I have actually shipped.",
      "Operating arc",
      "Architecture judgment",
      "Constraints the architecture preserves.",
      "Start with operational evidence before model reasoning.",
      "Treat AI action as governed execution, not autonomous heroics.",
      // Repointed 2026-08-30: the reviewer-rubric section was removed from /work by ruling. What
      // it usefully carried survives in the hero, asserted here instead.
      "an incident-investigation pipeline with deterministic playbooks, policy gates, memory, receipts",
      "Sentinalai",
      "not evidence of what runs in production anywhere",
      "GitHub",
      "LinkedIn",
      "owned every stage"
    ]
  },
  {
    route: "/background",
    file: "background.html",
    maxBytes: 150_000,
    // Repointed 2026-08-30 for the background rebuild: the six ruled sections, the approved scale
    // signals, and the closing line, asserted against the built page.
    required: [
      "Where the thesis comes from.",
      "15+ years",
      "Senior Technical Lead — AIOps & Observability",
      "Building evidence-grounded AI systems for enterprise operations.",
      "How the judgment formed.",
      "Container platforms and observability",
      "The roles behind it.",
      "enterprise SRE investigation agent from thesis to production",
      "120+ enterprise applications",
      "What I build now.",
      "Four invariants, and what breaks without them.",
      "Where to look next.",
      "Ravikanth Seri",
      "Operational Intelligence"
    ],
    before: [
      ["Where the thesis comes from.", "How the judgment formed."],
      ["How the judgment formed.", "The roles behind it."],
      ["The roles behind it.", "What I build now."],
      ["What I build now.", "Four invariants, and what breaks without them."],
      ["Four invariants, and what breaks without them.", "Where to look next."]
    ]
  },
  {
    route: "/resume",
    file: "resume.html",
    maxBytes: 180_000,
    // Repointed 2026-08-31: /resume dropped eight sections other routes own. It now asserts the
    // verifiable record and the printable path, plus the lead identity a recruiter reads first.
    required: [
      "Ravikanth Seri",
      "Senior Technical Lead",
      "15+ years in enterprise engineering",
      "Impact ledger",
      "Strengths",
      "Public proof",
      "Architecture highlights",
      "Core skills",
      "Education and certifications",
      "Download resume",
      "120+ enterprise applications"
    ]
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
      "Operational Intelligence Doctrine",
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
