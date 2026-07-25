"use client";

import { usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";

function AnalyticsInner() {
  const pathname = usePathname();

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (key) {
      void import("posthog-js").then(({ default: posthog }) => {
        if (!posthog.__loaded) {
          posthog.init(key, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
            capture_pageview: false,
            autocapture: false,
            disable_session_recording: true
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
          posthog.capture("$pageview", { $current_url: pathname });
        }
      });
    }
  }, [pathname]);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
