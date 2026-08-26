/**
 * Reports the "noun-inventory" copy pattern in visitor-facing text.
 *
 * The pattern: a sentence whose whole content is a comma-separated list of four
 * or more abstract nouns, usually ending "..., and X". It reads as a summary of
 * the system rather than a sentence addressed to a reader, and no existing
 * validator catches it, because every validator checks that strings EXIST, not
 * that they are worth reading.
 *
 * This is a REPORT, not a gate. It is deliberately not wired into `npm test`.
 * Run it with `npm run report:inventory-copy`. The baseline below records the
 * count at the time of writing so the trend is visible; lower is better.
 *
 * Not every hit is a defect. A list is legitimate when each item carries weight
 * (the /manifesto line about logs, metrics, traces and tickets IS the argument)
 * and when a reader genuinely wants contents (a downloads index). Judge each.
 */
import fs from "node:fs";
import path from "node:path";

const BASELINE = 92;
const roots = ["app", "components"];
const results = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.tsx?$/.test(entry.name)) scan(full);
  }
}

function metadataSpan(lines) {
  let start = -1;
  for (const [i, line] of lines.entries()) {
    if (/export const metadata|publicRouteMetadata\(/.test(line)) start = i;
    if (start >= 0 && i > start && /^\}\);?\s*$/.test(line)) return [start, i];
  }
  return [-1, -1];
}

function scan(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const [metaStart, metaEnd] = metadataSpan(lines);
  for (const [i, line] of lines.entries()) {
    if (i >= metaStart && i <= metaEnd) continue; // SEO descriptions are a different genre
    for (const match of line.matchAll(/"([^"]{40,300})"/g)) {
      const text = match[1];
      const items = text.split(", ").length;
      if (items >= 4 && /, and [a-z]/.test(text)) {
        results.push({ file, line: i + 1, items, text });
      }
    }
  }
}

for (const root of roots) if (fs.existsSync(root)) walk(root);
results.sort((a, b) => b.items - a.items);

const byFile = new Map();
for (const r of results) byFile.set(r.file, (byFile.get(r.file) ?? 0) + 1);

console.log(`Inventory-copy report: ${results.length} instances in visitor copy (baseline ${BASELINE}).\n`);
console.log("Worst offenders by list length:");
for (const r of results.slice(0, 10)) {
  console.log(`  ${r.items} items  ${r.file}:${r.line}\n     ${r.text.slice(0, 120)}`);
}
console.log("\nBy file:");
for (const [file, count] of [...byFile].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(count).padStart(3)}  ${file}`);
}

if (results.length > BASELINE) {
  console.log(`\nNote: count rose above the ${BASELINE} baseline. Worth a look before shipping.`);
}
