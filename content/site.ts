import evalReportData from "./eval-report.json";

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
    { href: "/ask", label: "Ask Ravikanth" },
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
    "The same case powers the Map, Operations Room, and Ask Ravikanth so visitors experience Operational Intelligence as a system, not a set of pages.",
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
};

export const articles: Article[] = [
  {
    slug: "operational-intelligence-is-the-new-control-plane",
    title: "Operational Intelligence Is the New Control Plane",
    dek: "Why enterprises need systems that reason across signals, workflows, people, and outcomes.",
    theme: "Operational Intelligence",
    date: "2026-07-05",
    readingTime: "4 min",
    body: [
      "Most enterprises already collect enough telemetry to know what happened. The harder question is what it means, who should care, and what action is justified. Operational Intelligence starts where dashboards stop.",
      "The next control plane is not another charting layer. It is a reasoning layer that connects events, business transactions, dependencies, historical decisions, and current goals. It treats operations as a living system instead of a pile of tools.",
      "The useful AI system is grounded, bounded, and explainable. It retrieves approved context, names uncertainty, proposes actions with rationale, and leaves an audit trail that humans can challenge.",
      "The category shift is from monitoring to sensemaking. Monitoring tells a team that something crossed a threshold. Sensemaking explains the affected transaction, the likely dependency path, the relevant change history, and the decision that should be reviewed.",
      "A practical Operational Intelligence system needs four layers: signal collection, shared context, reasoning workflow, and evaluation. If any layer is missing, the system either becomes another dashboard or an untrusted chatbot.",
      "The strongest version is not autonomous heroics. It is a better human decision loop: faster alignment, clearer evidence, fewer repeated investigations, and operational memory that compounds over time.",
      "Executive summary: Operational Intelligence exists because telemetry, dashboards, and chat transcripts do not by themselves create shared operational judgment. The missing layer is a reasoning system that connects what changed, what journey is affected, what evidence supports the explanation, what should be reviewed, and what should be learned.",
      "Core thesis: the category is not a replacement for observability. Observability makes systems visible; Operational Intelligence makes operational meaning inspectable. The difference matters when a team must decide under uncertainty rather than merely observe a threshold breach.",
      "Current industry limitation: many AI-for-operations experiences summarize alerts or generate incident prose before they can prove evidence, topology fit, transaction impact, contradiction handling, or human review boundaries.",
      "Proposed model: signals become transaction context, topology narrows blast radius, evidence separates facts from claims, reasoning compares hypotheses, memory preserves replay seeds, evaluation gates trust, decisions remain reviewable, learning updates future behavior, and operators retain control.",
      "Architecture implication: an enterprise system needs typed evidence, provenance, relationship context, replay records, evaluation fixtures, and explicit approval boundaries before AI recommendations can be trusted in operational workflows.",
      "What this does not claim: Operational Intelligence does not eliminate dashboards, replace SRE judgment, or prove causality from sequence alone. It makes the decision path more inspectable and harder to fake."
    ]
  },
  {
    slug: "agentic-incident-investigation",
    title: "Agentic Incident Investigation Without Losing Control",
    dek: "How AI agents can accelerate enterprise investigations while keeping evidence, provenance, and accountability intact.",
    theme: "Agentic Systems",
    date: "2026-07-05",
    readingTime: "4 min",
    body: [
      "Incident investigation is a coordination problem disguised as a search problem. Teams need evidence, hypotheses, timelines, service context, ownership, impact, and next actions.",
      "Agents are useful when they can decompose the investigation into explicit steps: collect signals, correlate symptoms, build a timeline, compare recent changes, and produce a confidence-scored explanation.",
      "The non-negotiables are grounding, permission boundaries, repeatability, and human review. An agent that cannot show its work should not be trusted with operational decisions.",
      "The agent should behave more like a disciplined investigator than a confident narrator. It should ask what changed, what is affected, what evidence is missing, and what would falsify the current hypothesis.",
      "The architecture should make every step inspectable. Retrieval, tool use, hypothesis generation, and recommendation should be separated so a human can see where the conclusion came from.",
      "The goal is not to remove operators from incidents. The goal is to remove avoidable confusion from the first thirty minutes.",
      "Executive summary: the Agentic SRE harness model treats the agent as one part of a larger operating system. The harness owns scope, tools, evidence receipts, replay, evaluation, policy, and human review.",
      "Core thesis: useful Agentic SRE is not measured by how autonomous the agent appears. It is measured by whether the system can prove what it used, what it ignored, what it inferred, what remains unknown, and what a human must approve.",
      "Problem statement: incident work combines search, coordination, judgment, and accountability. A model can accelerate parts of that loop, but without the harness it can also compress uncertainty into confident prose.",
      "Architecture implications: separate retrieval, tool execution, evidence capture, hypothesis state, confidence movement, action drafting, and approval. Each step should be inspectable and replayable.",
      "Failure modes: over-broad tool access, hidden context, action without review, stale topology, private memory leakage, and evaluations that test happy paths instead of operational ambiguity.",
      "Public-safe example: in OI-ROOM-001, the assistant can recommend a rollback review packet, but it cannot execute the change; the operator must inspect evidence, risk, reversibility, and ownership first.",
      "What the model does not claim: it does not claim agents should replace incident commanders or that every incident can be automated. It claims the decision loop can be made more evidence-driven and repeatable."
    ]
  },
  {
    slug: "transaction-intelligence-for-complex-enterprises",
    title: "Transaction Intelligence for Complex Enterprises",
    dek: "Moving from isolated telemetry to transaction-aware explanations of customer and business impact.",
    theme: "Transaction Intelligence",
    date: "2026-07-05",
    readingTime: "4 min",
    body: [
      "A transaction is often the closest bridge between technical behavior and business meaning. When systems understand transaction paths, they can explain impact in the language of customers, operations, and revenue.",
      "Transaction Intelligence combines traces, events, metadata, topology, and domain context. It gives AI systems a stronger unit of reasoning than individual logs or metrics.",
      "The goal is not just faster troubleshooting. The goal is a shared operational memory that helps teams improve reliability, customer experience, and process quality.",
      "Most enterprise systems are owned by technical boundaries, but customers experience journeys. Transaction Intelligence restores the journey as the unit of analysis.",
      "A transaction-aware system can separate local noise from business impact. A service warning matters more when it sits on a critical path, repeats across journeys, or aligns with a recent change.",
      "This is where knowledge graphs become practical. They connect transactions, dependencies, owners, known failure modes, and decisions into a form that AI can retrieve and reason over.",
      "Executive summary: Transaction Intelligence is the missing layer because customers experience journeys, while teams often debug service boundaries. The transaction path is where technical evidence starts to carry business meaning.",
      "Core thesis: a transaction-aware system can distinguish a local warning from journey degradation by asking whether the signal sits on a critical path, aligns with a symptom window, affects completion, or changes customer state.",
      "Current limitation: telemetry is often indexed by component, not by the work the customer or business process is trying to complete. That makes AI retrieval noisy and RCA narratives brittle.",
      "Proposed model: reconstruct hops, timestamps, identifier changes, state transitions, latency, failure points, missing evidence, and ownership across the journey before ranking hypotheses.",
      "Operating implication: operators should review the journey before the RCA. A sequence alone is not causality, but it tells the system what evidence must be explained.",
      "Failure modes: treating traces as complete truth, ignoring asynchronous work, losing identity across systems, and inferring business impact without transaction context.",
      "Related framework layers: Signal, Transaction, Topology, Evidence, and Reasoning layers work together to convert observable symptoms into a reviewable explanation."
    ]
  },
  {
    slug: "evaluating-ai-for-operational-work",
    title: "Evaluating AI for Operational Work",
    dek: "A practical evaluation model for enterprise AI assistants that must be useful under uncertainty.",
    theme: "AI Evaluation",
    date: "2026-07-05",
    readingTime: "4 min",
    body: [
      "Operational AI should be evaluated against real work: investigation quality, evidence handling, refusal behavior, escalation judgment, latency, cost, and user trust.",
      "A good evaluation set contains normal questions, ambiguous questions, confidential questions, missing-context questions, and adversarial prompts. The assistant must answer usefully without inventing authority.",
      "The strongest systems pair offline evals with production feedback loops. They capture whether recommendations were used, corrected, ignored, or escalated, then improve the retrieval and reasoning system from that signal.",
      "Operational evals should include failure cases, not only success cases. The assistant must be tested on vague prompts, missing data, stale context, sensitive requests, and pressure to guess.",
      "The best metric is not whether the model sounds smart. It is whether the system improves a decision without hiding uncertainty.",
      "A trustworthy assistant earns scope gradually. It starts by summarizing and retrieving. It earns the right to recommend only after evidence handling, refusal behavior, and escalation judgment are proven.",
      "Executive summary: evaluation for AI-native operations is a control system, not a scorecard. It decides whether an answer, recommendation, or action path is grounded enough to move forward.",
      "Core thesis: evals should test operational behavior: canonical definition accuracy, layer routing, citation presence, source validity, refusal quality, unknown handling, contradiction handling, and related-page navigation.",
      "Current limitation: generic model benchmarks do not tell a platform team whether an incident assistant can handle missing context, confidential prompts, red herrings, or pressure to invent certainty.",
      "Proposed model: pair deterministic fixtures with replay seeds. Each fixture defines expected behavior, evidence requirements, limitations, and the refusal boundary. Model-based grading can be added later, but the deterministic contract should be visible first.",
      "Architecture implications: the eval harness needs access to approved public sources, retrieval output, expected answer shape, confidential-term checks, unsupported-claim checks, and regression history.",
      "Failure modes: opaque aggregate scores, fixtures that only test easy success cases, evals disconnected from real product journeys, and metrics that imply trust without proving behavior.",
      "What this does not claim: an eval gate cannot prove universal correctness. It narrows release risk by making expected behavior explicit and repeatable."
    ]
  },
  {
    slug: "the-operational-intelligence-stack",
    title: "The Operational Intelligence Stack",
    dek: "A reference model for moving from telemetry collection to enterprise explanation and improvement.",
    theme: "Operational Intelligence",
    date: "2026-07-05",
    readingTime: "4 min",
    body: [
      "Operational Intelligence is a stack, not a feature. At the bottom are signals: metrics, logs, traces, events, changes, tickets, documents, and business process data. Above that is context: ownership, topology, transactions, risk, policy, and historical decisions.",
      "The reasoning layer turns context into hypotheses, impact statements, and recommended actions. The control layer decides what can be automated, what needs review, what should be refused, and what must be escalated.",
      "The highest-value layer is learning. Every investigation should improve the next one by adding approved memory, sharpening evaluation scenarios, and clarifying which recommendations actually helped.",
      "The stack should be designed around provenance. Every answer should be able to point back to the approved source, signal, rule, or decision record that shaped it.",
      "It should also be designed around boundaries. Some information can be summarized publicly, some can be retrieved only by specific roles, and some should never enter an assistant context.",
      "When the stack is healthy, operations stops being a series of disconnected escalations and becomes a system that learns how the enterprise behaves."
    ]
  },
  {
    slug: "why-dashboards-are-not-intelligence",
    title: "Why Dashboards Are Not Intelligence",
    dek: "Dashboards expose signals. Intelligence explains meaning, impact, confidence, and next action.",
    theme: "Enterprise Observability",
    date: "2026-07-05",
    readingTime: "3 min",
    body: [
      "Dashboards are useful when the human already knows what to look for. They are weaker when the work is ambiguous, cross-system, time-sensitive, or politically complex. Most enterprise incidents fall into that second category.",
      "Operational Intelligence does not replace observability. It makes observability more useful by connecting symptoms to transactions, topology, ownership, history, and business impact.",
      "The question should move from 'which chart is red?' to 'what changed, what is affected, what evidence supports the hypothesis, and what should a responsible human do next?'",
      "Dashboards are still necessary. They are just not sufficient. The next interface should preserve the raw signal while adding narrative discipline and decision context.",
      "This is why observability and AI should be designed together. The AI layer cannot reason well if the telemetry layer lacks correlation, ownership, topology, and historical memory."
    ]
  },
  {
    slug: "incident-investigation-as-a-product-experience",
    title: "Incident Investigation as a Product Experience",
    dek: "What changes when incident investigation is designed as a guided product, not a frantic search session.",
    theme: "AI-native Incident Investigation",
    date: "2026-07-05",
    readingTime: "4 min",
    body: [
      "Most incident workflows are stitched together during the incident. People jump between tools, chats, dashboards, tickets, and memory. That makes the investigation dependent on who happens to be present.",
      "A product-quality investigation experience should guide the team through evidence collection, timeline construction, hypothesis ranking, confidence calibration, mitigation review, and post-incident learning.",
      "AI is valuable when it reduces coordination cost while preserving judgment. The interface should make evidence visible, uncertainty explicit, and decisions reusable.",
      "The product experience should feel like a guided investigation room. Evidence, timeline, hypotheses, impact, and recommended actions should be visible at the same time.",
      "A good incident product avoids premature certainty. It lets the team compare explanations, mark what is unproven, and see which decision would be safest to review.",
      "The final output should not be just an RCA paragraph. It should be a reusable record that improves future retrieval, future evals, and future team alignment."
    ]
  },
  {
    slug: "knowledge-graphs-as-operational-memory",
    title: "Knowledge Graphs as Operational Memory",
    dek: "Why enterprise AI needs relationships, not just documents, to reason about operations.",
    theme: "Knowledge Graphs",
    date: "2026-07-05",
    readingTime: "3 min",
    body: [
      "Retrieval over documents can answer many questions, but operational work depends on relationships. Services depend on other services, transactions cross boundaries, owners change, and incidents repeat through similar dependency paths.",
      "A knowledge graph gives operational AI a structure for blast radius, ownership, transaction journeys, known failure modes, and decision history. It helps the system reason about why a signal matters.",
      "The graph should stay public-safe or permission-aware. It should preserve provenance, avoid unapproved secrets, and make relationship freshness visible.",
      "The practical test of a graph is whether it improves a decision. If it cannot explain impact, ownership, dependency risk, or known patterns, it is structure without operational value.",
      "The best operational memory combines documents and relationships. Documents explain meaning. Graphs explain how things are connected."
    ]
  },
  {
    slug: "ai-evaluation-is-operational-risk-management",
    title: "AI Evaluation Is Operational Risk Management",
    dek: "For enterprise operations, evals are not a lab exercise; they are how risk is controlled.",
    theme: "AI Evaluation",
    date: "2026-07-05",
    readingTime: "3 min",
    body: [
      "A generic model score does not tell an enterprise whether an assistant can handle a noisy incident, a confidential prompt, missing context, or pressure to overstate certainty.",
      "Operational evals should include realistic scenarios, expected evidence behavior, refusal tests, escalation rules, retrieval checks, and human usefulness ratings. They should test how the system behaves when the right answer is 'I do not know.'",
      "The best evaluation system becomes a feedback loop. Production corrections, ignored recommendations, accepted mitigations, and post-incident reviews all become signals for improving the assistant.",
      "Risk management also means knowing what the assistant should refuse. A system that answers everything is not enterprise-ready; it is uncontrolled.",
      "The eval suite should become a release gate. If groundedness, refusal, citation quality, or escalation judgment regresses, the assistant should not ship."
    ]
  },
  {
    slug: "agentic-systems-need-operating-models",
    title: "Agentic Systems Need Operating Models",
    dek: "The hard part of enterprise agents is not autonomy; it is boundaries, ownership, and review.",
    theme: "Agentic Systems",
    date: "2026-07-05",
    readingTime: "3 min",
    body: [
      "An enterprise agent without an operating model becomes a clever interface to unclear authority. Before automation, teams need to define task scope, tool permissions, data boundaries, evidence requirements, and human approval points.",
      "The useful pattern is bounded agency. Agents collect, correlate, summarize, compare, and draft. Humans approve actions that change systems, affect customers, or carry compliance risk.",
      "The operating model should be inspectable. Every agent handoff should preserve task state, evidence, assumptions, and decisions so the next person or agent does not restart from zero.",
      "Autonomy should be introduced by task class. Summarization, retrieval, and comparison are lower risk. System-changing actions require stronger controls, approvals, and rollback plans.",
      "The lesson is simple: agentic systems need an operating model before they need more tools.",
      "Executive summary: the Operational Intelligence Framework is that operating model. It turns enterprise AI from an answer generator into a controlled reasoning system with evidence, memory, evaluation, decision boundaries, and human accountability.",
      "Core thesis: the ten layers are not decorative taxonomy. They are the minimum sequence needed to move from telemetry to a decision a human can inspect and challenge.",
      "Problem statement: without a shared operating model, teams debate outputs instead of evidence. The system needs to show where a conclusion came from, which alternatives lost, and what remains unresolved.",
      "Proposed model: Signal, Transaction, Topology, Evidence, Reasoning, Memory, Evaluation, Decision, Learning, and Operator layers form one loop. Each layer exists because a specific operational failure happens when it is skipped.",
      "Public-safe example: OI-ROOM-001 begins as transaction degradation, becomes an evidence graph, moves hypotheses through confidence changes, creates a replay seed, passes evaluation gates, and ends at an operator approval boundary.",
      "Tradeoff: the model adds structure and friction. That is intentional when the alternative is fast but unsupported operational certainty.",
      "Revision date: 2026-07-16."
    ]
  }
];

