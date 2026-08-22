import Link from "next/link";
import { ArrowRight, BrainCircuit, ClipboardCheck, FileText, GitBranch, Linkedin, Network, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { HeroIntelligenceMap } from "@/components/hero-intelligence-map";
import { ProfileMark } from "@/components/profile-mark";
import { Section } from "@/components/section";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import { homeArticles, homeBuilderDna, homeCategoryContrast, homeEvalReport, homeFalsificationTests, homeHarnessThesis, homeHeroBuilderProof, homeHeroFlow, homeLinkedInSignals, homeMobileArtifactSignals, homeOperatingRules, homeOperatorOriginProof, homePatterns, homePrimaryPaths, homeProfileLinks, homeReferenceAssets, homeReviewerPaths } from "@/content/home";

const proofStrip = [
  ["Doctrine", "Definition, boundaries, ten-layer model, glossary, and references."],
  ["Architecture", "Contracts, schemas, state machines, approval gates, and conformance levels."],
  ["Operations Room", "A public-safe investigation instrument for evidence, replay, hypotheses, and review."],
  [`${homeEvalReport.fixtures.length}/${homeEvalReport.fixtures.length}`, "Ask Ravi trust fixtures currently passing."]
];











const inspectionLedger = [
  ["/start-here", "Visitor Proof Map", "The fastest public-safe path through Ravikanth Seri's career, work, current focus, writing, GitHub, resume, contact path, and Operational Intelligence thesis."],
  ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine v1.0", "Definition, boundaries, ten layers, glossary, and claim posture."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "Contracts, state machines, schemas, gates, and conformance levels."],
  ["/investigation-room", "Operations Room", "Synthetic investigation with evidence graph, replay, contradiction, missing evidence, and approval."],
  ["/evals", "Trust Evals", `${homeEvalReport.fixtures.length} deterministic fixtures covering grounding, refusal, routing, and citations.`],
  ["/radar", "Thesis Radar", "Market signals for AI observability, ops for observability, AgentOps, AIOps evaluation, and operational readiness."],
  ["/library", "Publishing System", "Searchable, cited, linked assets connected to framework layers, patterns, RSS, and Ask retrieval."],
  ["/work", "Public Work", "Public-safe experience, systems judgment, resume proof, GitHub, LinkedIn, and current work."]
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
              Operational Intelligence reference system by Ravikanth Seri
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Operations should explain themselves before AI acts.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              seri.ai publishes the doctrine, reference architecture, investigation artifacts, and evaluation harness for Operational Intelligence: the discipline of turning telemetry, topology, transactions, change, memory, and evaluation into evidence-backed operational judgment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink href="/start-here" eventName="homepage_cta_click" eventProperties={{ cta: "start_here" }} className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Start here <ArrowRight size={18} />
              </TrackedLink>
              <TrackedLink href="/investigation-room" eventName="homepage_cta_click" eventProperties={{ cta: "enter_operations_room" }} className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
                Run OI-ROOM-001
              </TrackedLink>
              <TrackedLink href="/wiki/operational-intelligence-canonical-doctrine" eventName="homepage_cta_click" eventProperties={{ cta: "read_doctrine" }} className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Read the doctrine
              </TrackedLink>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              The material is public-safe by design: synthetic cases, cited sources, explicit uncertainty, and no private operational details.
            </p>
            <div className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4 shadow-[0_18px_70px_rgba(0,0,0,0.24)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <ProfileMark />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Field origin</p>
                  <h2 className="mt-2 text-xl font-semibold leading-7 text-white">
                    The thesis is grounded in a practical failure pattern: teams lose shared context at the exact moment operational judgment matters most.
                  </h2>
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
            <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Operational Intelligence loop</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-200">
                {homeHeroFlow.map((step, index) => (
                  <span key={step} className="inline-flex items-center gap-2">
                    <span className={index === 0 ? "text-mint" : index === homeHeroFlow.length - 1 ? "text-amber" : "text-white"}>{step}</span>
                    {index < homeHeroFlow.length - 1 ? <span className="text-slate-600">/</span> : null}
                  </span>
                ))}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                The thesis is narrow on purpose: AI should help operators reason from evidence, preserve uncertainty, and keep consequential change under accountable human control.
              </p>
            </div>
            <div className="mt-5 hidden gap-2 lg:grid lg:grid-cols-3">
              {homeHeroBuilderProof.map(([label, proof]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{proof}</p>
                </div>
              ))}
            </div>
            </div>
            <div className="hidden lg:block lg:self-center">
              <HeroIntelligenceMap />
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Public thesis stream" title="The posts converge on one enterprise failure mode: operational context is recreated instead of owned.">
        <Card className="border-mint/25 bg-mint/[0.045] p-5">
          <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <Linkedin className="mb-5 text-mint" />
              <h3 className="text-2xl font-semibold text-white md:text-3xl">The context layer has to outlive the incident, the prompt, and the person carrying the thread.</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">
                Ravikanth&apos;s public writing keeps returning to the same operational gap: agents cannot become trustworthy investigators if ownership, change, dependency, transaction, confidence, and missing evidence are rediscovered from scratch every time.
                The same thread connects Ops for observability with Observability for AI: telemetry systems need operating discipline, and AI systems need evidence, traces, cost, grounding, and override paths.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedAnchor
                  href={homeProfileLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  eventName="profile_link_click"
                  eventProperties={{ destination: "linkedin", placement: "homepage_public_thesis_stream" }}
                  className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint"
                >
                  Read the public posts <Linkedin size={18} />
                </TrackedAnchor>
                <TrackedLink
                  href="/ask?prompt=Explain%20Ravikanth%27s%20LinkedIn%20thesis%20about%20the%20Enterprise%20Context%20Layer%20and%20Context%20Acquisition%20Tax."
                  eventName="homepage_cta_click"
                  eventProperties={{ cta: "ask_linkedin_context_thesis" }}
                  className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white"
                >
                  Ask about the thesis <ArrowRight size={18} />
                </TrackedLink>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">LinkedIn thesis ledger</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">The public posts are treated as working notes for the doctrine, not as social proof.</p>
              <div className="mt-4 flex flex-wrap gap-2">
            {homeLinkedInSignals.map((signal) => (
              <div key={signal.name} className="max-w-[17rem] rounded border border-white/10 bg-black/20 px-3 py-2">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-signal">{signal.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-300">{signal.description}</p>
              </div>
            ))}
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <Section eyebrow="Category boundary and falsification tests" title="Operational Intelligence begins where observation alone stops being enough.">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="p-0">
            <div className="border-b border-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">What it replaces, and what it does not</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                The point is not to rename observability, chat, or incident tracking. The point is to make the operational decision itself inspectable.
              </p>
            </div>
            <div className="divide-y divide-white/10">
              {homeCategoryContrast.map(([mode, promise, limitation]) => (
                <div key={mode} className={`grid gap-3 p-4 md:grid-cols-[0.6fr_0.8fr_1.2fr] ${mode === "Operational Intelligence" ? "bg-mint/[0.045]" : ""}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{mode}</p>
                  <h2 className="text-base font-semibold text-white">{promise}</h2>
                  <p className="text-sm leading-6 text-slate-300">{limitation}</p>
                </div>
              ))}
            </div>
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

      <Section eyebrow="Reference system" title="The proof path is part of the work, not a separate credibility layer.">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <Card className="border-signal/25 bg-signal/[0.045] p-5">
            <ShieldCheck className="mb-5 text-signal" />
            <h3 className="text-2xl font-semibold text-white md:text-3xl">Inspection is part of the product contract.</h3>
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
              <p className="mt-2 text-sm leading-6 text-slate-400">Each artifact has a job in the public proof path.</p>
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

      <Section eyebrow="Start here" title="One thesis. Three ways to challenge it.">
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

      <Section eyebrow="Reference spine" title="If the idea is real, it should survive inspection.">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-amber/25 bg-amber/[0.045]">
            <FileText className="mb-5 text-amber" />
            <h3 className="text-3xl font-semibold text-white">The work is versioned as a public technical reference, not packaged as a resume.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Definitions live in the doctrine. Behavior lives in the reference architecture. Shareable review assets live in the publication pack. Proof and falsification live in the evidence pack.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/downloads/operational-intelligence-publication-pack.pdf" className="inline-flex items-center gap-2 rounded bg-amber px-5 py-3 font-semibold text-ink">
                Download publication pack <FileText size={18} />
              </Link>
              <Link href="/wiki/operational-intelligence-evidence-pack" className="inline-flex items-center gap-2 rounded border border-amber/35 px-5 py-3 font-semibold text-amber">
                Challenge the evidence
              </Link>
            </div>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {homeReferenceAssets.map(([href, title, body]) => (
              <Link key={href} href={href}>
                <Card className="h-full p-4 transition hover:-translate-y-1 hover:border-amber/40">
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Reviewer paths" title="Different serious visitors should know exactly where to start.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
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

      <Section eyebrow="Engineering signature" title="The author shows up through engineering taste, not self-promotion.">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <Sparkles className="mb-5 text-mint" />
            <h3 className="text-3xl font-semibold text-white">{homeBuilderDna.title}</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">{homeBuilderDna.thesis}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedAnchor
                href={homeProfileLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                eventName="profile_link_click"
                eventProperties={{ destination: "linkedin", placement: "homepage_builder_signature" }}
                className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white"
              >
                View LinkedIn <Linkedin size={18} />
              </TrackedAnchor>
              <Link href="/background" className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
                Background
              </Link>
            </div>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {homeBuilderDna.principles.map((principle) => (
              <Card key={principle.name} className="p-4">
                <Network className="mb-4 text-signal" />
                <h3 className="font-semibold text-white">{principle.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{principle.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Current work" title="The body of work compounds through field notes and reusable patterns.">
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

      <Section eyebrow="Ask Ravikanth" title="Ask the work, then inspect the receipts.">
        <Card className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white">Ask Ravikanth turns the public body of work into a review surface.</h3>
            <p className="mt-3 leading-7 text-slate-300">Use it to interrogate the doctrine, trace evidence to source pages, compare claims against artifacts, and find the right route through Ravikanth&apos;s work without guessing.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/ask" className="rounded bg-white px-5 py-3 font-semibold text-ink">
              Ask Ravikanth
            </Link>
            <Link href="/evals" className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
              View evals <ShieldCheck size={18} />
            </Link>
          </div>
        </Card>
      </Section>
    </>
  );
}
