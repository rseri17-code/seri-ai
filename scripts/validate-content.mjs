import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const wikiDir = path.join(root, "content", "wiki");
const homePagePath = path.join(root, "app", "page.tsx");
const sitePath = path.join(root, "content", "site-config.json");
const homePath = path.join(root, "content", "home.json");
const askPath = path.join(root, "content", "ask.json");
const articlesPath = path.join(root, "content", "articles.json");
const principlesPath = path.join(root, "content", "principles.json");
const patternsPath = path.join(root, "content", "patterns.json");
const projectsPath = path.join(root, "content", "projects.json");
const productsPath = path.join(root, "content", "products.json");
const architectureCardsPath = path.join(root, "content", "architecture-cards.json");
const thesisRadarPath = path.join(root, "content", "thesis-radar.json");
const thesisRadarLifecyclePath = path.join(root, "content", "thesis-radar-lifecycle.json");
const categoryBriefPath = path.join(root, "content", "category-brief.json");
const nowPath = path.join(root, "content", "now.json");
const startHerePath = path.join(root, "content", "start-here.json");
const changelogPath = path.join(root, "content", "changelog.json");
const resumePath = path.join(root, "content", "resume.json");
const professionalGraphPath = path.join(root, "content", "professional-graph.json");
const publicCodePath = path.join(root, "content", "public-code.json");
const projectProofPath = path.join(root, "content", "project-proof.json");
const publicationSpinePath = path.join(root, "content", "publication-spine.json");
const proofBacklogPath = path.join(root, "content", "proof-backlog.json");
const qualityScorecardPath = path.join(root, "content", "quality-scorecard.json");
const visitorReviewKitPath = path.join(root, "content", "visitor-review-kit.json");
const identityAssetPath = path.join(root, "content", "identity-asset.json");
const contentRegistryPath = path.join(root, "content", "content-registry.json");
const harnessThesisPath = path.join(root, "content", "harness-thesis.json");
const canonicalDefinitionPath = path.join(root, "content", "canonical-definition.json");
const builderDnaPath = path.join(root, "content", "builder-dna.json");
const sentinelContextModelPath = path.join(root, "content", "sentinel-context-model.json");
const operationalLayersPath = path.join(root, "content", "operational-layers.json");
const operationalIntelligenceFrameworkPath = path.join(root, "content", "operational-intelligence-framework.json");
const operationalIntelligenceSystemPath = path.join(root, "content", "operational-intelligence-system.json");
const assetTypesPath = path.join(root, "content", "asset-types.json");
const releaseModelPath = path.join(root, "content", "release-model.json");
const evalReportPath = path.join(root, "content", "eval-report.json");
const requiredSiteFields = ["name", "owner", "tagline", "positioning", "description", "authorLine", "nowSignal", "brandBelief", "productPromise", "operatingSystem", "compliance", "links", "nav"];
const requiredHomeFields = ["profileLinks", "harnessThesis", "linkedInSignals", "builderDna", "articles", "patterns", "categoryContrast", "primaryPaths", "operatingRules", "reviewerPaths", "referenceAssets", "falsificationTests", "heroBuilderProof", "operatorOriginProof", "heroFlow", "mobileArtifactSignals"];
const requiredHomeSignalFields = ["name", "description"];
const requiredHomeArticleFields = ["slug", "title", "dek", "theme"];
const requiredHomePatternFields = ["slug", "title", "description"];
const requiredAskFields = ["askRaviPrompts", "guidePaths", "askContextCards", "thesisLenses"];
const requiredFields = ["title", "description", "category", "tags", "status", "createdAt", "updatedAt"];
const requiredArticleFields = ["slug", "title", "dek", "theme", "date", "readingTime", "body"];
const requiredPrincipleFields = ["slug", "statement", "explanation", "example", "whyItMatters", "prevents", "tags", "related"];
const requiredPatternFields = ["slug", "title", "description", "tags", "problem", "context", "forces", "solution", "architecture", "architectureSketch", "failureModes", "evaluation", "whenToUse", "whenNotToUse", "relatedPrinciples", "relatedWiki", "related"];
const requiredProjectFields = ["slug", "name", "summary", "status", "capabilities", "detail"];
const requiredProductFields = ["slug", "name", "tagline", "summary", "relationship", "whatItIs", "whyItMatters", "capabilities", "architecture", "useCases", "principles", "not", "roadmap"];
const requiredArchitectureCardFields = ["title", "pattern", "tags"];
const requiredRadarFields = ["title", "updatedAt", "thesis", "framing", "proofChain", "trends"];
const requiredRadarLifecycleFields = ["stage", "role", "promotionRule", "output", "evidenceHref"];
const requiredBriefFields = ["title", "subtitle", "audience", "thesis", "whyNow", "contrarianInsight", "wedge", "proofPoints", "whatToRemember", "nextMoves"];
const requiredNowFields = ["currentFocus", "building", "studying", "writing", "avoiding", "questions", "researchLedger"];
const requiredNowResearchFields = ["question", "whyItMatters", "currentEvidence", "nextProof", "wouldChangeMind", "href"];
const requiredStartHereFields = ["audience", "care", "readFirst", "ask", "matters"];
const requiredChangelogFields = ["version", "date", "title", "description", "tags"];
const requiredResumeFields = ["headline", "location", "contact", "summary", "strengths", "architectureHighlights", "publicProof", "sourceProvenance", "experience", "skills", "education", "certifications"];
const requiredProfessionalGraphFields = ["identity", "careerEvolution", "careerStory", "capabilityEvidence", "architectThesis", "architectureJudgment", "productionDelivery", "proofLedger", "reviewSpine", "operatingStandards", "credibilityQuestions", "proofLinks", "profileDiscovery", "visitorSuccessQuestions", "relationships"];
const requiredProductionDeliveryFields = ["stage", "responsibility", "publicEvidence", "reviewQuestion", "href"];
const requiredPublicCodeFields = ["title", "summary", "reviewRecordFields", "reviewRubric", "observedPublicStructure", "entries"];
const requiredPublicCodeReviewRecordFields = ["field", "capture", "whyItMatters"];
const requiredPublicCodeEntryFields = ["label", "href", "status", "whatToInspect", "publicSafeUse", "proofBoundary", "related"];
const requiredProjectProofFields = ["title", "updatedAt", "principle", "items"];
const requiredProjectProofItemFields = ["slug", "claim", "visibleArtifact", "inspectionPath", "evidence", "limitation", "nextProof", "reviewQuestion", "related"];
const requiredPublicationSpineFields = ["title", "summary", "updatedAt", "principle", "audienceQuestion", "stages"];
const requiredPublicationSpineStageFields = ["name", "purpose", "primaryAsset", "supportingAssets", "readerQuestion", "proofStandard"];
const requiredProofBacklogFields = ["title", "summary", "updatedAt", "principle", "items"];
const requiredProofBacklogItemFields = ["slug", "claim", "evidenceNeeded", "currentEvidence", "nextProof", "wouldChange", "status", "href"];
const requiredQualityScorecardFields = ["title", "updatedAt", "scale", "rule", "dimensions"];
const requiredQualityScorecardDimensionFields = ["name", "score", "evidence", "gap", "nextProof"];
const requiredVisitorReviewKitFields = ["title", "updatedAt", "purpose", "principle", "reviewPath", "reviewQuestions", "firstImpressionFields", "reviewAssets", "publicChannels", "publicSafetyBoundary"];
const requiredVisitorReviewPathFields = ["step", "href", "question"];
const requiredVisitorReviewAssetFields = ["href", "label", "description"];
const requiredFirstImpressionFieldFields = ["field", "label", "capture", "options"];
const requiredIdentityAssetFields = ["title", "updatedAt", "href", "type", "purpose", "usage", "limitations"];
const requiredRegistryFields = ["title", "slug", "summary", "type", "route", "status", "frameworkLayers", "relatedPrinciples", "relatedPatterns", "relatedArtifacts", "relatedProducts", "relatedLibraryAssets", "publicSafe", "createdAt", "updatedAt", "seo"];
const requiredHarnessFields = ["headline", "statement", "category", "beliefs", "loop", "proofObjects"];
const requiredCanonicalDefinitionFields = ["short", "support", "questions"];
const requiredBuilderDnaFields = ["title", "thesis", "publicSafeSource", "principles", "productTranslation"];
const requiredSentinelContextFields = ["title", "framing", "compliance", "primitives", "controlPlane", "publicThesis"];
const requiredOperationalLayerFields = ["slug", "name", "description", "href"];
const requiredFrameworkFields = ["title", "subtitle", "promise", "thesis", "operatorQuestions", "layers", "designPrinciples", "evaluationCriteria"];
const requiredFrameworkLayerFields = ["name", "definition", "problemSolved", "input", "output", "coreResponsibility", "caseExample", "adjacentLayers", "operationsStage", "askPrompt", "failureMode", "operatorQuestion", "related", "relatedPattern", "relatedArtifact", "relatedLibraryAsset"];
const requiredOperationalSystemFields = ["caseId", "caseTitle", "caseSummary", "promise", "loop", "layerStates", "askPrompts", "decisionPacket"];
const requiredSystemLoopFields = ["name", "href", "description"];
const requiredSystemLayerStateFields = ["layer", "state", "question"];
const requiredDecisionPacketFields = ["hypothesis", "action", "guardrail", "evalStandard", "operatingControls"];
const requiredReleaseFields = ["cadence", "assets", "currentRelease"];
const validStatuses = new Set(["draft", "review", "approved", "published", "archived"]);
const validRegistryStatuses = new Set(["published", "planned", "draft"]);
const validRegistryTypes = new Set(["framework", "pattern", "artifact", "library", "product", "principle", "background", "domain", "system"]);
const errors = [];

function parseFrontmatter(raw, file) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    errors.push(`${file}: missing frontmatter`);
    return { metadata: {}, body: "" };
  }

  const metadata = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (!key || !rest.length) continue;
    const value = rest.join(":").trim();
    try {
      metadata[key.trim()] = value.startsWith("[") ? JSON.parse(value) : value.replace(/^"|"$/g, "");
    } catch {
      errors.push(`${file}: invalid frontmatter value for ${key}`);
    }
  }

  return { metadata, body: match[2].trim() };
}

function requireJsonArray(filePath, label, minCount, options = {}) {
  if (!fs.existsSync(filePath)) {
    errors.push(`${label}: missing corpus`);
    return [];
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(data) || data.length < minCount) {
    errors.push(`${label}: expected at least ${minCount} records`);
    return [];
  }

  if (options.requireSlug !== false) {
    const itemSlugs = data.map((item) => item.slug);
    const duplicateSlugs = itemSlugs.filter((slug, index) => itemSlugs.indexOf(slug) !== index);
    if (duplicateSlugs.length > 0) {
      errors.push(`${label}: duplicate slugs ${[...new Set(duplicateSlugs)].join(", ")}`);
    }
  }

  return data;
}

function validateRequiredFields(label, item, requiredFieldsForItem, options = {}) {
  const owner = `${label}:${item.slug ?? "unknown"}`;
  for (const field of requiredFieldsForItem) {
    if (item[field] == null || item[field] === "" || (!options.allowEmptyArrays && Array.isArray(item[field]) && item[field].length === 0)) {
      errors.push(`${owner}: missing required field ${field}`);
    }
  }
  if (options.requireSlug !== false && !/^[a-z0-9-]+$/.test(item.slug ?? "")) {
    errors.push(`${owner}: slug must be lowercase kebab-case`);
  }
}

