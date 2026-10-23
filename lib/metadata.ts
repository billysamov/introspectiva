import type { Metadata } from "next";
import { site } from "./content";

/** Keep search results and shared links specific to the page being visited. */
export function pageMetadata(title: string, description: string, path: string, image = "/images/hero-sculpture.png"): Metadata {
  const socialTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  return {
    title: title.includes(site.name) ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: site.name,
      title: socialTitle,
      description,
      url: path,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image, alt: title }],
    },
  };
}
