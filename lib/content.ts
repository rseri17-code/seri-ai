import fs from "node:fs";
import path from "node:path";
import { articles, askLiveReviewPacket, contentRegistry, identityAsset, keyboardAccessibilityWalkthroughs, mobileTouchWalkthroughs, nowPage, patterns, portraitIntake, practitionerReviewPacket, principles, professionalGraph, projectProof, projects, proofBacklog, publicCode, publicationSpine, qualityScorecard, resume, site, thesisRadar, thesisRadarLifecycle, visitorReviewKit } from "../content/site";

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

export function formatNaturalList(items: string[]) {
  if (!items.length) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function proseList(label: string, items: string[], verb = "include") {
  if (!items.length) {
    return `${label} are not listed.`;
  }

  return `${label} ${verb} ${formatNaturalList(items)}.`;
}

const referenceSources = [
  {
    id: "reference:ravikanth-seri-portrait-intake",
    title: "Ravikanth Seri Approved Portrait Intake",
    description: "Public-safe intake contract for adding an approved portrait without weakening provenance, accessibility, performance, or professional tone.",
    content:
      `${portraitIntake.title}. ${portraitIntake.evidenceLevel} Status: ${portraitIntake.status}. Purpose: ${portraitIntake.purpose} Preferred path: ${portraitIntake.targetAsset.preferredPath}. Fallback path: ${portraitIntake.targetAsset.fallbackPath}. Alt text: ${portraitIntake.targetAsset.displayAlt}. Acceptance criteria: ${portraitIntake.acceptanceCriteria.join(". ")}. Do not use: ${portraitIntake.doNotUse.join(", ")}. Publication rule: ${portraitIntake.publicationRule}. Validation plan: ${portraitIntake.validationPlan.join(". ")}.`,
    url: "/identity/portrait-intake.md",
    type: "registry" as const,
    category: "Quality Evidence",
    tags: ["portrait", "identity", "Ravikanth Seri", "public-safe", "provenance", "accessibility"],
    assetType: "artifact"
  },
  {
    id: "reference:ravikanth-seri-practitioner-review-packet",
    title: "Ravikanth Seri Practitioner Review Packet",
    description: "Public-safe external review protocol for evaluating Ravikanth Seri's professional representation, career arc, inspectable work, and Operational Intelligence body of work.",
    content:
      `${practitionerReviewPacket.title}. ${practitionerReviewPacket.evidenceLevel} Purpose: ${practitionerReviewPacket.purpose} Review principle: ${practitionerReviewPacket.reviewPrinciple} Reviewer roles: ${formatNaturalList(practitionerReviewPacket.reviewerRoles)}. Review sequence: ${practitionerReviewPacket.reviewSequence
        .flatMap((step) => [step.step, step.route, step.question, step.failureSignal])
        .join(". ")}. Review dimensions: ${practitionerReviewPacket.reviewDimensions
        .flatMap((dimension) => [dimension.name, dimension.question, dimension.evidenceToInspect.join(", ")])
        .join(". ")}. Minimum external evidence quorum: ${practitionerReviewPacket.minimumEvidenceQuorum.minimumReviewerCount} public-safe reviews. Required coverage: ${practitionerReviewPacket.minimumEvidenceQuorum.requiredCoverage.join(" ")} Completion rule: ${practitionerReviewPacket.minimumEvidenceQuorum.completionRule} Revision trigger: ${practitionerReviewPacket.minimumEvidenceQuorum.revisionTrigger} Review run protocol: ${practitionerReviewPacket.reviewRunProtocol
        .flatMap((phase) => [phase.phase, phase.instruction])
        .join(". ")}. Safe metadata only: ${formatNaturalList(practitionerReviewPacket.safeMetadataOnly)}. Do not capture: ${formatNaturalList(practitionerReviewPacket.doNotCapture)}. Verdicts: ${formatNaturalList(practitionerReviewPacket.verdicts)}. No external practitioner verdicts have been published yet.`,
    url: "/publication-pack/ravikanth-seri-practitioner-review-packet.md",
    type: "registry" as const,
    category: "Quality Evidence",
    tags: ["practitioner review", "first-time visitor", "professional representation", "career clarity", "evidence quality", "public-safe"],
    assetType: "artifact"
  },
  {
    id: "reference:ask-ravi-live-review-packet",
    title: "Ask Ravi Live Review Packet",
    description: "Public-safe review protocol for reviewer-labeled Ask Ravikanth sessions across local fallback, vector retrieval, and model synthesis.",
    content:
      `${askLiveReviewPacket.title}. ${askLiveReviewPacket.evidenceLevel} Purpose: ${askLiveReviewPacket.purpose} Review modes: ${formatNaturalList(askLiveReviewPacket.reviewModes
        .map((mode) => mode.mode))}. Required prompt categories: ${formatNaturalList(askLiveReviewPacket.requiredPromptCategories)}. Safe metadata only: ${formatNaturalList(askLiveReviewPacket.safeMetadataOnly)}. Do not capture: ${formatNaturalList(askLiveReviewPacket.doNotCapture)}. No reviewer-labeled live Ask sessions have been published yet. No aggregate quality score is published until multiple reviewer-labeled sessions exist.`,
    url: "/publication-pack/ask-ravi-live-review-packet.md",
    type: "registry" as const,
    category: "Quality Evidence",
    tags: ["Ask Ravi", "reviewer-labeled", "answer quality", "safe metadata", "model synthesis", "vector retrieval"],
    assetType: "artifact"
  },
  {
    id: "reference:visual-qa-2026-08-22",
    title: "seri.ai Visual QA Evidence",
    description: "First-viewport browser evidence for nine critical routes across mobile, tablet, and desktop widths.",
    content:
      "seri.ai Visual QA Evidence. 2026-08-22 first-viewport browser captures. 27 screenshots across Home, Work, Ask Ravikanth, Operations Room, Background, Doctrine, Radar, and Evidence Pack. Mobile 390x844, tablet 768x1024, desktop 1440x1000. Zero horizontal overflow findings, zero console-error pages, visible H1 and main content for every captured route. Limitations: first-viewport evidence only, not external reviewer feedback, not full touch walkthrough. A durable non-photographic identity mark exists, and the approved portrait is integrated on professional-orientation surfaces.",
    url: "/visual-qa/2026-08-22/report.md",
    type: "registry" as const,
    category: "Quality Evidence",
    tags: ["visual QA", "mobile QA", "screenshots", "viewport", "evidence"],
    assetType: "artifact"
  },
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
    content: `${project.name}. ${project.summary}. ${project.detail}. ${formatNaturalList(project.capabilities)}`,
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
        `This entry is ${item.type === "artifact" ? "an artifact" : `a ${item.type}`}.`,
        proseList("Framework layers", item.frameworkLayers, "include"),
        proseList("Related principles", item.relatedPrinciples),
        proseList("Related patterns", item.relatedPatterns),
        proseList("Related artifacts", item.relatedArtifacts),
        proseList("Related products", item.relatedProducts),
        proseList("Related library assets", item.relatedLibraryAssets)
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
      id: "profile:first-time-visitor-review-kit",
      title: visitorReviewKit.title,
      description: "Public-safe first-time visitor and practitioner review protocol for evaluating whether seri.ai clearly represents Ravikanth Seri, the work, and the Operational Intelligence thesis.",
      content: [
        visitorReviewKit.title,
        visitorReviewKit.purpose,
        visitorReviewKit.principle,
        visitorReviewKit.publicSafetyBoundary,
        "first-time visitor review kit. visitor feedback. practitioner review. first-impression evidence. person-work fit. thesis clarity. proof route. artifact recall. demo feeling. anonymous product signal. what was clear. what was confusing. most memorable idea. strongest claim. weakest claim. evidence needed. implementation question. submit public-safe review.",
        visitorReviewKit.reviewPath.flatMap((item) => [item.step, item.href, item.question]).join(". "),
        visitorReviewKit.reviewQuestions.join(". "),
        visitorReviewKit.firstImpressionFields.flatMap((item) => [item.field, item.label, item.capture, ...item.options]).join(". "),
        visitorReviewKit.reviewAssets.flatMap((item) => [item.href, item.label, item.description]).join(". "),
        visitorReviewKit.publicChannels.flatMap((item) => [item.href, item.label, item.description]).join(". ")
      ].join(". "),
      url: "/work",
      type: "registry" as const,
      category: "evidence",
      tags: ["visitor review", "first-time visitor", "practitioner review", "feedback", "public-safe", "proof loop"],
      author: "Ravikanth Seri",
      assetType: "evidence",
      date: visitorReviewKit.updatedAt,
      frameworkLayers: ["Evidence Layer", "Evaluation Layer", "Learning Layer", "Operator Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["/patterns/evaluation-and-replay", "/patterns/evidence-driven-rca", "/patterns/human-in-the-loop-operational-ai"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "profile:first-impression-evidence-capture",
      title: "First-Impression Evidence Capture",
      description: "Contact review form contract for capturing whether first-time visitors understand Ravikanth Seri, the work, the proof route, and the artifact without treating prose feedback as proof.",
      content: [
        "First-impression evidence capture.",
        "Contact review form.",
        "Submit first-impression evidence through /contact.",
        "Bounded categories: first-impression verdict, person-work fit, thesis clarity, proof route, artifact recall, and demo feeling.",
        "Use this to detect whether seri.ai feels specific to Ravikanth Seri or mostly anonymous, whether the proof route works without coaching, and whether any surface feels like a demo instead of a durable technical reference.",
        "No external first-impression verdicts have been published yet.",
        visitorReviewKit.firstImpressionFields.flatMap((item) => [item.field, item.label, item.capture, ...item.options]).join(". ")
      ].join(". "),
      url: "/contact",
      type: "registry" as const,
      category: "review evidence",
      tags: ["first impression", "visitor review", "Ravikanth Seri", "person-work fit", "artifact recall", "demo feeling"],
      author: "Ravikanth Seri",
      assetType: "review",
      date: visitorReviewKit.updatedAt,
      frameworkLayers: ["Evidence Layer", "Evaluation Layer", "Operator Layer"],
      principles: ["Evidence before conclusions"],
      patterns: [],
      products: [],
      status: "published" as const
    },
    {
      id: "profile:operational-intelligence-publication-spine",
      title: publicationSpine.title,
      description: publicationSpine.summary,
      content: [
        publicationSpine.title,
        publicationSpine.summary,
        publicationSpine.principle,
        publicationSpine.audienceQuestion,
        "publication spine. reading order. editorial map. define specify demonstrate challenge connect. what has Ravikanth published. what should I read first. what each asset proves.",
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
      ].join(". "),
      url: "/library",
      type: "registry" as const,
      category: "library",
      tags: ["publication spine", "reading order", "library", "body of work", "Operational Intelligence", "published work"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: publicationSpine.updatedAt,
      frameworkLayers: ["Evidence Layer", "Reasoning Layer", "Evaluation Layer", "Operator Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["/patterns/evidence-driven-rca", "/patterns/evaluation-and-replay"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
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
        professionalGraph.productionDelivery.flatMap((item) => [item.stage, item.responsibility, item.publicEvidence, item.reviewQuestion, item.href]).join(". "),
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
        resume.education.flatMap((item) => [item.credential, item.issuer, item.status, item.supports, item.sourceClass]).join(". "),
        resume.certifications.flatMap((item) => [item.credential, item.issuer, item.issued ?? "", item.status, item.supports, item.doesNotProve, item.sourceClass]).join(". "),
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
      id: "profile:ravikanth-seri-public-code",
      title: publicCode.title,
      description: publicCode.summary,
      content: [
        publicCode.title,
        publicCode.summary,
        "GitHub. public code. open-source signal. Sentinalai. public repositories. inspectable engineering signal.",
        "Public code review rubric. SentinalAI public structure. Deterministic investigation. Policy gate. Playbooks. Eval scenarios. Receipt-shaped artifacts. Operational memory.",
        publicCode.reviewRecordFields.flatMap((item) => [item.field, item.capture, item.whyItMatters]).join(". "),
        publicCode.reviewRubric.flatMap((item) => [item.question, item.lookFor, item.supports, item.doNotInfer]).join(". "),
        publicCode.observedPublicStructure.join(". "),
        publicCode.entries.flatMap((item) => [item.label, item.href, item.status, item.whatToInspect, item.publicSafeUse, item.proofBoundary, ...item.related]).join(". ")
      ].join(". "),
      url: "/work",
      type: "registry" as const,
      category: "background",
      tags: ["GitHub", "public code", "open-source", "repository", "Sentinalai", "inspection"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: "2026-08-22",
      frameworkLayers: ["Evidence Layer", "Evaluation Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["evaluation-and-replay"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "profile:ravikanth-seri-project-proof",
      title: projectProof.title,
      description: "Public-safe project proof ledger showing what each seri.ai project proves, what it does not prove, how to inspect it, and what evidence would strengthen it.",
      content: [
        projectProof.title,
        projectProof.principle,
        "project proof ledger. work project proof. public project evidence. inspectable artifacts. public-safe limitations. review questions. next proof.",
        projectProof.items
          .flatMap((item) => [
            item.slug,
            item.claim,
            item.visibleArtifact,
            ...item.inspectionPath,
            item.evidence,
            item.limitation,
            item.nextProof,
            item.reviewQuestion,
            ...item.related
          ])
          .join(". ")
      ].join(". "),
      url: "/work",
      type: "registry" as const,
      category: "background",
      tags: ["project proof", "public work", "evidence ledger", "public-safe limitations", "review questions"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: projectProof.updatedAt,
      frameworkLayers: ["Evidence Layer", "Evaluation Layer", "Decision Layer", "Operator Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["/patterns/evidence-driven-rca", "/patterns/evaluation-and-replay", "/patterns/transaction-journey-reconstruction"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "profile:visitor-success-map",
      title: "Ravikanth Seri Visitor Success Map",
      description: "Start-here orientation for Ravikanth Seri's career, work, evidence, GitHub, resume, contact path, and current focus.",
      content: "Visitor success map for hiring, collaboration, learning, profile, proof, and contact.",
      url: "/work",
      type: "registry" as const,
      category: "background",
      tags: ["proof path", "visitor success", "professional profile", "career", "GitHub", "resume", "contact"],
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
      id: "profile:ravikanth-seri-current-research",
      title: "Ravikanth Seri Current Research Ledger",
      description: "Current public research questions, proof loops, evidence gaps, and model-changing conditions behind Ravikanth Seri's Operational Intelligence work.",
      content: [
        "Now page. Current research ledger. What Ravikanth is learning, researching, and advancing.",
        nowPage.currentFocus.join(". "),
        nowPage.studying.join(". "),
        nowPage.questions.join(". "),
        nowPage.researchLedger.flatMap((item) => [item.question, item.whyItMatters, item.currentEvidence, item.nextProof, item.wouldChangeMind, item.href]).join(". ")
      ].join(". "),
      url: "/now",
      type: "registry" as const,
      category: "background",
      tags: ["now", "research ledger", "current focus", "proof loop", "learning", "research"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: "2026-08-22",
      frameworkLayers: ["Evidence Layer", "Transaction Layer", "Evaluation Layer", "Operator Layer", "Learning Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["evaluation-and-replay", "transaction-journey-reconstruction", "human-in-the-loop-operational-ai"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "reference:mobile-touch-walkthroughs-2026-08-22",
      title: mobileTouchWalkthroughs.title,
      description: "Source-validated mobile touch walkthrough notes for Ask, Operations Room, Doctrine, Radar, and Work.",
      content: [
        mobileTouchWalkthroughs.title,
        mobileTouchWalkthroughs.viewport,
        mobileTouchWalkthroughs.evidenceLevel,
        mobileTouchWalkthroughs.summary,
        mobileTouchWalkthroughs.principle,
        mobileTouchWalkthroughs.limitations.join(". "),
        mobileTouchWalkthroughs.routes
          .flatMap((item) => [
            item.route,
            item.surface,
            item.visitorTask,
            item.startingSignal,
            item.touchTargets.join(". "),
            item.walkthroughSteps.join(". "),
            item.sourceEvidence.join(". "),
            item.observedPasses.join(". "),
            item.remainingRisks.join(". "),
            item.status
          ])
          .join(". "),
        "mobile touch walkthrough. touch walkthrough notes. dense interactive routes. source-validated mobile QA. Ask. Operations Room. Doctrine. Radar. Work."
      ].join(". "),
      url: "/visual-qa/2026-08-22/mobile-touch-walkthroughs.md",
      type: "registry" as const,
      category: "Quality Evidence",
      tags: ["mobile touch", "touch walkthrough", "mobile QA", "Ask", "Operations Room", "Doctrine", "Radar", "Work"],
      author: "Ravikanth Seri",
      assetType: "evidence",
      date: mobileTouchWalkthroughs.updatedAt,
      frameworkLayers: ["Evidence Layer", "Evaluation Layer", "Operator Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["evaluation-and-replay", "human-in-the-loop-operational-ai"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "reference:keyboard-accessibility-walkthroughs-2026-08-22",
      title: keyboardAccessibilityWalkthroughs.title,
      description: "Source-validated keyboard walkthrough notes for Ask Ravikanth and Operations Room with explicit screen-reader and browser-recording limitations.",
      content: [
        keyboardAccessibilityWalkthroughs.title,
        keyboardAccessibilityWalkthroughs.evidenceLevel,
        keyboardAccessibilityWalkthroughs.summary,
        keyboardAccessibilityWalkthroughs.principle,
        keyboardAccessibilityWalkthroughs.limitations.join(". "),
        keyboardAccessibilityWalkthroughs.routes
          .flatMap((item) => [
            item.route,
            item.surface,
            item.visitorTask,
            item.keyboardPath.join(". "),
            item.sourceEvidence.join(". "),
            item.observedPasses.join(". "),
            item.remainingRisks.join(". "),
            item.status
          ])
          .join(". "),
        "keyboard accessibility walkthrough. focus order. tab order. skip link. Ask Ravikanth. Operations Room. source-validated keyboard paths. screen-reader gap."
      ].join(". "),
      url: "/visual-qa/2026-08-22/keyboard-accessibility-walkthroughs.md",
      type: "registry" as const,
      category: "Quality Evidence",
      tags: ["keyboard accessibility", "a11y", "Ask Ravikanth", "Operations Room", "focus", "screen-reader gap"],
      author: "Ravikanth Seri",
      assetType: "evidence",
      date: keyboardAccessibilityWalkthroughs.updatedAt,
      frameworkLayers: ["Evidence Layer", "Evaluation Layer", "Operator Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["evaluation-and-replay", "human-in-the-loop-operational-ai"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "profile:ravikanth-seri-identity-asset",
      title: identityAsset.title,
      description: "Durable public-safe non-photographic identity mark for Ravikanth Seri and the seri.ai person-work-evidence path.",
      content: [
        identityAsset.title,
        identityAsset.href,
        identityAsset.type,
        identityAsset.purpose,
        identityAsset.usage.join(". "),
        identityAsset.limitations.join(". "),
        "identity mark. profile mark. public identity. durable identity asset. not a portrait photo. public-safe visual anchor. person work evidence path. does not replace career evidence or public proof."
      ].join(". "),
      url: identityAsset.href,
      type: "registry" as const,
      category: "profile",
      tags: ["identity mark", "profile", "Ravikanth Seri", "public-safe", "person-work-evidence"],
      author: "Ravikanth Seri",
      assetType: "profile",
      date: identityAsset.updatedAt,
      frameworkLayers: ["Evidence Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["evidence-driven-rca"],
      products: [],
      status: "published" as const
    },
    {
      id: "profile:operational-intelligence-proof-backlog",
      title: proofBacklog.title,
      description: proofBacklog.summary,
      content: [
        proofBacklog.title,
        proofBacklog.summary,
        proofBacklog.principle,
        "proof backlog. evidence gaps. proof gaps. external proof. practitioner review. control comparison. live telemetry. browser visual QA. Ask quality. identity asset.",
        proofBacklog.items
          .flatMap((item) => [item.slug, item.claim, item.evidenceNeeded, item.currentEvidence, item.nextProof, item.wouldChange, item.status, item.href])
          .join(". ")
      ].join(". "),
      url: "/wiki/operational-intelligence-evidence-pack",
      type: "registry" as const,
      category: "evidence",
      tags: ["proof backlog", "evidence gaps", "practitioner review", "control comparison", "Ask quality", "visual QA", "production reliability"],
      author: "Ravikanth Seri",
      assetType: "evidence",
      date: proofBacklog.updatedAt,
      frameworkLayers: ["Evidence Layer", "Evaluation Layer", "Operator Layer", "Learning Layer"],
      principles: ["Evidence before conclusions", "Replay before belief"],
      patterns: ["/patterns/evaluation-and-replay", "/patterns/evidence-driven-rca", "/patterns/human-in-the-loop-operational-ai"],
      products: ["/products/reasonops"],
      status: "published" as const
    },
    {
      id: "profile:seri-ai-quality-scorecard",
      title: qualityScorecard.title,
      description: "Evidence-based, non-inflated 24-dimension quality assessment for seri.ai and Ravikanth Seri's public professional operating system.",
      content: [
        qualityScorecard.title,
        qualityScorecard.scale,
        qualityScorecard.rule,
        "quality scorecard. 10/10 target. rating. current score. honest score. not complete. professional representation. visual design. mobile. memorability. evidence quality.",
        qualityScorecard.dimensions.flatMap((dimension) => [dimension.name, String(dimension.score), dimension.evidence, dimension.gap, dimension.nextProof]).join(". ")
      ].join(". "),
      url: "/wiki/operational-intelligence-evidence-pack",
      type: "registry" as const,
      category: "evidence",
      tags: ["quality scorecard", "10/10 target", "evidence quality", "visual design", "Ask Ravi", "professional representation"],
      author: "Ravikanth Seri",
      assetType: "evidence",
      date: qualityScorecard.updatedAt,
      frameworkLayers: ["Evidence Layer", "Evaluation Layer", "Learning Layer"],
      principles: ["Evidence before conclusions"],
      patterns: ["/patterns/evaluation-and-replay", "/patterns/evidence-driven-rca"],
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
        thesisRadarLifecycle
          .flatMap((item) => [item.stage, item.role, item.promotionRule, item.output, item.evidenceHref])
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
      url: "/framework",
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
      const tokenCount = haystack.split(/\W+/).filter((term) => term.length > 2).length;
      const lengthPenalty = Math.max(1, Math.sqrt(tokenCount / 120 + 1));
      const score = terms.length ? terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0) / lengthPenalty : 1;
      return { ...source, score };
    })
    .filter((source) => source.score > 0)
    .sort((a, b) => b.score - a.score);
}
