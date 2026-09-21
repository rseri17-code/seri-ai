/**
 * Browser verification for the Codebase Memory case study.
 *
 *   npm i --no-save playwright-core
 *   npx playwright-core install chromium   # if no system Chrome
 *   npm run build && npx next start -p 3000
 *   node scripts/review/verify-codebase-memory.mjs http://127.0.0.1:3000
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
const artifactDir = path.join(process.cwd(), "tmp", "codebase-memory-review");
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
  await page.screenshot({ path: path.join(artifactDir, name), fullPage: true });
}

async function withPage(viewport, reducedMotion, fn) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: reducedMotion ? "reduce" : "no-preference"
  });
  const page = await context.newPage();
  try {
    await fn(page);
  } finally {
    await context.close();
  }
}

await withPage({ width: 1440, height: 900 }, false, async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const homeTeaser = page.getByRole("link", { name: /Read the case study/i });
  expect(await homeTeaser.count(), "/: missing Codebase Memory teaser");
  await screenshot(page, "home-desktop.png");
  await homeTeaser.first().click();
  await page.waitForURL(/\/projects\/codebase-memory/);
  expect(await page.getByRole("heading", { level: 1, name: "Codebase Memory" }).count(), "case study H1 missing after homepage teaser");
});

await withPage({ width: 1440, height: 900 }, false, async (page) => {
  await page.goto(`${base}/projects`, { waitUntil: "networkidle" });
  const card = page.getByRole("link", { name: /Codebase Memory/i });
  expect(await card.count(), "/projects missing Codebase Memory card");
  await screenshot(page, "projects-desktop.png");
  await card.first().click();
  await page.waitForURL(/\/projects\/codebase-memory/);
});

await withPage({ width: 1440, height: 900 }, false, async (page) => {
  await page.goto(`${base}/work`, { waitUntil: "networkidle" });
  const card = page.getByRole("link", { name: /Codebase Memory/i });
  expect(await card.count(), "/work missing Codebase Memory card");
  await screenshot(page, "work-desktop.png");
  await card.first().click();
  await page.waitForURL(/\/projects\/codebase-memory/);
});

await withPage({ width: 1440, height: 900 }, false, async (page) => {
  await page.goto(`${base}/projects/codebase-memory`, { waitUntil: "networkidle" });
  expect(await page.getByText("Illustrative example").count(), "illustration label missing");
  expect(await page.getByText("Source unchanged").count(), "default lesson status missing");
  await screenshot(page, "case-study-desktop-unchanged.png");

  await page.getByRole("radio", { name: /Surface timeout errors/i }).click();
  expect(await page.getByText("ErrorMapper").count(), "second task relationships missing");

  await page.getByRole("switch").click();
  expect(await page.getByText("Revalidation required").count(), "changed lesson status missing");
  await screenshot(page, "case-study-desktop-revalidation.png");

  const navCount = await page.locator("header nav[aria-label='Primary navigation'] a").count();
  expect(navCount >= 5, `unexpected primary nav count ${navCount}`);
});

await withPage({ width: 390, height: 844 }, false, async (page) => {
  await page.goto(`${base}/projects/codebase-memory`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow <= 1, `mobile horizontal overflow ${overflow}px`);
  const switchBox = await page.getByRole("switch").boundingBox();
  expect(switchBox && switchBox.height >= 24, `mobile switch target too small: ${switchBox?.height}`);
  await page.getByRole("switch").click();
  expect(await page.getByText("Revalidation required").count(), "mobile revalidation status missing");
  await screenshot(page, "case-study-mobile.png");
});

await withPage({ width: 1440, height: 900 }, true, async (page) => {
  await page.goto(`${base}/projects/codebase-memory`, { waitUntil: "networkidle" });
  await page.getByRole("switch").focus();
  await page.keyboard.press("Space");
  expect(await page.getByText("Revalidation required").count(), "reduced-motion keyboard toggle failed");
  const animationDuration = await page.evaluate(() => getComputedStyle(document.body).animationDuration);
  expect(animationDuration === "0.001ms" || animationDuration === "0s" || animationDuration === "0.001s", `reduced-motion animation-duration was ${animationDuration}`);
  await screenshot(page, "case-study-reduced-motion.png");
});

await withPage({ width: 1024, height: 768 }, false, async (page) => {
  await page.goto(`${base}/projects/codebase-memory`, { waitUntil: "networkidle" });
  await page.locator("body").press("Tab");
  await page.keyboard.press("Tab");
  const radios = page.getByRole("radio");
  await radios.nth(1).focus();
  await page.keyboard.press("Space");
  expect(await radios.nth(1).getAttribute("aria-checked"), "second task not selected by keyboard") === "true" ||
    errors.push("second task not selected by keyboard");
  await page.getByRole("switch").focus();
  await page.keyboard.press("Enter");
  expect(await page.getByText("Revalidation required").count(), "keyboard switch did not update status");
});

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Codebase Memory browser verification passed. Screenshots in ${artifactDir}`);
