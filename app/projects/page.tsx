import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { projects } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Projects | Ravikanth Seri — Operational Intelligence",
  description: "Public-safe project patterns for Operational Intelligence, transaction graphs, AI evaluation, and enterprise AI architecture.",
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <Section eyebrow="Projects" title="Builds and the patterns they turned into." level="h1">
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <Card className="h-full transition hover:border-signal/40">
              <p className="text-sm text-amber">{project.status}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{project.name}</h2>
              <p className="mt-3 text-slate-300">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.capabilities.map((capability) => (
                  <span key={capability} className="rounded border border-white/10 px-2 py-1 text-xs text-slate-300">
                    {capability}
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
