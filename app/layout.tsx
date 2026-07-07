import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "seri.ai | The home of Operational Intelligence",
  description:
    "A public operating system for Operational Intelligence: evidence-backed Agentic SRE harnesses, replayable incident reasoning, and human-reviewed action.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://seri.ai"),
  openGraph: {
    title: "seri.ai | Operational Intelligence",
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
