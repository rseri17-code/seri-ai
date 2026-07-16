import type { MetadataRoute } from "next";
import { buildPublishingIndex } from "@/lib/publishing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://seri.ai";
  const staticRoutes = [
    "",
    "/work",
    "/framework",
    "/start-here",
    "/map",
    "/library",
    "/patterns",
    "/products",
    "/artifacts",
    "/investigation-room",
    "/ask",
    "/evals",
    "/background",
    "/resume",
    "/contact",
    "/manifesto",
    "/now",
    "/radar",
    "/principles",
    "/wiki"
  ];

  const dynamicRoutes = buildPublishingIndex()
    .filter((asset) => asset.status === "published")
    .map((asset) => asset.url);

  return [...new Set([...staticRoutes, ...dynamicRoutes])].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-07-16"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/framework" || route === "/work" ? 0.9 : 0.7
  }));
}
