import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { store } from "@/config/store.config";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/commerce/cart-drawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${store.fullName} — ${store.tagline}`,
    template: `%s · ${store.name}`,
  },
  description: store.description,
  openGraph: {
    title: `${store.fullName} — ${store.tagline}`,
    description: store.description,
    type: "website",
  },
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