function requireJsonObject(filePath, label) {
  if (!fs.existsSync(filePath)) {
    errors.push(`${label}: missing content object`);
    return {};
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    errors.push(`${label}: expected object`);
    return {};
  }

  return data;
}

const files = fs.existsSync(wikiDir) ? fs.readdirSync(wikiDir).filter((file) => file.endsWith(".mdx")) : [];
const homePageSource = fs.readFileSync(homePagePath, "utf8");
const slugs = new Set(files.map((file) => file.replace(/\.mdx$/, "")));
let publishedCount = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(wikiDir, file), "utf8");
  const { metadata, body } = parseFrontmatter(raw, file);

  for (const field of requiredFields) {
    if (metadata[field] == null || metadata[field] === "") {
      errors.push(`${file}: missing required field ${field}`);
    }
  }

  if (!validStatuses.has(metadata.status)) {
    errors.push(`${file}: status must be draft, review, approved, published, or archived`);
  }

  if (!Array.isArray(metadata.tags) || metadata.tags.length === 0) {
    errors.push(`${file}: tags must be a non-empty array`);
  }

  if (metadata.status === "published") {
    publishedCount += 1;
    if (body.length < 80) {
      errors.push(`${file}: published notes need meaningful body content`);
    }
  }

  const related = Array.isArray(metadata.related) ? metadata.related : [];
  for (const relatedSlug of related) {
    if (!slugs.has(relatedSlug)) {
      const knownRoutes = [
        "evidence-driven-rca",
        "transaction-journey-reconstruction",
        "agentic-incident-investigation",
        "operational-memory",
        "evaluation-and-replay",
        "topology-aware-reasoning",
        "shared-context-for-enterprise-agents"
      ];
      if (!knownRoutes.includes(relatedSlug)) {
        errors.push(`${file}: related note ${relatedSlug} does not exist`);
      }
    }
  }
}

if (publishedCount === 0) {
  errors.push("No published wiki notes found");
}

const site = requireJsonObject(sitePath, "content/site.json");
validateRequiredFields("content/site-config.json", site, requiredSiteFields, { requireSlug: false });
if (site.name !== "seri.ai") {
  errors.push("content/site-config.json: name must remain seri.ai");
}
if (site.owner !== "Ravikanth Seri") {
  errors.push("content/site-config.json: owner must remain Ravikanth Seri");
}
for (const field of ["tagline", "positioning", "description", "authorLine", "nowSignal", "brandBelief", "productPromise"]) {
  if (!/Operational Intelligence|Agentic SRE|evidence|replay|evaluation|operator|operations/i.test(site[field] ?? "")) {
    errors.push(`content/site-config.json: ${field} must preserve the Operational Intelligence thesis`);
  }
}
if (!/public-safe/i.test(site.compliance ?? "") || !/confidential|internal/i.test(site.compliance ?? "")) {
  errors.push("content/site-config.json: compliance must preserve public-safe confidential/internal boundary language");
}
if (!Array.isArray(site.operatingSystem) || site.operatingSystem.length < 5) {
  errors.push("content/site-config.json: operatingSystem must include at least five principles");
}
if (!/^https:\/\/www\.linkedin\.com\/in\/ravikanthseri\/?$/.test(site.links?.linkedin ?? "")) {
  errors.push("content/site-config.json: links.linkedin must point to Ravikanth Seri's public LinkedIn profile");
}
if (!/^https:\/\/github\.com\/rseri17-code\/?$/.test(site.links?.github ?? "")) {
  errors.push("content/site-config.json: links.github must point to the public rseri17-code GitHub profile");
}
if (!Array.isArray(site.nav) || site.nav.length < 10) {
  errors.push("content/site-config.json: nav must include the main public routes");
} else {
  const navRoutes = new Set(site.nav.map((item) => item.href));
  for (const route of ["/", "/work", "/framework", "/library", "/library", "/patterns", "/investigation-room", "/ask", "/background", "/contact"]) {
    if (!navRoutes.has(route)) {
      errors.push(`content/site-config.json: nav missing ${route}`);
    }
  }
  for (const item of site.nav) {
    const owner = `content/site-config.json:nav:${item.href ?? "unknown"}`;
    if (!item.href || !String(item.href).startsWith("/")) {
      errors.push(`${owner}: href must be an internal route`);
    }
    if (!item.label || String(item.label).length < 3) {
      errors.push(`${owner}: label is required`);
    }
  }
}

