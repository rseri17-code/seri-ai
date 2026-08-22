import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const walkthroughPath = path.join(root, "content", "mobile-touch-walkthroughs.json");
const publicWalkthroughPath = path.join(root, "public", "visual-qa", "2026-08-22", "mobile-touch-walkthroughs.md");
const errors = [];

const expectedRoutes = [
  "/ask",
  "/investigation-room",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/radar",
  "/work"
];

const sourceContracts = {
  "/ask": {
    files: ["components/chat.tsx"],
    required: [
      "aria-label=\"Ask a question about Ravikanth Seri's public work\"",
      "aria-label=\"Send message\"",
      "Related artifacts",
      "Trust contract"
    ]
  },
  "/investigation-room": {
    files: ["app/investigation-room/page.tsx", "app/simulator/simulator.tsx"],
    required: [
      "Live investigation graph",
      "Evidence taxonomy",
      "Contradiction",
      "Missing evidence",
      "Approval gate",
      "aria-label=\"Dynamic visual graph showing evidence flowing through transaction path, hypothesis, and human review\""
    ]
  },
  "/wiki/operational-intelligence-canonical-doctrine": {
    files: ["app/wiki/[slug]/page.tsx"],
    required: ["Contents", "Ask questions", "Related reading", "Version history", "max-w-full overflow-x-auto"]
  },
  "/radar": {
    files: ["app/radar/page.tsx"],
    required: ["Thesis spine", "Evidence posture", "aria-label={`${source.label}: ${source.evidenceType}`}", "min-w-0"]
  },
  "/work": {
    files: ["app/work/page.tsx"],
    required: ["Operating arc", "Public proof", "Review spine", "Architecture judgment", "GitHub", "LinkedIn"]
  }
};

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

expect(fs.existsSync(walkthroughPath), "content/mobile-touch-walkthroughs.json is missing");
expect(fs.existsSync(publicWalkthroughPath), "public mobile touch walkthrough artifact is missing");

if (fs.existsSync(walkthroughPath)) {
  const walkthroughs = JSON.parse(fs.readFileSync(walkthroughPath, "utf8"));
  expect(walkthroughs.title === "seri.ai Mobile Touch Walkthrough Evidence", "mobile walkthroughs title must be canonical");
  expect(walkthroughs.updatedAt === "2026-08-22", "mobile walkthroughs updatedAt must use the audited date");
  expect(walkthroughs.viewport === "390x844", "mobile walkthroughs must record the mobile viewport");
  expect(walkthroughs.evidenceLevel === "source-validated walkthrough notes", "mobile walkthroughs evidence level must not overclaim runtime or external review");
  expect(/screenshot alone/i.test(walkthroughs.principle ?? ""), "mobile walkthroughs principle must distinguish walkthrough quality from screenshots");

  const limitations = Array.isArray(walkthroughs.limitations) ? walkthroughs.limitations.join(" ") : "";
  for (const required of ["not external reviewer feedback", "not a physical-device lab run", "real-device pass"]) {
    expect(limitations.includes(required), `mobile walkthrough limitations missing "${required}"`);
  }

  expect(Array.isArray(walkthroughs.routes), "mobile walkthrough routes must be an array");
  expect(walkthroughs.routes?.length === expectedRoutes.length, `mobile walkthroughs must include exactly ${expectedRoutes.length} dense routes`);

  const routeSet = new Set(walkthroughs.routes?.map((item) => item.route));
  for (const route of expectedRoutes) {
    expect(routeSet.has(route), `mobile walkthroughs missing route ${route}`);
  }

  for (const item of walkthroughs.routes ?? []) {
    const owner = `content/mobile-touch-walkthroughs.json:${item.route ?? "unknown"}`;
    for (const field of ["route", "surface", "visitorTask", "startingSignal", "touchTargets", "walkthroughSteps", "sourceEvidence", "observedPasses", "remainingRisks", "status"]) {
      expect(item[field] != null, `${owner} missing ${field}`);
    }
    expect(item.status === "source-validated", `${owner} must remain source-validated until external or device evidence exists`);
    expect(String(item.route ?? "").startsWith("/"), `${owner} route must be internal`);
    expect(String(item.visitorTask ?? "").length >= 100, `${owner} visitorTask must explain the mobile task`);
    expect(Array.isArray(item.touchTargets) && item.touchTargets.length >= 4, `${owner} must include at least four touch targets`);
    expect(Array.isArray(item.walkthroughSteps) && item.walkthroughSteps.length >= 5, `${owner} must include at least five walkthrough steps`);
    expect(Array.isArray(item.sourceEvidence) && item.sourceEvidence.length >= 3, `${owner} must include at least three source-evidence statements`);
    expect(Array.isArray(item.observedPasses) && item.observedPasses.length >= 3, `${owner} must include at least three observed passes`);
    expect(Array.isArray(item.remainingRisks) && item.remainingRisks.length >= 2, `${owner} must include at least two remaining risks`);

    const contract = sourceContracts[item.route];
    expect(Boolean(contract), `${owner} has no source contract`);
    if (contract) {
      const source = contract.files.map(read).join("\n");
      for (const required of contract.required) {
        expect(source.includes(required), `${owner} source contract missing "${required}"`);
      }
    }
  }
}

if (fs.existsSync(publicWalkthroughPath)) {
  const publicWalkthrough = fs.readFileSync(publicWalkthroughPath, "utf8");
  for (const required of [
    "# seri.ai Mobile Touch Walkthrough Evidence",
    "Evidence level: source-validated walkthrough notes",
    "not external reviewer feedback",
    "not a physical-device lab run",
    "/ask",
    "/investigation-room",
    "/wiki/operational-intelligence-canonical-doctrine",
    "/radar",
    "/work",
    "This closes the absence of mobile touch walkthrough notes"
  ]) {
    expect(publicWalkthrough.includes(required), `public touch walkthrough artifact missing "${required}"`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated mobile touch walkthrough evidence across ${expectedRoutes.length} dense routes.`);
