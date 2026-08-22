import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ClipboardCheck, GitBranch, Route, ShieldCheck } from "lucide-react";
import { Card } from "@/components/card";
import { operationalIntelligenceFramework, projectProof, projects } from "@/content/site";
import { buildPublishingIndex } from "@/lib/publishing";

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

const projectContracts = {
  "ai-incident-investigation-simulator": {
    layerIndexes: [0, 1, 3, 4, 6, 7, 9],
    evidencePath: ["Signal intake", "Transaction timing", "Evidence graph", "Hypothesis lifecycle", "Evaluation gate", "Decision packet", "Operator approval"],
    failureModes: [
      "Visual incident demo with no cited evidence trail.",
      "RCA summary hides contradictory or missing evidence.",
      "Recommendation implies action without human approval."
    ],
    references: [
      ["/investigation-room", "Open Operations Room"],
      ["/publication-pack/oi-room-001-printable-walkthrough.md", "Printable walkthrough"],
      ["/publication-pack/decision-packet-example.md", "Decision packet"]
    ]
  },
  "operational-intelligence-copilot": {
    layerIndexes: [3, 4, 5, 6, 7, 9],
    evidencePath: ["Approved retrieval", "Evidence filtering", "Boundary check", "Grounded answer", "Citation handoff", "Human review"],
    failureModes: [
      "Assistant imitates a persona instead of citing public assets.",
      "Confidential or unknown questions receive confident answers.",
      "Related pages are not surfaced when the answer needs deeper context."
    ],
    references: [
      ["/ask", "Ask Ravi"],
      ["/evals", "Trust fixtures"],
      ["/wiki/operational-intelligence-evidence-pack", "Evidence pack"]
    ]
  },
  "transaction-graph-explorer": {
    layerIndexes: [1, 2, 3, 4, 5],
    evidencePath: ["Journey reconstruction", "Dependency boundary", "Ownership context", "Impact mapping", "Known pattern retrieval"],
    failureModes: [
      "Graph structure does not improve an operational decision.",
      "Service topology is mistaken for customer journey impact.",
      "Stale ownership or dependency context weakens blast-radius claims."
    ],
    references: [
      ["/map", "Operational map"],
      ["/patterns/transaction-journey-reconstruction", "Transaction pattern"],
      ["/wiki/transaction-journeys", "Transaction note"]
    ]
  },
  "ai-evaluation-workbench": {
    layerIndexes: [3, 4, 6, 8, 9],
    evidencePath: ["Scenario fixture", "Expected behavior", "Grounding check", "Refusal check", "Regression result", "Release gate"],
    failureModes: [
      "Trust is reduced to a single score with no dimension-level evidence.",
      "Eval cases ignore missing context, red herrings, or confidentiality boundaries.",
      "Production corrections never become replay fixtures."
    ],
    references: [
      ["/evals", "Public evals"],
      ["/patterns/evaluation-and-replay", "Evaluation pattern"],
      ["/wiki/evaluation-and-replay", "Evaluation note"]
    ]
  }
} as const;

const inspectionLabels: Record<string, string> = {
  "/investigation-room": "Operations Room",
  "/publication-pack/oi-room-001-printable-walkthrough.md": "Printable walkthrough",
  "/publication-pack/decision-packet-example.md": "Decision packet",
  "/wiki/operational-intelligence-evidence-pack": "Evidence pack",
  "/ask": "Ask Ravikanth",
  "/evals": "Public evals",
  "/work": "Work index",
  "/map": "Operational map",
  "/patterns/transaction-journey-reconstruction": "Transaction journey pattern",
  "/wiki/transaction-journeys": "Transaction journeys note",
  "/ideas/transaction-intelligence-for-complex-enterprises": "Transaction Intelligence article",
  "/patterns/evaluation-and-replay": "Evaluation pattern",
  "/wiki/evaluation-and-replay": "Evaluation note"
};