const home = requireJsonObject(homePath, "content/home.json");
validateRequiredFields("content/home.json", home, requiredHomeFields, { requireSlug: false });
if (!/^https:\/\/www\.linkedin\.com\/in\/ravikanthseri\/?$/.test(home.profileLinks?.linkedin ?? "")) {
  errors.push("content/home.json: profileLinks.linkedin must point to Ravikanth Seri's public LinkedIn profile");
}
if (!/^https:\/\/github\.com\/rseri17-code\/?$/.test(home.profileLinks?.github ?? "")) {
  errors.push("content/home.json: profileLinks.github must point to the public rseri17-code GitHub profile");
}
if (!home.harnessThesis?.headline || !/harness/i.test(home.harnessThesis.headline)) {
  errors.push("content/home.json: harnessThesis headline must preserve the harness thesis");
}
if (!/evidence|policy|reasoning|humans/i.test(home.harnessThesis?.statement ?? "")) {
  errors.push("content/home.json: harnessThesis statement must preserve evidence, policy, reasoning, and human-review language");
}
if (!Array.isArray(home.harnessThesis?.loop) || home.harnessThesis.loop.length < 6) {
  errors.push("content/home.json: harnessThesis loop must include at least six stages");
}
if (!Array.isArray(home.linkedInSignals) || home.linkedInSignals.length < 6) {
  errors.push("content/home.json: linkedInSignals must include at least six public thesis signals");
} else {
  const signalNames = new Set(home.linkedInSignals.map((signal) => signal.name));
  for (const required of ["Enterprise Context Layer", "Context Acquisition Tax", "Ops for observability", "Observability for AI"]) {
    if (!signalNames.has(required)) {
      errors.push(`content/home.json: linkedInSignals missing ${required}`);
    }
  }
  for (const signal of home.linkedInSignals) {
    validateRequiredFields("content/home.json", signal, requiredHomeSignalFields, { requireSlug: false });
    if ((signal.description ?? "").length < 80) {
      errors.push(`content/home.json:${signal.name ?? "unknown"}: description too short for thesis context`);
    }
  }
}
if (!home.builderDna?.title || !home.builderDna?.thesis || !Array.isArray(home.builderDna?.principles) || home.builderDna.principles.length < 4) {
  errors.push("content/home.json: builderDna must define title, thesis, and at least four principles");
}
if (!Array.isArray(home.articles) || home.articles.length < 4) {
  errors.push("content/home.json: articles must include at least four featured articles");
} else {
  for (const article of home.articles) {
    validateRequiredFields("content/home.json", article, requiredHomeArticleFields);
    if ((article.dek ?? "").length < 70) {
      errors.push(`content/home.json:${article.slug ?? "unknown"}: dek too short`);
    }
  }
}
if (!Array.isArray(home.patterns) || home.patterns.length < 3) {
  errors.push("content/home.json: patterns must include at least three featured patterns");
} else {
  for (const pattern of home.patterns) {
    validateRequiredFields("content/home.json", pattern, requiredHomePatternFields);
  }
}
if (!Array.isArray(home.categoryContrast) || home.categoryContrast.length < 4 || !home.categoryContrast.some((row) => row[0] === "Operational Intelligence")) {
  errors.push("content/home.json: categoryContrast must compare Operational Intelligence against adjacent modes");
}
if (!Array.isArray(home.primaryPaths) || home.primaryPaths.length < 3) {
  errors.push("content/home.json: primaryPaths must include at least three proof paths");
} else {
  for (const item of home.primaryPaths) {
    const owner = `content/home.json:primaryPaths:${item.href ?? "unknown"}`;
    for (const field of ["href", "label", "title", "body"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!String(item.href ?? "").startsWith("/")) {
      errors.push(`${owner}: href must be an internal route`);
    }
  }
}
for (const [field, minCount] of [
  ["operatingRules", 3],
  ["reviewerPaths", 5],
  ["referenceAssets", 4],
  ["falsificationTests", 4],
  ["heroBuilderProof", 3],
  ["operatorOriginProof", 3],
  ["mobileArtifactSignals", 4]
]) {
  if (!Array.isArray(home[field]) || home[field].length < minCount || home[field].some((row) => !Array.isArray(row) || row.length < 2)) {
    errors.push(`content/home.json: ${field} must include at least ${minCount} complete rows`);
  }
}
if (!Array.isArray(home.heroFlow) || home.heroFlow.length < 5 || !home.heroFlow.includes("Evidence") || !home.heroFlow.includes("Decision")) {
  errors.push("content/home.json: heroFlow must preserve the Operational Intelligence flow");
}
if (!JSON.stringify(home).includes("public-safe") && !JSON.stringify(home).includes("public proof")) {
  errors.push("content/home.json: homepage content must preserve public-safe proof posture");
}
// Repointed 2026-08-30 for the homepage redesign. These assert the same invariants against the
// new hero and thesis section: identity before doctrine, the Authorized Misfire stated once, the
// context-layer response, and the public/private boundary. Pin short fragments only - several of
// the previous pins broke purely because the copy rewrapped across lines.
for (const required of [
  "Production AI systems",
  "I build evidence-grounded AI systems for enterprise operations.",
  "enterprise SRE investigation",
  "misfire because they lack intelligence",
  // Repointed 2026-08-30 (refinement pass). Same four invariants the thesis section must state:
  // rebuild current context, connect the findings, keep unknowns visible, leave the consequential
  // action to a person. Only the wording moved.
  "rebuild what is happening now",
  "show how the findings connect",
  "keep the unknowns visible",
  "leave\n            anything consequential to a person",
  "inspectable without it"
]) {
  if (!homePageSource.includes(required)) {
    errors.push(`app/page.tsx: homepage first impression missing required positioning phrase: ${required}`);
  }
}
for (const forbidden of [
  "seri.ai publishes the doctrine",
  "public home for thinking",
  "AI resume",
  "generic resume",
  "world-class engineer",
  "thought leader",
  "visionary",
  "pioneer"
]) {
  if (homePageSource.toLowerCase().includes(forbidden.toLowerCase())) {
    errors.push(`app/page.tsx: homepage first impression contains weak or inflated phrase: ${forbidden}`);
  }
}

const ask = requireJsonObject(askPath, "content/ask.json");
validateRequiredFields("content/ask.json", ask, requiredAskFields, { requireSlug: false });
if (!Array.isArray(ask.askRaviPrompts) || ask.askRaviPrompts.length < 9 || ask.askRaviPrompts.some((prompt) => !String(prompt).includes("?"))) {
  errors.push("content/ask.json: askRaviPrompts must include at least nine questions");
}
for (const required of ["Context Acquisition Tax", "Enterprise Context Layer", "ops for observability", "observability for AI", "GitHub", "LinkedIn"]) {
  if (!JSON.stringify(ask.askRaviPrompts).toLowerCase().includes(required.toLowerCase())) {
    errors.push(`content/ask.json: askRaviPrompts missing ${required}`);
  }
}
if (!Array.isArray(ask.guidePaths) || ask.guidePaths.length < 10) {
  errors.push("content/ask.json: guidePaths must include at least ten navigation prompts");
} else {
  for (const row of ask.guidePaths) {
    if (!Array.isArray(row) || row.length !== 4) {
      errors.push("content/ask.json: each guidePaths row must include href, title, detail, and prompt");
      continue;
    }
    const [href, title, detail, prompt] = row;
    if (!String(href).startsWith("/")) {
      errors.push(`content/ask.json:${title}: href must be an internal route`);
    }
    if (String(detail).length < 40) {
      errors.push(`content/ask.json:${title}: detail too short`);
    }
    if (String(prompt).length < 24) {
      errors.push(`content/ask.json:${title}: prompt must be meaningful`);
    }
  }
}
if (!Array.isArray(ask.askContextCards) || ask.askContextCards.length < 3) {
  errors.push("content/ask.json: askContextCards must include sources, discipline, and boundary cards");
} else {
  const contextLabels = new Set(ask.askContextCards.map((card) => card.label));
  for (const required of ["Sources", "Discipline", "Boundary"]) {
    if (!contextLabels.has(required)) {
      errors.push(`content/ask.json: askContextCards missing ${required}`);
    }
  }
  for (const card of ask.askContextCards) {
    if (!card.label || !card.value || !card.icon) {
      errors.push("content/ask.json: askContextCards entry missing label, value, or icon");
    }
  }
}
if (!Array.isArray(ask.thesisLenses) || ask.thesisLenses.length < 6) {
  errors.push("content/ask.json: thesisLenses must include at least six lenses");
} else {
  const signalNames = new Set(home.linkedInSignals.map((signal) => signal.name));
  for (const lens of ask.thesisLenses) {
    for (const field of ["label", "title", "prompt", "signalName", "body"]) {
      if (!lens[field]) {
        errors.push(`content/ask.json:${lens.title ?? "unknown"}: missing ${field}`);
      }
    }
    if (!String(lens.prompt ?? "").includes("?")) {
      errors.push(`content/ask.json:${lens.title ?? "unknown"}: prompt must be a question`);
    }
    if (!signalNames.has(lens.signalName)) {
      errors.push(`content/ask.json:${lens.title ?? "unknown"}: signalName must match a home linkedInSignals entry`);
    }
    if (String(lens.body ?? "").length < 80) {
      errors.push(`content/ask.json:${lens.title ?? "unknown"}: body must be meaningful`);
    }
  }
}

const articles = requireJsonArray(articlesPath, "content/articles.json", 10);
for (const article of articles) {
  validateRequiredFields("content/articles.json", article, requiredArticleFields);
  const owner = `content/articles.json:${article.slug ?? "unknown"}`;
  if (!Array.isArray(article.body) || article.body.length < 5) {
    errors.push(`${owner}: body must include at least five paragraphs`);
  }
  if ((article.dek ?? "").length < 40) {
    errors.push(`${owner}: dek too short`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.date ?? "")) {
    errors.push(`${owner}: date must be YYYY-MM-DD`);
  }
}

const controlComparison = articles.find((article) => article.slug === "oi-room-001-control-comparison");
if (!controlComparison?.reviewWorksheet) {
  errors.push("content/articles.json: OI-ROOM-001 control comparison must include reviewWorksheet");
} else {
  const worksheetText = JSON.stringify(controlComparison.reviewWorksheet);
  for (const required of ["Dashboard-only", "Chatbot-only", "Ticket-only", "Operational Intelligence", "Evidence completeness", "Contradiction handling", "falsification"]) {
    if (!worksheetText.includes(required)) {
      errors.push(`content/articles.json: OI-ROOM-001 reviewWorksheet missing ${required}`);
    }
  }
}

const principles = requireJsonArray(principlesPath, "content/principles.json", 10);
for (const principle of principles) {
  validateRequiredFields("content/principles.json", principle, requiredPrincipleFields);
}

const patterns = requireJsonArray(patternsPath, "content/patterns.json", 10);
for (const pattern of patterns) {
  validateRequiredFields("content/patterns.json", pattern, requiredPatternFields);
  const owner = `content/patterns.json:${pattern.slug ?? "unknown"}`;
  if (!Array.isArray(pattern.forces) || pattern.forces.length < 3) {
    errors.push(`${owner}: forces must include at least three tradeoffs`);
  }
  if (!Array.isArray(pattern.failureModes) || pattern.failureModes.length < 3) {
    errors.push(`${owner}: failureModes must include at least three risks`);
  }
  if (!Array.isArray(pattern.architectureSketch) || pattern.architectureSketch.length < 3) {
    errors.push(`${owner}: architectureSketch must include at least three stages`);
  }
}

const projects = requireJsonArray(projectsPath, "content/projects.json", 4);
for (const project of projects) {
  validateRequiredFields("content/projects.json", project, requiredProjectFields);
  if (!["Concept", "Prototype", "Production Pattern"].includes(project.status)) {
    errors.push(`content/projects.json:${project.slug ?? "unknown"}: unsupported status`);
  }
}

const projectProof = requireJsonObject(projectProofPath, "content/project-proof.json");
const evalReport = requireJsonObject(evalReportPath, "content/eval-report.json");
const evalFixtureCount = Array.isArray(evalReport.fixtures) ? evalReport.fixtures.length : 0;
const publicSafetyFixtureTypes = new Set([
  "confidential_private_implementation",
  "private_architecture",
  "confidential_platform_details",
  "screenshots_logs",
  "prompt_injection",
  "proprietary_names"
]);
validateRequiredFields("content/project-proof.json", projectProof, requiredProjectProofFields, { requireSlug: false });
if (!/^\d{4}-\d{2}-\d{2}$/.test(projectProof.updatedAt ?? "")) {
  errors.push("content/project-proof.json: updatedAt must be YYYY-MM-DD");
}
if (!String(projectProof.principle ?? "").includes("what it does not prove")) {
  errors.push("content/project-proof.json: principle must preserve proof-boundary language");
}
if (!Array.isArray(projectProof.items) || projectProof.items.length !== projects.length) {
  errors.push("content/project-proof.json: items must match the project corpus one-to-one");
} else {
  const projectSlugs = new Set(projects.map((project) => project.slug));
  const proofSlugs = new Set(projectProof.items.map((item) => item.slug));
  for (const slug of projectSlugs) {
    if (!proofSlugs.has(slug)) {
      errors.push(`content/project-proof.json: missing proof ledger entry for ${slug}`);
    }
  }
  for (const item of projectProof.items) {
    validateRequiredFields("content/project-proof.json", item, requiredProjectProofItemFields);
    const owner = `content/project-proof.json:${item.slug ?? "unknown"}`;
    if (!projectSlugs.has(item.slug)) {
      errors.push(`${owner}: slug must match content/projects.json`);
    }
    for (const field of ["claim", "evidence", "limitation", "nextProof", "reviewQuestion"]) {
      if (String(item[field] ?? "").length < 90) {
        errors.push(`${owner}: ${field} must contain substantial proof-led project language`);
      }
    }
    if (!String(item.limitation ?? "").toLowerCase().includes("does not")) {
      errors.push(`${owner}: limitation must explicitly state what the project does not prove`);
    }
    if (/\b\d+\s+passing trust fixtures\b/i.test(String(item.evidence ?? ""))) {
      errors.push(`${owner}: evidence must not hard-code Ask fixture counts; use {fixtureCount}`);
    }
    if (!String(item.visibleArtifact ?? "").startsWith("/")) {
      errors.push(`${owner}: visibleArtifact must be an internal route`);
    }
    for (const route of [...(item.inspectionPath ?? []), ...(item.related ?? [])]) {
      if (!String(route).startsWith("/")) {
        errors.push(`${owner}: inspection and related routes must be internal public routes`);
      }
    }
    if (!Array.isArray(item.inspectionPath) || item.inspectionPath.length < 3) {
      errors.push(`${owner}: inspectionPath must include at least three review surfaces`);
    }
    if (!Array.isArray(item.related) || item.related.length < 3) {
      errors.push(`${owner}: related must include at least three graph connections`);
    }
  }
  const askProof = projectProof.items.find((item) => item.slug === "operational-intelligence-copilot");
  if (!String(askProof?.evidence ?? "").includes("{fixtureCount} passing trust fixtures")) {
    errors.push("content/project-proof.json: Ask proof evidence must use the live {fixtureCount} token");
  }
  if (evalFixtureCount < 35) {
    errors.push("content/eval-report.json: expected at least 35 Ask fixtures before project proof can cite fixture coverage");
  }
  for (const fixture of evalReport.fixtures ?? []) {
    if (!fixture || !publicSafetyFixtureTypes.has(fixture.promptType)) continue;
    if (fixture.prompt !== "[redacted public-safety boundary fixture]") {
      errors.push(`content/eval-report.json:${fixture.promptType ?? "unknown"} must redact public-safety boundary prompts`);
    }
  }
}

const products = requireJsonArray(productsPath, "content/products.json", 1);
for (const product of products) {
  validateRequiredFields("content/products.json", product, requiredProductFields);
  const owner = `content/products.json:${product.slug ?? "unknown"}`;
  for (const field of ["whatItIs", "whyItMatters", "capabilities", "architecture", "useCases", "principles", "not", "roadmap"]) {
    if (!Array.isArray(product[field]) || product[field].length < 3) {
      errors.push(`${owner}: ${field} must include at least three entries`);
    }
  }
}

const architectureCards = requireJsonArray(architectureCardsPath, "content/architecture-cards.json", 6, { requireSlug: false });
for (const card of architectureCards) {
  validateRequiredFields("content/architecture-cards.json", card, requiredArchitectureCardFields, { requireSlug: false });
  const owner = `content/architecture-cards.json:${card.title ?? "unknown"}`;
  if (!Array.isArray(card.tags) || card.tags.length < 2) {
    errors.push(`${owner}: tags must include at least two entries`);
  }
}

const thesisRadar = requireJsonObject(thesisRadarPath, "content/thesis-radar.json");
const thesisRadarLifecycle = requireJsonArray(thesisRadarLifecyclePath, "content/thesis-radar-lifecycle.json", 7, { requireSlug: false });
validateRequiredFields("content/thesis-radar.json", thesisRadar, requiredRadarFields, { requireSlug: false });
if (!/^\d{4}-\d{2}-\d{2}$/.test(thesisRadar.updatedAt ?? "")) {
  errors.push("content/thesis-radar.json: updatedAt must be YYYY-MM-DD");
}
if (!Array.isArray(thesisRadar.framing) || thesisRadar.framing.length < 3) {
  errors.push("content/thesis-radar.json: framing must include at least three thesis frames");
}
if (!Array.isArray(thesisRadar.proofChain) || thesisRadar.proofChain.length < 4) {
  errors.push("content/thesis-radar.json: proofChain must include at least four claims");
} else {
  for (const item of thesisRadar.proofChain) {
    const owner = `content/thesis-radar.json:${item.theme ?? "unknown"}`;
    for (const field of ["theme", "publicThought", "marketSignal", "operationalClaim", "falsificationQuestion"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing required field ${field}`);
      }
    }
    if (!String(item.falsificationQuestion ?? "").includes("?") && !String(item.falsificationQuestion ?? "").startsWith("If ")) {
      errors.push(`${owner}: falsificationQuestion must be testable`);
    }
  }
}
const requiredRadarLifecycleStages = [
  "LinkedIn Post",
  "Observation / Field Note",
  "Developed Argument",
  "Pattern",
  "Framework",
  "Canonical Technical Asset",
  "Interactive Demonstration when justified"
];
if (thesisRadarLifecycle.length !== requiredRadarLifecycleStages.length) {
  errors.push(`content/thesis-radar-lifecycle.json: must include exactly ${requiredRadarLifecycleStages.length} stages`);
} else {
  const internalLifecycleHrefs = new Set(["/ideas", "/library", "/patterns", "/framework", "/wiki/operational-intelligence-canonical-doctrine", "/investigation-room"]);
  thesisRadarLifecycle.forEach((item, index) => {
    const owner = `content/thesis-radar-lifecycle.json:${item.stage ?? index}`;
    validateRequiredFields(owner, item, requiredRadarLifecycleFields, { requireSlug: false });
    if (item.stage !== requiredRadarLifecycleStages[index]) {
      errors.push(`${owner}: expected stage ${requiredRadarLifecycleStages[index]}`);
    }
    if (String(item.role ?? "").length < 90) {
      errors.push(`${owner}: role must be a concrete stage responsibility`);
    }
    if (String(item.promotionRule ?? "").length < 90) {
      errors.push(`${owner}: promotionRule must be concrete enough to govern publishing`);
    }
    if (item.evidenceHref !== "https://www.linkedin.com/in/ravikanthseri/" && !internalLifecycleHrefs.has(item.evidenceHref)) {
      errors.push(`${owner}: evidenceHref must be an approved LinkedIn or internal route`);
    }
    const posture = `${item.role ?? ""} ${item.promotionRule ?? ""}`;
    if (/proves?|validates?|confirms?/i.test(posture)) {
      errors.push(`${owner}: lifecycle text must not overstate evidence posture`);
    }
  });
  const lifecycleText = thesisRadarLifecycle.map((item) => `${item.role} ${item.promotionRule}`).join(" ");
  if (!lifecycleText.includes("not a source of proof by itself")) {
    errors.push("content/thesis-radar-lifecycle.json: must state that LinkedIn is not proof by itself");
  }
  if (!lifecycleText.includes("without importing social-media chronology")) {
    errors.push("content/thesis-radar-lifecycle.json: must prevent social-media chronology from becoming site structure");
  }
}
if (!Array.isArray(thesisRadar.trends) || thesisRadar.trends.length < 8) {
  errors.push("content/thesis-radar.json: trends must include at least eight market signals");
} else {
  for (const trend of thesisRadar.trends) {
    const owner = `content/thesis-radar.json:${trend.name ?? "unknown"}`;
    for (const field of ["name", "signal", "whyItMatters", "ravikanthAngle", "sources"]) {
      if (trend[field] == null || trend[field] === "" || (Array.isArray(trend[field]) && trend[field].length === 0)) {
        errors.push(`${owner}: missing required field ${field}`);
      }
    }
    if (!Array.isArray(trend.sources) || trend.sources.length < 2) {
      errors.push(`${owner}: sources must include at least two references`);
    } else {
      for (const source of trend.sources) {
        for (const field of ["label", "url", "evidenceType", "supports"]) {
          if (!source[field]) {
            errors.push(`${owner}: source missing ${field}`);
          }
        }
        if (source.url && !/^https:\/\//.test(source.url)) {
          errors.push(`${owner}: source URL must be https`);
        }
      }
    }
  }
}

const categoryBrief = requireJsonObject(categoryBriefPath, "content/category-brief.json");
validateRequiredFields("content/category-brief.json", categoryBrief, requiredBriefFields, { requireSlug: false });
for (const field of ["whyNow", "proofPoints", "whatToRemember", "nextMoves"]) {
  if (!Array.isArray(categoryBrief[field]) || categoryBrief[field].length < 4) {
    errors.push(`content/category-brief.json: ${field} must include at least four entries`);
  }
}

const nowPage = requireJsonObject(nowPath, "content/now.json");
validateRequiredFields("content/now.json", nowPage, requiredNowFields, { requireSlug: false });
for (const field of requiredNowFields) {
  if (!Array.isArray(nowPage[field]) || nowPage[field].length < 3) {
    errors.push(`content/now.json: ${field} must include at least three entries`);
  }
}
for (const item of nowPage.researchLedger ?? []) {
  const owner = `content/now.json:researchLedger:${item.question ?? "unknown"}`;
  for (const field of requiredNowResearchFields) {
    if (!item[field]) {
      errors.push(`${owner}: missing ${field}`);
    }
  }
  if (String(item.whyItMatters ?? "").length < 100) {
    errors.push(`${owner}: whyItMatters must explain the research significance`);
  }
  if (String(item.currentEvidence ?? "").length < 80) {
    errors.push(`${owner}: currentEvidence must name inspectable public evidence`);
  }
  if (String(item.nextProof ?? "").length < 80) {
    errors.push(`${owner}: nextProof must describe the next evidence to gather`);
  }
  if (!String(item.href ?? "").startsWith("/")) {
    errors.push(`${owner}: href must route to an internal proof asset`);
  }
}

const startHerePaths = requireJsonArray(startHerePath, "content/start-here.json", 5, { requireSlug: false });
const startHereAudiences = startHerePaths.map((item) => item.audience);
const duplicateAudiences = startHereAudiences.filter((audience, index) => startHereAudiences.indexOf(audience) !== index);
if (duplicateAudiences.length > 0) {
  errors.push(`content/start-here.json: duplicate audiences ${[...new Set(duplicateAudiences)].join(", ")}`);
}
for (const pathItem of startHerePaths) {
  validateRequiredFields("content/start-here.json", pathItem, requiredStartHereFields, { requireSlug: false });
  const owner = `content/start-here.json:${pathItem.audience ?? "unknown"}`;
  if (!String(pathItem.ask ?? "").includes("?")) {
    errors.push(`${owner}: ask must be a question`);
  }
  if (!/Ravikanth Seri|Ravikanth's/.test(String(pathItem.care ?? ""))) {
    errors.push(`${owner}: care must keep the audience path connected to Ravikanth Seri, not only the product category`);
  }
  const combinedRoutes = [...(pathItem.readFirst ?? []), ...(pathItem.matters ?? [])];
  if (!combinedRoutes.some((route) => ["/background", "/work", "/resume"].includes(route))) {
    errors.push(`${owner}: path must include at least one person/work evidence route`);
  }
  if (!combinedRoutes.some((route) => /^\/(wiki|publication-pack|patterns|projects|products|investigation-room|evals|framework|map|artifacts|radar|now|manifesto)/.test(route))) {
    errors.push(`${owner}: path must include at least one technical proof route`);
  }
  for (const field of ["readFirst", "matters"]) {
    if (!Array.isArray(pathItem[field]) || pathItem[field].length < 2) {
      errors.push(`${owner}: ${field} must include at least two routes`);
    }
    for (const route of pathItem[field] ?? []) {
      if (!String(route).startsWith("/")) {
        errors.push(`${owner}: ${field} entry must be an absolute route`);
      }
    }
  }
}

const visitorReviewKit = requireJsonObject(visitorReviewKitPath, "content/visitor-review-kit.json");
validateRequiredFields("content/visitor-review-kit.json", visitorReviewKit, requiredVisitorReviewKitFields, { requireSlug: false });
if (!/^\d{4}-\d{2}-\d{2}$/.test(visitorReviewKit.updatedAt ?? "")) {
  errors.push("content/visitor-review-kit.json: updatedAt must be YYYY-MM-DD");
}
if (!/clear|confusing|evidence|strongest|change/i.test(`${visitorReviewKit.purpose ?? ""} ${visitorReviewKit.principle ?? ""}`)) {
  errors.push("content/visitor-review-kit.json: purpose and principle must preserve evidence-oriented first-time review language");
}
if (!/confidential|logs|screenshots|proprietary|customer data|private architecture/i.test(visitorReviewKit.publicSafetyBoundary ?? "")) {
  errors.push("content/visitor-review-kit.json: publicSafetyBoundary must block confidential review submissions");
}
if (!Array.isArray(visitorReviewKit.reviewPath) || visitorReviewKit.reviewPath.length < 6) {
  errors.push("content/visitor-review-kit.json: reviewPath must include at least six review steps");
} else {
  for (const item of visitorReviewKit.reviewPath) {
    validateRequiredFields("content/visitor-review-kit.json", item, requiredVisitorReviewPathFields, { requireSlug: false });
    const owner = `content/visitor-review-kit.json:reviewPath:${item.step ?? "unknown"}`;
    if (!String(item.href ?? "").startsWith("/")) {
      errors.push(`${owner}: href must be an internal review route`);
    }
    if (!String(item.question ?? "").includes("?") || String(item.question ?? "").length < 80) {
      errors.push(`${owner}: question must be a substantial reviewer question`);
    }
  }
}
if (!Array.isArray(visitorReviewKit.reviewQuestions) || visitorReviewKit.reviewQuestions.length < 10) {
  errors.push("content/visitor-review-kit.json: reviewQuestions must include at least ten first-time visitor questions");
}
for (const required of [
  "Can you explain who Ravikanth Seri is without repeating homepage copy?",
  "Can you name the Operational Intelligence thesis in one sentence?",
  "Which public artifact did you inspect before forming an opinion?",
  "What evidence would change your mind?",
  "Can you explain what Ravikanth's GitHub and Sentinalai public work show without inferring private production proof?"
]) {
  if (!JSON.stringify(visitorReviewKit.reviewQuestions).includes(required)) {
    errors.push(`content/visitor-review-kit.json: reviewQuestions missing north-star review question "${required}"`);
  }
}
if (!Array.isArray(visitorReviewKit.firstImpressionFields) || visitorReviewKit.firstImpressionFields.length < 5) {
  errors.push("content/visitor-review-kit.json: firstImpressionFields must include at least five categorical fields");
} else {
  const firstImpressionFields = new Set(visitorReviewKit.firstImpressionFields.map((item) => item.field));
  for (const required of ["personWorkFit", "thesisFit", "proofRouteFit", "artifactRecall", "demoSignal"]) {
    if (!firstImpressionFields.has(required)) {
      errors.push(`content/visitor-review-kit.json: firstImpressionFields missing ${required}`);
    }
  }
  for (const item of visitorReviewKit.firstImpressionFields) {
    validateRequiredFields("content/visitor-review-kit.json", item, requiredFirstImpressionFieldFields, { requireSlug: false });
    const owner = `content/visitor-review-kit.json:firstImpressionFields:${item.field ?? "unknown"}`;
    if (String(item.capture ?? "").length < 80) {
      errors.push(`${owner}: capture must explain what evidence the field records`);
    }
    if (!Array.isArray(item.options) || item.options.length < 4) {
      errors.push(`${owner}: options must provide bounded categorical choices`);
    }
  }
  const firstImpressionText = JSON.stringify(visitorReviewKit.firstImpressionFields);
  for (const required of ["Specific to Ravikanth", "Mostly anonymous", "Followed without coaching", "Strong demo feeling"]) {
    if (!firstImpressionText.includes(required)) {
      errors.push(`content/visitor-review-kit.json: firstImpressionFields missing option "${required}"`);
    }
  }
}
if (!Array.isArray(visitorReviewKit.reviewAssets) || visitorReviewKit.reviewAssets.length < 6) {
  errors.push("content/visitor-review-kit.json: reviewAssets must include at least six review assets");
} else {
  for (const item of visitorReviewKit.reviewAssets) {
    validateRequiredFields("content/visitor-review-kit.json", item, requiredVisitorReviewAssetFields, { requireSlug: false });
    if (!String(item.href ?? "").startsWith("/")) {
      errors.push(`content/visitor-review-kit.json:reviewAssets:${item.label ?? "unknown"} href must be internal`);
    }
  }
  const reviewAssetHrefs = new Set(visitorReviewKit.reviewAssets.map((item) => item.href));
  for (const required of ["/work", "/wiki/operational-intelligence-evidence-pack", "/investigation-room", "/publication-pack/ravikanth-seri-practitioner-review-packet.md"]) {
    if (!reviewAssetHrefs.has(required)) {
      errors.push(`content/visitor-review-kit.json: reviewAssets must include ${required}`);
    }
  }
  const workReviewAsset = visitorReviewKit.reviewAssets.find((item) => item.href === "/work");
  if (!/GitHub|Sentinalai|project proof|public-code/i.test(`${workReviewAsset?.label ?? ""} ${workReviewAsset?.description ?? ""}`)) {
    errors.push("content/visitor-review-kit.json: /work review asset must explicitly cover GitHub, Sentinalai, or public-code/project proof");
  }
}
if (!Array.isArray(visitorReviewKit.publicChannels) || visitorReviewKit.publicChannels.length < 4) {
  errors.push("content/visitor-review-kit.json: publicChannels must include at least four public channels");
} else {
  for (const item of visitorReviewKit.publicChannels) {
    validateRequiredFields("content/visitor-review-kit.json", item, requiredVisitorReviewAssetFields, { requireSlug: false });
    if (!String(item.href ?? "").startsWith("/") && !String(item.href ?? "").startsWith("https://")) {
      errors.push(`content/visitor-review-kit.json:publicChannels:${item.label ?? "unknown"} href must be internal or https`);
    }
  }
}

const identityAsset = requireJsonObject(identityAssetPath, "content/identity-asset.json");
validateRequiredFields("content/identity-asset.json", identityAsset, requiredIdentityAssetFields, { requireSlug: false });
if (!/^\d{4}-\d{2}-\d{2}$/.test(identityAsset.updatedAt ?? "")) {
  errors.push("content/identity-asset.json: updatedAt must be YYYY-MM-DD");
}
if (!String(identityAsset.title ?? "").includes("Ravikanth Seri")) {
  errors.push("content/identity-asset.json: title must name Ravikanth Seri");
}
if (identityAsset.href !== "/identity/ravikanth-seri-identity-mark.svg") {
  errors.push("content/identity-asset.json: href must point to the canonical identity mark asset");
}
if (!/public-safe|identity|Operational Intelligence/i.test(`${identityAsset.type ?? ""} ${identityAsset.purpose ?? ""}`)) {
  errors.push("content/identity-asset.json: type and purpose must preserve public-safe identity intent");
}
if (!Array.isArray(identityAsset.usage) || identityAsset.usage.length < 3) {
  errors.push("content/identity-asset.json: usage must include at least three usage statements");
}
if (!Array.isArray(identityAsset.limitations) || identityAsset.limitations.length < 3) {
  errors.push("content/identity-asset.json: limitations must include at least three limitation statements");
}
const identityAssetText = JSON.stringify(identityAsset);
for (const required of ["not a portrait photo", "public-safe", "does not imply employer affiliation", "does not replace"]) {
  if (!identityAssetText.toLowerCase().includes(required.toLowerCase())) {
    errors.push(`content/identity-asset.json: missing identity boundary ${required}`);
  }
}
if (/endorsement|production adoption|internal screenshot|confidential platform/i.test(identityAssetText) && !/does not imply/i.test(identityAssetText)) {
  errors.push("content/identity-asset.json: identity asset boundaries must not imply endorsement, adoption, or private systems");
}

const changelog = requireJsonArray(changelogPath, "content/changelog.json", 6, { requireSlug: false });
const changelogVersions = changelog.map((entry) => entry.version);
const duplicateVersions = changelogVersions.filter((version, index) => changelogVersions.indexOf(version) !== index);
if (duplicateVersions.length > 0) {
  errors.push(`content/changelog.json: duplicate versions ${[...new Set(duplicateVersions)].join(", ")}`);
}
for (const entry of changelog) {
  validateRequiredFields("content/changelog.json", entry, requiredChangelogFields, { requireSlug: false });
  const owner = `content/changelog.json:${entry.version ?? "unknown"}`;
  if (!/^v\d+\.\d+$/.test(entry.version ?? "")) {
    errors.push(`${owner}: version must use vX.Y format`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date ?? "")) {
    errors.push(`${owner}: date must be YYYY-MM-DD`);
  }
  if (!Array.isArray(entry.tags) || entry.tags.length < 2) {
    errors.push(`${owner}: tags must include at least two entries`);
  }
  if ((entry.description ?? "").length < 80) {
    errors.push(`${owner}: description too short`);
  }
}

const proofBacklog = requireJsonObject(proofBacklogPath, "content/proof-backlog.json");
validateRequiredFields("content/proof-backlog.json", proofBacklog, requiredProofBacklogFields, { requireSlug: false });
if (!/^\d{4}-\d{2}-\d{2}$/.test(proofBacklog.updatedAt ?? "")) {
  errors.push("content/proof-backlog.json: updatedAt must be YYYY-MM-DD");
}
if (!/evidence|proof|claim/i.test(proofBacklog.principle ?? "")) {
  errors.push("content/proof-backlog.json: principle must preserve evidence-backed claim discipline");
}
const requiredProofSlugs = [
  "practitioner-review",
  "control-comparison",
  "ask-quality",
  "production-reliability",
  "visual-mobile-qa",
  "identity-asset",
  "public-code-project-proof"
];
if (!Array.isArray(proofBacklog.items) || proofBacklog.items.length !== requiredProofSlugs.length) {
  errors.push(`content/proof-backlog.json: items must include exactly ${requiredProofSlugs.length} current proof gaps`);
} else {
  const proofSlugs = new Set(proofBacklog.items.map((item) => item.slug));
  for (const slug of requiredProofSlugs) {
    if (!proofSlugs.has(slug)) {
      errors.push(`content/proof-backlog.json: items missing ${slug}`);
    }
  }
  for (const item of proofBacklog.items) {
    validateRequiredFields("content/proof-backlog.json", item, requiredProofBacklogItemFields);
    const owner = `content/proof-backlog.json:${item.slug ?? "unknown"}`;
    for (const field of ["claim", "evidenceNeeded", "currentEvidence", "nextProof", "wouldChange"]) {
      if (String(item[field] ?? "").length < 90) {
        errors.push(`${owner}: ${field} must contain substantial reviewable evidence language`);
      }
    }
    if (!String(item.href ?? "").startsWith("/")) {
      errors.push(`${owner}: href must route to an internal proof surface`);
    }
    if (/complete|proven|world-class|10\/10/i.test(item.status ?? "")) {
      errors.push(`${owner}: status must not overclaim completion`);
    }
  }
  const backlogText = JSON.stringify(proofBacklog);
  for (const required of ["practitioner", "control", "Ask", "reliability", "visual", "identity", "public-code", "project proof", "evidence"]) {
    if (!backlogText.toLowerCase().includes(required.toLowerCase())) {
      errors.push(`content/proof-backlog.json: missing proof backlog theme ${required}`);
    }
  }
}

const qualityScorecard = requireJsonObject(qualityScorecardPath, "content/quality-scorecard.json");
validateRequiredFields("content/quality-scorecard.json", qualityScorecard, requiredQualityScorecardFields, { requireSlug: false });
if (!/^\d{4}-\d{2}-\d{2}$/.test(qualityScorecard.updatedAt ?? "")) {
  errors.push("content/quality-scorecard.json: updatedAt must be YYYY-MM-DD");
}
if (!/evidence-based|non-inflated/i.test(`${qualityScorecard.scale ?? ""} ${qualityScorecard.rule ?? ""}`)) {
  errors.push("content/quality-scorecard.json: scale and rule must preserve evidence-based non-inflated scoring");
}
const requiredQualityDimensions = [
  "Professional Representation",
  "Career Clarity",
  "Technical Authority",
  "Engineering Depth",
  "AI Systems Credibility",
  "Architecture Quality",
  "Publications",
  "Originality",
  "Evidence Quality",
  "Work / Project Proof",
  "Knowledge-Graph Health",
  "Ask Ravikanth",
  "Search / Discoverability",
  "Visual Design",
  "UX",
  "Mobile",
  "Accessibility",
  "SEO",
  "Performance",
  "Reliability",
  "Security & Privacy",
  "Maintainability",
  "Publication Quality",
  "Overall Memorability"
];
if (!Array.isArray(qualityScorecard.dimensions) || qualityScorecard.dimensions.length !== requiredQualityDimensions.length) {
  errors.push(`content/quality-scorecard.json: dimensions must include exactly ${requiredQualityDimensions.length} entries`);
} else {
  const dimensionNames = new Set(qualityScorecard.dimensions.map((dimension) => dimension.name));
  for (const required of requiredQualityDimensions) {
    if (!dimensionNames.has(required)) {
      errors.push(`content/quality-scorecard.json: dimensions missing ${required}`);
    }
  }
  for (const dimension of qualityScorecard.dimensions) {
    validateRequiredFields("content/quality-scorecard.json", dimension, requiredQualityScorecardDimensionFields, { requireSlug: false });
    const owner = `content/quality-scorecard.json:${dimension.name ?? "unknown"}`;
    if (typeof dimension.score !== "number" || dimension.score < 0 || dimension.score > 10) {
      errors.push(`${owner}: score must be a number from 0 to 10`);
    }
    if (dimension.score >= 10) {
      errors.push(`${owner}: score must not claim 10/10 while active proof gaps remain`);
    }
    for (const field of ["evidence", "gap", "nextProof"]) {
      if (String(dimension[field] ?? "").length < 75) {
        errors.push(`${owner}: ${field} must contain substantial evidence-based scoring language`);
      }
    }
  }
}

const resume = requireJsonObject(resumePath, "content/resume.json");
validateRequiredFields("content/resume.json", resume, requiredResumeFields, { requireSlug: false });
if ((resume.summary ?? "").length < 180) {
  errors.push("content/resume.json: summary must provide substantial public-safe career framing");
}
for (const field of ["contact", "strengths", "architectureHighlights", "education", "certifications"]) {
  if (!Array.isArray(resume[field]) || resume[field].length === 0) {
    errors.push(`content/resume.json: ${field} must be a non-empty array`);
  }
}
if (Array.isArray(resume.education)) {
  for (const item of resume.education) {
    const owner = `content/resume.json:education:${item.credential ?? "unknown"}`;
    for (const field of ["credential", "issuer", "status", "sourceClass", "supports"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!/Resume|LinkedIn|public profile/i.test(item.sourceClass ?? "")) {
      errors.push(`${owner}: sourceClass must name the approved public or resume source class`);
    }
  }
}
if (Array.isArray(resume.certifications)) {
  for (const item of resume.certifications) {
    const owner = `content/resume.json:certifications:${item.credential ?? "unknown"}`;
    for (const field of ["credential", "issuer", "status", "sourceClass", "supports", "doesNotProve"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!/Resume|LinkedIn|public profile/i.test(item.sourceClass ?? "")) {
      errors.push(`${owner}: sourceClass must name the approved public or resume source class`);
    }
    if (!/does not|not by itself|historical|private|metrics|replace/i.test(item.doesNotProve ?? "")) {
      errors.push(`${owner}: doesNotProve must preserve credential-boundary language`);
    }
  }
}
if (!Array.isArray(resume.strengths) || resume.strengths.length < 6) {
  errors.push("content/resume.json: strengths must include at least six public capabilities");
}
if (!Array.isArray(resume.architectureHighlights) || resume.architectureHighlights.length < 5) {
  errors.push("content/resume.json: architectureHighlights must include at least five evidence-backed highlights");
}
if (!Array.isArray(resume.publicProof) || resume.publicProof.length < 3) {
  errors.push("content/resume.json: publicProof must include at least three public proof links");
} else {
  for (const proof of resume.publicProof) {
    const owner = `content/resume.json:publicProof:${proof.label ?? "unknown"}`;
    for (const field of ["label", "value", "href", "description"]) {
      if (!proof[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (proof.href && !String(proof.href).startsWith("/") && !/^https:\/\//.test(proof.href)) {
      errors.push(`${owner}: href must be an internal route or https URL`);
    }
  }
}
if (!Array.isArray(resume.sourceProvenance) || resume.sourceProvenance.length < 3) {
  errors.push("content/resume.json: sourceProvenance must include at least three source classes");
} else {
  for (const source of resume.sourceProvenance) {
    const owner = `content/resume.json:sourceProvenance:${source.sourceClass ?? "unknown"}`;
    for (const field of ["sourceClass", "supports", "publicUse"]) {
      if (!source[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
  }
}
if (!Array.isArray(resume.experience) || resume.experience.length < 3) {
  errors.push("content/resume.json: experience must include at least three synthesized experience blocks");
} else {
  for (const item of resume.experience) {
    const owner = `content/resume.json:experience:${item.role ?? "unknown"}`;
    for (const field of ["role", "organization", "period", "impact", "bullets", "employers"]) {
      if (item[field] == null || item[field] === "" || (Array.isArray(item[field]) && item[field].length === 0)) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!Array.isArray(item.bullets) || item.bullets.length < 5) {
      errors.push(`${owner}: bullets must include at least five evidence statements`);
    }
    if (/(internal|private|confidential|proprietary)\s+(product|project|platform|screenshot|architecture|dashboard|dashboards|log|logs)|screenshot/i.test([item.organization, item.impact, ...(item.bullets ?? [])].join(" "))) {
      errors.push(`${owner}: public resume text must avoid internal/confidential implementation language`);
    }
  }
}
if (!Array.isArray(resume.skills) || resume.skills.length < 5) {
  errors.push("content/resume.json: skills must include at least five groups");
} else {
  for (const skill of resume.skills) {
    const owner = `content/resume.json:skills:${skill.group ?? "unknown"}`;
    if (!skill.group || !Array.isArray(skill.items) || skill.items.length < 4) {
      errors.push(`${owner}: skill group must include at least four items`);
    }
  }
}

const professionalGraph = requireJsonObject(professionalGraphPath, "content/professional-graph.json");
validateRequiredFields("content/professional-graph.json", professionalGraph, requiredProfessionalGraphFields, { requireSlug: false });
for (const field of ["person", "siteRole", "throughline", "currentFocus", "publicBoundary"]) {
  if (!professionalGraph.identity?.[field]) {
    errors.push(`content/professional-graph.json:identity missing ${field}`);
  }
}
if (!String(professionalGraph.identity?.person ?? "").includes("Ravikanth Seri")) {
  errors.push("content/professional-graph.json: identity must name Ravikanth Seri");
}
if (!String(professionalGraph.identity?.throughline ?? "").includes("Ravikanth Seri") || !String(professionalGraph.identity?.throughline ?? "").includes("Evidence")) {
  errors.push("content/professional-graph.json: throughline must connect Ravikanth to evidence");
}
if (!/confidential|private systems|internal product names|proprietary architecture/i.test(professionalGraph.identity?.publicBoundary ?? "")) {
  errors.push("content/professional-graph.json: publicBoundary must preserve public-safety exclusions");
}
if (!Array.isArray(professionalGraph.careerEvolution) || professionalGraph.careerEvolution.length < 4) {
  errors.push("content/professional-graph.json: careerEvolution must include foundation, modernization, current work, and public body of work");
} else {
  for (const stage of professionalGraph.careerEvolution) {
    const owner = `content/professional-graph.json:careerEvolution:${stage.period ?? "unknown"}`;
    for (const field of ["period", "stage", "summary", "explains"]) {
      if (!stage[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
  }
  for (const required of ["2008-2022", "2022-2025", "2025-now", "Public body of work"]) {
    if (!professionalGraph.careerEvolution.some((stage) => stage.period === required)) {
      errors.push(`content/professional-graph.json: careerEvolution missing ${required}`);
    }
  }
}
const requiredCareerStoryStages = [
  "Enterprise Integration",
  "Middleware & API Architecture",
  "Identity & Platform Engineering",
  "Cloud & Kubernetes",
  "Observability & AIOps",
  "Production AI Systems",
  "Agentic Operations & Operational Intelligence"
];
if (!Array.isArray(professionalGraph.careerStory) || professionalGraph.careerStory.length !== requiredCareerStoryStages.length) {
  errors.push(`content/professional-graph.json: careerStory must include exactly ${requiredCareerStoryStages.length} ordered stages`);
} else {
  for (const [index, requiredStage] of requiredCareerStoryStages.entries()) {
    const stage = professionalGraph.careerStory[index];
    const owner = `content/professional-graph.json:careerStory:${stage?.stage ?? "unknown"}`;
    if (stage?.stage !== requiredStage) {
      errors.push(`${owner}: expected ordered stage ${requiredStage}`);
    }
    for (const field of ["stage", "summary", "evidence", "connectsTo"]) {
      if (!stage?.[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (String(stage?.summary ?? "").length < 110) {
      errors.push(`${owner}: summary must explain the professional evolution, not just name a domain`);
    }
    if (String(stage?.evidence ?? "").length < 70) {
      errors.push(`${owner}: evidence must name inspectable public-safe capability signals`);
    }
  }
}
if (!Array.isArray(professionalGraph.capabilityEvidence) || professionalGraph.capabilityEvidence.length < 6) {
  errors.push("content/professional-graph.json: capabilityEvidence must include at least six inspectable capabilities");
} else {
  for (const item of professionalGraph.capabilityEvidence) {
    const owner = `content/professional-graph.json:capabilityEvidence:${item.capability ?? "unknown"}`;
    for (const field of ["capability", "proof", "href"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!String(item.href ?? "").startsWith("/")) {
      errors.push(`${owner}: href must route to an internal proof asset`);
    }
  }
}
if (!Array.isArray(professionalGraph.architectThesis) || professionalGraph.architectThesis.length < 3) {
  errors.push("content/professional-graph.json: architectThesis must include at least three public-safe thesis statements");
}
if (!Array.isArray(professionalGraph.architectureJudgment) || professionalGraph.architectureJudgment.length < 5) {
  errors.push("content/professional-graph.json: architectureJudgment must include at least five public-safe decision records");
} else {
  for (const item of professionalGraph.architectureJudgment) {
    const owner = `content/professional-graph.json:architectureJudgment:${item.decision ?? "unknown"}`;
    for (const field of ["decision", "constraint", "publicEvidence", "inspectHref"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (String(item.constraint ?? "").length < 100) {
      errors.push(`${owner}: constraint must explain the production tradeoff being preserved`);
    }
    if (String(item.publicEvidence ?? "").length < 80) {
      errors.push(`${owner}: publicEvidence must name inspectable public-safe artifacts`);
    }
    if (!String(item.inspectHref ?? "").startsWith("/")) {
      errors.push(`${owner}: inspectHref must route to an internal proof asset`);
    }
  }
}
const requiredDeliveryStages = ["Architecture", "Engineering", "Integration", "Evaluation", "Governance", "Production Delivery"];
if (!Array.isArray(professionalGraph.productionDelivery) || professionalGraph.productionDelivery.length !== requiredDeliveryStages.length) {
  errors.push(`content/professional-graph.json: productionDelivery must include exactly ${requiredDeliveryStages.length} delivery stages`);
} else {
  for (const [index, requiredStage] of requiredDeliveryStages.entries()) {
    const item = professionalGraph.productionDelivery[index];
    const owner = `content/professional-graph.json:productionDelivery:${item?.stage ?? "unknown"}`;
    if (item?.stage !== requiredStage) {
      errors.push(`${owner}: expected ordered stage ${requiredStage}`);
    }
    for (const field of requiredProductionDeliveryFields) {
      if (!item?.[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (String(item?.responsibility ?? "").length < 95) {
      errors.push(`${owner}: responsibility must explain the production-delivery work, not just name a phase`);
    }
    if (String(item?.publicEvidence ?? "").length < 70) {
      errors.push(`${owner}: publicEvidence must name public-safe evidence surfaces`);
    }
    if (!String(item?.reviewQuestion ?? "").includes("?") || String(item?.reviewQuestion ?? "").length < 70) {
      errors.push(`${owner}: reviewQuestion must be a substantial reviewer question`);
    }
    if (!String(item?.href ?? "").startsWith("/")) {
      errors.push(`${owner}: href must route to an internal public proof asset`);
    }
  }
  const deliveryText = JSON.stringify(professionalGraph.productionDelivery);
  for (const required of ["architecture", "engineering", "integration", "evaluation", "governance", "production", "public-safe"]) {
    if (!deliveryText.toLowerCase().includes(required)) {
      errors.push(`content/professional-graph.json: productionDelivery missing ${required}`);
    }
  }
}
if (!Array.isArray(professionalGraph.proofLedger) || professionalGraph.proofLedger.length < 4) {
  errors.push("content/professional-graph.json: proofLedger must include at least four challengeable claims");
} else {
  for (const item of professionalGraph.proofLedger) {
    const owner = `content/professional-graph.json:proofLedger:${item.claim ?? "unknown"}`;
    for (const field of ["claim", "inspect", "weakens", "href"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!item.evidence && !item.evidenceTemplate) {
      errors.push(`${owner}: missing evidence or evidenceTemplate`);
    }
    if (!String(item.href ?? "").startsWith("/")) {
      errors.push(`${owner}: href must be an internal route`);
    }
  }
}
for (const [field, minCount] of [["reviewSpine", 5], ["operatingStandards", 3], ["credibilityQuestions", 4], ["proofLinks", 6], ["relationships", 6]]) {
  if (!Array.isArray(professionalGraph[field]) || professionalGraph[field].length < minCount) {
    errors.push(`content/professional-graph.json: ${field} must include at least ${minCount} entries`);
  }
}
const requiredProfileDiscoveryNeeds = [
  "Professional summary",
  "Current role and focus",
  "Career progression",
  "Experience",
  "Selected accomplishments",
  "Selected work",
  "Technical domains",
  "Leadership",
  "Publications",
  "GitHub",
  "Certifications",
  "Education",
  "Resume",
  "LinkedIn",
  "Contact information"
];
if (!Array.isArray(professionalGraph.profileDiscovery) || professionalGraph.profileDiscovery.length !== requiredProfileDiscoveryNeeds.length) {
  errors.push(`content/professional-graph.json: profileDiscovery must include exactly ${requiredProfileDiscoveryNeeds.length} professional profile needs`);
} else {
  for (const requiredNeed of requiredProfileDiscoveryNeeds) {
    if (!professionalGraph.profileDiscovery.some((item) => item.need === requiredNeed)) {
      errors.push(`content/professional-graph.json: profileDiscovery missing "${requiredNeed}"`);
    }
  }
  for (const item of professionalGraph.profileDiscovery) {
    const owner = `content/professional-graph.json:profileDiscovery:${item.need ?? "unknown"}`;
    for (const field of ["need", "primaryHref", "evidenceHref", "proof"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (String(item.proof ?? "").length < 90) {
      errors.push(`${owner}: proof must explain the public-safe evidence path`);
    }
    for (const field of ["primaryHref", "evidenceHref"]) {
      const href = String(item[field] ?? "");
      if (!href.startsWith("/") && !/^https:\/\/github\.com\/rseri17-code/.test(href) && !/^https:\/\/www\.linkedin\.com\/in\/ravikanthseri\/$/.test(href)) {
        errors.push(`${owner}: ${field} must be an internal route or approved public profile URL`);
      }
    }
  }
}
const requiredVisitorQuestions = [
  "Who is Ravikanth Seri?",
  "What has he done professionally?",
  "How has his career evolved?",
  "What is his current technical focus?",
  "What has he actually built?",
  "What technical problems does he specialize in?",
  "What is he building now?",
  "What are his strongest technical capabilities?",
  "How does he think about architecture and engineering?",
  "What has he published?",
  "What frameworks and reference architectures has he developed?",
  "What open-source and public work can be inspected?",
  "What does his GitHub show?",
  "What does his resume show?",
  "What production experience supports his thinking?",
  "What distinguishes his engineering judgment?",
  "What is he learning, researching, and advancing?",
  "How can I contact him?",
  "Why would a world-class engineering organization want to work with him?"
];
if (!Array.isArray(professionalGraph.visitorSuccessQuestions) || professionalGraph.visitorSuccessQuestions.length !== requiredVisitorQuestions.length) {
  errors.push(`content/professional-graph.json: visitorSuccessQuestions must include exactly ${requiredVisitorQuestions.length} north-star questions`);
} else {
  for (const requiredQuestion of requiredVisitorQuestions) {
    if (!professionalGraph.visitorSuccessQuestions.some((item) => item.question === requiredQuestion)) {
      errors.push(`content/professional-graph.json: visitorSuccessQuestions missing "${requiredQuestion}"`);
    }
  }
  for (const item of professionalGraph.visitorSuccessQuestions) {
    const owner = `content/professional-graph.json:visitorSuccessQuestions:${item.question ?? "unknown"}`;
    for (const field of ["question", "answerLens", "primaryHref", "evidenceHref", "askPrompt"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (String(item.answerLens ?? "").length < 70) {
      errors.push(`${owner}: answerLens must be substantial enough to guide a visitor`);
    }
    if (!String(item.askPrompt ?? "").includes("?")) {
      errors.push(`${owner}: askPrompt must be a question`);
    }
    for (const field of ["primaryHref", "evidenceHref"]) {
      const href = String(item[field] ?? "");
      if (!href.startsWith("/") && !/^https:\/\/github\.com\/rseri17-code/.test(href)) {
        errors.push(`${owner}: ${field} must be an internal route or approved GitHub profile`);
      }
    }
  }
}
for (const item of professionalGraph.reviewSpine ?? []) {
  if (!item.href || !item.label || !item.detail || !String(item.href).startsWith("/")) {
    errors.push("content/professional-graph.json: reviewSpine entries require internal href, label, and detail");
  }
}
for (const item of professionalGraph.relationships ?? []) {
  if (!item.from || !item.relation || !item.to) {
    errors.push("content/professional-graph.json: relationships entries require from, relation, and to");
  }
}
if (!JSON.stringify(professionalGraph).includes("Ask Ravikanth") || !JSON.stringify(professionalGraph).includes("LinkedIn") || !JSON.stringify(professionalGraph).includes("GitHub")) {
  errors.push("content/professional-graph.json: graph must connect Ask Ravikanth, LinkedIn, and GitHub public evidence");
}

const publicCode = requireJsonObject(publicCodePath, "content/public-code.json");
validateRequiredFields("content/public-code.json", publicCode, requiredPublicCodeFields, { requireSlug: false });
if (!Array.isArray(publicCode.reviewRecordFields) || publicCode.reviewRecordFields.length < 6) {
  errors.push("content/public-code.json: reviewRecordFields must include at least six project-code review evidence fields");
} else {
  for (const item of publicCode.reviewRecordFields) {
    const owner = `content/public-code.json:reviewRecordFields:${item.field ?? "unknown"}`;
    validateRequiredFields(owner, item, requiredPublicCodeReviewRecordFields, { requireSlug: false });
    if (String(item.capture ?? "").length < 80 || String(item.whyItMatters ?? "").length < 80) {
      errors.push(`${owner}: capture and whyItMatters must define substantial reviewer evidence guidance`);
    }
  }
  const reviewRecordText = JSON.stringify(publicCode.reviewRecordFields);
  for (const required of ["Repository surface inspected", "Visible engineering behavior", "Verdict", "Reasoning loss or ambiguity", "Boundary respected", "Next proof", "production adoption", "repository metrics"]) {
    if (!reviewRecordText.includes(required)) {
      errors.push(`content/public-code.json: reviewRecordFields missing ${required}`);
    }
  }
}
if (!Array.isArray(publicCode.reviewRubric) || publicCode.reviewRubric.length < 4) {
  errors.push("content/public-code.json: reviewRubric must include at least four public-code review questions");
} else {
  for (const item of publicCode.reviewRubric) {
    const owner = `content/public-code.json:reviewRubric:${item.question ?? "unknown"}`;
    for (const field of ["question", "lookFor", "supports", "doNotInfer"]) {
      if (!item[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!/do not|not infer|do not assume/i.test(item.doNotInfer ?? "")) {
      errors.push(`${owner}: doNotInfer must preserve public-code proof boundaries`);
    }
  }
}
if (!Array.isArray(publicCode.observedPublicStructure) || publicCode.observedPublicStructure.length < 3) {
  errors.push("content/public-code.json: observedPublicStructure must include at least three public-safe structure observations");
} else if (!/private deployment|production adoption|live incident outcomes|public-safe/i.test(publicCode.observedPublicStructure.join(" "))) {
  errors.push("content/public-code.json: observedPublicStructure must preserve public-safe interpretation boundaries");
} else if (/\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(agent notes|investigation skills|playbook configs|eval scenario folders|files|folders|commits|stars|contributors)\b/i.test(publicCode.observedPublicStructure.join(" "))) {
  errors.push("content/public-code.json: observedPublicStructure must not publish unvalidated repository inventory counts as proof");
}
if (!Array.isArray(publicCode.entries) || publicCode.entries.length < 3) {
  errors.push("content/public-code.json: entries must include at least three inspectable public-code signals");
} else {
  for (const entry of publicCode.entries) {
    const owner = `content/public-code.json:${entry.label ?? "unknown"}`;
    for (const field of requiredPublicCodeEntryFields) {
      if (!entry[field]) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!String(entry.href ?? "").startsWith("/") && !/^https:\/\/github\.com\/rseri17-code/.test(entry.href ?? "")) {
      errors.push(`${owner}: href must be an internal route or approved rseri17-code GitHub URL`);
    }
    if (String(entry.whatToInspect ?? "").length < 70) {
      errors.push(`${owner}: whatToInspect must give concrete public inspection guidance`);
    }
    if (String(entry.proofBoundary ?? "").length < 90) {
      errors.push(`${owner}: proofBoundary must prevent overclaiming from public code`);
    }
    if (!Array.isArray(entry.related) || entry.related.length < 2 || entry.related.some((route) => !String(route).startsWith("/"))) {
      errors.push(`${owner}: related must include at least two internal routes`);
    }
  }
}

const publicationSpine = requireJsonObject(publicationSpinePath, "content/publication-spine.json");
validateRequiredFields("content/publication-spine.json", publicationSpine, requiredPublicationSpineFields, { requireSlug: false });
if (!Array.isArray(publicationSpine.stages) || publicationSpine.stages.length !== 5) {
  errors.push("content/publication-spine.json: stages must define exactly five editorial stages");
} else {
  const requiredStageNames = ["Define", "Specify", "Demonstrate", "Challenge", "Connect"];
  for (const requiredStageName of requiredStageNames) {
    if (!publicationSpine.stages.some((stage) => stage.name === requiredStageName)) {
      errors.push(`content/publication-spine.json: missing publication stage ${requiredStageName}`);
    }
  }
  for (const stage of publicationSpine.stages) {
    const owner = `content/publication-spine.json:${stage.name ?? "unknown"}`;
    for (const field of requiredPublicationSpineStageFields) {
      if (!stage[field] || (Array.isArray(stage[field]) && stage[field].length === 0)) {
        errors.push(`${owner}: missing ${field}`);
      }
    }
    if (!String(stage.primaryAsset ?? "").startsWith("/")) {
      errors.push(`${owner}: primaryAsset must be an internal public route`);
    }
    if (!Array.isArray(stage.supportingAssets) || stage.supportingAssets.some((route) => !String(route).startsWith("/"))) {
      errors.push(`${owner}: supportingAssets must be internal public routes`);
    }
    if (String(stage.readerQuestion ?? "").length < 40 || !String(stage.readerQuestion ?? "").includes("?")) {
      errors.push(`${owner}: readerQuestion must be a substantial question`);
    }
    if (String(stage.proofStandard ?? "").length < 90) {
      errors.push(`${owner}: proofStandard must define a concrete review standard`);
    }
  }
  const publicationSpineText = JSON.stringify(publicationSpine);
  for (const required of [
    "/wiki/operational-intelligence-canonical-doctrine",
    "/wiki/operational-intelligence-reference-architecture",
    "/investigation-room",
    "/wiki/operational-intelligence-evidence-pack",
    "/work",
    "What should I read first",
    "what does each public asset"
  ]) {
    if (!publicationSpineText.includes(required)) {
      errors.push(`content/publication-spine.json: missing publication-spine contract phrase ${required}`);
    }
  }
}

const contentRegistry = requireJsonArray(contentRegistryPath, "content/content-registry.json", 12);
const registryRoutes = contentRegistry.map((item) => item.route);
const duplicateRegistryRoutes = registryRoutes.filter((route, index) => registryRoutes.indexOf(route) !== index);
if (duplicateRegistryRoutes.length > 0) {
  errors.push(`content/content-registry.json: duplicate routes ${[...new Set(duplicateRegistryRoutes)].join(", ")}`);
}
for (const item of contentRegistry) {
  validateRequiredFields("content/content-registry.json", item, requiredRegistryFields, { allowEmptyArrays: true });
  const owner = `content/content-registry.json:${item.slug ?? "unknown"}`;
  if (!validRegistryTypes.has(item.type)) {
    errors.push(`${owner}: unsupported type ${item.type}`);
  }
  if (!validRegistryStatuses.has(item.status)) {
    errors.push(`${owner}: unsupported status ${item.status}`);
  }
  if (!String(item.route ?? "").startsWith("/")) {
    errors.push(`${owner}: route must be absolute`);
  }
  if (item.publicSafe !== "public-safe") {
    errors.push(`${owner}: publicSafe must be public-safe`);
  }
  for (const field of ["createdAt", "updatedAt"]) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item[field] ?? "")) {
      errors.push(`${owner}: ${field} must be YYYY-MM-DD`);
    }
  }
  for (const field of ["frameworkLayers", "relatedPrinciples", "relatedPatterns", "relatedArtifacts", "relatedProducts", "relatedLibraryAssets"]) {
    if (!Array.isArray(item[field])) {
      errors.push(`${owner}: ${field} must be an array`);
    }
  }
  if (!item.seo?.title || !item.seo?.description) {
    errors.push(`${owner}: seo title and description are required`);
  }
  if ((item.summary ?? "").length < 48) {
    errors.push(`${owner}: summary too short for discovery`);
  }
}
for (const route of ["/framework", "/investigation-room", "/ask", "/work", "/background", "/framework", "/products/reasonops"]) {
  if (!registryRoutes.includes(route)) {
    errors.push(`content/content-registry.json: critical route missing ${route}`);
  }
}

const harnessThesis = requireJsonObject(harnessThesisPath, "content/harness-thesis.json");
validateRequiredFields("content/harness-thesis.json", harnessThesis, requiredHarnessFields, { requireSlug: false });
if (!Array.isArray(harnessThesis.beliefs) || harnessThesis.beliefs.length < 4) {
  errors.push("content/harness-thesis.json: beliefs must include at least four beliefs");
} else {
  for (const belief of harnessThesis.beliefs) {
    const owner = `content/harness-thesis.json:${belief.title ?? "unknown"}`;
    if (!belief.title || !belief.body) {
      errors.push(`${owner}: belief title and body are required`);
    }
  }
}
if (!Array.isArray(harnessThesis.loop) || harnessThesis.loop.length < 6) {
  errors.push("content/harness-thesis.json: loop must include at least six stages");
}
if (!Array.isArray(harnessThesis.proofObjects) || harnessThesis.proofObjects.length < 5) {
  errors.push("content/harness-thesis.json: proofObjects must include at least five objects");
}

const canonicalDefinition = requireJsonObject(canonicalDefinitionPath, "content/canonical-definition.json");
validateRequiredFields("content/canonical-definition.json", canonicalDefinition, requiredCanonicalDefinitionFields, { requireSlug: false });
if (!String(canonicalDefinition.short ?? "").includes("Operational Intelligence")) {
  errors.push("content/canonical-definition.json: short definition must name Operational Intelligence");
}
if (!Array.isArray(canonicalDefinition.questions) || canonicalDefinition.questions.length < 6 || canonicalDefinition.questions.some((question) => !String(question).includes("?"))) {
  errors.push("content/canonical-definition.json: questions must include at least six questions");
}

const builderDna = requireJsonObject(builderDnaPath, "content/builder-dna.json");
validateRequiredFields("content/builder-dna.json", builderDna, requiredBuilderDnaFields, { requireSlug: false });
if (!/public-safe/i.test(builderDna.publicSafeSource ?? "")) {
  errors.push("content/builder-dna.json: publicSafeSource must state the public-safe boundary");
}
if (!Array.isArray(builderDna.principles) || builderDna.principles.length < 6) {
  errors.push("content/builder-dna.json: principles must include at least six operating principles");
} else {
  for (const principle of builderDna.principles) {
    const owner = `content/builder-dna.json:${principle.name ?? "unknown"}`;
    if (!principle.name || !principle.description) {
      errors.push(`${owner}: principle name and description are required`);
    }
  }
}
if (!Array.isArray(builderDna.productTranslation) || builderDna.productTranslation.length < 6) {
  errors.push("content/builder-dna.json: productTranslation must include at least six product surfaces");
}

const sentinelContextModel = requireJsonObject(sentinelContextModelPath, "content/sentinel-context-model.json");
validateRequiredFields("content/sentinel-context-model.json", sentinelContextModel, requiredSentinelContextFields, { requireSlug: false });
if (!/generic/i.test(sentinelContextModel.compliance ?? "") || !/confidential/i.test(sentinelContextModel.compliance ?? "")) {
  errors.push("content/sentinel-context-model.json: compliance must preserve generic public-safe boundary language");
}
if (!Array.isArray(sentinelContextModel.primitives) || sentinelContextModel.primitives.length < 6) {
  errors.push("content/sentinel-context-model.json: primitives must include at least six primitives");
} else {
  for (const primitive of sentinelContextModel.primitives) {
    const owner = `content/sentinel-context-model.json:${primitive.name ?? "unknown"}`;
    if (!primitive.name || !primitive.description) {
      errors.push(`${owner}: primitive name and description are required`);
    }
  }
}
if (!Array.isArray(sentinelContextModel.controlPlane) || sentinelContextModel.controlPlane.length < 6) {
  errors.push("content/sentinel-context-model.json: controlPlane must include at least six surfaces");
}

const operationalLayers = requireJsonArray(operationalLayersPath, "content/operational-layers.json", 10);
for (const layer of operationalLayers) {
  validateRequiredFields("content/operational-layers.json", layer, requiredOperationalLayerFields);
  const owner = `content/operational-layers.json:${layer.slug ?? "unknown"}`;
  if (!String(layer.name ?? "").endsWith("Layer")) {
    errors.push(`${owner}: name must use Layer terminology`);
  }
  if (!String(layer.href ?? "").startsWith("/")) {
    errors.push(`${owner}: href must be an internal route`);
  }
}

const framework = requireJsonObject(operationalIntelligenceFrameworkPath, "content/operational-intelligence-framework.json");
validateRequiredFields("content/operational-intelligence-framework.json", framework, requiredFrameworkFields, { requireSlug: false });
if (!String(framework.title ?? "").includes("Operational Intelligence")) {
  errors.push("content/operational-intelligence-framework.json: title must name Operational Intelligence");
}
if (!Array.isArray(framework.operatorQuestions) || framework.operatorQuestions.length < 6 || framework.operatorQuestions.some((question) => !String(question).includes("?"))) {
  errors.push("content/operational-intelligence-framework.json: operatorQuestions must include at least six questions");
}
if (!Array.isArray(framework.layers) || framework.layers.length !== 10) {
  errors.push("content/operational-intelligence-framework.json: layers must define exactly ten layers");
} else {
  const frameworkLayerNames = framework.layers.map((layer) => layer.name);
  const duplicateLayerNames = frameworkLayerNames.filter((name, index) => frameworkLayerNames.indexOf(name) !== index);
  if (duplicateLayerNames.length > 0) {
    errors.push(`content/operational-intelligence-framework.json: duplicate layers ${[...new Set(duplicateLayerNames)].join(", ")}`);
  }
  for (const layer of framework.layers) {
    validateRequiredFields("content/operational-intelligence-framework.json", layer, requiredFrameworkLayerFields, { requireSlug: false });
    const owner = `content/operational-intelligence-framework.json:${layer.name ?? "unknown"}`;
    if (!String(layer.name ?? "").endsWith("Layer")) {
      errors.push(`${owner}: name must use Layer terminology`);
    }
    if (String(layer.askPrompt ?? "").length < 32) {
      errors.push(`${owner}: askPrompt must be a meaningful assistant prompt`);
    }
    if (!String(layer.operatorQuestion ?? "").includes("?")) {
      errors.push(`${owner}: operatorQuestion must be a question`);
    }
    for (const field of ["related", "relatedPattern", "relatedArtifact", "relatedLibraryAsset"]) {
      const values = Array.isArray(layer[field]) ? layer[field] : [layer[field]];
      for (const route of values) {
        if (!String(route ?? "").startsWith("/")) {
          errors.push(`${owner}: ${field} must contain internal routes`);
        }
      }
    }
  }
  const overviewNames = new Set(operationalLayers.map((layer) => layer.name));
  for (const name of frameworkLayerNames) {
    if (!overviewNames.has(name)) {
      errors.push(`content/operational-intelligence-framework.json:${name}: missing from operational layer overview`);
    }
  }
}
for (const field of ["designPrinciples", "evaluationCriteria"]) {
  if (!Array.isArray(framework[field]) || framework[field].length < 6) {
    errors.push(`content/operational-intelligence-framework.json: ${field} must include at least six entries`);
  }
}

const operationalSystem = requireJsonObject(operationalIntelligenceSystemPath, "content/operational-intelligence-system.json");
validateRequiredFields("content/operational-intelligence-system.json", operationalSystem, requiredOperationalSystemFields, { requireSlug: false });
if (operationalSystem.caseId !== "OI-ROOM-001") {
  errors.push("content/operational-intelligence-system.json: caseId must remain OI-ROOM-001");
}
if (!Array.isArray(operationalSystem.loop) || operationalSystem.loop.length < 3) {
  errors.push("content/operational-intelligence-system.json: loop must include at least three route steps");
} else {
  for (const step of operationalSystem.loop) {
    validateRequiredFields("content/operational-intelligence-system.json", step, requiredSystemLoopFields, { requireSlug: false });
    if (!String(step.href ?? "").startsWith("/")) {
      errors.push(`content/operational-intelligence-system.json:${step.name ?? "unknown"}: href must be an internal route`);
    }
  }
}
if (!Array.isArray(operationalSystem.layerStates) || operationalSystem.layerStates.length !== 10) {
  errors.push("content/operational-intelligence-system.json: layerStates must define exactly ten layer states");
} else {
  const frameworkLayerNames = new Set(Array.isArray(framework.layers) ? framework.layers.map((layer) => layer.name) : []);
  for (const state of operationalSystem.layerStates) {
    validateRequiredFields("content/operational-intelligence-system.json", state, requiredSystemLayerStateFields, { requireSlug: false });
    const owner = `content/operational-intelligence-system.json:${state.layer ?? "unknown"}`;
    if (!frameworkLayerNames.has(state.layer)) {
      errors.push(`${owner}: layer must match framework layer`);
    }
    if (!String(state.question ?? "").includes("?")) {
      errors.push(`${owner}: question must be a question`);
    }
  }
}
if (!Array.isArray(operationalSystem.askPrompts) || operationalSystem.askPrompts.length < 10 || operationalSystem.askPrompts.some((prompt) => String(prompt).length < 32)) {
  errors.push("content/operational-intelligence-system.json: askPrompts must include at least ten meaningful prompts");
}
validateRequiredFields("content/operational-intelligence-system.json", operationalSystem.decisionPacket ?? {}, requiredDecisionPacketFields, { requireSlug: false });
if (!Array.isArray(operationalSystem.decisionPacket?.operatingControls) || operationalSystem.decisionPacket.operatingControls.length < 6) {
  errors.push("content/operational-intelligence-system.json: decisionPacket operatingControls must include at least six controls");
}
if (!/confidential|internal/i.test(operationalSystem.decisionPacket?.guardrail ?? "")) {
  errors.push("content/operational-intelligence-system.json: decisionPacket guardrail must preserve public-safe boundary language");
}

const assetTypes = requireJsonArray(assetTypesPath, "content/asset-types.json", 8, { requireSlug: false });
for (const assetType of assetTypes) {
  if (typeof assetType !== "string" || assetType.length < 3) {
    errors.push("content/asset-types.json: asset types must be meaningful strings");
  }
}

const releaseModel = requireJsonObject(releaseModelPath, "content/release-model.json");
validateRequiredFields("content/release-model.json", releaseModel, requiredReleaseFields, { requireSlug: false });
if (!Array.isArray(releaseModel.assets) || releaseModel.assets.length < 5) {
  errors.push("content/release-model.json: assets must include at least five planned publication assets");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.length} wiki notes (${publishedCount} published), publishing corpora, site, homepage, Ask content, professional graph, foundational models, Operational Intelligence model, registry, resume, navigation, changelog, radar, brief, principles, patterns, projects, products, and architecture cards.`);
