import evalReportData from "./eval-report.json";
import askQualityRubricData from "./ask-quality-rubric.json";
import articlesData from "./articles.json";
import principlesData from "./principles.json";
import patternsData from "./patterns.json";
import projectsData from "./projects.json";
import productsData from "./products.json";
import architectureCardsData from "./architecture-cards.json";
import thesisRadarData from "./thesis-radar.json";
import categoryBriefData from "./category-brief.json";
import nowPageData from "./now.json";
import startHerePathsData from "./start-here.json";
import changelogData from "./changelog.json";
import resumeData from "./resume.json";
import contentRegistryData from "./content-registry.json";
import harnessThesisData from "./harness-thesis.json";
import canonicalDefinitionData from "./canonical-definition.json";
import builderDnaData from "./builder-dna.json";
import sentinelContextModelData from "./sentinel-context-model.json";
import operationalLayersData from "./operational-layers.json";
import operationalIntelligenceFrameworkData from "./operational-intelligence-framework.json";
import operationalIntelligenceSystemData from "./operational-intelligence-system.json";
import assetTypesData from "./asset-types.json";
import releaseModelData from "./release-model.json";

export const site = {
  name: "seri.ai",
  owner: "Ravikanth Seri",
  tagline: "Operational Intelligence for AI-native operations.",
  positioning: "Evidence graphs, replayable investigations, eval-gated agents, and human-reviewed action.",
  description:
    "seri.ai is the reasoning layer between observability data, AI agents, and human operational decisions. It turns signals, transactions, topology, memory, and policy into inspectable evidence and accountable action.",
  authorLine:
    "Built by Ravikanth Seri as the public home for his work on Operational Intelligence, Agentic SRE, transaction intelligence, observability, AI-native incident investigation, knowledge graphs, and AI evaluation.",
  nowSignal:
    "Right now Ravikanth is building public-safe Agentic SRE patterns: evidence graphs, hypothesis lifecycles, replay seeds, outcome memory, eval gates, and operator control planes for AI-native incident investigation.",
  brandBelief:
    "The next enterprise advantage is not a smarter model in isolation. It is the harness around the model: evidence, policy, replay, memory, evaluation, and human review working as one operating system.",
  productPromise:
    "The operating principle is simple: deterministic where possible, bounded where autonomous, replayable where trusted, and accountable where action matters.",
  operatingSystem: [
    "Evidence before conclusions",
    "Transactions before isolated signals",
    "Receipts before trust",
    "Replay before belief",
    "Human judgment before irreversible action"
  ],
  compliance:
    "Public-safe content only. No internal employer product names, proprietary projects, confidential platform names, screenshots, logs, dashboards, or architecture.",
  links: {
    linkedin: "https://www.linkedin.com/in/ravikanthseri/",
    github: "https://github.com/rseri17-code"
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/framework", label: "Framework" },
    { href: "/start-here", label: "Start Here" },
    { href: "/map", label: "Map" },
    { href: "/library", label: "Library" },
    { href: "/patterns", label: "Patterns" },
    { href: "/products/reasonops", label: "ReasonOps" },
    { href: "/investigation-room", label: "Operations Room" },
    { href: "/radar", label: "Radar" },
    { href: "/ask", label: "Ask Ravi" },
    { href: "/background", label: "Background" },
    { href: "/contact", label: "Contact" }
  ]
};

export const harnessThesis = harnessThesisData;

export const canonicalDefinition = canonicalDefinitionData;

export const builderDna = builderDnaData;

export const sentinelContextModel = sentinelContextModelData;

export const operationalLayers = operationalLayersData;

export const operationalIntelligenceFramework = operationalIntelligenceFrameworkData;

export const operationalIntelligenceSystem = operationalIntelligenceSystemData;

export const assetTypes = assetTypesData;

export const releaseModel = releaseModelData;

export type Article = {
  slug: string;
  title: string;
  dek: string;
  theme: string;
  date: string;
  readingTime: string;
  body: string[];
  reviewWorksheet?: {
    title: string;
    purpose: string;
    modes: Array<{
      mode: string;
      preserves: string;
      likelyLoss: string;
      reviewerQuestion: string;
    }>;
    dimensions: Array<{
      dimension: string;
      ask: string;
      failureSignal: string;
    }>;
    falsification: string[];
  };
};

export const articles = articlesData satisfies Article[];

export type Project = {
  slug: string;
  name: string;
  summary: string;
  status: "Concept" | "Prototype" | "Production Pattern";
  capabilities: string[];
  detail: string;
};

export const projects = projectsData as Project[];

export const products = productsData;

export const architectureCards = architectureCardsData;

export const evalReport = evalReportData;
export const askQualityRubric = askQualityRubricData;

export const thesisRadar = thesisRadarData;

export const categoryBrief = categoryBriefData;

