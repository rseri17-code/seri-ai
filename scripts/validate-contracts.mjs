import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    errors.push(`${relativePath}: missing`);
    return "";
  }
  return fs.readFileSync(fullPath, "utf8");
}

function expectIncludes(relativePath, content, values) {
  for (const value of values) {
    if (!content.includes(value)) {
      errors.push(`${relativePath}: missing "${value}"`);
    }
  }
}

function expectFile(relativePath) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    errors.push(`${relativePath}: missing`);
  }
}

const contactRoutePath = "app/api/contact/route.ts";
const contactPagePath = "app/contact/page.tsx";
const contactReviewPath = "content/contact-review.ts";
const visitorReviewKitPath = "content/visitor-review-kit.json";
const evidenceWikiPath = "content/wiki/operational-intelligence-evidence-pack.mdx";
const evidenceArtifactPath = "public/publication-pack/operational-intelligence-evidence-pack.md";
const pdfScriptPath = "scripts/generate-publication-pdfs.py";
const supabaseSchemaPath = "supabase/schema.sql";
const publishingPath = "lib/publishing.ts";
const sitemapPath = "app/sitemap.ts";
const structuredDataPath = "components/structured-data.tsx";
const layoutPath = "app/layout.tsx";
const llmsRoutePath = "app/llms.txt/route.ts";
const llmsBuilderPath = "lib/llms.ts";
const robotsPath = "app/robots.ts";
const openGraphImagePath = "app/opengraph-image.tsx";
const twitterImagePath = "app/twitter-image.tsx";
const aiPath = "lib/ai.ts";

const contactRoute = read(contactRoutePath);
const contactPage = read(contactPagePath);
const contactReview = read(contactReviewPath);
const visitorReviewKit = read(visitorReviewKitPath);
const evidenceWiki = read(evidenceWikiPath);
const evidenceArtifact = read(evidenceArtifactPath);
const pdfScript = read(pdfScriptPath);
const supabaseSchema = read(supabaseSchemaPath);
const publishing = read(publishingPath);
const sitemap = read(sitemapPath);
const structuredData = read(structuredDataPath);
const layout = read(layoutPath);
const llmsRoute = read(llmsRoutePath);
const llmsBuilder = read(llmsBuilderPath);
const robots = read(robotsPath);
const openGraphImage = read(openGraphImagePath);
const twitterImage = read(twitterImagePath);
const ai = read(aiPath);

expectIncludes(contactRoutePath, contactRoute, [
  "practitioner-review",
  "reviewerRole",
  "doctrineVerdict",
  "reviewMode",
  "reviewDimension",
  "reviewVerdict",
  "artifactsInspected",
  "reviewDisposition",
  "evidenceObserved",
  "reasoningLoss",
  "reviewLimitation",
  "doctrineImpact",
  "firstImpressionVerdict",
  "personWorkFit",
  "thesisFit",
  "proofRouteFit",
  "artifactRecall",
  "demoSignal",
  "strongestClaim",
  "weakestClaim",
  "evidenceNeeded",
  "implementationQuestion",
  "Practitioner review"
]);

expectIncludes(contactPagePath, [contactPage, contactReview, visitorReviewKit].join("\n"), [
  "Practitioner review",
  "Review kit",
  "practitioner-review",
  "contactReviewChannels",
  "contactReviewAssets",
  "contactReviewPublicSafetyBoundary",
  "contactReviewMinimumEvidenceQuorum",
  "contactReviewRunProtocol",
  "firstImpressionSelects",
  "reviewerRole",
  "doctrineVerdict",
  "reviewMode",
  "reviewDimension",
  "reviewVerdict",
  "artifactsInspected",
  "reviewDisposition",
  "evidenceObserved",
  "reasoningLoss",
  "reviewLimitation",
  "doctrineImpact",
  "First-impression evidence",
  "firstImpressionVerdict",
  "personWorkFit",
  "thesisFit",
  "proofRouteFit",
  "artifactRecall",
  "demoSignal",
  "strongestClaim",
  "weakestClaim",
  "evidenceNeeded",
  "implementationQuestion",
  "practitioner_review_submit",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/investigation-room",
  "/downloads/operational-intelligence-evidence-pack.pdf",
  "Ground feedback in evidence",
  "Do not include confidential logs"
]);

