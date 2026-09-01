/**
 * VISITOR-FACING COPY — Claude's lane. Codex: do not edit prose in this file.
 *   Claude  — headings, paragraphs, labels, link text, alt text, microcopy, section order.
 *   Codex   — data wiring, imports, props, components, layout mechanics, accessibility
 *             attributes, performance. Structural work here is welcome.
 * If a validator pin fails because copy moved, do not rewrite the copy to satisfy the pin.
 *
 * RULED 2026-08-30 (background brief). Six sections, in this order:
 *   1 Opening  2 Career progression  3 Career spine  4 What I build now
 *   5 Principles  6 Proof and next step
 *
 * TERMINOLOGY RULE, RULED: one container-runtime product name is banned from this page. It must
 * not appear in copy, headings, metadata, alt text, hidden text, any content object read in here,
 * or in this file at all — which is why it is not spelled out in these comments either. The exact
 * term and the reasoning are in CLAUDE_HANDOFF.md under the 2026-08-30 background brief.
 * Ravikanth's career is broader than one runtime. Say "container platforms", "enterprise platform
 * modernization" or "platform engineering", whichever is accurate in the sentence.
 * Verify with: grep -ic <term> app/background/page.tsx  (expect 0) and against rendered HTML.
 *
 * This is why the role scope and bullets below are page-local rather than read from
 * resume.experience[].bullets: those bullets name the runtime, they are shared with /resume, and
 * /resume is out of scope for this brief. Titles, periods and employers still come from
 * content/resume.json so the career record stays single-source.
 *
 * Do NOT "fix" content/resume.json certifications to satisfy this rule. One of his certifications
 * contains the banned term as part of its official credential name. A credential name is a proper
 * noun, it is accurate, it is his, and it renders on /resume — which this rule does not cover.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Linkedin } from "lucide-react";
import { Card } from "@/components/card";
import { Portrait } from "@/components/portrait";
import { Section } from "@/components/section";
import { homeProfileLinks } from "@/content/home";
import { resume } from "@/content/site";

export const metadata: Metadata = {
  title: "Background | Ravikanth Seri",
  description:
    "Fifteen years operating and modernizing enterprise platforms in regulated financial services, and how that led to building production AI systems for enterprise operations.",
  alternates: { canonical: "/background" },
  openGraph: {
    title: "Background | Ravikanth Seri",
    description:
      "The roles, the systems, and the recurring failure behind Ravikanth Seri's Operational Intelligence thesis.",
    url: "/background",
    // Next.js replaces the root openGraph object rather than merging it, so a route that declares
    // its own block loses the site image unless it restates one. /background was sharing with no
    // preview image as a result.
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ravikanth Seri | seri.ai" }],
    type: "website"
  }
};

/** Section 2 — causal, not chronological. Each phase states the problem, the lesson, the handoff. */
const progression = [
  {
    phase: "Enterprise integration and infrastructure",
    problem: "Integration-heavy systems that failed between teams, where nobody owned the whole path.",
    learned: "Follow the transaction across ownership boundaries. The alert is never the hard part.",
    consequence: "Model the journey, not an isolated service."
  },
  {
    phase: "Identity and platform modernization",
    problem: "Access changes where one wrong step reaches every application at once.",
    learned: "Design for blast radius, backward compatibility, and named ownership before speed.",
    consequence: "No agent acts without a named owner and a reversible path."
  },
  {
    phase: "Container platforms and observability",
    problem: "Workloads moved onto modern platforms and the volume of telemetry rose sharply.",
    learned: "More telemetry was not more understanding. Signal without context is still a guess.",
    consequence: "Build the context layer before the reasoning layer."
  },
  {
    phase: "Production AI systems",
    problem: "A model asked to explain a live production system it could only see in fragments.",
    learned: "What sits beneath the model decides whether its conclusion is safe to trust.",
    consequence: "Evaluation and replay come before anyone relies on an answer."
  },
  {
    phase: "Operational Intelligence",
    problem: "The same four questions rebuilt by hand, under pressure, on every serious incident.",
    learned: "That pattern is an architecture problem, not a staffing problem.",
    consequence: "Write the architecture down in public, unproven parts included."
  }
] as const;

/**
 * Section 3 — scope, evidence, and what carried forward. Titles, periods and employers come from
 * content/resume.json; the scope and bullets are written for this page.
 */
