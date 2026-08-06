import type { Metadata } from "next";
import { Chat } from "@/components/chat";
import { Section } from "@/components/section";
import Link from "next/link";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Interview Mode | seri.ai",
  description: "Structured Ask Ravi mode for recruiters, collaborators, event hosts, and technical reviewers exploring public Operational Intelligence work.",
  path: "/interview-mode"
});

export default function InterviewModePage() {
  return (
    <Section eyebrow="Interview mode" title="Structured Q&A for recruiters, collaborators, and event hosts." level="h1">
      <Link href="/interview" className="mb-5 inline-block rounded border border-mint/40 px-4 py-2 text-sm font-semibold text-mint">
        Open expanded interview page
      </Link>
      <Chat mode="interview" />
    </Section>
  );
}
