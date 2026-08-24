import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, GitBranch, Linkedin, ShieldCheck, Workflow } from "lucide-react";
import { Card } from "@/components/card";
import { Portrait } from "@/components/portrait";
import { Section } from "@/components/section";
import { homeLinkedInSignals, homeProfileLinks } from "@/content/home";
import { evalReport, professionalGraph, resume } from "@/content/site";

export const metadata: Metadata = {
  title: "Background | Ravikanth Seri",
  description:
    "Public-safe background narrative for Ravikanth Seri, connecting enterprise systems experience, Operational Intelligence, Agentic SRE, observability, identity, Kubernetes, evaluation, and AI-native operations.",
  alternates: { canonical: "/background" },
  openGraph: {
    title: "Background | Ravikanth Seri",
    description: "The operating background behind Ravikanth Seri's Operational Intelligence thesis and public AI-native operations work.",
    url: "/background",
    type: "website"
  }
};

const formatFixtureText = (text: string) => text.replace("{fixtureCount}", String(evalReport.fixtures.length));

const backgroundEvidence = [
  ["15+ years", "Distributed enterprise systems, integration, identity, observability, platform reliability, and production support."],
  ["Regulated operations", "Financial-services operating context where reliability, governance, access boundaries, and auditability shape architecture."],
  ["Modernization path", "Enterprise integration to Kubernetes, OpenTelemetry instrumentation, AIOps workflows, and production AI-assisted operations."],
  ["Current focus", "Agentic operations, evaluation, replay, runtime governance, and evidence-backed incident investigation."]
] as const;

export default function BackgroundPage() {
  return (
    <>
      <Section eyebrow="Background" title="The operating background behind the Operational Intelligence thesis." level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="border-mint/25 bg-mint/[0.05]">
            <div className="mb-5 flex items-center gap-4">
              <Portrait size="lg" />
              <BrainCircuit className="text-mint" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Ravikanth Seri builds from the operator side of enterprise AI.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              {resume.summary}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {backgroundEvidence.map(([label, detail]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/resume" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                View resume <ArrowRight size={18} />
              </Link>
              <a
                href={homeProfileLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint"
              >
                LinkedIn <Linkedin size={18} />
              </a>
            </div>
          </Card>
          <div className="grid gap-3">
            {professionalGraph.careerEvolution.slice(0, 3).map((item) => (
              <Card key={item.period} className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{item.period}</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{item.stage}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.summary}</p>
                <p className="mt-3 text-xs leading-5 text-slate-500">{item.explains}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Career story" title="The full arc is infrastructure judgment becoming AI operations judgment.">
        <div className="grid gap-3">
          {professionalGraph.careerStory.map((stage, index) => (
            <Card key={stage.stage} className="p-4">
              <div className="grid gap-4 md:grid-cols-[0.24fr_0.76fr]">
                <div>
                  <p className="font-mono text-sm text-mint">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">{stage.stage}</h2>
                </div>
                <div>
                  <p className="text-sm leading-6 text-slate-300">{stage.summary}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-signal">Evidence</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{stage.evidence}</p>
                  <p className="mt-3 text-xs leading-5 text-mint">Connects to: {stage.connectsTo}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Production delivery" title="The public-safe delivery chain from architecture to operating loop.">
        <div className="grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
          <Card className="h-fit border-amber/25 bg-amber/[0.04]">
            <ShieldCheck className="mb-5 text-amber" />
            <h2 className="text-3xl font-semibold text-white">Production experience should show up as constraints, gates, and reviewable handoffs.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The site publishes approved public evidence. It translates delivery lessons into public surfaces a reviewer can inspect:
              architecture contracts, bounded engineering records, integration context, evaluation gates, governance controls, and production-safe fallback behavior.
            </p>
          </Card>
          <div className="grid gap-3">
            {professionalGraph.productionDelivery.map((item, index) => (
              <Link key={item.stage} href={item.href}>
                <Card className="p-4 transition hover:border-amber/40">
                  <div className="grid gap-4 md:grid-cols-[0.24fr_0.76fr]">
                    <div>
                      <p className="font-mono text-sm text-amber">{String(index + 1).padStart(2, "0")}</p>
                      <h2 className="mt-3 text-xl font-semibold text-white">{item.stage}</h2>
                    </div>
                    <div>
                      <p className="text-sm leading-6 text-slate-300">{item.responsibility}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-mint">Public evidence</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.publicEvidence}</p>
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-signal">Reviewer question</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{item.reviewQuestion}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Point of view" title="The throughline is context, evidence, and accountable action.">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <Card className="border-signal/25 bg-signal/[0.045]">
            <Workflow className="mb-5 text-signal" />
            <h2 className="text-3xl font-semibold text-white">The LinkedIn signal and the reference architecture are telling the same story.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The public writing argues that enterprise AI will fail operationally when context is reconstructed privately, repeatedly, and late. seri.ai turns that argument into a public reference system: definitions, artifacts, evals, and a synthetic room where the reasoning path can be inspected.
            </p>
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

      <Section eyebrow="Architecture judgment" title="What the career arc trained him to protect.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {professionalGraph.architectureJudgment.map((item) => (
            <Link key={item.decision} href={item.inspectHref}>
              <Card className="h-full p-4 transition hover:border-amber/40">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Preserved constraint</p>
                <h2 className="mt-3 text-lg font-semibold leading-7 text-white">{item.decision}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.publicEvidence}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Review questions" title="A serious background page should make claims easy to challenge.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {professionalGraph.credibilityQuestions.map(({ question, answer, href }) => (
            <Link key={question} href={href}>
              <Card className="h-full p-4 transition hover:-translate-y-1 hover:border-signal/40">
                <ShieldCheck className="mb-4 text-signal" />
                <h2 className="text-xl font-semibold text-white">{question}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{answer}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal">
                  Inspect <ArrowRight size={15} />
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Proof path" title="Move from background to inspectable evidence.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {professionalGraph.proofLinks.map(({ href, label, detail, detailTemplate }) => (
            <Link key={href} href={href}>
              <Card className="h-full p-4 transition hover:border-mint/40">
                <GitBranch className="mb-4 text-mint" />
                <h2 className="text-xl font-semibold text-white">{label}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{formatFixtureText(detail ?? detailTemplate ?? "")}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
