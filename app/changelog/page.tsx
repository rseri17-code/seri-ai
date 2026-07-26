import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { changelog } from "@/content/site";
import { buildPublishingIndex, getPublicationChangelog } from "@/lib/publishing";

export const metadata: Metadata = {
  title: "Changelog | seri.ai",
  description: "Product changelog for seri.ai as a living Operational Intelligence platform."
};

export default function ChangelogPage() {
  const publicationEntries = getPublicationChangelog();
  const entries = [...publicationEntries.slice(0, 20), ...changelog];
  const assets = buildPublishingIndex().filter((asset) => asset.status === "published");
  const latestDate = assets.map((asset) => asset.updatedAt).sort().at(-1) ?? "unknown";
  const releaseStats = [
    ["Published assets", assets.length],
    ["Publication entries", publicationEntries.length],
    ["Latest update", latestDate],
    ["Manual releases", changelog.length]
  ] as const;
  const releaseProof = [
    ["/wiki/operational-intelligence-canonical-doctrine", "Doctrine"],
    ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture"],
    ["/wiki/operational-intelligence-publication-pack", "Publication Pack"],
    ["/wiki/operational-intelligence-evidence-pack", "Evidence Pack"],
    ["/evals", "Trust Fixtures"],
    ["/rss.xml", "RSS"]
  ] as const;

  return (
    <>
      <Section eyebrow="Changelog" title="seri.ai as a living product." level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-mint/25 bg-mint/[0.05]">
            <h2 className="text-3xl font-semibold text-white">Every release should make the body of work more inspectable, not merely larger.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The changelog tracks public-safe publications, proof objects, evaluation surfaces, and product improvements that strengthen the Operational Intelligence reference system.
            </p>
          </Card>
          <div className="grid gap-3 md:grid-cols-2">
            {releaseStats.map(([label, value]) => (
              <Card key={label} className="p-4">
                <p className="text-sm font-semibold uppercase text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Release proof" title="Inspect the assets that define the current release.">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {releaseProof.map(([href, label]) => (
            <Link key={href} href={href}>
              <Card className="h-full p-4 transition hover:border-mint/40">
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-3 text-xs font-semibold uppercase text-mint">Open</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Release discipline" title="How seri.ai should evolve from here.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Version deliberately", "Canonical doctrine and reference architecture changes should move as v1.x revisions unless evidence requires a breaking revision."],
            ["Prefer stronger assets", "Improve definitions, diagrams, examples, evals, and evidence packs before adding unrelated pages."],
            ["Preserve public safety", "Every release must avoid confidential employer details, proprietary names, private logs, screenshots, dashboards, and internal architecture."]
          ].map(([title, body]) => (
            <Card key={title} className="h-full">
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Release ledger" title="Published changes and generated publication entries.">
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
    </>
  );
}
