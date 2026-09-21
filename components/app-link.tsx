import Link from "next/link";
import type { ComponentProps } from "react";
import { isPublicFileHref } from "@/lib/public-asset";

type AppLinkProps = ComponentProps<typeof Link>;

function hrefToString(href: AppLinkProps["href"]): string {
  if (typeof href === "string") {
    return href;
  }

  return href.pathname ?? "";
}

export function usesNativeNavigation(href: AppLinkProps["href"]): boolean {
  const url = hrefToString(href);
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("//") ||
    isPublicFileHref(url)
  );
}

export function AppLink({ href, ...props }: AppLinkProps) {
  if (usesNativeNavigation(href)) {
    const url = hrefToString(href);
    const isExternal = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
    const nativeProps = { ...props } as Omit<ComponentProps<"a">, "href"> & {
      prefetch?: unknown;
      replace?: unknown;
      scroll?: unknown;
    };
    delete nativeProps.prefetch;
    delete nativeProps.replace;
    delete nativeProps.scroll;
    return (
      <a
        href={url}
        {...nativeProps}
        {...(isExternal
          ? {
              target: nativeProps.target ?? "_blank",
              rel: nativeProps.rel ?? "noreferrer"
            }
          : {})}
      />
    );
  }

  return <Link href={href} {...props} />;
}
