import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/card";
import { projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  return {
    title: project ? `${project.name} | seri.ai Projects` : "Projects | seri.ai",
    description: project?.summary,
    alternates: project
      ? {
          canonical: `/projects/${project.slug}`
        }
      : undefined,
    openGraph: project
      ? {
          title: project.name,
          description: project.summary,
          url: `/projects/${project.slug}`
        }
      : undefined
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber">{project.status}</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">{project.name}</h1>
      <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-300">{project.summary}</p>
      <Card className="mt-10">
        <h2 className="text-2xl font-semibold text-white">Pattern</h2>
        <p className="mt-4 text-lg leading-8 text-slate-200">{project.detail}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.capabilities.map((capability) => (
            <span key={capability} className="rounded bg-white/10 px-3 py-2 text-sm text-slate-200">
              {capability}
            </span>
          ))}
        </div>
      </Card>
    </section>
  );
}
