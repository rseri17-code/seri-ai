"use client";

import { AppLink as Link } from "@/components/app-link";
import { Chat } from "@/components/chat";
import { challengeChipsForPath, shouldShowAskDock } from "@/content/ask";
import { captureSafeEvent } from "@/lib/analytics-events";
import { ArrowUpRight, MessageSquareText, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export function AskDock() {
  const pathname = usePathname() ?? "/";
  const visible = shouldShowAskDock(pathname);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const titleId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const chips = challengeChipsForPath(pathname);

  useEffect(() => {
    if (!visible && open) {
      setOpen(false);
    }
  }, [visible, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    panelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!visible) {
    return null;
  }

  function toggle(next = !open) {
    setOpen(next);
    captureSafeEvent("ask_dock_toggle", { open: next, route: pathname });
    if (!next) {
      queueMicrotask(() => triggerRef.current?.focus());
    }
  }

  return (
    <div
      className="pointer-events-none fixed z-40 flex flex-col items-end gap-3"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, env(safe-area-inset-bottom))"
      }}
      data-ask-dock="true"
    >
      {open ? (
        <div
          id={panelId}
          ref={panelRef}
          tabIndex={-1}
          role="complementary"
          aria-labelledby={titleId}
          data-ask-dock-panel="true"
          className="pointer-events-auto flex h-[min(40rem,78dvh)] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#071018] shadow-[0_18px_60px_rgba(0,0,0,0.45)] motion-safe:transition-opacity sm:w-[24rem]"
        >
          <div className="flex items-start justify-between gap-3 border-b border-white/10 bg-black/25 px-3 py-2">
            <div className="min-w-0">
              <p id={titleId} className="text-sm font-semibold text-white">
                Ask the public record
              </p>
              <p className="mt-1 text-[0.68rem] leading-4 text-slate-400">
                Check a claim against the public record without leaving this page.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href="/ask"
                className="inline-flex min-h-11 items-center gap-1 rounded px-2 text-xs font-semibold text-mint hover:text-white"
                data-ask-open-full="true"
              >
                Open full Ask
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => toggle(false)}
                className="grid h-11 w-11 shrink-0 place-items-center rounded border border-white/10 text-slate-300 hover:border-mint/40 hover:text-mint"
                aria-label="Close Ask dock"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">
            <Chat variant="dock" persistUrlHash={false} readUrlHash={false} suggestedPrompts={chips} />
          </div>
        </div>
      ) : null}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => toggle()}
        className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-mint/40 bg-ink/95 px-4 py-2 text-sm font-semibold text-mint shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md hover:bg-mint/10"
        aria-expanded={open}
        aria-controls={panelId}
        data-ask-dock-trigger="true"
      >
        <MessageSquareText size={16} aria-hidden="true" />
        Ask the public record
      </button>
    </div>
  );
}
