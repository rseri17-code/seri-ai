export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase text-signal">Loading public context</p>
        <div className="mt-4 h-10 w-3/4 rounded bg-white/10" />
        <div className="mt-4 h-4 w-full rounded bg-white/10" />
        <div className="mt-3 h-4 w-2/3 rounded bg-white/10" />
      </div>
    </section>
  );
}
