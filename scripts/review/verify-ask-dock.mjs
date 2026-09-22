/**
 * The floating "Ask the public record" pill was removed.
 * Navbar Ask and /ask stay. This script checks the pill is gone.
 *
 *   npm i --no-save playwright-core
 *   node scripts/review/verify-ask-dock.mjs http://127.0.0.1:3000
 */
let chromium;
try {
  ({ chromium } = await import("playwright-core"));
} catch {
  console.error("playwright-core is not installed. Run: npm i --no-save playwright-core");
  process.exit(1);
}

const base = process.argv[2] || "http://127.0.0.1:3000";
const chromePath = process.env.CHROME_PATH;
const errors = [];
function expect(condition, message) {
  if (!condition) errors.push(message);
}

const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath || undefined
});

async function withPage(viewport, fn) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  try {
    await fn(page);
  } finally {
    await context.close();
  }
}

for (const viewport of [
  { width: 1440, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 }
]) {
  await withPage(viewport, async (page) => {
    await page.goto(`${base}/`, { waitUntil: "networkidle" });
    expect(
      (await page.getByRole("button", { name: "Ask the public record" }).count()) === 0,
      `${viewport.width}: floating Ask pill still present`
    );
    expect((await page.locator("[data-ask-dock-trigger]").count()) === 0, `${viewport.width}: ask dock trigger still present`);
    const ask = page.getByRole("link", { name: "Ask the public pages on this site" });
    expect((await ask.count()) === 1, `${viewport.width}: navbar Ask missing`);
    const href = await ask.getAttribute("href");
    expect(href === "/ask", `${viewport.width}: navbar Ask href was ${href}`);
    const about = page.getByRole("link", { name: "About", exact: true }).first();
    const aboutHref = await about.getAttribute("href");
    expect(aboutHref === "/background", `${viewport.width}: About href was ${aboutHref}`);
  });
}

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Floating Ask pill is absent. Navbar Ask and About still resolve.");
