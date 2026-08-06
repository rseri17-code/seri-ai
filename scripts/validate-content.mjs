import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const wikiDir = path.join(root, "content", "wiki");
const sitePath = path.join(root, "content", "site-config.json");
const articlesPath = path.join(root, "content", "articles.json");
const principlesPath = path.join(root, "content", "principles.json");
const patternsPath = path.join(root, "content", "patterns.json");
const projectsPath = path.join(root, "content", "projects.json");
const productsPath = path.join(root, "content", "products.json");
const architectureCardsPath = path.join(root, "content", "architecture-cards.json");
const thesisRadarPath = path.join(root, "content", "thesis-radar.json");
const categoryBriefPath = path.join(root, "content", "category-brief.json");
const nowPath = path.join(root, "content", "now.json");
const startHerePath = path.join(root, "content", "start-here.json");
const changelogPath = path.join(root, "content", "changelog.json");
const resumePath = path.join(root, "content", "resume.json");
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
const requiredSiteFields = ["name", "owner", "tagline", "positioning", "description", "authorLine", "nowSignal", "brandBelief", "productPromise", "operatingSystem", "compliance", "links", "nav"];
const requiredFields = ["title", "description", "category", "tags", "status", "createdAt", "updatedAt"];
const requiredArticleFields = ["slug", "title", "dek", "theme", "date", "readingTime", "body"];
const requiredPrincipleFields = ["slug", "statement", "explanation", "example", "whyItMatters", "prevents", "tags", "related"];
const requiredPatternFields = ["slug", "title", "description", "tags", "problem", "context", "forces", "solution", "architecture", "architectureSketch", "failureModes", "evaluation", "whenToUse", "whenNotToUse", "relatedPrinciples", "relatedWiki", "related"];
const requiredProjectFields = ["slug", "name", "summary", "status", "capabilities", "detail"];
const requiredProductFields = ["slug", "name", "tagline", "summary", "relationship", "whatItIs", "whyItMatters", "capabilities", "architecture", "useCases", "principles", "not", "roadmap"];
const requiredArchitectureCardFields = ["title", "pattern", "tags"];
const requiredRadarFields = ["title", "updatedAt", "thesis", "framing", "proofChain", "trends"];
const requiredBriefFields = ["title", "subtitle", "audience", "thesis", "whyNow", "contrarianInsight", "wedge", "proofPoints", "whatToRemember", "nextMoves"];
const requiredNowFields = ["currentFocus", "building", "studying", "writing", "avoiding", "questions"];
const requiredStartHereFields = ["audience", "care", "readFirst", "ask", "matters"];
const requiredChangelogFields = ["version", "date", "title", "description", "tags"];
const requiredResumeFields = ["headline", "location", "contact", "summary", "strengths", "architectureHighlights", "publicProof", "sourceProvenance", "experience", "skills", "education", "certifications"];
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
  for (const route of ["/", "/work", "/framework", "/map", "/library", "/patterns", "/investigation-room", "/ask", "/background", "/contact"]) {
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
    for (const field of ["role", "organization", "period", "impact", "bullets"]) {
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

const contentRegistry = requireJsonArray(contentRegistryPath, "content/content-registry.json", 15);
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
for (const route of ["/framework", "/investigation-room", "/ask", "/evals", "/work", "/background", "/radar", "/products/reasonops"]) {
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

console.log(`Validated ${files.length} wiki notes (${publishedCount} published), publishing corpora, foundational models, Operational Intelligence model, registry, resume, navigation, changelog, radar, brief, principles, patterns, projects, products, and architecture cards.`);
