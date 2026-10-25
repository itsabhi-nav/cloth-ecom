import type { MetadataRoute } from "next";
import { store } from "@/config/store.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${store.fullName} — ${store.tagline}`,
    short_name: store.name,
    description: store.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: store.theme.colors.bg,
    theme_color: store.theme.colors.bg,
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
