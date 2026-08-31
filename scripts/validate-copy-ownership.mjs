/**
 * Copy-ownership gate.
 *
 * Ravikanth ruled on 2026-08-29 that visitor-facing copy has exactly one owner. Two agents
 * rewriting the same prose produced draft-quality output, a hero that was reverted twice in one
 * day, and a paragraph that existed only to hold redundant maintenance notes and rendered on the homepage
 * looking like debug output.
 *
 * Prose in AGENTS.md did not prevent any of that, because an agent working from an older base
 * never read it. So the rule now lives at the top of every file it applies to, and this gate
 * fails the build if that banner goes missing.
 *
 * The split is by KIND of change, not by file. Both agents work in these files:
 *   Claude — headings, paragraphs, labels, link text, alt text, microcopy, section order.
 *   Codex  — data wiring, imports, props, components, layout, a11y attributes, performance.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const MARKER = "VISITOR-FACING COPY";
const EXEMPT = new Set(["app/admin/page.tsx"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "page.tsx") out.push(path.relative(root, full));
  }
  return out;
}

const pages = walk(path.join(root, "app")).filter((file) => !EXEMPT.has(file));

for (const file of pages) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  if (!source.includes(MARKER)) {
    errors.push(
      `${file}: missing the copy-ownership banner.\n` +
        `    Every visitor-facing page carries it so the rule reaches whoever opens the file.\n` +
        `    Copy the banner from any other app/**/page.tsx rather than removing this check.`
    );
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated copy ownership across ${pages.length} visitor-facing pages.`);
