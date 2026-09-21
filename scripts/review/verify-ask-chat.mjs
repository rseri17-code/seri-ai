/**
 * Browser verification for Ask UX Phase A (deterministic chat shell).
 *
 *   npm i --no-save playwright-core
 *   npx playwright-core install chromium   # if no system Chrome
 *   npm run build && npx next start -p 3000
 *   node scripts/review/verify-ask-chat.mjs http://127.0.0.1:3000
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
const artifactDir = path.join(process.cwd(), "tmp", "ask-chat-review");
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
  await page.goto(`${base}/ask`, { waitUntil: "networkidle" });
  expect(await page.getByRole("heading", { level: 1, name: "Ask the public record." }).count(), "/ask missing H1");
  expect(await page.getByText("Strong first questions").count(), "empty state missing Strong first questions");
  expect(await page.getByText("Trust contract").count(), "Trust contract banner missing");
  expect(await page.locator("[data-ask-transcript]").count(), "chat transcript missing");
  await screenshot(page, "ask-empty-desktop.png");

  await page.getByRole("button", { name: "What is Ravikanth building with seri.ai?" }).first().click();
  await page.getByText("Direct answer:", { timeout: 20000 }).waitFor();
  expect(await page.getByText("Answer packet").count(), "answer packet missing after first turn");
  expect(await page.getByRole("group", { name: "Follow-up questions" }).count() + (await page.getByLabel("Follow-up questions").count()), "follow-up chips missing after first turn");
  await screenshot(page, "ask-first-turn-desktop.png");

  const chip = page.getByLabel("Follow-up questions").locator("button").first();
  const chipLabel = (await chip.textContent())?.trim();
  expect(Boolean(chipLabel), "follow-up chip has no label");
  await chip.click();
  await page.getByText(chipLabel ?? "", { timeout: 20000 }).nth(0).waitFor();
  const userBubbles = await page.locator("[data-ask-transcript] .bg-mint").count();
  expect(userBubbles >= 2, `multi-turn transcript should keep both user questions, found ${userBubbles}`);
  await screenshot(page, "ask-follow-up-desktop.png");

  await page.getByRole("button", { name: "New conversation" }).click();
  expect(await page.getByText("Strong first questions").count(), "clearing the thread should restore Strong first questions");
});

await withPage({ width: 390, height: 844 }, async (page) => {
  await page.goto(`${base}/ask`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow <= 1, `mobile horizontal overflow ${overflow}px`);
  const input = page.getByLabel("Ask a question about the public work");
  const send = page.getByRole("button", { name: "Send message" });
  const inputBox = await input.boundingBox();
  const sendBox = await send.boundingBox();
  expect(inputBox && inputBox.height >= 24, `mobile composer input too small: ${inputBox?.height}`);
  expect(sendBox && sendBox.height >= 24, `mobile send target too small: ${sendBox?.height}`);
  await input.fill("What is a Quantum Flux Capacitor?");
  await input.press("Enter");
  await page.getByText("not in the public record", { timeout: 20000 }).waitFor();
  expect(await page.getByText("Trust contract").count(), "mobile trust contract missing after refusal");
  await screenshot(page, "ask-thin-refusal-mobile.png");
});

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Ask Phase A browser checks passed. Screenshots: ${artifactDir}`);
