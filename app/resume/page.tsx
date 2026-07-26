import Link from "next/link";
import { Award, BrainCircuit, Download, ExternalLink, GitBranch, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { TrackedAnchor } from "@/components/tracked-link";
import { resume } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume | Ravikanth Seri — Operational Intelligence and Enterprise AI",
  description: "Interactive public resume for Ravikanth Seri focused on Operational Intelligence, agentic systems, observability strategy, and enterprise AI."
};

const capabilityEvidence = [
  [
    "AI-native operations architecture",
    "Production agent systems, deterministic orchestration, tool boundaries, replay, and human review.",
    "/projects/operational-intelligence-copilot"
  ],
  [
    "Operational Intelligence doctrine",
    "A public category model connecting telemetry, transactions, topology, evidence, memory, evals, and operator judgment.",
    "/wiki/operational-intelligence-canonical-doctrine"
  ],
  [
    "Evidence-driven incident systems",
    "Operations Room, decision packets, evidence graphs, hypothesis lifecycles, and eval-gated recommendations.",
    "/investigation-room"
  ],
  [
    "Enterprise platform modernization",
    "Kubernetes, identity modernization, observability integration, distributed systems, and regulated operational environments.",
    "/patterns/topology-aware-reasoning"
  ],
  [
    "Evaluation and runtime governance",
    "Behavior fixtures, refusal tests, citation checks, release gates, tool controls, and approval boundaries.",
    "/evals"
  ],
  [
    "Public technical leadership",
    "Writing, architecture notes, public artifacts, LinkedIn signal, and reviewable reference packs.",
    "/work"
  ]
] as const;

const careerThroughline = [
  ["2008-2022", "Built the operating foundation across middleware, infrastructure, identity, Linux, distributed systems, automation, and production support."],
  ["2022-2025", "Led modernization patterns across Kubernetes, identity, observability, OpenTelemetry-style tracing, and enterprise integration."],
  ["2025-now", "Applies that operating background to production AI agent systems, AIOps, evaluation, replay, runtime governance, and Operational Intelligence."]
] as const;

const architectThesis = [
  "Ravikanth's point of view comes from operating complex systems first, then applying AI to the parts of operations where evidence, timing, ownership, and decision quality matter.",
  "Operational Intelligence is the synthesis: not a chatbot resume, not a dashboard layer, and not autonomy theater, but a reviewable control system for enterprise operational reasoning.",
  "The public work on seri.ai is designed to prove that thesis through doctrine, reference architecture, simulations, eval fixtures, patterns, and portable artifacts."
] as const;

export default function ResumePage() {
  return (
    <Section eyebrow="Interactive resume" title={resume.headline} level="h1">
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
        <Card>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} className="text-mint" />
            <span>{resume.location}</span>
          </div>
          <p className="mt-5 text-lg leading-8 text-slate-200">{resume.summary}</p>
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
        <Card className="border-signal/25 bg-signal/[0.045]">
          <div className="flex items-center gap-3">
            <BrainCircuit className="text-signal" />
            <h2 className="text-xl font-semibold text-white">Architect thesis</h2>
          </div>
          <div className="mt-5 space-y-3">
            {architectThesis.map((statement) => (
              <p key={statement} className="rounded border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-200">
                {statement}
              </p>
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
            {careerThroughline.map(([period, statement]) => (
              <div key={period} className="rounded border border-white/10 bg-ink px-4 py-3">
                <p className="font-mono text-xs text-signal">{period}</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{statement}</p>
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
        </div>
        <div className="space-y-4">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-mint" />
              <h2 className="text-xl font-semibold text-white">Capability evidence matrix</h2>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {capabilityEvidence.map(([capability, proof, href]) => (
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
            <div className="mt-4 flex flex-wrap gap-2">
              {resume.education.map((item) => (
                <span key={item} className="rounded border border-mint/20 bg-mint/10 px-3 py-2 text-sm text-slate-100">
                  {item}
                </span>
              ))}
              {resume.certifications.map((certification) => (
                <span key={certification} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200">
                  {certification}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
