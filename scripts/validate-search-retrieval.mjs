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
    query: "Where is the reviewer-run worksheet for evidence ledger entries and dimension verdicts?",
    expectedFirstUrl: "/publication-pack/operational-intelligence-evidence-pack.md"
  },
  {
    query: "Where is the minimum conformance checklist?",
    expectedFirstUrl: "/wiki/operational-intelligence-evidence-pack"
  },
  {
    query: "Where is the conformance profile for Evidence Object Hypothesis State Replay Seed Evaluation Gate and Decision Packet fields?",
    expectedFirstUrl: "/publication-pack/operational-intelligence-conformance-profile.md"
  },
  {
    query: "Which public asset defines object fields and pass fail checks for Operational Intelligence implementations?",
    expectedFirstUrl: "/publication-pack/operational-intelligence-conformance-profile.md"
  },
  {
    query: "Where can I see Ravikanth public code and open-source signal?",
    expectedFirstUrl: "/work"
  },
  {
    query: "Where can I inspect Ravikanth's GitHub and public repository signal without overclaiming metrics?",
    expectedFirstUrl: "/work"
  },
  {
    query: "Where is the Sentinalai public repository connected to Ravikanth's Operational Intelligence work?",
    expectedFirstUrl: "/work"
  },
  {
    query: "Where is the public code review rubric for inspecting Sentinalai without overclaiming production proof?",
    expectedFirstUrl: "/work"
  },
  {
    query: "Where is the publication spine and reading order for Ravikanth's body of work?",
    expectedFirstUrl: "/library"
  },
  {
    query: "What should I read first across doctrine field notes patterns artifacts and proof objects?",
    expectedFirstUrl: "/library"
  },
  {
    query: "Which publications explain what each asset proves in Operational Intelligence?",
    expectedFirstUrl: "/library"
  },
  {
    query: "How did Ravikanth's career evolve from enterprise infrastructure to production AI systems and Operational Intelligence?",
    expectedFirstUrl: "/work"
  },
  {
    query: "Where can I inspect Ravikanth's architecture to engineering to integration to evaluation governance and production delivery chain?",
    expectedFirstUrl: "/background"
  },
  {
    query: "How does Ravikanth show production delivery judgment without private implementation details?",
    expectedFirstUrl: "/background"
  },
  {
    query: "Show Ravikanth's path from enterprise integration middleware API identity Kubernetes observability AIOps production AI agentic operations to Operational Intelligence.",
    expectedFirstUrl: "/work"
  },
  {
    query: "Where should a first-time visitor start to understand Ravikanth Seri, his work, evidence, GitHub, resume, and contact path?",
    expectedFirstUrl: "/start-here"
  },
  {
    query: "What core questions should I answer before hiring collaborating with or learning from Ravikanth?",
    expectedFirstUrl: "/start-here"
  },
  {
    query: "Where is the first-time visitor review kit for evaluating whether seri.ai clearly represents Ravikanth?",
    expectedFirstUrl: "/start-here"
  },
  {
    query: "Where is the practitioner review packet for evaluating Ravikanth's professional representation and evidence?",
    expectedFirstUrl: "/publication-pack/ravikanth-seri-practitioner-review-packet.md"
  },
  {
    query: "How should an external practitioner review whether seri.ai represents Ravikanth without generic self-promotion?",
    expectedFirstUrl: "/publication-pack/ravikanth-seri-practitioner-review-packet.md"
  },
  {
    query: "How can I submit public-safe feedback about what was clear confusing memorable strongest weakest and what evidence would change my mind?",
    expectedFirstUrl: "/start-here"
  },
  {
    query: "Where can I inspect Ravikanth's architecture judgment and the constraints he preserves?",
    expectedFirstUrl: "/work"
  },
  {
    query: "How does Ravikanth think about governed AI action replay evaluation and transaction journeys?",
    expectedFirstUrl: "/work"
  },
  {
    query: "Where does Ravikanth's resume show architecture judgment rather than just skills?",
    expectedFirstUrl: "/resume"
  },
  {
    query: "What credentials and education support Ravikanth's AI operations infrastructure and Kubernetes background?",
    expectedFirstUrl: "/resume"
  },
  {
    query: "What is Ravikanth learning researching and advancing right now?",
    expectedFirstUrl: "/now"
  },
  {
    query: "Where is the research ledger for current proof loops and what would change the model?",
    expectedFirstUrl: "/now"
  },
  {
    query: "What proof is Ravikanth trying to gather next for operational agents replay transaction journeys and human approval?",
    expectedFirstUrl: "/now"
  },
  {
    query: "What is still missing before seri.ai can honestly claim 10/10 evidence quality?",
    expectedFirstUrl: "/wiki/operational-intelligence-evidence-pack"
  },
  {
    query: "Where is the proof backlog for practitioner review control comparison live beta telemetry visual QA and identity asset?",
    expectedFirstUrl: "/wiki/operational-intelligence-evidence-pack"
  },
  {
    query: "Where are the durable visual QA screenshots and viewport evidence?",
    expectedFirstUrl: "/visual-qa/2026-08-22/report.md"
  },
  {
    query: "Where can I inspect mobile QA screenshot artifacts and horizontal overflow evidence?",
    expectedFirstUrl: "/visual-qa/2026-08-22/report.md"
  },
  {
    query: "Where are the mobile touch walkthrough notes for Ask Operations Room Doctrine Radar and Work?",
    expectedFirstUrl: "/visual-qa/2026-08-22/mobile-touch-walkthroughs.md"
  },
  {
    query: "Show source-validated mobile touch evidence for dense interactive routes.",
    expectedFirstUrl: "/visual-qa/2026-08-22/mobile-touch-walkthroughs.md"
  },
  {
    query: "Where is the Ask live review packet for reviewer-labeled answer quality?",
    expectedFirstUrl: "/publication-pack/ask-ravi-live-review-packet.md"
  },
  {
    query: "How do we compare local fallback vector retrieval and model synthesis without capturing raw prompts?",
    expectedFirstUrl: "/publication-pack/ask-ravi-live-review-packet.md"
  },
  {
    query: "How would you rate seri.ai across the 24 dimensions right now?",
    expectedFirstUrl: "/wiki/operational-intelligence-evidence-pack"
  },
  {
    query: "Where is the quality scorecard for the 10/10 target and current evidence-based scores?",
    expectedFirstUrl: "/wiki/operational-intelligence-evidence-pack"
  },
  {
    query: "Where can I review project proof and what each public project does not prove?",
    expectedFirstUrl: "/work"
  },
  {
    query: "Show the inspectable project evidence ledger for Operations Room Ask Ravikanth Transaction Graph Explorer and AI Evaluation Workbench.",
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
  },
  {
    query: "Where is Ravikanth's durable public identity mark?",
    expectedFirstUrl: "/identity/ravikanth-seri-identity-mark.svg"
  },
  {
    query: "Is there an approved portrait photo for Ravikanth on seri.ai?",
    expectedFirstUrl: "/identity/portrait-intake.md"
  },
  {
    query: "Where is the portrait intake and validation contract for Ravikanth's approved source image?",
    expectedFirstUrl: "/identity/portrait-intake.md"
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
