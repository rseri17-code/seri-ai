import Link from "next/link";
import { ArrowRight, BrainCircuit, ClipboardCheck, FileText, GitBranch, Linkedin, Network, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { HeroIntelligenceMap } from "@/components/hero-intelligence-map";
import { Section } from "@/components/section";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import { homeArticles, homeBuilderDna, homeEvalReport, homeHarnessThesis, homeLinkedInSignals, homePatterns, homeProfileLinks } from "@/content/home";

const proofStrip = [
  ["Doctrine", "Definition, boundaries, ten-layer model, glossary, and references."],
  ["Architecture", "Contracts, schemas, state machines, approval gates, and conformance levels."],
  ["Operations Room", "A public-safe investigation instrument for evidence, replay, hypotheses, and review."],
  [`${homeEvalReport.fixtures.length}/${homeEvalReport.fixtures.length}`, "Ask Ravi trust fixtures currently passing."]
];

const categoryContrast = [
  ["Dashboard", "Shows the symptom", "Useful for detection; weak at preserving reasoning, uncertainty, and action provenance."],
  ["Chatbot", "Explains a fragment", "Useful for language; risky when retrieval, evidence, refusal, and approval boundaries are thin."],
  ["Ticket queue", "Tracks the work", "Useful for coordination; weak at reconstructing transaction evidence and causal movement."],
  ["Operational Intelligence", "Produces a reviewable decision", "Connects signal, transaction, topology, evidence, memory, evaluation, and human judgment."]
];

const primaryPaths = [
  {
    href: "/investigation-room",
    label: "Signature artifact",
    title: "Enter the Operations Room",
    body: "Inspect OI-ROOM-001 as an evidence-backed investigation: transaction path, contradictory evidence, missing context, hypothesis movement, eval gates, and human approval."
  },
  {
    href: "/wiki/operational-intelligence-canonical-doctrine",
    label: "Doctrine",
    title: "Read the canonical model",
    body: "Start with the definition of Operational Intelligence, what it is not, the ten-layer framework, glossary, boundaries, and public-safe synthetic case."
  },
  {
    href: "/work",
    label: "Public work",
    title: "Review the body of work",
    body: "See the systems, papers, patterns, reference artifacts, public work, resume proof, and professional background behind the thesis."
  }
];

const operatingRules = [
  ["Evidence before conclusions", "The system should separate observation, inference, contradiction, missing evidence, and confirmed fact before recommending action."],
  ["Replay before belief", "Important operational reasoning should be reproducible through approved context, replay seeds, and trust fixtures."],
  ["Human judgment before action", "Consequential change stays behind owner review, approval class, reversibility, and escalation boundaries."]
];

const reviewerPaths = [
  ["Executive", "/brief", "One-page brief", "Can the model improve operational judgment without autonomy theater?"],
  ["SRE leader", "/investigation-room", "Operations Room", "Are evidence, unknowns, contradictions, and approval boundaries visible?"],
  ["Principal architect", "/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "Could two teams implement the contracts similarly?"],
  ["AI engineer", "/evals", "Trust evals", "Do retrieval, citation, refusal, and action-safety gates hold?"],
  ["Recruiter or founder", "/work", "Work Index", "What has Ravikanth built, written, and made inspectable?"]
] as const;

const referenceAssets = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Canonical Doctrine", "The durable definition and boundaries."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "The implementation-neutral technical contract."],
  ["/wiki/operational-intelligence-publication-pack", "Publication Pack", "Diagrams, tables, walkthroughs, cards, and PDFs."],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence Pack", "Benchmark rubric, control comparisons, and falsification criteria."]
];

const inspectionLedger = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine v1.0", "Definition, boundaries, ten layers, glossary, and claim posture."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "Contracts, state machines, schemas, gates, and conformance levels."],
  ["/investigation-room", "Operations Room", "Synthetic investigation with evidence graph, replay, contradiction, missing evidence, and approval."],
  ["/evals", "Trust Evals", `${homeEvalReport.fixtures.length} deterministic fixtures covering grounding, refusal, routing, and citations.`],
  ["/library", "Publishing System", "Searchable, cited, linked assets connected to framework layers, patterns, RSS, and Ask retrieval."],
  ["/work", "Public Work", "Public-safe experience, systems judgment, resume proof, GitHub, LinkedIn, and current work."]
] as const;

const falsificationTests = [
  ["Contradiction stays visible", "Evidence that weakens the preferred explanation remains in the packet."],
  ["Unknowns stay named", "Missing evidence is preserved instead of converted into confident narrative."],
  ["Reasoning can replay", "The investigation leaves enough context to reproduce how confidence moved."],
  ["Humans keep authority", "Operational change remains behind owner review, reversibility, and approval class."]
];

