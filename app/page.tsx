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
 *
 * SECTION ORDER IS RULED (2026-08-30 homepage brief). Seven sections, in this order:
 *   1 Hero  2 Signature thesis  3 Flagship proof  4 Selected work
 *   5 Career arc  6 Selected ideas  7 Closing invitation
 * Do not add an eighth section without a documented visitor need.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OperationsRoomPreview } from "@/components/operations-room-preview";
import { Portrait } from "@/components/portrait";
import { Section } from "@/components/section";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import { homeArticles, homeProfileLinks } from "@/content/home";
import { professionalGraph, resume } from "@/content/site";

/** Section 4 — exactly three bodies of work, each with problem, role, proof and outcome. */
const selectedWork = [
  {
    title: "Production agent systems",
    problem:
      "An agent that can act on production needs more than a good model. It needs bounded execution, evidence it can cite, evaluation that runs before anyone trusts it, and a stopping point where a human decides.",
    role:
      "I took an enterprise SRE investigation agent from thesis to production and owned it end to end — architecture, engineering, enterprise integration, evaluation and operationalization.",
    proof: "Reference architecture, evaluation gates, and the governed tool-call model, all written down.",
    outcome:
      "The model was the easy part. Keeping its context current and its actions answerable was the work.",
    href: "/work",
    linkLabel: "See the operating record",
    status: "Production experience"
  },
  {
    title: "The operational context layer",
    problem:
      "At the worst possible moment, teams are rebuilding the same four things by hand: who owns this, what changed, what depends on it, and what the transaction actually did.",
    role:
      "I design the layer that assembles that once — transactions, topology, change, ownership, evidence graphs, memory and replay — so agents, workflows and engineers reason from the same reality.",
    proof: "Doctrine v1.0, the reference architecture, and ten architecture patterns in build order.",
    outcome: "Build context once, or every consumer reconstructs it privately, repeatedly, and late.",
    href: "/framework",
    linkLabel: "Read the thesis",
    status: "Public reference architecture"
  },
  {
    title: "Enterprise platform foundations",
    problem:
      "Regulated systems fail across ownership boundaries, and no single team can see the whole path. That is the environment the agents are being pointed at.",
    role:
      "Fifteen years of it: identity and access modernization, middleware and B2B integration, Kubernetes platforms, and observability in financial services.",
    proof: "A zero-downtime OpenID Connect migration across 120+ applications, and the career record behind it.",
    outcome: "Telemetry volume and operational understanding are not the same thing.",
    href: "/background",
    linkLabel: "Where the thesis comes from",
    status: "Career record"
  }
] as const;

/** Section 5 — progression, not chronology. Each phase names what it made possible. */
const careerArc = [
  ["Enterprise integration", "Systems that fail across boundaries taught me the alert is never the hard part."],
  ["Identity and platform", "Migrations where one mistake reaches every application taught me what a blast radius is."],
  ["Kubernetes and observability", "Instrumenting it properly taught me that more telemetry is not more understanding."],
  ["Production AI systems", "Shipping an investigation agent taught me the context beneath it decides whether it is safe."],
  ["Operational Intelligence", "Writing the argument down in public, including the parts that are still unproven."]
] as const;

