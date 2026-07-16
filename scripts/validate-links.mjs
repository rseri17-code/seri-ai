import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, "app");
const scanDirs = ["app", "components", "content"].map((dir) => path.join(root, dir));
const scanFiles = ["README.md", "CONSOLIDATION_AUDIT.md", "CANONICAL_PRODUCT_MODEL.md", "CONTENT_ARCHITECTURE.md", "PUBLIC_RELEASE_SAFETY_REPORT.md", "LAUNCH_READINESS_REPORT.md"].map((file) => path.join(root, file));
const errors = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function routeFromPage(file) {
  const relative = path.relative(appDir, file).replace(/\\/g, "/");
  if (relative === "page.tsx") return "/";
  if (!relative.endsWith("/page.tsx")) return null;
  const route = `/${relative.replace(/\/page\.tsx$/, "")}`;
  return route === "/" ? "/" : route.replace(/\/\([^)]*\)/g, "");
}

const routes = new Set(walk(appDir).map(routeFromPage).filter(Boolean));
routes.add("/sitemap.xml");
routes.add("/robots.txt");

const siteSource = fs.readFileSync(path.join(root, "content", "site.ts"), "utf8");
for (const collection of ["ideas", "patterns", "projects", "products"]) {
  const plural = collection === "ideas" ? "articles" : collection;
  const regex = /slug:\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(siteSource)) !== null) {
    if (collection === "ideas") routes.add(`/ideas/${match[1]}`);
    if (collection === "patterns") routes.add(`/patterns/${match[1]}`);
    if (collection === "projects") routes.add(`/projects/${match[1]}`);
    if (collection === "products") routes.add(`/products/${match[1]}`);
  }
  void plural;
}

const wikiDir = path.join(root, "content", "wiki");
if (fs.existsSync(wikiDir)) {
  for (const file of fs.readdirSync(wikiDir)) {
    if (file.endsWith(".mdx")) routes.add(`/wiki/${file.replace(/\.mdx$/, "")}`);
  }
}

const files = [...scanDirs.flatMap(walk), ...scanFiles.filter((file) => fs.existsSync(file))].filter((file) => /\.(tsx|ts|mdx|md|json)$/.test(file));
const hrefRegex = /(?:href=|href:|route:|url:)\s*(?:"|`)(\/[^"`#\s)]*)/g;

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  let match;
  while ((match = hrefRegex.exec(text)) !== null) {
    const raw = match[1];
    if (raw.startsWith("//") || raw.startsWith("/api/")) continue;
    const route = raw.split("?")[0].replace(/\/$/, "") || "/";
    if (fs.existsSync(path.join(root, "public", route))) continue;
    if (route.includes("${") || route.includes(":")) continue;
    if (route.startsWith("/ideas/") || route.startsWith("/patterns/") || route.startsWith("/projects/") || route.startsWith("/products/") || route.startsWith("/wiki/")) {
      if (!routes.has(route)) errors.push(`${path.relative(root, file)} links to missing dynamic route ${raw}`);
      continue;
    }
    if (!routes.has(route)) errors.push(`${path.relative(root, file)} links to missing route ${raw}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated internal links across ${files.length} files.`);
