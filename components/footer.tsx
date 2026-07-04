import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8">
        <p className="font-medium text-slate-200">{site.positioning}</p>
        <p>{site.compliance}</p>
      </div>
    </footer>
  );
}
