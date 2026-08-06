import evalReportData from "./eval-report.json";
import askQualityRubricData from "./ask-quality-rubric.json";
import articlesData from "./articles.json";
import principlesData from "./principles.json";
import patternsData from "./patterns.json";
import projectsData from "./projects.json";
import productsData from "./products.json";
import architectureCardsData from "./architecture-cards.json";

export const site = {
  name: "seri.ai",
  owner: "Ravikanth Seri",
  tagline: "Operational Intelligence for AI-native operations.",
  positioning: "Evidence graphs, replayable investigations, eval-gated agents, and human-reviewed action.",
  description:
    "seri.ai is the reasoning layer between observability data, AI agents, and human operational decisions. It turns signals, transactions, topology, memory, and policy into inspectable evidence and accountable action.",
  authorLine:
    "Built by Ravikanth Seri as the public home for his work on Operational Intelligence, Agentic SRE, transaction intelligence, observability, AI-native incident investigation, knowledge graphs, and AI evaluation.",
  nowSignal:
    "Right now Ravikanth is building public-safe Agentic SRE patterns: evidence graphs, hypothesis lifecycles, replay seeds, outcome memory, eval gates, and operator control planes for AI-native incident investigation.",
  brandBelief:
    "The next enterprise advantage is not a smarter model in isolation. It is the harness around the model: evidence, policy, replay, memory, evaluation, and human review working as one operating system.",
  productPromise:
    "The operating principle is simple: deterministic where possible, bounded where autonomous, replayable where trusted, and accountable where action matters.",
  operatingSystem: [
    "Evidence before conclusions",
    "Transactions before isolated signals",
    "Receipts before trust",
    "Replay before belief",
    "Human judgment before irreversible action"
  ],
  compliance:
    "Public-safe content only. No internal employer product names, proprietary projects, confidential platform names, screenshots, logs, dashboards, or architecture.",
  links: {
    linkedin: "https://www.linkedin.com/in/ravikanthseri/",
    github: "https://github.com/rseri17-code"
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/framework", label: "Framework" },
    { href: "/start-here", label: "Start Here" },
    { href: "/map", label: "Map" },
    { href: "/library", label: "Library" },
    { href: "/patterns", label: "Patterns" },
    { href: "/products/reasonops", label: "ReasonOps" },
    { href: "/investigation-room", label: "Operations Room" },
    { href: "/radar", label: "Radar" },
    { href: "/ask", label: "Ask Ravi" },
    { href: "/background", label: "Background" },
    { href: "/contact", label: "Contact" }
  ]
};

export const harnessThesis = {
  headline: "The harness is the product.",
  statement:
    "The real differentiator in Agentic SRE is not the model. It is the operating harness that lets a model investigate with evidence, stay inside policy, expose its reasoning, learn from outcomes, and hand control back to humans before high-risk action.",
  category:
    "ReasonOps is the product expression of that belief: a public-safe operating model for evidence-backed, self-healing operations.",
  beliefs: [
    {
      title: "Models reason. Harnesses remember.",
      body: "A model can reason about one incident. A harness accumulates operational experience across incidents, outcomes, false leads, approvals, and replayed decisions."
    },
    {
      title: "Incidents are temporary. Operational knowledge should not be.",
      body: "Every investigation should leave reusable memory: what was proven, what was rejected, what action worked, and what should be checked first next time."
    },
    {
      title: "Evidence-backed self-healing beats autonomy theater.",
      body: "The goal is not an agent that acts confidently. The goal is a system that can prove why action is justified, where uncertainty remains, and which human gate must approve change."
    },
    {
      title: "Shared context is the enterprise problem.",
      body: "Private context is cheap. The durable advantage is shared operational context: transactions, topology, evidence, owners, risks, and decisions that teams can trust together."
    }
  ],
  loop: ["Intake", "Evidence", "Graph", "Hypothesis", "Decision", "Replay", "Outcome", "Learning"],
  proofObjects: ["Evidence graph", "Hypothesis lifecycle", "Decision trace", "Replay seed", "Outcome memory", "Evaluation harness"]
};

export const canonicalDefinition = {
  short: "Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.",
  support:
    "It connects signals, transactions, topology, operational memory, evaluations, and human review so teams can understand what changed, why it matters, what evidence supports it, and what should happen next.",
  questions: [
    "What changed?",
    "Why does it matter?",
    "What evidence supports it?",
    "What is affected?",
    "What should a human review next?",
    "What should the system learn for next time?"
  ]
};

export const builderDna = {
  title: "The operating model",
  thesis:
    "This is not a chatbot layer for operations. It is a harness model for systems that investigate, prove, remember, replay, self-correct, and improve.",
  publicSafeSource:
    "This language is distilled from public-safe product work around AI-native incident investigation and operational control planes. It avoids internal employer systems, proprietary names, screenshots, logs, and confidential architecture.",
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
    },
    {
      name: "Replay as trust",
      description: "The best investigation systems can replay the same evidence path without re-running the world."
    },
    {
      name: "Operator control plane",
      description: "The UI should expose evidence, risk, confidence, memory, and approval gates in one place."
    }
  ],
  productTranslation: [
    "Incident command center",
    "Execution graph",
    "Evidence drawer",
    "Memory trace",
    "Replay mode",
    "Risk and confidence layer",
    "Human approval controls"
  ]
};

export const sentinelContextModel = {
  title: "The public-safe model behind the Agentic SRE harness",
  framing:
    "Operational AI should behave like evidence infrastructure. It should not just summarize incidents. It should collect typed evidence, build hypotheses, show decision provenance, preserve replay seeds, learn from outcomes, self-correct inside a bounded harness, and expose the whole process to an operator.",
  compliance:
    "This model is intentionally generic. It avoids private system names, vendor-specific implementation details, credentials, logs, screenshots, dashboards, and confidential architecture.",
  primitives: [
    {
      name: "Evidence Graph",
      description: "Represent logs, metrics, traces, changes, topology, tickets, and outcomes as typed evidence nodes with relationships."
    },
    {
      name: "Hypothesis Lifecycle",
      description: "Track what was proposed, supported, refuted, ruled out, confirmed, and how confidence moved over time."
    },
    {
      name: "Decision Trace",
      description: "Record why a recommendation was made, which evidence supported it, which alternatives lost, and what a human reviewed."
    },
    {
      name: "Replay Seed",
      description: "Preserve enough structured context to replay an investigation without re-running production systems."
    },
    {
      name: "Outcome Memory",
      description: "Link recommendations to what actually happened so future investigations can use proven patterns instead of folklore."
    },
    {
      name: "Learning Loop",
      description: "Turn replay, benchmark, operator feedback, false leads, and resolution outcomes into deterministic improvement signals."
    }
  ],
  controlPlane: [
    "Incident command center",
    "Execution graph",
    "Evidence drawer",
    "Hypothesis ledger",
    "Risk and confidence strip",
    "Memory trace",
    "Replay controls",
    "Approval gate"
  ],
  publicThesis:
    "The category is not AIOps plus a chatbot. The category is operational reasoning with evidence, provenance, replay, learning, and accountable control."
};

export const operationalLayers = [
  {
    slug: "signal-layer",
    name: "Signal Layer",
    description: "Logs, metrics, traces, alerts, events, tickets, changes, deployment signals, user impact, and business signals.",
    href: "/library"
  },
  {
    slug: "transaction-layer",
    name: "Transaction Layer",
    description: "The journey of a request, workflow, batch, job, or customer action across systems.",
    href: "/patterns/transaction-journey-reconstruction"
  },
  {
    slug: "topology-layer",
    name: "Topology Layer",
    description: "Services, dependencies, ownership, infrastructure, network, runtime, and business relationships.",
    href: "/patterns/topology-aware-reasoning"
  },
  {
    slug: "evidence-layer",
    name: "Evidence Layer",
    description: "Grounded facts collected from public-safe systems of record and approved sources.",
    href: "/patterns/evidence-driven-rca"
  },
  {
    slug: "reasoning-layer",
    name: "Reasoning Layer",
    description: "Hypothesis generation, causal analysis, impact explanation, confidence scoring, and tradeoff analysis.",
    href: "/products/reasonops"
  },
  {
    slug: "memory-layer",
    name: "Memory Layer",
    description: "Incidents, mitigations, patterns, decisions, known failure modes, and operational lessons.",
    href: "/patterns/operational-memory"
  },
  {
    slug: "evaluation-layer",
    name: "Evaluation Layer",
    description: "Replay, grounding checks, evidence coverage, refusal quality, correctness, and confidence calibration.",
    href: "/patterns/evaluation-and-replay"
  },
  {
    slug: "decision-layer",
    name: "Decision Layer",
    description: "Human review, recommended actions, escalation, ownership, and risk boundaries.",
    href: "/patterns/human-in-the-loop-operational-ai"
  },
  {
    slug: "learning-layer",
    name: "Learning Layer",
    description: "What the system updates after incidents, feedback, decisions, and outcomes.",
    href: "/now"
  },
  {
    slug: "operator-layer",
    name: "Operator Layer",
    description: "The human-in-the-loop interface for judgment, accountability, and execution.",
    href: "/investigation-room"
  }
];

