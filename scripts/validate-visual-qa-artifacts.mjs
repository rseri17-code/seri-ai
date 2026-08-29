import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const visualQaRoot = path.join(root, "public", "visual-qa", "2026-08-22");
const manifestPath = path.join(visualQaRoot, "viewport-results.json");
const reportPath = path.join(visualQaRoot, "report.md");
const errors = [];

const expectedViewports = {
  "mobile-390": { width: 390, height: 844 },
  "tablet-768": { width: 768, height: 1024 },
  "desktop-1440": { width: 1440, height: 1000 }
};

// Scoped to routes that actually have captures from the 2026-08-22 run.
// The route collapse retired /radar and /start-here, so their screenshots now show pages
// that no longer exist, and /framework has changed substantially without being recaptured.
// STALE: this evidence needs a fresh capture run once the restructure settles. Deliberately
// not renaming old captures to cover new routes - that would claim verification we do not have.
const expectedRoutes = [
  "/",
  "/work",
  "/ask",
  "/investigation-room",
  "/background",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-evidence-pack"
];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

expect(fs.existsSync(manifestPath), "visual QA manifest is missing");
expect(fs.existsSync(reportPath), "visual QA report is missing");

if (fs.existsSync(reportPath)) {
  const report = fs.readFileSync(reportPath, "utf8");
  for (const required of [
    "27 screenshots captured",
    "9 routes inspected at 3 viewport widths",
    "0 recorded horizontal-overflow findings",
    "0 recorded console-error pages",
    "Mobile Operations Room shows the live investigation graph",
    "does not replace external reviewer feedback",
    "durable non-photographic identity mark exists",
    "approved portrait now renders on home, background, and resume",
    "Source-validated mobile touch walkthrough notes captured",
    "/visual-qa/2026-08-22/mobile-touch-walkthroughs.md"
  ]) {
    expect(report.includes(required), `visual QA report missing "${required}"`);
  }
}

if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  expect(manifest.capturedAt === "2026-08-22", "visual QA manifest must use the audited capture date");
  expect(manifest.baseUrl === "http://127.0.0.1:3017", "visual QA manifest must record the audited local base URL");
  expect(Array.isArray(manifest.results), "visual QA manifest results must be an array");
  // The manifest keeps captures for routes retired since the run. Those are historical
  // evidence, not errors, so assert coverage of the routes we still ship rather than an
  // exact count that a route retirement would break.
  expect(
    manifest.results?.length >= expectedRoutes.length * Object.keys(expectedViewports).length,
    "visual QA manifest must cover every expected route at every viewport"
  );

  for (const [viewportName, viewport] of Object.entries(expectedViewports)) {
    const results = manifest.results.filter((result) => result.viewport === viewportName);
    expect(
      expectedRoutes.every((route) => results.some((item) => item.route === route)),
      `${viewportName}: missing captures for one or more shipped routes`
    );
    for (const route of expectedRoutes) {
      const result = results.find((item) => item.route === route);
      expect(Boolean(result), `${viewportName} ${route}: missing capture result`);
      if (!result) continue;
      expect(!result.captureError, `${viewportName} ${route}: capture error ${result.captureError}`);
      expect(result.file?.startsWith("/visual-qa/2026-08-22/"), `${viewportName} ${route}: screenshot path must be public visual QA artifact`);
      const screenshotPath = result.file ? path.join(root, "public", result.file) : "";
      expect(Boolean(screenshotPath) && fs.existsSync(screenshotPath), `${viewportName} ${route}: screenshot file missing`);
      if (fs.existsSync(screenshotPath)) {
        expect(fs.statSync(screenshotPath).size > 10_000, `${viewportName} ${route}: screenshot file is unexpectedly small`);
      }
      expect(result.metrics?.innerWidth === viewport.width, `${viewportName} ${route}: expected innerWidth ${viewport.width}, got ${result.metrics?.innerWidth}`);
      expect(result.metrics?.innerHeight === viewport.height, `${viewportName} ${route}: expected innerHeight ${viewport.height}, got ${result.metrics?.innerHeight}`);
      expect(result.metrics?.clientWidth === viewport.width, `${viewportName} ${route}: expected clientWidth ${viewport.width}, got ${result.metrics?.clientWidth}`);
      expect(result.metrics?.scrollWidth <= viewport.width, `${viewportName} ${route}: horizontal overflow detected`);
      expect(result.metrics?.h1Visible === true, `${viewportName} ${route}: H1 should be visible`);
      expect(result.metrics?.mainVisible === true, `${viewportName} ${route}: main content should be visible`);
      expect(Array.isArray(result.consoleErrors) && result.consoleErrors.length === 0, `${viewportName} ${route}: console errors recorded`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated visual QA artifacts across ${expectedRoutes.length} shipped routes and 3 viewports (capture run 2026-08-22; STALE for routes changed since).`);
