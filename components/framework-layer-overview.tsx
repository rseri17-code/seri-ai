import { operationalIntelligenceFramework } from "@/content/site";

export function FrameworkLayerOverview() {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="border-b border-white/10 px-4 py-3 sm:px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Ten-layer filing system at a glance</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">
          Filing labels for retrieval. Open a row in the explorer below only when you need the case walkthrough.
        </p>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left">
          <caption className="sr-only">The ten Operational Intelligence filing layers, with the operator question each one answers.</caption>
          <thead className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            <tr className="border-b border-white/10">
              <th scope="col" className="whitespace-nowrap px-4 py-2 sm:px-5">
                Layer
              </th>
              <th scope="col" className="px-4 py-2 sm:px-5">
                Operator question
              </th>
              <th scope="col" className="whitespace-nowrap px-4 py-2 sm:px-5">
                Room stage
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm">
            {operationalIntelligenceFramework.layers.map((layer, index) => (
              <tr key={layer.name}>
                <th scope="row" className="whitespace-nowrap px-4 py-3 font-semibold text-white sm:px-5">
                  <span className="mr-2 font-mono text-xs text-mint">{String(index + 1).padStart(2, "0")}</span>
                  {layer.name}
                </th>
                <td className="min-w-0 px-4 py-3 leading-6 text-slate-300 sm:px-5">{layer.operatorQuestion}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-400 sm:px-5">{layer.operationsStage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
