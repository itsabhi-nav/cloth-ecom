"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  Truck,
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
    <div className="w-full flex flex-col space-y-8">
      {/* Title block */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tighter text-ink">
            {product.name}
          </h1>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="font-display text-2xl font-bold text-ink">{formatMoney(product.price)}</span>
            {product.compare_at_price && (
              <>
                <s className="text-soft text-base">{formatMoney(product.compare_at_price)}</s>
                <span className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-1 rounded-full">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
        </div>

        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "flex items-center gap-3 w-full justify-center h-12 rounded-full border border-line transition-all duration-300 font-semibold text-sm",
            wished ? "border-accent text-accent" : "text-ink/80 hover:border-ink hover:text-ink"
          )}
        >
          <Heart className={cn("size-4", wished && "fill-accent text-accent")} />
          {wished ? "Saved to wishlist" : "Save to wishlist"}
        </button>
      </div>

      <p className="text-soft text-sm leading-relaxed max-w-lg">{product.short_desc}</p>

      {/* Highlights - IMPROVED */}
      <div className="grid grid-cols-2 gap-4">
        {["Premium Fabric", "Cut on bias", "Easy care", "Designed for comfort"].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-ink font-medium bg-card border border-line rounded-lg p-3">
             <div className="size-1.5 rounded-full bg-accent" />
             {item}
          </div>
        ))}
      </div>

      {/* Size */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <p className="font-display text-[11px] font-bold tracking-widest uppercase text-ink">
            Select Size
          </p>
          <p className="text-xs text-soft underline cursor-pointer hover:text-ink">Size Guide</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => {
            const out = v.stock_qty <= 0;
            return (
              <button
                key={v.id}
                disabled={out}
                onClick={() => {
                  setVariantId(v.id);
                  setQty(1);
                }}
                className={cn(
                  "border-line h-12 px-6 rounded-full border text-sm font-semibold transition-all duration-200",
                  variantId === v.id ? "bg-ink text-bg border-ink" : "bg-card text-ink hover:border-ink",
                  out && "cursor-not-allowed border-line/50 text-line bg-transparent line-through"
                )}
              >
                {v.value}
              </button>
            );
          })}
        </div>
      </div>

      {/* Qty + Add to Cart */}
      {!soldOut && (
        <div className="mt-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-line rounded-full overflow-hidden">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-2 text-ink hover:bg-line/50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-12 text-center text-sm font-semibold text-ink">{qty}</span>
              <button
                onClick={() => setQty(Math.min(maxQty, qty + 1))}
                className="px-4 py-2 text-ink hover:bg-line/50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              onClick={buy}
              className="flex-1 group bg-ink text-bg hover:opacity-90 flex h-14 items-center justify-center gap-2 rounded-full text-base font-bold transition-all duration-300 hover:shadow-lg hover:shadow-ink/10 active:scale-[0.98]"
            >
              Add to bag · {formatMoney(product.price * qty)}
            </button>
          </div>
        </div>
      )}
      {soldOut && (
        <button
          disabled
          className="bg-line text-soft mt-6 h-12 w-full rounded-full text-[15px] font-semibold"
        >
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

      {/* Product Details Accordions */}
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

      {/* Highlight Section */}
      <div className="bg-card rounded-2xl p-6 border border-line">
        <h4 className="font-display text-sm font-bold uppercase tracking-widest text-ink">Why you'll love it</h4>
        <ul className="mt-4 space-y-3 text-sm text-soft list-disc list-inside">
          <li>Designed for comfort and longevity</li>
          <li>Versatile style that pairs with anything</li>
          <li>Ethically sourced and premium finish</li>
          <li>Easy-care fabric that retains shape</li>
        </ul>
      </div>

      {/* Full Description */}
      <div className="mt-8 border-line border-t pt-8">
        <h3 className="font-display text-lg font-semibold">Description</h3>
        <div className="mt-4 text-soft text-sm leading-relaxed prose prose-sm max-w-none">
          <p>{product.short_desc}</p>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <AnimatePresence>
        {!soldOut && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="border-line fixed inset-x-0 bottom-0 z-30 border-t bg-bg/90 px-4 py-3 backdrop-blur-xl lg:hidden"
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