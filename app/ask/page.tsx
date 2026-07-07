import { Chat } from "@/components/chat";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { operationalIntelligenceSystem } from "@/content/site";
import { BrainCircuit, ClipboardCheck, GitBranch, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reasoning Interface | Public-grounded Operational Intelligence AI",
  description: "Query the public Operational Intelligence assistant about agentic systems, transaction intelligence, enterprise observability, incident reasoning, and AI evaluation."
};

const askContextCards: Array<{ label: string; value: string; Icon: LucideIcon }> = [
  { label: "Case", value: operationalIntelligenceSystem.caseId, Icon: ClipboardCheck },
  { label: "Hypothesis", value: operationalIntelligenceSystem.decisionPacket.hypothesis, Icon: GitBranch },
  { label: "Guardrail", value: "public-safe only", Icon: ShieldCheck }
];

export default async function AskPage({
  searchParams
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const params = await searchParams;
  const initialPrompt = params.prompt ?? "";

  return (
    <>
      <Section eyebrow="Reasoning interface" title="A public-safe control surface for Operational Intelligence questions.">
        <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-mint/25 bg-mint/[0.055]">
            <BrainCircuit className="mb-4 text-mint" />
            <h2 className="text-2xl font-semibold text-white">Every answer should behave like an operational artifact: grounded, bounded, cited, and willing to refuse.</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Query the same system spine that powers the Map and Operations Room: evidence graphs, hypothesis lifecycles,
              replayable investigations, decision traces, evaluation gates, and operator control planes.
            </p>
            <div className="mt-5 grid gap-2 md:grid-cols-4">
              {["Retrieve", "Ground", "Refuse", "Cite"].map((step) => (
                <span key={step} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase text-slate-300">
                  {step}
                </span>
              ))}
            </div>
          </Card>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {askContextCards.map(({ label, value, Icon }) => (
              <Card key={label} className="flex items-start gap-3 p-4">
                <Icon className="mt-1 shrink-0 text-signal" size={19} />
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-white">{value}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Chat initialPrompt={initialPrompt} suggestedPrompts={operationalIntelligenceSystem.askPrompts} />
      </Section>
    </>
  );
}
