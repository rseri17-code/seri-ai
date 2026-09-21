/**
 * Browser verification for Ask UX Phase C (site-wide dock + challenge mode).
 *
 *   npm i --no-save playwright-core
 *   npx playwright-core install chromium   # if no system Chrome
 *   npm run build && npx next start -p 3000
 *   node scripts/review/verify-ask-dock.mjs http://127.0.0.1:3000
 */
import fs from "node:fs";
import path from "node:path";

let chromium;
try {
  ({ chromium } = await import("playwright-core"));
} catch {
  console.error("playwright-core is not installed. Run: npm i --no-save playwright-core");
  process.exit(1);
}

const base = process.argv[2] || "http://127.0.0.1:3000";
const chromePath = process.env.CHROME_PATH;
const artifactDir = path.join(process.cwd(), "tmp", "ask-dock-review");
fs.mkdirSync(artifactDir, { recursive: true });

const errors = [];
function expect(condition, message) {
  if (!condition) errors.push(message);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath || undefined
});

async function screenshot(page, name) {
  await page.screenshot({ path: path.join(artifactDir, name), fullPage: false });
}

async function withPage(viewport, fn) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  try {
    await fn(page);
  } finally {
    await context.close();
  }
}

await withPage({ width: 1440, height: 900 }, async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Ask the record" });
  expect(await trigger.count(), "homepage missing Ask dock trigger");
  await screenshot(page, "home-dock-closed-desktop.png");

  await trigger.click();
  await page.getByRole("complementary", { name: "Ask the record" }).waitFor();
  expect(await page.getByText("Challenge the record").count(), "homepage dock missing challenge chips");
  expect(await page.getByText("Public record only. Cite or refuse.").count(), "homepage dock missing boundary disclosure");
  expect(await page.getByText("Authorized Misfire", { exact: false }).count(), "homepage dock missing Authorized Misfire chip");
  await screenshot(page, "home-dock-open-desktop.png");

  await page.getByRole("button", { name: "Where is the Operational Intelligence thesis weakest?" }).click();
  await page.getByText("Direct answer:", { timeout: 20000 }).waitFor();
  expect(await page.getByText("Answer packet").count(), "homepage dock missing answer packet after chip send");
  await screenshot(page, "home-dock-chip-send-desktop.png");

  const openFull = page.getByRole("link", { name: "Open full Ask" });
  expect(await openFull.count(), "homepage dock missing Open full Ask");
  await openFull.click();
  await page.waitForURL(/\/ask/);
  expect(await page.getByRole("heading", { level: 1, name: "Ask the public record." }).count(), "/ask missing after Open full Ask");
  expect(await page.getByText("Where is the Operational Intelligence thesis weakest?").count(), "shared session did not continue onto /ask");
  expect(await page.locator("[data-ask-dock-trigger]").count() === 0, "Ask dock must not render on /ask");
  await screenshot(page, "ask-shared-session-desktop.png");
});

await withPage({ width: 1440, height: 900 }, async (page) => {
  await page.goto(`${base}/framework#batch-intelligence`, { waitUntil: "networkidle" });
  const hashBefore = await page.evaluate(() => window.location.hash);
  await page.getByRole("button", { name: "Ask the record" }).click();
  await page.getByRole("complementary", { name: "Ask the record" }).waitFor();
  expect(await page.getByText("What does Batch Intelligence prove and not prove?").count(), "framework dock missing Batch challenge chip");
  await page.getByRole("button", { name: "What does Batch Intelligence prove and not prove?" }).click();
  await page.getByText("Direct answer:", { timeout: 20000 }).waitFor();
  const hashAfter = await page.evaluate(() => window.location.hash);
  expect(hashAfter === hashBefore || hashAfter === "#batch-intelligence", `framework section hash was overwritten: ${hashAfter}`);
  expect(!hashAfter.includes("ask="), `Ask dock must not write #ask= onto /framework, got ${hashAfter}`);
  await screenshot(page, "framework-dock-chip-desktop.png");
});

await withPage({ width: 390, height: 844 }, async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow <= 1, `homepage mobile horizontal overflow ${overflow}px`);
  const trigger = page.getByRole("button", { name: "Ask the record" });
  const box = await trigger.boundingBox();
  expect(box && box.height >= 24, `mobile dock trigger too small: ${box?.height}`);
  await trigger.click();
  await page.getByRole("complementary", { name: "Ask the record" }).waitFor();
  const input = page.getByLabel("Ask a question about the public work");
  await input.fill("What is a Quantum Flux Capacitor?");
  await input.press("Enter");
  await page.getByText("not in the public record", { timeout: 20000 }).waitFor();
  expect(await page.getByText("Public record only. Cite or refuse.").count(), "mobile dock missing boundary disclosure after thin refusal");
  await screenshot(page, "home-dock-thin-refusal-mobile.png");

  await page.keyboard.press("Escape");
  await page.getByRole("complementary", { name: "Ask the record" }).waitFor({ state: "hidden" });
});

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Ask Phase C browser checks passed. Screenshots: ${artifactDir}`);
