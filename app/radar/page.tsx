import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, FileSearch, Radar, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import siteConfig from "@/content/site-config.json";
import thesisRadar from "@/content/thesis-radar.json";

export const metadata: Metadata = {
  title: "Thesis Radar | Ravikanth Seri — Operational Intelligence",
  description:
    "Trending market signals around Operational Intelligence, AIOps, AI observability, AgentOps, OpenTelemetry, and observability for AI.",
  alternates: { canonical: "/radar" },
  openGraph: {
    title: "Thesis Radar | Ravikanth Seri — Operational Intelligence",
    description: "Public thesis map connecting Ravikanth Seri's LinkedIn themes to market signals, Operational Intelligence claims, and falsification questions.",
    url: "/radar",
    type: "website"
  }
};

const thinkingLifecycleDisplay = [
  { stage: "LinkedIn Post", output: "Observation / Field Note", evidenceHref: "https://www.linkedin.com/in/ravikanthseri/" },
  { stage: "Observation / Field Note", output: "Developed Argument", evidenceHref: "/ideas" },
  { stage: "Developed Argument", output: "Pattern", evidenceHref: "/library" },
  { stage: "Pattern", output: "Framework", evidenceHref: "/patterns" },
  { stage: "Framework", output: "Canonical Technical Asset", evidenceHref: "/framework" },
  { stage: "Canonical Technical Asset", output: "Interactive Demonstration when justified", evidenceHref: "/wiki/operational-intelligence-canonical-doctrine" },
  { stage: "Interactive Demonstration when justified", output: "Reviewer evidence or stronger canonical asset", evidenceHref: "/investigation-room" }
];

export default function RadarPage() {
  return (
    <>
      <Section eyebrow="Thesis radar" title={thesisRadar.title} level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <Radar className="mb-5 text-mint" />
            <p className="text-base leading-7 text-slate-200 md:text-xl md:leading-8">{thesisRadar.thesis}</p>
            <p className="mt-5 text-sm text-slate-400">Updated {thesisRadar.updatedAt}</p>
            <div className="mt-6 rounded border border-white/10 bg-black/20 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">Thesis spine</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {thesisRadar.proofChain.map((item) => (
                  <span key={item.theme} className="rounded border border-mint/20 bg-mint/[0.045] px-3 py-2 text-xs font-semibold text-mint">
                    {item.theme}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Every theme below is paired with the question that would prove it wrong.
              </p>
            </div>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded bg-mint px-4 py-3 font-semibold text-ink"
            >
              Follow the public signal <ArrowUpRight size={16} />
            </a>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            {thesisRadar.framing.map((item) => (
              <Card key={item.name}>
                <ShieldCheck className="mb-4 text-signal" />
                <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.statement}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Public thought process" title="The LinkedIn themes become useful only when they become testable claims.">
        <Card className="p-0">
          <div className="border-b border-white/10 p-5">
            <p className="max-w-4xl text-sm leading-6 text-slate-300">
              A market moving the same direction is a signal, not a confirmation. The last column is the one that matters — what would have to show up for the claim to be wrong.
            </p>
          </div>
          <div className="divide-y divide-white/10">
            {thesisRadar.proofChain.map((item) => (
              <div key={item.theme} className="grid min-w-0 gap-4 p-5 lg:grid-cols-[0.72fr_1fr_1fr_1fr]">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">{item.theme}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.publicThought}</p>
                </div>
                <div className="min-w-0 rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">Market signal</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.marketSignal}</p>
                </div>
                <div className="min-w-0 rounded border border-mint/20 bg-mint/[0.045] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint">OI claim</p>
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
      </Section>

      <Section eyebrow="Thinking signal lifecycle" title="LinkedIn is a signal source, not a publishing queue.">
        <Card>
          <p className="max-w-4xl text-sm leading-6 text-slate-300">
            Ideas move forward only when they become reusable engineering knowledge. Each stage below links to where its output actually lives, so the pipeline can be checked instead of taken on trust.
          </p>
          <ol className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {thinkingLifecycleDisplay.map((item, index) => (
              <li key={item.stage} className="rounded border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-xs text-signal">0{index + 1}</p>
                <h2 className="mt-2 text-base font-semibold leading-6 text-white">{item.stage}</h2>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-mint">{item.output}</p>
                <Link href={item.evidenceHref} className="mt-3 inline-flex min-h-[24px] max-w-full items-center gap-2 text-xs font-semibold text-slate-300 hover:text-mint">
                  <span className="truncate">Inspect source</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            ))}
          </ol>
        </Card>
      </Section>

      <Section eyebrow="Market signals" title="Trending concepts that ground the thesis.">
        <Card className="mb-4 border-amber/25 bg-amber/[0.045]">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber">
                <FileSearch size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.16em]">Evidence posture</p>
              </div>
              <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                These signals do not prove Operational Intelligence as a finished category. They show adjacent movement that makes the thesis worth testing: AI behavior is becoming observable, agent failures need diagnosis, operational AI work has cost and governance surfaces, and incident reasoning needs evidence beyond summaries.
              </p>
            </div>
            <Link href="/wiki/operational-intelligence-evidence-pack" className="inline-flex shrink-0 items-center gap-2 rounded border border-amber/35 px-4 py-3 text-sm font-semibold text-amber">
              Challenge the evidence <ArrowUpRight size={14} />
            </Link>
          </div>
        </Card>
        <div className="grid gap-4 lg:grid-cols-2">
          {thesisRadar.trends.map((trend, index) => (
            <article key={trend.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="font-mono text-sm text-signal">0{index + 1}</p>
              <h2 className="mt-3 text-xl font-semibold leading-7 text-white">{trend.name}</h2>
              <p className="mt-4 text-sm font-semibold text-mint">Signal</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{trend.signal}</p>
              <p className="mt-4 text-sm font-semibold text-amber">Why it matters</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{trend.whyItMatters}</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">{trend.ravikanthAngle}</p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                {trend.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${source.label}: ${source.evidenceType}`}
                    className="inline-flex min-h-[24px] items-center text-sm font-semibold text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-mint"
                  >
                    {source.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
