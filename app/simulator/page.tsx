import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Operations Room | seri.ai",
  description: "Compatibility route for the public-safe Operational Intelligence Operations Room.",
  robots: {
    index: false,
    follow: true
  }
};

export default function SimulatorPage() {
  redirect("/investigation-room");
}