export const operationalIntelligenceFramework = {
  title: "Operational Intelligence Framework",
  subtitle: "The reasoning layer between enterprise telemetry and human decision.",
  promise:
    "A public-safe reference model for systems that turn signals, transactions, topology, evidence, memory, evaluation, and human review into accountable operational decisions.",
  thesis:
    "Enterprises do not primarily lack telemetry. They lack a shared, inspectable reasoning system that can reconstruct what changed, why it matters, what evidence supports it, what is affected, what action is reviewable, and what should be learned.",
  operatorQuestions: [
    "What changed?",
    "What transaction or journey is affected?",
    "Which topology path explains the blast radius?",
    "What evidence supports or weakens each hypothesis?",
    "What should a human review before action?",
    "What should the system remember after resolution?"
  ],
  layers: [
    {
      name: "Signal Layer",
      definition: "The Signal Layer captures observable operational facts before interpretation.",
      problemSolved: "It prevents noisy telemetry from being treated as impact without source, time, scope, and reliability.",
      input: "Logs, metrics, traces, alerts, events, changes, incidents, infrastructure, network, user-impact, and business signals.",
      output: "Typed operational observations with source, timestamp, scope, and initial reliability.",
      coreResponsibility: "Name what was observed without deciding why it happened.",
      caseExample: "In OI-ROOM-001, the first reliable signal is elevated latency, retry growth, and intermittent failure on a critical customer transaction during a bounded time window.",
      adjacentLayers: "Feeds Transaction Layer and Topology Layer so raw symptoms can be connected to a customer journey and dependency path.",
      operationsStage: "Case Intake",
      askPrompt: "Explain the Signal Layer in OI-ROOM-001 and how it differs from guessing root cause.",
      failureMode: "Alert noise is mistaken for customer or business impact.",
      operatorQuestion: "Which signals show real operational impact instead of local noise?",
      related: ["/library", "/patterns/evidence-driven-rca"],
      relatedPattern: "/patterns/evidence-driven-rca",
      relatedArtifact: "/investigation-room",
      relatedLibraryAsset: "/ideas/operational-intelligence-is-the-new-control-plane"
    },
    {
      name: "Transaction Layer",
      definition: "The Transaction Layer reconstructs the journey of work across service and business boundaries.",
      problemSolved: "It gives operational reasoning a business-relevant unit instead of isolated service symptoms.",
      input: "Requests, workflows, jobs, events, customer actions, batch runs, and business processes across systems.",
      output: "A reconstructed journey that shows where the work moved, slowed, failed, or changed identity.",
      coreResponsibility: "Turn symptoms into an affected journey with hops, timestamps, state transitions, and uncertainty.",
      caseExample: "The degraded transaction crosses gateway, authentication, API, service, data, and downstream dependency stages; the failure matters because it affects the journey, not one chart.",
      adjacentLayers: "Consumes Signal Layer observations and gives Topology Layer a concrete path to explain.",
      operationsStage: "Transaction Journey",
      askPrompt: "Walk me through the OI-ROOM-001 transaction journey and why transaction context matters.",
      failureMode: "Teams debug isolated services without understanding the end-to-end journey.",
      operatorQuestion: "What transaction path turns raw telemetry into business meaning?",
      related: ["/patterns/transaction-journey-reconstruction", "/wiki/transaction-journeys"],
      relatedPattern: "/patterns/transaction-journey-reconstruction",
      relatedArtifact: "/map",
      relatedLibraryAsset: "/ideas/transaction-intelligence-for-complex-enterprises"
    },
    {
      name: "Topology Layer",
      definition: "The Topology Layer maps dependencies, ownership, runtime relationships, and blast-radius boundaries.",
      problemSolved: "It stops the system from guessing impact without knowing how operational components relate.",
      input: "Services, infrastructure, ownership, dependencies, runtime relationships, network paths, data stores, and business context.",
      output: "A dependency and ownership map that explains blast radius and review boundaries.",
      coreResponsibility: "Explain which systems, dependency groups, and ownership boundaries could plausibly affect the transaction.",
      caseExample: "The case narrows to a public-safe dependency path rather than every system touched by the customer journey.",
      adjacentLayers: "Receives the journey from Transaction Layer and constrains what Evidence Layer should verify.",
      operationsStage: "Evidence Graph",
      askPrompt: "Show how Topology Layer limits blast-radius claims in OI-ROOM-001.",
      failureMode: "Static topology produces stale ownership, false dependency assumptions, or broad blast-radius claims.",
      operatorQuestion: "Which dependency path best explains the symptom window?",
      related: ["/patterns/topology-aware-reasoning"],
      relatedPattern: "/patterns/topology-aware-reasoning",
      relatedArtifact: "/map",
      relatedLibraryAsset: "/ideas/knowledge-graphs-as-operational-memory"
    },
    {
      name: "Evidence Layer",
      definition: "The Evidence Layer separates verified facts from interpretation.",
      problemSolved: "It prevents fluent RCA language from appearing before the system can show what supports it.",
      input: "Validated facts from systems of record with provenance, scope, timestamps, and reliability.",
      output: "An evidence ledger that separates observed facts from interpretation.",
      coreResponsibility: "Attach every claim to provenance, reliability, scope, and relationship to a hypothesis.",
      caseExample: "A completion drop, a configuration change, a dependency-path clue, and an unrelated warning are tracked as separate receipts with different reliability.",
      adjacentLayers: "Converts Signal, Transaction, and Topology context into facts that Reasoning Layer can compare.",
      operationsStage: "Evidence Board",
      askPrompt: "What evidence supports, weakens, or contradicts the leading OI-ROOM-001 hypothesis?",
      failureMode: "A confident RCA is written before facts are verified.",
      operatorQuestion: "What evidence supports, contradicts, or fails to support the leading hypothesis?",
      related: ["/patterns/evidence-driven-rca", "/wiki/evidence-before-conclusions"],
      relatedPattern: "/patterns/evidence-driven-rca",
      relatedArtifact: "/investigation-room",
      relatedLibraryAsset: "/wiki/evidence-before-conclusions"
    },
    {
      name: "Reasoning Layer",
      definition: "The Reasoning Layer compares hypotheses against evidence, topology, transactions, memory, and missing context.",
      problemSolved: "It turns correlation into reviewable explanation without hiding alternatives or uncertainty.",
      input: "Evidence, timelines, topology, transaction paths, memory, contradictions, and missing context.",
      output: "Hypotheses with confidence movement, causal reasoning, alternatives, caveats, and explanation.",
      coreResponsibility: "Move hypotheses through explicit states as evidence supports, weakens, contradicts, or leaves them unresolved.",
      caseExample: "The configuration-regression hypothesis becomes leading because it fits timing, transaction impact, topology, and reversible mitigation better than capacity or unrelated-warning explanations.",
      adjacentLayers: "Consumes Evidence Layer receipts and passes a bounded conclusion to Evaluation Layer and Decision Layer.",
      operationsStage: "Hypothesis Lifecycle",
      askPrompt: "Explain the OI-ROOM-001 hypothesis lifecycle and why one explanation becomes leading.",
      failureMode: "Correlation is treated as causation and losing explanations disappear.",
      operatorQuestion: "Why is one hypothesis stronger than the alternatives?",
      related: ["/products/reasonops", "/patterns/agentic-incident-investigation"],
      relatedPattern: "/patterns/agentic-incident-investigation",
      relatedArtifact: "/investigation-room",
      relatedLibraryAsset: "/ideas/agentic-incident-investigation"
    },
    {
      name: "Memory Layer",
      definition: "The Memory Layer preserves approved lessons, patterns, decisions, and replay seeds for reuse.",
      problemSolved: "It keeps every incident from starting over after the ticket closes.",
      input: "Past incidents, failure patterns, mitigations, decisions, outcomes, ownership, and lessons.",
      output: "Reusable operational memory that informs future investigations without leaking confidential detail.",
      coreResponsibility: "Preserve a replayable record of what was known, tested, decided, and left unresolved.",
      caseExample: "The replay seed stores case identity, evidence references, timeline, state transitions, confidence changes, decision boundary, and unresolved questions.",
      adjacentLayers: "Receives reasoning state and later updates from Learning Layer so future investigations start with approved memory.",
      operationsStage: "Replay Seed",
      askPrompt: "What is the replay seed for OI-ROOM-001 and how is it different from an incident summary?",
      failureMode: "Every incident starts from zero because lessons disappear after resolution.",
      operatorQuestion: "What prior pattern matters here, and what must not be reused?",
      related: ["/patterns/operational-memory", "/wiki/operational-memory"],
      relatedPattern: "/patterns/operational-memory",
      relatedArtifact: "/investigation-room",
      relatedLibraryAsset: "/wiki/operational-memory"
    },
    {
      name: "Evaluation Layer",
      definition: "The Evaluation Layer tests answer behavior, grounding, refusal, replay, and action readiness before trust.",
      problemSolved: "It prevents polished answers from shipping without evidence that they behave safely under operational pressure.",
      input: "Answers, evidence packets, replay seeds, refusal cases, red herrings, and expected decision behavior.",
      output: "Release gates for grounding, evidence coverage, contradiction handling, confidence calibration, and usefulness.",
      coreResponsibility: "Check whether the investigation is grounded enough, contradiction-aware enough, and safe enough to become a recommendation.",
      caseExample: "The case passes only when evidence completeness, claim support, contradiction handling, replay readiness, action safety, and human review are explicit.",
      adjacentLayers: "Tests Reasoning Layer output before Decision Layer turns it into a reviewable action.",
      operationsStage: "Evaluation Gate",
      askPrompt: "How does the Evaluation Layer decide whether OI-ROOM-001 is ready for reviewed action?",
      failureMode: "Fluent output is trusted without testing operational behavior.",
      operatorQuestion: "How do we know the reasoning system behaved safely and usefully?",
      related: ["/evals", "/patterns/evaluation-and-replay", "/wiki/evaluation-and-replay"],
      relatedPattern: "/patterns/evaluation-and-replay",
      relatedArtifact: "/evals",
      relatedLibraryAsset: "/ideas/ai-evaluation-is-operational-risk-management"
    },
    {
      name: "Decision Layer",
      definition: "The Decision Layer turns reasoning into bounded, reviewable recommendations.",
      problemSolved: "It makes action explicit, reversible where possible, and accountable to the right human gate.",
      input: "Ranked hypotheses, risk, ownership, escalation paths, action options, confidence, and missing evidence.",
      output: "A reviewable recommendation with boundaries, alternatives, owner context, and approval requirements.",
      coreResponsibility: "Prepare the safest next action, its risk, reversibility, owner, approval requirement, and alternatives.",
      caseExample: "The recommended action is a rollback review with owner approval, not autonomous production change.",
      adjacentLayers: "Uses Evaluation Layer gates and hands the recommendation to Operator Layer for approval, rejection, escalation, or override.",
      operationsStage: "Decision Surface",
      askPrompt: "What decision should OI-ROOM-001 recommend, and what remains unknown?",
      failureMode: "The system recommends irreversible action without accountable review.",
      operatorQuestion: "What should a human approve, reject, defer, or escalate?",
      related: ["/patterns/human-in-the-loop-operational-ai", "/investigation-room"],
      relatedPattern: "/patterns/human-in-the-loop-operational-ai",
      relatedArtifact: "/investigation-room",
      relatedLibraryAsset: "/ideas/agentic-systems-need-operating-models"
    },
    {
      name: "Learning Layer",
      definition: "The Learning Layer converts outcomes into approved future memory, eval fixtures, and operating rules.",
      problemSolved: "It closes the loop between resolution, operator feedback, replay, and future system behavior.",
      input: "Resolution outcomes, operator feedback, accepted mitigations, false leads, and replay results.",
      output: "Updated memory, patterns, eval fixtures, confidence rules, and future investigation behavior.",
      coreResponsibility: "Decide what should be remembered, corrected, promoted into a pattern, or added to evaluation fixtures.",
      caseExample: "After resolution, useful evidence, misleading evidence, mitigation outcome, topology updates, and confidence adjustments become learning candidates.",
      adjacentLayers: "Updates Memory Layer and Evaluation Layer after Operator Layer confirms what actually happened.",
      operationsStage: "Outcome and Learning",
      askPrompt: "What should OI-ROOM-001 teach the system after resolution?",
      failureMode: "Post-incident learning never reaches the next investigation.",
      operatorQuestion: "What should the system learn for next time?",
      related: ["/now", "/changelog"],
      relatedPattern: "/patterns/operational-memory",
      relatedArtifact: "/changelog",
      relatedLibraryAsset: "/ideas/knowledge-graphs-as-operational-memory"
    },
    {
      name: "Operator Layer",
      definition: "The Operator Layer is the human control surface for judgment, challenge, approval, and accountability.",
      problemSolved: "It keeps operational AI inspectable and contestable when decisions affect systems or customers.",
      input: "Evidence paths, hypotheses, confidence, risk, review gates, missing context, and proposed actions.",
      output: "A human control surface for judgment, intervention, approval, override, and accountability.",
      coreResponsibility: "Give the accountable human the ability to inspect, approve, reject, request more evidence, escalate, annotate, or preserve uncertainty.",
      caseExample: "The operator can approve the review packet, reject it, request more evidence, escalate ownership, or keep the case unresolved without executing a real action.",
      adjacentLayers: "Receives Decision Layer recommendations and sends confirmed outcomes back into Learning Layer.",
      operationsStage: "Operator Control Plane",
      askPrompt: "Where does human review enter OI-ROOM-001 and what can the operator control?",
      failureMode: "Operators see polished answers but cannot inspect or challenge the reasoning.",
      operatorQuestion: "Can the accountable human inspect and challenge the conclusion before action?",
      related: ["/investigation-room", "/ask"],
      relatedPattern: "/patterns/human-in-the-loop-operational-ai",
      relatedArtifact: "/ask",
      relatedLibraryAsset: "/ideas/agentic-systems-need-operating-models"
    }
  ],
  designPrinciples: [
    "Evidence before conclusions",
    "Transaction journeys before isolated signals",
    "Shared context before private agent context",
    "Replay before trust",
    "Evaluation before release",
    "Human review before consequential action"
  ],
  evaluationCriteria: [
    "Evidence coverage",
    "Root-cause match",
    "Red-herring resistance",
    "Contradiction handling",
    "Confidence calibration",
    "Decision trace quality",
    "Refusal quality",
    "Replay consistency",
    "Operational usefulness"
  ]
};

