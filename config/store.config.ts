/**
 * THE ONE FILE that rebrands the entire storefront.
 * Per-client onboarding = clone repo → new Supabase project → edit this file → deploy.
 * Everything (colors, fonts, copy, features, nav) reads from here.
 */
export const store = {
  name: "AUR",
  fullName: "AUR Studio",
  tagline: "Everyday essentials, elevated",
  description:
    "Considered wardrobe essentials, made in small batches. Premium fabrics, honest pricing, nothing you do not need.",
  currency: "INR",

  theme: {
    colors: {
      bg: "#F7F6F2", // page background
      card: "#FFFFFF", // card / surface
      ink: "#15130E", // primary text + primary buttons
      soft: "#6F6A61", // muted text
      line: "#E6E3DB", // borders
      accent: "#AE5230", // accent: sale badges, highlights
    },
    fonts: {
      heading: "Space Grotesk",
      body: "Inter",
    },
    radius: "18px",
    darkMode: true,
  },

  features: {
    announcement: true,
    wishlist: true,
    reviews: true,
    coupons: true,
    guestCheckout: true,
    freeShippingBar: true,
  },

  announcement: "Free express shipping over ₹1,499 · Easy 7-day returns · COD available",

  shipping: { freeOver: 1499, flat: 99 },

  nav: [
    { label: "Shop All", href: "/shop" },
    { label: "Women", href: "/category/women" },
    { label: "Men", href: "/category/men" },
    { label: "Accessories", href: "/category/accessories" },
  ],
} as const;

export type Store = typeof store;
export const formatMoney = (paiseOrRupees: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(paiseOrRupees)}`;
