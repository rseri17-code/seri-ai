import type { Metadata } from "next";
import { BrainCircuit, Compass, Hammer, HelpCircle, PenLine, SearchCheck, Shield, type LucideIcon } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { nowPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Now | Ravikanth Seri",
  description: "Ravikanth Seri's current public focus areas across Operational Intelligence, agentic systems, transaction intelligence, and AI evaluation."
};

export default function NowPage() {
  const sections: Array<[string, string[], LucideIcon]> = [
    ["Current focus", nowPage.currentFocus, Compass],
    ["What I am building", nowPage.building, Hammer],
    ["What I am studying", nowPage.studying, SearchCheck],
    ["What I am writing about", nowPage.writing, PenLine],
    ["What I am avoiding", nowPage.avoiding, Shield],
    ["Current questions", nowPage.questions, HelpCircle]
  ];

  return (
    <Section eyebrow="Now" title="What Ravikanth is actively building and thinking through.">
      <Card className="mb-5 border-mint/25 bg-mint/[0.05]">
        <BrainCircuit className="mb-5 text-mint" />
        <h2 className="text-3xl font-semibold text-white">The current work is Agentic SRE as an inspectable operating system.</h2>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
          The live thread is not generic AI adoption. It is the architecture of operational agents that can collect evidence,
          build hypotheses, replay reasoning, evaluate behavior, preserve memory, and hand accountable decisions back to humans.
        </p>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(([title, items, Icon]) => (
          <Card key={title as string} className="h-full">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
                <Icon size={18} />
              </div>
              <h2 className="text-xl font-semibold text-white">{title as string}</h2>
            </div>
            <ul className="mt-4 space-y-3 text-slate-300">
              {(items as string[]).map((item) => (
                <li key={item} className="leading-7">{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
