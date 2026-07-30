import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const staticDir = path.join(nextDir, "static");
const serverAppDir = path.join(nextDir, "server", "app");
const errors = [];

const budgets = {
  staticDirBytes: 2_250_000,
  staticFileBytes: 260_000,
  htmlFileBytes: 275_000,
  criticalHtmlBytes: 260_000,
  prerenderRoutes: 70,
  htmlFiles: 60
};

const criticalHtmlFiles = [
  "index.html",
  "framework.html",
  "map.html",
  "investigation-room.html",
  "evals.html",
  "search.html",
  "wiki/operational-intelligence-canonical-doctrine.html",
  "wiki/operational-intelligence-reference-architecture.html",
  "wiki/operational-intelligence-publication-pack.html",
  "wiki/operational-intelligence-evidence-pack.html",
  "work.html",
  "background.html",
  "contact.html",
  "resume.html"
];

const criticalAppPaths = [
  "/ask/page",
  "/api/ask/route",
  "/api/contact/route",
  "/investigation-room/page",
  "/wiki/[slug]/page",
  "/llms.txt/route",
  "/opengraph-image/route",
  "/twitter-image/route"
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function fileSize(file) {
  return fs.statSync(file).size;
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

if (!fs.existsSync(nextDir)) {
  errors.push(".next is missing. Run npm run build before npm run validate:performance.");
}

if (fs.existsSync(staticDir)) {
  const staticFiles = walk(staticDir);
  const staticBytes = staticFiles.reduce((sum, file) => sum + fileSize(file), 0);
  if (staticBytes > budgets.staticDirBytes) {
    errors.push(`.next/static is ${formatKb(staticBytes)}, above ${formatKb(budgets.staticDirBytes)} budget.`);
  }

  for (const file of staticFiles) {
    const size = fileSize(file);
    if (size > budgets.staticFileBytes) {
      errors.push(`${path.relative(root, file)} is ${formatKb(size)}, above ${formatKb(budgets.staticFileBytes)} per-file budget.`);
    }
  }
}

if (fs.existsSync(serverAppDir)) {
  const htmlFiles = walk(serverAppDir).filter((file) => file.endsWith(".html"));
  if (htmlFiles.length < budgets.htmlFiles) {
    errors.push(`Server app has ${htmlFiles.length} HTML artifacts, expected at least ${budgets.htmlFiles}.`);
  }

  for (const file of htmlFiles) {
    const size = fileSize(file);
    if (size > budgets.htmlFileBytes) {
      errors.push(`${path.relative(root, file)} is ${formatKb(size)}, above ${formatKb(budgets.htmlFileBytes)} HTML budget.`);
    }
  }

  for (const relative of criticalHtmlFiles) {
    const file = path.join(serverAppDir, relative);
    if (!fs.existsSync(file)) {
      errors.push(`Missing critical prerendered HTML: ${path.relative(root, file)}`);
      continue;
    }
    const size = fileSize(file);
    if (size > budgets.criticalHtmlBytes) {
      errors.push(`${path.relative(root, file)} is ${formatKb(size)}, above ${formatKb(budgets.criticalHtmlBytes)} critical-route budget.`);
    }
  }
}

const appRoutesManifest = path.join(nextDir, "app-path-routes-manifest.json");
const serverAppPathsManifest = path.join(nextDir, "server", "app-paths-manifest.json");
const criticalRouteManifest = fs.existsSync(appRoutesManifest) ? appRoutesManifest : serverAppPathsManifest;
if (fs.existsSync(criticalRouteManifest)) {
  const manifest = JSON.parse(fs.readFileSync(criticalRouteManifest, "utf8"));
  for (const route of criticalAppPaths) {
    if (!Object.prototype.hasOwnProperty.call(manifest, route)) {
      errors.push(`Missing critical app route: ${route}`);
    }
  }
}

const prerenderManifest = path.join(nextDir, "prerender-manifest.json");
if (fs.existsSync(prerenderManifest)) {
  const manifest = JSON.parse(fs.readFileSync(prerenderManifest, "utf8"));
  const routeCount = Object.keys(manifest.routes ?? {}).length;
  if (routeCount < budgets.prerenderRoutes) {
    errors.push(`Prerender manifest has ${routeCount} routes, expected at least ${budgets.prerenderRoutes}.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated performance budgets for static assets, prerendered HTML, and critical routes.");