export type Project = {
  slug: string;
  name: string;
  summary: string;
  status: "Concept" | "Prototype" | "Production Pattern";
  capabilities: string[];
  detail: string;
};

export const projects: Project[] = [
  {
    slug: "ai-incident-investigation-simulator",
    name: "Operational Intelligence Operations Room",
    status: "Production Pattern",
    summary: "A public-safe operational workbench for evidence-backed incident reasoning, branch comparison, RCA export, and release-gate evaluation.",
    capabilities: ["timeline reconstruction", "hypothesis ranking", "branch comparison", "exportable RCA packet"],
    detail:
      "A public-safe operations room where visitors run operational scenarios through signals, transaction impact, topology clues, hypotheses, confidence movement, branch comparison, eval gates, and exportable RCA packets without exposing internal logs or confidential architecture."
  },
  {
    slug: "operational-intelligence-copilot",
    name: "Operational Intelligence Copilot",
    status: "Production Pattern",
    summary: "A public-safe reference architecture for AI-assisted operational understanding.",
    capabilities: ["RAG", "evidence timelines", "human review", "confidence scoring"],
    detail:
      "A grounded assistant pattern for operations teams that retrieves approved context, builds incident timelines, explains uncertainty, and turns findings into reviewable next actions."
  },
  {
    slug: "transaction-graph-explorer",
    name: "Transaction Graph Explorer",
    status: "Prototype",
    summary: "A graph-first way to reason about customer journeys, dependencies, and operational impact.",
    capabilities: ["knowledge graphs", "transaction context", "impact mapping", "semantic search"],
    detail:
      "A prototype model for connecting transactions, systems, owners, outcomes, and known failure modes into a navigable operational graph."
  },
  {
    slug: "ai-evaluation-workbench",
    name: "AI Evaluation Workbench",
    status: "Concept",
    summary: "Evaluation harness for AI assistants used in enterprise operational workflows.",
    capabilities: ["golden datasets", "refusal tests", "retrieval quality", "feedback loops"],
    detail:
      "A structured evaluation approach that tests groundedness, safety, usefulness, and escalation quality before an assistant is trusted in production workflows."
  }
];

