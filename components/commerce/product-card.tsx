"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, Plus } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { cn, formatMoney } from "@/lib/utils";
import { useCart } from "@/lib/store/cart";
import { useSSRSafeInView } from "@/components/motion/reveal";
import { useWishlist } from "@/lib/store/wishlist";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const add = useCart((s) => s.add);
  const wishlistIds = useWishlist((s) => s.ids);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const wished = wishlistIds.includes(product.id);
  const [hovered, setHovered] = useState(false);
  // SSR-safe reveal: card is visible in server HTML, animates in only when
  // it enters the viewport after hydration (staggered by index).
  const { ref, hidden } = useSSRSafeInView<HTMLElement>();

  const discount = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : 0;
  const inStock = product.variants.some((v) => v.stock_qty > 0);
  const firstStocked = product.variants.find((v) => v.stock_qty > 0) ?? product.variants[0];

  return (
    <motion.article
      ref={ref}
      initial={false}
      animate={hidden ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/product/${product.slug}`}
        aria-label={product.name}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-card"
      >
        {/* Primary / hover-swap images */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn(
            "object-cover transition-all duration-700 ease-[var(--ease-out-expo)]",
            hovered ? "scale-[1.04] opacity-0" : "scale-100 opacity-100"
          )}
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn("object-cover transition-all duration-700 ease-[var(--ease-out-expo)]", hovered ? "scale-[1.05] opacity-100" : "scale-105 opacity-0")}
          />
        )}

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge === "NEW" && (
            <span className="bg-ink text-bg rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider">NEW IN</span>
          )}
          {product.badge === "BESTSELLER" && (
            <span className="bg-card/90 text-ink rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider backdrop-blur">
              BESTSELLER
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold tracking-wider text-white">
              −{discount}%
            </span>
          )}
        </div>

        {/* Quick add (desktop hover / always-visible dot on touch) */}
        <div
          className={cn(
            "absolute inset-x-3 bottom-3 transition-all duration-500 ease-[var(--ease-out-expo)]",
            "opacity-100 md:translate-y-14 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
          )}
        >
          <button
            aria-label={`Add ${product.name} to bag`}
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              add(product, firstStocked.id);
            }}
            className="bg-ink/90 text-bg hover:bg-ink flex h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold backdrop-blur transition-colors"
          >
            <Plus className="size-4" aria-hidden />
            {!inStock ? "Sold out" : "Quick add"}
          </button>
        </div>
      </Link>

      {/* Wishlist heart */}
      <button
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggleWishlist(product.id)}
        className={cn(
          "absolute right-3 top-3 grid size-9 place-items-center rounded-full backdrop-blur transition-all duration-300",
          wished ? "bg-card text-accent" : "bg-card/80 text-ink/60 opacity-0 group-hover:opacity-100 max-md:opacity-100"
        )}
      >
        <Heart className={cn("size-4", wished && "fill-accent text-accent")} />
      </button>

      {/* Meta */}
      <div className="mt-3.5 space-y-1 px-0.5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/product/${product.slug}`} className="font-display text-[15px] font-semibold leading-snug tracking-tight hover:underline hover:underline-offset-4">
            {product.name}
          </Link>
        </div>
        <div className="text-soft flex items-center gap-2 text-sm">
          <span className="text-ink font-semibold">{formatMoney(product.price)}</span>
          {product.compare_at_price && (
            <s className="opacity-70">{formatMoney(product.compare_at_price)}</s>
          )}
        </div>
        {product.rating_count > 0 && (
          <p className="text-soft/80 text-xs">
            ★ {product.rating_avg} · {product.rating_count} reviews
          </p>
        )}
      </div>
    </motion.article>
  );
}
