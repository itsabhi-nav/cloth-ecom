"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { products } from "@/lib/data/catalog";
import { useWishlist } from "@/lib/store/wishlist";

const subscribeToHydration = (onStoreChange: () => void) =>
  useWishlist.persist.onFinishHydration(onStoreChange);
const getHydrationSnapshot = () => useWishlist.persist.hasHydrated();
const getServerHydrationSnapshot = () => false;

export function WishlistPage() {
  const ids = useWishlist((state) => state.ids);
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot
  );

  const savedProducts = products.filter((product) => ids.includes(product.id));

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
      <p className="text-soft text-xs font-semibold tracking-[0.16em] uppercase">Your collection</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Wishlist</h1>
          <p className="text-soft mt-2 text-sm">
            {hydrated ? `${savedProducts.length} ${savedProducts.length === 1 ? "piece" : "pieces"} saved` : "Your saved pieces"}
          </p>
        </div>
        {hydrated && savedProducts.length > 0 && (
          <Link href="/shop" className="text-ink text-sm font-semibold underline underline-offset-4">
            Continue shopping
          </Link>
        )}
      </div>

      {!hydrated ? (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4" aria-label="Loading wishlist">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="space-y-3" aria-hidden="true">
              <div className="aspect-[4/5] animate-pulse rounded-2xl bg-card" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-card" />
              <div className="h-4 w-1/3 animate-pulse rounded bg-card" />
            </div>
          ))}
        </div>
      ) : savedProducts.length === 0 ? (
        <div className="mt-10 flex min-h-80 flex-col items-center justify-center rounded-3xl border border-line bg-card px-6 py-16 text-center">
          <div className="grid size-14 place-items-center rounded-full border border-line">
            <Heart className="text-soft size-6" aria-hidden="true" />
          </div>
          <h2 className="font-display mt-5 text-xl font-semibold">Nothing saved just yet</h2>
          <p className="text-soft mt-2 max-w-sm text-sm leading-relaxed">
            Tap the heart on anything you like and it will be waiting here for you.
          </p>
          <Link
            href="/shop"
            className="bg-ink text-bg hover:opacity-90 mt-6 inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold transition-opacity"
          >
            Explore the collection
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
          {savedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