export const operationalIntelligenceSystem = {
  caseId: "OI-ROOM-001",
  caseTitle: "Customer transaction degradation",
  caseSummary:
    "A public-safe investigation scenario where a critical customer journey degrades after a non-secret configuration change. The system must connect signal, transaction, topology, evidence, reasoning, memory, evaluation, decision, learning, and operator context before recommending a human-reviewed action.",
  promise:
    "The same case powers the Map, Operations Room, and Ask Ravi so visitors experience Operational Intelligence as a system, not a set of pages.",
  loop: [
    {
      name: "Map the operating model",
      href: "/map",
      description: "See how each layer contributes to a trustworthy operational decision."
    },
    {
      name: "Run the case",
      href: "/investigation-room",
      description: "Replay evidence, topology, hypotheses, action gates, and eval checks."
    },
    {
      name: "Interrogate the reasoning",
      href: "/ask?prompt=Explain%20the%20OI-ROOM-001%20case%20using%20the%20Operational%20Intelligence%20layers.",
      description: "Ask the public-grounded assistant to explain the case using the Operational Intelligence layers."
    }
  ],
  layerStates: [
    {
      layer: "Signal Layer",
      state: "Completion rate drops and retries rise for a critical customer journey.",
      question: "Which signals show customer impact instead of internal noise?"
    },
    {
      layer: "Transaction Layer",
      state: "The affected journey is reconstructed across public-safe dependency groups.",
      question: "What transaction path turns alerts into business meaning?"
    },
    {
      layer: "Topology Layer",
      state: "The journey is mapped to dependency groups, ownership, and blast-radius boundaries.",
      question: "Which dependency path best explains the symptom window?"
    },
    {
      layer: "Evidence Layer",
      state: "Observable facts are separated from interpretation before RCA language appears.",
      question: "What evidence supports the leading hypothesis?"
    },
    {
      layer: "Reasoning Layer",
      state: "Competing explanations are ranked against timing, impact, topology, and reversibility.",
      question: "Why is one hypothesis stronger than the alternatives?"
    },
    {
      layer: "Memory Layer",
      state: "Approved lessons and prior public-safe patterns influence what the system checks next.",
      question: "What prior pattern should be remembered without leaking confidential detail?"
    },
    {
      layer: "Evaluation Layer",
      state: "Grounding, uncertainty, refusal behavior, actionability, and human review are graded.",
      question: "How do we know the assistant behaved safely?"
    },
    {
      layer: "Decision Layer",
      state: "The output is a rollback review packet, not an autonomous irreversible action.",
      question: "What should a human approve, reject, or escalate?"
    },
    {
      layer: "Learning Layer",
      state: "The validated outcome becomes a future eval fixture and approved memory candidate.",
      question: "What should the system learn for next time?"
    },
    {
      layer: "Operator Layer",
      state: "The human sees evidence paths, confidence movement, missing context, and review gates.",
      question: "Can the operator challenge the conclusion before action?"
    }
  ],
  askPrompts: [
    "Explain the OI-ROOM-001 case using the Operational Intelligence layers.",
    "Why is the harness the product in Agentic SRE?",
    "What is an evidence-backed self-healing operations system?",
    "How should deterministic-first incident investigation work?",
    "Why do evidence receipts and replay matter for operational AI?",
    "Explain the public-safe Agentic SRE harness model behind seri.ai.",
    "What is the difference between evidence graph, hypothesis lifecycle, decision trace, and replay seed?",
    "What makes the Operations Room different from a dashboard demo?",
    "How should AI evaluation work for operational incident investigation?",
    "Why does Operational Intelligence require transaction, topology, and evidence together?",
    "What should an AI assistant refuse to answer in a public-safe Operational Intelligence site?"
  ],
  decisionPacket: {
    hypothesis: "Configuration regression in a dependency path",
    action: "Recommend rollback review with owner approval",
    guardrail: "No internal logs, proprietary product names, screenshots, or confidential architecture.",
    evalStandard: "Evidence coverage, deterministic replay, budget discipline, uncertainty, confidentiality, human review, and actionability must pass before trust.",
    operatingControls: ["20-call budget", "policy gate", "evidence receipts", "hash-checked replay", "confidence calibration", "approval checkpoint"]
  }
};

