import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Boxes, BrainCircuit, ClipboardCheck, FileText, GitBranch, Layers, ShieldCheck, UserRound } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { articles, contentRegistry, evalReport, operationalIntelligenceFramework, patterns, projects, resume } from "@/content/site";

export const metadata: Metadata = {
  title: "Work | Ravikanth Seri",
  description:
    "Evidence-led proof of Ravikanth Seri's public work across Operational Intelligence, Agentic SRE, ReasonOps, reference architecture, artifacts, writing, and background."
};

type WorkItem = [href: string, label: string, detail: string];

const registryItem = (slug: string) => {
  const item = contentRegistry.find((entry) => entry.slug === slug);
  if (!item) {
    throw new Error(`Missing content registry item: ${slug}`);
  }
  return item;
};

const registryWorkItem = (slug: string): WorkItem => {
  const item = registryItem(slug);
  const suffix = item.status === "published" ? "" : " (planned)";
  return [item.route, `${item.title}${suffix}`, item.summary];
};

const reviewSpine: WorkItem[] = [
  [
    "/wiki/operational-intelligence-canonical-doctrine",
    "Canonical Doctrine",
    "The definition, boundaries, ten-layer model, glossary, claim posture, and public-safe OI-ROOM-001 case."
  ],
  [
    "/wiki/operational-intelligence-reference-architecture",
    "Reference Architecture",
    "Implementation-neutral contracts, schemas, state machines, governance controls, evaluation gates, and conformance levels."
  ],
  [
    "/wiki/operational-intelligence-evidence-pack",
    "Evidence Pack",
    "Benchmark rubric, control comparisons, minimum conformance checklist, practitioner review, and falsification criteria."
  ],
  [
    "/wiki/operational-intelligence-publication-pack",
    "Publication Pack",
    "Diagrams, comparison tables, decision packet example, printable walkthrough, executive summary, glossary card, and PDFs."
  ],
  [
    "/investigation-room",
    "Operations Room",
    "The synthetic public-safe artifact where the framework becomes an inspectable investigation workflow."
  ]
];

const proofLedger = [
  {
    claim: "Ravikanth is building an operating model, not a resume site.",
    evidence: "Doctrine, Reference Architecture, Evidence Pack, Publication Pack",
    href: "/wiki/operational-intelligence-canonical-doctrine"
  },
  {
    claim: "The thesis is inspectable through a working public-safe artifact.",
    evidence: "Operations Room and OI-ROOM-001 walkthrough",
    href: "/investigation-room"
  },
  {
    claim: "The AI surface is bounded by citations, refusals, and deterministic trust fixtures.",
    evidence: `Ask Ravi and ${evalReport.fixtures.length} passing public trust evals`,
    href: "/evals"
  },
  {
    claim: "The body of work connects engineering taste to professional proof.",
    evidence: "Projects, patterns, resume, public profiles, and background",
    href: "/background"
  }
];

const operatingStandards: Array<{ title: string; body: string; Icon: LucideIcon }> = [
  {
    title: "Definition discipline",
    body: "Terms, boundaries, and claims are versioned instead of implied.",
    Icon: ShieldCheck
  },
  {
    title: "Action discipline",
    body: "Recommendations preserve evidence, missing context, reversibility, and owner approval.",
    Icon: ClipboardCheck
  },
  {
    title: "Learning discipline",
    body: "Reviewed outcomes become replay seeds, eval fixtures, memory, and stronger retrieval.",
    Icon: GitBranch
  }
];

