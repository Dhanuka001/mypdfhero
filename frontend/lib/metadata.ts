import type { Metadata } from "next";
import { siteConfig } from "./site";

type MetadataBuilderOptions = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function buildMetadata({ title, description, path = "/", keywords = [] }: MetadataBuilderOptions): Metadata {
  const url = new URL(path, siteConfig.url);

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title,
      description,
      url: url.toString(),
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

