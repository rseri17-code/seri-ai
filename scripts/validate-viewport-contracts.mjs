import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function countMatches(source, pattern) {
  return source.match(pattern)?.length ?? 0;
}

const routeContracts = [
  {
    route: "/",
    file: "app/page.tsx",
    minResponsiveTokens: 18,
    required: [
      "grid-cols-2",
      "sm:grid-cols-2",
      "lg:grid-cols-4",
      "lg:grid-cols",
      "HeroIntelligenceMap",
      "heroBuilderProof",
      "mobileArtifactSignals",
      "lg:hidden",
      "Run OI-ROOM-001"
    ]
  },
  {
    route: "/ask",
    file: "components/chat.tsx",
    minResponsiveTokens: 7,
    required: [
      "min-w-0",
      "lg:grid-cols-[1fr_360px]",
      "Answer packet",
      "Related artifacts",
      "aria-label=\"Ask a question about Ravikanth Seri's public work\"",
      "aria-label=\"Send message\""
    ]
  },
  {
    route: "/investigation-room",
    file: "app/simulator/simulator.tsx",
    minResponsiveTokens: 45,
    required: [
      "overflow-hidden",
      "Evidence taxonomy",
      "Live investigation graph",
      "Accessible graph summary",
      "aria-label=\"Dynamic visual graph showing evidence flowing through transaction path, hypothesis, and human review\"",
      "aria-label=\"Live visual graph preview of evidence, transaction path, RCA, and review gate\"",
      "md:grid-cols-5",
      "lg:grid-cols",
      "2xl:grid-cols"
    ]
  },
  {
    route: "/work",
    file: "app/work/page.tsx",
    minResponsiveTokens: 9,
    required: [
      "Operating arc",
      "md:grid-cols-2",
      "xl:grid-cols-4",
      "xl:grid-cols-5",
      "lg:grid-cols-2"
    ]
  },
  {
    route: "/wiki/operational-intelligence-canonical-doctrine",
    file: "app/wiki/[slug]/page.tsx",
    minResponsiveTokens: 10,
    required: [
      "ReadingProgress",
      "Contents",
      "Related reading",
      "Version history",
      "md:grid-cols",
      "lg:grid-cols"
    ]
  }
];

for (const contract of routeContracts) {
  const source = read(contract.file);
  const responsiveTokens = countMatches(source, /\b(?:sm|md|lg|xl|2xl):/g);
  expect(responsiveTokens >= contract.minResponsiveTokens, `${contract.route}: expected at least ${contract.minResponsiveTokens} responsive utility tokens in ${contract.file}, found ${responsiveTokens}`);

  for (const required of contract.required) {
    expect(source.includes(required), `${contract.route}: ${contract.file} missing viewport contract "${required}"`);
  }

  expect(!source.includes("w-screen"), `${contract.route}: ${contract.file} should avoid w-screen because it commonly causes mobile overflow`);
  expect(!source.includes("min-w-[100vw]"), `${contract.route}: ${contract.file} should avoid viewport min-width because it commonly causes mobile overflow`);
}

const homePage = read("app/page.tsx");
expect(
  homePage.indexOf("Run OI-ROOM-001") < homePage.indexOf("The material is public-safe by design"),
  "/: homepage primary CTAs must render before the inspection/trust paragraph so mobile visitors see an action in the first viewport"
);

const simulatorPage = read("app/investigation-room/page.tsx");
for (const required of [
  "hidden items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white sm:inline-flex",
  "hidden rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white sm:inline-flex"
]) {
  expect(simulatorPage.includes(required), `/investigation-room: app/investigation-room/page.tsx missing mobile secondary-link suppression contract "${required}"`);
}

const simulator = read("app/simulator/simulator.tsx");
expect(
  simulator.includes("mt-3 hidden max-w-3xl text-base leading-7 text-slate-300 md:block"),
  "/investigation-room: mobile first viewport should prioritize the live investigation graph over explanatory intro copy"
);

const globalCss = read("app/globals.css");
for (const required of [
  "@media (prefers-reduced-motion: reduce)",
  "overflow-wrap",
  ".sim-graph-label",
  ".sim-graph-detail",
  ":focus-visible"
]) {
  expect(globalCss.includes(required), `app/globals.css missing visual accessibility contract "${required}"`);
}

const scorecard = read("WORLD_CLASS_SCORECARD.md");
for (const required of [
  "Mobile manual audit",
  "Operations Room visual QA",
  "Capture screenshots",
  "real viewport evidence"
]) {
  expect(scorecard.includes(required), `WORLD_CLASS_SCORECARD.md missing viewport backlog contract "${required}"`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated viewport contracts for ${routeContracts.length} critical review routes.`);
