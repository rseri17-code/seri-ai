import { buildPublicSourceIndex, type PublicSource } from "@/lib/content";

export type SearchHit = {
  source: PublicSource;
  content: string;
  score: number;
};

const doctrineUrl = "/wiki/operational-intelligence-canonical-doctrine";
const referenceArchitectureUrl = "/wiki/operational-intelligence-reference-architecture";
const evidencePackUrl = "/wiki/operational-intelligence-evidence-pack";
const publicationPackUrl = "/wiki/operational-intelligence-publication-pack";
const workUrl = "/work";
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
  [/evidence pack markdown|falsification criteria/, "/publication-pack/operational-intelligence-evidence-pack.md"],
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
  "recruiter"
]);

export function localSearch(query: string, limit = 5): SearchHit[] {
  const lowerQuery = query.toLowerCase();
  const terms = query
    .toLowerCase()
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
      const doctrineBoost = source.url === doctrineUrl && terms.some((term) => doctrineTerms.has(term)) ? 6 : 0;
      const referenceArchitectureBoost = source.url === referenceArchitectureUrl && terms.some((term) => referenceArchitectureTerms.has(term)) ? 7 : 0;
      const evidencePackBoost = source.url === evidencePackUrl && terms.some((term) => evidencePackTerms.has(term)) ? 7 : 0;
      const publicationPackBoost = source.url === publicationPackUrl && terms.some((term) => publicationPackTerms.has(term)) ? 9 : 0;
      const workBoost = source.url === workUrl && terms.some((term) => workTerms.has(term)) ? 10 : 0;
      const resumeBoost = source.url === resumeUrl && /resume|experience|career|capability|impact|recruiter|founder|background|certification|credential|public evidence|architecture judgment/.test(lowerQuery) ? 12 : 0;
      const backgroundBoost = source.url === backgroundUrl && /who is ravikanth|about ravikanth|background|career|experience|linkedin|certification|credential|profile/.test(lowerQuery) ? 12 : 0;
      const conformanceChecklistBoost = source.url === evidencePackUrl && /minimum conformance|conformance checklist|observable proof|failure signal/.test(lowerQuery) ? 10 : 0;
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
        /thesis radar|market signal|why now|linkedin thesis|ops for observability|observability for ai|ai observability|agentops|agentic telemetry|aiops evaluation|opentelemetry|genai semantics|operational readiness/.test(lowerQuery)
          ? 60
          : 0;
      const controlComparisonBoost =
        source.url === controlComparisonUrl &&
        /oi-room-001.*control|control comparison|benchmark.*operational intelligence|dashboard.only|chatbot.only|ticket.only|comparison.*dashboard|comparison.*chatbot|comparison.*ticket|same synthetic facts|reasoning loss|reviewable decision path/.test(lowerQuery)
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
        doctrineBoost +
        referenceArchitectureBoost +
        evidencePackBoost +
        publicationPackBoost +
        workBoost +
        directReferenceBoost +
        broadPublicationPackBoost +
        conformanceChecklistBoost +
        downloadPackBoost +
        publicProfileBoost +
        thesisRadarBoost +
        controlComparisonBoost +
        askRavikanthBoost +
        resumeBoost +
        backgroundBoost;
      return { source, content: source.content, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
