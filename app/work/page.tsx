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
import { ArrowRight, BrainCircuit, Linkedin } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { homeLinkedInSignals, homeProfileLinks } from "@/content/home";
import { evalReport, professionalGraph, projects, publicCode } from "@/content/site";

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

const formatFixtureText = (text: string) => text.replace("{fixtureCount}", String(evalReport.fixtures.length));

export default function WorkPage() {
  return (
    <>
      <Section eyebrow="Work" title="What I have actually shipped." level="h1">
        <Card className="border-mint/25 bg-mint/[0.05]">
          <BrainCircuit className="mb-5 text-mint" />
          <h2 className="text-3xl font-semibold leading-tight text-white">
            I took an enterprise SRE investigation agent from thesis to production, and owned every stage of it.
          </h2>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
            Problem definition, prototyping, architecture, enterprise integration, evaluation, governance, rollout, and running it in
            production. Not one slice of that path &mdash; all of it, inside a regulated environment.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300">
            That boundary is where most agentic projects die. Getting across it is less about the model than about everything
            underneath: whether the context an agent reasons from is current, whether its evidence is attributable, and whether a
            human can still see how a decision was reached. Fifteen years of running enterprise systems before this is what made
            those the questions I care about.
          </p>
          <p className="mt-3 max-w-4xl text-base leading-7 text-slate-400">
            That work is not public. What follows is, and everything below states what it proves and what it does not.
          </p>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300">
            The public one is{" "}
            <a href={publicCode.entries[1].href} target="_blank" rel="noreferrer" className="font-semibold text-mint underline decoration-mint/30 underline-offset-4">
              Sentinalai
            </a>{" "}
            &mdash; an incident-investigation pipeline with deterministic playbooks, policy gates, memory, receipts, and
            model assistance kept optional. Read it, along with the rest of my{" "}
            <a href={publicCode.entries[0].href} target="_blank" rel="noreferrer" className="font-semibold text-mint underline decoration-mint/30 underline-offset-4">
              GitHub
            </a>
            . It shows you the architecture I argue for. It is not evidence of what runs in production anywhere, and
            nothing in it should be read back onto a private system.
          </p>
        </Card>
      </Section>

      <Section eyebrow="Operating arc" title="How I got here, and what each stretch taught me.">
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


    </>
  );
}
