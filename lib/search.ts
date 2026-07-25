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
  "projects"
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
      const conformanceChecklistBoost = source.url === evidencePackUrl && /minimum conformance|conformance checklist|observable proof|failure signal/.test(lowerQuery) ? 10 : 0;
      const downloadPackBoost = source.url === publicationPackUrl && /download|diagram|pdf|printable|executive summary|comparison table|decision packet|glossary card|walkthrough/.test(lowerQuery) ? 8 : 0;
      const publicProfileBoost = source.url === workUrl && /public code|open source|open-source|github|linkedin|public proof|engineering portfolio/.test(lowerQuery) ? 10 : 0;
      const score =
        baseScore +
        doctrineBoost +
        referenceArchitectureBoost +
        evidencePackBoost +
        publicationPackBoost +
        workBoost +
        conformanceChecklistBoost +
        downloadPackBoost +
        publicProfileBoost;
      return { source, content: source.content, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
