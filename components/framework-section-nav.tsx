"use client";

import { useEffect, useState, type MouseEvent } from "react";

const sections = [
  { id: "context-layer", label: "Context Layer" },
  { id: "batch-intelligence", label: "Batch proof" },
  { id: "harness", label: "Harness" },
  { id: "taxonomy", label: "Taxonomy" },
  { id: "evaluation", label: "Eval / falsifiers" }
] as const;

export function FrameworkSectionNav() {
  const [activeId, setActiveId] = useState<(typeof sections)[number]["id"]>(sections[0].id);

  useEffect(() => {
    const offset = 220;

    function syncActive() {
      let current: (typeof sections)[number]["id"] = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - offset <= 0) {
          current = section.id;
        }
      }
      setActiveId(current);
    }

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);
    return () => {
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, []);

  function jumpTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const top = window.scrollY + target.getBoundingClientRect().top - 176;
    window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
    setActiveId(id as (typeof sections)[number]["id"]);
  }

  return (
    <div className="sticky top-[4.75rem] z-40 border-b border-white/10 bg-ink/92 backdrop-blur-xl">
      <nav aria-label="On this page" className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <p className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400 sm:block">On this page</p>
        <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto">
          {sections.map((section) => {
            const active = section.id === activeId;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                onClick={(event) => jumpTo(event, section.id)}
                className={`inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded border px-3 text-sm font-semibold transition ${
                  active
                    ? "border-mint/40 bg-mint/10 text-mint"
                    : "border-white/10 bg-black/20 text-slate-200 hover:border-white/25 hover:text-white"
                }`}
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
