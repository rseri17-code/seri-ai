"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Five destinations, by the 2026-08-30 homepage ruling. The wordmark is the Home link, and
 * Ask Ravikanth sits outside this list as a secondary utility action.
 *
 * Dropped from the bar but still reachable, so nothing is orphaned: /resume and /background from
 * the homepage career arc and About; /investigation-room from the hero CTA, the flagship preview
 * and /framework; /patterns from the homepage Selected ideas.
 */
const primaryNav = [
  { href: "/work", label: "Work" },
  { href: "/framework", label: "Operational Intelligence" },
  { href: "/library", label: "Writing" },
  { href: "/background", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinkClass = (href: string) =>
    `inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded px-3 py-2 text-sm transition ${
      isActive(href)
        ? "bg-white/10 text-white"
        : "text-slate-300 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
      <nav aria-label="Primary navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Ravikanth Seri home" className="flex min-h-[44px] min-w-0 shrink items-center gap-3">
            <span aria-hidden="true" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-mint/35 bg-[radial-gradient(circle_at_30%_20%,rgba(95,242,181,0.28),transparent_42%),rgba(95,242,181,0.08)] shadow-[0_0_22px_rgba(95,242,181,0.16)]">
              <span className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_12px_rgba(95,242,181,0.9)]" />
              <span className="absolute right-3 top-4 h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgba(125,211,252,0.8)]" />
              <span className="absolute bottom-3 left-4 h-1.5 w-1.5 rounded-full bg-white/80" />
              <span className="h-px w-5 rotate-12 bg-mint/45" />
              <span className="absolute h-5 w-px -rotate-45 bg-signal/35" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{site.owner}</span>
              {/* The subtitle cost the name itself on a 390px screen: the wordmark truncated to
                  "Ravikanth ...". Identity wins over the tagline at that width. */}
              <span className="hidden truncate text-xs text-slate-400 sm:block">Public professional home</span>
            </span>
          </Link>
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={navLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/ask"
              className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded border border-mint/40 bg-mint/10 px-3 py-2 text-sm font-semibold text-mint hover:bg-mint/15 sm:px-4"
            >
              Ask Ravikanth
            </Link>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 text-slate-200 hover:bg-white/10 lg:hidden"
            >
              {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div id="mobile-navigation" className={`${isMenuOpen ? "block" : "hidden"} border-t border-white/10 lg:hidden`}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3 sm:px-6 lg:px-8">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={navLinkClass(item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
