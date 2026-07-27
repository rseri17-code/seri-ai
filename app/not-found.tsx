import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section eyebrow="Route not found" title="The requested artifact is not in the public surface.">
      <Card className="max-w-3xl border-signal/25 bg-signal/[0.055]">
        <ShieldAlert className="mb-5 text-signal" />
        <p className="text-lg leading-8 text-slate-200">
          seri.ai only exposes approved public artifacts. Use the map, library, or Ask Ravi to continue through the Operational Intelligence system.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/map" className="inline-flex items-center gap-2 rounded bg-mint px-5 py-3 font-semibold text-ink">
            Open Map <ArrowRight size={18} />
          </Link>
          <Link href="/ask" className="inline-flex items-center gap-2 rounded border border-white/15 px-5 py-3 font-semibold text-white">
            Ask Ravi
          </Link>
        </div>
      </Card>
    </Section>
  );
}
