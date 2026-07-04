import type { Metadata } from "next";
import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "seri.ai | Operational Intelligence thinking by Ravi Seri",
  description:
    "The public home of Ravi Seri's thinking on Operational Intelligence, Agentic Systems, Transaction Intelligence, observability, knowledge graphs, and AI evaluation.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://seri.ai"),
  openGraph: {
    title: "seri.ai",
    description: "Building AI systems that help enterprises understand, explain, and improve their operations.",
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