const conformanceTerms = [
  "Minimum Conformance Checklist",
  "Evidence before conclusion",
  "Transaction context",
  "Topology boundary",
  "Hypothesis lifecycle",
  "Operator control",
  "Replay seed",
  "Conformance Verdicts"
];

expectIncludes(evidenceWikiPath, evidenceWiki, ["Practitioner Review", "/contact", ...conformanceTerms]);
expectIncludes(evidenceArtifactPath, evidenceArtifact, ["Structured practitioner review path: /contact", ...conformanceTerms]);
expectIncludes(pdfScriptPath, pdfScript, ["Structured practitioner review", "/contact", "Minimum Conformance Checklist", "Evidence before conclusion", "Replay seed"]);
expectFile("public/downloads/operational-intelligence-evidence-pack.pdf");
expectIncludes(supabaseSchemaPath, supabaseSchema, [
  "kind text",
  "metadata jsonb",
  "practitioner-review",
  "contact_messages_kind_created_at_idx",
  "create or replace view practitioner_reviews",
  "create or replace view practitioner_review_quorum_status",
  "create or replace view practitioner_review_dimension_summary",
  "doctrine_verdict",
  "review_mode",
  "review_dimension",
  "review_verdict",
  "artifacts_inspected",
  "review_disposition",
  "evidence_observed",
  "reasoning_loss",
  "review_limitation",
  "doctrine_impact",
  "first_impression_verdict",
  "person_work_fit",
  "thesis_fit",
  "proof_route_fit",
  "artifact_recall",
  "demo_signal",
  "clear_specific_first_impressions",
  "weak_first_impressions",
  "evidence_needed",
  "implementation_question",
  "total_reviews",
  "sre_reliability_reviews",
  "architecture_reviews",
  "ai_governance_reviews",
  "executive_product_reviews",
  "recruiter_hiring_reviews",
  "skeptical_or_mixed_reviews",
  "four_artifact_reviews",
  "ready_for_positive_summary",
  "evidence_needed_count",
  "implementation_question_count"
]);
expectIncludes(publishingPath, publishing, [
  "referencePublicationAssets",
  "getShareableReferenceRoutes",
  "/publication-pack/operational-intelligence-evidence-pack.md",
  "/downloads/operational-intelligence-publication-pack.pdf",
  "minimum conformance checklist",
  "reviewer-run worksheet",
  "evidence ledger",
  "observable proof",
  "failure signals"
]);
expectIncludes(sitemapPath, sitemap, ["getShareableReferenceRoutes", "shareableReferenceRoutes"]);
expectIncludes(structuredDataPath, structuredData, [
  "application/ld+json",
  "https://schema.org",
  "WebSite",
  "Person",
  "DefinedTermSet",
  "CreativeWork",
  "operational-intelligence-canonical-doctrine",
  "ravikanth-seri"
]);
expectIncludes(layoutPath, layout, ["StructuredData", "<StructuredData />"]);
expectIncludes(layoutPath, layout, ["/opengraph-image", "/twitter-image", "summary_large_image"]);
expectIncludes(llmsRoutePath, llmsRoute, ["buildLlmsTxt", "text/plain"]);
expectIncludes(llmsBuilderPath, llmsBuilder, [
  "Public-Safe Boundary",
  "Operational Intelligence is the reasoning layer",
  "Current deterministic trust fixtures",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "site.links.linkedin",
  "site.links.github"
]);
expectIncludes(sitemapPath, sitemap, ["/llms.txt"]);
expectIncludes(robotsPath, robots, ["/llms.txt"]);
expectIncludes(openGraphImagePath, openGraphImage, [
  "ImageResponse",
  "Operational Intelligence",
  "AI-native operations need evidence before action",
  "inspectable operating model for hypotheses, replay, evaluation gates, and accountable human review",
  "Human review",
  "1200",
  "630"
]);
expectIncludes(twitterImagePath, twitterImage, ["opengraph-image"]);
expectIncludes(aiPath, ai, [
  "inferRelatedArtifacts",
  "Claim discipline",
  "Public profile links",
  "github.com/rseri17-code",
  "linkedin.com/in/ravikanthseri",
  "/wiki/operational-intelligence-canonical-doctrine",
  "/wiki/operational-intelligence-reference-architecture",
  "/wiki/operational-intelligence-publication-pack",
  "/wiki/operational-intelligence-evidence-pack",
  "/contact"
]);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Validated practitioner review and publication asset contracts.");
