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
