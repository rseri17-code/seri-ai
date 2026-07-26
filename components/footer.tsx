import { site } from "@/content/site";
import Link from "next/link";

const reviewKit = [
  ["/start-here", "Start Here"],
  ["/artifacts", "Artifacts"],
  ["/search", "Search"]
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8">
        <div>
          <p className="font-medium text-slate-200">{site.positioning}</p>
          <p className="mt-3 leading-6">{site.compliance}</p>
        </div>
        <p className="flex flex-wrap gap-x-3 gap-y-2">
          <span className="font-semibold uppercase tracking-[0.16em] text-mint">Public review kit</span>
          {reviewKit.map(([href, label]) => (
            <Link key={href} href={href} className="text-slate-300 hover:text-white">{label}</Link>
          ))}
          <a href={site.links.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">GitHub</a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">LinkedIn</a>
          <Link href="/rss.xml" className="text-slate-300 hover:text-white">RSS</Link>
        </p>
      </div>
    </footer>
  );
}
