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

const routeContracts = [
  {
    route: "/",
    file: "app/page.tsx",
    required: [
      // Repointed 2026-08-30 for the redesign. The old list pinned specific grid classes and a
      // hero widget, which is a layout, not a responsive invariant. These assert that the page
      // still adapts: a stacking hero, a responsive selected-work composition, and the flagship
      // preview, which is the one place where a horizontal rail has to stay usable on a phone.
      "lg:grid-cols-[1.15fr_0.85fr]",
      "lg:grid-cols-[0.44fr_0.56fr]",
      "sm:grid-cols-[auto_1fr]",
      "OperationsRoomPreview",
      "min-h-[48px]",
      "min-h-[44px]"
    ]
  },
  {
    route: "/ask",
    file: "components/chat.tsx",
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
      "border-t border-white/10 bg-black/15 p-3",
      "aria-label=\"Ask a question about Ravikanth Seri's public work\"",
      "aria-label=\"Send message\""
    ]
  },
  {
    route: "/investigation-room",
    file: "app/simulator/simulator.tsx",
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
    required: [
      "Operating arc",
      "md:grid-cols-2",
      "xl:grid-cols-4",
      "lg:grid-cols-2"
    ]
  },
  {
    route: "/framework",
    file: "app/framework/page.tsx",
    required: [
      "grid min-w-0 gap-4",
      "className=\"min-w-0\"",
      "What this layer claims",
      "Falsification",
      "Evidence posture"
    ]
  },
  {
    route: "/wiki/operational-intelligence-canonical-doctrine",
    file: "app/wiki/[slug]/page.tsx",
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
  for (const required of contract.required) {
    expect(source.includes(required), `${contract.route}: ${contract.file} missing viewport contract "${required}"`);
  }

  expect(!source.includes("w-screen"), `${contract.route}: ${contract.file} should avoid w-screen because it commonly causes mobile overflow`);
  expect(!source.includes("min-w-[100vw]"), `${contract.route}: ${contract.file} should avoid viewport min-width because it commonly causes mobile overflow`);
}

// Index against the rendered markup only. The file header documents the ruled section order, so
// indexing the raw source matched the comment instead of the section and reported a false break.
const homePageSource = read("app/page.tsx");
const homePage = homePageSource.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
// The invariant these protect is unchanged and still worth protecting: a mobile visitor must reach
// an action before the page starts explaining itself. Only the CTA labels and the markers for
// "deeper content" moved, in the 2026-08-30 redesign.
const heroPrimaryCta = homePage.indexOf("Enter the Operations Room");
const heroSecondaryCta = homePage.indexOf("Explore the body of work");
expect(heroPrimaryCta > -1 && heroSecondaryCta > -1, "/: homepage must offer both hero actions");
expect(
  heroPrimaryCta < homePage.indexOf("The failure I design against"),
  "/: homepage primary CTA must render before the signature-thesis section"
);
expect(
  heroSecondaryCta < homePage.indexOf("The failure I design against"),
  "/: both homepage CTAs must render before the signature-thesis section so mobile visitors see an action in the first viewport"
);
expect(
  heroPrimaryCta < homePage.indexOf("Fifteen years across enterprise integration"),
  "/: homepage CTAs must render before the career bridge so mobile visitors get an action before deeper explanation"
);
// Section order is ruled. Assert it here so a reordering fails the build rather than shipping.
const sectionOrder = [
  "I build evidence-grounded AI systems for enterprise operations.",
  "The failure I design against",
  "The Operations Room",
  "Three bodies of work.",
  // The five-stage arc became a one-sentence bridge on 2026-08-30; /background owns the narrative.
  "Fifteen years across enterprise integration",
  "Four arguments worth disagreeing with.",
  "Start a conversation"
].map((marker) => [marker, homePage.indexOf(marker)]);
for (const [marker, at] of sectionOrder) {
  expect(at > -1, `/: homepage missing ruled section marker "${marker}"`);
}
for (let i = 1; i < sectionOrder.length; i += 1) {
  expect(
    sectionOrder[i - 1][1] < sectionOrder[i][1],
    `/: ruled homepage section order broken - "${sectionOrder[i][0]}" must follow "${sectionOrder[i - 1][0]}"`
  );
}

// Superseded 2026-08-31. The two pins that stood here required the review packet, the walkthrough
// PDF and the essay to be `hidden ... sm:inline-flex`, and the room's intro to be `hidden md:block`.
// Measured on the shipped build, that left a phone visitor with one link on the whole hero, and it
// is the opposite of the ruled target ("zero unreachable interaction states"). The contract is now
// that those links carry no width gate at all.
const simulatorPage = read("app/investigation-room/page.tsx");
expect(
  !/hidden[^"]*sm:inline-flex/.test(simulatorPage),
  "/investigation-room: hero and take-away links must not be gated behind a min-width breakpoint"
);
expect(
  simulatorPage.includes('href="#operations-room"') && simulatorPage.includes("Start the replay"),
  "/investigation-room: the hero must offer Start the replay as its primary action"
);

// Above 1280px the room's own start, mode and replay-cursor controls were `xl:hidden`, so a desktop
// visitor could not start the investigation, switch to expert mode, or step the replay.
const simulator = read("app/simulator/simulator.tsx");
for (const control of ["Start the replay", "Explore it myself", "Reset this case"]) {
  expect(simulator.includes(control), `/investigation-room: room control "${control}" is missing`);
}
expect(
  !/xl:hidden[\s\S]{0,3200}Start the replay/.test(simulator),
  "/investigation-room: the room's start and replay controls must render at every width"
);
expect(
  !read("components/chat.tsx").includes("lg:hidden"),
  "/ask: strong first questions must render at every width, not hide behind lg:hidden"
);
expect(
  simulator.includes('id="operations-room"'),
  "/investigation-room: the room needs the #operations-room anchor the hero links to"
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
