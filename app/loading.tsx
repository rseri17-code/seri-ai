export default function Loading() {
  return (
    <section aria-busy="true" aria-label="Loading page" className="grid-bg border-b border-white/10">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:min-h-[72vh] lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="max-w-3xl">
          <div className="h-8 w-64 animate-pulse rounded-full border border-mint/15 bg-mint/[0.06]" />
          <div className="mt-6 h-14 w-full max-w-2xl animate-pulse rounded bg-white/10 sm:h-20" />
          <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded bg-white/10" />
          <div className="mt-3 h-5 w-4/5 max-w-lg animate-pulse rounded bg-white/10" />
          <div className="mt-6 flex gap-3">
            <div className="h-12 w-40 animate-pulse rounded bg-mint/20" />
            <div className="h-12 w-36 animate-pulse rounded border border-white/10 bg-white/[0.04]" />
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {["", "", "", ""].map((_, index) => (
              <div key={index} className="h-20 animate-pulse rounded border border-white/10 bg-black/25" />
            ))}
          </div>
        </div>
        <div className="hidden rounded-lg border border-white/10 bg-black/25 p-4 lg:block">
          <div className="h-full min-h-[360px] animate-pulse rounded border border-mint/10 bg-[radial-gradient(circle_at_30%_25%,rgba(95,242,181,0.14),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
        </div>
      </div>
    </section>
  );
}
