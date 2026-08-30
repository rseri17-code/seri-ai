"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { captureSafeEvent } from "@/lib/analytics-events";

const BetaFeedbackForm = dynamic(() => import("@/components/beta-feedback-form").then((module) => module.BetaFeedbackForm), {
  ssr: false,
  loading: () => <p className="mt-4 text-sm text-slate-400">Loading feedback form...</p>
});

export function BetaFeedback() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10 bg-black/20 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => {
            setOpen((value) => !value);
            captureSafeEvent("beta_feedback_toggle", { open: !open });
          }}
          className="inline-flex min-h-[44px] items-center gap-2 rounded border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:border-mint/40 focus:outline-none focus:ring-2 focus:ring-mint/60"
          aria-expanded={open}
        >
          <span aria-hidden="true" className="text-mint">
            +
          </span>
          Beta feedback
        </button>
        {open ? <BetaFeedbackForm /> : null}
      </div>
    </div>
  );
}
