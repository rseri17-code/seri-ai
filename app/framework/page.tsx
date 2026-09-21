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
import { ArrowRight, BrainCircuit, CheckCircle2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { BatchIntelligenceProof } from "@/components/batch-intelligence-proof";
import { FrameworkArchitectureMap } from "@/components/framework-architecture-map";
import { FrameworkLayerOverview } from "@/components/framework-layer-overview";
import { FrameworkSectionNav } from "@/components/framework-section-nav";
import { FrameworkTeacher } from "@/components/framework-teacher";
import { Section } from "@/components/section";
import { TechnicalReviewPath } from "@/components/technical-review-path";
import { operationalIntelligenceFramework, thesisRadar } from "@/content/site";

export const metadata: Metadata = {
  title: "Operational Intelligence Framework | Ravikanth Seri",
  description:
    "Ravikanth Seri's ten-layer Operational Intelligence Framework for evidence-backed Agentic SRE, investigations you can replay, quality-checked agents, and human-reviewed action.",
  alternates: { canonical: "/framework" },
  openGraph: {
    title: "Operational Intelligence Framework | Ravikanth Seri",
    description: "The ten-layer framework for turning signals, transactions, topology, evidence, memory, evaluation, and operator control into accountable action.",
    url: "/framework",
    type: "website"
  }
};


const argumentsForCategory = [
  {
    title: "More data is not more understanding",
    body:
      "Modern enterprises do not lack data. They lack a shared way to reason over it. Logs, metrics, traces, changes, system maps, tickets, and customer-journey signals only become useful when they connect to evidence, impact, confidence, and review."
  },
  {
    title: "Alert correlation is not a decision",
    body:
      "Grouping related alerts reduces noise, but operators still need a trail of where the claim came from, a reconstructed timeline, competing explanations, and a reviewable path to action. The useful layer is explanation, not another alert summary."
  },
  {
    title: "Customer journeys are under-modeled",
    body:
      "Enterprise customers experience journeys, not services. Operational Intelligence treats the transaction path as the unit of reasoning so impact can be explained across gateways, APIs, applications, dependencies, and external systems."
  },
  {
    title: "Memory should compound",
    body:
      "Incident investigations repeat when operational learning disappears after the ticket closes. A durable system should remember approved patterns, mitigations, ownership, failure modes, and decisions without leaking confidential implementation detail."
  },
  {
    title: "Quality checks are the control system",
    body:
      "Enterprise AI quality cannot be based on vibes. Replay, source coverage, refusal behavior, confidence that can fall, and knowing when to escalate are the checks before anything is trusted in operations."
  },
  {
    title: "Evidence must become infrastructure",
    body:
      "The future system is not a transcript plus a model answer. It is a record of what was seen, what was inferred, what is missing, how to re-run the same case, and what a person approved — so operators can inspect it."
  },
  {
    title: "Humans remain accountable",
    body:
      "AI should accelerate investigation, reduce ambiguity, and prepare decisions. Humans should own high-impact actions, especially when evidence is partial, risk is high, or the action is difficult to reverse."
  }
];

export default function FrameworkPage() {
  return (
    <>
      <Section eyebrow="Operational Intelligence" title="The context layer, and the loop that runs on it." level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.05]">
            <BrainCircuit className="mb-5 text-mint" />
            <p className="text-3xl font-semibold text-white">{operationalIntelligenceFramework.subtitle}</p>
            <p className="mt-4 text-lg leading-8 text-slate-300">{operationalIntelligenceFramework.promise}</p>
            <p className="mt-5 rounded border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
              {operationalIntelligenceFramework.thesis}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/investigation-room" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Run the Operations Room <ArrowRight size={18} />
              </Link>
              <Link href="/library" className="inline-flex items-center gap-2 rounded border border-signal/40 px-5 py-3 font-semibold text-signal">
                View the Map
              </Link>
            </div>
          </Card>
          <Card>
            <p className="text-xs font-semibold uppercase text-slate-400">Operator questions</p>
            <div className="mt-4 grid gap-3">
              {operationalIntelligenceFramework.operatorQuestions.map((question, index) => (
                <Link key={question} href={`/ask?prompt=${encodeURIComponent(question)}`} className="flex items-start gap-3 rounded border border-white/10 bg-black/20 p-3 transition hover:border-signal/40">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded border border-mint/30 bg-mint/10 font-mono text-xs text-mint">
                    {index + 1}
                  </span>
                  <p className="leading-7 text-slate-200">{question}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <FrameworkArchitectureMap />
      <FrameworkSectionNav />

      <Section eyebrow="The two halves" title="What has to exist beneath an agent, and what the agent has to do with it.">
        <p className="max-w-4xl text-base leading-7 text-slate-300">
          These are the same argument at two altitudes. The context layer is the shared foundation: maintained once, used by everything.
          The harness is the loop that runs on top of it. An Authorized Misfire &mdash; an action the system was permitted to take
          on context it should not have trusted &mdash; is what happens when the loop reads a foundation nobody kept current.
        </p>

        <Card className="mt-5 p-4 sm:p-6">
          <div id="context-layer" className="scroll-mt-40">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">One &mdash; the shared foundation</p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">The Enterprise Context Layer</h3>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            This is the Context Acquisition Tax &mdash; the cost of reconstructing who owns this, what changed, what depends on it,
            and what the transaction did, every time, because no shared layer already knows. Today every engineer, every workflow
            and every agent pays it independently, each one pulling separately from asset inventory, observability, identity, ticketing, deployment pipelines, and
            the system map. Time spent reconstructing context is time not spent solving the problem.
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            The alternative is to treat operational reality as shared infrastructure &mdash; one governed, auditable, continuously
            maintained representation of ownership, topology, dependencies, changes, transactions, state and history &mdash; and let
            humans, workflows, automation and agents all consume the same thing.
          </p>
          <figure className="mt-5">
            <picture>
              <source srcSet="/diagrams/enterprise-context-layer.webp" type="image/webp" />
              <img
                src="/diagrams/enterprise-context-layer.jpg"
                alt="Diagram titled Enterprise Context Layer. On the left, current state: six fragmented sources including CMDB, observability, identity, ServiceNow, CI/CD and topology connect by tangled lines to engineers, workflows, operations and AI agents, labelled the Context Acquisition Tax. In the centre, an Enterprise Context Layer maintains a single representation of operational reality covering ownership, topology, dependencies, changes, transactions, state and history, consumed by humans, workflows, automation and AI agents, and marked governed, secure, auditable and always current. On the right, future-state outcomes: trusted operational context, faster investigations, better decisions, reliable automation, cross-agent continuity and operational intelligence."
                loading="lazy"
                className="w-full max-w-3xl rounded-lg border border-white/10"
              />
            </picture>
          </figure>
          <p className="mt-4 max-w-3xl border-l-2 border-signal/50 pl-4 text-base italic leading-7 text-slate-200">
            Reasoning improves with every model. Context improves only when you maintain it.
          </p>
          </div>
        </Card>

        <div id="batch" className="scroll-mt-40">
          <BatchIntelligenceProof />
        </div>

        <Card className="mt-4 p-4 sm:p-6">
          <div id="harness" className="scroll-mt-40">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Two &mdash; the loop</p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">The SRE Agent Harness</h3>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            An incident fires and the agent reads the current operations data, the system map, and the configuration &mdash; that
            step is where it reads the context layer. It reasons toward a probable cause, captures what it observed in what sequence
            and with what confidence, then asks whether this has happened before.
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            What happens after the incident closes is what separates this from a faster search. Operational memory records what actually worked in
            production rather than what the runbook claims, every outcome counts as a data point whether it succeeded, failed or
            partly worked, and the harness writes those results back. That write-back is what keeps the context layer current, which
            is why these two diagrams are one system rather than two.
          </p>
          <figure className="mt-5">
            <picture>
              <source srcSet="/diagrams/sre-agent-harness-architecture.webp" type="image/webp" />
              <img
                src="/diagrams/sre-agent-harness-architecture.jpg"
                alt="Diagram titled SRE Agent Harness Architecture, subtitled how operational experience becomes operational intelligence. Eight stages run left to right: incident trigger, grounding layer, RCA investigation, evidence capture, pattern intelligence, operational memory, recovery outcome and learning update. Beneath them a long-term operational memory store holds incident history, failure patterns, dependency behaviour, recovery knowledge, outcome intelligence and a pattern index for similarity search. A continuous learning loop feeds back so the next incident starts with accumulated operational experience."
                loading="lazy"
                className="w-full max-w-3xl rounded-lg border border-white/10"
              />
            </picture>
          </figure>
          <p className="mt-4 max-w-3xl border-l-2 border-mint/50 pl-4 text-base italic leading-7 text-slate-200">
            Reasoning solves the current incident. Learning improves the next one.
          </p>
          </div>
        </Card>
      </Section>

      <Section id="taxonomy" eyebrow="How the material is indexed" title="Ten layers, used for filing rather than for arguing.">
        <p className="max-w-4xl text-base leading-7 text-slate-300">
          The harness above is the model. These ten layers are the filing system underneath it: every published note,
          pattern and artifact on this site is tagged to one of them, which is how search and related-reading
          work. They are a filing system, not a competing architecture &mdash; if the two ever disagree, the harness wins.
        </p>
        <div className="mt-5">
          <FrameworkLayerOverview />
        </div>
        <div className="mt-5">
          <FrameworkTeacher />
        </div>
      </Section>

      <Section eyebrow="The argument" title="Why this needs to be a layer rather than a feature.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {argumentsForCategory.slice(0, 3).map((entry) => (
            <Card key={entry.title} className="h-full p-5">
              <h3 className="text-lg font-semibold leading-7 text-white sm:text-xl">{entry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{entry.body}</p>
            </Card>
          ))}
        </div>
        {argumentsForCategory.length > 3 ? (
          <details className="group mt-4">
            <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center text-sm font-semibold text-mint marker:hidden">
              {argumentsForCategory.length - 3} further reasons
              <span className="ml-2 font-normal text-slate-400 group-open:hidden">Show</span>
              <span className="ml-2 hidden font-normal text-slate-400 group-open:inline">Hide</span>
            </summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {argumentsForCategory.slice(3).map((entry) => (
                <Card key={entry.title} className="h-full p-5">
                  <h3 className="text-lg font-semibold leading-7 text-white sm:text-xl">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{entry.body}</p>
                </Card>
              ))}
            </div>
          </details>
        ) : null}
      </Section>

      <Section id="evaluation" eyebrow="Design rules" title="How the framework should constrain systems.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CheckCircle2 className="mb-5 text-mint" />
            <h3 className="text-2xl font-semibold text-white">Design principles</h3>
            <div className="mt-4 grid gap-2">
              {operationalIntelligenceFramework.designPrinciples.map((principle) => (
                <div key={principle} className="rounded border border-white/10 bg-black/20 p-3 text-sm font-semibold text-slate-200">
                  {principle}
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <ShieldCheck className="mb-5 text-signal" />
            <h3 className="text-2xl font-semibold text-white">Evaluation criteria</h3>
            <div className="mt-4 grid gap-2">
              {operationalIntelligenceFramework.evaluationCriteria.map((criterion) => (
                <div key={criterion} className="rounded border border-white/10 bg-black/20 p-3 text-sm font-semibold text-slate-200">
                  {criterion}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>
      <Section eyebrow="Review path" title="How to challenge the framework.">
        <TechnicalReviewPath />
      </Section>

      <Section id="falsifiers" eyebrow="Where the market is moving" title="Every claim below is paired with what would prove it wrong.">
        <p className="max-w-4xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
          A market moving the same direction is a signal, not a confirmation. The last column is the one that matters &mdash; what
          would have to show up for the claim to be wrong. Updated {thesisRadar.updatedAt}.
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-amber">
          Evidence posture. These signals do not prove Operational Intelligence as a finished category. They show the market
          moving toward the same problem.
        </p>
        <details className="group mt-4">
          <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center text-sm font-semibold text-mint marker:hidden">
            {thesisRadar.proofChain.length} market signals, each paired with its falsifier
            <span className="ml-2 font-normal text-slate-400 group-open:hidden">Show</span>
            <span className="ml-2 hidden font-normal text-slate-400 group-open:inline">Hide</span>
          </summary>
        <Card className="mt-4 p-0">
          <div className="divide-y divide-white/10">
            {thesisRadar.proofChain.map((item) => (
              <div key={item.theme} className="grid min-w-0 gap-4 p-4 sm:p-5 md:grid-cols-2 lg:grid-cols-[0.8fr_1fr_1fr]">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{item.theme}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.marketSignal}</p>
                </div>
                <div className="min-w-0 rounded border border-mint/20 bg-mint/[0.045] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint">What this layer claims</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.operationalClaim}</p>
                </div>
                <div className="min-w-0 rounded border border-amber/25 bg-amber/[0.045] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">Falsification</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.falsificationQuestion}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        </details>
      </Section>

    </>
  );
}