const inspectionLink = (href: string): [string, string] => [href, inspectionLabels[href] ?? href.replace(/^\//, "").replace(/[-/]/g, " ")];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }
  const contract = projectContracts[project.slug as keyof typeof projectContracts];
  const proof = projectProof.items.find((item) => item.slug === project.slug);
  const relatedLayers = contract.layerIndexes.map((index) => operationalIntelligenceFramework.layers[index]);
  const asset = buildPublishingIndex().find((item) => item.url === `/projects/${project.slug}`);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber">{project.status}</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">{project.name}</h1>
      <p className="mt-5 max-w-3xl text-xl leading-8 text-slate-300">{project.summary}</p>

      <div className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="border-mint/25 bg-mint/[0.05]">
          <ShieldCheck className="mb-5 text-mint" />
          <h2 className="text-2xl font-semibold text-white">Operating contract</h2>
          <p className="mt-4 text-lg leading-8 text-slate-200">{project.detail}</p>
          {proof ? (
            <div className="mt-5 rounded border border-white/10 bg-black/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint">Public proof claim</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{proof.claim}</p>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.capabilities.map((capability) => (
              <span key={capability} className="rounded bg-white/10 px-3 py-2 text-sm text-slate-200">
                {capability}
              </span>
            ))}
          </div>
        </Card>

        <Card>
          <Route className="mb-5 text-signal" />
          <h2 className="text-2xl font-semibold text-white">Evidence path</h2>
          <div className="mt-5 grid gap-2">
            {contract.evidencePath.map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded border border-white/10 bg-ink p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-signal/10 font-mono text-xs text-signal">{index + 1}</span>
                <span className="text-sm font-semibold text-slate-100">{step}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <GitBranch className="mb-5 text-mint" />
          <h2 className="text-2xl font-semibold text-white">Framework handoff</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {relatedLayers.map((layer) => (
              <Link key={layer.name} href={layer.relatedPattern} className="rounded border border-white/10 bg-ink p-4 transition hover:border-mint/40">
                <p className="text-xs font-semibold uppercase text-signal">{layer.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{layer.output}</p>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="border-amber/25 bg-amber/[0.045]">
          <ClipboardCheck className="mb-5 text-amber" />
          <h2 className="text-2xl font-semibold text-white">Failure modes to avoid</h2>
          <ul className="mt-5 space-y-3">
            {contract.failureModes.map((failureMode) => (
              <li key={failureMode} className="rounded border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-200">
                {failureMode}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_0.95fr_0.9fr]">
        {proof ? (
          <Card className="border-mint/25 bg-mint/[0.045]">
            <ClipboardCheck className="mb-5 text-mint" />
            <h2 className="text-2xl font-semibold text-white">Project proof ledger</h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Inspectable evidence", proof.evidence],
                ["Boundary", proof.limitation],
                ["Next proof", proof.nextProof],
                ["Reviewer question", proof.reviewQuestion]
              ].map(([label, body]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-signal">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{body}</p>
                </div>
              ))}
            </div>
          </Card>
        ) : null}

        <Card>
          <h2 className="text-2xl font-semibold text-white">Review this project through the reference system</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3 lg:grid-cols-1">
            {(proof ? proof.inspectionPath.map(inspectionLink) : contract.references).map(([href, label]) => (
              <Link key={href} href={href} className="rounded border border-white/10 bg-ink p-4 transition hover:border-signal/40">
                <span className="font-semibold text-white">{label}</span>
                <span className="mt-3 flex items-center gap-2 text-sm font-semibold text-mint">
                  Inspect <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {asset ? (
          <Card className="border-signal/25 bg-signal/[0.045]">
            <h2 className="text-2xl font-semibold text-white">Ask this project</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">Use the indexed proof object to test how this artifact connects to the Operational Intelligence model.</p>
            <div className="mt-5 space-y-2">
              {asset.askQuestions.slice(0, 3).map((question) => (
                <Link key={question} href={`/ask?prompt=${encodeURIComponent(question)}`} className="block rounded border border-white/10 bg-black/20 p-3 text-sm leading-6 text-slate-200 transition hover:border-mint/40 hover:text-mint">
                  {question}
                </Link>
              ))}
            </div>
          </Card>
        ) : null}
      </div>
    </section>
  );
}
