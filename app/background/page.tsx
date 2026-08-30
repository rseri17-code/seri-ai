/**
 * VISITOR-FACING COPY — Claude's lane. Codex: do not edit prose in this file.
 *
 * Every string a visitor reads on this page is owned by one agent, by Ravikanth's ruling on
 * 2026-08-29. Two agents rewriting the same copy produced draft-quality output and repeated
 * reversions, so ownership is now split by kind of change, not by file:
 *
 *   Claude  — headings, paragraphs, labels, link text, alt text, microcopy, section order.
 *   Codex   — data wiring, imports, props, components, layout mechanics, accessibility
 *             attributes, performance. Structural work here is welcome.
 *
 * If a validator pin fails because copy moved, do not rewrite the copy to satisfy the pin.
 * Repoint the pin, or leave it and say so in CLAUDE_HANDOFF.md. Copy written to satisfy a
 * grep target is how this page ended up with a paragraph that existed only to hold pins.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BrainCircuit, GitBranch, Linkedin, ShieldCheck } from "lucide-react";
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
  ["Fifteen years", "Long enough to watch the same failure repeat. The data almost always existed. Nobody could assemble it fast enough to decide anything."],
  ["Regulated by default", "Financial services, where being wrong is expensive and every consequential action needs a named owner. That sets the floor on what an agent is allowed to do."],
  ["Why modernization mattered", "Moving integration onto Kubernetes and instrumenting it properly taught me that telemetry volume and operational understanding are not the same thing."],
  ["What I do now", "Build the context layer, and the harness that runs on it, so an agent reasons from attributable evidence instead of filling gaps with inference."]
] as const;

export default function BackgroundPage() {
  return (
    <>
      <Section eyebrow="Background" title="Ravikanth Seri's background and operating arc." level="h1">
        <div className="grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
          <Card className="border-mint/25 bg-mint/[0.05]">
            <div className="mb-5 flex items-center gap-4">
              <Portrait size="lg" />
              <BrainCircuit className="text-mint" />
            </div>
            <h2 className="text-3xl font-semibold leading-tight text-white">
              I spent fifteen years being paged when distributed systems failed in ways no single dashboard explained.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              That is where the thesis comes from. Middleware and B2B integration first, then API gateways and identity, then
              Kubernetes and telemetry &mdash; all of it in regulated environments where systems fail across ownership boundaries and
              no one team can see the whole path. The alert was never the hard part. Assembling enough current context to decide
              anything was.
            </p>
            <p className="mt-4 leading-7 text-slate-300">
              {resume.summary}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Who</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{professionalGraph.identity.person}</p>
              </div>
              <div className="rounded border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">What</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{professionalGraph.identity.siteRole}</p>
              </div>
              <div className="rounded border border-white/10 bg-black/20 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Now</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{professionalGraph.identity.currentFocus}</p>
              </div>
              <Link href="/work" className="rounded border border-white/10 bg-black/20 p-3 transition hover:border-mint/45">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Proof path</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{professionalGraph.identity.throughline}</p>
              </Link>
            </div>
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
          <div className="grid gap-3 sm:grid-cols-2">
            {professionalGraph.careerEvolution.slice(0, 4).map((item) => (
              <Card
                key={item.period}
                className="relative h-full overflow-hidden p-4 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-mint before:via-signal before:to-amber before:opacity-80"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{item.period}</p>
                <h2 className="mt-3 text-xl font-semibold text-white">{item.stage}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.summary}</p>
                <p className="mt-3 text-xs leading-5 text-slate-500">{item.explains}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Profile guide" title="Where to find the proof quickly.">
        <Card className="border-mint/25 bg-mint/[0.04] p-5">
          <p className="text-sm leading-7 text-slate-300">
            Start with the summary, then move to resume, work, LinkedIn, GitHub, publications, certifications, education, and contact.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {professionalGraph.profileDiscovery
              .filter((item) => [
                "Professional summary",
                "Current role and focus",
                "Publications",
                "GitHub",
                "Certifications",
                "Education",
                "Resume",
                "LinkedIn",
                "Contact information"
              ].includes(item.need))
              .map((item) => (
                <Link key={item.need} href={item.primaryHref} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-mint transition hover:border-mint/40">
                  {item.need}
                </Link>
              ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Point of view" title="Ravikanth Seri's point of view.">
        <Card className="border-signal/25 bg-signal/[0.045]">
          <p className="text-lg leading-8 text-slate-300">
            The LinkedIn writing and the reference architecture converge on the same operating thesis: enterprise AI will fail operationally when context is reconstructed privately, repeatedly, and late.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {homeLinkedInSignals.slice(0, 3).map((signal) => (
              <span key={signal.name} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-mint">
                {signal.name}
              </span>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Career story" title="Ravikanth Seri's career story.">
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

      <Section eyebrow="Review questions" title="Questions this page should answer.">
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
