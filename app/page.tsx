import Link from "next/link";
import { ArrowRight, BrainCircuit, ClipboardCheck, FileText, GitBranch, Linkedin, MessagesSquare, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { HeroIntelligenceMap } from "@/components/hero-intelligence-map";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { articles, operationalIntelligenceSystem, patterns, principles, projects, site } from "@/content/site";

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
              <p className="text-sm font-semibold uppercase text-mint">The category bet</p>
              <p className="mt-3 text-xl leading-9 text-white">{site.brandBelief}</p>
            </div>
            <div className="mt-4 max-w-3xl rounded-lg border border-signal/25 bg-signal/[0.06] p-4">
              <p className="text-sm leading-6 text-slate-200">{site.productPromise}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/start-here" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Start Here <ArrowRight size={18} />
              </Link>
              <Link href="/map" className="inline-flex items-center gap-2 rounded border border-signal/40 px-5 py-3 font-semibold text-signal">
                Explore the Map
              </Link>
              <Link href="/investigation-room" className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Enter Investigation Room
              </Link>
              <Link href="/library" className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Read the Library
              </Link>
              <Link href="/ask" className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Ask Ravikanth
              </Link>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white"
              >
                Follow the thinking <Linkedin size={18} />
              </a>
            </div>
            <div className="mt-8 grid max-w-3xl grid-cols-3 gap-3">
              {[
                ["Reason", "over signals"],
                ["Evaluate", "before trust"],
                ["Review", "before action"]
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

      <Section eyebrow="Product spine" title="The system visitors should understand in one glance.">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-mint/25 bg-mint/[0.045]">
            <Sparkles className="mb-5 text-mint" />
            <h3 className="text-3xl font-semibold text-white">seri.ai is a public product thesis with working artifacts.</h3>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              It should make Ravikanth memorable for a specific category: enterprise systems that reason from evidence,
              reconstruct transaction impact, evaluate AI behavior, and keep human accountability in the loop.
            </p>
          </Card>
          <div className="grid gap-3">
            {[
              ["01", "Operational Intelligence", "The category language."],
              ["02", "ReasonOps", "The product expression."],
              ["03", "Investigation Room", "The signature artifact."],
              ["04", "Ask Ravikanth", "The grounded public assistant."]
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

      <Section eyebrow="Living product" title="A public Operational Intelligence knowledge platform.">
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

      <Section eyebrow="Executive path" title="If you only have five minutes, start here.">
        <div className="executive-rail rounded-lg border border-white/10 p-3">
          <div className="grid gap-3 md:grid-cols-4">
          {[
            ["/manifesto", "Manifesto", "The category argument: why Operational Intelligence, why now, and what seri.ai is building."],
            ["/map", "Map", "The visual operating system for layers, products, patterns, artifacts, and public assets."],
            ["/products/reasonops", "ReasonOps", "The product expression: operational reasoning for AI-native enterprises."],
            ["/radar", "Radar", "Current market signals around AI observability, AgentOps, AIOps evals, and OpenTelemetry."],
            ["/investigation-room", "Investigation Room", "A hands-on artifact for evidence-first AI incident investigation."]
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

      <Section eyebrow="Ravikanth's operating system" title="A point of view visitors can remember.">
        <div className="grid gap-3 md:grid-cols-5">
          {site.operatingSystem.map((belief, index) => (
            <Card key={belief} className="h-full">
              <span className="font-mono text-sm text-signal">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-semibold text-white">{belief}</h3>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Follow the work" title="Understand what Ravikanth is posting and building.">
        <Card className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Linkedin className="mb-4 text-signal" />
            <h3 className="text-2xl font-semibold text-white">LinkedIn is the public trail of the thinking in motion.</h3>
            <p className="mt-3 leading-7 text-slate-300">
              For visitors who want the ongoing signal behind seri.ai: posts, architecture ideas, career narrative,
              certifications, and what Ravikanth is actively building around Operational Intelligence and AI-native operations.
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

      <Section eyebrow="Signature artifact" title="AI Incident Investigation Room">
        <Card className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ClipboardCheck className="mb-5 text-signal" />
            <h3 className="text-3xl font-semibold text-white">Step through Ravikanth&apos;s evidence-first investigation model.</h3>
            <p className="mt-4 leading-7 text-slate-300">
              The Investigation Room turns the site from a profile into a product experience: evidence board, transaction timeline,
              hypothesis ranking, reviewable RCA, and an evaluation rubric.
            </p>
            <Link href="/investigation-room" className="mt-6 inline-flex items-center gap-2 rounded bg-signal px-5 py-3 font-semibold text-ink">
              Enter Investigation Room <ArrowRight size={18} />
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
            ["/investigation-room", "Investigation Room", "A hands-on artifact for AI-native incident investigation."],
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

      <Section eyebrow="Ask Ravikanth" title="A grounded assistant, constrained to public knowledge.">
        <Card className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <MessagesSquare className="mb-4 text-mint" />
            <h3 className="text-2xl font-semibold text-white">Ask about Ravikanth&apos;s public ideas and architecture patterns.</h3>
            <p className="mt-2 text-slate-300">The assistant refuses confidential or unknown topics and cites the approved context it used.</p>
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
