import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const robots = jiti("../app/robots.ts").default;
const sitemap = jiti("../app/sitemap.ts").default;
const { buildLlmsTxt } = jiti("../lib/llms.ts");
const { buildRssFeed } = jiti("../lib/publishing.ts");

const errors = [];

const canonicalRoutes = [
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/framework",
  "/investigation-room",
  "/evals",
  "/work",
  "/resume",
  "/contact"
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function expectIncludes(file, content, values) {
  for (const value of values) {
    if (!content.includes(value)) errors.push(`${file}: missing "${value}"`);
  }
}

const siteUrl = "https://seri.ai";
const layout = read("app/layout.tsx");
expectIncludes("app/layout.tsx", layout, [
  "metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? \"https://seri.ai\")",
  "seri.ai | Operational Intelligence for Agentic SRE",
  "evidence-backed Agentic SRE harnesses",
  "canonical: \"/\"",
  "\"application/rss+xml\": \"/rss.xml\"",
  "siteName: \"seri.ai\"",
  "type: \"website\"",
  "url: \"/opengraph-image\"",
  "card: \"summary_large_image\"",
  "url: \"/twitter-image\""
]);

const openGraphImage = read("app/opengraph-image.tsx");
expectIncludes("app/opengraph-image.tsx", openGraphImage, [
  "seri.ai - Operational Intelligence for AI-native operations",
  "width: 1200",
  "height: 630",
  "contentType = \"image/png\"",
  "The reasoning layer between enterprise telemetry and human decision.",
  "Evidence graphs, replayable investigations, eval-gated agents, and human-reviewed action."
]);

const structuredData = read("components/structured-data.tsx");
expectIncludes("components/structured-data.tsx", structuredData, [
  "application/ld+json",
  "WebSite",
  "Person",
  "DefinedTermSet",
  "CreativeWork",
  "SearchAction",
  "sameAs",
  "Operational Intelligence",
  "Agentic SRE",
  "AI-native incident investigation",
  "Operator control planes",
  "operational-intelligence-canonical-doctrine",
  "operational-intelligence-reference-architecture",
  "operational-intelligence-publication-pack",
  "operational-intelligence-evidence-pack"
]);

const robotsConfig = robots();
expect(robotsConfig.rules?.allow === "/", "robots must allow /");
expect(Array.isArray(robotsConfig.rules?.disallow) && robotsConfig.rules.disallow.includes("/admin") && robotsConfig.rules.disallow.includes("/api"), "robots must disallow /admin and /api");
expect(Array.isArray(robotsConfig.sitemap) && robotsConfig.sitemap.includes(`${siteUrl}/sitemap.xml`), "robots must advertise sitemap.xml");
expect(Array.isArray(robotsConfig.sitemap) && robotsConfig.sitemap.includes(`${siteUrl}/llms.txt`), "robots must advertise llms.txt for AI readers");

const sitemapPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
for (const route of [...canonicalRoutes, "/rss.xml", "/robots.txt", "/sitemap.xml", "/llms.txt"]) {
  expect(sitemapPaths.has(route), `sitemap missing ${route}`);
}

const llms = buildLlmsTxt(siteUrl);
expectIncludes("llms.txt", llms, [
  "# seri.ai",
  "Public-Safe Boundary",
  "Canonical Definition",
  "Primary References",
  "Ask Ravikanth Behavior Contract",
  "Public Profiles",
  "Indexed Public Assets",
  "Machine Notes",
  "Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.",
  "Current deterministic trust fixtures"
]);
for (const route of canonicalRoutes) {
  expect(llms.includes(`${siteUrl}${route}`) || llms.includes(route), `llms.txt missing ${route}`);
}

const rss = buildRssFeed(siteUrl);
expect(rss.includes("<rss version=\"2.0\">"), "RSS missing version 2.0 marker");
expect(rss.includes("<title>seri.ai</title>"), "RSS missing channel title");
for (const route of canonicalRoutes.slice(0, 4)) {
  expect(rss.includes(`${siteUrl}${route}`), `RSS missing canonical reference ${route}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated discovery metadata across canonical metadata, JSON-LD, OG/Twitter, sitemap, robots, RSS, and llms.txt.");