export const products = [
  {
    slug: "reasonops",
    name: "ReasonOps",
    tagline: "The runtime contract for AI-native operations.",
    summary:
      "ReasonOps turns observability context, agent workflows, operational memory, and policy gates into inspectable reasoning that humans can trust under pressure.",
    relationship:
      "Operational Intelligence is the category. ReasonOps is the platform expression: observe, correlate, reason, evaluate, act, and learn with receipts.",
    whatItIs: [
      "A public-safe platform surface for evidence-grounded enterprise operations.",
      "A reasoning and evaluation layer above observability, topology, transactions, memory, and agents.",
      "A runtime contract for AI-native incident investigation, operational memory, and governed recommendations."
    ],
    whyItMatters: [
      "Enterprises already have signals, but they often lack shared reasoning.",
      "AI agents need operational context, boundaries, observability, and evaluation before they should recommend action.",
      "Operators need systems that expose evidence, uncertainty, and review gates instead of adding another opaque assistant."
    ],
    capabilities: [
      "Evidence-driven RCA",
      "Transaction journey reconstruction",
      "Operational memory",
      "Enterprise knowledge graph",
      "Agentic investigation workflows",
      "Evaluation and replay",
      "Human-in-the-loop decision review",
      "Public-safe knowledge grounding"
    ],
    architecture: [
      "Approved context sources feed a retrieval and graph layer.",
      "Telemetry, transactions, topology, and memory are normalized into operational evidence.",
      "Agentic workflows generate timelines, hypotheses, confidence, and next-action drafts.",
      "Evaluation and replay test groundedness, refusal behavior, usefulness, and escalation judgment.",
      "Human review gates protect irreversible or high-impact actions."
    ],
    useCases: [
      "AI-native incident investigation",
      "Executive operational briefings",
      "Transaction impact explanation",
      "Post-incident learning and memory",
      "Agent observability and runtime governance",
      "Operational readiness for enterprise AI"
    ],
    principles: [
      "Evidence before conclusions",
      "Evaluation before trust",
      "Transaction journeys over isolated service views",
      "Human judgment remains part of the system",
      "Shared context over isolated agents"
    ],
    not: [
      "Not a private employer platform.",
      "Not an autonomous production-change system.",
      "Not a generic resume wrapper.",
      "Not a dashboard replacement for every workflow.",
      "Not a claim that AI should remove human accountability."
    ],
    roadmap: [
      "Multi-scenario incident simulator",
      "Operational Intelligence glossary",
      "Live eval report for Ask Ravikanth",
      "Public reference architecture diagrams",
      "Knowledge graph explorer prototype",
      "Newsletter-driven operating notes"
    ]
  }
];

