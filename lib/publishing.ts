import {
  articles,
  contentRegistry,
  operationalIntelligenceFramework,
  patterns,
  principles,
  publicationSpine,
  products,
  projects,
  type Article,
  type ContentRegistryItem,
  type Pattern,
  type Principle,
  type Project
} from "../content/site";
import { getPublishedWikiNotes, type WikiNote } from "./content";

export type PublishingStatus = "draft" | "review" | "approved" | "published" | "archived" | "planned";

export type PublishingAsset = {
  id: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  assetType: "article" | "field-note" | "pattern" | "artifact" | "framework" | "product" | "principle" | "project" | "system";
  status: PublishingStatus;
  author: string;
  date: string;
  updatedAt: string;
  readingTime: string;
  topic: string;
  tags: string[];
  frameworkLayers: string[];
  principles: string[];
  patterns: string[];
  artifacts: string[];
  products: string[];
  askQuestions: string[];
  content: string;
  versionHistory: Array<{ version: string; date: string; note: string }>;
};

export type PublishingRelationship = {
  from: string;
  to: string;
  type: "shares-layer" | "shares-tag" | "cites-pattern" | "cites-principle" | "supports-product" | "related-artifact";
  weight: number;
};

const author = "Ravikanth Seri";
const defaultDate = "2026-07-16";
const referenceDate = "2026-07-25";
const frameworkLayerNames = operationalIntelligenceFramework.layers.map((layer) => layer.name);
let publishingIndexCache: PublishingAsset[] | null = null;
let knowledgeGraphCache: { nodes: PublishingAsset[]; relationships: PublishingRelationship[] } | null = null;

const referencePublicationAssets = [
  {
    slug: "operational-intelligence-reference-architecture-v1",
    title: "Operational Intelligence Reference Architecture v1.0 Markdown",
    description: "Versioned Markdown specification for implementation-neutral Operational Intelligence contracts, schemas, state machines, governance, evaluation, and conformance.",
    url: "/operational-intelligence-reference-architecture-v1.md",
    content: "Operational Intelligence Reference Architecture v1.0. Implementation contracts, schemas, state machines, governance controls, evaluation gates, approval classes, conformance levels, OI-ROOM-001, and public-safe reference architecture."
  },
  {
    slug: "operational-intelligence-diagrams",
    title: "Operational Intelligence Diagram Pack",
    description: "Architecture diagrams, state-machine diagrams, sequence diagrams, evidence graph diagrams, and replay-loop diagrams for Operational Intelligence.",
    url: "/publication-pack/operational-intelligence-diagrams.md",
    content: "Operational Intelligence diagram pack. Architecture diagram, state machine, sequence diagram, evidence graph, replay loop, OI-ROOM-001, ten-layer framework, operator control plane, evaluation gate."
  },
  {
    slug: "operational-intelligence-comparison-tables",
    title: "Operational Intelligence Comparison Tables",
    description: "Comparison tables separating Operational Intelligence from observability, AIOps, AgentOps, ITIL, incident command, SRE, knowledge graphs, and AI evaluation.",
    url: "/publication-pack/operational-intelligence-comparison-tables.md",
    content: "Operational Intelligence comparison tables. Observability, AIOps, AgentOps, ITIL, incident command, SRE, knowledge graphs, AI evaluation, established claims, derived claims, original synthesis, unsupported differentiation."
  },
  {
    slug: "decision-packet-example",
    title: "Decision Packet Example",
    description: "A public-safe example of a reviewable Operational Intelligence decision packet with evidence, risks, alternatives, approval class, and fallback.",
    url: "/publication-pack/decision-packet-example.md",
    content: "Decision packet example. Evidence-backed recommendation, rollback review packet, risk, reversibility, owner, alternatives, operator approval, public-safe OI-ROOM-001."
  },
  {
    slug: "oi-room-001-printable-walkthrough",
    title: "OI-ROOM-001 Printable Walkthrough",
    description: "Printable walkthrough of the synthetic OI-ROOM-001 case through evidence, hypotheses, evaluation gates, decision packet, operator approval, and learning.",
    url: "/publication-pack/oi-room-001-printable-walkthrough.md",
    content: "OI-ROOM-001 printable walkthrough. Synthetic incident, transaction timing, evidence graph, contradictory evidence, missing evidence, hypothesis lifecycle, evaluation gates, decision packet, human approval, learning record."
  },
  {
    slug: "operational-intelligence-executive-summary",
    title: "Operational Intelligence Executive Summary",
    description: "One-page executive summary for the Operational Intelligence doctrine, operating rule, ten layers, and category boundary.",
    url: "/publication-pack/operational-intelligence-executive-summary.md",
    content: "Operational Intelligence executive summary. Reasoning layer between enterprise telemetry and human decision, ten layers, operating rule, not a replacement for observability, SRE, incident management, ITSM, or human command."
  },
  {
    slug: "operational-intelligence-glossary-card",
    title: "Operational Intelligence Glossary Card",
    description: "Canonical glossary reference for Operational Intelligence, Transaction Intelligence, Evidence Graph, Replay Seed, Evaluation Gate, Operator Control Plane, and Operational Memory.",
    url: "/publication-pack/operational-intelligence-glossary-card.md",
    content: "Operational Intelligence glossary card. Operational Intelligence, Transaction Intelligence, Evidence Graph, Observation, Inference, Confirmed Fact, Contradiction, Missing Evidence, Hypothesis Lifecycle, Replay Seed, Evaluation Gate, Decision Packet, Operator Control Plane, Operational Memory."
  },
  {
    slug: "operational-intelligence-evidence-pack-markdown",
    title: "Operational Intelligence Evidence Pack Markdown",
    description: "Benchmark rubric, control comparisons, reviewer-run worksheet, practitioner review model, conformance checklist, evidence ledger, and falsification criteria for Operational Intelligence.",
    url: "/publication-pack/operational-intelligence-evidence-pack.md",
    content: "Operational Intelligence evidence pack. Benchmark rubric, control comparisons, OI-ROOM-001 control comparison protocol, reviewer-run worksheet, practitioner review, evidence ledger, falsification criteria, minimum conformance checklist, observable proof, failure signals, OI-ROOM-001 benchmark, dashboard-only baseline, chatbot-only baseline, ticket-only baseline, operator review."
  },
  {
    slug: "operational-intelligence-conformance-profile",
    title: "Operational Intelligence Conformance Profile",
    description: "Implementation-neutral object profiles and pass/fail checks for Evidence Objects, Hypothesis State, Replay Seed, Evaluation Gate, and Decision Packet conformance.",
    url: "/publication-pack/operational-intelligence-conformance-profile.md",
    content: "Operational Intelligence conformance profile. Evidence Object, Hypothesis State, Replay Seed, Evaluation Gate, Decision Packet, minimum fields, pass fail checks, conformance levels, OI-ROOM-001 conformance example, practitioner review questions, source provenance, contradiction, missing evidence, approval class, owner, fallback, expiration."
  }
];

