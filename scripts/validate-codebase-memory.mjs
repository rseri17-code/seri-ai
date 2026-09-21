import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const { resolveCodebaseMemoryView, codebaseMemoryTasks, defaultCodebaseMemoryTaskId } = jiti("../lib/codebase-memory.ts");
const { projects } = jiti("../content/site.ts");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

const page = read("app/projects/codebase-memory/page.tsx");
const illustration = read("components/codebase-memory-illustration.tsx");
const model = read("lib/codebase-memory.ts");
const home = read("app/page.tsx");
const work = read("app/work/page.tsx");
const projectsIndex = read("app/projects/page.tsx");
const header = read("components/header.tsx");
const packageJson = read("package.json");
const corpus = [page, illustration, model].join("\n");

const project = projects.find((item) => item.slug === "codebase-memory");
assert.ok(project, "content/projects.json must include codebase-memory so /projects and /work list it");
assert.equal(project.name, "Codebase Memory");
assert.match(project.summary, /Context that survives the next session/);

assert.match(page, /Context that survives the next session\./);
assert.match(page, /Each new coding agent rediscovers/);
assert.match(page, /Four connected ideas, not four features\./);
for (const idea of ["Code graph", "Engineering memory", "Freshness checks", "Verification"]) {
  assert.match(page, new RegExp(idea));
}
assert.match(page, /locates the relevant\n          code|locates the relevant code/);
assert.match(page, /reuses a validated lesson/);
assert.match(page, /previous lesson needs revalidation/);
assert.match(page, /Structural discovery/);
assert.match(page, /Task-specific capability guides/);
assert.match(page, /Evidence-linked lessons/);
assert.match(page, /Source-freshness checks/);
assert.match(page, /Bounded fresh-agent testing/);
assert.match(page, /Source freshness is not behavioral correctness/);
assert.match(page, /It does not autonomously repair code/);
assert.match(page, /It does not fully automatically enforce reuse/);
assert.match(page, /It does not claim universal coverage/);
assert.match(page, /It does not claim measured token savings/);
assert.match(page, /<CodebaseMemoryIllustration \/>/);
assert.match(page, /<h1[\s\S]*Codebase Memory|\{project\.name\}/);

assert.match(illustration, /Illustrative example/);
assert.match(illustration, /role="radiogroup"/);
assert.match(illustration, /aria-label="Select a coding task"/);
assert.match(illustration, /role="switch"/);
assert.match(illustration, /aria-live="polite"/);
assert.match(illustration, /Source unchanged/);
assert.match(illustration, /Revalidation required/);
assert.match(illustration, /min-h-11/);
assert.doesNotMatch(illustration, /framer-motion|animate-|animation:/);
assert.match(illustration, /"use client"/);

const unchanged = resolveCodebaseMemoryView(defaultCodebaseMemoryTaskId, false);
const changed = resolveCodebaseMemoryView(defaultCodebaseMemoryTaskId, true);
assert.equal(unchanged.status, "Source unchanged");
assert.equal(changed.status, "Revalidation required");
assert.notEqual(unchanged.freshnessNote, changed.freshnessNote);
assert.match(unchanged.correctnessNote, /Source freshness is not behavioral correctness/);
assert.equal(unchanged.correctnessNote, changed.correctnessNote);
assert.ok(unchanged.nodes.length >= 3, "relationships must remain interpretable as labeled nodes");
assert.ok(unchanged.edges.length >= 2, "relationships must remain interpretable as labeled edges");
assert.match(unchanged.edges[0].fromLabel, /CheckoutAdapter|PaymentClient|InventoryClient|RetryPolicy|ErrorMapper/);

const otherTask = resolveCodebaseMemoryView(codebaseMemoryTasks[1].id, false);
assert.notEqual(otherTask.task.id, unchanged.task.id);
assert.notEqual(otherTask.task.lesson, unchanged.task.lesson);
assert.equal(resolveCodebaseMemoryView("unknown-task", false).task.id, defaultCodebaseMemoryTaskId);

assert.match(home, /href="\/projects\/codebase-memory"/);
assert.match(home, /Read the case study/);
assert.match(home, /Compact teaser inside Selected work/);
assert.match(work, /projects\.map/);
assert.match(projectsIndex, /projects\.map/);
assert.match(projectsIndex, /href=\{`\/projects\/\$\{project\.slug\}`\}/);

const navItems = [...header.matchAll(/\{ href: "([^"]+)", label: "([^"]+)" \}/g)].map((match) => match[1]);
assert.equal(navItems.length, 5, "primary nav must remain five destinations");
assert.ok(!navItems.includes("/projects/codebase-memory"), "Codebase Memory must not become a top-level nav item");
assert.match(header, /href="\/ask"/);

for (const banned of [
  "autonomous self-repair",
  "fully automatic enforcement",
  "universal coverage of every",
  "saves tokens",
  "token savings of"
]) {
  assert.doesNotMatch(corpus, new RegExp(banned, "i"), `case study must not claim ${banned}`);
}

for (const identifier of [
  "TIAA",
  "Sentinalai",
  "Kubernetes",
  "Datadog",
  "PagerDuty",
  "ServiceNow",
  "internal/",
  ".java",
  "prod-"
]) {
  assert.doesNotMatch(corpus, new RegExp(identifier), `synthetic case study leaked identifier ${identifier}`);
}

assert.match(packageJson, /"validate:codebase-memory": "node scripts\/validate-codebase-memory.mjs"/);
assert.match(packageJson, /validate:codebase-memory/);

console.log("Validated Codebase Memory case study copy, discoverability, illustration states, and public-safety bounds.");
