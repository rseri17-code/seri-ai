import { Award, Download, MapPin, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { resume } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume | Ravikanth Seri — Operational Intelligence and Enterprise AI",
  description: "Interactive public resume for Ravikanth Seri focused on Operational Intelligence, agentic systems, observability strategy, and enterprise AI."
};

export default function ResumePage() {
  return (
    <Section eyebrow="Interactive resume" title={resume.headline}>
      <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-5">
        <Card>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin size={16} className="text-mint" />
            <span>{resume.location}</span>
          </div>
          <p className="mt-5 text-lg leading-8 text-slate-200">{resume.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {resume.contact.map((item) => (
              <span key={item} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-300">
                {item}
              </span>
            ))}
          </div>
          <a
            href="/ravi-seri-public-resume.txt"
            download
            className="mt-6 inline-flex items-center gap-2 rounded bg-mint px-4 py-3 font-semibold text-ink"
          >
            <Download size={18} /> Download resume
          </a>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold text-white">Strengths</h2>
          <div className="mt-5 space-y-3">
            {resume.strengths.map((strength) => (
              <p key={strength} className="rounded border border-white/10 bg-ink px-4 py-3 text-slate-200">
                {strength}
              </p>
            ))}
          </div>
        </Card>
        </div>
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-mint" />
              <h2 className="text-xl font-semibold text-white">Architecture highlights</h2>
            </div>
            <div className="mt-5 space-y-3">
              {resume.architectureHighlights.map((highlight) => (
                <p key={highlight} className="rounded border border-white/10 bg-ink px-4 py-3 leading-7 text-slate-200">
                  {highlight}
                </p>
              ))}
            </div>
          </Card>
          {resume.experience.map((item) => (
            <Card key={item.role}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-signal">{item.organization}</p>
                <p className="text-sm text-slate-400">{item.period}</p>
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-white">{item.role}</h2>
              <p className="mt-3 leading-7 text-slate-300">{item.impact}</p>
              <ul className="mt-5 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="rounded border border-white/10 bg-ink px-4 py-3 leading-7 text-slate-200">
                    {bullet}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
          <Card>
            <h2 className="text-xl font-semibold text-white">Core skills</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {resume.skills.map((skill) => (
                <div key={skill.group} className="rounded border border-white/10 bg-ink p-4">
                  <h3 className="font-semibold text-white">{skill.group}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{skill.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <Award className="text-amber" />
              <h2 className="text-xl font-semibold text-white">Education and certifications</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {resume.education.map((item) => (
                <span key={item} className="rounded border border-mint/20 bg-mint/10 px-3 py-2 text-sm text-slate-100">
                  {item}
                </span>
              ))}
              {resume.certifications.map((certification) => (
                <span key={certification} className="rounded border border-white/10 px-3 py-2 text-sm text-slate-200">
                  {certification}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
