import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const { contentRegistry, site } = jiti("../content/site.ts");
const { buildPublishingIndex, getShareableReferenceRoutes } = jiti("../lib/publishing.ts");
const sitemap = jiti("../app/sitemap.ts").default;

const errors = [];

const criticalRoutes = [
  "/",
  "/work",
  "/framework",
  "/library",
  "/ideas",
  "/patterns",
  "/products",
  "/projects",
  "/architecture-lab",
  "/investigation-room",
  "/ask",
  "/background",
  "/resume",
  "/contact",
  "/manifesto",
  "/now",
  "/radar",
  "/principles",
  "/wiki",
  "/llms.txt",
  "/rss.xml",
  "/robots.txt",
  "/sitemap.xml"
];

const routePatterns = [
  { prefix: "/ideas/", file: "app/ideas/[slug]/page.tsx" },
  { prefix: "/patterns/", file: "app/patterns/[slug]/page.tsx" },
  { prefix: "/products/", file: "app/products/[slug]/page.tsx" },
  { prefix: "/projects/", file: "app/projects/[slug]/page.tsx" },
  { prefix: "/wiki/", file: "app/wiki/[slug]/page.tsx" }
];

function routeToFile(route) {
  if (route === "/") return "app/page.tsx";
  if (route === "/llms.txt") return "app/llms.txt/route.ts";
  if (route === "/rss.xml") return "app/rss.xml/route.ts";
  if (route === "/robots.txt") return "app/robots.ts";
  if (route === "/sitemap.xml") return "app/sitemap.ts";
  if (/\.(md|pdf|txt|json)$/.test(route)) return `public${route}`;
  const pattern = routePatterns.find((item) => route.startsWith(item.prefix));
  if (pattern) return pattern.file;
  return `app${route}/page.tsx`;
}

function normalizeRoute(route) {
  return route.split("?")[0].split("#")[0];
}

function expectFile(route) {
  const file = routeToFile(route);
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`${route}: missing route implementation ${file}`);
  }
}

function expectSitemap(route, sitemapPaths) {
  if (!sitemapPaths.has(route)) {
    errors.push(`${route}: missing from sitemap`);
  }
}

const sitemapPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
const publishedRegistryRoutes = contentRegistry.filter((item) => item.status === "published").map((item) => normalizeRoute(item.route));
const publishingRoutes = buildPublishingIndex().filter((asset) => asset.status === "published").map((asset) => normalizeRoute(asset.url));
const navRoutes = site.nav.map((item) => normalizeRoute(item.href));
const shareableRoutes = getShareableReferenceRoutes().map(normalizeRoute);
const allRequiredRoutes = [...new Set([...criticalRoutes, ...publishedRegistryRoutes, ...publishingRoutes, ...navRoutes, ...shareableRoutes])];

for (const route of allRequiredRoutes) {
  if (route.startsWith("http")) continue;
  expectFile(route);
  expectSitemap(route, sitemapPaths);
}

for (const route of criticalRoutes) {
  const matchingRegistryItem = contentRegistry.find((item) => normalizeRoute(item.route) === route);
  const routeNeedsRegistry = !["/", "/work", "/ideas", "/patterns", "/products", "/projects", "/architecture-lab", "/resume", "/principles", "/wiki", "/llms.txt", "/rss.xml", "/robots.txt", "/sitemap.xml"].includes(route);
  if (routeNeedsRegistry && !matchingRegistryItem && route !== "/contact" && route !== "/work" && route !== "/now" && route !== "/radar" && route !== "/library" && route !== "/library") {
    errors.push(`${route}: critical route is not represented in contentRegistry`);
  }
}

const duplicateSitemapPaths = sitemap()
  .map((entry) => new URL(entry.url).pathname)
  .filter((route, index, routes) => routes.indexOf(route) !== index);
if (duplicateSitemapPaths.length) {
  errors.push(`sitemap contains duplicate paths: ${[...new Set(duplicateSitemapPaths)].join(", ")}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated route integrity across ${allRequiredRoutes.length} public routes and artifacts.`);
