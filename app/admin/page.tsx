import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { articles, projects, architectureCards } from "@/content/site";
import { askAlertSignals, askBlockedMetadataFields, askOperationalModes, askSafeMetadataFields, askSloTargets } from "@/lib/ask-observability";
import { buildKnowledgeGraph, buildMonthlyNewsletterExport, buildPublishingIndex } from "@/lib/publishing";

export const metadata: Metadata = {
  title: "Content Operations Dashboard | seri.ai",
  description: "Operational dashboard for seri.ai publishing, knowledge graph, practitioner review, and Ask-ready content workflows.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  const publishingAssets = buildPublishingIndex();
  const publishingGraph = buildKnowledgeGraph();
  const newsletterExport = buildMonthlyNewsletterExport("2026-07");
  const practitionerReviewContract = [
    ["Storage", "contact_messages.kind = practitioner-review"],
    ["Queryable view", "practitioner_reviews"],
    ["Fields", "reviewer role, doctrine verdict, mode, dimension, verdict, artifacts inspected, review disposition, evidence observed, reasoning loss, limitation, doctrine impact"],
    ["Release gate", "npm run validate:contracts"],
    ["Public entry", "/contact"]
  ];

  return (
    <Section eyebrow="Admin" title="Content operations dashboard." level="h1">
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
        <h2 className="text-xl font-semibold text-white">Ask Ravi observability contract</h2>
        <p className="mt-3 leading-7 text-slate-300">
          Ask telemetry is intentionally metadata-only. It should help operators understand latency, grounding, fallback behavior,
          and safety pressure without storing raw visitor prompts, contact details, or private feedback text.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-mint/20 bg-mint/[0.045] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Allowed metadata</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {askSafeMetadataFields.map((field) => (
                <span key={field} className="rounded border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-slate-200">
                  {field}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-amber/20 bg-amber/[0.045] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber">Never capture</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {askBlockedMetadataFields.map((field) => (
                <span key={field} className="rounded border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-slate-200">
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Answer modes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {askOperationalModes.answerModes.map((mode) => (
                <span key={mode} className="rounded border border-mint/20 px-3 py-2 font-mono text-xs text-mint">
                  {mode}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Retrieval modes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {askOperationalModes.retrievalModes.map((mode) => (
                <span key={mode} className="rounded border border-signal/20 px-3 py-2 font-mono text-xs text-signal">
                  {mode}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-mint">SLO-style targets</h3>
            <div className="mt-3 grid gap-2">
              {askSloTargets.map(([label, detail]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-amber">Alert signals</h3>
            <div className="mt-3 grid gap-2">
              {askAlertSignals.map(([label, detail]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
      <Card className="mt-5">
        <h2 className="text-xl font-semibold text-white">This Month on seri.ai export</h2>
        <pre className="mt-4 max-h-96 overflow-auto rounded border border-white/10 bg-black/30 p-4 text-xs leading-5 text-slate-300">{newsletterExport}</pre>
      </Card>
    </Section>
  );
}
