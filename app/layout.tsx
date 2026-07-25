import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { BetaFeedback } from "@/components/beta-feedback";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RouteVisitEvents } from "@/components/page-event";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  title: "seri.ai | Operational Intelligence for Agentic SRE",
  description:
    "An inspectable operating layer for Operational Intelligence: evidence-backed Agentic SRE harnesses, replayable incident reasoning, evaluation gates, and human-reviewed action.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://seri.ai"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml"
    }
  },
  openGraph: {
    title: "seri.ai | Operational Intelligence for Agentic SRE",
    description: "Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "seri.ai - Operational Intelligence for AI-native operations" }],
    url: "/",
    siteName: "seri.ai",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "seri.ai | Operational Intelligence for Agentic SRE",
    description: "Evidence, replay, eval gates, and human-reviewed action for enterprise operations.",
    images: [{ url: "/twitter-image", alt: "seri.ai - Operational Intelligence for AI-native operations" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData />
        <Analytics />
        <RouteVisitEvents />
        <Header />
        <main>{children}</main>
        <BetaFeedback />
        <Footer />
      </body>
    </html>
  );
}
