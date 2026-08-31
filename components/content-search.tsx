"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicSource } from "@/lib/content";

const suggestedQueries = [
  "doctrine",
  "evidence graph",
  "OI-ROOM-001 walkthrough",
  "evaluation gates",
  "operator control plane",
  "publication pack PDF"
] as const;

export function ContentSearch({ sources }: { sources: PublicSource[] }) {
  const topics = ["All", ...Array.from(new Set(sources.map((source) => source.category))).sort()];
  const tags = ["All", ...Array.from(new Set(sources.flatMap((source) => source.tags))).sort()];
  const frameworkLayers = ["All", ...Array.from(new Set(sources.flatMap((source) => source.frameworkLayers))).sort()];
  const authors = ["All", ...Array.from(new Set(sources.map((source) => source.author))).sort()];
  const assetTypes = ["All", ...Array.from(new Set(sources.map((source) => source.assetType))).sort()];
  const dates = ["All", ...Array.from(new Set(sources.map((source) => source.date.slice(0, 7)))).sort().reverse()];
  const principles = ["All", ...Array.from(new Set(sources.flatMap((source) => source.principles))).sort()];
  const patterns = ["All", ...Array.from(new Set(sources.flatMap((source) => source.patterns))).sort()];
  const products = ["All", ...Array.from(new Set(sources.flatMap((source) => source.products))).sort()];
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All");
  const [tag, setTag] = useState("All");
  const [frameworkLayer, setFrameworkLayer] = useState("All");
  const [author, setAuthor] = useState("All");
  const [assetType, setAssetType] = useState("All");
  const [date, setDate] = useState("All");
  const [principle, setPrinciple] = useState("All");
  const [pattern, setPattern] = useState("All");
  const [product, setProduct] = useState("All");
  const resetFilters = () => {
    setQuery("");
    setTopic("All");
    setTag("All");
    setFrameworkLayer("All");
    setAuthor("All");
    setAssetType("All");
    setDate("All");
    setPrinciple("All");
    setPattern("All");
    setProduct("All");
  };

  const results = useMemo(() => {
    const terms = query
      .toLowerCase()
      .split(/\W+/)
      .filter((term) => term.length > 1);

    return sources
      .filter((source) => topic === "All" || source.category === topic)
      .filter((source) => tag === "All" || source.tags.includes(tag))
      .filter((source) => frameworkLayer === "All" || source.frameworkLayers.includes(frameworkLayer))
      .filter((source) => author === "All" || source.author === author)
      .filter((source) => assetType === "All" || source.assetType === assetType)
      .filter((source) => date === "All" || source.date.startsWith(date))
      .filter((source) => principle === "All" || source.principles.includes(principle))
      .filter((source) => pattern === "All" || source.patterns.includes(pattern))
      .filter((source) => product === "All" || source.products.includes(product))
      .map((source) => {
        const haystack = `${source.title} ${source.description} ${source.content} ${source.tags.join(" ")} ${source.frameworkLayers.join(" ")} ${source.principles.join(" ")}`.toLowerCase();
        const score = terms.length ? terms.reduce((sum, term) => sum + (haystack.includes(term) ? 1 : 0) + (source.title.toLowerCase().includes(term) ? 2 : 0), 0) : 1;
        return { ...source, score };
      })
      .filter((source) => source.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [assetType, author, date, frameworkLayer, pattern, principle, product, query, sources, tag, topic]);
  const activeFilters = [
    query ? `query: ${query}` : null,
    topic !== "All" ? `topic: ${topic}` : null,
    tag !== "All" ? `tag: ${tag}` : null,
    frameworkLayer !== "All" ? `layer: ${frameworkLayer}` : null,
    author !== "All" ? `author: ${author}` : null,
    assetType !== "All" ? `asset type: ${assetType}` : null,
    date !== "All" ? `date: ${date}` : null,
    principle !== "All" ? `principle: ${principle}` : null,
    pattern !== "All" ? `pattern: ${pattern}` : null,
    product !== "All" ? `product: ${product}` : null
  ].filter(Boolean);
  const visibleResults = activeFilters.length ? results : results.slice(0, 12);

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-mint/20 bg-mint/[0.045] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mint">Search workbench</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Searches everything published here, including the reference exports.
            </p>
          </div>
          <p aria-live="polite" className="rounded border border-white/10 bg-black/20 px-3 py-2 text-sm font-semibold text-white">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestedQueries.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setQuery(suggestion)}
              className="rounded border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200 transition hover:border-mint/40 hover:text-white"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search public Operational Intelligence content"
          placeholder="Search Operational Intelligence, agents, RCA, evaluation..."
          className="rounded border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-mint/60"
        />
        <select aria-label="Filter by topic" value={topic} onChange={(event) => setTopic(event.target.value)} className="rounded border border-white/10 bg-ink px-4 py-3 text-white">
          {topics.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select aria-label="Filter by tag" value={tag} onChange={(event) => setTag(event.target.value)} className="rounded border border-white/10 bg-ink px-4 py-3 text-white">
          {tags.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {[
          ["Framework layer", frameworkLayer, setFrameworkLayer, frameworkLayers],
          ["Author", author, setAuthor, authors],
          ["Asset type", assetType, setAssetType, assetTypes],
          ["Date", date, setDate, dates],
          ["Principle", principle, setPrinciple, principles],
          ["Pattern", pattern, setPattern, patterns],
          ["Product", product, setProduct, products]
        ].map(([label, value, setter, options]) => (
          <select
            key={String(label)}
            aria-label={`Filter by ${label}`}
            value={String(value)}
            onChange={(event) => (setter as (value: string) => void)(event.target.value)}
            className="rounded border border-white/10 bg-ink px-3 py-2 text-sm text-white"
          >
            {(options as string[]).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        ))}
      </div>
      {activeFilters.length ? (
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => (
            <span key={filter} className="rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-slate-300">
              {filter}
            </span>
          ))}
          <button type="button" onClick={resetFilters} className="rounded border border-signal/30 px-3 py-2 text-xs font-semibold text-signal transition hover:bg-signal/10">
            Reset search
          </button>
        </div>
      ) : null}
      {!activeFilters.length && results.length > visibleResults.length ? (
        <div className="rounded border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-slate-300">
          Showing 12 canonical starting points. Search or filter to inspect the full public corpus.
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        {visibleResults.map((source) => (
          <Link key={source.id} href={source.url} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 transition hover:border-mint/40">
            <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
              <span>{source.type}</span>
              <span>{source.category}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{source.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{source.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[source.assetType, ...source.frameworkLayers.slice(0, 2), ...source.tags.slice(0, 2)].filter(Boolean).map((item) => (
                <span key={item} className="rounded border border-white/10 px-2 py-1 text-[0.7rem] text-slate-400">
                  {item}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      {!results.length ? (
        <div className="rounded-lg border border-amber/25 bg-amber/[0.055] p-5">
          <h3 className="text-xl font-semibold text-white">No matching public asset.</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Try a canonical term such as Operational Intelligence, Evidence Graph, Replay Seed, Evaluation Gate, OI-ROOM-001, or Publication Pack.
          </p>
        </div>
      ) : null}
    </div>
  );
}