export const assetTypes = [
  "Manifesto",
  "Pattern",
  "Field Guide",
  "Product Brief",
  "Map",
  "Artifact",
  "Principle",
  "Radar Note",
  "Memo",
  "Background Entry"
];

export const releaseModel = {
  cadence: "One public asset per month and one quarterly State of Operational Intelligence memo.",
  assets: [
    "Architecture pattern",
    "Field guide",
    "Artifact",
    "Memo",
    "Reference map",
    "Evaluation rubric"
  ],
  currentRelease: "v0.6 Knowledge Map, Library, Artifacts, and category vocabulary"
};

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

export const products = productsData;

export const architectureCards = architectureCardsData;

export const evalReport = evalReportData;
export const askQualityRubric = askQualityRubricData;

export const thesisRadar = {
  title: "Operational Intelligence Thesis Radar",
  updatedAt: "2026-07-30",
  thesis:
    "The market is converging on a two-way operating model: AI is changing how enterprises run operations, and operations disciplines are becoming mandatory for trustworthy AI. Operational Intelligence sits at that intersection.",
  framing: [
    {
      name: "Ops for observability",
      statement:
        "Observability can no longer be treated as a passive dashboard layer. It needs product operations: source quality, retention strategy, cost controls, taxonomy, governance, and feedback loops."
    },
    {
      name: "Observability for AI",
      statement:
        "AI systems need their own observability surface: prompts, tools, agents, model calls, token cost, latency, grounding, drift, safety refusals, and human override paths."
    },
    {
      name: "Operational Intelligence",
      statement:
        "The durable category is not AIOps alone or AI observability alone. It is the reasoning layer that connects telemetry, transactions, topology, memory, agents, evaluation, and human decisions."
    }
  ],
  proofChain: [
    {
      theme: "Enterprise Context Layer",
      publicThought:
        "Operational context should be owned as a durable enterprise asset: systems, owners, dependencies, transactions, policy, current state, and known failure memory.",
      marketSignal:
        "GenAI telemetry, agent execution traces, and AI operations tooling are making context capture part of the operational data plane.",
      operationalClaim:
        "The context layer should outlive any single incident, dashboard, prompt, ticket, or person carrying the thread.",
      falsificationQuestion:
        "If teams can preserve the same reasoning quality without a durable context layer, this claim should be narrowed."
    },
    {
      theme: "Context Acquisition Tax",
      publicThought:
        "Every engineer and agent pays a repeated tax when ownership, change, dependency, impact, and policy must be rediscovered during each investigation.",
      marketSignal:
        "AI agents increase the cost of fragmented context because they can generate fluent answers faster than teams can verify the evidence.",
      operationalClaim:
        "Operational Intelligence should reduce repeated context reconstruction by preserving evidence, hypotheses, decisions, and replay seeds.",
      falsificationQuestion:
        "If faster summaries reduce investigation loss without preserving evidence, the model is adding unnecessary structure."
    },
    {
      theme: "Harness over model",
      publicThought:
        "The important product is not a smarter standalone model. It is the harness that scopes work, gathers evidence, exposes uncertainty, gates action, and learns from outcomes.",
      marketSignal:
        "AgentOps, AI observability, and evaluation work increasingly focus on traces, tool calls, grounding, cost, failures, and supervised action.",
      operationalClaim:
        "Enterprise AI operations should be evaluated through the operating harness: retrieval, evidence graph, hypothesis lifecycle, eval gates, approval, and memory.",
      falsificationQuestion:
        "If model quality alone explains operational improvement, the harness thesis is overstated."
    },
    {
      theme: "Shared operational reasoning",
      publicThought:
        "Private context is cheap; shared context is the hard enterprise problem. Teams need reasoning artifacts they can inspect together.",
      marketSignal:
        "Incident response, SRE, observability, and AI governance all push toward auditability, provenance, and explicit human oversight.",
      operationalClaim:
        "The durable output should be a reviewable decision packet, not only a chat answer or dashboard view.",
      falsificationQuestion:
        "If independent reviewers cannot replay the decision from the artifact, the artifact is not strong enough."
    }
  ],
  trends: [
    {
      name: "AI observability moves from model monitoring to full-stack operations",
      signal:
        "Production AI systems now need visibility across models, prompts, latency, infrastructure, costs, and agent interactions.",
      whyItMatters:
        "This validates the shift from AI experiments to AI operations. Enterprises need to manage reliability, cost, drift, and agent behavior as one operating surface.",
      ravikanthAngle:
        "AI observability should be framed as a control plane for operational trust, not a dashboard for model metrics.",
      sources: [
        {
          label: "OpenTelemetry: GenAI observability",
          url: "https://opentelemetry.io/blog/2026/genai-observability/",
          evidenceType: "standard signal",
          supports: "Shows GenAI behavior becoming part of the observable operational surface."
        },
        {
          label: "OpenTelemetry semantic conventions",
          url: "https://opentelemetry.io/docs/specs/semconv/",
          evidenceType: "standard",
          supports: "Grounds the claim in a shared instrumentation vocabulary rather than vendor-specific dashboards."
        }
      ]
    },
    {
      name: "AgentOps becomes the operational discipline for agentic systems",
      signal:
        "Agentic systems require monitoring of behavior, memory, tool use, workflow paths, uncertainty, and runtime optimization.",
      whyItMatters:
        "Traditional software observability does not capture the probabilistic and adaptive behavior of agents. AgentOps gives enterprises a vocabulary for operating agents safely.",
      ravikanthAngle:
        "This supports the bounded-agency thesis: agents should collect, compare, draft, and recommend inside explicit operating contracts.",
      sources: [
        {
          label: "Microsoft Research: AgentRx failure diagnosis",
          url: "https://www.microsoft.com/en-us/research/publication/agentrx-diagnosing-ai-agent-failures-from-execution-trajectories/",
          evidenceType: "research",
          supports: "Supports trajectory-level diagnosis for agent failures instead of final-answer inspection alone."
        },
        {
          label: "MLflow: agent observability guide",
          url: "https://mlflow.org/articles/what-is-agent-observability-a-2026-developer-guide/",
          evidenceType: "implementation signal",
          supports: "Shows agent observability moving into practitioner implementation guidance."
        }
      ]
    },
    {
      name: "AIOps is shifting from final-answer RCA to reasoning-process evaluation",
      signal:
        "New benchmarks evaluate whether agents localize faults, identify failure type, and ground reasoning in evidence instead of only grading the final answer.",
      whyItMatters:
        "Enterprise operations cannot trust black-box incident answers. The reasoning trace must be inspectable, testable, and tied to evidence.",
      ravikanthAngle:
        "This is the strongest research backing for the simulator: evidence, timeline, hypothesis, action, and eval should be product primitives.",
      sources: [
        {
          label: "Multi-dataset benchmark for LLM agents in microservice failure diagnosis",
          url: "https://arxiv.org/abs/2606.29193",
          evidenceType: "research",
          supports: "Supports evaluation of diagnostic behavior across microservice failure scenarios."
        },
        {
          label: "Agentic NetOps and AIOps: architecture, evaluation, safety",
          url: "https://arxiv.org/abs/2605.12729",
          evidenceType: "research",
          supports: "Connects agentic operations to architecture, evaluation, and safety constraints."
        }
      ]
    },
    {
      name: "OpenTelemetry is expanding into GenAI and MCP semantics",
      signal:
        "OpenTelemetry semantic conventions now include Generative AI areas such as agent spans, model providers, events, metrics, spans, and Model Context Protocol.",
      whyItMatters:
        "The telemetry standard is following the market into AI-native operations. AI interactions are becoming observable operational events.",
      ravikanthAngle:
        "Observability for AI can lean on OpenTelemetry as the shared language for agent traces, tool calls, and model behavior.",
      sources: [
        {
          label: "OpenTelemetry GenAI semantic conventions",
          url: "https://opentelemetry.io/docs/specs/semconv/gen-ai/",
          evidenceType: "standard",
          supports: "Grounds AI spans, events, metrics, and model interactions in an emerging telemetry standard."
        },
        {
          label: "OpenTelemetry: GenAI observability",
          url: "https://opentelemetry.io/blog/2026/genai-observability/",
          evidenceType: "standard signal",
          supports: "Shows why AI behavior belongs in the operational data plane."
        }
      ]
    },
    {
      name: "Observability infrastructure must change for machine consumers",
      signal:
        "AI agents need longer retention, less sampling, richer context, and high-concurrency query patterns that differ from human dashboard usage.",
      whyItMatters:
        "If agents become consumers of telemetry, observability economics and architecture need to adapt. Data quality becomes an AI-readiness issue.",
      ravikanthAngle:
        "This supports the 'ops for observability' side of the thesis: observability itself needs governance, economics, quality controls, and operational maturity.",
      sources: [
        {
          label: "Azure Monitor Observability Agent billing and cost management",
          url: "https://learn.microsoft.com/en-us/azure/azure-monitor/aiops/observability-agent-billing",
          evidenceType: "implementation signal",
          supports: "Shows telemetry consumed by agents creating explicit cost and governance surfaces."
        },
        {
          label: "OpenTelemetry: GenAI telemetry privacy defaults",
          url: "https://opentelemetry.io/blog/2026/genai-observability/",
          evidenceType: "standard signal",
          supports: "Connects AI telemetry to privacy defaults and operational data-quality choices."
        }
      ]
    },
    {
      name: "Enterprise AI success is becoming an operational-readiness problem",
      signal:
        "The market is moving from model selection to operational disciplines: usage attribution, controls, capacity, cost, governance, and application-layer efficiency.",
      whyItMatters:
        "The constraint is no longer access to AI. It is whether enterprise systems are instrumented, governed, and ready to absorb AI into real workflows.",
      ravikanthAngle:
        "This is the category opening: Operational Intelligence explains what enterprises must build before autonomous operations can be trusted.",
      sources: [
        {
          label: "NIST AI Risk Management Framework",
          url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10",
          evidenceType: "governance",
          supports: "Grounds operational readiness in AI risk management rather than model capability alone."
        },
        {
          label: "Azure Monitor Observability Agent cost controls",
          url: "https://learn.microsoft.com/en-us/azure/azure-monitor/aiops/observability-agent-billing",
          evidenceType: "implementation signal",
          supports: "Shows AI operations introducing capacity, attribution, and billing controls."
        }
      ]
    },
    {
      name: "Hybrid AI and causality are re-entering the AIOps conversation",
      signal:
        "Market commentary increasingly distinguishes summarization from reasoning and points toward hybrid systems combining LLMs, classical ML, and causal models.",
      whyItMatters:
        "Summaries are useful but insufficient for high-stakes operations. Enterprises need causal evidence, topology, memory, and governed action loops.",
      ravikanthAngle:
        "This reinforces the claim that Operational Intelligence is a reasoning architecture, not just a chat interface over telemetry.",
      sources: [
        {
          label: "Google SRE: monitoring distributed systems",
          url: "https://sre.google/resources/book-update/monitoring-distributed-systems/",
          evidenceType: "foundational practice",
          supports: "Keeps the thesis anchored in established monitoring and reliability practice."
        },
        {
          label: "Multi-dataset benchmark for LLM agents in microservice failure diagnosis",
          url: "https://arxiv.org/abs/2606.29193",
          evidenceType: "research",
          supports: "Shows why diagnosis quality needs benchmarkable evidence, not only narrative summaries."
        }
      ]
    },
    {
      name: "AI-led operations still needs human oversight",
      signal:
        "Agentic security and operations workflows are moving toward AI-led investigation under human supervision.",
      whyItMatters:
        "This validates a human-in-the-loop operating model. The enterprise pattern is not blind autonomy; it is supervised acceleration.",
      ravikanthAngle:
        "Human judgment before irreversible action remains the central operating principle.",
      sources: [
        {
          label: "NIST AI RMF: govern, map, measure, manage",
          url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10",
          evidenceType: "governance",
          supports: "Grounds human oversight and control in a recognized AI risk-management lifecycle."
        },
        {
          label: "Microsoft Research: AgentRx auditable validation logs",
          url: "https://www.microsoft.com/en-us/research/publication/agentrx-diagnosing-ai-agent-failures-from-execution-trajectories/",
          evidenceType: "research",
          supports: "Supports auditable traces and validation logs for supervised agent investigation."
        }
      ]
    }
  ]
};

