import type { Metadata } from "next";
import { WishlistPage } from "@/components/commerce/wishlist-page";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "The pieces you have saved from the collection.",
  alternates: { canonical: "/wishlist" },
};

export default function WishlistRoute() {
  return <WishlistPage />;
}