const workSections: Array<{ title: string; Icon: LucideIcon; items: WorkItem[] }> = [
  {
    title: "Systems",
    Icon: Boxes,
    items: [
      registryWorkItem("reasonops"),
      registryWorkItem("operations-room"),
      registryWorkItem("ask-ravikanth")
    ]
  },
  {
    title: "Frameworks",
    Icon: Layers,
    items: [
      registryWorkItem("operational-intelligence-framework"),
      registryWorkItem("agentic-sre-harness-model"),
      registryWorkItem("evidence-graph-model"),
      ["/patterns/agentic-incident-investigation", "Hypothesis Lifecycle", "How competing explanations are proposed, supported, weakened, rejected, or promoted."],
      registryWorkItem("replay-seed-model"),
      registryWorkItem("public-evaluation-gate"),
      ["/patterns/human-in-the-loop-operational-ai", "Operator Control Plane", "Human approval, override, escalation, and accountability for enterprise agent action."]
    ]
  },
  {
    title: "Domains",
    Icon: BrainCircuit,
    items: [
      ["/framework", "Operational Intelligence", operationalIntelligenceFramework.subtitle],
      ["/radar", "Agentic SRE", "Operational agents with evidence, replay, evals, memory, and human review."],
      ["/patterns/transaction-journey-reconstruction", "Transaction Intelligence", "Customer and workflow journeys as the unit of operational reasoning."],
      ["/patterns/operational-memory", "Operational Memory", "Reusable incident decisions, mitigations, patterns, and replay seeds."],
      ["/ideas/incident-investigation-as-a-product-experience", "AI-native Incident Investigation", "Incident investigation as a guided product experience, not a frantic search session."],
      ["/patterns/topology-aware-reasoning", "Topology-aware reasoning", "Dependency and ownership context for blast-radius and action boundaries."],
      ["/patterns/evaluation-and-replay", "Evaluation and replay", "Release gates and replay seeds for trustworthy operational AI."]
    ]
  },
  {
    title: "Artifacts",
    Icon: GitBranch,
    items: [
      ...projects.slice(0, 3).map((project) => [`/projects/${project.slug}`, project.name, project.summary] as WorkItem),
      ...resume.publicProof.map((item) => [item.href, item.label, item.description] as WorkItem)
    ]
  },
  {
    title: "Writing",
    Icon: FileText,
    items: articles.slice(0, 4).map((article) => [`/ideas/${article.slug}`, article.title, article.dek])
  },
  {
    title: "Background",
    Icon: UserRound,
    items: [
      ["/background", "Professional background", resume.summary],
      ["/resume", "Interactive resume", "Career evidence, capabilities, and public-safe enterprise architecture experience."],
      ["/contact", "Contact", "Reach out about Operational Intelligence, Agentic SRE, architecture, and collaboration."]
    ]
  }
];

export default function WorkPage() {
  return (
    <>
      <Section eyebrow="Work" title="Evidence that the builder and the thesis are the same thing." level="h1">
        <Card className="border-mint/25 bg-mint/[0.05]">
          <BrainCircuit className="mb-5 text-mint" />
          <h2 className="text-3xl font-semibold text-white">A field guide to the systems, frameworks, artifacts, writing, and experience behind Operational Intelligence.</h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            This page is the credibility surface. It connects Ravikanth&apos;s public work to a single thesis: Operational Intelligence as a public-safe, inspectable operating model for Agentic SRE, evidence-backed reasoning, eval-gated action, and compounding operational memory.
          </p>
        </Card>
      </Section>

      <Section eyebrow="Proof ledger" title="The serious question is not what exists. It is what each artifact proves.">
        <div className="grid gap-4 md:grid-cols-2">
          {proofLedger.map((item, index) => (
            <Link key={item.claim} href={item.href}>
              <Card className="h-full border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-mint/40">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded border border-mint/30 bg-mint/10 font-mono text-sm text-mint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{item.claim}</h2>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-signal">Evidence</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.evidence}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Review spine" title="Start here if you are evaluating the work seriously.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {reviewSpine.map(([href, label, detail], index) => (
            <Link key={href} href={href}>
              <Card className="h-full transition hover:border-mint/40">
                <p className="font-mono text-sm text-mint">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 text-xl font-semibold text-white">{label}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Operating standard" title="What strong reviewers should expect to see.">
        <div className="grid gap-4 md:grid-cols-3">
          {operatingStandards.map(({ title, body, Icon }) => (
            <Card key={title} className="h-full p-5">
              <Icon className="mb-4 text-mint" />
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Index" title="Explore the body of work without guessing where to click.">
        <div className="grid gap-4 lg:grid-cols-2">
          {workSections.map(({ title, Icon, items }) => (
            <Card key={title} className="h-full">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
                  <Icon size={20} />
                </div>
                <h2 className="text-2xl font-semibold text-white">{title}</h2>
              </div>
              <div className="mt-5 grid gap-3">
                {items.map(([href, label, detail]) => (
                  <Link key={href} href={href} className="rounded border border-white/10 bg-black/20 p-4 transition hover:border-mint/40">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">{label}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
                      </div>
                      <ArrowRight className="mt-1 shrink-0 text-slate-500" size={16} />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Patterns" title="Architecture patterns connected to the framework.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {patterns.slice(0, 6).map((pattern) => (
            <Link key={pattern.slug} href={`/patterns/${pattern.slug}`}>
              <Card className="h-full transition hover:border-signal/40">
                <p className="text-xs font-semibold uppercase text-signal">{pattern.tags[0]}</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{pattern.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{pattern.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