export const categoryBrief = {
  title: "The Operational Intelligence Brief",
  subtitle: "Why enterprises need systems that explain themselves before they automate themselves.",
  audience: "Executives, platform leaders, AI builders, observability leaders, SREs, and enterprise architects.",
  thesis:
    "AI-native operations will not be won by the team with the most dashboards or the largest model. It will be won by teams that can turn telemetry, transactions, topology, memory, and human decisions into a governed reasoning system.",
  whyNow: [
    "Enterprise AI is moving from pilots into production workflows, which makes reliability, cost, governance, drift, and incident response first-order concerns.",
    "AI agents are becoming consumers and producers of operational telemetry, which changes the economics and architecture of observability.",
    "AIOps is moving from event correlation toward evidence-grounded investigation, workflow evaluation, and supervised action.",
    "OpenTelemetry and related standards are expanding into GenAI and agent semantics, making AI behavior part of the operational data plane."
  ],
  contrarianInsight:
    "The dashboard is not the destination. The destination is an operational reasoning layer that can explain what changed, why it matters, which evidence supports the conclusion, and what action a human should review.",
  wedge:
    "The wedge is the intersection of production infrastructure, observability, identity, Kubernetes, AI agent runtime governance, and incident investigation. That combination lets seri.ai talk about AI-native operations from operator reality, not abstract AI enthusiasm.",
  proofPoints: [
    "A public simulator that turns the evidence-first investigation model into an interactive artifact.",
    "A public trust report that exposes how Ask Ravi should behave, refuse, cite, and admit uncertainty.",
    "A thesis radar that maps current market movement around AI observability, AgentOps, AIOps evaluation, OpenTelemetry GenAI semantics, and operational readiness.",
    "A public resume narrative grounded in production AI agent systems, observability, runtime governance, Kubernetes, and identity modernization."
  ],
  whatToRemember: [
    "Operational Intelligence is the reasoning layer above observability.",
    "Ops for observability means treating telemetry quality, retention, cost, governance, and taxonomy as product operations.",
    "Observability for AI means tracing prompts, tools, agents, cost, latency, grounding, drift, refusals, and human overrides.",
    "Agentic operations need operating contracts before they need more autonomy.",
    "Evaluation is the control system for trustworthy enterprise AI."
  ],
  nextMoves: [
    "Turn the simulator into a multi-scenario investigation workbench.",
    "Publish flagship essays with diagrams for the operating model, graph model, eval model, and agent governance model.",
    "Add continuous eval reports that test Ask Ravi against live retrieval and model responses when production keys are configured.",
    "Build a public Operational Intelligence glossary that makes the category language reusable."
  ]
};

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

export const nowPage = {
  currentFocus: [
    "Operational Intelligence as the reasoning layer between observability, AI agents, and human operational decisions.",
    "Agentic SRE systems that investigate with evidence, expose uncertainty, and keep irreversible action behind review.",
    "Transaction Intelligence as the bridge between telemetry, customer impact, topology, ownership, and business meaning."
  ],
  building: [
    "ReasonOps as a public-safe operating model for evidence-backed, self-healing enterprise operations.",
    "An Operations Room that turns signal, change, topology, hypotheses, action gates, and eval checks into a reviewable RCA packet.",
    "Ask Ravi retrieves approved public context, cites sources, refuses confidential questions, and names missing evidence.",
    "A pattern library for evidence graphs, hypothesis lifecycles, decision traces, replay seeds, outcome memory, and operator control planes."
  ],
  studying: [
    "Knowledge graph retrieval for enterprise topology, transaction journeys, ownership, and operational memory.",
    "Multi-agent orchestration boundaries: tool budgets, freshness checks, approval gates, and fail-closed execution.",
    "How teams decide whether to trust AI recommendations during high-pressure incidents.",
    "How AI observability, evals, and replay can detect reasoning drift before operational trust is lost."
  ],
  writing: [
    "Why dashboards are not intelligence.",
    "How evidence-driven RCA should work in AI-native operations.",
    "What transaction journeys reveal that service views miss.",
    "Why the harness, not the model, is the durable product in Agentic SRE."
  ],
  avoiding: [
    "Generic AI thought leadership.",
    "Confidential or employer-specific implementation details.",
    "Claims that cannot be grounded in public evidence."
  ],
  questions: [
    "What should operational memory remember, forget, and refuse?",
    "How should AI explain what it ignored?",
    "What makes an agent trustworthy enough for enterprise operations?",
    "What is the minimum evidence packet before an AI system recommends operational action?"
  ]
};

