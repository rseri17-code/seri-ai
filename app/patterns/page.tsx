import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { patterns } from "@/content/site";

export const metadata: Metadata = {
  title: "Architecture Patterns | Ravikanth Seri — Operational Intelligence",
  description: "Public-safe architecture patterns for Operational Intelligence, AI incident investigation, transaction intelligence, operational memory, and evaluation."
};

export default function PatternsPage() {
  return (
    <Section eyebrow="Patterns" title="Architecture patterns for AI-native operational systems.">
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
