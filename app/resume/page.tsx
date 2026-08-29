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
import { Award, BrainCircuit, Download, ExternalLink, GitBranch, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Portrait } from "@/components/portrait";
import { Section } from "@/components/section";
import { TrackedAnchor } from "@/components/tracked-link";
import { evalReport, professionalGraph, publicCode, resume } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume | Ravikanth Seri — Operational Intelligence and Enterprise AI",
  description: "Interactive public resume for Ravikanth Seri focused on Operational Intelligence, agentic systems, observability strategy, and enterprise AI.",
  alternates: { canonical: "/resume" },
  openGraph: {
    title: "Resume | Ravikanth Seri — Operational Intelligence and Enterprise AI",
    description: "Interactive public resume connecting Ravikanth Seri's enterprise systems background to Operational Intelligence, AI-native operations, and evaluation.",
    url: "/resume",
    type: "website"
  }
};

const impactLedger = [
  ["15+ years", "Distributed enterprise systems, infrastructure, middleware, identity, reliability, and modernization."],
  ["120+ apps", "Zero-downtime identity migration across enterprise applications while preserving existing contracts."],
  ["80% ticket reduction", "Python automation and API integration that reduced recurring identity support load."],
  ["200 hours / quarter", "Recovered engineering time through repeatable onboarding and operational automation."],
  [`${evalReport.fixtures.length}/${evalReport.fixtures.length} evals`, "Public deterministic trust fixtures for Ask Ravi's grounding, refusal, citation, and routing behavior."],
  ["v1.0 doctrine", "Versioned Operational Intelligence doctrine, reference architecture, publication pack, and evidence pack."]
] as const;