export const startHerePaths = [
  {
    audience: "Executives",
    care: "Operational Intelligence turns AI from experimentation into a way to improve enterprise decision loops.",
    readFirst: ["/wiki/operational-intelligence-canonical-doctrine", "/publication-pack/operational-intelligence-executive-summary.md", "/map"],
    ask: "How should executives evaluate AI systems for operational work?",
    matters: ["/products/reasonops", "/investigation-room", "/wiki/operational-intelligence-evidence-pack"]
  },
  {
    audience: "Recruiters",
    care: "Background is supporting evidence. The primary signal is category thinking, architecture depth, and product judgment.",
    readFirst: ["/background", "/map", "/artifacts"],
    ask: "What public body of work supports the Operational Intelligence thesis?",
    matters: ["/products/reasonops", "/contact"]
  },
  {
    audience: "Architects",
    care: "The site offers public-safe patterns for agents, retrieval, topology, evaluation, and transaction-aware reasoning.",
    readFirst: ["/wiki/operational-intelligence-reference-architecture", "/publication-pack/operational-intelligence-diagrams.md", "/patterns"],
    ask: "How should an evidence-driven incident investigation system be designed?",
    matters: ["/wiki/operational-intelligence-evidence-pack", "/patterns/shared-context-for-enterprise-agents", "/patterns/topology-aware-reasoning"]
  },
  {
    audience: "Engineers",
    care: "The material connects reliability work to practical AI system boundaries, evidence, and evaluation.",
    readFirst: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/evidence-before-conclusions", "/patterns/agentic-incident-investigation"],
    ask: "How should an engineer keep incident agents grounded?",
    matters: ["/wiki/operational-intelligence-evidence-pack", "/wiki/shared-context-for-enterprise-agents", "/patterns/transaction-journey-reconstruction"]
  },
  {
    audience: "Founders",
    care: "Operational Intelligence is a category lens for building durable enterprise AI products.",
    readFirst: ["/manifesto", "/products/reasonops", "/radar"],
    ask: "What product opportunities exist around Operational Intelligence?",
    matters: ["/radar", "/now"]
  }
];

export const changelog = [
  {
    version: "v0.7",
    date: "2026-07-25",
    title: "Added publication-ready Operational Intelligence reference assets",
    description:
      "seri.ai now exposes the canonical doctrine, reference architecture, publication pack, evidence pack, printable artifacts, PDF exports, and homepage discovery path for technical review.",
    tags: ["doctrine", "reference-architecture", "evidence", "publication"]
  },
  {
    version: "v0.5",
    date: "2026-07-05",
    title: "Added ReasonOps product surface and expanded category architecture",
    description:
      "ReasonOps is now a first-class public product concept under seri.ai, with product pages, architecture model, principles, use cases, roadmap, and interview positioning.",
    tags: ["reasonops", "products", "interview", "category"]
  },
  {
    version: "v0.4",
    date: "2026-07-05",
    title: "Added public eval report and upgraded simulator decisioning",
    description:
      "seri.ai now exposes a trust report for Ask Ravi behavior and turns the incident simulator into a scored investigation workflow with choices, confidence, and exportable RCA summary.",
    tags: ["evals", "trust", "simulator", "decisioning"]
  },
  {
    version: "v0.3",
    date: "2026-07-05",
    title: "Added signature simulator and expanded the public body of work",
    description:
      "seri.ai now includes an AI Incident Investigation Simulator, a stronger Operational Intelligence point of view, ten serious public essays, and updated public certification evidence.",
    tags: ["simulator", "ideas", "operational-intelligence", "certifications"]
  },
  {
    version: "v0.2",
    date: "2026-07-05",
    title: "Added public wiki, principles, patterns, and living product layer",
    description:
      "seri.ai now supports approved public notes, operating principles, architecture pattern pages, start-here paths, current focus areas, content search, citations, and content validation.",
    tags: ["wiki", "principles", "patterns", "citations"]
  },
  {
    version: "v0.1",
    date: "2026-07-05",
    title: "Initial Operational Intelligence platform",
    description:
      "Launched the first version of seri.ai with a public reasoning assistant, ideas, project pages, architecture lab, resume, contact, Supabase schema, and AI provider adapters.",
    tags: ["launch", "ask-ravi", "projects"]
  }
];

export const resume = {
  headline: "Senior infrastructure architect building production AI agent systems for enterprise operations.",
  location: "Charlotte, NC",
  contact: ["rseri17@gmail.com", "github.com/rseri17-code", "linkedin.com/in/ravikanthseri"],
  summary:
    "Senior infrastructure architect with 15+ years designing, modernizing, and operating distributed enterprise systems in regulated financial-services environments. Ravikanth's work sits at the intersection of AI-native operations, observability, identity modernization, Kubernetes platforms, runtime governance, and incident investigation. He builds practical systems that turn telemetry, transactions, topology, and operational memory into evidence-backed decisions.",
  strengths: [
    "Production AI agent systems for enterprise operations",
    "Operational Intelligence, AIOps, and AI-native incident investigation",
    "Agent observability, evaluation, replayability, and behavioral drift analysis",
    "Runtime governance, bounded execution, tool controls, and human-in-the-loop review",
    "Kubernetes, hybrid cloud infrastructure, identity platforms, and distributed systems",
    "OpenTelemetry, distributed tracing, telemetry correlation, and performance diagnostics",
    "Python automation, enterprise API integration, and workflow orchestration",
    "Architecture enablement for executives, platform teams, and operations stakeholders"
  ],
  architectureHighlights: [
    "Architected production LLM-driven agent platforms using deterministic orchestration, bounded execution controls, replayability safeguards, and human review gates.",
    "Designed governed reasoning-service patterns where deterministic decision layers own routing, evidence gates, call budgets, audit trails, and escalation before any model-produced judgment.",
    "Designed governed tool-calling ecosystems that connect observability, IT service workflows, telemetry systems, and enterprise APIs through schema-bound interfaces.",
    "Built end-to-end agent observability patterns using OpenTelemetry-style instrumentation, evaluator scoring, orchestration introspection, telemetry receipts, and drift analysis.",
    "Implemented runtime governance models including fail-closed execution, freshness validation, tool budget enforcement, policy-aware safeguards, and approval checkpoints.",
    "Designed telemetry and workload coordination architectures across Kubernetes, cloud platforms, identity platforms, integration gateways, and hybrid enterprise infrastructure."
  ],
  publicProof: [
    {
      label: "GitHub",
      value: "github.com/rseri17-code",
      href: "https://github.com/rseri17-code",
      description: "Public code and open-source work connected to Operational Intelligence, AI systems, and engineering artifacts."
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ravikanthseri",
      href: "https://www.linkedin.com/in/ravikanthseri/",
      description: "Ongoing public signal for posts, architecture thinking, certifications, and what Ravikanth is building."
    },
    {
      label: "Reference assets",
      value: "Doctrine, architecture, evidence, and publication packs",
      href: "/wiki/operational-intelligence-publication-pack",
      description: "Shareable public artifacts that make the Operational Intelligence thesis reviewable and portable."
    }
  ],
  sourceProvenance: [
    {
      sourceClass: "Resume and CV",
      supports: "Career chronology, platform domains, impact ledger, education, certifications, and progression from integration infrastructure into AI-native operations.",
      publicUse: "Synthesized into role summaries, capability evidence, and career throughline instead of copied verbatim."
    },
    {
      sourceClass: "Architecture notes",
      supports: "Deterministic orchestration, decision-layer routing, evidence gates, bounded worker calls, replayable ledgers, model isolation, and human approval patterns.",
      publicUse: "Converted into generic, public-safe architecture patterns without internal system names, diagrams, logs, endpoints, schemas, or confidential implementation details."
    },
    {
      sourceClass: "Public profiles and publishing",
      supports: "LinkedIn thesis threads, public GitHub signal, published Operational Intelligence assets, reference architecture, Operations Room, and Ask Ravi evaluation surface.",
      publicUse: "Connected into the public knowledge graph so visitors can inspect ideas through doctrine, patterns, artifacts, and cited source links."
    }
  ],
  experience: [
    {
      role: "AIOps Lead Architect",
      organization: "Major regulated financial-services enterprise",
      period: "2025 - Present",
      impact:
        "Leads architecture for production AI-assisted operational workflows that support observability, incident response, retrieval, evaluation, and governed tool use.",
      bullets: [
        "Architected LLM-driven agent platforms for enterprise operations using deterministic orchestration, bounded execution, replayability, and human-in-the-loop governance.",
        "Separated deterministic routing, evidence collection, gate evaluation, and model reasoning so operational conclusions remain replayable, auditable, and bounded.",
        "Designed governed enterprise tool ecosystems spanning observability, IT service workflows, telemetry, and enterprise APIs through schema-bound dispatch and policy-aware execution.",
        "Built agent observability pipelines for prompt execution, tool invocation behavior, orchestration paths, evaluator scoring, runtime telemetry, and behavioral drift analysis.",
        "Designed evaluation workflows for root-cause analysis quality, workload reliability scoring, operational usefulness, and regression testing before production trust.",
        "Profiled model-selection tradeoffs across latency, cost, retrieval depth, token throughput, and reliability for production AI workload constraints.",
        "Authored executive technical memos and delivered architecture enablement sessions for operations, platform engineering, and leadership stakeholders."
      ]
    },
    {
      role: "Infrastructure Technical Lead - Identity and Observability",
      organization: "Major regulated financial-services enterprise",
      period: "2022 - 2025",
      impact:
        "Led identity modernization, cloud-native platform reliability, observability integration, and automation initiatives across enterprise application environments.",
      bullets: [
        "Led containerization and modernization of enterprise identity workloads on Kubernetes, improving scalability, deployment consistency, isolation, and reliability.",
        "Orchestrated zero-downtime OpenID Connect migration across 120+ enterprise applications while preserving legacy application contracts and reducing migration friction.",
        "Integrated OpenTelemetry-style pipelines across identity services and Kubernetes environments to improve tracing, telemetry correlation, diagnostics, and anomaly detection.",
        "Designed observability integration patterns across distributed tracing, runtime telemetry, and monitoring platforms for hybrid enterprise infrastructure.",
        "Automated OAuth onboarding and enterprise API workflows with Python, reducing identity support tickets by 80% and recovering about 200 engineering hours per quarter."
      ]
    },
    {
      role: "Enterprise Infrastructure and Middleware Engineer",
      organization: "Financial services, retail, insurance, and enterprise technology environments",
      period: "2008 - 2022",
      impact:
        "Built a foundation across middleware, infrastructure operations, identity systems, distributed platforms, automation, and reliability engineering.",
      bullets: [
        "Operated and modernized enterprise middleware, API gateway, B2B integration, identity, and infrastructure platforms in high-availability environments.",
        "Supported service-oriented and API integration patterns across XML, JSON, SOAP, REST, mutual authentication, access policies, and enterprise gateway controls.",
        "Built observability and data-quality practices around logs, dashboards, alerting, telemetry onboarding, latency analysis, capacity signals, and operational support workflows.",
        "Worked on cloud migration, containerization, deployment automation, and configuration-management workflows across Linux, application servers, and integration platforms.",
        "Partnered with engineering, security, and operations teams to improve reliability, access patterns, integration quality, and operational support models.",
        "Developed durable expertise in Linux, distributed systems, enterprise integration, cloud migration, automation, and production support."
      ]
    }
  ],
  skills: [
    {
      group: "AI Infrastructure and Runtime Operations",
      items: ["LLM agent platforms", "deterministic orchestration", "governed tool use", "retrieval routing", "runtime governance", "tool budget controls"]
    },
    {
      group: "Agent Observability and Evaluation",
      items: ["OpenTelemetry-style instrumentation", "evaluator scoring", "replayability", "drift analysis", "telemetry receipts"]
    },
    {
      group: "Cloud-Native and Hybrid Infrastructure",
      items: ["Kubernetes", "Helm", "Terraform", "Docker", "AWS", "Linux", "hybrid cloud architecture"]
    },
    {
      group: "Observability and Performance Engineering",
      items: ["distributed tracing", "telemetry correlation", "performance diagnostics", "incident analysis", "AIOps workflows"]
    },
    {
      group: "Python and Integration Engineering",
      items: ["Python APIs", "SDK integrations", "workflow orchestration", "infrastructure automation", "enterprise API integration", "API gateways", "service-oriented architecture"]
    }
  ],
  education: ["MS, Industrial Engineering, University of New Haven"],
  certifications: [
    "Artificial Intelligence Associate, North Carolina State University, issued Dec 2025",
    "Certified Data Scientist, North Carolina State University, issued Jun 2025",
    "AWS Solutions Architect Associate, Amazon Web Services, issued Mar 2020 and expired Mar 2023",
    "Certified Kubernetes Administrator",
    "IBM Certified DataPower Administrator"
  ]
};

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

