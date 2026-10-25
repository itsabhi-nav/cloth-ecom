import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { store } from "@/config/store.config";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import { baseOpenGraph, baseTwitter, defaultTitle, siteUrl } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: store.fullName,
  title: {
    default: defaultTitle,
    template: `%s · ${store.name}`,
  },
  description: store.description,
  keywords: [
    store.fullName,
    store.name,
    "premium essentials",
    "small batch clothing",
    "minimal fashion",
    "online store India",
  ],
  authors: [{ name: store.fullName, url: siteUrl }],
  creator: store.fullName,
  publisher: store.fullName,
  alternates: { canonical: "/" },
  category: "shopping",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // og:image comes from app/opengraph-image.png (1200×630) — same card on every route.
  openGraph: baseOpenGraph,
  // X/Twitter falls back to og:image when no twitter:image is set.
  twitter: baseTwitter,
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: "/brand/logo-mark-mask.svg", color: store.theme.colors.ink },
    ],
  },
  appleWebApp: {
    capable: true,
    title: store.name,
    statusBarStyle: "default",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, address: false, email: false },
};

export function generateViewport() {
  return { themeColor: store.theme.colors.bg };
}

/** Brand palette injected from store.config — the whole UI restyles from this one object. */
function BrandStyle() {
  const c = store.theme.colors;
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root{--c-bg:${c.bg};--c-card:${c.card};--c-ink:${c.ink};--c-soft:${c.soft};--c-line:${c.line};--c-accent:${c.accent}}`,
      }}
    />
  );
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <BrandStyle />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