const referenceDownloadRoutes = [
  "/downloads/operational-intelligence-executive-summary.pdf",
  "/downloads/operational-intelligence-glossary-card.pdf",
  "/downloads/oi-room-001-printable-walkthrough.pdf",
  "/downloads/operational-intelligence-publication-pack.pdf",
  "/downloads/operational-intelligence-evidence-pack.pdf"
];

const layerKeywords: Record<string, string[]> = {
  "Signal Layer": ["signal", "observability", "telemetry", "metric", "log", "trace", "alert", "dashboard"],
  "Transaction Layer": ["transaction", "journey", "workflow", "customer", "latency", "business impact"],
  "Topology Layer": ["topology", "dependency", "blast radius", "ownership", "service", "path"],
  "Evidence Layer": ["evidence", "citation", "source", "receipt", "provenance", "fact", "contradiction"],
  "Reasoning Layer": ["reasoning", "hypothesis", "root cause", "rca", "causal", "explanation"],
  "Memory Layer": ["memory", "replay", "known failure", "lesson", "outcome"],
  "Evaluation Layer": ["evaluation", "eval", "gate", "trust", "quality", "benchmark", "regression"],
  "Decision Layer": ["decision", "action", "recommendation", "rollback", "risk", "mitigation"],
  "Learning Layer": ["learning", "feedback", "post-incident", "improve", "update"],
  "Operator Layer": ["operator", "human", "approval", "review", "control plane", "escalation"]
};

function unique<T>(items: T[]) {
  return [...new Set(items.filter(Boolean))];
}