const spine = [
  {
    scope:
      "I lead architecture for production AI systems supporting enterprise operations: investigation, retrieval, evaluation, and governed tool use.",
    bullets: [
      "Took an enterprise SRE investigation agent from thesis to production, owning architecture, engineering, enterprise integration, evaluation, and operationalization.",
      "Separated deterministic orchestration, evidence collection, and gate evaluation from model reasoning, so a conclusion stays replayable and bounded.",
      "Built the evaluation path a recommendation must pass before it is trusted, with a person holding the approval."
    ],
    carried: "Design the stopping point before the capability."
  },
  {
    scope: "I led identity modernization and platform reliability across a large regulated application estate.",
    bullets: [
      "Ran a zero-downtime OpenID Connect migration across 120+ enterprise applications, preserving the contracts legacy applications depended on.",
      "Modernized enterprise identity workloads onto container platforms, improving deployment consistency, isolation, and reliability.",
      "Integrated distributed tracing and telemetry correlation across identity services, so failures could be explained rather than only detected."
    ],
    carried: "A working definition of blast radius, and how to migrate without breaking callers."
  },
  {
    scope: "I built the foundation: middleware, B2B integration, API gateways, identity, and the infrastructure beneath them.",
    bullets: [
      "Operated and modernized integration and gateway platforms in high-availability regulated environments.",
      "Built the observability practice around them: logs, alerting, latency analysis, capacity signals.",
      "Ran production support for the systems I designed."
    ],
    carried: "Fifteen years of being the person paged."
  }
] as const;

/** Section 4 — three pillars, one inspectable artifact each. */
const pillars = [
  {
    title: "Production agent systems",
    problem: "An agent near production needs more than a good model to be safe to run.",
    contribution:
      "I design the deterministic frame around the model: bounded tool use, orchestration that can be replayed, evaluation before trust, and a person holding the consequential decision.",
    href: "/work",
    linkLabel: "The operating record"
  },
  {
    title: "The operational context layer",
    problem:
      "Under pressure, teams rebuild the same answers by hand: who owns this, what changed, what depends on it, what the transaction did.",
    contribution:
      "I design the layer that assembles those once — transactions, topology, change, ownership, history, live telemetry, and where each fact came from — so agents and engineers reason from the same reality.",
    href: "/framework",
    linkLabel: "The reference architecture"
  },
  {
    title: "Evaluation and governance",
    problem: "A confident answer and a correct answer look identical until something checks.",
    contribution:
      "I design what does the checking: replay, contradiction handling, citation and grounding tests, refusal behavior, approval boundaries, and learning from the outcome.",
    href: "/investigation-room",
    linkLabel: "Watch it run on a synthetic case"
  }
] as const;

/**
 * Section 5 — agent evaluation and observability, assigned by the Project Lead on 2026-08-31.
 * Capabilities only. Every item traces to a line already published on the resume: OpenTelemetry-style
 * instrumentation, evaluator scoring, replayability, drift analysis, telemetry receipts, and the
 * runtime governance list. No internal system names, no metrics, no tool not already public.
 */
const evaluation = [
  {
    title: "Instrumentation that outlives the answer",
    capability:
      "OpenTelemetry-style instrumentation across the whole reasoning path: which tools were called and in what order, what each one returned, what the model could see at each step, and a receipt attached to every fact that reached the conclusion.",
    without: "You can audit the output and nothing that produced it. A wrong answer nobody can reconstruct is a wrong answer nobody can fix."
  },
  {
    title: "Evaluation before trust, not after the incident",
    capability:
      "Evaluator scoring against fixtures rather than impressions — grounding and citation tests, contradiction handling, refusal behavior when the evidence is too thin to support a claim, and explicit coverage of what the evidence never reached.",
    without: "Confidence becomes self-reported. A system asked to grade itself grades generously."
  },
  {
    title: "Replay as the unit of proof",
    capability:
      "Deterministic orchestration, so the same fixture produces the same decision path every time and any run can be replayed after the fact and checked against what it claimed.",
    without: "You cannot tell a fix from a coincidence, and a regression looks identical to bad luck."
  },
  {
    title: "Drift, which only ever shows up later",
    capability:
      "Behavioral drift analysis across releases: the same fixtures re-scored as models, prompts, retrieval and the data underneath all change independently of each other.",
    without: "A system that passed on launch day stops passing quietly, and nothing announces it."
  }
] as const;

