import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const {
  buildKnowledgeGraph,
  buildMonthlyNewsletterExport,
  buildPublishingIndex,
  buildRssFeed,
  getPublicationChangelog,
  searchPublishingIndex
} = jiti("../lib/publishing.ts");

const sitemap = jiti("../app/sitemap.ts").default;
const errors = [];

const canonicalRoutes = [
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/framework",
  "/investigation-room",
  "/ask",
  "/work"
];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function extractTags(xml, tag) {
  return [...xml.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "g"))].map((match) => match[1]);
}

const assets = buildPublishingIndex().filter((asset) => asset.status === "published");
const assetUrls = new Set(assets.map((asset) => asset.url));
const sitemapPaths = new Set(sitemap().map((entry) => new URL(entry.url).pathname));
const graph = buildKnowledgeGraph();

expect(assets.length >= 50, `publishing index has ${assets.length} published assets, expected at least 50`);
expect(graph.nodes.length >= assets.length, "knowledge graph does not include all published assets");
expect(graph.relationships.length >= assets.length * 2, `knowledge graph has ${graph.relationships.length} relationships, expected at least ${assets.length * 2}`);

for (const route of canonicalRoutes) {
  expect(assetUrls.has(route), `${route}: missing from publishing index`);
  expect(sitemapPaths.has(route), `${route}: missing from sitemap`);
}

for (const asset of assets) {
  expect(asset.title.length >= 4, `${asset.url}: title is too short`);
  expect(asset.description.length >= 40, `${asset.url}: description is too short`);
  expect(asset.tags.length > 0, `${asset.url}: missing tags`);
  expect(asset.askQuestions.length >= 2, `${asset.url}: missing generated Ask questions`);
  expect(asset.versionHistory.length > 0, `${asset.url}: missing version history`);
  expect(asset.frameworkLayers.length > 0 || asset.assetType === "principle", `${asset.url}: missing framework-layer relationship`);
}

const rss = buildRssFeed("https://seri.ai");
const rssItems = extractTags(rss, "item");
const rssLinks = extractTags(rss, "link").filter((link) => link.startsWith("https://seri.ai/"));
const rssGuids = extractTags(rss, "guid");

expect(rss.startsWith("<?xml version=\"1.0\" encoding=\"UTF-8\" ?>"), "RSS feed missing XML declaration");
expect(rss.includes("<rss version=\"2.0\">"), "RSS feed missing rss version");
expect(rssItems.length === Math.min(50, assets.length), `RSS contains ${rssItems.length} items, expected ${Math.min(50, assets.length)}`);
expect(rssLinks.length >= rssItems.length, "RSS feed missing item links");
expect(new Set(rssGuids).size === rssGuids.length, "RSS feed contains duplicate guid values");
expect(rss.includes("Operational Intelligence field notes, patterns, artifacts, and product updates."), "RSS feed missing channel description");

for (const route of canonicalRoutes.slice(0, 4)) {
  expect(rss.includes(`https://seri.ai${route}`), `RSS feed missing canonical route ${route}`);
}

const changelog = getPublicationChangelog();
expect(changelog.length >= assets.length, "publication changelog is smaller than published asset count");
for (const route of canonicalRoutes.slice(0, 4)) {
  const asset = assets.find((item) => item.url === route);
  expect(asset && changelog.some((entry) => entry.version === `pub-${asset.updatedAt}-${asset.slug}`), `${route}: missing publication changelog entry`);
}

const monthly = buildMonthlyNewsletterExport("2026-07");
expect(monthly.includes("# This Month on seri.ai - 2026-07"), "monthly newsletter export missing title");
expect(monthly.includes("## New Publications"), "monthly newsletter export missing publications section");
expect(monthly.includes("## Framework Coverage"), "monthly newsletter export missing framework coverage section");
expect(monthly.includes("## Ask Ravi Questions"), "monthly newsletter export missing Ask questions section");
for (const route of canonicalRoutes.slice(0, 4)) {
  expect(monthly.includes(route), `monthly newsletter export missing ${route}`);
}

const publishingSearchCases = [
  ["doctrine", "/wiki/operational-intelligence-canonical-doctrine"],
  ["reference architecture conformance", "/wiki/operational-intelligence-reference-architecture"],
  ["publication pack diagrams pdf", "/wiki/operational-intelligence-publication-pack"],
  ["evidence pack falsification criteria", "/wiki/operational-intelligence-evidence-pack"],
  ["publication spine reading order", "/library"]
];

for (const [query, expectedUrl] of publishingSearchCases) {
  const topUrls = searchPublishingIndex({ query }).slice(0, 5).map((asset) => asset.url);
  expect(topUrls.includes(expectedUrl), `publishing search for "${query}" did not include ${expectedUrl} in top 5; got ${topUrls.join(", ")}`);
}

const libraryPage = fs.readFileSync(path.join(root, "app", "library", "page.tsx"), "utf8");
for (const required of [
  "const referenceShelf",
  "const canonicalReadingPath",
  "publicationSpine",
  "Publication spine",
  "How the body of work is meant to be inspected.",
  "Editorial contract",
  "Publishing rule",
  "Reviewer question",
  "Proof standard",
  "publicationSpine.stages.map",
  "const corpusStats",
  "Canonical reading path",
  "Read the work in the order a serious reviewer should inspect it.",
  "Define the doctrine",
  "Inspect the architecture",
  "Run the artifact",
  "Challenge the evidence",
  "Read the point of view",
  "EmailCapture",
  "/rss.xml",
  "Follow the publication feed.",
  "Reference shelf",
  "The canonical assets before the essays",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-evidence-pack",
  "/wiki/operational-intelligence-publication-pack",
  "/publication-pack/operational-intelligence-diagrams.md",
  "/downloads/operational-intelligence-publication-pack.pdf"
]) {
  expect(libraryPage.includes(required), `/library missing publication corpus contract: ${required}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated publishing discovery across ${assets.length} assets, ${rssItems.length} RSS items, changelog, newsletter, search, and knowledge graph.`);
