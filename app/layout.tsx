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
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <BetaFeedback />
        <Footer />
      </body>
    </html>
  );
}
