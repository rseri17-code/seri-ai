"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureSafeEvent } from "@/lib/analytics-events";

export function PageEvent({
  name,
  properties
}: {
  name: string;
  properties?: Record<string, string | number | boolean | null | undefined>;
}) {
  useEffect(() => {
    captureSafeEvent(name, properties);
  }, [name, properties]);

  return null;
}

export function RouteVisitEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/work") {
      captureSafeEvent("work_page_visit");
    }
    if (pathname === "/background") {
      captureSafeEvent("background_page_visit");
    }
  }, [pathname]);

  return null;
}
