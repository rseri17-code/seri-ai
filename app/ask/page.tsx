import { Chat } from "@/components/chat";
import { Card } from "@/components/card";
import { ProfileMark } from "@/components/profile-mark";
import { Section } from "@/components/section";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, ClipboardCheck, GitBranch, Map, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Ravi | Public-grounded AI for Ravikanth Seri's Work",
  description: "Ask public-safe questions about Ravikanth Seri's work, Operational Intelligence thesis, architecture judgment, projects, background, writing, GitHub, LinkedIn signal, and AI systems."
};

const askContextCards: Array<{ label: string; value: string; Icon: LucideIcon }> = [
  { label: "Disclosure", value: "AI assistant, not Ravikanth personally", Icon: BrainCircuit },
  { label: "Scope", value: "Ravikanth's public work and Operational Intelligence thesis", Icon: ClipboardCheck },
  { label: "Evidence", value: "doctrine, architecture, projects, resume, GitHub, LinkedIn", Icon: GitBranch },
  { label: "Guardrail", value: "public-safe only", Icon: ShieldCheck }
];

const askRaviPrompts = [
  "What is Ravikanth building with seri.ai?",
  "What public evidence shows Ravikanth's architecture judgment?",
  "How does Ravikanth think about Operational Intelligence?",
  "Which projects best represent Ravikanth's AI and SRE work?",
  "What should a recruiter or founder understand about Ravikanth?",
  "Where can I review Ravikanth's GitHub, LinkedIn, resume, and public artifacts?"
];

const guidePaths = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Review doctrine", "Start with the canonical definition, boundaries, ten layers, glossary, and OI-ROOM-001 framing.", "Where should a technical reviewer start if they want the canonical doctrine?"],
  ["/wiki/operational-intelligence-reference-architecture", "Check architecture", "Inspect implementation contracts, state machines, schemas, governance controls, and conformance.", "Which asset defines implementation contracts, schemas, state machines, and conformance?"],
  ["/wiki/operational-intelligence-evidence-pack", "Inspect evidence", "Challenge the thesis through benchmarks, control cases, practitioner review, and falsification criteria.", "What evidence would convince a skeptical engineer that this model is useful?"],
  ["/wiki/operational-intelligence-publication-pack", "Download references", "Use diagrams, comparison tables, a decision packet, printable walkthroughs, and PDFs.", "Where can I download diagrams, comparison tables, a decision packet, and printable walkthroughs?"],
  ["/framework", "Learn the framework", "Walk through the ten layers with OI-ROOM-001.", "Walk me through the ten-layer framework."],
  ["/investigation-room", "Run the case", "Interact with evidence, hypotheses, replay, gates, and operator controls.", "Show how the shared case moves through the framework."],
  ["/work", "Understand the work", "See systems, frameworks, artifacts, writing, and background together.", "What is Ravikanth building and what public work supports it?"],
  ["/patterns", "Apply patterns", "Use reusable architecture solutions behind the operating model.", "Which patterns support evidence-driven investigation?"],
  ["/library", "Read deeper", "Open authored explanations and field notes.", "Which library asset explains why dashboards are not intelligence?"],
  ["/evals", "Inspect trust", "Review deterministic fixtures and known limitations.", "How does the evaluation gate work?"],
  ["/background", "Check credibility", "Review career evidence without making the site a resume.", "What public background supports this work?"]
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
      <Section eyebrow="Ask Ravi" title="Interrogate Ravikanth's public work, architecture judgment, and Operational Intelligence thesis." level="h1">
        <div className="mb-5 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-mint/25 bg-mint/[0.055]">
            <div className="mb-4 flex items-center gap-4">
              <ProfileMark />
              <div className="grid h-12 w-12 place-items-center rounded-lg border border-mint/30 bg-mint/10 text-mint">
                <BrainCircuit size={22} />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">Ask the work. Inspect the receipts.</h2>
            <p className="mt-3 leading-7 text-slate-300">
              Ask about Operational Intelligence, Agentic SRE, architecture tradeoffs, public projects, background,
              GitHub, LinkedIn signal, and the evidence behind the thesis. Strong answers cite sources, name uncertainty,
              and route you to the artifact worth inspecting next. Ask Ravi is an AI assistant over approved public content,
              not Ravikanth personally.
            </p>
            <div className="mt-5 grid gap-2 md:grid-cols-4">
              {["Know the work", "Ground claims", "Refuse secrets", "Route reviewers"].map((step) => (
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
        <Chat initialPrompt={initialPrompt} suggestedPrompts={askRaviPrompts} />
      </Section>

      <Section eyebrow="Guide paths" title="Use Ask Ravi as the navigation layer for the whole system.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {guidePaths.map(([href, title, detail, prompt]) => (
            <Card key={href} className="h-full p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
                  {href === "/library" ? <BookOpen size={18} /> : href === "/framework" ? <Map size={18} /> : <BrainCircuit size={18} />}
                </div>
                <Link href={href} className="text-slate-500 hover:text-mint" aria-label={`Open ${title}`}>
                  <ArrowRight size={17} />
                </Link>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{detail}</p>
              <Link
                href={`/ask?prompt=${encodeURIComponent(prompt)}`}
                className="mt-4 inline-flex items-center gap-2 rounded border border-mint/35 px-3 py-2 text-xs font-semibold text-mint"
              >
                Ask: {prompt}
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
