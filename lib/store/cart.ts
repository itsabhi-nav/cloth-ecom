"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";

type CartState = {
  items: CartItem[];
  drawerOpen: boolean;
  setDrawer: (open: boolean) => void;
  add: (product: Product, variantId: string) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      drawerOpen: false,
      setDrawer: (open) => set({ drawerOpen: open }),
      add: (product, variantId) =>
        set((state) => {
          const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
          const key = `${product.id}:${variant.id}`;
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, qty: Math.min(i.qty + 1, variant.stock_qty || 99) } : i
              ),
              drawerOpen: true,
            };
          }
          const item: CartItem = {
            key,
            product_id: product.id,
            variant_id: variant.id,
            name: product.name,
            variant_value: variant.value,
            image_url: product.images[0],
            unit_price: product.price,
            qty: 1,
          };
          return { items: [...state.items, item], drawerOpen: true };
        }),
      remove: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      setQty: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0 ? state.items.filter((i) => i.key !== key)
            : state.items.map((i) => (i.key === key ? { ...i, qty } : i)),
        })),
    }),
    { name: "aur-cart", partialize: (s) => ({ items: s.items }) }
  )
);

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.qty, 0);
export const cartTotal = (items: CartItem[]) => items.reduce((n, i) => n + i.qty * i.unit_price, 0);
