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
    { href: "/ideas", label: "Ideas" },
    { href: "/architecture-lab", label: "Architecture Lab" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Interactive Resume" },
    { href: "/interview-mode", label: "Interview Mode" },
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
