import { buildPublicSourceIndex, type PublicSource } from "./content";

export type SearchHit = {
  source: PublicSource;
  content: string;
  score: number;
};

const doctrineUrl = "/wiki/operational-intelligence-canonical-doctrine";
const referenceArchitectureUrl = "/wiki/operational-intelligence-reference-architecture";
const evidencePackUrl = "/wiki/operational-intelligence-evidence-pack";
const visualQaUrl = "/visual-qa/2026-08-22/report.md";
const touchWalkthroughUrl = "/visual-qa/2026-08-22/mobile-touch-walkthroughs.md";
const askLiveReviewUrl = "/publication-pack/ask-ravi-live-review-packet.md";
const practitionerReviewUrl = "/publication-pack/ravikanth-seri-practitioner-review-packet.md";
const identityAssetUrl = "/identity/ravikanth-seri-identity-mark.svg";
const publicationPackUrl = "/wiki/operational-intelligence-publication-pack";
const conformanceProfileUrl = "/publication-pack/operational-intelligence-conformance-profile.md";
const workUrl = "/work";
const libraryUrl = "/library";
const startHereUrl = "/start-here";
const nowUrl = "/now";
const resumeUrl = "/resume";
const backgroundUrl = "/background";
const radarUrl = "/radar";
const controlComparisonUrl = "/ideas/oi-room-001-control-comparison";
const directReferenceBoosts: Array<[RegExp, string]> = [
  [/diagram|diagrams|state machine diagram|sequence diagram|evidence graph diagram|replay loop/, "/publication-pack/operational-intelligence-diagrams.md"],
  [/comparison table|adjacent discipline|claim classification|observability versus|aiops versus|agentops/, "/publication-pack/operational-intelligence-comparison-tables.md"],
  [/decision packet|approval class|rollback review|review packet/, "/publication-pack/decision-packet-example.md"],
  [/printable walkthrough|oi-room-001 walkthrough|walkthrough pdf|transaction timing/, "/publication-pack/oi-room-001-printable-walkthrough.md"],
  [/executive summary|one-page summary|one page summary/, "/publication-pack/operational-intelligence-executive-summary.md"],
  [/glossary|reference card|canonical terms|replay seed|operator control plane/, "/publication-pack/operational-intelligence-glossary-card.md"],
  [/conformance profile|object profile|object fields|pass fail|pass\/fail|evidence object|hypothesis state|required fields|replay seed.*evaluation gate|decision packet.*fields/, conformanceProfileUrl],
  [/proof backlog|proof gap|evidence gap|what is still missing|what remains|not yet proven|external proof|live beta telemetry|visual qa|mobile qa|identity asset/, evidencePackUrl],
  [/public identity mark|profile mark|ravikanth.*identity mark|where.*identity mark|durable public identity mark|portrait photo|portrait asset/, identityAssetUrl],
  [/quality scorecard|24 dimension|twenty four dimension|rate the site|rate seri.ai|current rating|current score|10\/10 target|ten out of ten target/, evidencePackUrl],
  [/touch walkthrough|mobile touch|tap target|dense interactive route|physical-device|physical device|source-validated mobile/, touchWalkthroughUrl],
  [/ask live review|reviewer[- ]labeled ask|ask quality|answer quality baseline|live answer rubric|model synthesis quality|vector retrieval quality|local fallback.*vector retrieval.*model synthesis|safe metadata|raw prompts|aggregate model-quality|aggregate quality score/, askLiveReviewUrl],
  [/practitioner review packet|external practitioner review|review ravikanth.*evidence|professional representation review|career clarity review|first impression review|does.*represent ravikanth|evaluate.*professional operating system/, practitionerReviewUrl],
  [/(visual qa|mobile qa).*(screenshot|viewport|evidence)|screenshot artifacts|screenshots|viewport evidence|first[- ]viewport|horizontal overflow|console-error|console error|touch walkthrough/, visualQaUrl],
  [/visitor review|first[- ]time review|first[- ]time visitor review|review kit|feedback kit|what was clear|what was confusing|most memorable idea|strongest claim|weakest claim|evidence would change|implementation question|submit.*review|evaluate.*site|evaluate.*ravikanth/, startHereUrl],
  [/project proof|work proof|public project evidence|what.*project.*prove|project.*does not prove|inspectable project|review project|stronger public project proof/, workUrl],
  [/evidence pack markdown|falsification criteria|reviewer-run worksheet|reviewer run worksheet|evidence ledger entry|dimension verdicts/, "/publication-pack/operational-intelligence-evidence-pack.md"],
  [/publication pack pdf|download.*publication|shareable pdf.*diagram/, "/downloads/operational-intelligence-publication-pack.pdf"],
  [/evidence pack pdf|download.*evidence/, "/downloads/operational-intelligence-evidence-pack.pdf"],
  [/walkthrough pdf|download.*walkthrough|printable.*pdf/, "/downloads/oi-room-001-printable-walkthrough.pdf"]
];
const doctrineTerms = new Set([
  "definition",
  "define",
  "doctrine",
  "canonical",
  "framework",
  "layer",
  "layers",
  "glossary",
  "boundary",
  "boundaries",
  "observability",
  "aiops",
  "agentops",
  "incident",
  "transaction",
  "evidence",
  "hypothesis",
  "replay",
  "evaluation",
  "operator"
]);
const referenceArchitectureTerms = new Set([
  "architecture",
  "architectural",
  "implement",
  "implementation",
  "conformance",
  "contract",
  "contracts",
  "schema",
  "schemas",
  "state",
  "machine",
  "lifecycle",
  "governance",
  "approval",
  "retention",
  "security",
  "authorization",
  "evaluation",
  "metric",
  "metrics",
  "replay",
  "decision",
  "operator",
  "invariant",
  "invariants"
]);
const evidencePackTerms = new Set([
  "evidence",
  "benchmark",
  "benchmarks",
  "rubric",
  "fixture",
  "fixtures",
  "proof",
  "prove",
  "credible",
  "credibility",
  "falsifiable",
  "falsification",
  "control",
  "baseline",
  "comparison",
  "practitioner",
  "review",
  "reviewer",
  "worksheet",
  "feedback",
  "ledger",
  "checklist",
  "minimum",
  "observable",
  "proof",
  "failure",
  "signals",
  "latency",
  "regression",
  "negative"
]);
const publicationPackTerms = new Set([
  "publication",
  "download",
  "downloads",
  "diagram",
  "diagrams",
  "pdf",
  "printable",
  "executive",
  "summary",
  "comparison",
  "tables",
  "decision",
  "packet",
  "glossary",
  "card",
  "walkthrough"
]);
const publicationSpineTerms = new Set([
  "published",
  "publication",
  "publications",
  "writing",
  "written",
  "articles",
  "library",
  "read",
  "reading",
  "order",
  "spine",
  "body",
  "work",
  "asset",
  "assets",
  "prove",
  "proof",
  "doctrine",
  "field",
  "notes",
  "patterns",
  "artifacts"
]);
const workTerms = new Set([
  "ravikanth",
  "work",
  "portfolio",
  "proof",
  "profile",
  "github",
  "linkedin",
  "code",
  "open",
  "source",
  "open-source",
  "building",
  "projects",
  "ravikanth's",
  "about",
  "who",
  "why",
  "trust",
  "experience",
  "resume",
  "background",
  "career",
  "certifications",
  "founder",
  "recruiter",
  "production",
  "delivery",
  "governance",
  "integration"
]);

