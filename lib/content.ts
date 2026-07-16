import fs from "node:fs";
import path from "node:path";
import { articles, contentRegistry, patterns, principles, projects } from "@/content/site";

export type WikiStatus = "draft" | "review" | "approved" | "published" | "archived";

export type WikiNote = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: WikiStatus;
  createdAt: string;
  updatedAt: string;
  readingTime: string;
  related: string[];
  body: string;
  url: string;
};

export type PublicSource = {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  type: "wiki" | "principle" | "pattern" | "project" | "article" | "registry";
  category: string;
  tags: string[];
  author: string;
  assetType: string;
  date: string;
  frameworkLayers: string[];
  principles: string[];
  patterns: string[];
  products: string[];
  status: "published";
};

const wikiDir = path.join(process.cwd(), "content", "wiki");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Missing frontmatter block");
  }

  const metadata: Record<string, unknown> = {};
  for (const line of match[1].split("\n")) {
    const [key, ...rest] = line.split(":");
    if (!key || !rest.length) {
      continue;
    }
    const value = rest.join(":").trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      metadata[key.trim()] = JSON.parse(value);
    } else {
      metadata[key.trim()] = value.replace(/^"|"$/g, "");
    }
  }

  return { metadata, body: match[2].trim() };
}

function readingTime(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min`;
}

export function getAllWikiNotes(): WikiNote[] {
  if (!fs.existsSync(wikiDir)) {
    return [];
  }

  return fs
    .readdirSync(wikiDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(wikiDir, file), "utf8");
      const { metadata, body } = parseFrontmatter(raw);
      const slug = file.replace(/\.mdx$/, "");

      return {
        slug,
        title: String(metadata.title),
        description: String(metadata.description),
        category: String(metadata.category),
        tags: Array.isArray(metadata.tags) ? metadata.tags.map(String) : [],
        status: String(metadata.status) as WikiStatus,
        createdAt: String(metadata.createdAt),
        updatedAt: String(metadata.updatedAt),
        readingTime: readingTime(body),
        related: Array.isArray(metadata.related) ? metadata.related.map(String) : [],
        body,
        url: `/wiki/${slug}`
      };
    })
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getPublishedWikiNotes() {
  return getAllWikiNotes().filter((note) => note.status === "published");
}

export function markdownToParagraphs(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.replace(/^#+\s+/gm, "").trim())
    .filter(Boolean);
}

export function buildPublicSourceIndex(): PublicSource[] {
  const wiki = getPublishedWikiNotes().map((note) => ({
    id: `wiki:${note.slug}`,
    title: note.title,
    description: note.description,
    content: `${note.title}. ${note.description}. ${note.body}`,
    url: note.url,
    type: "wiki" as const,
    category: note.category,
    tags: note.tags,
    author: "Ravikanth Seri",
    assetType: "field-note",
    date: note.updatedAt,
    frameworkLayers: note.tags.filter((tag) => tag.endsWith("Layer")),
    principles: [],
    patterns: note.related.map((slug) => `/patterns/${slug}`),
    products: [],
    status: "published" as const
  }));

  const principleSources = principles.map((principle) => ({
    id: `principle:${principle.slug}`,
    title: principle.statement,
    description: principle.explanation,
    content: `${principle.statement}. ${principle.explanation}. ${principle.example}`,
    url: `/principles#${principle.slug}`,
    type: "principle" as const,
    category: "Principles",
    tags: principle.tags,
    author: "Ravikanth Seri",
    assetType: "principle",
    date: "2026-07-16",
    frameworkLayers: [],
    principles: [],
    patterns: principle.related.filter((item) => item.startsWith("/patterns/")),
    products: [],
    status: "published" as const
  }));

  const patternSources = patterns.map((pattern) => ({
    id: `pattern:${pattern.slug}`,
    title: pattern.title,
    description: pattern.description,
    content: [
      pattern.title,
      pattern.description,
      pattern.problem,
      pattern.context,
      pattern.architecture,
      pattern.evaluation,
      pattern.whenToUse,
      pattern.whenNotToUse
    ].join(". "),
    url: `/patterns/${pattern.slug}`,
    type: "pattern" as const,
    category: "Architecture Patterns",
    tags: pattern.tags,
    author: "Ravikanth Seri",
    assetType: "pattern",
    date: "2026-07-16",
    frameworkLayers: [],
    principles: pattern.relatedPrinciples,
    patterns: pattern.related.filter((item) => item.startsWith("/patterns/")),
    products: [],
    status: "published" as const
  }));

  const projectSources = projects.map((project) => ({
    id: `project:${project.slug}`,
    title: project.name,
    description: project.summary,
    content: `${project.name}. ${project.summary}. ${project.detail}. ${project.capabilities.join(", ")}`,
    url: `/projects/${project.slug}`,
    type: "project" as const,
    category: "Projects",
    tags: project.capabilities,
    author: "Ravikanth Seri",
    assetType: "artifact",
    date: "2026-07-16",
    frameworkLayers: [],
    principles: [],
    patterns: [],
    products: [],
    status: "published" as const
  }));

  const articleSources = articles.map((article) => ({
    id: `article:${article.slug}`,
    title: article.title,
    description: article.dek,
    content: `${article.title}. ${article.dek}. ${article.body.join(" ")}`,
    url: `/ideas/${article.slug}`,
    type: "article" as const,
    category: article.theme,
    tags: [article.theme],
    author: "Ravikanth Seri",
    assetType: "article",
    date: article.date,
    frameworkLayers: [],
    principles: [],
    patterns: [],
    products: [],
    status: "published" as const
  }));

  const registrySources = contentRegistry
    .filter((item) => item.status === "published")
    .map((item) => ({
      id: `registry:${item.slug}`,
      title: item.title,
      description: item.summary,
      content: [
        item.title,
        item.summary,
        item.type,
        item.frameworkLayers.join(", "),
        item.relatedPrinciples.join(", "),
        item.relatedPatterns.join(", "),
        item.relatedArtifacts.join(", "),
        item.relatedProducts.join(", "),
        item.relatedLibraryAssets.join(", ")
      ].join(". "),
      url: item.route,
      type: "registry" as const,
      category: item.type,
      tags: [item.type, ...item.frameworkLayers],
      author: "Ravikanth Seri",
      assetType: item.type,
      date: item.updatedAt,
      frameworkLayers: item.frameworkLayers,
      principles: item.relatedPrinciples,
      patterns: item.relatedPatterns,
      products: item.relatedProducts,
      status: "published" as const
    }));

  return [...registrySources, ...wiki, ...principleSources, ...patternSources, ...projectSources, ...articleSources];
}

export function searchPublicContent(query: string, category = "All", tag = "All") {
  const terms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length > 1);

  return buildPublicSourceIndex()
    .filter((source) => category === "All" || source.category === category)
    .filter((source) => tag === "All" || source.tags.includes(tag))
    .map((source) => {
      const haystack = `${source.title} ${source.description} ${source.content} ${source.tags.join(" ")}`.toLowerCase();
      const score = terms.length ? terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0) : 1;
      return { ...source, score };
    })
    .filter((source) => source.score > 0)
    .sort((a, b) => b.score - a.score);
}
