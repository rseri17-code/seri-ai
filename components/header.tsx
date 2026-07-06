"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/start-here", label: "Start Here" },
  { href: "/map", label: "Map" },
  { href: "/library", label: "Library" },
  { href: "/patterns", label: "Patterns" },
  { href: "/products/reasonops", label: "ReasonOps" },
  { href: "/investigation-room", label: "Lab" },
  { href: "/radar", label: "Radar" },
  { href: "/background", label: "Background" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/88 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-mint/40 bg-mint/10 font-semibold text-mint shadow-[0_0_22px_rgba(95,242,181,0.16)]">
            s
          </span>
          <span>
            <span className="block text-sm font-semibold">{site.name}</span>
            <span className="block text-xs text-slate-400">Operational Intelligence</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 xl:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded px-3 py-2 text-sm transition ${
                pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link href="/ask" className="rounded border border-mint/40 bg-mint/10 px-4 py-2 text-sm font-medium text-mint hover:bg-mint/15">
          Ask Ravikanth
        </Link>
      </nav>
    </header>
  );
}
