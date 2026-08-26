import type { Metadata } from "next";
import Link from "next/link";
import { BriefcaseBusiness, Cpu, Network, Rocket, Users } from "lucide-react";
import { Card } from "@/components/card";
import { Chat } from "@/components/chat";
import { Section } from "@/components/section";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Interview | Ravikanth Seri — Operational Intelligence",
  description:
    "Interview-style grounded Q&A for Principal AI Architect, Forward Deployed Engineer, Enterprise AI Solutions Architect, Product-minded Engineering Leader, and Operational Intelligence Founder conversations.",
  path: "/interview"
});

const modes = [
  ["Principal AI Architect", "How the architecture holds up when governance and evaluation are the constraint rather than an afterthought.", Cpu],
  ["Forward Deployed Engineer", "What happens when the requirements turn out to be wrong and the customer is in the room.", Rocket],
  ["Enterprise AI Solutions Architect", "Getting a reference architecture adopted by teams who did not ask for one.", Network],
  ["Product-minded Engineering Leader", "Deciding what not to build, and defending that decision afterwards.", Users],
  ["Operational Intelligence Founder", "The thesis, the wedge, and why this is a category rather than a feature.", BriefcaseBusiness]
];

const proofPacket = [
  ["/work", "Work index", "Everything in one place, ordered so you can stop as soon as you have enough."],
  ["/resume", "Interactive resume", "The conventional record, with the architecture decisions attached to each role."],
  ["/projects/operational-intelligence-copilot", "Copilot proof page", "One project traced end to end, including the failure modes it is designed around."],
  ["/architecture-lab", "Architecture lab", "The implementation contracts, reusable as written."],
  ["/evals", "Trust report", "Deterministic behavior fixtures for Ask Ravi and public-safe refusal."],
  ["/contact", "Practitioner review", "Structured path for external critique and follow-up."]
] as const;

const interviewPrompts = [
  "Explain Ravikanth's architecture judgment using only public evidence.",
  "What makes Ravikanth credible for Agentic SRE and Operational Intelligence work?",
  "How does his background connect observability, identity, Kubernetes, and AI agents?",
  "What should a principal architect challenge in the Operational Intelligence doctrine?",
  "Which public artifacts best show product and systems thinking?",
  "What questions should an interviewer ask about evaluation gates and operator control?"
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
      <Section eyebrow="Proof packet" title="Review the evidence before asking interview questions.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {proofPacket.map(([href, title, description]) => (
            <Link key={href} href={href}>
              <Card className="h-full transition hover:border-mint/40">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <Section eyebrow="Ask interview questions" title="Answers stay grounded in approved public content.">
        <Chat mode="interview" suggestedPrompts={interviewPrompts} />
      </Section>
    </>
  );
}
