import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { articles, projects, architectureCards } from "@/content/site";

export default function AdminPage() {
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
      <Card className="mt-5">
        <h2 className="text-xl font-semibold text-white">Ingestion endpoint</h2>
        <p className="mt-3 text-slate-300">
          POST approved public content to <code className="rounded bg-ink px-2 py-1">/api/ingest</code> with the admin bearer token to create pgvector-backed chunks.
        </p>
      </Card>
    </Section>
  );
}
