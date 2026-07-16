"use client";

import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { captureSafeEvent } from "@/lib/analytics-events";

export function BetaFeedback() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function submitFeedback(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const startedAt = performance.now();
    const form = new FormData(event.currentTarget);
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
  }

  return (
    <div className="border-t border-white/10 bg-black/20 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => {
            setOpen((value) => !value);
            captureSafeEvent("beta_feedback_toggle", { open: !open });
          }}
          className="inline-flex items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:border-mint/40 focus:outline-none focus:ring-2 focus:ring-mint/60"
          aria-expanded={open}
        >
          <MessageSquare size={16} />
          Beta feedback
        </button>
        {open ? (
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
            <div className="md:col-span-2 flex flex-wrap items-center gap-3">
              <button className="rounded bg-mint px-4 py-2 text-sm font-semibold text-ink" type="submit">
                Send feedback
              </button>
              {status === "sent" ? <p className="text-sm text-mint">Feedback received.</p> : null}
              {status === "error" ? <p className="text-sm text-amber">Feedback could not be sent. Please try again.</p> : null}
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
}
