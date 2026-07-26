import type { Metadata } from "next";
import { CheckCircle2, ShieldAlert, Target } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { TechnicalReviewPath } from "@/components/technical-review-path";
import { evalReport } from "@/content/site";

export const metadata: Metadata = {
  title: "Evals | Public Operational Intelligence Trust Report",
  description: "Public evaluation rubric for groundedness, refusal behavior, citation usefulness, and known limitations in the Operational Intelligence assistant."
};

const coverageBuckets = [
  {
    name: "Doctrine and definition",
    purpose: "Protects the canonical definition, boundaries, and category framing.",
    match: /definition|defined|operational intelligence|canonical|doctrine|glossary/i
  },
  {
    name: "Framework layers",
    purpose: "Covers the ten-layer model: signal through operator and learning.",
    match: /layer|signal|transaction|topology|evidence|hypothesis|reasoning|memory|evaluation|decision|learning|operator/i
  },
  {
    name: "Adjacent-domain comparison",
    purpose: "Keeps observability, AIOps, AgentOps, and incident-management distinctions precise.",
    match: /observability|aiops|agentops|different|versus|comparison/i
  },
  {
    name: "Evidence handling",
    purpose: "Checks contradiction, missing evidence, citations, source validity, and public receipts.",
    match: /evidence|contradictory|missing|citation|source|receipts|validity|unknown/i
  },
  {
    name: "Artifacts and routing",
    purpose: "Verifies that answers point to the right page, pack, PDF, walkthrough, or work surface.",
    match: /oi-room-001|operations room|publication pack|decision packet|walkthrough|executive summary|download|resume|background|work|artifact|page/i
  },
  {
    name: "Safety and refusal",
    purpose: "Protects confidential boundaries, prompt-injection resistance, and unsupported-question handling.",
    match: /internal|private|confidential|proprietary|ignore previous|bypass|system prompt|unsupported|unknown/i
  }
] as const;

export default function EvalsPage() {
  const coverage = coverageBuckets.map((bucket) => ({
    ...bucket,
    count: evalReport.fixtures.filter((fixture) => bucket.match.test(`${fixture.prompt} ${fixture.expected}`)).length
  }));

  return (
    <>
      <Section eyebrow="AI release gate" title="Operational AI should not ship without behavior evidence." level="h1">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <ShieldAlert className="mb-5 text-mint" />
            <p className="text-lg leading-8 text-slate-200">
              {evalReport.summary} The point is not to make the assistant sound impressive. The point is to make expected behavior explicit, reproducible, and hard to quietly regress.
            </p>
            <div className="mt-6 rounded-lg border border-mint/25 bg-mint/10 p-5">
              <p className="text-sm uppercase tracking-[0.18em] text-mint">Fixture coverage</p>
              <p className="mt-2 text-6xl font-semibold text-white">{evalReport.fixtures.length}/{evalReport.fixtures.length}</p>
              <p className="mt-2 text-sm text-slate-300">Last reviewed {evalReport.lastRun}</p>
              <p className="mt-1 text-sm text-slate-300">Backed by {evalReport.generatedBy}</p>
              <p className="mt-1 text-sm text-slate-300">Version {evalReport.version}</p>
              <p className="mt-1 text-sm text-slate-300">Model-based evaluation: {evalReport.modelBasedEvaluationUsed ? "used" : "not used"}</p>
              <p className="mt-4 text-sm leading-6 text-slate-300">{evalReport.method}</p>
            </div>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            {evalReport.dimensions.map((dimension) => (
              <Card key={dimension.name}>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">{dimension.name}</h2>
                  <span className="rounded border border-mint/30 bg-mint/10 px-2 py-1 text-xs font-semibold text-mint">{dimension.status}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{dimension.target}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Coverage matrix" title="What the deterministic fixtures are protecting.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coverage.map((bucket) => (
            <Card key={bucket.name} className="h-full">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">{bucket.name}</h2>
                <span className="rounded border border-mint/30 bg-mint/10 px-2 py-1 text-sm font-semibold text-mint">{bucket.count}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{bucket.purpose}</p>
            </Card>
          ))}
        </div>
        <Card className="mt-4 border-amber/25 bg-amber/[0.045]">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber">Interpretation rule</p>
          <p className="mt-3 leading-7 text-slate-300">
            These fixtures prove deterministic public-safety and answer-shape behavior. They do not prove live model quality, incident outcome improvement,
            or enterprise production readiness without replay-backed workflow tests and practitioner review.
          </p>
        </Card>
      </Section>

      <Section eyebrow="Regression fixtures" title="The questions the public assistant must handle correctly.">
        <div className="space-y-3">
          {evalReport.fixtures.map((fixture) => (
            <Card key={fixture.prompt} className="grid gap-4 md:grid-cols-[1fr_1fr_7rem] md:items-center">
              <div>
                <p className="text-sm text-slate-400">Prompt</p>
                <p className="mt-2 font-medium text-white">{fixture.prompt}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Expected behavior</p>
                <p className="mt-2 text-slate-300">{fixture.expected}</p>
              </div>
              <div className="flex items-center gap-2 text-mint">
                <CheckCircle2 size={18} />
                <span>{fixture.result}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Known limits" title="Trust grows when the system says what it cannot do yet.">
        <div className="grid gap-4 md:grid-cols-2">
          {evalReport.knownLimits.map((limit) => (
            <Card key={limit}>
              <Target className="mb-4 text-amber" />
              <p className="leading-7 text-slate-300">{limit}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="External review" title="The next trust signal is practitioner criticism.">
        <TechnicalReviewPath />
      </Section>
    </>
  );
}
