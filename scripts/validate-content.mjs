import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const wikiDir = path.join(root, "content", "wiki");
const articlesPath = path.join(root, "content", "articles.json");
const principlesPath = path.join(root, "content", "principles.json");
const patternsPath = path.join(root, "content", "patterns.json");
const requiredFields = ["title", "description", "category", "tags", "status", "createdAt", "updatedAt"];
const requiredArticleFields = ["slug", "title", "dek", "theme", "date", "readingTime", "body"];
const requiredPrincipleFields = ["slug", "statement", "explanation", "example", "whyItMatters", "prevents", "tags", "related"];
const requiredPatternFields = ["slug", "title", "description", "tags", "problem", "context", "forces", "solution", "architecture", "architectureSketch", "failureModes", "evaluation", "whenToUse", "whenNotToUse", "relatedPrinciples", "relatedWiki", "related"];
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

function requireJsonArray(filePath, label, minCount) {
  if (!fs.existsSync(filePath)) {
    errors.push(`${label}: missing corpus`);
    return [];
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(data) || data.length < minCount) {
    errors.push(`${label}: expected at least ${minCount} records`);
    return [];
  }

  const itemSlugs = data.map((item) => item.slug);
  const duplicateSlugs = itemSlugs.filter((slug, index) => itemSlugs.indexOf(slug) !== index);
  if (duplicateSlugs.length > 0) {
    errors.push(`${label}: duplicate slugs ${[...new Set(duplicateSlugs)].join(", ")}`);
  }

  return data;
}

function validateRequiredFields(label, item, requiredFieldsForItem) {
  const owner = `${label}:${item.slug ?? "unknown"}`;
  for (const field of requiredFieldsForItem) {
    if (item[field] == null || item[field] === "" || (Array.isArray(item[field]) && item[field].length === 0)) {
      errors.push(`${owner}: missing required field ${field}`);
    }
  }
  if (!/^[a-z0-9-]+$/.test(item.slug ?? "")) {
    errors.push(`${owner}: slug must be lowercase kebab-case`);
  }
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

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.length} wiki notes (${publishedCount} published), article corpus, principles, and patterns.`);
