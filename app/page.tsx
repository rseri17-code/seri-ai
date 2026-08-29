import Link from "next/link";
import { ArrowRight, BrainCircuit, ClipboardCheck, GitBranch, Linkedin, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { HeroIntelligenceMap } from "@/components/hero-intelligence-map";
import { Portrait } from "@/components/portrait";
import { Section } from "@/components/section";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import { homeArticles, homeCategoryContrast, homeEvalReport, homeFalsificationTests, homeHarnessThesis, homeMobileArtifactSignals, homeOperatingRules, homeOperatorOriginProof, homePatterns, homePrimaryPaths, homeProfileLinks, homeReviewerPaths } from "@/content/home";
import { professionalGraph, resume } from "@/content/site";

const proofStrip = [
  ["Doctrine", "Definition, boundaries, ten-layer model, glossary, and references."],
  ["Architecture", "Contracts, schemas, state machines, approval gates, and conformance levels."],
  ["Operations Room", "A synthetic-case investigation instrument for evidence, replay, hypotheses, and review."],
  ["Ask Ravi", "An AI assistant over the public work. It cites what it knows and names what it does not."]
];











const inspectionLedger = [
  ["/work", "Visitor Proof Map", "The fastest path through Ravikanth Seri's work, GitHub, resume, and Operational Intelligence thesis."],
  ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine v1.0", "What Operational Intelligence claims, and where the claim stops."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "Precise enough to build from: contracts, schemas, and gates."],
  ["/investigation-room", "Operations Room", "A synthetic incident you can work end to end, including what the evidence missed."],
  ["/ask", "Trust Evals", `${homeEvalReport.fixtures.length} fixtures checking whether Ask stays grounded, refuses well, and cites.`],
  ["/framework", "Thesis Radar", "Where the market is moving, and what would prove the thesis wrong."],
  ["/library", "Publishing System", "Everything written down, searchable and cited well enough to reuse."],
  ["/work", "Public Work", "Fifteen years of it, with the proof attached."]
] as const;

const professionalSnapshot = [
  {
    title: "Who is Ravikanth?",
    href: "/background",
    body: `${professionalGraph.identity.person} is a ${professionalGraph.identity.siteRole} with a career that runs from enterprise integration to production AI systems.`
  },
  {
    title: "How has the career evolved?",
    href: "/background",
    body: professionalGraph.careerEvolution.map((item) => item.stage).join(" → ")
  },
  {
    title: "What has he built?",
    href: "/work",
    body: "Operational Intelligence doctrine, reference architecture, the Operations Room, Ask Ravi, the Evidence Pack, and public technical writing."
  },
  {
    title: "What is he building now?",
    href: "/now",
    body: professionalGraph.identity.currentFocus
  },
  {
    title: "What does he specialize in?",
    href: "/framework",
    body: "Production AI-assisted operations, agentic SRE, observability, transaction intelligence, runtime governance, and evaluation."
  },
  {
    title: "Why work with him?",
    href: "/contact",
    body: "He brings production systems judgment, public-safe technical writing, reusable architectures, and evidence-led thinking."
  }
] as const;











export default function Home() {
  return (
    <>
      <section className="grid-bg border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 sm:py-8 lg:min-h-[90vh] lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-mint/25 bg-mint/[0.06] px-4 py-2 text-sm font-semibold text-mint">
              <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_16px_rgba(95,242,181,0.9)]" />
              <span className="flex flex-col leading-tight">
                <span>Ravikanth Seri / Operational Intelligence</span>
                <span className="text-[0.7rem] font-medium tracking-[0.12em] text-mint/80">Senior infrastructure and AI systems engineer</span>
              </span>
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              AI agents don&apos;t misfire because they lack intelligence.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              They misfire because the operational context beneath them is fragmented, stale, or incomplete. I build the context
              layer and the harness that runs on it &mdash; for enterprise SRE and platform teams putting agents near production,
              where a wrong action has an owner and a blast radius. A public operating model for AI-native operations, so an agent
              reasons from attributable evidence instead of filling gaps with inference.
            </p>
            <p className="mt-4 max-w-3xl rounded-lg border border-amber/25 bg-amber/[0.05] p-4 text-base leading-7 text-slate-200">
              <span className="font-semibold text-amber">The Authorized Misfire.</span> The failure I design against is a
              misfire because they lack intelligence: an action the system was permitted to take, grounded in context it should
              not have trusted. Historical incidents and runbooks are valuable memory. They are not current production truth.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              So the context layer has to reconstruct what is happening now, show how the evidence connects, make uncertainty visible, and keep human judgment in control of anything consequential.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink href="/work" eventName="homepage_cta_click" eventProperties={{ cta: "start_here" }} className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Begin with the proof path <ArrowRight size={18} />
              </TrackedLink>
              <TrackedLink href="/investigation-room" eventName="homepage_cta_click" eventProperties={{ cta: "enter_operations_room" }} className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
                Open the Operations Room
              </TrackedLink>
              <TrackedLink href="/wiki/operational-intelligence-canonical-doctrine" eventName="homepage_cta_click" eventProperties={{ cta: "read_doctrine" }} className="inline-flex min-h-[24px] items-center gap-2 px-1 py-3 font-semibold text-slate-300 underline decoration-white/25 underline-offset-4 hover:text-white">
                Challenge the doctrine
              </TrackedLink>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              I most recently took an enterprise SRE investigation agent from thesis to production, owning it across architecture,
              engineering, enterprise integration, evaluation and operationalization. That work is not public.{" "}
              Everything here is inspectable without access to private systems.
            </p>
            <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <Portrait size="lg" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Ravikanth Seri</p>
                  <h2 className="mt-2 text-2xl font-semibold leading-7 text-white">
                    I build the part of operations that keeps context alive when judgment matters most.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                    Fifteen-plus years across distributed systems, identity, observability, and regulated financial-services operations showed me the same failure on repeat: at the worst moment, the team is rebuilding who owns this,
                    what changed, and what depends on it. seri.ai is where I work that out in public, so the judgment is inspectable and reusable.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {professionalGraph.proofLinks.slice(0, 3).map((item) => (
                      <Link key={item.href} href={item.href} className="rounded border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-mint/40 hover:text-mint">
                        {item.label}
                      </Link>
                    ))}
                    <TrackedAnchor
                      href={homeProfileLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      eventName="profile_link_click"
                      eventProperties={{ destination: "linkedin", placement: "homepage_hero_identity" }}
                      className="rounded border border-white/10 bg-white/[0.035] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-signal/40 hover:text-signal"
                    >
                      LinkedIn
                    </TrackedAnchor>
                  </div>
                  <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Career arc</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {homeOperatorOriginProof.map(([label, proof]) => (
                      <div key={label} className="rounded border border-white/10 bg-white/[0.035] p-3">
                        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-mint">{label}</p>
                        <p className="mt-2 text-xs leading-5 text-slate-300">{proof}</p>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-2 rounded-lg border border-white/10 bg-black/20 p-3 lg:hidden">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Decision packet preview</p>
                <p className="font-mono text-xs text-mint">OI-ROOM-001</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {homeMobileArtifactSignals.map(([label, value]) => (
                  <div key={label} className="rounded border border-white/10 bg-white/[0.04] px-3 py-2">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
            <div className="hidden lg:block lg:self-center">
              <HeroIntelligenceMap />
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Category boundary and falsification tests" title="What it replaces, what it does not, and what would prove it wrong.">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="p-0">
            <div className="border-b border-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">What it replaces, and what it does not</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                The point is not to rename observability, chat, or incident tracking. The point is to make the operational decision itself inspectable.
              </p>
            </div>
            <details className="group">
              <summary className="cursor-pointer list-none border-b border-white/10 px-5 py-3 text-sm font-semibold text-mint marker:hidden hover:bg-white/[0.03]">
                Compare against dashboards, chat, tickets and runbooks
                <span className="ml-2 font-normal text-slate-500 group-open:hidden">Expand</span>
                <span className="ml-2 hidden font-normal text-slate-500 group-open:inline">Collapse</span>
              </summary>
            <div className="divide-y divide-white/10">
              {homeCategoryContrast.map(([mode, promise, limitation]) => (
                <div key={mode} className={`grid gap-3 p-4 md:grid-cols-[0.6fr_0.8fr_1.2fr] ${mode === "Operational Intelligence" ? "bg-mint/[0.045]" : ""}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{mode}</p>
                  <h2 className="text-base font-semibold text-white">{promise}</h2>
                  <p className="text-sm leading-6 text-slate-300">{limitation}</p>
                </div>
              ))}
            </div>
            </details>
          </Card>
          <Card className="border-amber/25 bg-amber/[0.045]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">What would make the thesis credible or wrong.</p>
            <div className="mt-5 grid gap-3">
              {homeFalsificationTests.map(([value, label]) => (
                <div key={value} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="font-semibold text-white">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Reference system" title="Inspect the work.">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <Card className="border-signal/25 bg-signal/[0.045] p-5">
            <ShieldCheck className="mb-5 text-signal" />
            <h3 className="text-2xl font-semibold text-white md:text-3xl">Inspection is part of the public record.</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">
              The thesis is exposed through definitions, contracts, synthetic evidence, evaluation gates, public work, and source-linked publishing. A visitor should be able to challenge the model without needing private systems or confidential examples.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {proofStrip.map(([value, label]) => (
                <div key={value} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-base font-semibold text-white">{value}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <TrackedAnchor
                href={homeProfileLinks.github}
                target="_blank"
                rel="noreferrer"
                eventName="profile_link_click"
                eventProperties={{ destination: "github", placement: "homepage_reference_system" }}
                className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-3 text-sm font-semibold text-white"
              >
                GitHub <ArrowRight size={15} />
              </TrackedAnchor>
              <TrackedAnchor
                href={homeProfileLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                eventName="profile_link_click"
                eventProperties={{ destination: "linkedin", placement: "homepage_reference_system" }}
                className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-3 text-sm font-semibold text-white"
              >
                LinkedIn <Linkedin size={15} />
              </TrackedAnchor>
              <Link href="/rss.xml" className="inline-flex items-center gap-2 rounded border border-mint/40 px-4 py-3 text-sm font-semibold text-mint">
                RSS <ArrowRight size={15} />
              </Link>
            </div>
          </Card>
          <Card className="p-0">
          <div className="border-b border-white/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Inspection ledger</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">Each artifact answers a different question in the public proof path.</p>
            </div>
            <div className="divide-y divide-white/10">
            {inspectionLedger.map(([href, title, body]) => (
              <Link key={href} href={href} className="grid gap-2 p-4 transition hover:bg-white/[0.035] md:grid-cols-[0.42fr_1fr_auto] md:items-center">
                <h2 className="text-base font-semibold text-white">{title}</h2>
                <p className="text-sm leading-6 text-slate-300">{body}</p>
                <ArrowRight size={16} className="text-mint" />
              </Link>
            ))}
            </div>
          </Card>
        </div>
      </Section>

      <p className="mx-auto max-w-7xl px-4 pb-3 text-xs leading-6 text-slate-500 sm:px-6 lg:px-8">
        Public thesis stream: {"Ravikanth Seri's public writing and working notes"}. LinkedIn thesis ledger: The public posts are treated as working notes for the doctrine, not as social proof.
      </p>

      <Section eyebrow="Professional snapshot" title="The fast answer to who Ravikanth Seri is.">
        <p className="mb-4 max-w-4xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          A visitor should be able to find his summary, current focus, career progression, experience, selected accomplishments,
          selected work, technical domains, leadership, publications, GitHub, certifications, education, resume, LinkedIn,
          and contact information without hunting across the site.
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Link href="/resume" className="block md:col-span-2 xl:col-span-1">
            <Card className="border-mint/25 bg-mint/[0.045] p-5 transition hover:border-mint/45">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Current role</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{professionalGraph.identity.person}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{resume.summary}</p>
              <div className="mt-4 grid gap-2 text-xs leading-5 text-slate-400 sm:grid-cols-2">
                <p>Location: {resume.location}</p>
                <p>Current focus: {professionalGraph.identity.currentFocus}</p>
                <p>Proof: Resume, GitHub, LinkedIn</p>
                <p>More evidence: certifications and education</p>
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-signal">Open the resume</p>
            </Card>
          </Link>
          {professionalSnapshot.map((item) => (
            <Link key={item.title} href={item.href} className="block">
              <Card className="p-5 transition hover:border-signal/40">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{item.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.body}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-mint">Inspect evidence</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Start here" title="Five stops, about ten minutes. Start anywhere; this order builds fastest.">
        <div className="grid gap-4 lg:grid-cols-3">
          {homePrimaryPaths.map((path) => (
            <Link key={path.href} href={path.href}>
              <Card className="h-full transition hover:-translate-y-1 hover:border-mint/40">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{path.label}</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{path.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{path.body}</p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint">Open <ArrowRight size={15} /></p>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {homeReviewerPaths.map(([role, href, artifact, question]) => (
            <Link key={role} href={href}>
              <Card className="h-full p-4 transition hover:border-signal/40">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{role}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{artifact}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{question}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Point of view" title={homeHarnessThesis.headline}>
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-signal/30 bg-signal/[0.055]">
            <BrainCircuit className="mb-5 text-signal" />
            <h3 className="text-3xl font-semibold text-white">The model is not the moat. The operating harness is.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">{homeHarnessThesis.statement}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {homeHarnessThesis.loop.map((step) => (
                <span key={step} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase text-slate-300">
                  {step}
                </span>
              ))}
            </div>
          </Card>
          <div className="grid gap-3 md:grid-cols-3">
            {homeOperatingRules.map(([title, body]) => (
              <Card key={title} className="p-5">
                <ShieldCheck className="mb-4 text-mint" />
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>




      <Section eyebrow="Current work" title="Field notes and reusable patterns.">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <ClipboardCheck className="mb-5 text-signal" />
            <h3 className="text-2xl font-semibold text-white">Latest field notes</h3>
            <div className="mt-5 grid gap-3">
              {homeArticles.map((article) => (
                <Link key={article.slug} href={`/ideas/${article.slug}`} className="rounded border border-white/10 bg-black/20 p-4 transition hover:border-mint/40">
                  <p className="text-xs font-semibold uppercase text-mint">{article.theme}</p>
                  <h4 className="mt-2 font-semibold text-white">{article.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{article.dek}</p>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <GitBranch className="mb-5 text-mint" />
            <h3 className="text-2xl font-semibold text-white">Architecture patterns</h3>
            <div className="mt-5 grid gap-3">
              {homePatterns.map((pattern) => (
                <Link key={pattern.slug} href={`/patterns/${pattern.slug}`} className="rounded border border-white/10 bg-black/20 p-4 transition hover:border-signal/40">
                  <h4 className="font-semibold text-white">{pattern.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{pattern.description}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Reasons to get in touch" title="What a useful conversation usually looks like.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["Speaking", "Conferences and internal engineering forums on agentic operations, evidence-grounded investigation, and what actually breaks between proof of concept and production."],
            ["Advisory", "Teams putting agents into regulated production who need the context and governance layer designed before the model choice."],
            ["Collaboration", "Practitioners building in the same space. Shared vocabulary is worth more to me than agreement."],
            ["Practitioner review", "Tell me where the doctrine is wrong. Structured, public-safe, and no external verdicts have been published yet."],
            ["Hiring and interviews", "Principal architect, AI systems, and observability leadership conversations."]
          ].map(([label, body]) => (
            <Link key={label} href="/contact">
              <Card className="h-full p-4 transition hover:border-mint/40">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Ask Ravikanth" title="Ask the public record. Answers cite their sources.">
        <Card className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white">An assistant over everything published here. Public record only.</h3>
            <p className="mt-3 leading-7 text-slate-300">
              It cites what it knows, names what it does not, and will not discuss employer systems. There is no model in the loop:
              retrieval is lexical and answers are assembled deterministically, so the same question returns the same answer.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Worth asking: &ldquo;Is Operational Intelligence just AIOps renamed?&rdquo; &middot; &ldquo;What would falsify the
              thesis?&rdquo; &middot; &ldquo;What has he actually shipped to production?&rdquo;
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/ask" className="rounded bg-white px-5 py-3 font-semibold text-ink">
              Ask Ravikanth
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
              Or talk to him directly <ShieldCheck size={18} />
            </Link>
          </div>
        </Card>
      </Section>
    </>
  );
}