export const architectureCards = [
  {
    title: "Investigation Simulator",
    pattern: "Scenario -> evidence board -> timeline -> hypotheses -> RCA draft -> eval rubric",
    tags: ["incident intelligence", "evals", "product artifact"]
  },
  {
    title: "Grounded Ask Layer",
    pattern: "Question -> retrieval -> evidence filter -> operator-grade answer -> refusal check",
    tags: ["RAG", "pgvector", "guardrails"]
  },
  {
    title: "Incident Reasoning Loop",
    pattern: "Symptoms -> timeline -> dependency graph -> hypotheses -> evidence-ranked summary",
    tags: ["agents", "observability", "investigation"]
  },
  {
    title: "Transaction Knowledge Graph",
    pattern: "Transactions -> services -> owners -> outcomes -> known failure modes",
    tags: ["graphs", "impact", "context"]
  },
  {
    title: "AI Evaluation Spine",
    pattern: "Scenarios -> expected behavior -> judge rubric -> user feedback -> regression suite",
    tags: ["evals", "quality", "trust"]
  },
  {
    title: "Public Trust Layer",
    pattern: "Approved sources -> refusal checks -> citation quality -> known limits -> changelog",
    tags: ["trust", "compliance", "public-safe"]
  }
];

export const evalReport = evalReportData;

