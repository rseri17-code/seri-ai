import { Chat } from "@/components/chat";
import { Section } from "@/components/section";

export default function InterviewModePage() {
  return (
    <Section eyebrow="Interview mode" title="Structured Q&A for recruiters, collaborators, and event hosts.">
      <Chat mode="interview" />
    </Section>
  );
}
