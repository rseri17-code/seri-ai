import type { Metadata } from "next";
import { ArrowUpRight, Radar, Route, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { site, thesisRadar } from "@/content/site";

export const metadata: Metadata = {
  title: "Thesis Radar | Ravikanth Seri — Operational Intelligence",
  description:
    "Trending market signals around Operational Intelligence, AIOps, AI observability, AgentOps, OpenTelemetry, and observability for AI."
};

export default function RadarPage() {
  return (
    <>
      <Section eyebrow="Thesis radar" title={thesisRadar.title} level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <Radar className="mb-5 text-mint" />
            <p className="text-xl leading-8 text-slate-200">{thesisRadar.thesis}</p>
            <p className="mt-5 text-sm text-slate-400">Updated {thesisRadar.updatedAt}</p>
            <a
              href={site.links.linkedin}
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

      <Section eyebrow="Market signals" title="Trending concepts that ground the thesis.">
        <div className="space-y-4">
          {thesisRadar.trends.map((trend, index) => (
            <Card key={trend.name}>
              <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
                <div>
                  <p className="font-mono text-sm text-signal">0{index + 1}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{trend.name}</h2>
                  <div className="mt-5 flex items-center gap-2 text-sm text-mint">
                    <Route size={16} />
                    <span>seri.ai read</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{trend.ravikanthAngle}</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg border border-white/10 bg-ink p-4">
                    <p className="text-sm font-semibold text-mint">Signal</p>
                    <p className="mt-2 leading-7 text-slate-200">{trend.signal}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-ink p-4">
                    <p className="text-sm font-semibold text-amber">Why it matters</p>
                    <p className="mt-2 leading-7 text-slate-200">{trend.whyItMatters}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trend.sources.map((source) => (
                      <a
                        key={source.url}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-sm text-slate-300 hover:border-mint/40 hover:text-white"
                      >
                        {source.label} <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
