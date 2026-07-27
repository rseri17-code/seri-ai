import Link from "next/link";
import { ArrowRight, BrainCircuit, ClipboardCheck, FileText, GitBranch, Linkedin, Network, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { HeroIntelligenceMap } from "@/components/hero-intelligence-map";
import { Section } from "@/components/section";
import { TrackedAnchor, TrackedLink } from "@/components/tracked-link";
import { articles, builderDna, evalReport, harnessThesis, patterns, site } from "@/content/site";

const proofStrip = [
  ["Doctrine", "Canonical definition, boundaries, ten-layer model, glossary, and references."],
  ["Architecture", "Contracts, schemas, state machines, evaluation gates, and conformance levels."],
  ["Operations Room", "A public-safe investigation artifact for evidence, replay, hypotheses, and review."],
  [`${evalReport.fixtures.length}/${evalReport.fixtures.length}`, "Deterministic Ask Ravi trust fixtures currently passing."]
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
    label: "Builder proof",
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
  ["/evals", "Trust Evals", `${evalReport.fixtures.length} deterministic fixtures covering grounding, refusal, routing, and citations.`],
  ["/library", "Publishing System", "Searchable, cited, linked assets connected to framework layers, patterns, RSS, and Ask retrieval."],
  ["/work", "Builder Evidence", "Public-safe experience, systems judgment, resume proof, GitHub, LinkedIn, and current work."]
] as const;

export default function Home() {
  return (
    <>
      <section className="grid-bg border-b border-white/10">
        <div className="mx-auto grid max-w-7xl content-start gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:min-h-[86vh] lg:grid-cols-[0.92fr_1.08fr] lg:content-center lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-mint/25 bg-mint/[0.06] px-4 py-2 text-sm font-semibold text-mint">
              <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_16px_rgba(95,242,181,0.9)]" />
              Field doctrine by {site.owner}
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
              Operational Intelligence for AI-native operations.
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-200 md:text-2xl md:leading-10">
              The hard problem in enterprise AI is not answering faster. It is knowing what changed, what evidence proves it, what remains uncertain, and which action a human should trust.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              seri.ai is Ravikanth Seri&apos;s public operating model for Agentic SRE: doctrine, reference architecture, synthetic Operations Room, trust evals, and field notes for building AI systems that reason with evidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink href="/investigation-room" eventName="homepage_cta_click" eventProperties={{ cta: "enter_operations_room" }} className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Enter Operations Room <ArrowRight size={18} />
              </TrackedLink>
              <TrackedLink href="/wiki/operational-intelligence-canonical-doctrine" eventName="homepage_cta_click" eventProperties={{ cta: "read_doctrine" }} className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
                Read Doctrine
              </TrackedLink>
              <TrackedLink href="/work" eventName="homepage_cta_click" eventProperties={{ cta: "review_work" }} className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Review Work
              </TrackedLink>
            </div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
              {proofStrip.map(([value, label]) => (
                <div key={value} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-lg font-semibold text-white">{value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <HeroIntelligenceMap />
          </div>
        </div>
      </section>

      <Section eyebrow="Inspection ledger" title="The first promise is that the work can be inspected.">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
        <div className="mt-4 flex flex-wrap gap-3">
          <TrackedAnchor
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            eventName="profile_link_click"
            eventProperties={{ destination: "github", placement: "homepage_inspection_ledger" }}
            className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-3 text-sm font-semibold text-white"
          >
            GitHub <ArrowRight size={15} />
          </TrackedAnchor>
          <TrackedAnchor
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            eventName="profile_link_click"
            eventProperties={{ destination: "linkedin", placement: "homepage_inspection_ledger" }}
            className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-3 text-sm font-semibold text-white"
          >
            LinkedIn <Linkedin size={15} />
          </TrackedAnchor>
          <Link href="/rss.xml" className="inline-flex items-center gap-2 rounded border border-mint/40 px-4 py-3 text-sm font-semibold text-mint">
            RSS <ArrowRight size={15} />
          </Link>
        </div>
      </Section>

      <Section eyebrow="Start here" title="One thesis. Three ways to test it.">
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

      <Section eyebrow="Point of view" title={harnessThesis.headline}>
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-signal/30 bg-signal/[0.055]">
            <BrainCircuit className="mb-5 text-signal" />
            <h3 className="text-3xl font-semibold text-white">The model is not the moat. The operating harness is.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">{harnessThesis.statement}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {harnessThesis.loop.map((step) => (
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

      <Section eyebrow="Builder signature" title="The builder shows up through engineering taste.">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <Sparkles className="mb-5 text-mint" />
            <h3 className="text-3xl font-semibold text-white">{builderDna.title}</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">{builderDna.thesis}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedAnchor
                href={site.links.linkedin}
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
            {builderDna.principles.slice(0, 4).map((principle) => (
              <Card key={principle.name} className="p-4">
                <Network className="mb-4 text-signal" />
                <h3 className="font-semibold text-white">{principle.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{principle.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Recent signal" title="The public body of work should keep compounding.">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <Card>
            <ClipboardCheck className="mb-5 text-signal" />
            <h3 className="text-2xl font-semibold text-white">Latest field notes</h3>
            <div className="mt-5 grid gap-3">
              {articles.slice(0, 3).map((article) => (
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
              {patterns.slice(0, 3).map((pattern) => (
                <Link key={pattern.slug} href={`/patterns/${pattern.slug}`} className="rounded border border-white/10 bg-black/20 p-4 transition hover:border-signal/40">
                  <h4 className="font-semibold text-white">{pattern.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{pattern.description}</p>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Ask Ravi" title="Ask the work, then inspect the receipts.">
        <Card className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white">Ask Ravi turns the public body of work into a review surface.</h3>
            <p className="mt-3 leading-7 text-slate-300">Use it to interrogate the doctrine, trace evidence to source pages, compare claims against artifacts, and find the right route through Ravikanth&apos;s work without guessing.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/ask" className="rounded bg-white px-5 py-3 font-semibold text-ink">
              Ask Ravi
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
