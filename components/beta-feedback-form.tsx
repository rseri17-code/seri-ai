"use client";

import { useState } from "react";
import { captureSafeEvent } from "@/lib/analytics-events";

export function BetaFeedbackForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const startedAt = performance.now();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "beta-feedback",
          name: "Beta visitor",
          email: form.get("contact") || "",
          topic: "Beta feedback",
          visitorType: form.get("visitorType"),
          clear: form.get("clear"),
          confusing: form.get("confusing"),
          memorable: form.get("memorable"),
          missing: form.get("missing"),
          message: "Controlled beta feedback"
        })
      });

      captureSafeEvent("beta_feedback_submit", {
        success: response.ok,
        visitor_type: String(form.get("visitorType") || "unspecified"),
        latency_ms: Math.round(performance.now() - startedAt)
      });

      setStatus(response.ok ? "sent" : "error");
      if (response.ok) {
        event.currentTarget.reset();
      }
    } catch {
      captureSafeEvent("beta_feedback_submit", {
        success: false,
        visitor_type: String(form.get("visitorType") || "unspecified"),
        latency_ms: Math.round(performance.now() - startedAt)
      });
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={submitFeedback} className="mt-4 grid gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 md:grid-cols-2">
      <label className="text-sm text-slate-300">
        Visitor type
        <select name="visitorType" className="mt-2 w-full rounded border border-white/10 bg-ink px-3 py-2 text-white">
          <option>Executive</option>
          <option>Architect</option>
          <option>Engineer</option>
          <option>Recruiter</option>
          <option>Founder</option>
          <option>Other</option>
        </select>
      </label>
      <label className="text-sm text-slate-300">
        Optional contact
        <input name="contact" type="email" className="mt-2 w-full rounded border border-white/10 bg-ink px-3 py-2 text-white" placeholder="email@example.com" />
      </label>
      <label className="text-sm text-slate-300">
        What was clear?
        <textarea name="clear" rows={3} className="mt-2 w-full rounded border border-white/10 bg-ink px-3 py-2 text-white" />
      </label>
      <label className="text-sm text-slate-300">
        What was confusing?
        <textarea name="confusing" rows={3} className="mt-2 w-full rounded border border-white/10 bg-ink px-3 py-2 text-white" />
      </label>
      <label className="text-sm text-slate-300">
        Most memorable idea
        <textarea name="memorable" rows={3} className="mt-2 w-full rounded border border-white/10 bg-ink px-3 py-2 text-white" />
      </label>
      <label className="text-sm text-slate-300">
        Missing information
        <textarea name="missing" rows={3} className="mt-2 w-full rounded border border-white/10 bg-ink px-3 py-2 text-white" />
      </label>
      <div className="flex flex-wrap items-center gap-3 md:col-span-2">
        <button disabled={isSubmitting} className="rounded bg-mint px-4 py-2 text-sm font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-60" type="submit">
          {isSubmitting ? "Sending feedback..." : "Send feedback"}
        </button>
        {status === "sent" ? <p className="text-sm text-mint">Feedback received.</p> : null}
        {status === "error" ? <p className="text-sm text-amber">Feedback could not be sent. Please try again.</p> : null}
      </div>
    </form>
  );
}
