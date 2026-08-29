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
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { patterns } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Architecture Patterns | Ravikanth Seri — Operational Intelligence",
  description: "Public-safe architecture patterns for Operational Intelligence, AI incident investigation, transaction intelligence, operational memory, and evaluation.",
  path: "/patterns"
});

export default function PatternsPage() {
  return (
    <Section eyebrow="Patterns" title="Architecture patterns for AI-native operational systems." level="h1">
      <div className="grid gap-4 md:grid-cols-2">
        {patterns.map((pattern) => (
          <Link key={pattern.slug} href={`/patterns/${pattern.slug}`}>
            <Card className="h-full transition hover:border-signal/40">
              <h2 className="text-2xl font-semibold text-white">{pattern.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{pattern.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {pattern.tags.map((tag) => (
                  <span key={tag} className="rounded border border-white/10 px-2 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
