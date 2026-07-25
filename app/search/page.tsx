import type { Metadata } from "next";
import { ContentSearch } from "@/components/content-search";
import { Section } from "@/components/section";
import { buildPublicSourceIndex } from "@/lib/content";

export const metadata: Metadata = {
  title: "Search | seri.ai",
  description: "Search Ravikanth Seri's public Operational Intelligence wiki, principles, patterns, projects, and essays."
};

export default function SearchPage() {
  return (
    <Section eyebrow="Search" title="Search the public Operational Intelligence knowledge base." level="h1">
      <ContentSearch sources={buildPublicSourceIndex()} />
    </Section>
  );
}
