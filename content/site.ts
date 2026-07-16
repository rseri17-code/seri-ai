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
    { href: "/start-here", label: "Start Here" },
    { href: "/map", label: "Map" },
    { href: "/library", label: "Library" },
    { href: "/patterns", label: "Patterns" },
    { href: "/products/reasonops", label: "ReasonOps" },
    { href: "/investigation-room", label: "Operations Room" },
    { href: "/radar", label: "Radar" },
    { href: "/ask", label: "Reasoning Interface" },
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

export const operationalIntelligenceSystem = {
  caseId: "OI-ROOM-001",
  caseTitle: "Customer transaction degradation",
  caseSummary:
    "A public-safe investigation scenario where a critical customer journey degrades after a non-secret configuration change. The system must connect signal, transaction, topology, evidence, reasoning, memory, evaluation, decision, learning, and operator context before recommending a human-reviewed action.",
  promise:
    "The same case powers the Map, Operations Room, and Reasoning Interface so visitors experience Operational Intelligence as a system, not a set of pages.",
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
      "The strongest version is not autonomous heroics. It is a better human decision loop: faster alignment, clearer evidence, fewer repeated investigations, and operational memory that compounds over time."
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
      "The goal is not to remove operators from incidents. The goal is to remove avoidable confusion from the first thirty minutes."
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
      "This is where knowledge graphs become practical. They connect transactions, dependencies, owners, known failure modes, and decisions into a form that AI can retrieve and reason over."
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
      "A trustworthy assistant earns scope gradually. It starts by summarizing and retrieving. It earns the right to recommend only after evidence handling, refusal behavior, and escalation judgment are proven."
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
      "The lesson is simple: agentic systems need an operating model before they need more tools."
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
    name: "ReasonOps Operations Room",
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
      "Live eval report for the Reasoning Interface",
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
    "A public trust report that exposes how the Reasoning Interface should behave, refuse, cite, and admit uncertainty.",
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
    "Add continuous eval reports that test the Reasoning Interface against live retrieval and model responses when production keys are configured.",
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
    "Operational Intelligence as a category for AI-native enterprises.",
    "Evidence-driven incident investigation patterns.",
    "Transaction Intelligence as a bridge between telemetry and business impact."
  ],
  building: [
    "A public knowledge base for Operational Intelligence.",
    "Architecture patterns for safe, grounded enterprise agents.",
    "Evaluation and replay workflows for operational AI assistants."
  ],
  studying: [
    "Knowledge graph retrieval for enterprise context.",
    "Multi-agent orchestration boundaries.",
    "How teams trust AI recommendations during high-pressure incidents."
  ],
  writing: [
    "Why dashboards are not intelligence.",
    "How evidence-driven RCA should work.",
    "What transaction journeys reveal that service views miss."
  ],
  avoiding: [
    "Generic AI thought leadership.",
    "Confidential or employer-specific implementation details.",
    "Claims that cannot be grounded in public evidence."
  ],
  questions: [
    "What should operational memory remember, forget, and refuse?",
    "How should AI explain what it ignored?",
    "What makes an agent trustworthy enough for enterprise operations?"
  ]
};

export const startHerePaths = [
  {
    audience: "Executives",
    care: "Operational Intelligence turns AI from experimentation into a way to improve enterprise decision loops.",
    readFirst: ["/manifesto", "/map", "/products/reasonops"],
    ask: "How should executives evaluate AI systems for operational work?",
    matters: ["/radar", "/investigation-room", "/evals"]
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
    readFirst: ["/map", "/patterns", "/wiki/evaluation-and-replay"],
    ask: "How should an evidence-driven incident investigation system be designed?",
    matters: ["/patterns/shared-context-for-enterprise-agents", "/patterns/topology-aware-reasoning"]
  },
  {
    audience: "Engineers",
    care: "The material connects reliability work to practical AI system boundaries, evidence, and evaluation.",
    readFirst: ["/library", "/wiki/evidence-before-conclusions", "/patterns/agentic-incident-investigation"],
    ask: "How should an engineer keep incident agents grounded?",
    matters: ["/wiki/shared-context-for-enterprise-agents", "/patterns/transaction-journey-reconstruction"]
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
      "seri.ai now exposes a trust report for Reasoning Interface behavior and turns the incident simulator into a scored investigation workflow with choices, confidence, and exportable RCA summary.",
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
  ...resume.experience.flatMap((item) => [item.role, item.organization, item.period, item.impact, ...item.bullets]),
  ...resume.skills.flatMap((skill) => [skill.group, ...skill.items]),
  ...resume.education,
  ...resume.certifications
];
