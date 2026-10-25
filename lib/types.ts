/**
 * Domain types mirroring the Supabase schema (PHASE P2 tables).
 * Mock data is shaped exactly like these, so swapping the data source
 * to Supabase later is a drop-in replacement.
 */

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string;
};

export type Variant = {
  id: string;
  product_id: string;
  name: string; // "Size"
  value: string; // "M"
  stock_qty: number;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category_id: string;
  price: number; // whole rupees for mock; DB will store minor units
  compare_at_price: number | null;
  images: string[]; // ordered, [0] = card image
  variants: Variant[];
  rating_avg: number;
  rating_count: number;
  is_featured: boolean;
  badge: "NEW" | "BESTSELLER" | null;
  short_desc: string;
};

export type CartItem = {
  key: string; // productId:variantId unique cart line
  product_id: string;
  variant_id: string;
  name: string;
  variant_value: string;
  image_url: string;
  unit_price: number;
  qty: number;
};
