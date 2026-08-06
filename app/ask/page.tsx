import { Chat } from "@/components/chat";
import { Card } from "@/components/card";
import { ProfileMark } from "@/components/profile-mark";
import { Section } from "@/components/section";
import { homeLinkedInSignals } from "@/content/home";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, ClipboardCheck, GitBranch, Map, Network, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Ravikanth | Operational Intelligence Public Research Interface",
  description: "Question Ravikanth Seri's Operational Intelligence thesis, architecture judgment, projects, background, writing, GitHub, LinkedIn signal, and AI systems through cited public evidence."
};

const askContextCards: Array<{ label: string; value: string; Icon: LucideIcon }> = [
  { label: "Sources", value: "doctrine, architecture, projects, resume, GitHub, LinkedIn", Icon: GitBranch },
  { label: "Discipline", value: "cite evidence, separate inference, route to artifacts", Icon: ClipboardCheck },
  { label: "Boundary", value: "public evidence only; uncertainty stays visible", Icon: ShieldCheck }
];

const askRaviPrompts = [
  "What is Ravikanth building with seri.ai?",
  "What does Ravikanth mean by Context Acquisition Tax?",
  "What is the Enterprise Context Layer?",
  "Why is the harness more important than the model for SRE agents?",
  "What does ops for observability mean?",
  "How is observability for AI different from normal observability?",
  "What public evidence shows Ravikanth's architecture judgment?",
  "How does Ravikanth think about Operational Intelligence?",
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

const thesisLenses = [
  {
    label: "Context",
    title: "Enterprise Context Layer",
    prompt: "What is the Enterprise Context Layer and why does it matter for operational AI?",
    body: homeLinkedInSignals.find((signal) => signal.name === "Enterprise Context Layer")?.description ?? ""
  },
  {
    label: "Cost",
    title: "Context Acquisition Tax",
    prompt: "What does Ravikanth mean by Context Acquisition Tax?",
    body: homeLinkedInSignals.find((signal) => signal.name === "Context Acquisition Tax")?.description ?? ""
  },
  {
    label: "Systems",
    title: "Harness over model",
    prompt: "Why is the harness more important than the model for SRE agents?",
    body: homeLinkedInSignals.find((signal) => signal.name === "Harness over model")?.description ?? ""
  },
  {
    label: "Operations",
    title: "Dynamic operational view",
    prompt: "Why is a dynamic operational view different from a static graph?",
    body: homeLinkedInSignals.find((signal) => signal.name === "Dynamic operational view")?.description ?? ""
  },
  {
    label: "Telemetry",
    title: "Ops for observability",
    prompt: "What does ops for observability mean?",
    body: homeLinkedInSignals.find((signal) => signal.name === "Ops for observability")?.description ?? ""
  },
  {
    label: "AI systems",
    title: "Observability for AI",
    prompt: "How is observability for AI different from normal observability?",
    body: homeLinkedInSignals.find((signal) => signal.name === "Observability for AI")?.description ?? ""
  }
] as const;

export default async function AskPage({
  searchParams
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const params = await searchParams;
  const initialPrompt = params.prompt ?? "";

  return (
    <>
      <Section eyebrow="Ask Ravikanth" title="Ask the public record to defend the thesis." level="h1">
        <Chat initialPrompt={initialPrompt} suggestedPrompts={askRaviPrompts} />
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.055] p-5">
            <div className="mb-5 flex items-center gap-4">
              <ProfileMark size="sm" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Public research interface</p>
                <p className="mt-1 text-sm text-slate-400">Operational Intelligence, systems judgment, projects, background, and artifacts.</p>
              </div>
            </div>
            <h2 className="text-3xl font-semibold leading-tight text-white">A serious idea should answer questions with receipts.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Ask Ravikanth about the doctrine, architecture, Operations Room, projects, background, and public work. The assistant cites approved sources, names uncertainty, and stops at the public-safe boundary.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {["Ground claims", "Expose sources", "Separate inference", "Stop at evidence"].map((step) => (
                <span key={step} className="rounded border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold uppercase text-slate-300">
                  {step}
                </span>
              ))}
            </div>
          </Card>
          <div className="grid gap-3 md:grid-cols-3">
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
      </Section>

      <Section eyebrow="Thesis lenses" title="Start with the questions Ravikanth keeps returning to.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {thesisLenses.map((lens) => (
            <Card key={lens.title} className="h-full p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-mint/30 bg-mint/10 text-mint">
                  <Network size={18} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{lens.label}</p>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">{lens.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{lens.body}</p>
              <Link
                href={`/ask?prompt=${encodeURIComponent(lens.prompt)}`}
                className="mt-4 inline-flex items-center gap-2 rounded border border-mint/35 px-3 py-2 text-xs font-semibold text-mint"
              >
                Ask this lens <ArrowRight size={14} />
              </Link>
            </Card>
          ))}
        </div>
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
