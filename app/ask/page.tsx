/**
 * VISITOR-FACING COPY — Claude's lane. Codex: do not edit prose in this file.
 *
 * Every string a visitor reads on this page is owned by one agent, by Ravikanth's ruling on
 * 2026-08-29. Two agents rewriting the same copy produced draft-quality output and repeated
 * reversions, so ownership is now split by kind of change, not by file:
 *
 *   Claude  — headings, paragraphs, labels, link text, alt text, microcopy, section order.
 *   Codex   — data wiring, imports, props, components, layout mechanics, accessibility
 *             attributes, performance. Structural work here is welcome.
 *
 * If a validator pin fails because copy moved, do not rewrite the copy to satisfy the pin.
 * Repoint the pin, or leave it and say so in CLAUDE_HANDOFF.md. Copy written to satisfy a
 * grep target is how this page ended up with a paragraph that existed only to hold pins.
 */
import { Chat } from "@/components/chat";
import { Card } from "@/components/card";
import { ProfileMark } from "@/components/profile-mark";
import { Section } from "@/components/section";
import { askContextCards, askGuidePaths, askRaviPrompts, askThesisLenses } from "@/content/ask";
import { evalReport } from "@/content/site";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, ClipboardCheck, GitBranch, Map, Network, ShieldCheck, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Ravikanth | Evidence Console for Ravikanth Seri's Public Work",
  description: "Ask an AI grounded in Ravikanth Seri's public work on Operational Intelligence. Every answer cites its sources.",
  alternates: { canonical: "/ask" },
  openGraph: {
    title: "Ask Ravikanth | Evidence Console for Ravikanth Seri's Public Work",
    description: "An AI assistant over Ravikanth Seri's public work and professional graph. It cites what it knows, names what it doesn't, and won't discuss non-public work.",
    url: "/ask",
    type: "website"
  }
};

const askContextIcons: Record<string, LucideIcon> = {
  Boundary: ShieldCheck,
  Discipline: ClipboardCheck,
  Sources: GitBranch
};




export default async function AskPage({
  searchParams
}: {
  searchParams: Promise<{ prompt?: string }>;
}) {
  const params = await searchParams;
  const evalFixtureCount = evalReport.fixtures.length;
  const initialPrompt = params.prompt ?? "";

  return (
    <>
      <Section eyebrow="Ask Ravikanth" title="Ask the public record." level="h1">
        <Chat initialPrompt={initialPrompt} suggestedPrompts={askRaviPrompts} />
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.055] p-5">
            <div className="mb-5 flex items-center gap-4">
              <ProfileMark size="sm" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Evidence console</p>
                <p className="mt-1 text-sm text-slate-400">Career evidence, systems judgment, public code, doctrine, and artifacts.</p>
              </div>
            </div>
            <p className="text-3xl font-semibold leading-tight text-white">A serious technical claim should survive inspection.</p>
            <p className="mt-4 leading-7 text-slate-300">
              An AI assistant over Ravikanth&apos;s public writing, architecture, and evidence. It cites what it knows, names what it doesn&apos;t, and won&apos;t discuss non-public work.
            </p>
            <p className="mt-4 rounded border border-amber/25 bg-amber/[0.05] p-4 text-sm leading-6 text-slate-300">
              <span className="font-semibold text-amber">How this actually works.</span> There is no model in the loop. Retrieval is
              lexical and answers are assembled deterministically from approved public sources, so the same question returns the same
              answer. That limits how fluent it can be, and it is why every answer names its source and its unknowns. Behaviour is held
              to {" "}{evalFixtureCount} deterministic checks that run on every build.
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
            {askContextCards.map(({ label, value }) => {
              const Icon = askContextIcons[label] ?? ShieldCheck;
              return (
                <Card key={label} className="flex items-start gap-3 p-4">
                  <Icon className="mt-1 shrink-0 text-signal" size={19} />
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
                    <p className="mt-1 text-sm font-semibold leading-6 text-white">{value}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>

      <Section eyebrow="Thesis lenses" title="Start with the questions Ravikanth keeps returning to.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {askThesisLenses.map((lens) => (
            <Card key={lens.title} className="h-full p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-mint/30 bg-mint/10 text-mint">
                  <Network size={18} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{lens.label}</p>
              </div>
              <p className="mt-4 text-xl font-semibold text-white">{lens.title}</p>
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

      <Section eyebrow="Guide paths" title="Use Ask Ravikanth to move from question to evidence.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {askGuidePaths.map(([href, title, detail, prompt]) => (
            <Card key={href} className="h-full p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg border border-signal/30 bg-signal/10 text-signal">
                  {href === "/library" ? <BookOpen size={18} /> : href === "/framework" ? <Map size={18} /> : <BrainCircuit size={18} />}
                </div>
                <Link href={href} className="inline-flex min-h-[24px] min-w-[24px] items-center justify-center text-slate-400 hover:text-mint" aria-label={`Open ${title}`}>
                  <ArrowRight size={17} />
                </Link>
              </div>
              <p className="mt-4 text-xl font-semibold text-white">{title}</p>
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
