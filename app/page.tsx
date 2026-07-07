import Link from "next/link";
import { ArrowRight, BrainCircuit, ClipboardCheck, FileText, GitBranch, Linkedin, MessagesSquare, Network, Route, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Card } from "@/components/card";
import { HeroIntelligenceMap } from "@/components/hero-intelligence-map";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { articles, builderDna, harnessThesis, operationalIntelligenceSystem, patterns, principles, projects, sentinelContextModel, site } from "@/content/site";

const platformLayers = [
  ["Observe", "Ingest signals from logs, metrics, traces, events, changes, tickets, topology, and transaction journeys."],
  ["Correlate", "Connect evidence into typed relationships: what changed, what is affected, who owns it, and what prior memory applies."],
  ["Reason", "Rank hypotheses with confidence movement, missing-context statements, and explicit losing explanations."],
  ["Evaluate", "Gate AI behavior for grounding, citation quality, refusal, escalation judgment, and action risk."],
  ["Act", "Prepare bounded recommendations, preserve review gates, and keep humans accountable for irreversible change."],
  ["Learn", "Turn outcomes, rejected paths, and post-incident decisions into reusable operational memory."]
];

const operationalOutcomes = [
  ["Reduce investigation ambiguity", "Move teams from alert noise to evidence-backed hypotheses."],
  ["Make AI behavior auditable", "Expose what the agent used, ignored, inferred, and refused."],
  ["Protect operational judgment", "Keep high-impact actions behind policy, confidence, and human review."],
  ["Compound operational memory", "Make every incident improve the next investigation instead of disappearing into chat history."]
];

const proofLoop = ["Signal", "Transaction", "Topology", "Evidence", "Hypothesis", "Eval", "Review", "Memory"];