/** Section 6 — exactly four. These are platform safety constraints, not a publishing method. */
const principles = [
  {
    title: "Evidence before reasoning",
    body: "Start from current, attributable operational evidence before asking a model to explain anything."
  },
  {
    title: "Freshness before confidence",
    body: "Historical memory can inform a decision. It cannot stand in for current production truth."
  },
  {
    title: "Evaluation and replay before trust",
    body: "Reasoning that matters has to be reproducible, contradiction-aware, and tested against regression."
  },
  {
    title: "Human authority before consequential action",
    body: "Consequential execution stays behind ownership, approval, reversibility, and escalation."
  }
] as const;

/** Section 7 — four destinations, nothing else. */
const proofPath = [
  {
    href: "/resume",
    label: "Interactive resume",
    detail: "The full record: roles, education, certifications, and the detail this page leaves out."
  },
  { href: "/work", label: "Work", detail: "Systems, artifacts, and what each one does and does not prove." },
  {
    href: "/investigation-room",
    label: "Operations Room",
    detail: "A synthetic investigation you can work end to end, including what the evidence missed."
  },
  { href: "/contact", label: "Contact", detail: "Hiring, collaboration, advisory, and speaking conversations." }
] as const;

export default function BackgroundPage() {
  const roles = resume.experience.slice(0, 3);
  const current = roles[0];

  return (
    <>
      {/* 1 — OPENING. Identity, origin, two actions. */}
      <Section eyebrow="Background" title="Where the thesis comes from." level="h1">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="max-w-2xl text-xl leading-9 text-white sm:text-2xl sm:leading-10">
              I spent fifteen years being paged when distributed systems failed in ways no single dashboard explained.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300">
              Enterprise integration and infrastructure came first, then identity and platform modernization. Moving
              workloads onto container platforms and instrumenting them properly raised the volume of telemetry
              enormously, and did not by itself produce operational understanding. Then production AI made that gap
              consequential: a system was now drawing conclusions from context nobody had assembled. Operational
              Intelligence came out of watching that same pattern repeat.
            </p>
            <p className="mt-6 max-w-2xl border-l-2 border-mint/60 pl-5 text-base leading-8 text-slate-200">
              I am a Senior Technical Lead in AIOps and Observability, building production AI systems for enterprise
              operations. My work connects operational context, attributable evidence, evaluation, and governed
              execution, so a recommendation that matters keeps a clear path back to why.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/work"
                className="inline-flex min-h-[48px] items-center gap-2 rounded bg-mint px-6 py-3 text-base font-semibold text-ink"
              >
                View the work <ArrowRight size={18} />
              </Link>
              <Link
                href="/resume"
                className="inline-flex min-h-[48px] items-center gap-2 rounded border border-white/25 px-6 py-3 text-base font-semibold text-white transition hover:border-mint/50 hover:text-mint"
              >
                View the resume
              </Link>
              <a
                href={homeProfileLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/30 underline-offset-4 hover:decoration-mint"
              >
                LinkedIn <Linkedin size={17} />
              </a>
            </div>
          </div>

          <figure className="m-0 lg:justify-self-end">
            <Portrait size="xl" />
            <figcaption className="mt-5 max-w-xs">
              <p className="text-lg font-semibold leading-7 text-white">Ravikanth Seri</p>
              <p className="mt-1 text-sm leading-6 text-slate-300">{current.role}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {current.organization} &middot; {resume.location} &middot; 15+ years in enterprise engineering
              </p>
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* 2 — CAREER PROGRESSION. Causal. Each phase hands something to the next. */}
      <Section eyebrow="Progression" title="How the judgment formed.">
        <ol className="max-w-4xl">
          {progression.map((item, i) => (
            <li
              key={item.phase}
              className="relative border-l border-white/12 pb-7 pl-6 last:border-l-transparent last:pb-0 sm:pl-8"
            >
              <span
                aria-hidden
                className="absolute -left-[0.4rem] top-1 grid h-3 w-3 place-items-center rounded-full border border-mint/60 bg-ink"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              <p className="font-mono text-xs text-slate-500">{String(i + 1).padStart(2, "0")} / 05</p>
              <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">{item.phase}</h3>
              <p className="mt-2 max-w-2xl text-base leading-8 text-slate-400">{item.problem}</p>
              <p className="mt-2 max-w-2xl text-base leading-8 text-slate-200">{item.learned}</p>
              <p className="mt-2 max-w-2xl text-base leading-8 text-mint/85">
                <span className="font-semibold">Design consequence:</span> {item.consequence}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3 — CAREER SPINE. Titles and periods from resume.json; scope and bullets written here. */}
      <Section eyebrow="Career spine" title="The roles behind it.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
          {roles.map((role, i) => (
            <article key={role.period} className="grid gap-5 bg-ink p-6 sm:p-7 lg:grid-cols-[0.36fr_0.64fr]">
              <div>
                <p className="font-mono text-sm text-mint">{role.period}</p>
                <h3 className="mt-3 text-xl font-semibold leading-7 text-white">{role.role}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {role.employers.map((employer) => (
                    <span
                      key={employer}
                      className="rounded border border-white/15 bg-white/[0.04] px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-slate-300"
                    >
                      {employer}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-base leading-8 text-slate-200">{spine[i].scope}</p>
                <ul className="mt-4 grid gap-2">
                  {spine[i].bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-7 text-slate-400">
                      <span aria-hidden className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-mint" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-slate-300">
                  <span className="font-semibold text-signal">Carried forward.</span> {spine[i].carried}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 4 — WHAT I BUILD NOW. Three pillars, one artifact each. */}
      <Section eyebrow="Current work" title="What I build now.">
        <div className="grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Card key={pillar.title} className="flex h-full flex-col p-6">
              <h3 className="text-xl font-semibold leading-7 text-white">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{pillar.problem}</p>
              <p className="mt-4 flex-1 text-base leading-8 text-slate-200">{pillar.contribution}</p>
              <Link
                href={pillar.href}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
              >
                {pillar.linkLabel} <ArrowRight size={16} />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5 — EVALUATION AND OBSERVABILITY. The third pillar, at depth. */}
      <Section eyebrow="Evaluation and observability" title="How you know the agent is behaving.">
        <p className="max-w-3xl text-base leading-8 text-slate-300">
          A correct answer and a confident wrong one arrive in the same shape: a paragraph that reads well. Everything
          here exists to tell them apart before a person acts on either. It is the half of the work with no demo —
          instrumentation, scoring, replay — and it is the half that decides whether the other half can be trusted.
        </p>
        <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-2">
          {evaluation.map((item) => (
            <article key={item.title} className="bg-ink p-6 sm:p-7">
              <h3 className="text-lg font-semibold leading-7 text-white">{item.title}</h3>
              <p className="mt-3 text-base leading-8 text-slate-200">{item.capability}</p>
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-slate-400">
                <span className="font-semibold text-amber">Without it.</span> {item.without}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
          Around all four sits the runtime governance the platform actually enforces: fail-closed execution, freshness
          validation before a stale fact is allowed to matter, tool budgets that bound how far an investigation can
          reach, and an approval checkpoint no agent can route around.
        </p>
        <Link
          href="/investigation-room"
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
        >
          Watch every one of these run on a synthetic case <ArrowRight size={16} />
        </Link>
      </Section>

      {/* 6 — PRINCIPLES. Exactly four. */}
      <Section eyebrow="Principles" title="Four invariants, and what breaks without them.">
        <ol className="grid max-w-5xl gap-x-10 gap-y-7 sm:grid-cols-2">
          {principles.map((principle, i) => (
            <li key={principle.title}>
              <p className="font-mono text-xs text-slate-500">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{principle.title}</h3>
              <p className="mt-2 text-base leading-8 text-slate-300">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 7 — PROOF AND NEXT STEP. Four destinations, then the closing line. */}
      <Section eyebrow="Next" title="Where to look next.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {proofPath.map((item) => (
            <Link key={item.href} href={item.href} className="group bg-ink p-6 transition hover:bg-white/[0.03]">
              <h3 className="text-lg font-semibold text-white group-hover:text-mint">{item.label}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">{item.detail}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-200">
          I did not start with a model and go looking for an operational problem. I spent fifteen years with the
          problem, then built the system I wanted operators to have.
        </p>
      </Section>
    </>
  );
}
