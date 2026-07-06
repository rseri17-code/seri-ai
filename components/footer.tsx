import { site } from "@/content/site";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8">
        <p className="font-medium text-slate-200">{site.positioning}</p>
        <p>{site.compliance}</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/simulator" className="text-slate-300 hover:text-white">Simulator</Link>
          <Link href="/evals" className="text-slate-300 hover:text-white">Evals</Link>
          <Link href="/radar" className="text-slate-300 hover:text-white">Radar</Link>
          <Link href="/brief" className="text-slate-300 hover:text-white">Brief</Link>
          <Link href="/search" className="text-slate-300 hover:text-white">Search</Link>
          <Link href="/changelog" className="text-slate-300 hover:text-white">Changelog</Link>
          <Link href="/interview" className="text-slate-300 hover:text-white">Interview</Link>
          <Link href="/ideas" className="text-slate-300 hover:text-white">Ideas Archive</Link>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
