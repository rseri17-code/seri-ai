import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const wikiDir = path.join(root, "content", "wiki");
const articlesPath = path.join(root, "content", "articles.json");
const principlesPath = path.join(root, "content", "principles.json");
const patternsPath = path.join(root, "content", "patterns.json");
const projectsPath = path.join(root, "content", "projects.json");
const productsPath = path.join(root, "content", "products.json");
const architectureCardsPath = path.join(root, "content", "architecture-cards.json");
const thesisRadarPath = path.join(root, "content", "thesis-radar.json");
const categoryBriefPath = path.join(root, "content", "category-brief.json");
const requiredFields = ["title", "description", "category", "tags", "status", "createdAt", "updatedAt"];
const requiredArticleFields = ["slug", "title", "dek", "theme", "date", "readingTime", "body"];
const requiredPrincipleFields = ["slug", "statement", "explanation", "example", "whyItMatters", "prevents", "tags", "related"];
const requiredPatternFields = ["slug", "title", "description", "tags", "problem", "context", "forces", "solution", "architecture", "architectureSketch", "failureModes", "evaluation", "whenToUse", "whenNotToUse", "relatedPrinciples", "relatedWiki", "related"];
const requiredProjectFields = ["slug", "name", "summary", "status", "capabilities", "detail"];
const requiredProductFields = ["slug", "name", "tagline", "summary", "relationship", "whatItIs", "whyItMatters", "capabilities", "architecture", "useCases", "principles", "not", "roadmap"];
const requiredArchitectureCardFields = ["title", "pattern", "tags"];
const requiredRadarFields = ["title", "updatedAt", "thesis", "framing", "proofChain", "trends"];
const requiredBriefFields = ["title", "subtitle", "audience", "thesis", "whyNow", "contrarianInsight", "wedge", "proofPoints", "whatToRemember", "nextMoves"];
const validStatuses = new Set(["draft", "review", "approved", "published", "archived"]);
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
    if (item[field] == null || item[field] === "" || (Array.isArray(item[field]) && item[field].length === 0)) {
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

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.length} wiki notes (${publishedCount} published), publishing corpora, radar, brief, principles, patterns, projects, products, and architecture cards.`);
