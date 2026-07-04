import Link from "next/link";
import { ArrowRight, BrainCircuit, GitBranch, MessagesSquare, Radar } from "lucide-react";
import { Card } from "@/components/card";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { articles, patterns, principles, projects, site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="grid-bg border-b border-white/10">
        <div className="mx-auto grid min-h-[78vh] max-w-7xl content-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <Reveal>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-mint">{site.positioning}</p>
            <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-white md:text-7xl">{site.tagline}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{site.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/ask" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
                Ask Ravi <ArrowRight size={18} />
              </Link>
              <Link href="/architecture-lab" className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
                Explore architecture
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-lg border border-white/10 bg-ink/80 p-5 shadow-glow">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-medium text-slate-300">Operational intelligence loop</span>
                <Radar className="text-mint" size={20} />
              </div>
              {["Signals", "Transactions", "Knowledge graph", "Agentic reasoning", "Human decision"].map((item, index) => (
                <div key={item} className="mb-3 flex items-center gap-3 rounded border border-white/10 bg-white/[0.03] p-4">
                  <span className="grid h-8 w-8 place-items-center rounded bg-signal/15 text-sm text-signal">{index + 1}</span>
                  <span className="font-medium text-slate-100">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="Living product" title="A public Operational Intelligence knowledge platform.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Public Wiki", "Approved notes that compound Ravi's public body of thinking."],
            ["Ravi's Principles", "A concise operating philosophy for AI-native enterprise operations."],
            ["Architecture Patterns", "Reusable patterns for evidence, agents, topology, memory, and evaluation."]
          ].map(([title, text]) => (
            <Card key={title}>
              <BrainCircuit className="mb-5 text-mint" />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-slate-300">{text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Start here" title="Choose a path through the system.">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["/start-here", "Start Here", "Audience-specific paths for executives, recruiters, architects, engineers, and founders."],
            ["/wiki", "Wiki", "Public-safe notes on Operational Intelligence and enterprise AI systems."],
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

      <Section eyebrow="Ideas" title="Recent thinking">
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

      <Section eyebrow="Projects" title="Public-safe project patterns, not confidential case studies.">
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

      <Section eyebrow="Ask Ravi" title="A grounded assistant, constrained to public knowledge.">
        <Card className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <MessagesSquare className="mb-4 text-mint" />
            <h3 className="text-2xl font-semibold text-white">Ask about Ravi&apos;s public ideas and architecture patterns.</h3>
            <p className="mt-2 text-slate-300">The assistant refuses confidential or unknown topics and cites the approved context it used.</p>
          </div>
          <Link href="/ask" className="rounded bg-white px-5 py-3 font-semibold text-ink">
            Open chat
          </Link>
        </Card>
      </Section>
    </>
  );
}