function countWords(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function readingTime(text: string) {
  return `${Math.max(1, Math.ceil(countWords(text) / 220))} min`;
}

function inferFrameworkLayers(text: string, explicit: string[] = []) {
  const lower = text.toLowerCase();
  const inferred = Object.entries(layerKeywords)
    .filter(([, keywords]) => keywords.some((keyword) => lower.includes(keyword.toLowerCase())))
    .map(([layer]) => layer);
  return unique([...explicit, ...inferred]).filter((layer) => frameworkLayerNames.includes(layer));
}

function inferAskQuestions(asset: Pick<PublishingAsset, "title" | "assetType" | "frameworkLayers">) {
  const firstLayer = asset.frameworkLayers[0] ?? "Operational Intelligence Framework";
  return unique([
    `Explain ${asset.title}.`,
    `How does ${asset.title} connect to ${firstLayer}?`,
    asset.assetType === "pattern" ? `When should I use the ${asset.title} pattern?` : `What should an operator remember from ${asset.title}?`
  ]);
}

function baseVersion(date: string, note = "Initial public-safe publication.") {
  return [{ version: "v1", date, note }];
}

function articleWorksheetContent(article: Article) {
  if (!article.reviewWorksheet) {
    return "";
  }

  return [
    article.reviewWorksheet.title,
    article.reviewWorksheet.purpose,
    ...article.reviewWorksheet.modes.flatMap((mode) => [mode.mode, mode.preserves, mode.likelyLoss, mode.reviewerQuestion]),
    ...article.reviewWorksheet.dimensions.flatMap((dimension) => [dimension.dimension, dimension.ask, dimension.failureSignal]),
    ...article.reviewWorksheet.falsification
  ].join(" ");
}

function articleAsset(article: Article): PublishingAsset {
  const content = `${article.title}. ${article.dek}. ${article.body.join(" ")} ${articleWorksheetContent(article)}`;
  const frameworkLayers = inferFrameworkLayers(content, article.theme === "Operational Intelligence" ? frameworkLayerNames.slice(0, 3) : []);
  const asset: PublishingAsset = {
    id: `article:${article.slug}`,
    slug: article.slug,
    title: article.title,
    description: article.dek,
    url: `/ideas/${article.slug}`,
    assetType: "article",
    status: "published",
    author,
    date: article.date,
    updatedAt: article.date,
    readingTime: article.readingTime || readingTime(content),
    topic: article.theme,
    tags: unique([article.theme, ...frameworkLayers]),
    frameworkLayers,
    principles: principles.filter((principle) => contentMatches(content, principle.tags)).map((principle) => principle.statement),
    patterns: patterns.filter((pattern) => contentMatches(content, [pattern.title, ...pattern.tags])).map((pattern) => `/patterns/${pattern.slug}`),
    artifacts: contentMatches(content, ["incident", "room", "replay", "eval"]) ? ["/investigation-room", "/evals"] : [],
    products: contentMatches(content, ["reasonops", "agentic", "operational intelligence"]) ? ["/products/reasonops"] : [],
    askQuestions: [],
    content,
    versionHistory: baseVersion(article.date)
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function patternAsset(pattern: Pattern): PublishingAsset {
  const content = [
    pattern.title,
    pattern.description,
    pattern.problem,
    pattern.context,
    pattern.solution,
    pattern.architecture,
    pattern.evaluation,
    pattern.whenToUse,
    pattern.whenNotToUse
  ].join(". ");
  const frameworkLayers = inferFrameworkLayers(content);
  const asset: PublishingAsset = {
    id: `pattern:${pattern.slug}`,
    slug: pattern.slug,
    title: pattern.title,
    description: pattern.description,
    url: `/patterns/${pattern.slug}`,
    assetType: "pattern",
    status: "published",
    author,
    date: defaultDate,
    updatedAt: defaultDate,
    readingTime: readingTime(content),
    topic: pattern.tags[0] ?? "Architecture Patterns",
    tags: unique([...pattern.tags, ...frameworkLayers]),
    frameworkLayers,
    principles: pattern.relatedPrinciples,
    patterns: pattern.related.filter((item) => item.startsWith("/patterns/")),
    artifacts: pattern.related.filter((item) => item.startsWith("/investigation-room") || item.startsWith("/evals") || item.startsWith("/map")),
    products: contentMatches(content, ["reasonops"]) ? ["/products/reasonops"] : [],
    askQuestions: [],
    content,
    versionHistory: baseVersion(defaultDate, "Pattern entered the public architecture library.")
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function projectAsset(project: Project): PublishingAsset {
  const content = `${project.name}. ${project.summary}. ${project.detail}. ${project.capabilities.join(", ")}`;
  const frameworkLayers = inferFrameworkLayers(content);
  const asset: PublishingAsset = {
    id: `project:${project.slug}`,
    slug: project.slug,
    title: project.name,
    description: project.summary,
    url: `/projects/${project.slug}`,
    assetType: "artifact",
    status: "published",
    author,
    date: defaultDate,
    updatedAt: defaultDate,
    readingTime: readingTime(content),
    topic: "Artifacts",
    tags: unique([...project.capabilities, ...frameworkLayers]),
    frameworkLayers,
    principles: [],
    patterns: patterns.filter((pattern) => contentMatches(content, [pattern.title, ...pattern.tags])).map((pattern) => `/patterns/${pattern.slug}`),
    artifacts: ["/artifacts"],
    products: contentMatches(content, ["reasonops", "operations"]) ? ["/products/reasonops"] : [],
    askQuestions: [],
    content,
    versionHistory: baseVersion(defaultDate, "Artifact entered the public proof-object index.")
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function productAsset(product: (typeof products)[number]): PublishingAsset {
  const content = [product.name, product.tagline, product.summary, product.relationship, ...product.whatItIs, ...product.whyItMatters, ...product.capabilities].join(". ");
  const frameworkLayers = inferFrameworkLayers(content, ["Reasoning Layer", "Evaluation Layer", "Decision Layer", "Operator Layer"]);
  const asset: PublishingAsset = {
    id: `product:${product.slug}`,
    slug: product.slug,
    title: product.name,
    description: product.summary,
    url: `/products/${product.slug}`,
    assetType: "product",
    status: "published",
    author,
    date: defaultDate,
    updatedAt: defaultDate,
    readingTime: readingTime(content),
    topic: "Products",
    tags: unique(["ReasonOps", "Operational Intelligence", ...product.capabilities, ...frameworkLayers]),
    frameworkLayers,
    principles: product.principles,
    patterns: patterns.filter((pattern) => contentMatches(content, [pattern.title, ...pattern.tags])).map((pattern) => `/patterns/${pattern.slug}`),
    artifacts: ["/investigation-room", "/evals", "/map"],
    products: [],
    askQuestions: [],
    content,
    versionHistory: baseVersion(defaultDate, "Product concept entered the public platform model.")
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function principleAsset(principle: Principle): PublishingAsset {
  const content = `${principle.statement}. ${principle.explanation}. ${principle.example}. ${principle.whyItMatters}. ${principle.prevents}`;
  const frameworkLayers = inferFrameworkLayers(content);
  const asset: PublishingAsset = {
    id: `principle:${principle.slug}`,
    slug: principle.slug,
    title: principle.statement,
    description: principle.explanation,
    url: `/principles#${principle.slug}`,
    assetType: "principle",
    status: "published",
    author,
    date: defaultDate,
    updatedAt: defaultDate,
    readingTime: readingTime(content),
    topic: "Principles",
    tags: unique([...principle.tags, ...frameworkLayers]),
    frameworkLayers,
    principles: [],
    patterns: principle.related.filter((item) => item.startsWith("/patterns/")),
    artifacts: principle.related.filter((item) => item.startsWith("/investigation-room") || item.startsWith("/evals") || item.startsWith("/map")),
    products: [],
    askQuestions: [],
    content,
    versionHistory: baseVersion(defaultDate, "Principle entered the public operating model.")
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function wikiAsset(note: WikiNote): PublishingAsset {
  const content = `${note.title}. ${note.description}. ${note.body}`;
  const frameworkLayers = inferFrameworkLayers(content);
  const asset: PublishingAsset = {
    id: `wiki:${note.slug}`,
    slug: note.slug,
    title: note.title,
    description: note.description,
    url: note.url,
    assetType: "field-note",
    status: note.status,
    author,
    date: note.createdAt,
    updatedAt: note.updatedAt,
    readingTime: note.readingTime,
    topic: note.category,
    tags: unique([...note.tags, ...frameworkLayers]),
    frameworkLayers,
    principles: principles.filter((principle) => contentMatches(content, [principle.statement, ...principle.tags])).map((principle) => principle.statement),
    patterns: patterns.filter((pattern) => note.related.includes(pattern.slug) || contentMatches(content, [pattern.title, ...pattern.tags])).map((pattern) => `/patterns/${pattern.slug}`),
    artifacts: contentMatches(content, ["operations room", "replay", "eval"]) ? ["/investigation-room", "/evals"] : [],
    products: contentMatches(content, ["reasonops", "operational intelligence"]) ? ["/products/reasonops"] : [],
    askQuestions: [],
    content,
    versionHistory: [
      { version: "v1", date: note.createdAt, note: "Created as a public-safe field note." },
      ...(note.updatedAt !== note.createdAt ? [{ version: "v2", date: note.updatedAt, note: "Updated public note." }] : [])
    ]
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function registryAsset(item: ContentRegistryItem): PublishingAsset {
  const content = [
    item.title,
    item.summary,
    item.type,
    item.frameworkLayers.join(", "),
    item.relatedPrinciples.join(", "),
    item.relatedPatterns.join(", "),
    item.relatedArtifacts.join(", "),
    item.relatedProducts.join(", "),
    item.relatedLibraryAssets.join(", ")
  ].join(". ");
  const asset: PublishingAsset = {
    id: `registry:${item.slug}`,
    slug: item.slug,
    title: item.title,
    description: item.summary,
    url: item.route,
    assetType: item.type === "library" ? "article" : item.type === "framework" ? "framework" : item.type === "product" ? "product" : item.type === "artifact" ? "artifact" : "system",
    status: item.status,
    author,
    date: item.createdAt,
    updatedAt: item.updatedAt,
    readingTime: readingTime(content),
    topic: item.type,
    tags: unique([item.type, ...item.frameworkLayers]),
    frameworkLayers: item.frameworkLayers,
    principles: item.relatedPrinciples,
    patterns: item.relatedPatterns,
    artifacts: item.relatedArtifacts,
    products: item.relatedProducts,
    askQuestions: [],
    content,
    versionHistory: baseVersion(item.createdAt, "Registered in the canonical content model.")
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function referencePublicationAsset(item: (typeof referencePublicationAssets)[number]): PublishingAsset {
  const frameworkLayers = inferFrameworkLayers(item.content, frameworkLayerNames);
  const asset: PublishingAsset = {
    id: `reference:${item.slug}`,
    slug: item.slug,
    title: item.title,
    description: item.description,
    url: item.url,
    assetType: "artifact",
    status: "published",
    author,
    date: referenceDate,
    updatedAt: referenceDate,
    readingTime: readingTime(item.content),
    topic: "Reference Assets",
    tags: unique(["Operational Intelligence", "Reference Assets", ...frameworkLayers]),
    frameworkLayers,
    principles: ["Evidence before conclusions", "Evaluation is not a feature; it is the control system", "Human review before consequential action"],
    patterns: ["/patterns/evidence-driven-rca", "/patterns/evaluation-and-replay", "/patterns/human-in-the-loop-operational-ai"],
    artifacts: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack"],
    products: ["/products/reasonops"],
    askQuestions: [],
    content: item.content,
    versionHistory: baseVersion(referenceDate, "Published as a shareable Operational Intelligence reference artifact.")
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function publicationSpineAsset(): PublishingAsset {
  const content = [
    publicationSpine.title,
    publicationSpine.summary,
    publicationSpine.principle,
    publicationSpine.audienceQuestion,
    publicationSpine.stages
      .flatMap((stage) => [
        stage.name,
        stage.purpose,
        stage.primaryAsset,
        ...stage.supportingAssets,
        stage.readerQuestion,
        stage.proofStandard
      ])
      .join(". ")
  ].join(". ");
  const frameworkLayers = inferFrameworkLayers(content, ["Evidence Layer", "Reasoning Layer", "Evaluation Layer", "Operator Layer"]);
  const asset: PublishingAsset = {
    id: "profile:operational-intelligence-publication-spine",
    slug: "operational-intelligence-publication-spine",
    title: publicationSpine.title,
    description: publicationSpine.summary,
    url: "/library",
    assetType: "system",
    status: "published",
    author,
    date: publicationSpine.updatedAt,
    updatedAt: publicationSpine.updatedAt,
    readingTime: readingTime(content),
    topic: "Library",
    tags: unique(["publication spine", "reading order", "body of work", "published work", ...frameworkLayers]),
    frameworkLayers,
    principles: ["Evidence before conclusions"],
    patterns: ["/patterns/evidence-driven-rca", "/patterns/evaluation-and-replay"],
    artifacts: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/investigation-room", "/wiki/operational-intelligence-evidence-pack", "/work"],
    products: ["/products/reasonops"],
    askQuestions: [],
    content,
    versionHistory: baseVersion(publicationSpine.updatedAt, "Publication spine entered the public Library as the editorial inspection path.")
  };
  return { ...asset, askQuestions: inferAskQuestions(asset) };
}

function contentMatches(content: string, terms: string[]) {
  const lower = content.toLowerCase();
  return terms.some((term) => lower.includes(term.toLowerCase()));
}

export function buildPublishingIndex() {
  if (publishingIndexCache) {
    return publishingIndexCache;
  }

  const assets = [
    publicationSpineAsset(),
    ...contentRegistry.map(registryAsset),
    ...referencePublicationAssets.map(referencePublicationAsset),
    ...articles.map(articleAsset),
    ...patterns.map(patternAsset),
    ...projects.map(projectAsset),
    ...products.map(productAsset),
    ...principles.map(principleAsset),
    ...getPublishedWikiNotes().map(wikiAsset)
  ];

  const byUrl = new Map<string, PublishingAsset>();
  for (const asset of assets) {
    const existing = byUrl.get(asset.url);
    if (!existing || existing.assetType === "system") {
      byUrl.set(asset.url, asset);
    }
  }

  publishingIndexCache = [...byUrl.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title));
  return publishingIndexCache;
}

export function getShareableReferenceRoutes() {
  return unique([...referencePublicationAssets.map((asset) => asset.url), ...referenceDownloadRoutes]);
}

export function buildKnowledgeGraph() {
  if (knowledgeGraphCache) {
    return knowledgeGraphCache;
  }

  const assets = buildPublishingIndex();
  const relationships: PublishingRelationship[] = [];

  for (const source of assets) {
    for (const target of assets) {
      if (source.id === target.id) continue;
      const sharedLayers = source.frameworkLayers.filter((layer) => target.frameworkLayers.includes(layer));
      const sharedTags = source.tags.filter((tag) => target.tags.includes(tag));
      if (sharedLayers.length) relationships.push({ from: source.id, to: target.id, type: "shares-layer", weight: sharedLayers.length * 3 });
      if (sharedTags.length) relationships.push({ from: source.id, to: target.id, type: "shares-tag", weight: sharedTags.length });
      if (source.patterns.includes(target.url)) relationships.push({ from: source.id, to: target.id, type: "cites-pattern", weight: 5 });
      if (source.principles.includes(target.title)) relationships.push({ from: source.id, to: target.id, type: "cites-principle", weight: 5 });
      if (source.products.includes(target.url)) relationships.push({ from: source.id, to: target.id, type: "supports-product", weight: 4 });
      if (source.artifacts.includes(target.url)) relationships.push({ from: source.id, to: target.id, type: "related-artifact", weight: 4 });
    }
  }

  knowledgeGraphCache = { nodes: assets, relationships };
  return knowledgeGraphCache;
}

export function getRelatedAssets(asset: PublishingAsset, limit = 6) {
  const graph = buildKnowledgeGraph();
  const scoreById = new Map<string, number>();
  for (const relationship of graph.relationships) {
    if (relationship.from === asset.id) {
      scoreById.set(relationship.to, (scoreById.get(relationship.to) ?? 0) + relationship.weight);
    }
  }
  return graph.nodes
    .filter((node) => node.id !== asset.id)
    .map((node) => ({ asset: node, score: scoreById.get(node.id) ?? 0 }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.asset.updatedAt.localeCompare(a.asset.updatedAt))
    .slice(0, limit)
    .map((item) => item.asset);
}

export function getPublishingFacets(assets = buildPublishingIndex()) {
  return {
    topics: unique(assets.map((asset) => asset.topic)).sort(),
    tags: unique(assets.flatMap((asset) => asset.tags)).sort(),
    frameworkLayers: unique(assets.flatMap((asset) => asset.frameworkLayers)).sort(),
    authors: unique(assets.map((asset) => asset.author)).sort(),
    assetTypes: unique(assets.map((asset) => asset.assetType)).sort(),
    principles: unique(assets.flatMap((asset) => asset.principles)).sort(),
    patterns: unique(assets.flatMap((asset) => asset.patterns)).sort(),
    products: unique(assets.flatMap((asset) => asset.products)).sort()
  };
}

export function searchPublishingIndex({
  query = "",
  topic = "All",
  tag = "All",
  frameworkLayer = "All",
  author: authorFilter = "All",
  assetType = "All",
  principle = "All",
  pattern = "All",
  product = "All",
  date = "All"
}: {
  query?: string;
  topic?: string;
  tag?: string;
  frameworkLayer?: string;
  author?: string;
  assetType?: string;
  principle?: string;
  pattern?: string;
  product?: string;
  date?: string;
}) {
  const terms = query.toLowerCase().split(/\W+/).filter((term) => term.length > 1);
  return buildPublishingIndex()
    .filter((asset) => asset.status === "published")
    .filter((asset) => topic === "All" || asset.topic === topic)
    .filter((asset) => tag === "All" || asset.tags.includes(tag))
    .filter((asset) => frameworkLayer === "All" || asset.frameworkLayers.includes(frameworkLayer))
    .filter((asset) => authorFilter === "All" || asset.author === authorFilter)
    .filter((asset) => assetType === "All" || asset.assetType === assetType)
    .filter((asset) => principle === "All" || asset.principles.includes(principle))
    .filter((asset) => pattern === "All" || asset.patterns.includes(pattern))
    .filter((asset) => product === "All" || asset.products.includes(product))
    .filter((asset) => date === "All" || asset.date.startsWith(date))
    .map((asset) => {
      const haystack = `${asset.title} ${asset.description} ${asset.content} ${asset.tags.join(" ")} ${asset.frameworkLayers.join(" ")}`.toLowerCase();
      const score = terms.length
        ? terms.reduce((sum, term) => sum + (haystack.includes(term) ? 2 : 0) + (asset.title.toLowerCase().includes(term) ? 3 : 0), 0)
        : 1;
      return { ...asset, score };
    })
    .filter((asset) => asset.score > 0)
    .sort((a, b) => b.score - a.score || b.updatedAt.localeCompare(a.updatedAt));
}

export function getPublicationChangelog() {
  return buildPublishingIndex()
    .filter((asset) => asset.status === "published")
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .map((asset) => ({
      version: `pub-${asset.updatedAt}-${asset.slug}`,
      date: asset.updatedAt,
      title: `Published: ${asset.title}`,
      description: `${asset.description} Connected to ${asset.frameworkLayers.slice(0, 3).join(", ") || "Operational Intelligence"}.`,
      tags: unique([asset.assetType, asset.topic, ...asset.frameworkLayers.slice(0, 2)])
    }));
}

export function buildRssFeed(siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seri.ai") {
  const assets = buildPublishingIndex().filter((asset) => asset.status === "published").slice(0, 50);
  const items = assets
    .map(
      (asset) => `
    <item>
      <title>${escapeXml(asset.title)}</title>
      <link>${siteUrl}${asset.url}</link>
      <guid>${siteUrl}${asset.url}</guid>
      <description>${escapeXml(asset.description)}</description>
      <author>${escapeXml(asset.author)}</author>
      <pubDate>${new Date(asset.updatedAt).toUTCString()}</pubDate>
      <category>${escapeXml(asset.assetType)}</category>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>seri.ai</title>
    <link>${siteUrl}</link>
    <description>Operational Intelligence field notes, patterns, artifacts, and product updates.</description>
    <language>en-us</language>${items}
  </channel>
</rss>
`;
}

export function buildMonthlyNewsletterExport(month: string) {
  const assets = buildPublishingIndex().filter((asset) => asset.updatedAt.startsWith(month) && asset.status === "published");
  return [
    `# This Month on seri.ai - ${month}`,
    "",
    "## New Publications",
    ...assets.map((asset) => `- [${asset.title}](${asset.url}) - ${asset.description}`),
    "",
    "## Framework Coverage",
    ...unique(assets.flatMap((asset) => asset.frameworkLayers)).map((layer) => `- ${layer}`),
    "",
    "## Ask Ravi Questions",
    ...unique(assets.flatMap((asset) => asset.askQuestions)).map((question) => `- ${question}`)
  ].join("\n");
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
