import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Ravikanth Seri | seri.ai",
  description: "Contact Ravikanth Seri about Operational Intelligence, AI-native operations, practitioner review, speaking, advisory, collaboration, or interviews."
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
