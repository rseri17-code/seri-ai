export const site = {
  name: "seri.ai",
  owner: "Ravi Seri",
  tagline: "Building AI systems that help enterprises understand, explain, and improve their operations.",
  positioning: "The public home of Operational Intelligence thinking.",
  description:
    "Ravi Seri writes and builds around Operational Intelligence, Agentic Systems, Transaction Intelligence, enterprise observability, AI-native incident investigation, knowledge graphs, and AI evaluation.",
  compliance:
    "Public-safe content only. No internal employer product names, proprietary projects, confidential platform names, screenshots, logs, dashboards, or architecture.",
  nav: [
    { href: "/", label: "Home" },
    { href: "/ask", label: "Ask Ravi" },
    { href: "/start-here", label: "Start Here" },
    { href: "/wiki", label: "Wiki" },
    { href: "/principles", label: "Principles" },
    { href: "/patterns", label: "Patterns" },
    { href: "/projects", label: "Projects" },
    { href: "/now", label: "Now" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" }
  ]
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
    readingTime: "6 min",
    body: [
      "Most enterprises already collect enough telemetry to know what happened. The harder question is what it means, who should care, and what action is justified. Operational Intelligence starts where dashboards stop.",
      "The next control plane is not another charting layer. It is a reasoning layer that connects events, business transactions, dependencies, historical decisions, and current goals. It treats operations as a living system instead of a pile of tools.",
      "The useful AI system is grounded, bounded, and explainable. It retrieves approved context, names uncertainty, proposes actions with rationale, and leaves an audit trail that humans can challenge."
    ]
  },
  {
    slug: "agentic-incident-investigation",
    title: "Agentic Incident Investigation Without Losing Control",
    dek: "How AI agents can accelerate enterprise investigations while keeping evidence, provenance, and accountability intact.",
    theme: "Agentic Systems",
    date: "2026-07-05",
    readingTime: "7 min",
    body: [
      "Incident investigation is a coordination problem disguised as a search problem. Teams need evidence, hypotheses, timelines, service context, ownership, impact, and next actions.",
      "Agents are useful when they can decompose the investigation into explicit steps: collect signals, correlate symptoms, build a timeline, compare recent changes, and produce a confidence-scored explanation.",
      "The non-negotiables are grounding, permission boundaries, repeatability, and human review. An agent that cannot show its work should not be trusted with operational decisions."
    ]
  },
  {
    slug: "transaction-intelligence-for-complex-enterprises",
    title: "Transaction Intelligence for Complex Enterprises",
    dek: "Moving from isolated telemetry to transaction-aware explanations of customer and business impact.",
    theme: "Transaction Intelligence",
    date: "2026-07-05",
    readingTime: "5 min",
    body: [
      "A transaction is often the closest bridge between technical behavior and business meaning. When systems understand transaction paths, they can explain impact in the language of customers, operations, and revenue.",
      "Transaction Intelligence combines traces, events, metadata, topology, and domain context. It gives AI systems a stronger unit of reasoning than individual logs or metrics.",
      "The goal is not just faster troubleshooting. The goal is a shared operational memory that helps teams improve reliability, customer experience, and process quality."
    ]
  },
  {
    slug: "evaluating-ai-for-operational-work",
    title: "Evaluating AI for Operational Work",
    dek: "A practical evaluation model for enterprise AI assistants that must be useful under uncertainty.",
    theme: "AI Evaluation",
    date: "2026-07-05",
    readingTime: "8 min",
    body: [
      "Operational AI should be evaluated against real work: investigation quality, evidence handling, refusal behavior, escalation judgment, latency, cost, and user trust.",
      "A good evaluation set contains normal questions, ambiguous questions, confidential questions, missing-context questions, and adversarial prompts. The assistant must answer usefully without inventing authority.",
      "The strongest systems pair offline evals with production feedback loops. They capture whether recommendations were used, corrected, ignored, or escalated, then improve the retrieval and reasoning system from that signal."
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

export const architectureCards = [
  {
    title: "Grounded Ask Layer",
    pattern: "Question -> retrieval -> evidence filter -> Ravi-style answer -> refusal check",
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
  }
];

export type Principle = {
  slug: string;
  statement: string;
  explanation: string;
  example: string;
  tags: string[];
  related: string[];
};

export const principles: Principle[] = [
  {
    slug: "evidence-before-conclusions",
    statement: "Evidence before conclusions.",
    explanation: "AI systems used in operations should separate observed facts from inferred explanations.",
    example: "An incident assistant should show the signals, timeline, and assumptions behind a proposed root cause.",
    tags: ["Operational Intelligence", "AI Evaluation", "Incident Intelligence"],
    related: ["/wiki/evidence-before-conclusions", "/patterns/evidence-driven-rca"]
  },
  {
    slug: "operational-memory-accumulates",
    statement: "Operational memory should accumulate, not disappear.",
    explanation: "Every investigation, decision, mitigation, and known failure mode should improve future reasoning.",
    example: "A repeated transaction failure should be compared against prior incidents and known dependency changes.",
    tags: ["Operational Intelligence", "Knowledge Graphs"],
    related: ["/wiki/operational-memory", "/patterns/operational-memory"]
  },
  {
    slug: "deterministic-workflows",
    statement: "Deterministic workflows matter where reliability matters.",
    explanation: "Agents can reason, but critical operational work still needs repeatable steps and reviewable outputs.",
    example: "Evidence collection, timeline generation, and escalation checks should run as explicit workflow stages.",
    tags: ["Agentic Systems", "Enterprise AI"],
    related: ["/patterns/agentic-incident-investigation"]
  },
  {
    slug: "shared-context",
    statement: "Shared context beats isolated agent context.",
    explanation: "Enterprise agents need a common view of topology, ownership, transactions, and approved knowledge.",
    example: "A handoff between agents should preserve evidence and decisions rather than restarting the conversation.",
    tags: ["Agentic Systems", "Knowledge Graphs"],
    related: ["/wiki/shared-context-for-enterprise-agents", "/patterns/shared-context-for-enterprise-agents"]
  },
  {
    slug: "explain-used-and-ignored",
    statement: "AI should explain what it used, what it ignored, and why.",
    explanation: "Trust grows when a system exposes evidence, exclusions, and confidence instead of only an answer.",
    example: "An RCA summary should list cited sources and call out missing telemetry or unverified assumptions.",
    tags: ["AI Evaluation", "Incident Intelligence"],
    related: ["/wiki/evidence-before-conclusions"]
  },
  {
    slug: "evaluation-control-system",
    statement: "Evaluation is not a feature; it is the control system.",
    explanation: "Operational AI must be continuously tested against ambiguity, refusal behavior, and usefulness.",
    example: "Replay difficult incidents to test whether an assistant stays grounded and escalates appropriately.",
    tags: ["AI Evaluation"],
    related: ["/wiki/evaluation-and-replay", "/patterns/evaluation-and-replay"]
  },
  {
    slug: "clarity-not-dashboards",
    statement: "Operators need clarity, not more dashboards.",
    explanation: "The value is not another visual surface; it is explanation, prioritization, and decision support.",
    example: "A useful system explains customer impact and likely next actions instead of adding another chart.",
    tags: ["Operational Intelligence", "Enterprise AI"],
    related: ["/ideas/operational-intelligence-is-the-new-control-plane"]
  },
  {
    slug: "transaction-journeys",
    statement: "Transaction journeys matter more than isolated service views.",
    explanation: "Transactions connect technical behavior to customer and business outcomes.",
    example: "A checkout failure is better understood as a journey across dependencies than as one service metric.",
    tags: ["Transaction Intelligence", "Topology Intelligence"],
    related: ["/wiki/transaction-journeys", "/patterns/transaction-journey-reconstruction"]
  },
  {
    slug: "boundaries-not-just-intelligence",
    statement: "Trustworthy agents need boundaries, not just intelligence.",
    explanation: "Good agent systems define what can be retrieved, changed, recommended, and escalated.",
    example: "An investigation agent can draft actions, but production changes require human approval.",
    tags: ["Agentic Systems", "Enterprise AI"],
    related: ["/patterns/agentic-incident-investigation"]
  },
  {
    slug: "human-decision-loop",
    statement: "The best AI systems improve the human decision loop.",
    explanation: "The goal is better judgment, faster alignment, and more durable learning.",
    example: "A post-incident review should become reusable memory that helps the next team decide faster.",
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
  architecture: string;
  failureModes: string[];
  evaluation: string;
  whenToUse: string;
  whenNotToUse: string;
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
    architecture: "Collect signals, build a timeline, classify facts versus hypotheses, cite sources, score confidence, and route the final explanation through human review.",
    failureModes: ["Confident unsupported RCA", "Missing source provenance", "Overweighting recent signals", "Ignoring contradictory evidence"],
    evaluation: "Replay past scenarios and grade evidence coverage, refusal quality, confidence calibration, and usefulness of next actions.",
    whenToUse: "Use when operational decisions require a reviewable explanation under uncertainty.",
    whenNotToUse: "Do not use as an autonomous authority for irreversible production actions.",
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
    architecture: "Join transaction identifiers, spans, topology, domain events, and ownership metadata into a journey timeline.",
    failureModes: ["Broken correlation IDs", "Overly technical summaries", "Missing business context", "False dependency assumptions"],
    evaluation: "Compare reconstructed journeys against known incidents and validate whether impact statements match observed outcomes.",
    whenToUse: "Use for workflows where customer or process impact crosses multiple systems.",
    whenNotToUse: "Do not use when there is no reliable transaction or event correlation.",
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
    architecture: "Use agents for scoped tasks: collect signals, summarize changes, map dependencies, compare history, draft hypotheses, and prepare human-reviewed actions.",
    failureModes: ["Tool overreach", "Hidden reasoning", "Permission drift", "No escalation path"],
    evaluation: "Test against ambiguous incidents, confidential prompts, missing context, and adversarial instructions.",
    whenToUse: "Use when investigation work can be broken into bounded, auditable tasks.",
    whenNotToUse: "Do not use when the agent cannot show evidence or respect permission boundaries.",
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
    architecture: "Store approved operational facts, decisions, relationships, and patterns as retrievable documents and graph entities.",
    failureModes: ["Stale memory", "Unapproved sensitive content", "Poor source attribution", "No ownership model"],
    evaluation: "Measure whether memory improves answer quality without leaking confidential or unapproved details.",
    whenToUse: "Use when repeated operational workflows benefit from accumulated context.",
    whenNotToUse: "Do not use as an unfiltered store of internal logs or private implementation details.",
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
    architecture: "Maintain scenario sets, expected behavior rubrics, retrieval checks, refusal tests, and production feedback loops.",
    failureModes: ["Benchmark theater", "No refusal tests", "No source checks", "Unmeasured user trust"],
    evaluation: "Grade groundedness, citation quality, useful uncertainty, escalation judgment, and task completion.",
    whenToUse: "Use before and after deploying AI into operational workflows.",
    whenNotToUse: "Do not rely on generic model benchmarks as a substitute for domain-specific replay.",
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
    architecture: "Connect services, transactions, owners, dependencies, and historical failure modes into a reasoning graph.",
    failureModes: ["Stale topology", "False ownership", "Overbroad blast-radius claims", "No transaction link"],
    evaluation: "Validate recommendations against known dependency paths and incident timelines.",
    whenToUse: "Use when impact analysis depends on relationships between systems.",
    whenNotToUse: "Do not use when topology quality is too poor to support confident reasoning.",
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
    architecture: "Give agents shared approved context, task state, evidence records, and handoff contracts.",
    failureModes: ["Context drift", "Duplicate work", "Unclear ownership", "No inspectable handoff"],
    evaluation: "Measure handoff quality, consistency across agents, and whether evidence survives task transitions.",
    whenToUse: "Use when multiple agents collaborate on operational workflows.",
    whenNotToUse: "Do not use when a simple deterministic workflow is sufficient.",
    related: ["/wiki/shared-context-for-enterprise-agents"]
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
    readFirst: ["/ideas/operational-intelligence-is-the-new-control-plane", "/patterns/evaluation-and-replay"],
    ask: "How should executives evaluate AI systems for operational work?",
    matters: ["/patterns/evidence-driven-rca", "/wiki/evaluation-and-replay"]
  },
  {
    audience: "Recruiters",
    care: "Ravi's public body of work shows category thinking, enterprise architecture depth, and AI product judgment.",
    readFirst: ["/resume", "/principles"],
    ask: "What makes Ravi different from a generic AI or observability leader?",
    matters: ["/projects/operational-intelligence-copilot", "/interview-mode"]
  },
  {
    audience: "Architects",
    care: "The site offers public-safe patterns for agents, retrieval, topology, evaluation, and transaction-aware reasoning.",
    readFirst: ["/patterns", "/wiki/operational-memory"],
    ask: "How would Ravi design an evidence-driven incident investigation system?",
    matters: ["/patterns/shared-context-for-enterprise-agents", "/patterns/topology-aware-reasoning"]
  },
  {
    audience: "Engineers",
    care: "The material connects reliability work to practical AI system boundaries, evidence, and evaluation.",
    readFirst: ["/wiki/evidence-before-conclusions", "/patterns/agentic-incident-investigation"],
    ask: "How should an engineer keep incident agents grounded?",
    matters: ["/wiki/shared-context-for-enterprise-agents", "/patterns/transaction-journey-reconstruction"]
  },
  {
    audience: "Founders",
    care: "Operational Intelligence is a category lens for building durable enterprise AI products.",
    readFirst: ["/now", "/principles"],
    ask: "What product opportunities exist around Operational Intelligence?",
    matters: ["/patterns/operational-memory", "/projects/ai-evaluation-workbench"]
  }
];

export const changelog = [
  {
    version: "v0.2",
    date: "2026-07-05",
    title: "Added public wiki, principles, patterns, and living product layer",
    description:
      "seri.ai now supports approved public notes, Ravi's principles, architecture pattern pages, start-here paths, current focus areas, content search, citations, and content validation.",
    tags: ["wiki", "principles", "patterns", "citations"]
  },
  {
    version: "v0.1",
    date: "2026-07-05",
    title: "Initial Operational Intelligence platform",
    description:
      "Launched the first version of seri.ai with Ask Ravi, ideas, project pages, architecture lab, resume, contact, Supabase schema, and AI provider adapters.",
    tags: ["launch", "ask-ravi", "projects"]
  }
];

export const resume = {
  headline: "AI and enterprise technology leader focused on Operational Intelligence and agentic systems.",
  strengths: [
    "AI-native operational workflows",
    "Enterprise observability strategy",
    "Transaction intelligence and impact modeling",
    "Knowledge graph and retrieval architecture",
    "AI evaluation, governance, and adoption"
  ],
  experience: [
    {
      role: "Enterprise AI and Observability Leader",
      organization: "Large enterprise technology environments",
      impact:
        "Led strategy and execution for AI-enabled operational platforms, incident investigation workflows, and enterprise-scale reliability practices using public-safe, vendor-neutral patterns."
    },
    {
      role: "Architecture and Transformation Partner",
      organization: "Cross-functional product, engineering, and operations teams",
      impact:
        "Connected business outcomes, operational telemetry, and engineering execution through reusable architecture patterns and measurable adoption programs."
    }
  ],
  certifications: ["Cloud architecture", "AI and data platforms", "Enterprise observability", "Agile delivery"]
};

export const approvedKnowledge = [
  site.description,
  site.tagline,
  ...articles.flatMap((article) => [article.title, article.dek, ...article.body]),
  ...projects.flatMap((project) => [project.name, project.summary, project.detail, ...project.capabilities]),
  resume.headline,
  ...resume.strengths,
  ...resume.experience.map((item) => `${item.role}: ${item.impact}`),
  ...resume.certifications
];
