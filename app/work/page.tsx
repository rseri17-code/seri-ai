import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Boxes, BrainCircuit, FileText, GitBranch, Layers, UserRound } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { articles, operationalIntelligenceFramework, patterns, projects, resume } from "@/content/site";

export const metadata: Metadata = {
  title: "Work | Ravikanth Seri",
  description:
    "A canonical index of Ravikanth Seri's public work across Operational Intelligence, Agentic SRE, ReasonOps, architecture patterns, artifacts, writing, and background."
};

type WorkItem = [href: string, label: string, detail: string];

const workSections: Array<{ title: string; Icon: LucideIcon; items: WorkItem[] }> = [
  {
    title: "Systems",
    Icon: Boxes,
    items: [
      ["/products/reasonops", "ReasonOps", "Public product/system expression for evidence-backed operational reasoning."],
      ["/investigation-room", "Operations Room", "Interactive proof artifact for replayable, eval-gated incident investigation."],
      ["/ask", "Reasoning Interface", "Grounded public interface over Ravikanth's approved knowledge layer."]
    ]
  },
  {
    title: "Frameworks",
    Icon: Layers,
    items: [
      ["/framework", operationalIntelligenceFramework.title, "The ten-layer model from signal to accountable action."],
      ["/manifesto", "Founding thesis", "Why Operational Intelligence exists as the reasoning layer between telemetry and decision."],
      ["/evals", "Evaluation model", "Public trust report and behavior gates for the Reasoning Interface."]
    ]
  },
  {
    title: "Domains",
    Icon: BrainCircuit,
    items: [
      ["/radar", "Agentic SRE", "Operational agents with evidence, replay, evals, memory, and human review."],
      ["/patterns/transaction-journey-reconstruction", "Transaction Intelligence", "Customer and workflow journeys as the unit of operational reasoning."],
      ["/patterns/operational-memory", "Operational Memory", "Reusable incident decisions, mitigations, patterns, and replay seeds."]
    ]
  },
  {
    title: "Artifacts",
    Icon: GitBranch,
    items: projects.slice(0, 3).map((project) => [`/projects/${project.slug}`, project.name, project.summary])
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
      <Section eyebrow="Work" title="The canonical operating index.">
        <Card className="border-mint/25 bg-mint/[0.05]">
          <BrainCircuit className="mb-5 text-mint" />
          <h2 className="text-3xl font-semibold text-white">A field guide to the systems, frameworks, artifacts, writing, and experience behind Operational Intelligence.</h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            This is the fastest way to understand the builder and the product thesis together: Operational Intelligence as a public-safe, inspectable operating model for Agentic SRE, evidence-backed reasoning, eval-gated action, and compounding operational memory.
          </p>
        </Card>
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
