import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { BetaFeedback } from "@/components/beta-feedback";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { RouteVisitEvents } from "@/components/page-event";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ravikanth Seri | seri.ai",
  description:
    "Ravikanth Seri's public professional home for Operational Intelligence, AI-native operations, replayable investigations, evaluation, and human-reviewed action.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://seri-ai.vercel.app"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/rss.xml"
    }
  },
  openGraph: {
    title: "Ravikanth Seri | seri.ai",
    description: "Ravikanth Seri's public professional home for evidence-backed operational reasoning, replayable investigations, evaluation gates, and accountable human decision.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Ravikanth Seri | seri.ai" }],
    url: "/",
    siteName: "seri.ai",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravikanth Seri | seri.ai",
    description: "Evidence, hypotheses, replay, eval gates, and human-reviewed action for enterprise operations.",
    images: [{ url: "/twitter-image", alt: "Ravikanth Seri | seri.ai" }]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <StructuredData />
        <Analytics />
        <RouteVisitEvents />
        <Header />
        {/* Reserve a viewport for main. Under streaming SSR the footer and feedback block painted
            before main's content arrived - measured at y=726 inside a 900px viewport - and were then
            pushed down when it did, which is a ~0.19 CLS spike on roughly one load in ten. With a
            viewport reserved, that reflow happens entirely below the fold. */}
        <main id="main-content" tabIndex={-1} className="min-h-[calc(100vh-4.75rem)]">
          {children}
        </main>
        <BetaFeedback />
        <Footer />
      </body>
    </html>
  );
}
