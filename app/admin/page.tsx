import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { articles, projects, architectureCards } from "@/content/site";
import { buildKnowledgeGraph, buildMonthlyNewsletterExport, buildPublishingIndex } from "@/lib/publishing";

export default function AdminPage() {
  const publishingAssets = buildPublishingIndex();
  const publishingGraph = buildKnowledgeGraph();
  const newsletterExport = buildMonthlyNewsletterExport("2026-07");
  const practitionerReviewContract = [
    ["Storage", "contact_messages.kind = practitioner-review"],
    ["Queryable view", "practitioner_reviews"],
    ["Fields", "reviewer role, doctrine verdict, strongest claim, weakest claim, evidence needed, implementation question"],
    ["Release gate", "npm run validate:contracts"],
    ["Public entry", "/contact"]
  ];

  return (
    <Section eyebrow="Admin" title="Content operations dashboard.">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-400">Approved articles</p>
          <p className="mt-3 text-5xl font-semibold text-white">{articles.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Project patterns</p>
          <p className="mt-3 text-5xl font-semibold text-white">{projects.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-400">Architecture cards</p>
          <p className="mt-3 text-5xl font-semibold text-white">{architectureCards.length}</p>
        </Card>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-4">
        {[
          ["Published assets", publishingAssets.filter((asset) => asset.status === "published").length],
          ["Framework connections", publishingAssets.flatMap((asset) => asset.frameworkLayers).length],
          ["Graph relationships", publishingGraph.relationships.length],
          ["Ask-ready prompts", publishingAssets.flatMap((asset) => asset.askQuestions).length]
        ].map(([label, value]) => (
          <Card key={label} className="p-4">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-5">
        <h2 className="text-xl font-semibold text-white">Ingestion endpoint</h2>
        <p className="mt-3 text-slate-300">
          POST approved public content to <code className="rounded bg-ink px-2 py-1">/api/ingest</code> with the admin bearer token to create pgvector-backed chunks.
        </p>
      </Card>
      <Card className="mt-5">
        <h2 className="text-xl font-semibold text-white">Editorial workflow</h2>
        <p className="mt-3 text-slate-300">Draft → Review → Approve → Publish → Index → Notify Ask → Update related pages → Update search → Update RSS → Update sitemap → Update changelog</p>
      </Card>
      <Card className="mt-5">
        <h2 className="text-xl font-semibold text-white">Practitioner review operations</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Skeptical review should become product evidence. The contact API stores structured practitioner reviews,
          and Supabase exposes a queryable view for doctrine verdicts, challenged claims, evidence requests, and implementation blockers.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {practitionerReviewContract.map(([label, value]) => (
            <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{value}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="mt-5">
        <h2 className="text-xl font-semibold text-white">This Month on seri.ai export</h2>
        <pre className="mt-4 max-h-96 overflow-auto rounded border border-white/10 bg-black/30 p-4 text-xs leading-5 text-slate-300">{newsletterExport}</pre>
      </Card>
    </Section>
  );
}
