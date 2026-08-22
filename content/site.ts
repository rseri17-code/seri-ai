import siteData from "./site-config.json";
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
import professionalGraphData from "./professional-graph.json";
import publicCodeData from "./public-code.json";
import projectProofData from "./project-proof.json";
import publicationSpineData from "./publication-spine.json";
import proofBacklogData from "./proof-backlog.json";
import qualityScorecardData from "./quality-scorecard.json";
import visitorReviewKitData from "./visitor-review-kit.json";
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

export const site = siteData;

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

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  relationship: string;
  whatItIs: string[];
  whyItMatters: string[];
  capabilities: string[];
  architecture: string[];
  useCases: string[];
  principles: string[];
  not: string[];
  roadmap: string[];
};

export const products = productsData satisfies Product[];

export type ArchitectureCard = {
  title: string;
  pattern: string;
  tags: string[];
};

export const architectureCards = architectureCardsData satisfies ArchitectureCard[];

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

export const professionalGraph = professionalGraphData;

export const publicCode = publicCodeData;

export type ProjectProofItem = {
  slug: string;
  claim: string;
  visibleArtifact: string;
  inspectionPath: string[];
  evidence: string;
  limitation: string;
  nextProof: string;
  reviewQuestion: string;
  related: string[];
};

export type ProjectProof = {
  title: string;
  updatedAt: string;
  principle: string;
  items: ProjectProofItem[];
};

export const projectProof = projectProofData satisfies ProjectProof;

export type PublicationSpineStage = {
  name: string;
  purpose: string;
  primaryAsset: string;
  supportingAssets: string[];
  readerQuestion: string;
  proofStandard: string;
};

export type PublicationSpine = {
  title: string;
  summary: string;
  updatedAt: string;
  principle: string;
  audienceQuestion: string;
  stages: PublicationSpineStage[];
};

export const publicationSpine = publicationSpineData satisfies PublicationSpine;

export type ProofBacklogItem = {
  slug: string;
  claim: string;
  evidenceNeeded: string;
  currentEvidence: string;
  nextProof: string;
  wouldChange: string;
  status: string;
  href: string;
};

export type ProofBacklog = {
  title: string;
  summary: string;
  updatedAt: string;
  principle: string;
  items: ProofBacklogItem[];
};

export const proofBacklog = proofBacklogData satisfies ProofBacklog;

export type QualityScorecardDimension = {
  name: string;
  score: number;
  evidence: string;
  gap: string;
  nextProof: string;
};

export type QualityScorecard = {
  title: string;
  updatedAt: string;
  scale: string;
  rule: string;
  dimensions: QualityScorecardDimension[];
};

export const qualityScorecard = qualityScorecardData satisfies QualityScorecard;

export type VisitorReviewKit = {
  title: string;
  updatedAt: string;
  purpose: string;
  principle: string;
  reviewPath: Array<{
    step: string;
    href: string;
    question: string;
  }>;
  reviewQuestions: string[];
  reviewAssets: Array<{
    href: string;
    label: string;
    description: string;
  }>;
  publicChannels: Array<{
    href: string;
    label: string;
    description: string;
  }>;
  publicSafetyBoundary: string;
};

export const visitorReviewKit = visitorReviewKitData satisfies VisitorReviewKit;

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
  publicationSpine.title,
  publicationSpine.summary,
  publicationSpine.principle,
  publicationSpine.audienceQuestion,
  ...publicationSpine.stages.flatMap((stage) => [
    stage.name,
    stage.purpose,
    stage.primaryAsset,
    ...stage.supportingAssets,
    stage.readerQuestion,
    stage.proofStandard
  ]),
  proofBacklog.title,
  proofBacklog.summary,
  proofBacklog.principle,
  ...proofBacklog.items.flatMap((item) => [
    item.slug,
    item.claim,
    item.evidenceNeeded,
    item.currentEvidence,
    item.nextProof,
    item.wouldChange,
    item.status,
    item.href
  ]),
  qualityScorecard.title,
  qualityScorecard.scale,
  qualityScorecard.rule,
  ...qualityScorecard.dimensions.flatMap((dimension) => [
    dimension.name,
    String(dimension.score),
    dimension.evidence,
    dimension.gap,
    dimension.nextProof
  ]),
  visitorReviewKit.title,
  visitorReviewKit.purpose,
  visitorReviewKit.principle,
  visitorReviewKit.publicSafetyBoundary,
  ...visitorReviewKit.reviewPath.flatMap((item) => [item.step, item.href, item.question]),
  ...visitorReviewKit.reviewQuestions,
  ...visitorReviewKit.reviewAssets.flatMap((item) => [item.href, item.label, item.description]),
  ...visitorReviewKit.publicChannels.flatMap((item) => [item.href, item.label, item.description]),
  projectProof.title,
  projectProof.principle,
  ...projectProof.items.flatMap((item) => [
    item.slug,
    item.claim,
    item.visibleArtifact,
    ...item.inspectionPath,
    item.evidence,
    item.limitation,
    item.nextProof,
    item.reviewQuestion,
    ...item.related
  ]),
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
  ...nowPage.currentFocus,
  ...nowPage.building,
  ...nowPage.studying,
  ...nowPage.writing,
  ...nowPage.avoiding,
  ...nowPage.questions,
  ...nowPage.researchLedger.flatMap((item) => [item.question, item.whyItMatters, item.currentEvidence, item.nextProof, item.wouldChangeMind, item.href]),
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
  professionalGraph.identity.person,
  professionalGraph.identity.siteRole,
  professionalGraph.identity.throughline,
  professionalGraph.identity.currentFocus,
  professionalGraph.identity.publicBoundary,
  ...professionalGraph.careerEvolution.flatMap((stage) => [stage.period, stage.stage, stage.summary, stage.explains]),
  ...professionalGraph.careerStory.flatMap((stage) => [stage.stage, stage.summary, stage.evidence, stage.connectsTo]),
  ...professionalGraph.capabilityEvidence.flatMap((item) => [item.capability, item.proof, item.href]),
  ...professionalGraph.architectThesis,
  ...professionalGraph.architectureJudgment.flatMap((item) => [item.decision, item.constraint, item.publicEvidence, item.inspectHref]),
  ...professionalGraph.productionDelivery.flatMap((item) => [item.stage, item.responsibility, item.publicEvidence, item.reviewQuestion, item.href]),
  ...professionalGraph.proofLedger.flatMap((item) => [item.claim, item.evidence ?? item.evidenceTemplate ?? "", item.inspect, item.weakens, item.href]),
  ...professionalGraph.reviewSpine.flatMap((item) => [item.href, item.label, item.detail]),
  ...professionalGraph.operatingStandards.flatMap((item) => [item.title, item.body, item.icon]),
  ...professionalGraph.credibilityQuestions.flatMap((item) => [item.question, item.answer, item.href]),
  ...professionalGraph.proofLinks.flatMap((item) => [item.href, item.label, item.detail ?? item.detailTemplate ?? ""]),
  ...professionalGraph.visitorSuccessQuestions.flatMap((item) => [item.question, item.answerLens, item.primaryHref, item.evidenceHref, item.askPrompt]),
  ...professionalGraph.relationships.flatMap((item) => [item.from, item.relation, item.to]),
  publicCode.title,
  publicCode.summary,
  ...publicCode.entries.flatMap((item) => [item.label, item.href, item.status, item.whatToInspect, item.publicSafeUse, item.proofBoundary, ...item.related]),
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