const heroBuilderProof = [
  ["Enterprise systems", "15+ years across distributed platforms, reliability, and operational workflows"],
  ["AI systems", "agent architecture, evaluation, retrieval, and runtime governance"],
  ["Operational lens", "observability, transaction paths, incident reasoning, and human approval"]
];

const heroFlow = [
  "Context",
  "Evidence",
  "Replay",
  "Decision",
  "Memory"
];

const mobileArtifactSignals = [
  ["Observation", "typed"],
  ["Contradiction", "kept"],
  ["Unknown", "named"],
  ["Action", "owner-gated"]
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
              Ravikanth Seri&apos;s public operating model
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Operations should explain themselves before AI acts.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
              seri.ai is Ravikanth Seri&apos;s public workbench for Operational Intelligence: the discipline of turning telemetry, topology, transactions, change, memory, and evaluation into evidence-backed operational judgment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink href="/investigation-room" eventName="homepage_cta_click" eventProperties={{ cta: "enter_operations_room" }} className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Run OI-ROOM-001 <ArrowRight size={18} />
              </TrackedLink>
              <TrackedLink href="/wiki/operational-intelligence-canonical-doctrine" eventName="homepage_cta_click" eventProperties={{ cta: "read_doctrine" }} className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
                Read the doctrine
              </TrackedLink>
              <TrackedLink href="/work" eventName="homepage_cta_click" eventProperties={{ cta: "review_work" }} className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Review the work
              </TrackedLink>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
              The material is public-safe by design: synthetic cases, cited sources, explicit uncertainty, and no private operational details.
            </p>
            <div className="mt-5 grid gap-2 rounded-lg border border-white/10 bg-black/20 p-3 lg:hidden">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Decision packet preview</p>
                <p className="font-mono text-xs text-mint">OI-ROOM-001</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {mobileArtifactSignals.map(([label, value]) => (
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
                {heroFlow.map((step, index) => (
                  <span key={step} className="inline-flex items-center gap-2">
                    <span className={index === 0 ? "text-mint" : index === heroFlow.length - 1 ? "text-amber" : "text-white"}>{step}</span>
                    {index < heroFlow.length - 1 ? <span className="text-slate-600">/</span> : null}
                  </span>
                ))}
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                The thesis is narrow on purpose: AI should help operators reason from evidence, preserve uncertainty, and keep consequential change under accountable human control.
              </p>
            </div>
            <div className="mt-5 hidden gap-2 lg:grid lg:grid-cols-3">
              {heroBuilderProof.map(([label, proof]) => (
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
        <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <Linkedin className="mb-5 text-mint" />
            <h3 className="text-3xl font-semibold text-white">The context layer has to outlive the incident, the prompt, and the person carrying the thread.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Ravikanth&apos;s public writing keeps returning to the same operational gap: agents cannot become trustworthy investigators if ownership, change, dependency, transaction, confidence, and missing evidence are rediscovered from scratch every time.
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
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {homeLinkedInSignals.map((signal) => (
              <Card key={signal.name} className="p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{signal.name}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{signal.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Category boundary" title="Operational Intelligence begins where observation alone stops being enough.">
        <div className="grid gap-3 lg:grid-cols-4">
          {categoryContrast.map(([mode, promise, limitation]) => (
            <Card key={mode} className={`h-full p-4 ${mode === "Operational Intelligence" ? "border-mint/35 bg-mint/[0.055]" : ""}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{mode}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{promise}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{limitation}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Falsification tests" title="What would make the thesis credible or wrong.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {falsificationTests.map(([value, label]) => (
            <Card key={value} className="h-full p-4">
              <p className="font-semibold text-white">{value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{label}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Reference system" title="The proof path is part of the work, not a separate credibility layer.">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <Card className="border-signal/25 bg-signal/[0.045]">
            <ShieldCheck className="mb-5 text-signal" />
            <h3 className="text-3xl font-semibold text-white">Inspection is part of the product contract.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The thesis is exposed through definitions, contracts, synthetic evidence, evaluation gates, public work, and source-linked publishing. A visitor should be able to challenge the model without needing private systems or confidential examples.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {proofStrip.map(([value, label]) => (
                <div key={value} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-lg font-semibold text-white">{value}</p>
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
          <div className="grid gap-3 md:grid-cols-2">
            {inspectionLedger.map(([href, title, body]) => (
              <Link key={href} href={href}>
                <Card className="h-full p-4 transition hover:-translate-y-1 hover:border-mint/40">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <ArrowRight size={16} className="mt-1 shrink-0 text-mint" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Start here" title="One thesis. Three ways to challenge it.">
        <div className="grid gap-4 lg:grid-cols-3">
          {primaryPaths.map((path) => (
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
            {operatingRules.map(([title, body]) => (
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
            {referenceAssets.map(([href, title, body]) => (
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
          {reviewerPaths.map(([role, href, artifact, question]) => (
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
