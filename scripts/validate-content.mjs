import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const wikiDir = path.join(root, "content", "wiki");
const requiredFields = ["title", "description", "category", "tags", "status", "createdAt", "updatedAt"];
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

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${files.length} wiki notes (${publishedCount} published).`);
