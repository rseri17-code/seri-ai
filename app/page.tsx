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
 * SECTION ORDER IS RULED. Six sections, in this order:
 *   1 Hero  2 Signature thesis  3 The Operations Room  4 Selected work (+ career bridge)
 *   5 Selected ideas  6 Closing invitation
 * Do not add a seventh section without a documented visitor need.
 *
 * The five-stage career arc was REMOVED on 2026-08-30: /background owns that narrative, and
 * reproducing it here was the page's largest duplication. What remains is a 26-word bridge and one
 * link. Do not restore the stages.
 *
 * TERMINOLOGY, RULED: one container-runtime product name must not appear on this page - copy,
 * metadata, alt text, hidden text, or any content object read in here. Say "container platforms" or
 * "enterprise platform modernization". The term and reasoning are in CLAUDE_HANDOFF.md.
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OperationsRoomPreview } from "@/components/operations-room-preview";
import { Portrait } from "@/components/portrait";
import { Section } from "@/components/section";
import { TrackedLink } from "@/components/tracked-link";
import { homeArticles } from "@/content/home";
import { professionalGraph, resume } from "@/content/site";

/** Section 4 — exactly three bodies of work, each with problem, role, proof and outcome. */
const selectedWork = [
  {
    title: "Production agent systems",
    problem:
      "Acting on production takes more than a good model: bounded execution, attributable findings, evaluation before trust, a point where a person decides.",
    role:
      "I took an enterprise SRE investigation agent from thesis to production, and owned it end to end: architecture, engineering, integration, evaluation, operationalization.",
    proof: "Reference architecture, evaluation gates, and the governed tool-call model.",
    outcome:
      "The model was the easy part. Keeping its context current and its actions answerable was the work.",
    href: "/work",
    linkLabel: "See the operating record",
    status: "Production experience"
  },
  {
    title: "The operational context layer",
    problem:
      "Under pressure, teams rebuild the same four answers by hand: who owns this, what changed, what depends on it, what the transaction did.",
    role:
      "I design the layer that assembles them once, so agents, workflows and engineers reason from the same reality.",
    proof: "Doctrine v1.0, the reference architecture, ten patterns in build order.",
    outcome: "Build context once, or every consumer rebuilds it privately and late.",
    href: "/framework",
    linkLabel: "Read the thesis",
    status: "Public reference architecture"
  },
  {
    title: "Enterprise platform foundations",
    problem:
      "Regulated systems fail across ownership boundaries, where no team sees the whole path. That is where agents are being pointed.",
    role:
      "Fifteen years of it: identity modernization, middleware and B2B integration, container platforms, and observability in financial services.",
    proof: "A zero-downtime OpenID Connect migration across 120+ applications.",
    outcome: "Telemetry volume and operational understanding are not the same thing.",
    // No link: the career bridge directly below this section points at /background with a better
    // label, and two links to the same page 40 words apart is navigation, not evidence.
    status: "Career record"
  }
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
                My work connects live operational context, attributable evidence, and machine reasoning &mdash; so
                every recommended action keeps a clear path back to why.
              </p>

              <p className="mt-5 max-w-2xl border-l-2 border-mint/60 pl-4 text-base leading-7 text-slate-200 sm:pl-5">
                Most recently I took an <strong className="font-semibold text-white">enterprise SRE investigation
                agent from thesis to production</strong>, owning it across architecture, engineering, enterprise
                integration, evaluation and operationalization. That system stays private. What is on this site
                stands on its own.
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

            {/* Editorial portrait: no card, no border box. The image carries the presence and the
                caption sits under it like a byline, so the hero reads as authored rather than filed. */}
            <figure className="m-0 lg:justify-self-end">
              <Portrait size="xl" />
              <figcaption className="mt-5 max-w-xs">
                <p className="text-lg font-semibold leading-7 text-white">{professionalGraph.identity.person}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">Senior Technical Lead &mdash; AIOps &amp; Observability</p>
                <p className="mt-1 text-sm leading-6 text-slate-200">
                  Building evidence-grounded AI systems for enterprise operations.
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {currentRole.organization} &middot; {resume.location} &middot; 15+ years in enterprise engineering
                </p>
                <Link
                  href="/work"
                  className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-mint underline decoration-mint/30 underline-offset-4 hover:decoration-mint"
                >
                  View the work <ArrowRight size={16} />
                </Link>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2 — SIGNATURE THESIS. Eyebrow, short H2, prominent lead, then the concept once. */}
      <section className="border-b border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber sm:text-sm">
            The failure I design against
          </p>
          <h2 className="mt-5 text-[1.75rem] font-semibold leading-tight text-white sm:text-4xl">
            AI agents don&apos;t misfire because they lack intelligence.
          </h2>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-200 sm:text-2xl sm:leading-10">
            They misfire when the operational context beneath them is fragmented, stale, incomplete, or trusted past
            the point where it was still true.
          </p>
          <p className="mt-7 max-w-2xl text-lg leading-9 text-slate-300">
            This is <strong className="font-semibold text-amber">the Authorized Misfire</strong>: an action the
            system was permitted to take, on context it should not have trusted. No rule was broken. What it knew was older or
            thinner than the decision resting on it.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-300">
            Past incidents and runbooks are memory, not current production truth. The layer underneath has to
            rebuild what is happening now, show how the findings connect, keep the unknowns visible, and leave
            anything consequential to a person.
          </p>
          <Link
            href="/wiki/operational-intelligence-canonical-doctrine"
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-base font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
          >
            Read the doctrine, and what would prove it wrong <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* 3 — FLAGSHIP PROOF. The dominant moment on the page. */}
      <Section eyebrow="The Operations Room" title="Watch an investigation hold itself to account.">
        <p className="mb-8 max-w-3xl text-lg leading-9 text-slate-300">
          Ten stages of a synthetic case. Confidence rises, then falls when a contradiction lands. Check the
          reasoning at each stage.
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
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">Proof</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-300">{item.proof}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">Learned</dt>
                    <dd className="mt-2 text-sm leading-7 text-slate-300">{item.outcome}</dd>
                  </div>
                </dl>
                {"href" in item ? (
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
                  >
                    {item.linkLabel} <ArrowRight size={16} />
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {/* Career bridge. The five-stage arc lives on /background; reproducing it here was this
            page's largest duplication. One sentence and one link stand in for it. */}
        <p className="mt-10 max-w-3xl text-lg leading-9 text-slate-300">
          Fifteen years across enterprise integration, identity, container platforms, observability, and production
          AI shaped one operating principle: context must be current, attributable, and safe to act on.
        </p>
        <Link
          href="/background"
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
        >
          See how the judgment formed <ArrowRight size={16} />
        </Link>
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
        <Link
          href="/patterns"
          className="mt-9 inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
        >
          The ten architecture patterns, in build order <ArrowRight size={16} />
        </Link>
      </Section>

      {/* 7 — CLOSING INVITATION. One primary action. */}
      <section className="border-t border-white/10 bg-white/[0.015]">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            If you are putting agents near production, I would like to hear how it is going.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-300">
            Hiring for Staff, Principal, architecture, AI systems or observability leadership. Building production
            agent systems. Organizing a conference or engineering forum. Or wanting a second opinion before putting
            an agent somewhere that matters.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-9 text-slate-300">
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

          </div>
        </div>
      </section>
    </>
  );
}
