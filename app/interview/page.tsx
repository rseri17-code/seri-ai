import type { Metadata } from "next";
import { BriefcaseBusiness, Cpu, Network, Rocket, Users } from "lucide-react";
import { Card } from "@/components/card";
import { Chat } from "@/components/chat";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Interview | Ravikanth Seri — Operational Intelligence",
  description:
    "Interview-style grounded Q&A for Principal AI Architect, Forward Deployed Engineer, Enterprise AI Solutions Architect, Product-minded Engineering Leader, and Operational Intelligence Founder conversations."
};

const modes = [
  ["Principal AI Architect", "Architecture depth, governance, evaluation, and enterprise AI operating models.", Cpu],
  ["Forward Deployed Engineer", "Customer-facing problem solving, implementation judgment, and ambiguity handling.", Rocket],
  ["Enterprise AI Solutions Architect", "Reference architectures, stakeholder translation, platform adoption, and production readiness.", Network],
  ["Product-minded Engineering Leader", "Category thinking, product judgment, roadmap discipline, and operating cadence.", Users],
  ["Operational Intelligence Founder", "ReasonOps, market thesis, product wedge, and public body of work.", BriefcaseBusiness]
];

export default function InterviewPage() {
  return (
    <>
      <Section eyebrow="Interview" title="Grounded interview mode over approved public evidence." level="h1">
        <div className="grid gap-4 md:grid-cols-5">
          {modes.map(([title, description, Icon]) => (
            <Card key={String(title)}>
              <Icon className="mb-4 text-mint" />
              <h2 className="text-lg font-semibold text-white">{String(title)}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{String(description)}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ask interview questions" title="Answers stay grounded in approved public content.">
        <Chat mode="interview" />
      </Section>
    </>
  );
}