export type Principle = {
  slug: string;
  statement: string;
  explanation: string;
  example: string;
  whyItMatters: string;
  prevents: string;
  tags: string[];
  related: string[];
};

export const principles = principlesData satisfies Principle[];

export type Pattern = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  problem: string;
  context: string;
  forces: string[];
  solution: string;
  architecture: string;
  architectureSketch: string[];
  failureModes: string[];
  evaluation: string;
  whenToUse: string;
  whenNotToUse: string;
  relatedPrinciples: string[];
  relatedWiki: string[];
  related: string[];
};

export const patterns = patternsData satisfies Pattern[];

export const nowPage = nowPageData;

export const startHerePaths = startHerePathsData;

export const changelog = changelogData;

export const resume = resumeData;

export type ContentType = "framework" | "pattern" | "artifact" | "library" | "product" | "principle" | "background" | "domain" | "system";
export type ContentStatus = "published" | "planned" | "draft";

export type ContentRegistryItem = {
  title: string;
  slug: string;
  summary: string;
  type: ContentType;
  route: string;
  status: ContentStatus;
  frameworkLayers: string[];
  relatedPrinciples: string[];
  relatedPatterns: string[];
  relatedArtifacts: string[];
  relatedProducts: string[];
  relatedLibraryAssets: string[];
  publicSafe: "public-safe";
  createdAt: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
  };
};

export const contentRegistry = contentRegistryData as ContentRegistryItem[];

export const approvedKnowledge = [
  site.description,
  site.tagline,
  harnessThesis.headline,
  harnessThesis.statement,
  harnessThesis.category,
  ...harnessThesis.beliefs.flatMap((belief) => [belief.title, belief.body]),
  ...harnessThesis.loop,
  ...harnessThesis.proofObjects,
  builderDna.title,
  builderDna.thesis,
  builderDna.publicSafeSource,
  ...builderDna.principles.flatMap((principle) => [principle.name, principle.description]),
  ...builderDna.productTranslation,
  sentinelContextModel.title,
  sentinelContextModel.framing,
  sentinelContextModel.compliance,
  sentinelContextModel.publicThesis,
  ...sentinelContextModel.primitives.flatMap((primitive) => [primitive.name, primitive.description]),
  ...sentinelContextModel.controlPlane,
  ...articles.flatMap((article) => [article.title, article.dek, ...article.body]),
  ...products.flatMap((product) => [
    product.name,
    product.tagline,
    product.summary,
    product.relationship,
    ...product.whatItIs,
    ...product.whyItMatters,
    ...product.capabilities,
    ...product.architecture,
    ...product.useCases,
    ...product.principles,
    ...product.not,
    ...product.roadmap
  ]),
  ...projects.flatMap((project) => [project.name, project.summary, project.detail, ...project.capabilities]),
  thesisRadar.title,
  thesisRadar.thesis,
  ...thesisRadar.framing.flatMap((item) => [item.name, item.statement]),
  ...thesisRadar.proofChain.flatMap((item) => [
    item.theme,
    item.publicThought,
    item.marketSignal,
    item.operationalClaim,
    item.falsificationQuestion
  ]),
  ...thesisRadar.trends.flatMap((trend) => [
    trend.name,
    trend.signal,
    trend.whyItMatters,
    trend.ravikanthAngle,
    ...trend.sources.flatMap((source) => [source.label, source.url])
  ]),
  categoryBrief.title,
  categoryBrief.subtitle,
  categoryBrief.audience,
  categoryBrief.thesis,
  ...categoryBrief.whyNow,
  categoryBrief.contrarianInsight,
  categoryBrief.wedge,
  ...categoryBrief.proofPoints,
  ...categoryBrief.whatToRemember,
  ...categoryBrief.nextMoves,
  evalReport.title,
  evalReport.summary,
  ...evalReport.dimensions.flatMap((dimension) => [dimension.name, dimension.target]),
  ...evalReport.fixtures.flatMap((fixture) => [fixture.prompt, fixture.expected, fixture.result]),
  ...evalReport.knownLimits,
  resume.headline,
  resume.summary,
  ...resume.strengths,
  ...resume.architectureHighlights,
  ...resume.publicProof.flatMap((item) => [item.label, item.value, item.description]),
  ...resume.sourceProvenance.flatMap((item) => [item.sourceClass, item.supports, item.publicUse]),
  ...resume.experience.flatMap((item) => [item.role, item.organization, item.period, item.impact, ...item.bullets]),
  ...resume.skills.flatMap((skill) => [skill.group, ...skill.items]),
  ...resume.education,
  ...resume.certifications,
  ...contentRegistry.flatMap((item) => [
    item.title,
    item.summary,
    item.type,
    item.route,
    ...item.frameworkLayers,
    ...item.relatedPrinciples,
    ...item.relatedPatterns,
    ...item.relatedArtifacts,
    ...item.relatedProducts,
    ...item.relatedLibraryAssets
  ])
];
