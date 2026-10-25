"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BadgeCheck, ChevronDown, Heart, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatMoney } from "@/lib/utils";
import { useCart } from "@/lib/store/cart";
import { useWishlist } from "@/lib/store/wishlist";

export function ProductDetail({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const setDrawer = useCart((s) => s.setDrawer);
  const wishlistIds = useWishlist((s) => s.ids);
  const toggleWishlist = useWishlist((s) => s.toggle);
  const wished = wishlistIds.includes(product.id);

  const inStockVariants = product.variants.filter((v) => v.stock_qty > 0);
  const [variantId, setVariantId] = useState(inStockVariants[0]?.id ?? "");
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const maxQty = variant?.stock_qty || 1;

  const discount = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : 0;
  const soldOut = inStockVariants.length === 0;

  const buy = () => {
    add(product, variantId);
    setDrawer(true);
  };

  const detailBlocks = [
    {
      icon: Truck,
      title: "Delivery",
      body: "Order before 4pm for same-day dispatch. Express 1–2 days to metro cities, 2–4 days elsewhere. Free express over ₹1,499.",
    },
    {
      icon: RotateCcw,
      title: "Returns & exchange",
      body: "7 days at your door. Size swap is one free pickup; refunds hit your account in 3–5 working days.",
    },
    {
      icon: ShieldCheck,
      title: "Fabric & care",
      body: product.short_desc + " Machine wash cold, hang dry. Made to a premium standard that outlives trends.",
    },
  ];

  return (
    <div>
      {/* Price meta — shares identity for the mobile sticky bar */}
      {/* Title block */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {product.badge === "NEW" && <span className="bg-ink text-bg rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider">NEW IN</span>}
            {discount > 0 && <span className="bg-accent rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider text-white">−{discount}%</span>}
          </div>
          <h1 className="font-display mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          {product.rating_count > 0 && (
            <a href="#reviews" className="text-soft mt-2.5 inline-flex items-center gap-1.5 text-sm hover:underline hover:underline-offset-4">
              <span className="text-accent flex">
                {Array.from({ length: Math.round(product.rating_avg) }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}
              </span>
              {product.rating_avg} · {product.rating_count} reviews
            </a>
          )}
        </div>
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "border-line grid size-11 shrink-0 place-items-center rounded-full border bg-card transition-all duration-300",
            wished ? "text-accent border-accent" : "text-ink/60 hover:border-ink hover:text-ink"
          )}
        >
          <Heart className={cn("size-4", wished && "fill-accent text-accent")} />
        </button>
      </div>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-3">
        <span className="font-display text-2xl font-bold">{formatMoney(product.price)}</span>
        {product.compare_at_price && <s className="text-soft text-lg">{formatMoney(product.compare_at_price)}</s>}
        <span className="text-soft text-xs">incl. of all taxes</span>
      </div>
      <p className="text-soft mt-3 max-w-md text-[14.5px] leading-relaxed">{product.short_desc}</p>

      {/* Size */}
      <div className="mt-7">
        <div className="flex items-center justify-between">
          <p className="font-display text-[13px] font-semibold tracking-wide uppercase">
            Size · <span className="text-soft normal-case">{variant?.value}</span>
          </p>
          <button className="text-soft flex items-center gap-1 text-xs underline-offset-4 hover:underline">
            <BadgeCheck className="size-3.5" aria-hidden /> True to size
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((v) => {
            const out = v.stock_qty <= 0;
            const low = v.stock_qty > 0 && v.stock_qty <= 4;
            return (
              <button
                key={v.id}
                disabled={out}
                onClick={() => { setVariantId(v.id); setQty(1); }}
                className={cn(
                  "border-line relative h-11 min-w-[52px] rounded-full border text-sm font-semibold transition-all duration-200",
                  variantId === v.id ? "bg-ink text-bg border-ink" : "bg-card text-ink hover:border-ink",
                  out && "cursor-not-allowed border-line text-line line-through hover:border-line",
                  low && variantId !== v.id && "border-accent/50"
                )}
              >
                {v.value}
                {low && <span className="bg-accent absolute -top-1 -right-1 size-2 rounded-full" title="Low stock" />}
              </button>
            );
          })}
        </div>
        {variant && variant.stock_qty > 0 && variant.stock_qty <= 4 && (
          <p className="text-accent mt-2.5 text-xs font-semibold">
            Only {variant.stock_qty} left in {variant.value} — sells out fast
          </p>
        )}
      </div>

      {/* Qty + Add */}
      {!soldOut && (
        <div className="mt-6 flex items-center gap-3">
          <div className="border-line flex h-12 items-center gap-2 rounded-full border bg-card px-2">
            <button aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))} className="hover:bg-ink/5 grid size-8 place-items-center rounded-full">
              <Minus className="size-4" />
            </button>
            <span className="w-5 text-center text-sm font-bold">{qty}</span>
            <button
              aria-label="Increase"
              onClick={() => setQty(Math.min(maxQty, qty + 1))}
              disabled={qty >= maxQty}
              className="hover:bg-ink/5 grid size-8 place-items-center rounded-full disabled:opacity-40"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <button
            onClick={buy}
            className="group bg-ink text-bg hover:opacity-90 flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Add to bag · {formatMoney(product.price * qty)}
          </button>
        </div>
      )}
      {soldOut && (
        <button disabled className="bg-line text-soft mt-6 h-12 w-full rounded-full text-[15px] font-semibold">
          Sold out — restock notification coming
        </button>
      )}

      {/* Trust row */}
      <div className="border-line mt-6 grid grid-cols-3 gap-3 rounded-2xl border bg-card p-4 text-center">
        {[Truck, RotateCcw, ShieldCheck].map((Icon, i) => (
          <div key={i} className="text-soft flex flex-col items-center gap-1.5 text-[11px] font-medium">
            <Icon className="text-ink size-[18px]" aria-hidden />
            {["Express 1–2 days", "7-day returns", "Secure checkout"][i]}
          </div>
        ))}
      </div>

      {/* Accordions */}
      <div className="border-line mt-8 border-t">
        {detailBlocks.map((b) => (
          <details key={b.title} className="group border-line border-b">
            <summary className="flex cursor-pointer list-none items-center justify-between py-4">
              <span className="font-display flex items-center gap-2.5 text-sm font-semibold">
                <b.icon className="size-4 text-soft" aria-hidden />
                {b.title}
              </span>
              <ChevronDown className="text-soft size-4 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="text-soft pb-5 text-sm leading-relaxed">{b.body}</p>
          </details>
        ))}
      </div>

      {/* Mobile sticky bar */}
      <AnimatePresence>
        {!soldOut && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="border-line fixed inset-x-0 bottom-0 z-30 border-t bg-bg/85 px-4 py-3 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{product.name}</p>
                <p className="text-soft text-[11px]">Size {variant?.value} · {formatMoney(product.price * qty)}</p>
              </div>
              <button
                onClick={buy}
                className="bg-ink text-bg flex h-11 shrink-0 items-center gap-2 rounded-full px-6 text-sm font-semibold"
              >
                Add to bag
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