export const thesisRadar = {
  title: "Operational Intelligence Thesis Radar",
  updatedAt: "2026-07-05",
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
          label: "TechRadar: AI observability and production readiness",
          url: "https://www.techradar.com/pro/how-ai-observability-helps-organizations-move-from-experimentation-to-production"
        },
        {
          label: "AI Observability for LLM Systems, 2026",
          url: "https://arxiv.org/abs/2604.26152"
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
          label: "AgentOps automation pipeline, 2025",
          url: "https://arxiv.org/abs/2507.11277"
        },
        {
          label: "AgentSight: system-level observability for AI agents",
          url: "https://arxiv.org/abs/2508.02736"
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
          label: "Multi-dataset benchmark for LLM agents in microservice failure diagnosis, 2026",
          url: "https://arxiv.org/abs/2606.29193"
        },
        {
          label: "Agentic NetOps and AIOps: architecture, evaluation, safety, 2026",
          url: "https://arxiv.org/abs/2605.12729"
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
          url: "https://opentelemetry.io/docs/specs/semconv/gen-ai/"
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
          label: "TechRadar: observability built for humans vs AI agents",
          url: "https://www.techradar.com/pro/observability-was-built-for-humans-ai-agents-need-something-different"
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
          label: "TechRadar: AI race is operational",
          url: "https://www.techradar.com/pro/ai-is-starting-to-look-a-lot-like-the-early-days-of-cloud-and-the-real-race-is-operational"
        },
        {
          label: "TechRadar: enterprise operations in the age of invisible AI",
          url: "https://www.techradar.com/pro/how-to-future-proof-enterprise-operations-in-the-age-of-invisible-ai"
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
          label: "TechRadar: summarization is not reasoning in AIOps",
          url: "https://www.techradar.com/pro/summarization-is-not-reasoning-how-hybrid-ai-fixes-failing-aiops"
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
          label: "TechRadar: AI-led defense overseen by humans",
          url: "https://www.techradar.com/pro/security/an-ai-led-defense-strategy-thats-overseen-by-humans-google-is-introducing-more-agents-to-its-full-ai-stack-to-allow-ai-security-at-infinite-scale"
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
    "A public trust report that exposes how Ask Ravikanth should behave, refuse, cite, and admit uncertainty.",
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
    "Add continuous eval reports that test Ask Ravikanth against live retrieval and model responses when production keys are configured.",
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

export const principles: Principle[] = [
  {
    slug: "evidence-before-conclusions",
    statement: "Evidence before conclusions.",
    explanation: "AI systems used in operations should separate observed facts from inferred explanations.",
    example: "An incident assistant should show the signals, timeline, and assumptions behind a proposed root cause.",
    whyItMatters: "Operational decisions under pressure need traceable reasoning, not confident narrative.",
    prevents: "Unsupported RCA, premature escalation, and AI answers that sound plausible but cannot be audited.",
    tags: ["Operational Intelligence", "AI Evaluation", "Incident Intelligence"],
    related: ["/wiki/evidence-before-conclusions", "/patterns/evidence-driven-rca"]
  },
  {
    slug: "operational-memory-accumulates",
    statement: "Operational memory should accumulate, not disappear.",
    explanation: "Every investigation, decision, mitigation, and known failure mode should improve future reasoning.",
    example: "A repeated transaction failure should be compared against prior incidents and known dependency changes.",
    whyItMatters: "Enterprises lose leverage when each incident starts from zero.",
    prevents: "Repeated rediscovery, stale tribal knowledge, and disconnected post-incident learning.",
    tags: ["Operational Intelligence", "Knowledge Graphs"],
    related: ["/wiki/operational-memory", "/patterns/operational-memory"]
  },
  {
    slug: "deterministic-workflows",
    statement: "Deterministic workflows matter where reliability matters.",
    explanation: "Agents can reason, but critical operational work still needs repeatable steps and reviewable outputs.",
    example: "Evidence collection, timeline generation, and escalation checks should run as explicit workflow stages.",
    whyItMatters: "Production ambiguity needs bounded workflows that humans can inspect and replay.",
    prevents: "Tool overreach, hidden agent behavior, and inconsistent incident handling.",
    tags: ["Agentic Systems", "Enterprise AI"],
    related: ["/patterns/agentic-incident-investigation"]
  },
  {
    slug: "shared-context",
    statement: "Shared context beats isolated agent context.",
    explanation: "Enterprise agents need a common view of topology, ownership, transactions, and approved knowledge.",
    example: "A handoff between agents should preserve evidence and decisions rather than restarting the conversation.",
    whyItMatters: "Multi-agent systems fail when each agent builds a private version of reality.",
    prevents: "Context drift, duplicated work, fragmented evidence, and poor handoffs.",
    tags: ["Agentic Systems", "Knowledge Graphs"],
    related: ["/wiki/shared-context-for-enterprise-agents", "/patterns/shared-context-for-enterprise-agents"]
  },
  {
    slug: "explain-used-and-ignored",
    statement: "AI should explain what it used, what it ignored, and why.",
    explanation: "Trust grows when a system exposes evidence, exclusions, and confidence instead of only an answer.",
    example: "An RCA summary should list cited sources and call out missing telemetry or unverified assumptions.",
    whyItMatters: "Operators need to understand the reasoning boundary before trusting a recommendation.",
    prevents: "Opaque recommendations, over-weighted noise, and hidden missing context.",
    tags: ["AI Evaluation", "Incident Intelligence"],
    related: ["/wiki/evidence-before-conclusions"]
  },
  {
    slug: "evaluation-control-system",
    statement: "Evaluation is not a feature; it is the control system.",
    explanation: "Operational AI must be continuously tested against ambiguity, refusal behavior, and usefulness.",
    example: "Replay difficult incidents to test whether an assistant stays grounded and escalates appropriately.",
    whyItMatters: "AI behavior changes as prompts, sources, models, and workflows evolve.",
    prevents: "Silent regressions, benchmark theater, and untested production trust.",
    tags: ["AI Evaluation"],
    related: ["/wiki/evaluation-and-replay", "/patterns/evaluation-and-replay"]
  },
  {
    slug: "clarity-not-dashboards",
    statement: "Operators need clarity, not more dashboards.",
    explanation: "The value is not another visual surface; it is explanation, prioritization, and decision support.",
    example: "A useful system explains customer impact and likely next actions instead of adding another chart.",
    whyItMatters: "Operational overload is often a meaning problem, not a screen-count problem.",
    prevents: "Dashboard sprawl, alert fatigue, and disconnected technical views.",
    tags: ["Operational Intelligence", "Enterprise AI"],
    related: ["/ideas/operational-intelligence-is-the-new-control-plane"]
  },
  {
    slug: "transaction-journeys",
    statement: "Transaction journeys matter more than isolated service views.",
    explanation: "Transactions connect technical behavior to customer and business outcomes.",
    example: "A checkout failure is better understood as a journey across dependencies than as one service metric.",
    whyItMatters: "Business impact usually crosses service and ownership boundaries.",
    prevents: "Local optimization, false blast-radius claims, and technical summaries without outcome context.",
    tags: ["Transaction Intelligence", "Topology Intelligence"],
    related: ["/wiki/transaction-journeys", "/patterns/transaction-journey-reconstruction"]
  },
  {
    slug: "boundaries-not-just-intelligence",
    statement: "Trustworthy agents need boundaries, not just intelligence.",
    explanation: "Good agent systems define what can be retrieved, changed, recommended, and escalated.",
    example: "An investigation agent can draft actions, but production changes require human approval.",
    whyItMatters: "Enterprise trust depends on explicit authority, not model capability alone.",
    prevents: "Autonomous changes without approval, permission drift, and unclear accountability.",
    tags: ["Agentic Systems", "Enterprise AI"],
    related: ["/patterns/agentic-incident-investigation"]
  },
  {
    slug: "human-decision-loop",
    statement: "The best AI systems improve the human decision loop.",
    explanation: "The goal is better judgment, faster alignment, and more durable learning.",
    example: "A post-incident review should become reusable memory that helps the next team decide faster.",
    whyItMatters: "The durable win is not replacing operators; it is helping them decide faster with better evidence.",
    prevents: "Automation theater, brittle autonomy, and systems that bypass the people accountable for outcomes.",
    tags: ["Operational Intelligence", "AI Evaluation"],
    related: ["/wiki/operational-memory", "/wiki/evaluation-and-replay"]
  }
];

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

export const patterns: Pattern[] = [
  {
    slug: "evidence-driven-rca",
    title: "Evidence-Driven RCA",
    description: "Root cause analysis that keeps facts, hypotheses, and uncertainty separate.",
    tags: ["Incident Intelligence", "AI Evaluation", "Operational Intelligence"],
    problem: "Teams need faster explanations without accepting unsupported conclusions.",
    context: "Incidents often contain noisy signals, incomplete context, and pressure to act before the system is fully understood.",
    forces: ["Speed versus correctness", "Incomplete evidence", "Human accountability", "Auditability"],
    solution: "Force every RCA through an evidence ledger, timeline, hypothesis comparison, confidence statement, and human review path.",
    architecture: "Collect signals, build a timeline, classify facts versus hypotheses, cite sources, score confidence, and route the final explanation through human review.",
    architectureSketch: ["Evidence intake", "Timeline builder", "Hypothesis ranker", "Confidence and missing-context check", "Human-reviewed RCA"],
    failureModes: ["Confident unsupported RCA", "Missing source provenance", "Overweighting recent signals", "Ignoring contradictory evidence"],
    evaluation: "Replay past scenarios and grade evidence coverage, refusal quality, confidence calibration, and usefulness of next actions.",
    whenToUse: "Use when operational decisions require a reviewable explanation under uncertainty.",
    whenNotToUse: "Do not use as an autonomous authority for irreversible production actions.",
    relatedPrinciples: ["Evidence before conclusions", "AI should explain what it used, what it ignored, and why"],
    relatedWiki: ["/wiki/evidence-before-conclusions"],
    related: ["/wiki/evidence-before-conclusions", "/principles#evidence-before-conclusions"]
  },
  {
    slug: "transaction-journey-reconstruction",
    title: "Transaction Journey Reconstruction",
    description: "Rebuild the customer or business journey across systems to explain impact.",
    tags: ["Transaction Intelligence", "Topology Intelligence"],
    problem: "Isolated service views fail to explain what happened to the full transaction.",
    context: "Enterprise operations often need to connect traces, events, ownership, dependencies, and business outcomes.",
    forces: ["Cross-service complexity", "Partial telemetry", "Business impact mapping", "Time alignment"],
    solution: "Use the transaction journey as the unit of reasoning and connect technical events to customer or process impact.",
    architecture: "Join transaction identifiers, spans, topology, domain events, and ownership metadata into a journey timeline.",
    architectureSketch: ["Transaction identity", "Trace and event alignment", "Topology overlay", "Impact mapping", "Journey summary"],
    failureModes: ["Broken correlation IDs", "Overly technical summaries", "Missing business context", "False dependency assumptions"],
    evaluation: "Compare reconstructed journeys against known incidents and validate whether impact statements match observed outcomes.",
    whenToUse: "Use for workflows where customer or process impact crosses multiple systems.",
    whenNotToUse: "Do not use when there is no reliable transaction or event correlation.",
    relatedPrinciples: ["Transaction journeys matter more than isolated service views", "Operators need clarity, not more dashboards"],
    relatedWiki: ["/wiki/transaction-journeys"],
    related: ["/wiki/transaction-journeys"]
  },
  {
    slug: "agentic-incident-investigation",
    title: "Agentic Incident Investigation",
    description: "Bounded agents that decompose investigations into inspectable steps.",
    tags: ["Agentic Systems", "Incident Intelligence"],
    problem: "Human teams lose time coordinating evidence collection and hypothesis testing.",
    context: "Agents can assist, but operational work requires boundaries, repeatability, and escalation rules.",
    forces: ["Autonomy versus control", "Tool permissions", "Evidence quality", "Human trust"],
    solution: "Decompose investigation work into bounded agent tasks with explicit evidence, permissions, and escalation contracts.",
    architecture: "Use agents for scoped tasks: collect signals, summarize changes, map dependencies, compare history, draft hypotheses, and prepare human-reviewed actions.",
    architectureSketch: ["Scoped task", "Approved tools", "Evidence record", "Draft hypothesis", "Reviewable recommendation"],
    failureModes: ["Tool overreach", "Hidden reasoning", "Permission drift", "No escalation path"],
    evaluation: "Test against ambiguous incidents, confidential prompts, missing context, and adversarial instructions.",
    whenToUse: "Use when investigation work can be broken into bounded, auditable tasks.",
    whenNotToUse: "Do not use when the agent cannot show evidence or respect permission boundaries.",
    relatedPrinciples: ["Trustworthy agents need boundaries, not just intelligence", "Deterministic workflows matter where reliability matters"],
    relatedWiki: ["/wiki/shared-context-for-enterprise-agents"],
    related: ["/ideas/agentic-incident-investigation", "/wiki/shared-context-for-enterprise-agents"]
  },
  {
    slug: "operational-memory",
    title: "Operational Memory",
    description: "A reusable memory layer for decisions, incidents, mitigations, and known patterns.",
    tags: ["Operational Intelligence", "Knowledge Graphs"],
    problem: "Organizations repeatedly rediscover the same context during operational work.",
    context: "Operational knowledge is scattered across tickets, notes, telemetry, chats, and post-incident reviews.",
    forces: ["Freshness", "Provenance", "Privacy", "Retrieval quality"],
    solution: "Convert approved operational facts, decisions, mitigations, and known patterns into governed retrievable memory.",
    architecture: "Store approved operational facts, decisions, relationships, and patterns as retrievable documents and graph entities.",
    architectureSketch: ["Approved sources", "Memory records", "Graph relationships", "Freshness review", "Retrieval layer"],
    failureModes: ["Stale memory", "Unapproved sensitive content", "Poor source attribution", "No ownership model"],
    evaluation: "Measure whether memory improves answer quality without leaking confidential or unapproved details.",
    whenToUse: "Use when repeated operational workflows benefit from accumulated context.",
    whenNotToUse: "Do not use as an unfiltered store of internal logs or private implementation details.",
    relatedPrinciples: ["Operational memory should accumulate, not disappear", "Shared context beats isolated agent context"],
    relatedWiki: ["/wiki/operational-memory"],
    related: ["/wiki/operational-memory"]
  },
  {
    slug: "evaluation-and-replay",
    title: "Evaluation and Replay",
    description: "A regression system for operational AI behavior.",
    tags: ["AI Evaluation", "Enterprise AI"],
    problem: "AI assistants can degrade silently if their behavior is not continuously tested.",
    context: "Operational scenarios include ambiguity, missing data, sensitive topics, and pressure to act.",
    forces: ["Realism", "Cost", "Coverage", "Safety"],
    solution: "Treat evals as a release gate and replay operational scenarios against expected behavior before trusting the assistant.",
    architecture: "Maintain scenario sets, expected behavior rubrics, retrieval checks, refusal tests, and production feedback loops.",
    architectureSketch: ["Scenario fixture", "Expected behavior", "Retrieval check", "Refusal check", "Regression report"],
    failureModes: ["Benchmark theater", "No refusal tests", "No source checks", "Unmeasured user trust"],
    evaluation: "Grade groundedness, citation quality, useful uncertainty, escalation judgment, and task completion.",
    whenToUse: "Use before and after deploying AI into operational workflows.",
    whenNotToUse: "Do not rely on generic model benchmarks as a substitute for domain-specific replay.",
    relatedPrinciples: ["Evaluation is not a feature; it is the control system", "The best AI systems improve the human decision loop"],
    relatedWiki: ["/wiki/evaluation-and-replay"],
    related: ["/wiki/evaluation-and-replay"]
  },
  {
    slug: "topology-aware-reasoning",
    title: "Topology-Aware Reasoning",
    description: "AI reasoning that understands dependencies, ownership, and blast radius.",
    tags: ["Topology Intelligence", "Knowledge Graphs"],
    problem: "AI answers miss operational reality when they cannot see dependency structure.",
    context: "Enterprise systems are interconnected, and failures move through topology in non-obvious ways.",
    forces: ["Topology freshness", "Ownership accuracy", "Dependency ambiguity", "Impact scope"],
    solution: "Make topology a reasoning input so AI can assess dependency paths, ownership, and blast radius with caveats.",
    architecture: "Connect services, transactions, owners, dependencies, and historical failure modes into a reasoning graph.",
    architectureSketch: ["Service graph", "Ownership metadata", "Transaction paths", "Known failure modes", "Blast-radius explanation"],
    failureModes: ["Stale topology", "False ownership", "Overbroad blast-radius claims", "No transaction link"],
    evaluation: "Validate recommendations against known dependency paths and incident timelines.",
    whenToUse: "Use when impact analysis depends on relationships between systems.",
    whenNotToUse: "Do not use when topology quality is too poor to support confident reasoning.",
    relatedPrinciples: ["Transaction journeys matter more than isolated service views", "AI should explain what it used, what it ignored, and why"],
    relatedWiki: ["/wiki/transaction-journeys"],
    related: ["/wiki/transaction-journeys"]
  },
  {
    slug: "shared-context-for-enterprise-agents",
    title: "Shared Context for Enterprise Agents",
    description: "A common context layer for multi-agent orchestration.",
    tags: ["Agentic Systems", "Knowledge Graphs", "Enterprise AI"],
    problem: "Agents working from isolated context produce fragmented and inconsistent results.",
    context: "Enterprise workflows often involve multiple specialists, systems, permissions, and handoffs.",
    forces: ["Coordination", "State management", "Access boundaries", "Audit trail"],
    solution: "Give agents and humans a shared state model for task context, evidence, decisions, and handoffs.",
    architecture: "Give agents shared approved context, task state, evidence records, and handoff contracts.",
    architectureSketch: ["Shared context store", "Task state", "Evidence records", "Handoff contract", "Audit trail"],
    failureModes: ["Context drift", "Duplicate work", "Unclear ownership", "No inspectable handoff"],
    evaluation: "Measure handoff quality, consistency across agents, and whether evidence survives task transitions.",
    whenToUse: "Use when multiple agents collaborate on operational workflows.",
    whenNotToUse: "Do not use when a simple deterministic workflow is sufficient.",
    relatedPrinciples: ["Shared context beats isolated agent context", "Operational memory should accumulate, not disappear"],
    relatedWiki: ["/wiki/shared-context-for-enterprise-agents"],
    related: ["/wiki/shared-context-for-enterprise-agents"]
  },
  {
    slug: "human-in-the-loop-operational-ai",
    title: "Human-in-the-Loop Operational AI",
    description: "A control pattern for keeping humans accountable for high-impact operational decisions.",
    tags: ["Enterprise AI", "Governance", "Incident Intelligence"],
    problem: "AI systems can recommend actions faster than organizations can safely approve them.",
    context: "Operational workflows often include changes, escalations, customer impact, compliance concerns, and incomplete evidence.",
    forces: ["Speed versus accountability", "Automation versus review", "Risk tiering", "Escalation clarity"],
    solution: "Classify actions by risk, automate low-risk assistance, and require human approval for high-impact or irreversible steps.",
    architecture: "Use risk tiers, approval gates, decision records, and post-action validation around AI-generated recommendations.",
    architectureSketch: ["Recommendation", "Risk classification", "Approval gate", "Decision record", "Post-action validation"],
    failureModes: ["Blind automation", "Unclear approver", "No rollback plan", "No record of why action was taken"],
    evaluation: "Replay scenarios and verify that the assistant escalates correctly, preserves evidence, and refuses unsafe autonomy.",
    whenToUse: "Use when AI recommendations can affect customer experience, production systems, security, or compliance posture.",
    whenNotToUse: "Do not use as theater where humans rubber-stamp decisions without evidence or authority.",
    relatedPrinciples: ["Human judgment remains part of the system", "Trustworthy agents need boundaries, not just intelligence"],
    relatedWiki: ["/wiki/evaluation-and-replay", "/wiki/evidence-before-conclusions"],
    related: ["/principles#human-decision-loop", "/patterns/evaluation-and-replay"]
  },
  {
    slug: "confidence-calibrated-rca",
    title: "Confidence-Calibrated RCA",
    description: "A pattern for separating plausible explanations from review-ready operational conclusions.",
    tags: ["Incident Intelligence", "AI Evaluation", "Decision Layer"],
    problem: "Incident teams need explanations, but unsupported certainty can create unsafe action.",
    context: "Operational evidence is often incomplete, conflicting, delayed, or unevenly instrumented across systems.",
    forces: ["Action pressure", "Partial evidence", "False precision", "Escalation risk"],
    solution: "Attach confidence to hypotheses, name missing evidence, show contradictory signals, and gate high-impact action behind human review.",
    architecture: "Combine evidence coverage, timeline fit, topology fit, change correlation, and contradiction checks into a confidence score that remains inspectable.",
    architectureSketch: ["Evidence coverage", "Timeline fit", "Topology fit", "Contradiction check", "Review threshold"],
    failureModes: ["Overconfident RCA", "No missing-context statement", "Hidden assumptions", "Confidence treated as authority"],
    evaluation: "Replay known scenarios and grade whether confidence rises and falls with evidence instead of narrative polish.",
    whenToUse: "Use when the system must recommend a next step under uncertainty.",
    whenNotToUse: "Do not use as a mathematical guarantee of root cause.",
    relatedPrinciples: ["Confidence before action", "Explain what was used, ignored, and why"],
    relatedWiki: ["/wiki/evaluation-and-replay", "/wiki/evidence-before-conclusions"],
    related: ["/investigation-room", "/patterns/evidence-driven-rca"]
  },
  {
    slug: "change-impact-reasoning",
    title: "Change Impact Reasoning",
    description: "A pattern for connecting changes to transaction impact without mistaking correlation for cause.",
    tags: ["Transaction Intelligence", "Topology Intelligence", "Reasoning Layer"],
    problem: "Recent changes are easy to blame, but enterprise systems need evidence that the change explains the affected journey.",
    context: "Deployments, configuration updates, dependency changes, policy shifts, and topology movement often overlap with symptoms.",
    forces: ["Temporal correlation", "Dependency ambiguity", "Rollback risk", "Business impact"],
    solution: "Compare change timing, affected topology, transaction path, symptom shape, and recovery evidence before recommending a rollback review.",
    architecture: "Join change records, transaction journeys, topology, ownership, incident timeline, and known failure modes into a reviewable impact analysis.",
    architectureSketch: ["Change event", "Symptom window", "Transaction path", "Topology overlay", "Rollback review packet"],
    failureModes: ["Blaming the nearest change", "Ignoring unaffected paths", "Rollback without owner review", "No validation after mitigation"],
    evaluation: "Replay incidents and verify that the system distinguishes correlation, causality, and review-worthy action.",
    whenToUse: "Use when a change may explain customer or business impact across a dependency path.",
    whenNotToUse: "Do not use when change records are too incomplete to support reviewable reasoning.",
    relatedPrinciples: ["Timeline before root cause", "Transaction journeys matter"],
    relatedWiki: ["/wiki/transaction-journeys"],
    related: ["/patterns/transaction-journey-reconstruction", "/patterns/topology-aware-reasoning"]
  }
];

export const nowPage = {
  currentFocus: [
    "Operational Intelligence as the reasoning layer between observability, AI agents, and human operational decisions.",
    "Agentic SRE systems that investigate with evidence, expose uncertainty, and keep irreversible action behind review.",
    "Transaction Intelligence as the bridge between telemetry, customer impact, topology, ownership, and business meaning."
  ],
  building: [
    "ReasonOps as a public-safe operating model for evidence-backed, self-healing enterprise operations.",
    "An Operations Room that turns signal, change, topology, hypotheses, action gates, and eval checks into a reviewable RCA packet.",
    "Ask Ravikanth retrieves approved public context, cites sources, refuses confidential questions, and names missing evidence.",
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
      "seri.ai now exposes a trust report for Ask Ravikanth behavior and turns the incident simulator into a scored investigation workflow with choices, confidence, and exportable RCA summary.",
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
    "Designed governed tool-calling ecosystems that connect observability, IT service workflows, telemetry systems, and enterprise APIs through schema-bound interfaces.",
    "Built end-to-end agent observability patterns using OpenTelemetry-style instrumentation, evaluator scoring, orchestration introspection, telemetry receipts, and drift analysis.",
    "Implemented runtime governance models including fail-closed execution, freshness validation, tool budget enforcement, policy-aware safeguards, and approval checkpoints.",
    "Designed telemetry and workload coordination architectures across Kubernetes, cloud platforms, and hybrid enterprise infrastructure."
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
  experience: [
    {
      role: "AIOps Lead Architect",
      organization: "Major regulated financial-services enterprise",
      period: "2025 - Present",
      impact:
        "Leads architecture for production AI-assisted operational workflows that support observability, incident response, retrieval, evaluation, and governed tool use.",
      bullets: [
        "Architected LLM-driven agent platforms for enterprise operations using deterministic orchestration, bounded execution, replayability, and human-in-the-loop governance.",
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
        "Operated and modernized enterprise middleware, identity, and infrastructure platforms in high-availability environments.",
        "Partnered with engineering, security, and operations teams to improve reliability, access patterns, integration quality, and operational support models.",
        "Developed durable expertise in Linux, distributed systems, enterprise integration, cloud migration, automation, and production support."
      ]
    }
  ],
  skills: [
    {
      group: "AI Infrastructure and Runtime Operations",
      items: ["LLM agent platforms", "deterministic orchestration", "governed tool use", "retrieval routing", "runtime governance"]
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
      items: ["Python APIs", "SDK integrations", "workflow orchestration", "infrastructure automation", "enterprise API integration"]
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
    title: "Ask Ravikanth",
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
      title: "Ask Ravikanth",
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
      description: "Reproducible public trust fixtures and limitations for Ask Ravikanth."
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