export default function Home() {
  return (
    <>
      <section className="grid-bg border-b border-white/10">
        <div className="mx-auto grid min-h-[86vh] max-w-7xl content-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200">
              <span className="h-2 w-2 rounded-full bg-mint shadow-[0_0_16px_rgba(95,242,181,0.9)]" />
              {site.positioning}
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold text-white md:text-7xl">{site.tagline}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{site.description}</p>
            <div className="mt-6 lg:hidden">
              <HeroIntelligenceMap />
            </div>
            <div className="mt-6 max-w-3xl rounded-lg border border-mint/20 bg-mint/[0.06] p-5">
              <p className="text-sm font-semibold uppercase text-mint">Operating contract</p>
              <p className="mt-3 text-xl leading-9 text-white">{site.brandBelief}</p>
            </div>
            <div className="mt-4 max-w-3xl rounded-lg border border-signal/25 bg-signal/[0.06] p-4">
              <p className="text-sm leading-6 text-slate-200">{site.productPromise}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/investigation-room" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Open Operations Room <ArrowRight size={18} />
              </Link>
              <Link href="/map" className="inline-flex items-center gap-2 rounded border border-signal/40 px-5 py-3 font-semibold text-signal">
                View Platform Map
              </Link>
              <Link href="/library" className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Read the Library
              </Link>
              <Link href="/ask" className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Query the System
              </Link>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white"
              >
                LinkedIn signal <Linkedin size={18} />
              </a>
            </div>
            <div className="mt-8 grid max-w-3xl grid-cols-3 gap-3">
              {[
                ["82%", "lead hypothesis"],
                ["+31", "confidence movement"],
                ["4/4", "eval gates visible"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-sm text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="hidden lg:block">
              <HeroIntelligenceMap />
            </div>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="Platform layer" title="The missing layer between observability platforms and AI action.">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-signal/30 bg-signal/[0.055]">
            <Network className="mb-5 text-signal" />
            <h3 className="text-3xl font-semibold text-white">Observability platforms see the stack. Incident platforms coordinate the response. seri.ai explains the operational reasoning.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The durable category is not another dashboard or another chatbot. It is the reasoning and evaluation layer that makes operational AI inspectable, bounded, and useful under pressure.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {["Observability context", "Incident reasoning", "Agent evaluation", "Human approval"].map((item) => (
                <span key={item} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {platformLayers.map(([name, description], index) => (
              <Card key={name} className="p-4">
                <span className="font-mono text-xs text-mint">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Operational outcomes" title="What problem does this solve?">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-3 md:grid-cols-2">
            {operationalOutcomes.map(([title, body]) => (
              <Card key={title} className="h-full p-5">
                <Workflow className="mb-4 text-mint" />
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
              </Card>
            ))}
          </div>
          <Card className="border-mint/25 bg-mint/[0.045]">
            <Route className="mb-5 text-mint" />
            <h3 className="text-3xl font-semibold text-white">From signal to accountable action.</h3>
            <p className="mt-4 leading-7 text-slate-300">
              Every step should leave a receipt: the source signal, transaction impact, topology path, evidence used, hypothesis movement, eval result, review gate, and memory candidate.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {proofLoop.map((step) => (
                <span key={step} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase text-slate-300">
                  {step}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Product spine" title="One operating model, multiple proof surfaces.">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <Sparkles className="mb-5 text-mint" />
            <h3 className="text-3xl font-semibold text-white">Operational Intelligence needs receipts, replay, memory, and review.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              seri.ai organizes that operating model into inspectable artifacts: a reasoning map, a harness console,
              grounded public knowledge, architecture patterns, and evaluation-backed product notes.
            </p>
          </Card>
          <div className="grid gap-3">
            {[
              ["01", "Operational Intelligence", "The field model for operational reasoning."],
              ["02", "ReasonOps", "The harness and control-plane expression."],
              ["03", "Operations Room", "A replayable RCA and eval-gate artifact."],
              ["04", "Reasoning Interface", "A constrained public assistant with refusal and citation behavior."]
            ].map(([number, title, text]) => (
              <Card key={title} className="flex items-center gap-4 p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded border border-signal/35 bg-signal/10 font-mono text-sm text-signal">{number}</span>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-6 text-slate-400">{text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Agentic SRE thesis" title={harnessThesis.headline}>
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-signal/30 bg-signal/[0.055]">
            <BrainCircuit className="mb-5 text-signal" />
            <h3 className="text-3xl font-semibold text-white">The model is not the moat. The operating harness is.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">{harnessThesis.statement}</p>
            <p className="mt-5 rounded border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">{harnessThesis.category}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {harnessThesis.loop.map((step) => (
                <span key={step} className="rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase text-slate-300">
                  {step}
                </span>
              ))}
            </div>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {harnessThesis.beliefs.map((belief) => (
              <Card key={belief.title} className="p-4">
                <h3 className="font-semibold text-white">{belief.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{belief.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Operating model" title="How the harness earns trust.">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-signal/30 bg-signal/[0.055]">
            <ShieldCheck className="mb-5 text-signal" />
            <h3 className="text-3xl font-semibold text-white">{builderDna.title}</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">{builderDna.thesis}</p>
            <p className="mt-5 rounded border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-400">
              {builderDna.publicSafeSource}
            </p>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {builderDna.principles.map((principle, index) => (
              <Card key={principle.name} className="p-4">
                <span className="font-mono text-xs text-mint">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold text-white">{principle.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{principle.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Public-safe product model" title="The control plane underneath the thesis.">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <BrainCircuit className="mb-5 text-mint" />
            <h3 className="text-3xl font-semibold text-white">{sentinelContextModel.title}</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">{sentinelContextModel.framing}</p>
            <p className="mt-5 rounded border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-400">{sentinelContextModel.compliance}</p>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {sentinelContextModel.primitives.map((primitive) => (
              <Card key={primitive.name} className="p-4">
                <h3 className="font-semibold text-white">{primitive.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{primitive.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Living system" title="Operational Intelligence as an inspectable product surface.">
        <div className="grid gap-4 md:grid-cols-3">
          {operationalIntelligenceSystem.loop.map((item, index) => (
            <Link key={item.href} href={item.href}>
            <Card className={index === 1 ? "h-full border-signal/30 bg-signal/[0.06] transition hover:border-signal/50" : "h-full transition hover:border-mint/40"}>
              <BrainCircuit className={index === 1 ? "mb-5 text-signal" : "mb-5 text-mint"} />
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
              <p className="mt-3 text-slate-300">{item.description}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mint">Open <ArrowRight size={15} /></p>
            </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Executive path" title="Inspect the thesis in five minutes.">
        <div className="executive-rail rounded-lg border border-white/10 p-3">
          <div className="grid gap-3 md:grid-cols-4">
          {[
            ["/manifesto", "Manifesto", "The category argument: why Operational Intelligence, why now, and what the operating layer must become."],
            ["/map", "Map", "The visual operating system for layers, products, patterns, artifacts, and public assets."],
            ["/products/reasonops", "ReasonOps", "The product expression: operational reasoning for AI-native enterprises."],
            ["/radar", "Radar", "Current market signals around AI observability, AgentOps, AIOps evals, and OpenTelemetry."],
            ["/investigation-room", "Operations Room", "A hands-on workbench for evidence-first AI incident investigation."]
          ].map(([href, title, text]) => (
            <Link key={href} href={href}>
              <Card className="h-full bg-ink/75 transition hover:-translate-y-1 hover:border-signal/40">
                <FileText className="mb-4 text-signal" />
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </Card>
            </Link>
          ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Operating laws" title="The rules behind the system.">
        <div className="grid gap-3 md:grid-cols-5">
          {site.operatingSystem.map((belief, index) => (
            <Card key={belief} className="h-full">
              <span className="font-mono text-sm text-signal">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-white">{belief}</h3>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Public signal" title="Trace the thesis as it evolves.">
        <Card className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Linkedin className="mb-4 text-signal" />
            <h3 className="text-2xl font-semibold text-white">LinkedIn is the public change log behind the category.</h3>
            <p className="mt-3 leading-7 text-slate-300">
              For visitors who want the ongoing signal: posts, architecture notes, certification evidence,
              and product thinking around Operational Intelligence, Agentic SRE, and AI-native operations.
            </p>
          </div>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded bg-white px-5 py-3 font-semibold text-ink"
          >
            View LinkedIn <ArrowRight size={18} />
          </a>
        </Card>
      </Section>

      <Section eyebrow="Signature artifact" title="ReasonOps Operations Room">
        <Card className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ClipboardCheck className="mb-5 text-signal" />
            <h3 className="text-3xl font-semibold text-white">Run a public-safe incident through evidence, replay, branch comparison, and eval.</h3>
            <p className="mt-4 leading-7 text-slate-300">
              The console produces an exportable RCA packet with evidence receipts, timeline reconstruction,
              selected recommendation, branch comparison, release gate, and public-safe boundary.
            </p>
            <Link href="/investigation-room" className="mt-6 inline-flex items-center gap-2 rounded bg-signal px-5 py-3 font-semibold text-ink">
              Open Operations Room <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-3">
            {["Evidence before conclusions", "Timeline before root cause", "Confidence before action", "Evaluation before trust"].map((item, index) => (
              <div key={item} className="flex items-center gap-4 rounded-lg border border-white/10 bg-ink p-4">
                <span className="grid h-9 w-9 place-items-center rounded bg-signal/15 font-mono text-sm text-signal">{index + 1}</span>
                <span className="font-medium text-slate-100">{item}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section eyebrow="Start here" title="Choose a path through the system.">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["/start-here", "Start Here", "Audience-specific paths for executives, recruiters, architects, engineers, and founders."],
            ["/map", "Map", "The visual operating system for Operational Intelligence."],
            ["/investigation-room", "Operations Room", "A hands-on workbench for AI-native incident investigation."],
            ["/principles", "Principles", `${principles.length} principles for trustworthy operational AI.`],
            ["/patterns", "Patterns", `${patterns.length} architecture patterns for AI-native operations.`]
          ].map(([href, title, text]) => (
            <Link key={href} href={href}>
              <Card className="h-full transition hover:border-mint/40">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Library" title="Recent public assets">
        <div className="grid gap-4 md:grid-cols-2">
          {articles.slice(0, 4).map((article) => (
            <Link key={article.slug} href={`/ideas/${article.slug}`}>
              <Card className="h-full transition hover:border-mint/40">
                <p className="text-sm text-mint">{article.theme}</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{article.title}</h3>
                <p className="mt-3 text-slate-300">{article.dek}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Architecture patterns" title="Patterns for AI-native operational systems.">
        <div className="grid gap-4 lg:grid-cols-4">
          {patterns.slice(0, 4).map((card) => (
            <Link key={card.slug} href={`/patterns/${card.slug}`}>
              <Card className="h-full transition hover:border-signal/40">
              <GitBranch className="mb-4 text-signal" />
              <h3 className="font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Artifacts" title="Public-safe proof objects, not confidential case studies.">
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <Card className="h-full transition hover:border-signal/50">
                <p className="text-sm text-amber">{project.status}</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{project.name}</h3>
                <p className="mt-3 text-slate-300">{project.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Reasoning interface" title="Public-grounded answers with refusal behavior.">
        <Card className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <MessagesSquare className="mb-4 text-mint" />
            <h3 className="text-2xl font-semibold text-white">Query the public knowledge layer behind the operating model.</h3>
            <p className="mt-2 text-slate-300">The assistant uses approved public context, cites what it used, and refuses confidential or unsupported claims.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/ask" className="rounded bg-white px-5 py-3 font-semibold text-ink">
              Open chat
            </Link>
            <Link href="/evals" className="inline-flex items-center gap-2 rounded border border-mint/40 px-5 py-3 font-semibold text-mint">
              Evals <ShieldCheck size={18} />
            </Link>
          </div>
        </Card>
      </Section>
    </>
  );
}
