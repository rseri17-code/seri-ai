import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": process.cwd() }
});

const { localSearch } = jiti("../lib/search.ts");

const cases = [
  {
    query: "How should Operational Intelligence be defined?",
    expectedFirstUrl: "/wiki/operational-intelligence-canonical-doctrine"
  },
  {
    query: "Which asset defines implementation contracts, schemas, state machines, and conformance?",
    expectedFirstUrl: "/wiki/operational-intelligence-reference-architecture"
  },
  {
    query: "Where can I download diagrams, comparison tables, a decision packet, and printable walkthroughs?",
    expectedFirstUrl: "/wiki/operational-intelligence-publication-pack"
  },
  {
    query: "What evidence would convince a skeptical engineer that this model is useful?",
    expectedFirstUrl: "/wiki/operational-intelligence-evidence-pack"
  },
  {
    query: "Where is the OI-ROOM-001 control comparison against dashboard-only chatbot-only and ticket-only modes?",
    expectedFirstUrl: "/ideas/oi-room-001-control-comparison"
  },
  {
    query: "How should we benchmark Operational Intelligence against dashboard only chatbot only and ticket only investigations?",
    expectedFirstUrl: "/ideas/oi-room-001-control-comparison"
  },
  {
    query: "Where is the reviewer worksheet for evidence completeness contradiction handling and replayability?",
    expectedFirstUrl: "/ideas/oi-room-001-control-comparison"
  },
  {
    query: "Where is the minimum conformance checklist?",
    expectedFirstUrl: "/wiki/operational-intelligence-evidence-pack"
  },
  {
    query: "Where can I see Ravikanth public code and open-source signal?",
    expectedFirstUrl: "/work"
  },
  {
    query: "Where are the market signals for ops for observability and observability for AI?",
    expectedFirstUrl: "/radar"
  },
  {
    query: "Where are the market signals for ops for ob servabillity and pobservabillity for ai?",
    expectedFirstUrl: "/radar"
  },
  {
    query: "Explain the LinkedIn thesis around AgentOps, AI observability, and operational readiness.",
    expectedFirstUrl: "/radar"
  },
  {
    query: "Where is the public thought process for Enterprise Context Layer Context Acquisition Tax and harness over model?",
    expectedFirstUrl: "/radar"
  },
  {
    query: "How does OpenTelemetry GenAI semantics support Ravikanth's thesis?",
    expectedFirstUrl: "/radar"
  },
  {
    query: "Where are the Operational Intelligence state machine and evidence graph diagrams?",
    expectedFirstUrl: "/publication-pack/operational-intelligence-diagrams.md"
  },
  {
    query: "Show the comparison tables for observability versus AIOps versus Operational Intelligence.",
    expectedFirstUrl: "/publication-pack/operational-intelligence-comparison-tables.md"
  },
  {
    query: "Where is the decision packet example with approval class and rollback review?",
    expectedFirstUrl: "/publication-pack/decision-packet-example.md"
  },
  {
    query: "Find the OI-ROOM-001 printable walkthrough with transaction timing.",
    expectedFirstUrl: "/publication-pack/oi-room-001-printable-walkthrough.md"
  },
  {
    query: "Where is the one-page executive summary?",
    expectedFirstUrl: "/publication-pack/operational-intelligence-executive-summary.md"
  },
  {
    query: "Where is the glossary reference card for replay seed and operator control plane?",
    expectedFirstUrl: "/publication-pack/operational-intelligence-glossary-card.md"
  },
  {
    query: "Find the evidence pack markdown with falsification criteria and observable proof.",
    expectedFirstUrl: "/publication-pack/operational-intelligence-evidence-pack.md"
  },
  {
    query: "Download the publication pack PDF for sharing diagrams and tables.",
    expectedFirstUrl: "/downloads/operational-intelligence-publication-pack.pdf"
  },
  {
    query: "Download the evidence pack PDF.",
    expectedFirstUrl: "/downloads/operational-intelligence-evidence-pack.pdf"
  },
  {
    query: "Download the walkthrough PDF.",
    expectedFirstUrl: "/downloads/oi-room-001-printable-walkthrough.pdf"
  }
];

const errors = [];

for (const testCase of cases) {
  const hits = localSearch(testCase.query, 8);
  const uniqueUrls = [...new Set(hits.map((hit) => hit.source.url))];
  const firstUrl = uniqueUrls[0];
  if (firstUrl !== testCase.expectedFirstUrl) {
    errors.push(
      [
        `Query: ${testCase.query}`,
        `Expected first URL: ${testCase.expectedFirstUrl}`,
        `Actual first URL: ${firstUrl ?? "none"}`,
        `Top URLs: ${uniqueUrls.slice(0, 5).join(", ")}`
      ].join("\n")
    );
  }
}

if (errors.length) {
  console.error(errors.join("\n\n"));
  process.exit(1);
}

console.log(`Validated canonical search retrieval across ${cases.length} queries.`);