function normalizeQueryIntent(query: string) {
  return query
    .toLowerCase()
    .replace(/\bob\s+servab(?:i|il)l?ity\b/g, "observability")
    .replace(/\bob\s+servability\b/g, "observability")
    .replace(/\bobservab(?:i|il)l?ity\b/g, "observability")
    .replace(/\bpobservab(?:i|il)l?ity\b/g, "observability")
    .replace(/\bpobservability\b/g, "observability");
}

export function localSearch(query: string, limit = 5): SearchHit[] {
  const lowerQuery = normalizeQueryIntent(query);
  const terms = lowerQuery
    .split(/\W+/)
    .filter((term) => term.length > 2);

  return buildPublicSourceIndex()
    .map((source) => {
      const lower = [
        source.title,
        source.description,
        source.content,
        source.tags.join(" "),
        source.frameworkLayers.join(" "),
        source.principles.join(" "),
        source.patterns.join(" "),
        source.products.join(" "),
        source.assetType
      ].join(" ").toLowerCase();
      const baseScore = terms.reduce((sum, term) => sum + (lower.includes(term) ? 1 : 0) + (source.title.toLowerCase().includes(term) ? 2 : 0), 0);
      const canonicalDefinitionBoost =
        source.url === doctrineUrl && /what is operational intelligence|how should operational intelligence be defined|define operational intelligence|definition of operational intelligence|canonical definition/.test(lowerQuery)
          ? 50
          : 0;
      const doctrineBoost = source.url === doctrineUrl && terms.some((term) => doctrineTerms.has(term)) ? 6 : 0;
      const referenceArchitectureBoost = source.url === referenceArchitectureUrl && terms.some((term) => referenceArchitectureTerms.has(term)) ? 7 : 0;
      const evidencePackBoost = source.url === evidencePackUrl && terms.some((term) => evidencePackTerms.has(term)) ? 7 : 0;
      const publicationPackBoost = source.url === publicationPackUrl && terms.some((term) => publicationPackTerms.has(term)) ? 9 : 0;
      const publicationSpineBoost =
        source.url === libraryUrl &&
        (/what has ravikanth (written|published)|publication spine|reading order|what should i read first|body of work|which publications|published assets|field notes.*patterns|doctrine.*field notes.*patterns|each asset prove/.test(lowerQuery) ||
          terms.filter((term) => publicationSpineTerms.has(term)).length >= 4)
          ? 80
          : 0;
      const workBoost = source.url === workUrl && terms.some((term) => workTerms.has(term)) ? 10 : 0;
      const startHereBoost =
        source.url === startHereUrl &&
        /start here|visitor|first destination|understand ravikanth|who is ravikanth|what should i know|hire|collaborate|learn from him|professional profile|success map|core questions/.test(lowerQuery)
          ? 85
          : 0;
      const visitorReviewBoost =
        source.url === startHereUrl &&
        /visitor review|first[- ]time review|first[- ]time visitor review|review kit|feedback kit|what was clear|what was confusing|most memorable idea|strongest claim|weakest claim|evidence would change|implementation question|submit.*review|evaluate.*site|evaluate.*ravikanth/.test(lowerQuery)
          ? 95
          : 0;
      const nowBoost =
        source.url === nowUrl &&
        /right now|current focus|currently focused|what.*learning|what.*researching|what.*advancing|research ledger|proof loop|what would change|next proof|trying to prove|trying to gather|current research|what.*building now/.test(lowerQuery) &&
        !/learn from him|learning from ravikanth/.test(lowerQuery)
          ? 90
          : 0;
      const resumeBoost = source.url === resumeUrl && /resume|experience|career|capability|impact|recruiter|founder|background|certification|credential|public evidence|architecture judgment/.test(lowerQuery) ? 12 : 0;
      const resumeSpecificBoost =
        source.url === resumeUrl &&
        /resume/.test(lowerQuery) &&
        /show|shows|where|inspect|evidence|architecture judgment|skills|impact|certification|credential/.test(lowerQuery)
          ? 35
          : 0;
      const backgroundBoost = source.url === backgroundUrl && /who is ravikanth|about ravikanth|background|career|experience|linkedin|certification|credential|profile/.test(lowerQuery) ? 12 : 0;
      const productionDeliveryBoost =
        source.url === backgroundUrl &&
        /architecture.*engineering.*integration|architecture to production|production delivery|delivery chain|governance.*production|evaluation.*governance|operating loop|production experience|production judgment/.test(lowerQuery)
          ? 75
          : 0;
      const proofBacklogBoost =
        source.url === evidencePackUrl &&
        /proof backlog|proof gap|evidence gap|what is still missing|what remains|not yet proven|external proof|live beta telemetry|visual qa|mobile qa|identity asset|what.*10\/10|what.*ten out of ten/.test(lowerQuery)
          ? 85
          : 0;
      const identityAssetBoost =
        source.url === identityAssetUrl &&
        /public identity mark|profile mark|ravikanth.*identity mark|where.*identity mark|durable public identity mark|portrait photo|portrait asset/.test(lowerQuery)
          ? 130
          : 0;
      const visualQaBoost =
        source.url === visualQaUrl &&
        /(visual qa|mobile qa).*(screenshot|viewport|evidence)|screenshot artifacts|screenshots|viewport evidence|first[- ]viewport|horizontal overflow|console-error|console error|touch walkthrough/.test(lowerQuery)
          ? 130
          : 0;
      const touchWalkthroughBoost =
        source.url === touchWalkthroughUrl && /touch walkthrough|mobile touch|tap target|dense interactive route|physical-device|physical device|source-validated mobile/.test(lowerQuery) ? 130 : 0;
      const askLiveReviewBoost =
        source.url === askLiveReviewUrl &&
        /ask live review|reviewer[- ]labeled ask|ask quality|answer quality baseline|live answer rubric|model synthesis quality|vector retrieval quality|local fallback.*vector retrieval.*model synthesis|safe metadata|raw prompts|aggregate model-quality|aggregate quality score/.test(lowerQuery)
          ? 130
          : 0;
      const practitionerReviewBoost =
        source.url === practitionerReviewUrl &&
        /practitioner review packet|external practitioner review|review ravikanth.*evidence|professional representation review|career clarity review|first impression review|does.*represent ravikanth|evaluate.*professional operating system/.test(lowerQuery)
          ? 130
          : 0;
      const qualityScorecardBoost =
        source.url === evidencePackUrl &&
        /quality scorecard|24 dimension|twenty four dimension|rate the site|rate seri.ai|current rating|current score|10\/10 target|ten out of ten target|how.*rate/.test(lowerQuery)
          ? 85
          : 0;
      const projectProofBoost =
        source.url === workUrl &&
        /project proof|work proof|public project evidence|what.*project.*prove|project.*does not prove|inspectable project|review project|stronger public project proof/.test(lowerQuery)
          ? 85
          : 0;
      const conformanceChecklistBoost = source.url === evidencePackUrl && /minimum conformance|conformance checklist|observable proof|failure signal/.test(lowerQuery) ? 10 : 0;
      const evidenceMarkdownBoost =
        source.url === "/publication-pack/operational-intelligence-evidence-pack.md" &&
        /reviewer-run worksheet|reviewer run worksheet|evidence ledger entry|dimension verdicts|scoring discipline|falsification criteria/.test(lowerQuery)
          ? 65
          : 0;
      const conformanceProfileBoost =
        source.url === conformanceProfileUrl &&
        /conformance profile|object profile|object fields|pass fail|pass\/fail|required fields|evidence object.*hypothesis state|hypothesis state.*evidence object|replay seed.*evaluation gate|evaluation gate.*replay seed|decision packet.*fields/.test(lowerQuery)
          ? 60
          : 0;
      const downloadPackBoost = source.url === publicationPackUrl && /download|diagram|pdf|printable|executive summary|comparison table|decision packet|glossary card|walkthrough/.test(lowerQuery) ? 8 : 0;
      const broadPublicationPackBoost =
        source.url === publicationPackUrl &&
        /download|where can i|where are|find/.test(lowerQuery) &&
        ["diagram", "comparison", "decision", "printable", "walkthrough", "glossary", "executive"].filter((term) => lowerQuery.includes(term)).length >= 3
          ? 50
          : 0;
      const publicProfileBoost = source.url === workUrl && /public code|open source|open-source|github|linkedin|public proof|engineering portfolio/.test(lowerQuery) ? 10 : 0;
      const thesisRadarBoost =
        source.url === radarUrl &&
        /thesis radar|market signal|why now|linkedin thesis|ops for observability|observability for ai|ai observability|agentops|agentic telemetry|aiops evaluation|opentelemetry|genai semantics|operational readiness|enterprise context layer|context acquisition tax|harness over model|shared operational reasoning|testable claim|public thought process/.test(lowerQuery)
          ? 60
          : 0;
      const controlComparisonBoost =
        source.url === controlComparisonUrl &&
        /oi-room-001.*control|control comparison|benchmark.*operational intelligence|dashboard.only|chatbot.only|ticket.only|comparison.*dashboard|comparison.*chatbot|comparison.*ticket|same synthetic facts|reasoning loss|reviewable decision path|reviewer worksheet|evidence completeness|contradiction handling|missing.evidence honesty|hypothesis quality|decision safety|replayability/.test(lowerQuery)
          ? 70
          : 0;
      const askRavikanthBoost =
        source.url === workUrl &&
        /ravikanth|about me|about him|who is|what.*building|what.*built|why.*trust|architecture judgment|technical direction|engineering philosophy|public work|professional achievements/.test(lowerQuery)
          ? 16
          : 0;
      const directReferenceBoost = directReferenceBoosts.some(([pattern, url]) => source.url === url && pattern.test(lowerQuery)) ? 40 : 0;
      const score =
        baseScore +
        canonicalDefinitionBoost +
        doctrineBoost +
        referenceArchitectureBoost +
        evidencePackBoost +
        publicationPackBoost +
        publicationSpineBoost +
        workBoost +
        startHereBoost +
        visitorReviewBoost +
        nowBoost +
        directReferenceBoost +
        broadPublicationPackBoost +
        conformanceChecklistBoost +
        evidenceMarkdownBoost +
        conformanceProfileBoost +
        downloadPackBoost +
        publicProfileBoost +
        thesisRadarBoost +
        controlComparisonBoost +
        askRavikanthBoost +
        resumeBoost +
        resumeSpecificBoost +
        backgroundBoost +
        productionDeliveryBoost +
        proofBacklogBoost +
        identityAssetBoost +
        visualQaBoost +
        touchWalkthroughBoost +
        askLiveReviewBoost +
        practitionerReviewBoost +
        qualityScorecardBoost +
        projectProofBoost;
      return { source, content: source.content, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
