"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase text-amber">Recovery state</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">This surface did not render cleanly.</h1>
      <p className="mt-4 leading-7 text-slate-300">
        The beta is designed to fail closed: no confidential data is exposed, and the public framework remains available.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="rounded bg-mint px-4 py-2 font-semibold text-ink">
          Retry
        </button>
        <Link href="/framework" className="rounded border border-white/15 px-4 py-2 font-semibold text-white">
          Open Framework
        </Link>
      </div>
    </section>
  );
}
