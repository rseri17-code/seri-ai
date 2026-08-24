import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentPath = path.join(root, "content", "keyboard-accessibility-walkthroughs.json");
const publicPath = path.join(root, "public", "visual-qa", "2026-08-22", "keyboard-accessibility-walkthroughs.md");
const packagePath = path.join(root, "package.json");

const errors = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

const data = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const markdown = fs.readFileSync(publicPath, "utf8");
const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));

for (const field of ["title", "updatedAt", "evidenceLevel", "summary", "principle", "limitations", "routes"]) {
  expect(data[field] != null, `keyboard walkthrough missing ${field}`);
}

expect(/^\d{4}-\d{2}-\d{2}$/.test(data.updatedAt ?? ""), "updatedAt must be YYYY-MM-DD");
expect(/not a screen-reader lab run/i.test(data.evidenceLevel), "evidenceLevel must avoid claiming screen-reader lab evidence");
expect(Array.isArray(data.limitations) && data.limitations.length >= 4, "limitations must include at least four items");
expect(data.limitations.join(" ").includes("screen-reader"), "limitations must mention screen-reader gap");
expect(Array.isArray(data.routes) && data.routes.length >= 2, "routes must cover at least two dense interactive routes");

for (const route of data.routes ?? []) {
  const owner = `keyboard walkthrough ${route.route ?? "unknown"}`;
  for (const field of ["route", "surface", "visitorTask", "keyboardPath", "sourceEvidence", "observedPasses", "remainingRisks", "status"]) {
    expect(route[field] != null, `${owner} missing ${field}`);
  }
  expect(Array.isArray(route.keyboardPath) && route.keyboardPath.length >= 5, `${owner} must include at least five keyboard steps`);
  expect(Array.isArray(route.sourceEvidence) && route.sourceEvidence.length >= 4, `${owner} must include at least four source evidence items`);
  expect(Array.isArray(route.observedPasses) && route.observedPasses.length >= 3, `${owner} must include observed passes`);
  expect(Array.isArray(route.remainingRisks) && route.remainingRisks.length >= 3, `${owner} must include remaining risks`);
  expect(route.status === "source-validated-keyboard-path", `${owner} status must be source-validated-keyboard-path`);
  expect(route.remainingRisks.join(" ").includes("screen-reader"), `${owner} remaining risks must preserve screen-reader gap`);
}

for (const required of [
  "Keyboard Accessibility Walkthrough Notes",
  "Evidence level: source-validated keyboard walkthrough contract; not a screen-reader lab run.",
  "Ask Ravikanth",
  "Operations Room",
  "skip link",
  "focus",
  "Remaining risks",
  "screen-reader pass"
]) {
  expect(markdown.includes(required), `keyboard walkthrough markdown missing "${required}"`);
}

expect(pkg.scripts["validate:keyboard"] === "node scripts/validate-keyboard-walkthroughs.mjs", "package.json missing validate:keyboard script");
expect(pkg.scripts.test.includes("validate:keyboard"), "npm test must run validate:keyboard");
expect(pkg.scripts.build.includes("validate:keyboard"), "npm run build must run validate:keyboard");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated keyboard accessibility walkthroughs across ${data.routes.length} dense routes.`);
