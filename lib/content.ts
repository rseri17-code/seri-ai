import fs from "node:fs";
import path from "node:path";
import { articles, contentRegistry, patterns, principles, professionalGraph, projects, resume, site, thesisRadar } from "../content/site";

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

const referenceDate = "2026-07-25";
let allWikiNotesCache: WikiNote[] | null = null;
let publishedWikiNotesCache: WikiNote[] | null = null;
let publicSourceIndexCache: PublicSource[] | null = null;

const referenceSources = [
  {
    id: "reference:operational-intelligence-reference-architecture-v1",
    title: "Operational Intelligence Reference Architecture v1.0 Markdown",
    description: "Versioned Markdown specification for Operational Intelligence contracts, schemas, state machines, governance, evaluation, and conformance.",
    content:
      "Operational Intelligence Reference Architecture v1.0 Markdown. Implementation contracts, schemas, state machines, governance controls, evaluation gates, approval classes, conformance levels, OI-ROOM-001, and public-safe reference architecture.",
    url: "/operational-intelligence-reference-architecture-v1.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "Reference Architecture", "contracts", "schemas", "state machines", "conformance"],
    assetType: "artifact"
  },
  {
    id: "reference:operational-intelligence-diagrams",
    title: "Operational Intelligence Diagram Pack",
    description: "Architecture diagrams, state-machine diagrams, sequence diagrams, evidence graph diagrams, and replay-loop diagrams.",
    content:
      "Operational Intelligence Diagram Pack. Architecture diagram, state-machine diagram, sequence diagram, evidence graph diagram, replay and learning loop, OI-ROOM-001, ten-layer framework, operator control plane, evaluation gate.",
    url: "/publication-pack/operational-intelligence-diagrams.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "diagram", "state machine", "sequence diagram", "evidence graph", "replay"],
    assetType: "artifact"
  },
  {
    id: "reference:operational-intelligence-comparison-tables",
    title: "Operational Intelligence Comparison Tables",
    description: "Comparison tables for Operational Intelligence, observability, AIOps, AgentOps, ITIL, incident command, SRE, knowledge graphs, and AI evaluation.",
    content:
      "Operational Intelligence Comparison Tables. Adjacent discipline comparison, claim classification, conformance levels, established practice, derived practice, original synthesis, speculative guidance, unsupported claims.",
    url: "/publication-pack/operational-intelligence-comparison-tables.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "comparison", "AIOps", "observability", "SRE", "claim classification"],
    assetType: "artifact"
  },
  {
    id: "reference:decision-packet-example",
    title: "Decision Packet Example",
    description: "Public-safe review packet example for evidence-backed recommendations, risk, reversibility, alternatives, approval class, and fallback.",
    content:
      "Decision Packet Example. Evidence-backed recommendation, rollback review packet, approval class, risk, reversibility, owner, alternatives, contradictory evidence, missing evidence, operator approval, public-safe OI-ROOM-001.",
    url: "/publication-pack/decision-packet-example.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "Decision Layer", "Operator Layer", "decision packet", "approval"],
    assetType: "artifact"
  },
  {
    id: "reference:oi-room-001-printable-walkthrough",
    title: "OI-ROOM-001 Printable Walkthrough",
    description: "Printable walkthrough of the synthetic OI-ROOM-001 investigation through evidence, hypotheses, evaluation gates, decision packet, and learning.",
    content:
      "OI-ROOM-001 Printable Walkthrough. Synthetic incident, transaction timing, evidence table, evidence graph, contradictory evidence, missing evidence, hypothesis lifecycle, evaluation gates, decision packet, human approval, learning record.",
    url: "/publication-pack/oi-room-001-printable-walkthrough.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "OI-ROOM-001", "walkthrough", "evidence graph", "hypothesis lifecycle"],
    assetType: "artifact"
  },
  {
    id: "reference:operational-intelligence-executive-summary",
    title: "Operational Intelligence Executive Summary",
    description: "One-page executive summary for the Operational Intelligence doctrine, ten layers, operating rule, and category boundary.",
    content:
      "Operational Intelligence Executive Summary. One-page executive summary. Reasoning layer between enterprise telemetry and human decision, ten layers, operating rule, not a replacement for observability, SRE, incident management, ITSM, or human command.",
    url: "/publication-pack/operational-intelligence-executive-summary.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "executive summary", "doctrine", "ten layers"],
    assetType: "artifact"
  },
  {
    id: "reference:operational-intelligence-glossary-card",
    title: "Operational Intelligence Glossary Card",
    description: "Canonical glossary reference for Operational Intelligence terms including Transaction Intelligence, Evidence Graph, Replay Seed, Evaluation Gate, and Operator Control Plane.",
    content:
      "Operational Intelligence Glossary Card. Operational Intelligence, Transaction Intelligence, Evidence Graph, Observation, Inference, Confirmed Fact, Contradiction, Missing Evidence, Hypothesis Lifecycle, Replay Seed, Evaluation Gate, Decision Packet, Operator Control Plane, Operational Memory.",
    url: "/publication-pack/operational-intelligence-glossary-card.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "glossary", "Transaction Intelligence", "Evidence Graph", "Replay Seed"],
    assetType: "artifact"
  },
  {
    id: "reference:operational-intelligence-evidence-pack-markdown",
    title: "Operational Intelligence Evidence Pack Markdown",
    description: "Benchmark rubric, control comparisons, reviewer-run worksheet, practitioner review model, evidence ledger, minimum conformance checklist, and falsification criteria.",
    content:
      "Operational Intelligence Evidence Pack Markdown. Benchmark rubric, control comparisons, OI-ROOM-001 control comparison protocol, reviewer-run worksheet, practitioner review, evidence ledger, falsification criteria, minimum conformance checklist, observable proof, failure signals, OI-ROOM-001 benchmark, dashboard-only baseline, chatbot-only baseline.",
    url: "/publication-pack/operational-intelligence-evidence-pack.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "evidence pack", "benchmark", "falsification", "conformance"],
    assetType: "artifact"
  },
  {
    id: "reference:operational-intelligence-conformance-profile",
    title: "Operational Intelligence Conformance Profile",
    description: "Implementation-neutral object profiles and pass/fail checks for Evidence Object, Hypothesis State, Replay Seed, Evaluation Gate, and Decision Packet conformance.",
    content:
      "Operational Intelligence Conformance Profile. Required fields and pass/fail checks for Evidence Object, Hypothesis State, Replay Seed, Evaluation Gate, and Decision Packet. Minimum conformance levels, OI-ROOM-001 conformance example, source provenance, contradiction, missing evidence, approval class, owner, fallback, expiration, practitioner review questions.",
    url: "/publication-pack/operational-intelligence-conformance-profile.md",
    type: "registry" as const,
    category: "Reference Assets",
    tags: ["Operational Intelligence", "conformance profile", "Evidence Object", "Hypothesis State", "Replay Seed", "Evaluation Gate", "Decision Packet"],
    assetType: "artifact"
  },
  {
    id: "download:operational-intelligence-publication-pack",
    title: "Operational Intelligence Publication Pack PDF",
    description: "Shareable PDF export containing the Operational Intelligence diagrams, comparison tables, decision packet, walkthrough, executive summary, and glossary.",
    content:
      "Operational Intelligence Publication Pack PDF. Downloadable reference PDF for diagrams, comparison tables, decision packet, OI-ROOM-001 walkthrough, executive summary, glossary card, and review conversations.",
    url: "/downloads/operational-intelligence-publication-pack.pdf",
    type: "registry" as const,
    category: "Reference Downloads",
    tags: ["Operational Intelligence", "PDF", "download", "publication pack"],
    assetType: "artifact"
  },
  {
    id: "download:operational-intelligence-evidence-pack",
    title: "Operational Intelligence Evidence Pack PDF",
    description: "Shareable PDF export for evaluating Operational Intelligence with benchmarks, control comparisons, practitioner review, and falsification criteria.",
    content:
      "Operational Intelligence Evidence Pack PDF. Downloadable evidence PDF for benchmark rubric, control comparisons, OI-ROOM-001 control comparison protocol, practitioner review, minimum conformance checklist, evidence ledger, and falsification criteria.",
    url: "/downloads/operational-intelligence-evidence-pack.pdf",
    type: "registry" as const,
    category: "Reference Downloads",
    tags: ["Operational Intelligence", "PDF", "download", "evidence pack", "falsification"],
    assetType: "artifact"
  },
  {
    id: "download:oi-room-001-printable-walkthrough",
    title: "OI-ROOM-001 Walkthrough PDF",
    description: "Downloadable PDF walkthrough of the synthetic Operations Room case and decision packet.",
    content:
      "OI-ROOM-001 Walkthrough PDF. Downloadable printable walkthrough for transaction timing, evidence table, hypothesis lifecycle, evaluation gates, decision packet, operator approval, and learning record.",
    url: "/downloads/oi-room-001-printable-walkthrough.pdf",
    type: "registry" as const,
    category: "Reference Downloads",
    tags: ["Operational Intelligence", "PDF", "download", "OI-ROOM-001", "walkthrough"],
    assetType: "artifact"
  }
];

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

