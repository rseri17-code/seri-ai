"use client";

import { useState } from "react";
import { Section } from "@/components/section";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  return (
    <Section eyebrow="Contact" title="Collaborate on Operational Intelligence, AI agents, and enterprise AI systems.">
      <form
        className="mx-auto max-w-2xl space-y-4 rounded-lg border border-white/10 bg-white/[0.04] p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(form))
          });
          setStatus(response.ok ? "sent" : "error");
          if (response.ok) {
            event.currentTarget.reset();
          }
        }}
      >
        <input name="name" required className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Name" />
        <input name="email" required type="email" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Email" />
        <select name="topic" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white">
          <option>Speaking</option>
          <option>Advisory</option>
          <option>Collaboration</option>
          <option>Interview</option>
        </select>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white"
          placeholder="What would you like to explore?"
        />
        <button className="rounded bg-mint px-5 py-3 font-semibold text-ink">Send</button>
        {status === "sent" ? <p className="text-sm text-mint">Message received.</p> : null}
        {status === "error" ? <p className="text-sm text-amber">Something went wrong. Please try again.</p> : null}
      </form>
    </Section>
  );
}
