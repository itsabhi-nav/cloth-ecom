import type { Metadata } from "next";
import { store } from "@/config/store.config";

/**
 * Absolute base URL for canonical links and social previews.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://aurstudio.in).
 * Vercel and Netlify both expose their production URL automatically.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : (process.env.URL ?? process.env.DEPLOY_PRIME_URL ?? "http://localhost:3000"));

export const defaultTitle = `${store.fullName} — ${store.tagline}`;

/**
 * Shared Open Graph defaults. Nested metadata is *replaced* (not merged) by the
 * deepest segment that defines it, so pages that set their own `openGraph`
 * must spread this in to keep siteName / locale / type intact.
 */
export const baseOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: store.fullName,
  locale: "en_IN",
  url: "/",
  title: defaultTitle,
  description: store.description,
};

/** Twitter/X falls back to og:image when no twitter:image is provided. */
export const baseTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  title: defaultTitle,
  description: store.description,
};
