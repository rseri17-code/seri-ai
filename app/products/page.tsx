/**
 * VISITOR-FACING COPY — Claude's lane. Codex: do not edit prose in this file.
 *
 * Every string a visitor reads on this page is owned by one agent, by Ravikanth's ruling on
 * 2026-08-29. Two agents rewriting the same copy produced draft-quality output and repeated
 * reversions, so ownership is now split by kind of change, not by file:
 *
 *   Claude  — headings, paragraphs, labels, link text, alt text, microcopy, section order.
 *   Codex   — data wiring, imports, props, components, layout mechanics, accessibility
 *             attributes, performance. Structural work here is welcome.
 *
 * If a validator pin fails because copy moved, do not rewrite the copy to satisfy the pin.
 * Repoint the pin, or leave it and say so in CLAUDE_HANDOFF.md. Copy written to satisfy a
 * grep target is how this page ended up with a paragraph that existed only to hold pins.
 */
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Boxes } from "lucide-react";
import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { products } from "@/content/site";
import { publicRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = publicRouteMetadata({
  title: "Products | seri.ai — ReasonOps and Operational Intelligence",
  description: "Public product concepts under seri.ai, including ReasonOps, the operational intelligence layer for AI-native enterprises.",
  path: "/products"
});

export default function ProductsPage() {
  return (
    <Section eyebrow="Products" title="Product concepts under the seri.ai operating system." level="h1">
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`}>
            <Card className="h-full transition hover:border-mint/40">
              <Boxes className="mb-5 text-mint" />
              <p className="text-sm text-signal">{product.tagline}</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">{product.name}</h2>
              <p className="mt-4 leading-7 text-slate-300">{product.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-mint">
                Explore product <ArrowRight size={18} />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
