"use client";

import Link from "next/link";
import { useState } from "react";
import { Section } from "@/components/section";
import { visitorReviewKit } from "@/content/visitor-review-kit";
import { captureSafeEvent } from "@/lib/analytics-events";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [reviewStatus, setReviewStatus] = useState<"idle" | "sent" | "error">("idle");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  return (
    <Section eyebrow="Contact" title="Collaborate on Operational Intelligence, AI agents, and enterprise AI systems." level="h1">
      <div className="mx-auto mb-6 grid max-w-6xl gap-3 md:grid-cols-4">
        {visitorReviewKit.publicChannels.map(({ href, label, description }) => (
          <Link
            key={href}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-mint/40"
          >
            <span className="text-sm font-semibold text-white">{label}</span>
            <span className="mt-2 block text-xs leading-5 text-slate-400">{description}</span>
          </Link>
        ))}
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form
          className="space-y-4 rounded-lg border border-white/10 bg-white/[0.04] p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const startedAt = performance.now();
            setIsSubmittingContact(true);
            captureSafeEvent("contact_initiation", { topic: String(form.get("topic") || "unspecified") });
            try {
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
            } catch {
              captureSafeEvent("contact_submit_result", {
                success: false,
                topic: String(form.get("topic") || "unspecified"),
                latency_ms: Math.round(performance.now() - startedAt)
              });
              setStatus("error");
            } finally {
              setIsSubmittingContact(false);
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
          <button disabled={isSubmittingContact} className="rounded bg-mint px-5 py-3 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmittingContact ? "Sending..." : "Send"}
          </button>
          {status === "sent" ? <p className="text-sm text-mint">Message received.</p> : null}
          {status === "error" ? <p className="text-sm text-amber">Something went wrong. Please try again.</p> : null}
        </form>

        <form
          className="space-y-4 rounded-lg border border-signal/25 bg-signal/[0.055] p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            const startedAt = performance.now();
            setIsSubmittingReview(true);
            try {
              const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(form))
              });
              captureSafeEvent("practitioner_review_submit", {
                success: response.ok,
                reviewer_role: String(form.get("reviewerRole") || "unspecified"),
                doctrine_verdict: String(form.get("doctrineVerdict") || "unspecified"),
                review_mode: String(form.get("reviewMode") || "unspecified"),
                review_dimension: String(form.get("reviewDimension") || "unspecified"),
                review_verdict: String(form.get("reviewVerdict") || "unspecified"),
                doctrine_impact: String(form.get("doctrineImpact") || "unspecified"),
                latency_ms: Math.round(performance.now() - startedAt)
              });
              setReviewStatus(response.ok ? "sent" : "error");
              if (response.ok) {
                event.currentTarget.reset();
              }
            } catch {
              captureSafeEvent("practitioner_review_submit", {
                success: false,
                reviewer_role: String(form.get("reviewerRole") || "unspecified"),
                doctrine_verdict: String(form.get("doctrineVerdict") || "unspecified"),
                review_mode: String(form.get("reviewMode") || "unspecified"),
                review_dimension: String(form.get("reviewDimension") || "unspecified"),
                review_verdict: String(form.get("reviewVerdict") || "unspecified"),
                doctrine_impact: String(form.get("doctrineImpact") || "unspecified"),
                latency_ms: Math.round(performance.now() - startedAt)
              });
              setReviewStatus("error");
            } finally {
              setIsSubmittingReview(false);
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
              {visitorReviewKit.reviewAssets.map(({ href, label, description }) => (
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
              Ground feedback in evidence. {visitorReviewKit.publicSafetyBoundary}
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
          <div className="rounded border border-white/10 bg-ink/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">Worksheet entry</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Use these fields after inspecting one OI-ROOM-001 mode against one review dimension.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400" htmlFor="review-mode">Mode reviewed</label>
              <select id="review-mode" name="reviewMode" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white">
                <option>Not selected</option>
                <option>Dashboard-only</option>
                <option>Chatbot-only</option>
                <option>Ticket-only</option>
                <option>Operational Intelligence workflow</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400" htmlFor="review-dimension">Dimension reviewed</label>
              <select id="review-dimension" name="reviewDimension" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white">
                <option>Not selected</option>
                <option>Evidence completeness</option>
                <option>Transaction reconstruction</option>
                <option>Contradiction handling</option>
                <option>Missing-evidence honesty</option>
                <option>Hypothesis quality</option>
                <option>Decision safety</option>
                <option>Replayability</option>
                <option>Reviewer confidence</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400" htmlFor="review-verdict">Dimension verdict</label>
              <select id="review-verdict" name="reviewVerdict" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white">
                <option>Not assessable</option>
                <option>Strong</option>
                <option>Mixed</option>
                <option>Weak</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400" htmlFor="doctrine-impact">Doctrine impact</label>
              <select id="doctrine-impact" name="doctrineImpact" className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white">
                <option>No change</option>
                <option>Clarify term</option>
                <option>Clarify layer boundary</option>
                <option>Add fixture</option>
                <option>Revise invariant</option>
                <option>Remove claim</option>
              </select>
            </div>
          </div>
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400" htmlFor="evidence-observed">Evidence observed</label>
          <textarea id="evidence-observed" name="evidenceObserved" rows={3} className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="What public-safe evidence did you inspect?" />
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400" htmlFor="reasoning-loss">Reasoning loss</label>
          <textarea id="reasoning-loss" name="reasoningLoss" rows={3} className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="What disappeared, became ambiguous, or was invented?" />
          <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400" htmlFor="review-limitation">Limitation</label>
          <textarea id="review-limitation" name="reviewLimitation" rows={3} className="w-full rounded border border-white/10 bg-ink px-4 py-3 text-white" placeholder="What does this review not prove?" />
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
          <button disabled={isSubmittingReview} className="rounded bg-signal px-5 py-3 font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmittingReview ? "Sending review..." : "Send practitioner review"}
          </button>
          {reviewStatus === "sent" ? <p className="text-sm text-mint">Review received.</p> : null}
          {reviewStatus === "error" ? <p className="text-sm text-amber">Review could not be sent. Please try again.</p> : null}
        </form>
      </div>
    </Section>
  );
}
