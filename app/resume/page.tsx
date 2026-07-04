import { Download } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { resume } from "@/content/site";

export default function ResumePage() {
  return (
    <Section eyebrow="Interactive resume" title={resume.headline}>
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <h2 className="text-xl font-semibold text-white">Strengths</h2>
          <div className="mt-5 space-y-3">
            {resume.strengths.map((strength) => (
              <p key={strength} className="rounded border border-white/10 bg-ink px-4 py-3 text-slate-200">
                {strength}
              </p>
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
        <div className="space-y-4">
          {resume.experience.map((item) => (
            <Card key={item.role}>
              <p className="text-sm text-signal">{item.organization}</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{item.role}</h2>
              <p className="mt-3 leading-7 text-slate-300">{item.impact}</p>
            </Card>
          ))}
          <Card>
            <h2 className="text-xl font-semibold text-white">Certifications</h2>
            <div className="mt-4 flex flex-wrap gap-2">
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