export default function Home() {
  const currentRole = resume.experience[0];

  return (
    <>
      {/* 1 — HERO. Identity, specialty, production proof, two actions. */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-mint sm:text-sm">
                Ravikanth Seri &mdash; Production AI systems &middot; Operational Intelligence
              </p>
              <h1 className="mt-4 max-w-3xl text-[2rem] font-semibold leading-[1.08] text-white sm:text-[2.75rem] lg:text-[3.15rem]">
                I build evidence-grounded AI systems for enterprise operations.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                My work connects live operational context, typed evidence, and machine reasoning to the person who
                has to approve the action. So an agent can investigate a production system without losing the thread
                back to why.
              </p>

              <p className="mt-5 max-w-2xl border-l-2 border-mint/60 pl-4 text-base leading-7 text-slate-200 sm:pl-5">
                Most recently I took an <strong className="font-semibold text-white">enterprise SRE investigation
                agent from thesis to production</strong>, owning it across architecture, engineering, enterprise
                integration, evaluation and operationalization. That system is private. Everything on this site is
                inspectable without it.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedLink
                  href="/investigation-room"
                  eventName="homepage_cta_click"
                  eventProperties={{ cta: "enter_operations_room" }}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded bg-mint px-6 py-3 text-base font-semibold text-ink"
                >
                  Enter the Operations Room <ArrowRight size={18} />
                </TrackedLink>
                <TrackedLink
                  href="/work"
                  eventName="homepage_cta_click"
                  eventProperties={{ cta: "explore_body_of_work" }}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded border border-white/25 px-6 py-3 text-base font-semibold text-white transition hover:border-mint/50 hover:text-mint"
                >
                  Explore the body of work
                </TrackedLink>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="max-w-sm rounded-xl border border-white/12 bg-white/[0.03] p-6">
                <Portrait size="lg" />
                <p className="mt-5 text-lg font-semibold leading-7 text-white">{professionalGraph.identity.person}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">{currentRole.role}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {currentRole.organization} &middot; {resume.location}
                </p>
                <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-slate-300">
                  Fifteen years running distributed enterprise systems in regulated financial services, before asking
                  AI to reason about them.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/resume"
                    className="inline-flex min-h-[44px] items-center rounded border border-white/12 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-mint/40 hover:text-mint"
                  >
                    Resume
                  </Link>
                  <TrackedAnchor
                    href={homeProfileLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    eventName="profile_link_click"
                    eventProperties={{ destination: "linkedin", placement: "homepage_hero_identity" }}
                    className="inline-flex min-h-[44px] items-center rounded border border-white/12 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-signal/40 hover:text-signal"
                  >
                    LinkedIn
                  </TrackedAnchor>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — SIGNATURE THESIS. The Authorized Misfire, once, then a link to the doctrine. */}
      <section className="border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber">The failure I design against</p>
          <h2 className="mt-7 text-2xl font-semibold leading-[1.35] text-white sm:text-[2rem] sm:leading-[1.35]">
            AI agents don&apos;t misfire because they lack intelligence. They misfire because the operational context
            beneath them is fragmented, stale, incomplete, or trusted past the point where it was still true.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-300">
            I call the result <strong className="font-semibold text-amber">the Authorized Misfire</strong>: an action
            the system was permitted to take, grounded in context it should not have trusted. Nothing was breached and
            no rule was broken. The evidence was simply older, thinner, or narrower than the decision resting on it.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
            Historical incidents and runbooks are valuable memory. They are not current production truth. So the
            context layer has to reconstruct what is happening now, show how the evidence connects, make uncertainty
            visible, and keep a human in control of anything consequential.
          </p>
          <Link
            href="/wiki/operational-intelligence-canonical-doctrine"
            className="mt-9 inline-flex min-h-[44px] items-center gap-2 text-base font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
          >
            Read the doctrine, and what would prove it wrong <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* 3 — FLAGSHIP PROOF. The dominant moment on the page. */}
      <Section eyebrow="Flagship proof" title="Watch an investigation hold itself to account.">
        <p className="mb-8 max-w-3xl text-lg leading-9 text-slate-300">
          Ten stages of a synthetic case. Step through it and the argument makes itself: a decision is not trusted
          until its evidence can be replayed. Use the stage buttons, or the arrow keys.
        </p>
        <OperationsRoomPreview />
      </Section>

      {/* 4 — SELECTED WORK. Exactly three bodies of work, editorial rather than a card wall. */}
      <Section eyebrow="Selected work" title="Three bodies of work.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
          {selectedWork.map((item, i) => (
            <article key={item.title} className="grid gap-6 bg-ink p-6 sm:p-8 lg:grid-cols-[0.44fr_0.56fr]">
              <div>
                <p className="font-mono text-sm text-mint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">{item.title}</h3>
                <p className="mt-4 inline-block rounded border border-white/12 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {item.status}
                </p>
                <p className="mt-6 text-base leading-8 text-slate-400">{item.problem}</p>
              </div>
              <div className="lg:pt-14">
                <p className="text-base leading-8 text-slate-200">{item.role}</p>
                <dl className="mt-6 grid gap-4 border-t border-white/10 pt-6">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">Public proof</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-300">{item.proof}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">What it taught me</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-300">{item.outcome}</dd>
                  </div>
                </dl>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
                >
                  {item.linkLabel} <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* 5 — CAREER ARC. Progression, not the resume repeated. */}
      <Section eyebrow="Career arc" title="Each phase is why the next one was possible.">
        <ol className="grid gap-0 border-l border-white/12 pl-6 sm:pl-8">
          {careerArc.map(([phase, lesson]) => (
            <li key={phase} className="relative pb-9 last:pb-0">
              <span aria-hidden className="absolute -left-[1.9rem] top-2 h-2.5 w-2.5 rounded-full bg-mint sm:-left-[2.4rem]" />
              <h3 className="text-xl font-semibold text-white sm:text-2xl">{phase}</h3>
              <p className="mt-2 max-w-2xl text-base leading-8 text-slate-300">{lesson}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/resume"
            className="inline-flex min-h-[48px] items-center gap-2 rounded border border-white/25 px-5 py-3 font-semibold text-white transition hover:border-mint/50 hover:text-mint"
          >
            The interactive resume
          </Link>
          <Link
            href="/background"
            className="inline-flex min-h-[48px] items-center gap-2 rounded border border-white/25 px-5 py-3 font-semibold text-white transition hover:border-mint/50 hover:text-mint"
          >
            The longer background
          </Link>
        </div>
      </Section>

      {/* 6 — SELECTED IDEAS. Four, as a reading sequence rather than a blog grid. */}
      <Section eyebrow="Selected ideas" title="Four arguments worth disagreeing with.">
        <ol className="max-w-4xl divide-y divide-white/10 border-y border-white/10">
          {homeArticles.slice(0, 4).map((article, i) => (
            <li key={article.slug}>
              <Link
                href={`/ideas/${article.slug}`}
                className="group grid gap-3 py-7 transition sm:grid-cols-[auto_1fr] sm:gap-7"
              >
                <span className="font-mono text-sm text-slate-500 sm:pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-mint">
                    {article.theme}
                  </span>
                  <span className="mt-3 block text-xl font-semibold leading-tight text-white group-hover:text-mint sm:text-2xl">
                    {article.title}
                  </span>
                  <span className="mt-3 block max-w-2xl text-base leading-8 text-slate-400">{article.dek}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/library"
            className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
          >
            Everything I have written down <ArrowRight size={16} />
          </Link>
          <Link
            href="/patterns"
            className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
          >
            The ten architecture patterns, in build order <ArrowRight size={16} />
          </Link>
        </div>
      </Section>

      {/* 7 — CLOSING INVITATION. One primary action. */}
      <section className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            If you are putting agents anywhere near production, I would like to hear how it is going.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
            I am glad to talk with technical leaders hiring for Staff, Principal, architecture, AI systems or
            observability leadership; practitioners building production agent systems; conference and engineering
            forum organisers; and teams who want a second opinion on operational context, agent evaluation and
            production governance.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
            Telling me where the doctrine is wrong is the most useful thing you can do with it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <TrackedLink
              href="/contact"
              eventName="homepage_cta_click"
              eventProperties={{ cta: "start_a_conversation" }}
              className="inline-flex min-h-[48px] items-center gap-2 rounded bg-mint px-6 py-3 text-base font-semibold text-ink"
            >
              Start a conversation <ArrowRight size={18} />
            </TrackedLink>
            <Link
              href="/ask"
              className="inline-flex min-h-[48px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
            >
              Or ask the public record
            </Link>
          </div>
          <p className="mt-10 max-w-2xl border-t border-white/10 pt-6 text-sm leading-7 text-slate-500">
            Everything published here is public-safe by design: approved material and synthetic examples only. Private
            employer systems, logs, dashboards, screenshots and proprietary architecture stay out of scope.
          </p>
        </div>
      </section>
    </>
  );
}
