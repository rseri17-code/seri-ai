"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (key) {
      void import("posthog-js").then(({ default: posthog }) => {
        if (!posthog.__loaded) {
          posthog.init(key, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
            capture_pageview: false
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (key) {
      void import("posthog-js").then(({ default: posthog }) => {
        if (posthog.__loaded) {
          const query = searchParams.toString();
          posthog.capture("$pageview", { $current_url: `${pathname}${query ? `?${query}` : ""}` });
        }
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
