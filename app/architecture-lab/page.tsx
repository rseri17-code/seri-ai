import { Network, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { architectureCards } from "@/content/site";

export default function ArchitectureLabPage() {
  return (
    <Section eyebrow="Architecture lab" title="Reusable patterns for AI-native operational platforms.">
      <div className="grid gap-4 md:grid-cols-2">
        {architectureCards.map((card) => (
          <Card key={card.title}>
            <div className="flex items-start justify-between gap-4">
              <Network className="text-signal" />
              <ShieldCheck className="text-mint" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-white">{card.title}</h2>
            <p className="mt-4 rounded border border-white/10 bg-ink p-4 font-mono text-sm leading-6 text-slate-200">{card.pattern}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <span key={tag} className="rounded bg-white/10 px-3 py-1 text-sm text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
