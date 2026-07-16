import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { changelog } from "@/content/site";
import { getPublicationChangelog } from "@/lib/publishing";

export const metadata: Metadata = {
  title: "Changelog | seri.ai",
  description: "Product changelog for seri.ai as a living Operational Intelligence platform."
};

export default function ChangelogPage() {
  const entries = [...getPublicationChangelog().slice(0, 20), ...changelog];

  return (
    <Section eyebrow="Changelog" title="seri.ai as a living product.">
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.version}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-white">{entry.version} — {entry.title}</h2>
              <span className="text-sm text-slate-400">{entry.date}</span>
            </div>
            <p className="mt-3 leading-7 text-slate-300">{entry.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span key={tag} className="rounded border border-white/10 px-2 py-1 text-xs text-slate-300">
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
