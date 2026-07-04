import { Chat } from "@/components/chat";
import { Section } from "@/components/section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask Ravi | Public-grounded Operational Intelligence AI",
  description: "Ask Ravi Seri's public AI assistant about Operational Intelligence, agentic systems, transaction intelligence, enterprise observability, and AI evaluation."
};

export default function AskPage() {
  return (
    <Section eyebrow="Ask Ravi" title="A public-grounded AI interface for Ravi's thinking.">
      <Chat />
    </Section>
  );
}
