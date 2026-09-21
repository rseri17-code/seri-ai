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
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/card";
import { CodebaseMemoryIllustration } from "@/components/codebase-memory-illustration";
import { projectProof, projects } from "@/content/site";

const SLUG = "codebase-memory";

export function generateMetadata(): Metadata {
  const project = projects.find((item) => item.slug === SLUG);

  return {
    title: project ? `${project.name} | seri.ai Projects` : "Projects | seri.ai",
    description: project?.summary,
    alternates: { canonical: `/projects/${SLUG}` },
    openGraph: project
      ? {
          title: project.name,
          description: project.summary,
          url: `/projects/${SLUG}`
        }
      : undefined
  };
}

const ideas = [
  {
    name: "Code graph",
    body: "A code graph is how a fresh agent locates implementations and dependencies instead of grepping until something compiles. Nodes are the modules that matter for the task. Edges are the calls and ownership of policy — who retries, who maps errors, who is allowed to change a contract."
  },
  {
    name: "Engineering memory",
    body: "Engineering memory is not a transcript of prior chat. It is a retrieved, evidence-linked lesson: what was decided, why, when it is safe to reuse, and what would invalidate it. A lesson without those conditions is just a rumor with better formatting."
  },
  {
    name: "Freshness checks",
    body: "Freshness checks watch the supporting source a lesson depends on. If that source moves, the lesson is no longer licensed for reuse. The flag is narrow on purpose: it says the evidence under the lesson has shifted. It does not claim the new behavior is known."
  },
  {
    name: "Verification",
    body: "Verification is how behavior is established. Tests and runtime evidence answer whether the remembered lesson still describes the system. Freshness can demand that check. Only verification can close it."
  }
] as const;

export default function CodebaseMemoryPage() {
  const project = projects.find((item) => item.slug === SLUG);
  const proof = projectProof.items.find((item) => item.slug === SLUG);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber">{project.status}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">{project.name}</h1>
      <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-300">Context that survives the next session.</p>
      <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-200">
        Each new coding agent rediscovers work that earlier sessions already established: where the implementation
        lives, which decisions were already made, and which lessons were already paid for. The next session starts
        cold, repeats the search, and can reintroduce a mistake the previous one had already named.
      </p>

      <section className="mt-16" aria-labelledby="connected-ideas">
        <h2 id="connected-ideas" className="text-3xl font-semibold tracking-tight text-white">
          Four connected ideas, not four features.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          The pattern holds only as a chain. A graph without memory is a map with no history. Memory without freshness
          is a confident stale note. Freshness without verification is a warning with no verdict.
        </p>
        <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {ideas.map((idea, index) => (
            <li key={idea.name} className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-8">
              <p className="font-mono text-sm text-mint">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-2xl font-semibold text-white">{idea.name}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-300">{idea.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="why-it-matters">
        <h2 id="why-it-matters" className="text-3xl font-semibold tracking-tight text-white">
          Why it matters to the next session.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          A fresh agent that can use this chain does three ordinary, high-leverage things. It locates the relevant
          code instead of reconstructing the tree by trial. It reuses a validated lesson instead of rediscovering the
          same constraint. And it recognizes when a previous lesson needs revalidation because the source underneath
          it moved.
        </p>
      </section>

      <div className="mt-16">
        <CodebaseMemoryIllustration />
      </div>

      <section className="mt-16" aria-labelledby="implemented-pattern">
        <h2 id="implemented-pattern" className="text-3xl font-semibold tracking-tight text-white">
          The implemented pattern.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          This case study describes an engineering-memory pattern for coding agents. It is separate from Operational
          Intelligence doctrine. The public-safe shape is:
        </p>
        <ul className="mt-8 space-y-5 text-lg leading-8 text-slate-300">
          <li>
            <strong className="font-semibold text-white">Structural discovery.</strong> Build a task-scoped code graph
            so implementations and dependencies can be located without treating the whole repository as context.
          </li>
          <li>
            <strong className="font-semibold text-white">Task-specific capability guides.</strong> Retrieve a short
            guide for the job at hand — where policy lives, which module is allowed to change it — instead of a generic
            dump of prior chat.
          </li>
          <li>
            <strong className="font-semibold text-white">Evidence-linked lessons.</strong> Keep lessons attached to the
            source that supports them, with explicit reuse conditions and invalidation conditions.
          </li>
          <li>
            <strong className="font-semibold text-white">Source-freshness checks.</strong> Flag when that supporting
            source has changed, so a stale lesson cannot be reused as if it were current.
          </li>
          <li>
            <strong className="font-semibold text-white">Bounded fresh-agent testing.</strong> Give a new agent the
            graph, the guide, and the lesson, then check whether it locates the code, respects the lesson, and notices
            when revalidation is required.
          </li>
        </ul>
      </section>

      <section className="mt-16" aria-labelledby="freshness-vs-correctness">
        <h2 id="freshness-vs-correctness" className="text-3xl font-semibold tracking-tight text-white">
          Source freshness is not behavioral correctness.
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
          A freshness check answers one question: did the supporting source change? If it did, the lesson needs
          revalidation. If it did not, the lesson is still eligible for reuse. Neither result proves the software
          still behaves as the lesson describes. Behavioral correctness is established by tests and runtime evidence.
          Mixing those two questions is how a green freshness badge gets mistaken for a passing test.
        </p>
      </section>

      <section className="mt-16" aria-labelledby="what-this-does-not-claim">
        <h2 id="what-this-does-not-claim" className="text-3xl font-semibold tracking-tight text-white">
          What this does not claim.
        </h2>
        <ul className="mt-8 space-y-4 text-lg leading-8 text-slate-300">
          <li>It does not autonomously repair code, and it does not close the loop without a person.</li>
          <li>It does not fully automatically enforce reuse or invalidation across a codebase.</li>
          <li>It does not claim universal coverage of languages, repositories, or agent products.</li>
          <li>It does not claim measured token savings or productivity gains.</li>
        </ul>
      </section>

      {proof ? (
        <section className="mt-16" aria-labelledby="proof-ledger">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Public proof claim</p>
            <h2 id="proof-ledger" className="mt-3 text-2xl font-semibold text-white">
              What can be inspected, and what it does not prove.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-200">{proof.claim}</p>
            <div className="mt-6 grid gap-3">
              {[
                ["Inspectable evidence", proof.evidence],
                ["Boundary", proof.limitation],
                ["Next proof", proof.nextProof],
                ["Reviewer question", proof.reviewQuestion]
              ].map(([label, body]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{body}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      ) : null}

      <p className="mt-12 max-w-3xl text-base leading-7 text-slate-400">
        Adjacent, not duplicate: Operational Memory is the operational-knowledge pattern. This page is an
        engineering-memory case study for coding agents.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/work"
          className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
        >
          Back to Work <ArrowRight size={16} />
        </Link>
        <Link
          href="/projects"
          className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-mint underline decoration-mint/35 underline-offset-4 hover:decoration-mint"
        >
          All projects <ArrowRight size={16} />
        </Link>
        <Link
          href="/patterns/operational-memory"
          className="inline-flex min-h-[44px] items-center gap-2 font-semibold text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white"
        >
          Operational Memory pattern <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
