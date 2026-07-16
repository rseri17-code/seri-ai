"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PublicSource } from "@/lib/content";

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

  return (
    <div className="space-y-5">
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
