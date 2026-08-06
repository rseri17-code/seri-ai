import type { Metadata } from "next";

type PublicRouteMetadata = {
  title: string;
  description: string;
  path: `/${string}`;
  type?: "website" | "article";
};

export function publicRouteMetadata({ title, description, path, type = "website" }: PublicRouteMetadata): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type
    }
  };
}
