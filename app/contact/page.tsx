"use client";

import Link from "next/link";
import { useState } from "react";
import { Section } from "@/components/section";
import { captureSafeEvent } from "@/lib/analytics-events";

const reviewKit = [
  ["/wiki/operational-intelligence-canonical-doctrine", "Canonical Doctrine", "Definitions, boundaries, ten layers, glossary, and claims."],
  ["/wiki/operational-intelligence-reference-architecture", "Reference Architecture", "Implementation contracts, state machines, data objects, gates, and governance."],
  ["/wiki/operational-intelligence-publication-pack", "Publication Pack", "Diagrams, comparison tables, decision packet, walkthrough, and shareable PDFs."],
  ["/wiki/operational-intelligence-evidence-pack", "Evidence Pack", "Benchmarks, control comparisons, falsification criteria, and conformance checklist."],
  ["/investigation-room", "Operations Room", "Interactive synthetic OI-ROOM-001 walkthrough."],
  ["/downloads/operational-intelligence-evidence-pack.pdf", "Evidence Pack PDF", "Printable review packet for skeptical evaluation."]
] as const;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [reviewStatus, setReviewStatus] = useState<"idle" | "sent" | "error">("idle");

  return (
    <Section eyebrow="Contact" title="Collaborate on Operational Intelligence, AI agents, and enterprise AI systems." level="h1">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          className="space-y-4 rounded-lg border border-white/10 bg-white/[0.04] p-6"
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
          <input type="hidden" name="kind" value="contact" />
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

        <form
          className="space-y-4 rounded-lg border border-signal/25 bg-signal/[0.055] p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const startedAt = performance.now();
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(Object.fromEntries(form))
            });
            captureSafeEvent("practitioner_review_submit", {
              success: response.ok,
              reviewer_role: String(form.get("reviewerRole") || "unspecified"),
              doctrine_verdict: String(form.get("doctrineVerdict") || "unspecified"),
              latency_ms: Math.round(performance.now() - startedAt)
            });
            setReviewStatus(response.ok ? "sent" : "error");
            if (response.ok) {
              event.currentTarget.reset();
            }
          }}
        >
          <input type="hidden" name="kind" value="practitioner-review" />
          <input type="hidden" name="topic" value="Practitioner review" />
          <h2 className="text-2xl font-semibold text-white">Practitioner review</h2>
          <p className="text-sm leading-6 text-slate-300">
            Use this if you are evaluating the Operational Intelligence doctrine, reference architecture, evidence pack, or Operations Room as an operator, architect, AI engineer, governance reviewer, or executive.
          </p>
          <div className="rounded border border-white/10 bg-ink/70 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Review kit</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {reviewKit.map(([href, label, description]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded border border-white/10 bg-white/[0.03] p-3 text-sm transition hover:border-signal/45 hover:bg-signal/[0.08]"
                >
                  <span className="block font-semibold text-white">{label}</span>
                  <span className="mt-1 block leading-5 text-slate-400">{description}</span>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Ground feedback in evidence. Do not include confidential logs, internal screenshots, proprietary names, private architecture, employer data, or customer data.
            </p>
          </div>
          <label className="sr-only" htmlFor="review-name">Name</label>
          <input id="review-name" name="name" required className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Name" />
          <label className="sr-only" htmlFor="review-email">Email</label>
          <input id="review-email" name="email" type="email" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Email optional" />
          <label className="sr-only" htmlFor="reviewer-role">Reviewer role</label>
          <select id="reviewer-role" name="reviewerRole" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white">
            <option>SRE / reliability engineer</option>
            <option>Principal architect</option>
            <option>AI engineer</option>
            <option>Governance reviewer</option>
            <option>Executive buyer</option>
            <option>Founder / product leader</option>
          </select>
          <label className="sr-only" htmlFor="doctrine-verdict">Doctrine verdict</label>
          <select id="doctrine-verdict" name="doctrineVerdict" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white">
            <option>Useful and distinct</option>
            <option>Useful but needs evidence</option>
            <option>Too close to existing practice</option>
            <option>Not precise enough to implement</option>
            <option>Needs governance clarification</option>
          </select>
          <label className="sr-only" htmlFor="strongest-claim">Strongest claim</label>
          <textarea id="strongest-claim" name="strongestClaim" rows={3} className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Which claim feels strongest, and why?" />
          <label className="sr-only" htmlFor="weakest-claim">Weakest claim</label>
          <textarea id="weakest-claim" name="weakestClaim" rows={3} className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Which claim would you challenge first?" />
          <label className="sr-only" htmlFor="evidence-needed">Evidence needed</label>
          <textarea id="evidence-needed" name="evidenceNeeded" rows={3} className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="What evidence would change your mind?" />
          <label className="sr-only" htmlFor="implementation-question">Implementation question</label>
          <textarea id="implementation-question" name="implementationQuestion" rows={3} className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="What would block a real implementation?" />
          <label className="sr-only" htmlFor="review-message">Additional notes</label>
          <textarea id="review-message" name="message" required rows={4} className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="Additional review notes" />
          <button className="rounded bg-signal px-5 py-3 font-semibold text-ink">Send practitioner review</button>
          {reviewStatus === "sent" ? <p className="text-sm text-mint">Review received.</p> : null}
          {reviewStatus === "error" ? <p className="text-sm text-amber">Review could not be sent. Please try again.</p> : null}
        </form>
      </div>
    </Section>
  );
}
