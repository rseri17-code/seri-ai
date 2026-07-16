"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { captureSafeEvent } from "@/lib/analytics-events";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  return (
    <Section eyebrow="Contact" title="Collaborate on Operational Intelligence, AI agents, and enterprise AI systems." level="h1">
      <form
        className="mx-auto max-w-2xl space-y-4 rounded-lg border border-white/10 bg-white/[0.04] p-6"
        onSubmit={async (event) => {
          event.preventDefault();
          const form = new FormData(event.currentTarget);
          const startedAt = performance.now();
          captureSafeEvent("contact_initiation", { topic: String(form.get("topic") || "unspecified") });
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(form))
          });
          captureSafeEvent("contact_submit_result", {
            success: response.ok,
            topic: String(form.get("topic") || "unspecified"),
            latency_ms: Math.round(performance.now() - startedAt)
          });
          setStatus(response.ok ? "sent" : "error");
          if (response.ok) {
            event.currentTarget.reset();
          }
        }}
      >
        <label className="sr-only" htmlFor="contact-name">Name</label>
        <input id="contact-name" name="name" required className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Name" />
        <label className="sr-only" htmlFor="contact-email">Email</label>
        <input id="contact-email" name="email" required type="email" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Email" />
        <label className="sr-only" htmlFor="contact-topic">Topic</label>
        <select id="contact-topic" name="topic" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white">
          <option>Speaking</option>
          <option>Advisory</option>
          <option>Collaboration</option>
          <option>Interview</option>
        </select>
        <label className="sr-only" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
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
