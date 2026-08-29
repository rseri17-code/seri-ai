import type { MetadataRoute } from "next";
import { buildPublishingIndex, getShareableReferenceRoutes } from "@/lib/publishing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seri-ai.vercel.app";
  const staticRoutes = [
    "",
    "/work",
    "/framework",
    "/library",
    "/ideas",
    "/patterns",
    "/products",
    "/projects",
    "/architecture-lab",
    "/investigation-room",
    "/ask",
    "/background",
    "/resume",
    "/contact",
    "/manifesto",
    "/now",
    "/radar",
    "/principles",
    "/wiki",
    "/llms.txt",
    "/rss.xml",
    "/robots.txt",
    "/sitemap.xml"
  ];

  const dynamicRoutes = buildPublishingIndex()
    .filter((asset) => asset.status === "published")
    .map((asset) => asset.url);

  const shareableReferenceRoutes = getShareableReferenceRoutes();

  return [...new Set([...staticRoutes, ...dynamicRoutes, ...shareableReferenceRoutes].map((route) => route.split("#")[0]))].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(route.includes("operational-intelligence") || route.includes("publication-pack") || route.includes("oi-room-001") || route === "/llms.txt" ? "2026-07-25" : "2026-07-16"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/framework" || route === "/work" ? 0.9 : route.includes("operational-intelligence") || route.includes("publication-pack") || route === "/llms.txt" ? 0.8 : 0.7
  }));
}