function articleWorksheetContent(article: (typeof articles)[number]) {
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

export function getAllWikiNotes(): WikiNote[] {
  if (allWikiNotesCache) {
    return allWikiNotesCache;
  }

  if (!fs.existsSync(wikiDir)) {
    allWikiNotesCache = [];
    return allWikiNotesCache;
  }

  allWikiNotesCache = fs
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

  return allWikiNotesCache;
}

export function getPublishedWikiNotes() {
  if (publishedWikiNotesCache) {
    return publishedWikiNotesCache;
  }

  publishedWikiNotesCache = getAllWikiNotes().filter((note) => note.status === "published");
  return publishedWikiNotesCache;
}

export function markdownToParagraphs(markdown: string) {
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.replace(/^#+\s+/gm, "").trim())
    .filter(Boolean);
}

export function buildPublicSourceIndex(): PublicSource[] {
  if (publicSourceIndexCache) {
    return publicSourceIndexCache;
  }

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
    content: `${article.title}. ${article.dek}. ${article.body.join(" ")} ${articleWorksheetContent(article)}`,
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

  const profileSources = [
    {
      id: "profile:ravikanth-seri-public-work",
      title: "Ravikanth Seri Public Work and Proof",
      description: "Public index of Ravikanth Seri's Operational Intelligence work, public proof, GitHub, LinkedIn, projects, systems, and professional background.",
      content: [
        site.owner,
        site.authorLine,
        site.nowSignal,
        resume.headline,
        resume.summary,
        resume.publicProof.flatMap((item) => [item.label, item.value, item.description]).join(". "),
        resume.strengths.join(". "),
        resume.architectureHighlights.join(". "),
        professionalGraph.identity.throughline,
        professionalGraph.identity.currentFocus,
        professionalGraph.identity.publicBoundary,
        professionalGraph.careerEvolution.flatMap((stage) => [stage.period, stage.stage, stage.summary, stage.explains]).join(". "),
        professionalGraph.careerStory.flatMap((stage) => [stage.stage, stage.summary, stage.evidence, stage.connectsTo]).join(". "),
        professionalGraph.capabilityEvidence.map((item) => item.capability).join(". "),
        professionalGraph.architectThesis.join(". "),
        professionalGraph.relationships.flatMap((item) => [item.from, item.relation, item.to]).join(". ")
      ].join(". "),
      url: "/work",
      type: "registry" as const,
      category: "background",
      tags: ["work", "public proof", "GitHub", "LinkedIn", "portfolio", "Operational Intelligence", "architecture judgment", "preserved constraints"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: "2026-07-25",
      frameworkLayers: [],
      principles: [],
      patterns: [],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "profile:ravikanth-seri-resume-evidence",
      title: "Ravikanth Seri Resume Evidence and Architecture Judgment",
      description: "Interactive resume source for Ravikanth Seri's career evidence, architecture judgment, impact ledger, skills, education, certifications, and public-safe source provenance.",
      content: [
        "Resume evidence. Architecture judgment ledger. Architecture judgment rather than just skills.",
        "Impact ledger. Capability evidence matrix. Source provenance. Education. Certifications.",
        "Preserved constraints: operational evidence, governed execution, replay evaluation, transaction journeys, public-safe architecture."
      ].join(". "),
      url: "/resume",
      type: "registry" as const,
      category: "background",
      tags: ["resume", "career", "architecture judgment", "impact ledger", "skills", "certifications"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: "2026-08-22",
      frameworkLayers: ["Evidence Layer", "Reasoning Layer", "Evaluation Layer", "Operator Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["human-in-the-loop-operational-ai", "evaluation-and-replay", "transaction-journey-reconstruction"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "profile:visitor-success-map",
      title: "Ravikanth Seri Visitor Success Map",
      description: "Start-here orientation for Ravikanth Seri's career, work, evidence, GitHub, resume, contact path, and current focus.",
      content: "Visitor success map for hiring, collaboration, learning, profile, proof, and contact.",
      url: "/start-here",
      type: "registry" as const,
      category: "background",
      tags: ["start here", "visitor success", "professional profile", "career", "GitHub", "resume", "contact"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: "2026-08-22",
      frameworkLayers: [],
      principles: ["Evidence before conclusions"],
      patterns: [],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "profile:operational-intelligence-thesis-radar",
      title: thesisRadar.title,
      description: "Public thought-process map connecting Ravikanth Seri's LinkedIn themes to market signals, Operational Intelligence claims, and falsification questions.",
      content: [
        thesisRadar.title,
        thesisRadar.thesis,
        thesisRadar.framing.flatMap((item) => [item.name, item.statement]).join(". "),
        thesisRadar.proofChain
          .flatMap((item) => [item.theme, item.publicThought, item.marketSignal, item.operationalClaim, item.falsificationQuestion])
          .join(". "),
        thesisRadar.trends
          .flatMap((trend) => [
            trend.name,
            trend.signal,
            trend.whyItMatters,
            trend.ravikanthAngle,
            ...trend.sources.flatMap((source) => [source.label, source.url])
          ])
          .join(". ")
      ].join(". "),
      url: "/radar",
      type: "registry" as const,
      category: "thesis radar",
      tags: ["LinkedIn thesis", "Enterprise Context Layer", "Context Acquisition Tax", "Ops for observability", "Observability for AI", "AgentOps", "AI observability", "Operational Intelligence"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: thesisRadar.updatedAt,
      frameworkLayers: ["Evidence Layer", "Reasoning Layer", "Evaluation Layer", "Operator Layer"],
      principles: ["Evidence before conclusions", "Replay before belief"],
      patterns: ["/patterns/evidence-driven-rca", "/patterns/evaluation-and-replay"],
      products: ["/products/reasonops"],
      status: "published" as const
    }
  ];

  const normalizedReferenceSources = referenceSources.map((source) => ({
    ...source,
    author: "Ravikanth Seri",
    date: referenceDate,
    frameworkLayers: source.tags.filter((tag) => tag.endsWith("Layer")),
    principles: ["Evidence before conclusions", "Human review before consequential action"],
    patterns: ["/patterns/evidence-driven-rca", "/patterns/evaluation-and-replay"],
    products: ["/products/reasonops"],
    status: "published" as const
  }));

  publicSourceIndexCache = [...profileSources, ...normalizedReferenceSources, ...registrySources, ...wiki, ...principleSources, ...patternSources, ...projectSources, ...articleSources];
  return publicSourceIndexCache;
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