const registryDate = "2026-07-16";
const allFrameworkLayers = operationalIntelligenceFramework.layers.map((layer) => layer.name);

export const contentRegistry: ContentRegistryItem[] = [
  {
    title: "Operational Intelligence Canonical Doctrine v1.0",
    slug: "operational-intelligence-canonical-doctrine",
    summary: "The definitive public doctrine for Operational Intelligence definitions, boundaries, framework layers, OI-ROOM-001, glossary, citations, and original contribution.",
    type: "framework",
    route: "/wiki/operational-intelligence-canonical-doctrine",
    status: "published",
    frameworkLayers: allFrameworkLayers,
    relatedPrinciples: ["Evidence before conclusions", "Transaction journeys matter more than isolated service views", "Evaluation is not a feature; it is the control system", "Operators need clarity, not more dashboards"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/transaction-journey-reconstruction", "/patterns/agentic-incident-investigation", "/patterns/evaluation-and-replay", "/patterns/operational-memory"],
    relatedArtifacts: ["/framework", "/map", "/investigation-room", "/evals", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack", "/ideas/operational-intelligence-is-the-new-control-plane", "/ideas/the-operational-intelligence-stack"],
    publicSafe: "public-safe",
    createdAt: "2026-07-17",
    updatedAt: "2026-07-25",
    seo: {
      title: "Operational Intelligence Canonical Doctrine v1.0",
      description: "The canonical public doctrine for Operational Intelligence."
    }
  },
  {
    title: "Operational Intelligence Reference Architecture v1.0",
    slug: "operational-intelligence-reference-architecture",
    summary: "Draft technical-review specification for implementing Operational Intelligence with layer contracts, schemas, state machines, governance, evaluation, and conformance levels.",
    type: "framework",
    route: "/wiki/operational-intelligence-reference-architecture",
    status: "published",
    frameworkLayers: allFrameworkLayers,
    relatedPrinciples: ["Evidence before conclusions", "Evaluation is not a feature; it is the control system", "Trustworthy agents need boundaries, not just intelligence", "The best AI systems improve the human decision loop"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/transaction-journey-reconstruction", "/patterns/evaluation-and-replay", "/patterns/human-in-the-loop-operational-ai", "/patterns/operational-memory"],
    relatedArtifacts: ["/framework", "/map", "/investigation-room", "/evals", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack", "/operational-intelligence-reference-architecture-v1.md"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack"],
    publicSafe: "public-safe",
    createdAt: "2026-07-17",
    updatedAt: "2026-07-25",
    seo: {
      title: "Operational Intelligence Reference Architecture v1.0",
      description: "Draft technical-review specification for implementing Operational Intelligence."
    }
  },
  {
    title: "Operational Intelligence Publication Pack",
    slug: "operational-intelligence-publication-pack",
    summary: "Shareable diagrams, comparison tables, decision packet example, OI-ROOM-001 walkthrough, executive summary, glossary card, and PDF exports for the Operational Intelligence body of work.",
    type: "artifact",
    route: "/wiki/operational-intelligence-publication-pack",
    status: "published",
    frameworkLayers: allFrameworkLayers,
    relatedPrinciples: ["Evidence before conclusions", "Transaction journeys matter more than isolated service views", "Evaluation is not a feature; it is the control system", "Operators need clarity, not more dashboards"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/transaction-journey-reconstruction", "/patterns/evaluation-and-replay", "/patterns/operational-memory"],
    relatedArtifacts: ["/framework", "/map", "/investigation-room", "/evals", "/wiki/operational-intelligence-evidence-pack", "/operational-intelligence-reference-architecture-v1.md", "/downloads/operational-intelligence-publication-pack.pdf"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-evidence-pack"],
    publicSafe: "public-safe",
    createdAt: "2026-07-25",
    updatedAt: "2026-07-25",
    seo: {
      title: "Operational Intelligence Publication Pack",
      description: "Shareable diagrams, tables, walkthroughs, cards, and PDFs for Operational Intelligence."
    }
  },
  {
    title: "Operational Intelligence Evidence Pack",
    slug: "operational-intelligence-evidence-pack",
    summary: "Public-safe benchmark rubric, control comparisons, practitioner review model, evidence ledger, and falsification criteria for evaluating Operational Intelligence.",
    type: "artifact",
    route: "/wiki/operational-intelligence-evidence-pack",
    status: "published",
    frameworkLayers: allFrameworkLayers,
    relatedPrinciples: ["Evidence before conclusions", "Evaluation is not a feature; it is the control system", "Trustworthy agents need boundaries, not just intelligence", "The best AI systems improve the human decision loop"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/evaluation-and-replay", "/patterns/human-in-the-loop-operational-ai", "/patterns/operational-memory"],
    relatedArtifacts: ["/framework", "/map", "/investigation-room", "/evals", "/contact", "/wiki/operational-intelligence-publication-pack", "/publication-pack/operational-intelligence-evidence-pack.md"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack"],
    publicSafe: "public-safe",
    createdAt: "2026-07-25",
    updatedAt: "2026-07-25",
    seo: {
      title: "Operational Intelligence Evidence Pack",
      description: "Benchmark rubric, review model, and falsification criteria for Operational Intelligence."
    }
  },
  {
    title: "Operational Intelligence Thesis Radar",
    slug: "operational-intelligence-thesis-radar",
    summary: "Market signal map connecting Ravikanth Seri's public LinkedIn thesis to AI observability, ops for observability, AgentOps, AIOps evaluation, OpenTelemetry GenAI semantics, and enterprise AI operational readiness.",
    type: "domain",
    route: "/radar",
    status: "published",
    frameworkLayers: ["Signal Layer", "Topology Layer", "Evaluation Layer", "Operator Layer"],
    relatedPrinciples: ["Evidence before conclusions", "Evaluation is not a feature; it is the control system", "Trustworthy agents need boundaries, not just intelligence", "Operators need clarity, not more dashboards"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/agentic-incident-investigation", "/patterns/evaluation-and-replay", "/patterns/human-in-the-loop-operational-ai"],
    relatedArtifacts: ["/framework", "/investigation-room", "/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-evidence-pack"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/ideas/operational-intelligence-is-the-new-control-plane", "/ideas/agentic-incident-investigation"],
    publicSafe: "public-safe",
    createdAt: "2026-07-30",
    updatedAt: "2026-07-30",
    seo: {
      title: "Operational Intelligence Thesis Radar",
      description: "Market signals grounding Operational Intelligence across AI observability, AgentOps, AIOps evaluation, OpenTelemetry, and operational readiness."
    }
  },
  {
    title: "Operational Intelligence Framework",
    slug: "operational-intelligence-framework",
    summary: operationalIntelligenceFramework.promise,
    type: "framework",
    route: "/framework",
    status: "published",
    frameworkLayers: allFrameworkLayers,
    relatedPrinciples: operationalIntelligenceFramework.designPrinciples,
    relatedPatterns: patterns.slice(0, 6).map((pattern) => `/patterns/${pattern.slug}`),
    relatedArtifacts: ["/map", "/investigation-room", "/evals", "/wiki/operational-intelligence-evidence-pack"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack", "/ideas/operational-intelligence-is-the-new-control-plane", "/ideas/the-operational-intelligence-stack"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: "Operational Intelligence Framework",
      description: operationalIntelligenceFramework.subtitle
    }
  },
  {
    title: "ReasonOps",
    slug: "reasonops",
    summary: products[0].summary,
    type: "product",
    route: "/products/reasonops",
    status: "published",
    frameworkLayers: ["Reasoning Layer", "Evaluation Layer", "Decision Layer", "Operator Layer"],
    relatedPrinciples: products[0].principles,
    relatedPatterns: ["/patterns/agentic-incident-investigation", "/patterns/evaluation-and-replay", "/patterns/human-in-the-loop-operational-ai"],
    relatedArtifacts: ["/investigation-room", "/evals"],
    relatedProducts: [],
    relatedLibraryAssets: ["/manifesto", "/ideas/agentic-systems-need-operating-models"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: products[0].name,
      description: products[0].summary
    }
  },
  {
    title: "Operations Room",
    slug: "operations-room",
    summary: operationalIntelligenceSystem.caseSummary,
    type: "artifact",
    route: "/investigation-room",
    status: "published",
    frameworkLayers: allFrameworkLayers,
    relatedPrinciples: ["Evidence before conclusions", "Replay before trust", "Human review before consequential action"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/agentic-incident-investigation", "/patterns/evaluation-and-replay"],
    relatedArtifacts: ["/map", "/evals"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/ideas/incident-investigation-as-a-product-experience"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: "Operations Room",
      description: operationalIntelligenceSystem.caseSummary
    }
  },
  {
    title: "Ask Ravi",
    slug: "ask-ravikanth",
    summary: "A cited review interface over Ravikanth Seri's approved public work, Operational Intelligence content, projects, background, and reference artifacts.",
    type: "system",
    route: "/ask",
    status: "published",
    frameworkLayers: ["Reasoning Layer", "Evidence Layer", "Evaluation Layer", "Operator Layer"],
    relatedPrinciples: ["Evidence before conclusions", "Evaluation before trust"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/evaluation-and-replay"],
    relatedArtifacts: ["/evals", "/investigation-room"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/library"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: "Ask Ravi",
      description: "Public-safe companion for Ravikanth Seri's public work and Operational Intelligence thesis."
    }
  },
  {
    title: "Public Evaluation Gate",
    slug: "public-evaluation-gate",
    summary: evalReport.summary,
    type: "artifact",
    route: "/evals",
    status: "published",
    frameworkLayers: ["Evaluation Layer", "Evidence Layer", "Operator Layer"],
    relatedPrinciples: ["Evaluation before release", "Replay before trust"],
    relatedPatterns: ["/patterns/evaluation-and-replay"],
    relatedArtifacts: ["/investigation-room"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/ideas/evaluating-ai-for-operational-work", "/ideas/ai-evaluation-is-operational-risk-management"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: "Public Evaluation Gate",
      description: "Reproducible public trust fixtures and limitations for Ask Ravi."
    }
  },
  {
    title: "Ravikanth Seri Work Index",
    slug: "ravikanth-seri-work-index",
    summary: "Canonical public index of Ravikanth Seri's Operational Intelligence systems, frameworks, architecture artifacts, public writing, open-source signal, and professional background.",
    type: "background",
    route: "/work",
    status: "published",
    frameworkLayers: ["Operator Layer", "Reasoning Layer", "Evaluation Layer", "Learning Layer"],
    relatedPrinciples: ["Evidence before conclusions", "The best AI systems improve the human decision loop", "Operational memory compounds"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/agentic-incident-investigation", "/patterns/evaluation-and-replay"],
    relatedArtifacts: ["/framework", "/investigation-room", "/evals", "/resume", "/background", "/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/wiki/operational-intelligence-canonical-doctrine", "/wiki/operational-intelligence-reference-architecture", "/wiki/operational-intelligence-publication-pack", "/wiki/operational-intelligence-evidence-pack"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: "2026-07-25",
    seo: {
      title: "Ravikanth Seri Work Index",
      description: "Public index of Ravikanth Seri's Operational Intelligence systems, reference architectures, artifacts, writing, and professional background."
    }
  },
  {
    title: "Professional Background",
    slug: "professional-background",
    summary: resume.summary,
    type: "background",
    route: "/background",
    status: "published",
    frameworkLayers: ["Operator Layer", "Evaluation Layer", "Reasoning Layer"],
    relatedPrinciples: ["Human review before consequential action"],
    relatedPatterns: [],
    relatedArtifacts: ["/resume"],
    relatedProducts: [],
    relatedLibraryAssets: [],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: "Ravikanth Seri Background",
      description: resume.summary
    }
  },
  {
    title: "Agentic SRE Harness Model",
    slug: "agentic-sre-harness-model",
    summary: harnessThesis.statement,
    type: "framework",
    route: "/manifesto",
    status: "published",
    frameworkLayers: ["Evidence Layer", "Reasoning Layer", "Evaluation Layer", "Decision Layer", "Operator Layer"],
    relatedPrinciples: harnessThesis.beliefs.map((belief) => belief.title),
    relatedPatterns: ["/patterns/agentic-incident-investigation", "/patterns/human-in-the-loop-operational-ai"],
    relatedArtifacts: ["/investigation-room"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/ideas/agentic-systems-need-operating-models"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: "Agentic SRE Harness Model",
      description: harnessThesis.statement
    }
  },
  {
    title: "Evidence Graph Model",
    slug: "evidence-graph-model",
    summary: "Typed evidence nodes and relationships for incident investigation and operational memory.",
    type: "framework",
    route: "/patterns/evidence-driven-rca",
    status: "published",
    frameworkLayers: ["Signal Layer", "Topology Layer", "Evidence Layer", "Reasoning Layer"],
    relatedPrinciples: ["Evidence before conclusions"],
    relatedPatterns: ["/patterns/evidence-driven-rca", "/patterns/topology-aware-reasoning"],
    relatedArtifacts: ["/investigation-room", "/map"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/ideas/knowledge-graphs-as-operational-memory"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: "Evidence Graph Model",
      description: "A public-safe evidence graph model for incident investigation."
    }
  },
  {
    title: "Replay Seed Model",
    slug: "replay-seed-model",
    summary: "The minimum approved context needed to replay an investigation without re-running production systems.",
    type: "framework",
    route: "/wiki/evaluation-and-replay",
    status: "published",
    frameworkLayers: ["Memory Layer", "Evaluation Layer", "Learning Layer"],
    relatedPrinciples: ["Replay before trust", "Evaluation before release"],
    relatedPatterns: ["/patterns/evaluation-and-replay", "/patterns/operational-memory"],
    relatedArtifacts: ["/evals", "/investigation-room"],
    relatedProducts: ["/products/reasonops"],
    relatedLibraryAssets: ["/wiki/evaluation-and-replay", "/wiki/operational-memory"],
    publicSafe: "public-safe",
    createdAt: registryDate,
    updatedAt: registryDate,
    seo: {
      title: "Replay Seed Model",
      description: "Replay seeds as public-safe operational memory."
    }
  }
];

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
