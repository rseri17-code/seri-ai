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
      "lg:grid-cols-[1.05fr_0.95fr]",
      "lg:grid-cols",
      "HeroIntelligenceMap",
      "homeHeroBuilderProof",
      "homeMobileArtifactSignals",
      "lg:hidden",
      "Begin with the thesis",
      "Open the Operations Room"
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
      "Trust contract",
      "Source coverage",
      "Related route",
      "Latency budget",
      "Strong first questions",
      "mt-2 grid gap-2 sm:grid-cols-2",
      "min-w-0 rounded border border-white/10 bg-white/[0.04] px-3 py-2",
      "lg:hidden",
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
      "const stepContracts",
      "reviewStateRows",
      "Operator question",
      "Required output",
      "Confidence rule",
      "Failure mode",
      "Observation",
      "Inference",
      "Contradiction",
      "Missing evidence",
      "Confirmed fact",
      "Approval gate",
      "Accessible graph summary",
      "aria-label=\"Dynamic visual graph showing evidence flowing through transaction path, hypothesis, and human review\"",
      "aria-label=\"Live visual graph preview of evidence, transaction path, RCA, and review gate\"",
      "md:grid-cols-5",
      "lg:grid-cols-[15rem_minmax(0,1fr)]",
      "2xl:grid-cols-[16rem_minmax(0,1fr)_18rem]",
      "lg:col-span-2",
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
    route: "/radar",
    file: "app/radar/page.tsx",
    minResponsiveTokens: 8,
    required: [
      "grid min-w-0 gap-4",
      "className=\"min-w-0\"",
      "text-base leading-7 text-slate-200 md:text-xl md:leading-8",
      "text-xl font-semibold leading-7 text-white md:text-2xl md:leading-8",
      "Thesis spine",
      "Evidence posture"
    ]
  },
  {
    route: "/wiki/operational-intelligence-canonical-doctrine",
    file: "app/wiki/[slug]/page.tsx",
    minResponsiveTokens: 10,
    required: [
      "ReadingProgress",
      "SidebarCards",
      "Contents",
      "Ask questions",
      "Related reading",
      "Version history",
      "mt-8 lg:hidden",
      "hidden space-y-4 lg:sticky",
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
  homePage.indexOf("Begin with the thesis") < homePage.indexOf("Open the Operations Room"),
  "/: homepage should present the thesis before deeper technical paths for first-time visitors"
);
expect(
  homePage.indexOf("Begin with the thesis") < homePage.indexOf("Everything here is inspectable without access to private systems"),
  "/: homepage primary thesis CTA must render before the inspection/trust paragraph"
);
expect(
  homePage.indexOf("Begin with the thesis") < homePage.indexOf("Field origin"),
  "/: homepage primary thesis CTA must render before the field-origin proof module"
);
expect(
  homePage.indexOf("Open the Operations Room") < homePage.indexOf("Everything here is inspectable without access to private systems"),
  "/: homepage primary CTAs must render before the inspection/trust paragraph so mobile visitors see an action in the first viewport"
);
expect(
  homePage.indexOf("Open the Operations Room") < homePage.indexOf("Field origin"),
  "/: homepage primary CTAs must render before the field-origin proof module so mobile visitors get an action before deeper explanation"
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

const cardComponent = read("components/card.tsx");
for (const required of ["p-5", "sm:p-6"]) {
  expect(cardComponent.includes(required), `components/card.tsx missing responsive card density contract "${required}"`);
}

const sectionComponent = read("components/section.tsx");
for (const required of ["py-14", "lg:py-20", "leading-tight"]) {
  expect(sectionComponent.includes(required), `components/section.tsx missing responsive section rhythm contract "${required}"`);
}

const scorecard = read("WORLD_CLASS_SCORECARD.md");
for (const required of [
  "Mobile physical-device audit",
  "Operations Room visual QA",
  "source-validated touch walkthrough notes",
  "390px screenshot artifacts"
]) {
  expect(scorecard.includes(required), `WORLD_CLASS_SCORECARD.md missing viewport backlog contract "${required}"`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated viewport contracts for ${routeContracts.length} critical review routes.`);
