import type { MetadataRoute } from "next";
import { contentRegistry, thesisRadar } from "@/content/site";
import { buildPublishingIndex, defaultDate, getShareableReferenceRoutes } from "@/lib/publishing";

function normalizeRoute(route: string) {
  const path = route.split("#")[0];
  return path === "" ? "/" : path;
}

function latestDate(dates: string[]) {
  const valid = dates.filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date));
  if (!valid.length) return defaultDate;
  return valid.sort().at(-1) ?? defaultDate;
}

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
    "/now",
    "/principles",
    "/wiki",
    "/rss.xml",
    "/robots.txt",
    "/sitemap.xml"
  ];

  const published = buildPublishingIndex().filter((asset) => asset.status === "published");
  const dynamicRoutes = published.map((asset) => asset.url);
  const shareableReferenceRoutes = getShareableReferenceRoutes();
  const routes = [...new Set([...staticRoutes, ...dynamicRoutes, ...shareableReferenceRoutes].map((route) => route.split("#")[0]))];

  const dates = new Map<string, string[]>();
  const addDate = (route: string, date?: string) => {
    if (!date) return;
    const key = normalizeRoute(route);
    const current = dates.get(key) ?? [];
    current.push(date);
    dates.set(key, current);
  };

  for (const item of contentRegistry) addDate(item.route, item.updatedAt);
  for (const asset of published) addDate(asset.url, asset.updatedAt);
  addDate("/framework", thesisRadar.updatedAt);

  return routes.map((route) => {
    const lastModified = latestDate(dates.get(normalizeRoute(route)) ?? []);
    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(lastModified),
      changeFrequency: route === "" ? "weekly" : "monthly",
      priority: route === "" ? 1 : route === "/framework" || route === "/work" ? 0.9 : route.includes("operational-intelligence") || route.includes("publication-pack") ? 0.8 : 0.7
    };
  });
}
