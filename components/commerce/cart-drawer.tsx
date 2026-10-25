"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { store } from "@/config/store.config";
import { cartCount, cartTotal, useCart } from "@/lib/store/cart";
import { formatMoney } from "@/lib/utils";

export function CartDrawer() {
  const { items, drawerOpen, setDrawer, remove, setQty } = useCart();
  const count = cartCount(items);
  const total = cartTotal(items);
  const freeThreshold = store.shipping.freeOver;
  const progress = Math.min(1, total / freeThreshold);
  const away = freeThreshold - total;

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawer(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-[92vw] max-w-md flex-col bg-bg shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Shopping bag"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-lg font-bold tracking-tight">
                Your bag{" "}
                <span className="text-soft font-normal">({count})</span>
              </h2>
              <button
                aria-label="Close bag"
                onClick={() => setDrawer(false)}
                className="grid size-9 place-items-center rounded-full hover:bg-ink/5"
              >
                <X className="size-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                <div className="bg-card grid size-16 place-items-center rounded-full border border-line">
                  <ShoppingBag className="text-soft size-6" />
                </div>
                <p className="font-display text-lg font-semibold">Your bag is empty</p>
                <p className="text-soft max-w-[240px] text-sm">
                  Fill it with things you will actually reach for every day.
                </p>
                <Link href="/shop" onClick={() => setDrawer(false)} className="bg-ink text-bg hover:opacity-90 mt-2 inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold transition-opacity">
                  Start shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Free shipping progress */}
                <div className="border-b border-line px-5 py-3.5">
                  <p className="text-[13px]">
                    {away > 0 ? (
                      <>
                        Add <span className="font-semibold">{formatMoney(away)}</span> more for free express shipping
                      </>
                    ) : (
                      <span className="font-semibold">🎉 Free express shipping unlocked</span>
                    )}
                  </p>
                  <div className="bg-line mt-2 h-1.5 overflow-hidden rounded-full">
                    <motion.div
                      className={progress >= 1 ? "bg-accent h-full rounded-full" : "bg-ink h-full rounded-full"}
                      animate={{ width: `${progress * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                </div>

                {/* Items */}
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.key}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, marginBottom: -1 }}
                        className="flex gap-3.5 py-4"
                      >
                        <Link href="/shop" onClick={() => setDrawer(false)} className="relative size-[84px] shrink-0 overflow-hidden rounded-xl">
                          <Image src={item.image_url} alt={item.name} fill sizes="84px" className="object-cover" />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold leading-snug">{item.name}</p>
                            <p className="text-sm font-semibold whitespace-nowrap">{formatMoney(item.unit_price * item.qty)}</p>
                          </div>
                          <p className="text-soft mt-0.5 text-xs">Size: {item.variant_value}</p>
                          <div className="mt-2.5 flex items-center justify-between">
                            <div className="border-line flex items-center gap-1 rounded-full border px-1 py-0.5">
                              <button aria-label="Decrease quantity" onClick={() => setQty(item.key, item.qty - 1)} className="grid size-6 place-items-center rounded-full hover:bg-ink/5">
                                <Minus className="size-3" />
                              </button>
                              <span className="w-4 text-center text-xs font-semibold">{item.qty}</span>
                              <button aria-label="Increase quantity" onClick={() => setQty(item.key, item.qty + 1)} className="grid size-6 place-items-center rounded-full hover:bg-ink/5">
                                <Plus className="size-3" />
                              </button>
                            </div>
                            <button onClick={() => remove(item.key)} className="text-soft hover:text-accent text-xs underline underline-offset-2">
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Footer */}
                <div className="border-t border-line bg-card px-5 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-soft">Subtotal</span>
                    <span className="font-display text-lg font-bold">{formatMoney(total)}</span>
                  </div>
                  <p className="text-soft mt-0.5 text-xs">Shipping & taxes calculated at checkout</p>
                  <button className="group bg-ink text-bg hover:opacity-90 mt-3.5 flex h-12 w-full items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-opacity">
                    Checkout
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                  <button
                    onClick={() => setDrawer(false)}
                    className="text-soft mt-2.5 w-full text-center text-[13px] underline-offset-4 hover:underline"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
