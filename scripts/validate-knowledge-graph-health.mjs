import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const root = process.cwd();
const appDir = path.join(root, "app");
const scorecardPath = path.join(root, "WORLD_CLASS_SCORECARD.md");
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": root }
});

const {
  contentRegistry,
  operationalIntelligenceFramework,
  patterns,
  principles,
  products,
  professionalGraph,
  publicCode,
  qualityScorecard
} = jiti("../content/site.ts");
const { buildKnowledgeGraph, buildPublishingIndex, getRelatedAssets, getShareableReferenceRoutes } = jiti("../lib/publishing.ts");

const errors = [];
const warnings = [];

function expect(condition, message) {
  if (!condition) errors.push(message);
}

function normalizeRoute(route) {
  return String(route ?? "").split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
}

function normalizeConcept(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/\bv\d+(?:\.\d+)?\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(the|a|an|and|for|to|of|in|with|public|canonical|reference|model|system)\b/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function routeFromPage(file) {
  const relative = path.relative(appDir, file).replace(/\\/g, "/");
  if (relative === "page.tsx") return "/";
  if (!relative.endsWith("/page.tsx")) return null;
  return `/${relative.replace(/\/page\.tsx$/, "")}`;
}

function routeFromHandler(file) {
  const relative = path.relative(appDir, file).replace(/\\/g, "/");
  if (!relative.endsWith("/route.ts")) return null;
  return `/${relative.replace(/\/route\.ts$/, "")}`;
}

const implementedRoutes = new Set(
  walk(appDir)
    .flatMap((file) => [routeFromPage(file), routeFromHandler(file)])
    .filter(Boolean)
    .map(normalizeRoute)
);
implementedRoutes.add("/robots.txt");
implementedRoutes.add("/sitemap.xml");

const assets = buildPublishingIndex().filter((asset) => asset.status === "published");
const graph = buildKnowledgeGraph();
const scorecard = fs.readFileSync(scorecardPath, "utf8");
const assetIds = new Set(assets.map((asset) => asset.id));
const assetUrls = new Set(assets.map((asset) => normalizeRoute(asset.url)));
const shareableRoutes = new Set(getShareableReferenceRoutes().map(normalizeRoute));
const patternRoutes = new Set(patterns.map((pattern) => `/patterns/${pattern.slug}`));
const productRoutes = new Set(products.map((product) => `/products/${product.slug}`));
const principleStatementsNormalized = new Set(principles.map((principle) => normalizeConcept(principle.statement)));
const controlledPrincipleAliases = new Map(
  [
    ["Transaction journeys before isolated signals", "Transaction journeys matter more than isolated service views."],
    ["Transaction journeys over isolated service views", "Transaction journeys matter more than isolated service views."],
    ["Transaction journeys matter", "Transaction journeys matter more than isolated service views."],
    ["Shared context before private agent context", "Shared context beats isolated agent context."],
    ["Shared context over isolated agents", "Shared context beats isolated agent context."],
    ["Replay before trust", "Evaluation is not a feature; it is the control system."],
    ["Evaluation before release", "Evaluation is not a feature; it is the control system."],
    ["Evaluation before trust", "Evaluation is not a feature; it is the control system."],
    ["Human review before consequential action", "Trustworthy agents need boundaries, not just intelligence."],
    ["Human judgment remains part of the system", "The best AI systems improve the human decision loop."],
    ["Operational memory compounds", "Operational memory should accumulate, not disappear."],
    ["Confidence before action", "Evidence before conclusions."],
    ["Explain what was used, ignored, and why", "AI should explain what it used, what it ignored, and why."],
    ["Timeline before root cause", "Evidence before conclusions."],
    ["Models reason. Harnesses remember.", "Operational memory should accumulate, not disappear."],
    ["Incidents are temporary. Operational knowledge should not be.", "Operational memory should accumulate, not disappear."],
    ["Evidence-backed self-healing beats autonomy theater.", "Trustworthy agents need boundaries, not just intelligence."],
    ["Shared context is the enterprise problem.", "Shared context beats isolated agent context."]
  ].map(([alias, canonical]) => [normalizeConcept(alias), canonical])
);
const frameworkLayerNames = operationalIntelligenceFramework.layers.map((layer) => layer.name);
const frameworkLayerSet = new Set(frameworkLayerNames);
const validRelationshipTargets = new Set([...assetUrls, ...shareableRoutes, ...implementedRoutes, ...patternRoutes, ...productRoutes]);

function routeExists(route) {
  const normalized = normalizeRoute(route);
  if (normalized.startsWith("http")) return true;
  if (validRelationshipTargets.has(normalized)) return true;
  if (fs.existsSync(path.join(root, "public", normalized.slice(1)))) return true;
  return false;
}

function principleKnown(value) {
  const normalized = normalizeConcept(value);
  return principleStatementsNormalized.has(normalized) || controlledPrincipleAliases.has(normalized);
}

expect(assets.length >= 60, `knowledge graph has ${assets.length} published assets, expected at least 60`);
expect(graph.nodes.length >= assets.length, "knowledge graph nodes do not cover all published assets");
expect(graph.relationships.length >= assets.length * 100, `knowledge graph has ${graph.relationships.length} relationships, expected at least ${assets.length * 100}`);

for (const relationship of graph.relationships) {
  expect(assetIds.has(relationship.from), `knowledge graph relationship has unknown source ${relationship.from}`);
  expect(assetIds.has(relationship.to), `knowledge graph relationship has unknown target ${relationship.to}`);
  expect(relationship.from !== relationship.to, `${relationship.from}: graph relationship points to itself`);
  expect(Number.isFinite(relationship.weight) && relationship.weight > 0, `${relationship.from}->${relationship.to}: relationship weight must be positive`);
}

const outgoing = new Map(assets.map((asset) => [asset.id, 0]));
const incoming = new Map(assets.map((asset) => [asset.id, 0]));
for (const relationship of graph.relationships) {
  outgoing.set(relationship.from, (outgoing.get(relationship.from) ?? 0) + 1);
  incoming.set(relationship.to, (incoming.get(relationship.to) ?? 0) + 1);
}

for (const asset of assets) {
  expect((outgoing.get(asset.id) ?? 0) >= 5, `${asset.url}: published asset has too few outgoing graph relationships`);
  expect((incoming.get(asset.id) ?? 0) >= 5, `${asset.url}: published asset has too few incoming graph relationships`);
  expect(getRelatedAssets(asset, 3).length >= 3, `${asset.url}: related-content engine returns fewer than 3 assets`);
}

for (const layer of frameworkLayerNames) {
  const layerAssets = assets.filter((asset) => asset.frameworkLayers.includes(layer));
  expect(layerAssets.length >= 5, `${layer}: fewer than 5 published assets connected to framework layer`);
}

for (const item of contentRegistry) {
  expect(item.publicSafe === "public-safe", `${item.slug}: registry item must remain public-safe`);
  for (const layer of item.frameworkLayers) {
    expect(frameworkLayerSet.has(layer), `${item.slug}: unknown framework layer ${layer}`);
  }
  for (const principle of item.relatedPrinciples) {
    expect(principleKnown(principle), `${item.slug}: related principle is not canonical or an approved alias: ${principle}`);
  }
  for (const route of [...item.relatedPatterns, ...item.relatedArtifacts, ...item.relatedProducts, ...item.relatedLibraryAssets]) {
    expect(routeExists(route), `${item.slug}: relationship points to missing route or artifact ${route}`);
  }
  const explicitEdges = item.relatedPatterns.length + item.relatedArtifacts.length + item.relatedProducts.length + item.relatedLibraryAssets.length;
  expect(explicitEdges >= 3, `${item.slug}: registry item has fewer than 3 explicit route relationships`);
}

for (const pattern of patterns) {
  for (const principle of pattern.relatedPrinciples) {
    expect(principleKnown(principle), `${pattern.slug}: pattern references non-canonical or unapproved principle ${principle}`);
  }
  for (const route of [...pattern.relatedWiki, ...pattern.related]) {
    expect(routeExists(route), `${pattern.slug}: pattern relationship points to missing route ${route}`);
  }
}

for (const principle of principles) {
  expect(principle.related.length > 0, `${principle.slug}: principle must link to at least one article, wiki note, or pattern`);
  for (const route of principle.related) {
    expect(routeExists(route), `${principle.slug}: principle relationship points to missing route ${route}`);
  }
}

const normalizedBuckets = new Map();
for (const asset of assets) {
  const normalized = normalizeConcept(asset.title);
  if (normalized.length < 10) continue;
  const bucket = normalizedBuckets.get(normalized) ?? [];
  bucket.push(asset);
  normalizedBuckets.set(normalized, bucket);
}
for (const [concept, bucket] of normalizedBuckets) {
  const uniqueUrls = new Set(bucket.map((asset) => asset.url));
  if (uniqueUrls.size > 1) {
    warnings.push(`possible duplicate concept "${concept}": ${bucket.map((asset) => asset.url).join(", ")}`);
  }
}
expect(warnings.length <= 3, `knowledge graph has too many possible duplicate concepts: ${warnings.join(" | ")}`);

const requiredProfessionalRoutes = ["/work", "/background", "/start-here", "/ask", "/investigation-room", "/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-evidence-pack"];
for (const route of requiredProfessionalRoutes) {
  expect(assetUrls.has(route) || routeExists(route), `${route}: missing from reachable public knowledge graph surface`);
}

const approvedExternalProfileRoutes = new Set(["https://github.com/rseri17-code", "https://www.linkedin.com/in/ravikanthseri/"]);
for (const item of professionalGraph.profileDiscovery ?? []) {
  const owner = `profileDiscovery:${item.need ?? "unknown"}`;
  for (const field of ["primaryHref", "evidenceHref"]) {
    const route = item[field];
    expect(approvedExternalProfileRoutes.has(route) || routeExists(route), `${owner}: ${field} does not resolve to a public graph surface: ${route}`);
  }
  expect(String(item.proof ?? "").length >= 90, `${owner}: proof must explain the evidence path`);
}

const professionalText = [
  professionalGraph.identity?.person,
  professionalGraph.identity?.currentFocus,
  professionalGraph.identity?.publicBoundary,
  ...(professionalGraph.careerEvolution ?? []).flatMap((item) => [item.stage, item.focus, item.publicEvidence]),
  ...(professionalGraph.capabilityEvidence ?? []).flatMap((item) => [item.capability, item.evidence, item.href]),
  ...(professionalGraph.proofLinks ?? []).flatMap((item) => [item.label, item.href, item.reason]),
  ...(professionalGraph.profileDiscovery ?? []).flatMap((item) => [item.need, item.primaryHref, item.evidenceHref, item.proof]),
  ...(publicCode.entries ?? []).flatMap((item) => [item.label, item.href, item.whatToInspect, item.publicSafeUse])
].join(" ");
for (const required of ["Ravikanth Seri", "Operational Intelligence", "production AI", "GitHub", "LinkedIn", "resume", "certifications", "education", "contact", "public-safe"]) {
  expect(professionalText.toLowerCase().includes(required.toLowerCase()), `professional graph evidence missing ${required}`);
}

for (const dimension of qualityScorecard.dimensions ?? []) {
  if (dimension.name === "Knowledge-Graph Health") {
    expect(dimension.gap.toLowerCase().includes("health"), "Knowledge-Graph Health scorecard gap must name health evidence");
    expect(dimension.nextProof.toLowerCase().includes("validator"), "Knowledge-Graph Health scorecard next proof must reference validator");
    for (const expected of [
      `${assets.length} assets`,
      `${graph.relationships.length} relationships`,
      `${frameworkLayerNames.length} layers`,
      `${contentRegistry.length} registry items`,
      `${patterns.length} patterns`,
      `${principles.length} principles`
    ]) {
      expect(dimension.evidence.includes(expected), `Knowledge-Graph Health JSON scorecard must use current graph count: ${expected}`);
      expect(scorecard.includes(expected), `WORLD_CLASS_SCORECARD.md must use current graph count: ${expected}`);
    }
  }
}

for (const principle of principles) {
  const normalized = normalizeConcept(principle.statement);
  expect(principleStatementsNormalized.has(normalized), `${principle.slug}: principle normalization failed`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated knowledge-graph health across ${assets.length} assets, ${graph.relationships.length} relationships, ${frameworkLayerNames.length} layers, ${contentRegistry.length} registry items, ${patterns.length} patterns, and ${principles.length} principles.`);
