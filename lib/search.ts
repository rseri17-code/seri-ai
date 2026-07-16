import { buildPublicSourceIndex, type PublicSource } from "@/lib/content";

export type SearchHit = {
  source: PublicSource;
  content: string;
  score: number;
};

export function localSearch(query: string, limit = 5): SearchHit[] {
  const terms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length > 2);

  return buildPublicSourceIndex()
    .map((source) => {
      const lower = [
        source.title,
        source.description,
        source.content,
        source.tags.join(" "),
        source.frameworkLayers.join(" "),
        source.principles.join(" "),
        source.patterns.join(" "),
        source.products.join(" "),
        source.assetType
      ].join(" ").toLowerCase();
      const score = terms.reduce((sum, term) => sum + (lower.includes(term) ? 1 : 0) + (source.title.toLowerCase().includes(term) ? 2 : 0), 0);
      return { source, content: source.content, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
