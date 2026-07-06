import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { nowPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Now | Ravikanth Seri",
  description: "Ravikanth Seri's current public focus areas across Operational Intelligence, agentic systems, transaction intelligence, and AI evaluation."
};

export default function NowPage() {
  const sections = [
    ["Current focus", nowPage.currentFocus],
    ["What I am building", nowPage.building],
    ["What I am studying", nowPage.studying],
    ["What I am writing about", nowPage.writing],
    ["What I am avoiding", nowPage.avoiding],
    ["Current questions", nowPage.questions]
  ];

  return (
    <Section eyebrow="Now" title="Current public focus areas.">
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map(([title, items]) => (
          <Card key={title as string}>
            <h2 className="text-xl font-semibold text-white">{title as string}</h2>
            <ul className="mt-4 space-y-3 text-slate-300">
              {(items as string[]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
