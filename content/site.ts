import siteData from "./site-config.json";
import evalReportData from "./eval-report.json";
import askQualityRubricData from "./ask-quality-rubric.json";
import askLiveReviewPacketData from "./ask-live-review-packet.json";
import articlesData from "./articles.json";
import principlesData from "./principles.json";
import patternsData from "./patterns.json";
import projectsData from "./projects.json";
import productsData from "./products.json";
import architectureCardsData from "./architecture-cards.json";
import thesisRadarData from "./thesis-radar.json";
import thesisRadarLifecycleData from "./thesis-radar-lifecycle.json";
import categoryBriefData from "./category-brief.json";
import nowPageData from "./now.json";
import changelogData from "./changelog.json";
import resumeData from "./resume.json";
import professionalGraphData from "./professional-graph.json";
import publicCodeData from "./public-code.json";
import projectProofData from "./project-proof.json";
import publicationSpineData from "./publication-spine.json";
import proofBacklogData from "./proof-backlog.json";
import qualityScorecardData from "./quality-scorecard.json";
import visitorReviewKitData from "./visitor-review-kit.json";
import practitionerReviewPacketData from "./practitioner-review-packet.json";
import identityAssetData from "./identity-asset.json";
import portraitIntakeData from "./portrait-intake.json";
import mobileTouchWalkthroughsData from "./mobile-touch-walkthroughs.json";
import keyboardAccessibilityWalkthroughsData from "./keyboard-accessibility-walkthroughs.json";
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
export const askLiveReviewPacket = askLiveReviewPacketData;

export const thesisRadar = thesisRadarData;
export const thesisRadarLifecycle = thesisRadarLifecycleData;

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
  firstImpressionFields: Array<{
    field: string;
    label: string;
    capture: string;
    options: string[];
  }>;
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
export const practitionerReviewPacket = practitionerReviewPacketData;

export type IdentityAsset = {
  title: string;
  updatedAt: string;
  href: string;
  type: string;
  purpose: string;
  usage: string[];
  limitations: string[];
};

export const identityAsset = identityAssetData satisfies IdentityAsset;
export const portraitIntake = portraitIntakeData;

export type MobileTouchWalkthroughRoute = {
  route: string;
  surface: string;
  visitorTask: string;
  startingSignal: string;
  touchTargets: string[];
  walkthroughSteps: string[];
  sourceEvidence: string[];
  observedPasses: string[];
  remainingRisks: string[];
  status: string;
};

export type MobileTouchWalkthroughs = {
  title: string;
  updatedAt: string;
  viewport: string;
  evidenceLevel: string;
  summary: string;
  principle: string;
  limitations: string[];
  routes: MobileTouchWalkthroughRoute[];
};

export const mobileTouchWalkthroughs = mobileTouchWalkthroughsData satisfies MobileTouchWalkthroughs;

export type KeyboardAccessibilityWalkthroughRoute = {
  route: string;
  surface: string;
  visitorTask: string;
  keyboardPath: string[];
  sourceEvidence: string[];
  observedPasses: string[];
  remainingRisks: string[];
  status: string;
};

export type KeyboardAccessibilityWalkthroughs = {
  title: string;
  updatedAt: string;
  evidenceLevel: string;
  summary: string;
  principle: string;
  limitations: string[];
  routes: KeyboardAccessibilityWalkthroughRoute[];
};

export const keyboardAccessibilityWalkthroughs = keyboardAccessibilityWalkthroughsData satisfies KeyboardAccessibilityWalkthroughs;

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
  "Approved public knowledge is indexed through lib/content.ts so browser routes do not ship the full RAG corpus."
];
