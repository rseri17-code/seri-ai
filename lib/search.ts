import { approvedKnowledge } from "@/content/site";

export type SearchHit = {
  content: string;
  score: number;
};

export function localSearch(query: string, limit = 5): SearchHit[] {
  const terms = query
    .toLowerCase()
    .split(/\W+/)
    .filter((term) => term.length > 2);

  return approvedKnowledge
    .map((content) => {
      const lower = content.toLowerCase();
      const score = terms.reduce((sum, term) => sum + (lower.includes(term) ? 1 : 0), 0);
      return { content, score };
    })
    .filter((hit) => hit.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