export default function ResumePage() {
  return (
    <Section eyebrow="Interactive resume" title="Ravikanth Seri's public resume." level="h1">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
        <Card>
          <div className="mb-4"><Portrait size="lg" /></div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} className="text-mint" />
            <span>{resume.location}</span>
          </div>
          <p className="mt-5 text-lg leading-8 text-slate-200">{resume.summary}</p>
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
          <div className="mt-5 flex flex-wrap gap-2">
            {resume.contact.map((item) => (
              <span key={item} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-300">
                {item}
              </span>
            ))}
          </div>
          <TrackedAnchor
            href="/ravi-seri-public-resume.txt"
            download
            eventName="resume_download"
            eventProperties={{ format: "txt" }}
            className="mt-6 inline-flex items-center gap-2 rounded bg-mint px-4 py-3 font-semibold text-ink"
          >
            <Download size={18} /> Download resume
          </TrackedAnchor>
        </Card>
        <Card className="border-mint/25 bg-mint/[0.045]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-mint" />
          <h2 className="text-xl font-semibold text-white">Impact ledger</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The operating background the thesis came out of, stated as numbers rather than adjectives.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {impactLedger.map(([value, label]) => (
              <div key={value} className="rounded border border-white/10 bg-black/20 p-4">
                <p className="text-2xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="border-signal/25 bg-signal/[0.045]">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-signal" />
          <h2 className="text-xl font-semibold text-white">Architectural thesis</h2>
          </div>
          <div className="mt-5 space-y-3">
            {professionalGraph.architectThesis.map((statement) => (
              <p key={statement} className="rounded border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-200">
                {statement}
              </p>
            ))}
          </div>
        </Card>
        <Card className="border-amber/25 bg-amber/[0.04]">
          <h2 className="text-xl font-semibold text-white">Architecture judgment ledger</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The resume evidence is strongest when it shows which constraints Ravikanth preserves while designing AI-native operational systems.
          </p>
          <div className="mt-5 space-y-3">
            {professionalGraph.architectureJudgment.slice(0, 3).map((item) => (
              <Link key={item.decision} href={item.inspectHref} className="block rounded border border-white/10 bg-black/20 px-4 py-3 transition hover:border-amber/45">
                <span className="block font-semibold text-white">{item.decision}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">{item.constraint}</span>
                <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.14em] text-amber">Inspect evidence</span>
              </Link>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Strengths</h2>
          <div className="mt-5 space-y-3">
            {resume.strengths.map((strength) => (
              <p key={strength} className="rounded border border-white/10 bg-ink px-4 py-3 text-slate-200">
                {strength}
              </p>
            ))}
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <GitBranch className="text-signal" />
          <h2 className="text-xl font-semibold text-white">Career throughline</h2>
          </div>
          <div className="mt-5 space-y-3">
            {professionalGraph.careerEvolution.slice(0, 3).map((item) => (
              <div key={item.period} className="rounded border border-white/10 bg-ink px-4 py-3">
                <p className="font-mono text-xs text-signal">{item.period}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{item.summary}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Career story map</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The public resume is organized as accumulated systems context, not a flat title history.
          </p>
          <div className="mt-5 grid gap-2">
            {professionalGraph.careerStory.map((stage, index) => (
              <div key={stage.stage} className="rounded border border-white/10 bg-ink px-4 py-3">
                <p className="font-mono text-xs text-signal">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 font-semibold text-white">{stage.stage}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-400">{stage.connectsTo}</p>
              </div>
            ))}
          </div>
        </Card>
          <Card className="border-signal/25 bg-signal/[0.04]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-signal" />
          <h2 className="text-xl font-semibold text-white">Source provenance</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Career evidence is synthesized from approved source classes, then converted into public-safe claims that can be challenged without exposing private systems.
            </p>
            <div className="mt-5 space-y-3">
              {resume.sourceProvenance.map((item) => (
                <div key={item.sourceClass} className="rounded border border-white/10 bg-ink px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{item.sourceClass}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.supports}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.publicUse}</p>
                </div>
              ))}
            </div>
          </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Public proof</h2>
            <div className="mt-5 space-y-3">
            {resume.publicProof.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="block rounded border border-white/10 bg-ink px-4 py-3 transition hover:border-mint/40"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-white">{item.label}</span>
                  <ExternalLink size={16} className="text-slate-500" />
                </span>
                <span className="mt-2 block text-sm text-mint">{item.value}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">{item.description}</span>
              </a>
            ))}
          </div>
        </Card>
        <Card className="border-signal/25 bg-signal/[0.045]">
          <h2 className="text-xl font-semibold text-white">Published work</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            The publication trail is what turns the resume into a body of work. It keeps the doctrine, reference architecture, evidence pack, publication pack, and Operations Room inspectable together.
          </p>
          <div className="mt-5 space-y-3">
            {professionalGraph.reviewSpine.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded border border-white/10 bg-ink px-4 py-3 transition hover:border-signal/40">
                <span className="block font-semibold text-white">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">{item.detail}</span>
              </Link>
            ))}
          </div>
        </Card>
        <Card className="border-mint/25 bg-mint/[0.04]">
          <h2 className="text-xl font-semibold text-white">Public code inspection path</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Public repositories are treated as inspectable signal, not as a substitute for private production evidence.
          </p>
          <div className="mt-5 space-y-3">
            {publicCode.entries.slice(0, 2).map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded border border-white/10 bg-black/20 px-4 py-3 transition hover:border-mint/45"
              >
                <span className="block font-semibold text-white">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-300">{item.whatToInspect}</span>
                <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.14em] text-mint">Inspect public source</span>
              </a>
            ))}
          </div>
        </Card>
        </div>
        <div className="space-y-4">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-mint" />
              <h2 className="text-xl font-semibold text-white">Capability evidence matrix</h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {professionalGraph.capabilityEvidence.map(({ capability, proof, href }) => (
                <Link key={capability} href={href} className="rounded border border-white/10 bg-ink p-4 transition hover:border-mint/40">
                  <h3 className="font-semibold text-white">{capability}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{proof}</p>
                  <p className="mt-3 text-xs font-semibold uppercase text-mint">Inspect proof</p>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-mint" />
              <h2 className="text-xl font-semibold text-white">Architecture highlights</h2>
            </div>
            <div className="mt-5 space-y-3">
              {resume.architectureHighlights.map((highlight) => (
                <p key={highlight} className="rounded border border-white/10 bg-ink px-4 py-3 leading-7 text-slate-200">
                  {highlight}
                </p>
              ))}
            </div>
          </Card>
          {resume.experience.map((item) => (
            <Card key={item.role}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-signal">{item.organization}</p>
                <p className="text-sm text-slate-400">{item.period}</p>
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-white">{item.role}</h2>
              <p className="mt-3 leading-7 text-slate-300">{item.impact}</p>
              <ul className="mt-5 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="rounded border border-white/10 bg-ink px-4 py-3 leading-7 text-slate-200">
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
          <Card>
            <h2 className="text-xl font-semibold text-white">Core skills</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {resume.skills.map((skill) => (
                <div key={skill.group} className="rounded border border-white/10 bg-ink p-4">
                  <h3 className="font-semibold text-white">{skill.group}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{skill.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Award className="text-amber" />
              <h2 className="text-xl font-semibold text-white">Education and certifications</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Credentials are treated as supporting evidence. They help explain the career arc, but they do not replace projects,
              architecture artifacts, evaluation fixtures, or public work.
            </p>
            <div className="mt-5 grid gap-3">
              {resume.education.map((item) => (
                <div key={`${item.credential}-${item.issuer}`} className="rounded border border-mint/20 bg-mint/10 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Education · {item.status}</p>
                  <h3 className="mt-2 font-semibold text-white">{item.credential}</h3>
                  <p className="mt-1 text-sm text-slate-300">{item.issuer}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{item.supports}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">Source: {item.sourceClass}</p>
                </div>
              ))}
              {resume.certifications.map((certification) => (
                <div key={`${certification.credential}-${certification.issuer}`} className="rounded border border-white/10 bg-ink px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Certification · {certification.status}</p>
                    {certification.issued ? <p className="font-mono text-xs text-slate-500">Issued {certification.issued}</p> : null}
                  </div>
                  <h3 className="mt-2 font-semibold text-white">{certification.credential}</h3>
                  <p className="mt-1 text-sm text-slate-300">{certification.issuer}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">{certification.supports}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{certification.doesNotProve}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">Source: {certification.sourceClass}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
