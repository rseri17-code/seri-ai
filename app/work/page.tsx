import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Boxes, BrainCircuit, ClipboardCheck, FileText, GitBranch, Layers, Linkedin, ShieldCheck, UserRound } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { homeLinkedInSignals, homeProfileLinks } from "@/content/home";
import { articles, contentRegistry, evalReport, operationalIntelligenceFramework, professionalGraph, projects, publicCode, resume } from "@/content/site";

export const metadata: Metadata = {
  title: "Work | Ravikanth Seri",
  description:
    "Evidence-led proof of Ravikanth Seri's public work across Operational Intelligence, Agentic SRE, ReasonOps, reference architecture, artifacts, writing, and background.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Ravikanth Seri",
    description: "Evidence-led proof of Ravikanth Seri's public Operational Intelligence work, reference assets, artifacts, writing, GitHub, and LinkedIn signal.",
    url: "/work",
    type: "website"
  }
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

const standardIcons: Record<string, LucideIcon> = {
  ClipboardCheck,
  GitBranch,
  ShieldCheck
};

const formatFixtureText = (text: string) => text.replace("{fixtureCount}", String(evalReport.fixtures.length));

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
      <Section eyebrow="Work" title="Ravikanth Seri's operating record." level="h1">
        <Card className="border-mint/25 bg-mint/[0.05]">
          <BrainCircuit className="mb-5 text-mint" />
          <h2 className="text-3xl font-semibold text-white">
            Fifteen-plus years running enterprise systems, now applied to AI that acts on production.
          </h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            Middleware and API architecture in regulated financial services, then modernization, telemetry correlation, and Kubernetes reliability.
            Since 2025: bounded AI agents, deterministic orchestration, tool governance.
          </p>
          <p className="mt-3 max-w-4xl text-base leading-7 text-slate-400">
            Public proof is the rule: everything below states what it proves and what it does not.
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300">
            Inspect{" "}
            <a href={publicCode.entries[0].href} target="_blank" rel="noreferrer" className="font-semibold text-mint underline decoration-mint/30 underline-offset-4">
              GitHub
            </a>{" "}
            and{" "}
            <a href={publicCode.entries[1].href} target="_blank" rel="noreferrer" className="font-semibold text-mint underline decoration-mint/30 underline-offset-4">
              Sentinalai
            </a>
            . Do not infer private implementation details from public source alone.
          </p>
        </Card>
      </Section>

      <Section eyebrow="Operating arc" title="Ravikanth Seri's operating arc.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {professionalGraph.careerEvolution.map((item) => (
            <Card key={item.period} className="h-full p-5">
              <p className="font-mono text-sm text-mint">{item.period}</p>
              <h2 className="mt-4 text-xl font-semibold leading-7 text-white">{item.stage}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.summary}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500">{item.explains}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Public thesis threads" title="The public writing behind the work.">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <Card className="border-signal/25 bg-signal/[0.045]">
            <Linkedin className="mb-5 text-signal" />
            <h2 className="text-3xl font-semibold text-white">The public posts are notes.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The recurring theme is ownership, change, dependency, impact, missing evidence, and human approval.
            </p>
            <a
              href={homeProfileLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded border border-signal/40 px-5 py-3 font-semibold text-signal"
            >
              Read LinkedIn posts <Linkedin size={18} />
            </a>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {homeLinkedInSignals.map((signal) => (
              <Card key={signal.name} className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{signal.name}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{signal.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Proof ledger" title="The serious question is not what exists. It is what each artifact proves.">
        <div className="grid gap-4 md:grid-cols-2">
          {professionalGraph.proofLedger.map((item, index) => (
            <Link key={item.claim} href={item.href}>
              <Card className="h-full border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-mint/40">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded border border-mint/30 bg-mint/10 font-mono text-sm text-mint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{item.claim}</h2>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-signal">Evidence</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{formatFixtureText(item.evidence ?? item.evidenceTemplate ?? "")}</p>
                    <div className="mt-4 grid gap-3">
                      <div className="rounded border border-mint/20 bg-mint/[0.045] p-3">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-mint">What to inspect</p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">{item.inspect}</p>
                      </div>
                      <div className="rounded border border-amber/20 bg-amber/[0.045] p-3">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-amber">What would weaken it</p>
                        <p className="mt-2 text-sm leading-6 text-slate-200">{item.weakens}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Public code inspection" title="How to inspect the public code.">
        <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <GitBranch className="mb-5 text-mint" />
            <h2 className="text-3xl font-semibold text-white">Sentinalai is treated as public architecture signal, not private production proof.</h2>
            <p className="mt-4 text-base leading-7 text-slate-300">The public repository reference gives reviewers structure to inspect.</p>
            <div className="mt-3 rounded border border-amber/25 bg-amber/[0.06] px-4 py-3 text-sm leading-6 text-amber">
              {publicCode.entries.slice(0, 2).map((entry) => (
                <p key={entry.href}>{entry.proofBoundary}</p>
              ))}
            </div>
            <div className="mt-5 grid gap-3">
              {publicCode.observedPublicStructure.slice(0, 2).map((item) => (
                <p key={item} className="rounded border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-200">
                  {item}
                </p>
              ))}
            </div>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {publicCode.reviewRubric.slice(0, 2).map((item) => (
              <Card key={item.question} className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Review question</p>
                <h3 className="mt-3 font-semibold leading-6 text-white">{item.question}</h3>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-mint">Look for</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.lookFor}</p>
                <p className="mt-3 text-xs leading-5 text-amber">{item.doNotInfer}</p>
              </Card>
            ))}
          </div>
        </div>
        <Card className="mt-4 border-white/10 bg-black/20">
          <h2 className="text-2xl font-semibold text-white">What review should record.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
            A useful review produces evidence, not praise. Capture the surface, behavior, verdict, and next proof.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {publicCode.reviewRecordFields.map((item) => (
              <span key={item.field} className="rounded border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-mint">
                {item.field}
              </span>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Project proof" title="What each project proves, and what it does not.">
        <Card className="border-signal/25 bg-signal/[0.045]">
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {projects.map((project) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <div className="h-full rounded border border-white/10 bg-black/20 p-4 transition hover:border-signal/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{project.status}</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">{project.name}</h2>
                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    Boundary: inspect public artifacts and review questions; do not infer private outcomes or unsupported adoption.
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                    Review project proof <ArrowRight size={15} />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Architecture judgment" title="Constraints the architecture preserves.">
        <div className="grid gap-4 lg:grid-cols-2">
          {professionalGraph.architectureJudgment.map((item) => (
            <Link key={item.decision} href={item.inspectHref}>
              <Card className="h-full border-white/10 bg-white/[0.035] transition hover:border-signal/40">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Decision</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{item.decision}</h2>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-amber">Constraint preserved</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.constraint}</p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-mint">Public evidence</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.publicEvidence}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                  Inspect the artifact <ArrowRight size={15} />
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Review spine" title="Start here if you are evaluating the work seriously.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {professionalGraph.reviewSpine.map(({ href, label, detail }, index) => (
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
          {professionalGraph.operatingStandards.map(({ title, body, icon }) => {
            const Icon = standardIcons[icon] ?? ShieldCheck;
            return (
              <Card key={title} className="h-full p-5">
                <Icon className="mb-4 text-mint" />
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
              </Card>
            );
          })}
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
                {items.map(([href, label]) => (
                  <Link key={href} href={href} className="rounded border border-white/10 bg-black/20 p-4 transition hover:border-mint/40">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">{label}</h3>
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

    </>
  );
}
