"use client";

import { useState } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  return (
    <form
      className="rounded-lg border border-mint/20 bg-mint/5 p-5"
      onSubmit={async (event) => {
        event.preventDefault();
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        setStatus(response.ok ? "sent" : "error");
        if (response.ok) {
          setEmail("");
        }
      }}
    >
      <h2 className="text-xl font-semibold text-white">Join upcoming Operational Intelligence notes</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">Occasional public notes on Operational Intelligence, agentic systems, and enterprise AI architecture. This is a waitlist until those notes start shipping.</p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded border border-white/10 bg-ink px-4 py-3 text-white outline-none focus:border-mint/60"
        />
        <button className="rounded bg-mint px-5 py-3 font-semibold text-ink">Join the list</button>
      </div>
      <p className="mt-3 text-xs text-slate-400">No spam. No employer-specific or confidential material. Use Contact if you need to be removed.</p>
      {status === "sent" ? <p className="mt-3 text-sm text-mint">You&apos;re on the waitlist.</p> : null}
      {status === "error" ? <p className="mt-3 text-sm text-amber">Could not subscribe right now.</p> : null}
    </form>
  );
}
