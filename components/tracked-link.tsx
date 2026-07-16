"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { captureSafeEvent } from "@/lib/analytics-events";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventProperties?: Record<string, string | number | boolean | null | undefined>;
  children: ReactNode;
};

export function TrackedLink({ eventName, eventProperties, onClick, children, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        captureSafeEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}

export function TrackedAnchor({
  eventName,
  eventProperties,
  onClick,
  children,
  ...props
}: ComponentProps<"a"> & {
  eventName: string;
  eventProperties?: Record<string, string | number | boolean | null | undefined>;
}) {
  return (
    <a
      {...props}
      onClick={(event) => {
        captureSafeEvent(eventName, eventProperties);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
