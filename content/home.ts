import evalReportData from "./eval-report.json";

export const homeProfileLinks = {
  linkedin: "https://www.linkedin.com/in/ravikanthseri/",
  github: "https://github.com/rseri17-code"
};

export const homeEvalReport = evalReportData;

export const homeHarnessThesis = {
  headline: "The harness is the product.",
  statement:
    "The real differentiator in Agentic SRE is not the model. It is the operating harness that lets a model investigate with evidence, stay inside policy, expose its reasoning, learn from outcomes, and hand control back to humans before high-risk action.",
  loop: ["Intake", "Evidence", "Graph", "Hypothesis", "Decision", "Replay", "Outcome", "Learning"]
};

export const homeLinkedInSignals = [
  {
    name: "Enterprise Context Layer",
    description: "Operational context is an enterprise asset: ownership, change, dependency, transaction, current state, and policy must be maintained outside any single prompt."
  },
  {
    name: "Context Acquisition Tax",
    description: "Every engineer, workflow, and agent pays the tax repeatedly when the system cannot answer who owns it, what changed, what depends on it, and which transaction is affected."
  },
  {
    name: "Harness over model",
    description: "The durable product is the harness that captures evidence, replay, outcomes, approvals, and operational memory across incidents."
  },
  {
    name: "Dynamic operational view",
    description: "Static topology is not enough. Agents need a current operational view that admits uncertainty, stale knowledge, contradictions, and missing evidence."
  },
  {
    name: "Ops for observability",
    description: "Observability is becoming an operated product: source quality, retention, taxonomy, cost, governance, and feedback loops matter when humans and agents both consume telemetry."
  },
  {
    name: "Observability for AI",
    description: "AI systems need operational visibility into prompts, tool calls, traces, grounding, latency, cost, refusals, overrides, and drift before enterprises can trust them in real workflows."
  },
  {
    name: "Shared context problem",
    description: "AI makes private context cheap and shared context expensive; serious operations need public, inspectable reasoning artifacts teams can converge on."
  }
];

export const homeBuilderDna = {
  title: "The operating model",
  thesis:
    "This is not a chatbot layer for operations. It is a harness model for systems that investigate, prove, remember, replay, self-correct, and improve.",
  principles: [
    {
      name: "Deterministic first",
      description: "Known operational paths should be reproducible before an LLM is allowed to add judgment."
    },
    {
      name: "Proof-driven",
      description: "Every conclusion needs evidence references, missing-context statements, and confidence movement."
    },
    {
      name: "Bounded autonomy",
      description: "Tool use, time, scope, and irreversible actions need explicit budgets and policy gates."
    },
    {
      name: "Receipts everywhere",
      description: "Each tool call, observation, hypothesis, and decision should leave an auditable trail."
    }
  ]
};

export const homeArticles = [
  {
    slug: "oi-room-001-control-comparison",
    title: "OI-ROOM-001 Control Comparison",
    dek: "How to test the Operations Room against dashboard-only, chatbot-only, and ticket-only investigation modes.",
    theme: "Evidence"
  },
  {
    slug: "operational-intelligence-is-the-new-control-plane",
    title: "Operational Intelligence Is the New Control Plane",
    dek: "Why enterprises need systems that reason across signals, workflows, people, and outcomes.",
    theme: "Operational Intelligence"
  },
  {
    slug: "agentic-incident-investigation",
    title: "Agentic Incident Investigation Without Losing Control",
    dek: "How AI agents can accelerate enterprise investigations while keeping evidence, provenance, and accountability intact.",
    theme: "Agentic Systems"
  },
  {
    slug: "transaction-intelligence-for-complex-enterprises",
    title: "Transaction Intelligence for Complex Enterprises",
    dek: "Moving from isolated telemetry to transaction-aware explanations of customer and business impact.",
    theme: "Transaction Intelligence"
  }
];

export const homePatterns = [
  {
    slug: "evidence-driven-rca",
    title: "Evidence-Driven RCA",
    description: "Root cause analysis that keeps facts, hypotheses, and uncertainty separate."
  },
  {
    slug: "transaction-journey-reconstruction",
    title: "Transaction Journey Reconstruction",
    description: "Rebuild the customer or business journey across systems to explain impact."
  },
  {
    slug: "agentic-incident-investigation",
    title: "Agentic Incident Investigation",
    description: "Bounded agents that decompose investigations into inspectable steps."
  }
];
