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
    query: "Where is the minimum conformance checklist?",
    expectedFirstUrl: "/wiki/operational-intelligence-evidence-pack"
  },
  {
    query: "Where can I see Ravikanth public code and open-source signal?",
    expectedFirstUrl: "/work"
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
