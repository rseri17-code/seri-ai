import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "seri.ai | Operational Intelligence for Agentic SRE",
  description:
    "An inspectable operating layer for Operational Intelligence: evidence-backed Agentic SRE harnesses, replayable incident reasoning, evaluation gates, and human-reviewed action.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://seri.ai"),
  openGraph: {
    title: "seri.ai | Operational Intelligence for Agentic SRE",
    description: "Operational Intelligence is the reasoning layer between enterprise telemetry and human decision.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
