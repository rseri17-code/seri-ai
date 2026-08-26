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

const routeMetadataContracts = [
  {
    file: "app/admin/page.tsx",
    required: ["export const metadata", "Content Operations Dashboard | seri.ai", "index: false", "follow: false"]
  },
  {
    file: "app/architecture-lab/page.tsx",
    required: ["export const metadata", "Architecture Lab | seri.ai", "Agentic SRE", "operator-controlled AI systems"]
  },
  {
    file: "app/contact/layout.tsx",
    required: ["export const metadata", "Contact Ravikanth Seri | seri.ai", "practitioner review"]
  },
  {
    file: "app/ideas/page.tsx",
    required: ["export const metadata", "Ideas | seri.ai", "Essays, memos, and field notes"]
  },
  {
    file: "app/ideas/[slug]/page.tsx",
    required: ["generateMetadata", "article.title", "article.dek", "canonical: `/ideas/${article.slug}`", "type: \"article\""]
  },
  {
    file: "app/interview-mode/page.tsx",
    required: ["export const metadata", "Interview Mode | seri.ai", "technical reviewers"]
  },
  {
    file: "app/investigation-room/page.tsx",
    required: ["export const metadata", "Operations Room | seri.ai", "OI-ROOM-001", "human approval", "canonical: \"/investigation-room\"", "url: \"/investigation-room\""]
  },
  {
    file: "app/radar/page.tsx",
    required: ["export const metadata", "Thesis Radar | Ravikanth Seri", "canonical: \"/radar\"", "url: \"/radar\"", "type: \"website\""]
  },
  {
    file: "app/work/page.tsx",
    required: ["export const metadata", "Work | Ravikanth Seri", "canonical: \"/work\"", "url: \"/work\"", "type: \"website\""]
  },
  {
    file: "app/background/page.tsx",
    required: ["export const metadata", "Background | Ravikanth Seri", "canonical: \"/background\"", "url: \"/background\"", "type: \"website\""]
  },
  {
    file: "app/framework/page.tsx",
    required: ["export const metadata", "Operational Intelligence Framework | Ravikanth Seri", "canonical: \"/framework\"", "url: \"/framework\""]
  },
  {
    file: "app/evals/page.tsx",
    required: ["export const metadata", "Evals | Public Operational Intelligence Trust Report", "canonical: \"/evals\"", "url: \"/evals\""]
  },
  {
    file: "app/resume/page.tsx",
    required: ["export const metadata", "Resume | Ravikanth Seri", "canonical: \"/resume\"", "url: \"/resume\""]
  },
  {
    file: "app/contact/layout.tsx",
    required: ["export const metadata", "Contact Ravikanth Seri | seri.ai", "canonical: \"/contact\"", "url: \"/contact\""]
  },
  {
    file: "app/wiki/[slug]/page.tsx",
    required: ["generateMetadata", "canonical: `/wiki/${note.slug}`", "url: `/wiki/${note.slug}`", "type: \"article\""]
  },
  {
    file: "app/projects/[slug]/page.tsx",
    required: ["generateMetadata", "project.name", "project.summary", "canonical: `/projects/${project.slug}`"]
  },
  {
    file: "app/simulator/page.tsx",
    required: ["export const metadata", "Compatibility route", "index: false", "redirect(\"/investigation-room\")"]
  }
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return [full];
  });
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function expectIncludes(file, content, values) {
  for (const value of values) {
    if (!content.includes(value)) errors.push(`${file}: missing "${value}"`);
  }
}

const siteUrl = "https://seri-ai.vercel.app";
const layout = read("app/layout.tsx");
expectIncludes("app/layout.tsx", layout, [
  "metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || \"https://seri-ai.vercel.app\")",
  "Ravikanth Seri | seri.ai",
  "Ravikanth Seri's public professional home for Operational Intelligence",
  "Ravikanth Seri's public professional home for evidence-backed operational reasoning",
  "canonical: \"/\"",
  "\"application/rss+xml\": \"/rss.xml\"",
  "siteName: \"seri.ai\"",
  "type: \"website\"",
  "url: \"/opengraph-image\"",
  "card: \"summary_large_image\"",
  "url: \"/twitter-image\""
]);

for (const contract of routeMetadataContracts) {
  const content = read(contract.file);
  expectIncludes(contract.file, content, contract.required);
}

const metadataHelper = read("lib/metadata.ts");
expectIncludes("lib/metadata.ts", metadataHelper, ["publicRouteMetadata", "alternates: { canonical: path }", "openGraph", "url: path"]);

for (const file of walk(path.join(root, "app")).filter((item) => /(?:page|layout)\.tsx$/.test(item))) {
  const relative = path.relative(root, file);
  const content = fs.readFileSync(file, "utf8");
  if (!content.includes("export const metadata") && !content.includes("generateMetadata")) continue;
  if (content.includes("index: false")) continue;
  const hasStaticContract = content.includes("publicRouteMetadata(") || (content.includes("alternates:") && content.includes("canonical:") && content.includes("openGraph:") && content.includes("url:"));
  const hasDynamicContract = content.includes("generateMetadata") && content.includes("canonical: `") && content.includes("openGraph:") && content.includes("url: `");
  expect(hasStaticContract || hasDynamicContract, `${relative}: public metadata must include route-specific canonical and Open Graph URL`);
}

const openGraphImage = read("app/opengraph-image.tsx");
expectIncludes("app/opengraph-image.tsx", openGraphImage, [
  "Ravikanth Seri | seri.ai",
  "width: 1200",
  "height: 630",
  "contentType = \"image/png\"",
  "AI-native operations need evidence before action.",
  "An inspectable operating model for hypotheses, replay, evaluation gates, and accountable human review."
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
  "Ask Ravi Behavior Contract",
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
