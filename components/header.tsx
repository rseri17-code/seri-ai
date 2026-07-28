"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const primaryNav = [
  { href: "/work", label: "Work" },
  { href: "/wiki/operational-intelligence-canonical-doctrine", label: "Doctrine" },
  { href: "/investigation-room", label: "Room" },
  { href: "/background", label: "Background" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
      <nav aria-label="Primary navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="seri.ai home" className="flex min-w-0 items-center gap-3">
            <span aria-hidden="true" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-mint/35 bg-[radial-gradient(circle_at_30%_20%,rgba(95,242,181,0.28),transparent_42%),rgba(95,242,181,0.08)] shadow-[0_0_22px_rgba(95,242,181,0.16)]">
              <span className="absolute left-3 top-3 h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_12px_rgba(95,242,181,0.9)]" />
              <span className="absolute right-3 top-4 h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_12px_rgba(125,211,252,0.8)]" />
              <span className="absolute bottom-3 left-4 h-1.5 w-1.5 rounded-full bg-white/80" />
              <span className="h-px w-5 rotate-12 bg-mint/45" />
              <span className="absolute h-5 w-px -rotate-45 bg-signal/35" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{site.name}</span>
              <span className="block truncate text-xs text-slate-400">Operational Intelligence</span>
            </span>
          </Link>
          <div className="hidden items-center gap-1 xl:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded px-3 py-2 text-sm transition ${
                  isActive(item.href)
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/ask" className="rounded border border-mint/40 bg-mint/10 px-3 py-2 text-sm font-medium text-mint hover:bg-mint/15 sm:px-4">
              Ask Ravi
            </Link>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/15 text-slate-200 hover:bg-white/10 xl:hidden"
            >
              {isMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
        <div id="mobile-navigation" className={`${isMenuOpen ? "block" : "hidden"} border-t border-white/10 xl:hidden`}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3 sm:px-6 lg:px-8">
            <Link
              href="/ask"
              aria-current={isActive("/ask") ? "page" : undefined}
              className={`rounded px-3 py-2 text-sm transition ${
                isActive("/ask") ? "bg-mint/15 text-mint" : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              Ask
            </Link>
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded px-3 py-2 text-sm transition ${
                  isActive(item.href)
                    ? "bg-white/10 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
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
