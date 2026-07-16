"use client";

import Link from "next/link";
import { ArrowRight, GitBranch, Layers, Play, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Card } from "@/components/card";
import { operationalIntelligenceFramework, operationalIntelligenceSystem } from "@/content/site";

export function FrameworkTeacher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeLayer = operationalIntelligenceFramework.layers[activeIndex];
  const upstream = activeIndex > 0 ? operationalIntelligenceFramework.layers[activeIndex - 1] : null;
  const downstream = activeIndex < operationalIntelligenceFramework.layers.length - 1 ? operationalIntelligenceFramework.layers[activeIndex + 1] : null;
  const askHref = useMemo(() => `/ask?prompt=${encodeURIComponent(activeLayer.askPrompt)}`, [activeLayer.askPrompt]);

  return (
    <div className="grid gap-5 xl:grid-cols-[22rem_1fr]">
      <Card className="h-fit p-4">
        <p className="text-xs font-semibold uppercase text-slate-500">Teaching sequence</p>
        <div className="mt-4 grid gap-2">
          {operationalIntelligenceFramework.layers.map((layer, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={layer.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-lg border p-3 text-left transition ${
                  selected ? "border-mint/40 bg-mint/[0.08]" : "border-white/10 bg-black/20 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={selected ? "font-mono text-xs text-mint" : "font-mono text-xs text-slate-500"}>{String(index + 1).padStart(2, "0")}</span>
                  <span className="rounded border border-white/10 px-2 py-1 text-[0.65rem] uppercase text-slate-400">{layer.operationsStage}</span>
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{layer.name}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{layer.operatorQuestion}</p>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="space-y-5">
        <Card className="border-mint/25 bg-mint/[0.045]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-mono text-sm text-mint">
                {String(activeIndex + 1).padStart(2, "0")} / {operationalIntelligenceFramework.layers.length}
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">{activeLayer.name}</h2>
              <p className="mt-3 text-lg leading-8 text-slate-200">{activeLayer.definition}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/25 p-4 lg:w-72">
              <p className="text-xs font-semibold uppercase text-slate-500">Shared case</p>
              <p className="mt-2 font-mono text-sm text-signal">{operationalIntelligenceSystem.caseId}</p>
              <p className="mt-1 text-sm font-semibold text-white">{operationalIntelligenceSystem.caseTitle}</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <Layers className="mb-4 text-mint" />
            <h3 className="text-2xl font-semibold text-white">What this layer does</h3>
            <div className="mt-4 grid gap-3">
              {[
                ["Why it exists", activeLayer.problemSolved],
                ["Core responsibility", activeLayer.coreResponsibility],
                ["Operator question", activeLayer.operatorQuestion],
                ["What can go wrong", activeLayer.failureMode]
              ].map(([label, value]) => (
                <div key={label} className="rounded border border-white/10 bg-black/20 p-3">
                  <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <GitBranch className="mb-4 text-signal" />
            <h3 className="text-2xl font-semibold text-white">How it appears in OI-ROOM-001</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{activeLayer.caseExample}</p>
            <div className="mt-4 rounded border border-signal/25 bg-signal/[0.07] p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">Operations Room stage</p>
              <p className="mt-2 font-semibold text-white">{activeLayer.operationsStage}</p>
            </div>
            <Link href={`/investigation-room?stage=${encodeURIComponent(activeLayer.operationsStage)}`} className="mt-4 inline-flex items-center gap-2 rounded border border-mint/35 px-4 py-2 text-sm font-semibold text-mint">
              Open stage <ArrowRight size={15} />
            </Link>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">Inputs</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{activeLayer.input}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-semibold uppercase text-mint">Outputs</p>
            <p className="mt-3 text-sm leading-6 text-slate-200">{activeLayer.output}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-semibold uppercase text-signal">Adjacent layers</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{activeLayer.adjacentLayers}</p>
          </Card>
        </div>

        <Card>
          <ShieldCheck className="mb-4 text-amber" />
          <h3 className="text-2xl font-semibold text-white">Follow the dependency path</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded border border-white/10 bg-black/20 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">Upstream</p>
              <p className="mt-2 text-sm font-semibold text-white">{upstream?.name ?? "Case intake"}</p>
            </div>
            <div className="rounded border border-mint/30 bg-mint/[0.08] p-3">
              <p className="text-xs font-semibold uppercase text-mint">Current</p>
              <p className="mt-2 text-sm font-semibold text-white">{activeLayer.name}</p>
            </div>
            <div className="rounded border border-white/10 bg-black/20 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">Downstream</p>
              <p className="mt-2 text-sm font-semibold text-white">{downstream?.name ?? "Human-owned outcome"}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={askHref} className="inline-flex items-center gap-2 rounded bg-mint px-4 py-2 text-sm font-semibold text-ink">
              Ask this layer <Play size={15} />
            </Link>
            <Link href={activeLayer.relatedPattern} className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white">
              Related pattern
            </Link>
            <Link href={activeLayer.relatedLibraryAsset} className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white">
              Library asset
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
