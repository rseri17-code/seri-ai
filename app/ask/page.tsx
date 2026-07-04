import { Chat } from "@/components/chat";
import { Section } from "@/components/section";

export default function AskPage() {
  return (
    <Section eyebrow="Ask Ravi" title="A public-grounded AI interface for Ravi's thinking.">
      <Chat />
    </Section>
  );
}
