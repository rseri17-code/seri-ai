/**
 * Route review harness. Not part of `npm test` — run it by hand against a production build.
 *
 *   npm i --no-save playwright-core        # not a project dependency
 *   npm run build && npx next start -p 3000
 *   node scripts/review/measure-route.mjs http://localhost:3000 /investigation-room /work
 *
 * Reports, per route:
 *   - structure     words, links, heading counts, height, horizontal overflow
 *   - a11y          axe-core WCAG 2.0/2.1/2.2 A+AA, plus best-practice (landmarks, heading order)
 *   - reachability  controls visible at each width, and which are hidden behind a breakpoint
 *   - viewports     overflow and sub-24px tap targets at six widths
 *
 * The reachability check is the one that earns its keep. A control inside a `xl:hidden` block with
 * no wide-screen counterpart is invisible to every other check in this repo, renders fine in a
 * screenshot, and is simply unusable at that width. That is how /investigation-room shipped with
 * its own start button unreachable above 1280px.
 */
import fs from "node:fs";

// playwright-core is not a dependency of this project — the harness is run by hand, not by CI.
// Install it when you need it: `npm i --no-save playwright-core`
let chromium;
try {
  ({ chromium } = await import("playwright-core"));
} catch {
  console.error("playwright-core is not installed. Run: npm i --no-save playwright-core");
  process.exit(1);
}

const CHROME = process.env.CHROME_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const VIEWPORTS = [[320, 568], [390, 844], [768, 1024], [1024, 768], [1363, 936], [1440, 900]];
const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const [base, ...routes] = process.argv.slice(2);
if (!base || routes.length === 0) {
  console.error("usage: node scripts/review/measure-route.mjs <base-url> <route> [route...]");
  process.exit(1);
}

const axeSource = fs.readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });

for (const route of routes) {
  console.log(`\n${"=".repeat(64)}\n${route}\n${"=".repeat(64)}`);

  // Structure, measured at the reviewer's width.
  {
    const context = await browser.newContext({ viewport: { width: 1363, height: 936 } });
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: "networkidle" });
    const stats = await page.evaluate(() => {
      const main = document.querySelector("main");
      if (!main) return { error: "no <main> landmark" };
      const text = main.innerText.replace(/\s+/g, " ").trim();
      return {
        words: text.split(" ").length,
        links: main.querySelectorAll("a[href]").length,
        h1: main.querySelectorAll("h1").length,
        h2: main.querySelectorAll("h2").length,
        h3: main.querySelectorAll("h3").length,
        mainLandmarks: document.querySelectorAll("main").length,
        heightPx: Math.round(main.getBoundingClientRect().height),
        overflowPx: document.documentElement.scrollWidth - document.documentElement.clientWidth
      };
    });
    console.log("structure  ", JSON.stringify(stats));
    await context.close();
  }

  // Accessibility. best-practice is reported separately because it is where duplicate landmarks
  // and broken heading order surface, and neither is a WCAG failure.
  for (const [width, height] of [[1363, 936], [390, 844]]) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.addScriptTag({ content: axeSource });
    const [wcag, practice] = await page.evaluate(async (tags) => {
      const a = await window.axe.run(document, { runOnly: { type: "tag", values: tags } });
      const b = await window.axe.run(document, { runOnly: { type: "tag", values: ["best-practice"] } });
      const shape = (r) => r.violations.map((v) => `${v.id}[${v.impact}](${v.nodes.length})`);
      return [shape(a), shape(b)];
    }, WCAG);
    console.log(`a11y       ${width}x${height}  wcag=${wcag.length ? wcag.join(" ") : "clean"}  best-practice=${practice.length ? practice.join(" ") : "clean"}`);
    await context.close();
  }

  // Reachability. A control that disappears at one width and has no counterpart is a defect.
  for (const [width] of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + route, { waitUntil: "networkidle" });
    const reach = await page.evaluate(() => {
      const controls = [...document.querySelectorAll("main button, main a[href]")];
      const visible = (el) => el.getClientRects().length > 0;
      const name = (el) => (el.innerText || el.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 40);
      return { visible: controls.filter(visible).length, hidden: controls.filter((el) => !visible(el)).map(name) };
    });
    console.log(`reach      ${String(width).padStart(4)}px  visible=${reach.visible}  hidden=${reach.hidden.length}${reach.hidden.length ? "  " + JSON.stringify(reach.hidden) : ""}`);
    await context.close();
  }

  // Overflow and tap targets. WCAG 2.2 target size (minimum) is 24x24 CSS pixels.
  for (const [width, height] of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width, height } });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message.slice(0, 60)));
    await page.goto(base + route, { waitUntil: "networkidle" });
    const vp = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      tiny: [...document.querySelectorAll("main a, main button, header a, header button, footer a")]
        .map((el) => ({ name: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 26), rect: el.getBoundingClientRect() }))
        .filter((x) => x.rect.width > 0 && (x.rect.height < 24 || x.rect.width < 24))
        .map((x) => x.name)
    }));
    console.log(`viewport   ${String(width).padStart(4)}x${height}  overflow=${vp.overflow}  tinyTargets=${vp.tiny.length}${vp.tiny.length ? "  " + JSON.stringify(vp.tiny) : ""}  pageErrors=${errors.length}`);
    await context.close();
  }
}

await browser.close();
