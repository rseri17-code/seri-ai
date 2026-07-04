"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicSource } from "@/lib/content";

export function ContentSearch({ sources }: { sources: PublicSource[] }) {
  const categories = ["All", ...Array.from(new Set(sources.map((source) => source.category))).sort()];
  const tags = ["All", ...Array.from(new Set(sources.flatMap((source) => source.tags))).sort()];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("All");

  const results = useMemo(() => {
    const terms = query
      .toLowerCase()
      .split(/\W+/)
      .filter((term) => term.length > 1);

    return sources
      .filter((source) => category === "All" || source.category === category)
      .filter((source) => tag === "All" || source.tags.includes(tag))
      .map((source) => {
        const haystack = `${source.title} ${source.description} ${source.content} ${source.tags.join(" ")}`.toLowerCase();
        const score = terms.length ? terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0), 0) : 1;
        return { ...source, score };
      })
      .filter((source) => source.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [category, query, sources, tag]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-[1fr_220px_220px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Operational Intelligence, agents, RCA, evaluation..."
          className="rounded border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-mint/60"
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded border border-white/10 bg-ink px-4 py-3 text-white">
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={tag} onChange={(event) => setTag(event.target.value)} className="rounded border border-white/10 bg-ink px-4 py-3 text-white">
          {tags.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((source) => (
          <Link key={source.id} href={source.url} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-mint/40">
            <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
              <span>{source.type}</span>
              <span>{source.category}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-white">{source.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{source.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
