# 🏗️ White-Label E-Commerce Platform — Architecture Plan

> **Build once. Sell many.** One battle-tested codebase, re-deployed per client with a different Supabase project, brand theme, and product catalog. Change the skin, not the skeleton.

---

## 1. The Big Idea

| Constraint | Decision |
|---|---|
| Code written | Only once |
| Per client | New GitHub repo (clone) + new Supabase project + new theme config |
| Code changes per client | ❌ Zero (only config files + env vars) |
| Payment gateway | Pluggable adapter — configured per client, built last |
| Database | Supabase Postgres (.free tier to start, scales up) |
| Images | Supabase Storage CDN |

### Why this works for you
- **One schema** → every client's Supabase runs the *same migration files*. Bug fixes push to all repos via a simple cherry-pick / rebase.
- **One design system** → UI is driven by CSS variables + a store config file. Client A = neon sneaker store, Client B = pastel skincare store, same engine.
- **No vendor lock-in pain** → Supabase gives DB + Auth + Storage + Edge Functions in one; swapping a client off it means changing 3 env vars.

---

## 2. Tech Stack (locked)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** + TypeScript | Server Components, ISR caching, Server Actions replace most "backend" code |
| Styling | **Tailwind CSS v4** + CSS variables for theming | Tokens = rebrand in minutes |
| UI Kit | **shadcn/ui** (copied into repo, fully owned) | Modern, accessible, no lock-in, easy to restyle |
| Motion | **Motion (Framer Motion)** | Scroll reveals, page transitions, micro-interactions — the "next level" feel |
| DB/Auth/Storage | **Supabase** | Postgres + Auth + Storage + Realtime + Edge Functions + image transforms |
| Validation | **Zod** | Shared types between client & server |
| State | Server Components first; `Zustand` only for cart UI state | Minimal JS, fast pages |
| Charts/Admin UI | Recharts + shadcn data-table | Admin dashboard later |

> **Rule:** No other heavy deps unless something genuinely can't be done with the above. Every dep is a dependency on your ability to update 20 repos.

---

## 3. High-Level Architecture

```
                        ┌─────────────────────────────┐
   Browser ────────────▶│  Next.js (Vercel / Node)    │
                        │  ├─ Storefront (SSR/ISR)    │
                        │  ├─ Admin (client-gated)    │
                        │  ├─ Server Actions/API      │
                        │  └─ Middleware (auth/rate)  │
                        └───────┬───────────┬─────────┘
                                │           │
                     anon key   │           │  service_role key
                     (public)   │           │  (server only)
                                ▼           ▼
                        ┌─────────────────────────────┐
                        │        SUPABASE             │
                        │  ├─ Postgres (RLS enforced) │
                        │  ├─ Auth (Supabase Auth)    │
                        │  ├─ Storage (images CDN)    │
                        │  ├─ Edge Functions          │
                        │  └─ Webhooks → payments     │
                        └─────────────────────────────┘
```

**Golden rule: the `service_role` key and payment secrets NEVER leave the server.** The browser only ever gets the `anon` key, and Postgres RLS is the real security boundary.

---

## 4. Per-Client Configuration Model

Each client repo differs in exactly **two places**:

### a) `.env.local` (per client, never committed)
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_PAYMENT_PROVIDER=razorpay   # stripe | razorpay | paypal | cod
PAYMENT_KEY_ID=...
PAYMENT_KEY_SECRET=...
PAYMENT_WEBHOOK_SECRET=...
NEXT_PUBLIC_SITE_URL=...
```

### b) `config/store.config.ts` (single source of brand truth)
```ts
export const store = {
  name: "Aurora",
  tagline: "Everyday essentials, elevated",
  logo: "/logo.svg",
  theme: {
    colors: { primary: "#5B5BD6", bg: "#FAFAFC", fg: "#17171B", accent: "#F4B740" },
    radius: "16px",
    fonts: { heading: "Space Grotesk", body: "Inter" },
    darkMode: true,
  },
  features: {
    wishlist: true, reviews: true, coupons: true,
    guestCheckout: true, freeShippingBar: true,
    announcementBar: "Free shipping over ₹999 ✦ COD available",
  },
  sections: { hero: "split", productCard: "hover-gallery" },
  shipping: { freeOver: 999, flat: 79 },
  currency: "INR",
}
```
The entire storefront (colors, fonts, copy, which features show, hero layout style) reads from this one file. **Client onboarding = clone repo → new Supabase → run migrations → edit config → deploy. Under an hour.**

---

## 5. Database Schema (runs identically on every Supabase project)

Kept as ordered migration files in `supabase/migrations/`. Run on any new client project → identical schema every time.

### Core commerce tables
```
categories        id, name, slug*, parent_id, image_url, position, is_active
products          id, sku, name, slug*, description, rich_desc, category_id,
                  price, compare_at_price, currency, images jsonb,
                  is_active, is_featured, rating_avg, rating_count,
                  seo_title, seo_desc, created_at
product_variants  id, product_id**, name (Size/Color), value, price_delta,
                  stock_qty, sku, image_url, weight
carts             id, user_id nullable, session_id (for guests), created_at
cart_items        id, cart_id**, variant_id**, qty, price_snapshot
wishlists         id, user_id**, product_id**
orders            id, order_no (human: AUR-1042), user_id nullable, email,
                  status (pending|paid|packed|shipped|delivered|cancelled|refunded),
                  subtotal, discount, shipping_fee, tax, total, currency,
                  shipping_address jsonb, payment_method, payment_id,
                  placed_at, tracking_no, tracking_url
order_items       id, order_id**, variant_id, name_snapshot, image_snapshot,
                  unit_price, qty, line_total
discounts         id, code, type (percent|fixed|freeship), value,
                  min_order, usage_limit, used_count, starts_at, ends_at, is_active
```

### Content / marketing (drives the "designed" homepage without code changes)
```
banners           id, placement (hero|strip|grid), title, subtitle,
                  image_url, cta_text, cta_link, position, is_active
reviews           id, product_id**, user_id, rating 1-5, title, body,
                  images jsonb, is_approved, created_at
pages             id, slug*, title, content (JSON blocks), is_published
                  → About / Shipping Policy / Returns rendered from DB
pins/drops (opt.) id, product_id, pinned_at   → "Shop The Drop" section
newsletter        id, email unique, source, created_at
```

### Operations
```
profiles          id (=auth.users.id)**, full_name, phone, role (admin|staff|customer)
webhook_events    id, provider, event_id unique, payload jsonb, processed_at,
                  → idempotency for payment webhooks (CRITICAL)
audit_log         id, actor_id, action, entity, entity_id, diff jsonb, at
store_settings    single-row: store name, taxes %, return window, etc. (admin-editable)
```

### Indexes & constraints (don't skip these)
- `products.slug`, `categories.slug`, `pages.slug` UNIQUE
- FK indexes: `cart_items(cart_id)`, `order_items(order_id)`, `reviews(product_id)`
- `orders.status` + `placed_at` composite index for admin dashboards
- `products.price`, `products.rating_avg` for sort/filter queries

---

## 6. Security Model (RLS is the backbone)

Every table gets **Row Level Security ON by default**, and policies like:

| Table | Public (anon) | Customer (auth) | Admin |
|---|---|---|---|
| products/categories/banners | ✅ read active only | ✅ read | ✅ full |
| carts / cart_items | own `session_id` only | own `user_id` only | ✅ |
| orders | ❌ | ✅ read own only | ✅ |
| reviews | ✅ read approved | ✅ insert own, edit own | ✅ moderate |
| discounts | ❌ validate server-side only | ❌ | ✅ |
| store_settings / audit / webhook_events | ❌ ❌ | ❌ | ✅ read |

**Admin auth:** `profiles.role = 'admin'` (checked via a custom-safe RLS function `is_admin()` marked `SECURITY DEFINER SET search_path = ''`). Admin routes additionally gated in Next.js middleware + a `/admin` layout guard. 2FA later via Supabase Auth factors.

### Threat model → concrete mitigations
| Threat | Mitigation |
|---|---|
| Price tampering (client sends price) | Server recomputes every order total from DB. Client only sends `variant_id + qty`. |
| Payment webhook forgery | Verify signature (Stripe/Razorpay HMAC) + record `event_id` in `webhook_events` to block replays; mark orders paid only via server verify. |
| Someone else's order/cart data | RLS + `user_id` scoping everywhere; guests isolated by random `session_id` httpOnly cookie. |
| SQL injection | Supabase PostgREST = parameterized by design; no raw SQL from user input. |
| XSS in reviews/descriptions | Render rich text through sanitizer; React escapes by default; strict JSON schema for page blocks. |
| Image upload abuse (admin) | Storage bucket policy: admin-only writes, 5 MB limit, MIME allow-list (jpg/png/webp), bucket is public-read so CDN serves it. |
| Credential stuffing / bot signups | Supabase Auth rate limits + email OTP/magic-link only + optional hCaptcha on signup. |
| Bruteforcing checkout / scraping | Middleware rate limiting per-IP (Upstash Redis or Supabase edge) on `/api/*` and Server Actions. |
| Secrets leak | `.env*` gitignored; only `NEXT_PUBLIC_*` values in the bundle; service-role used exclusively in server-only files. |
| CSRF | Next.js Server Actions have built-in origin checks; no cookie-based state-changing REST routes. |
| Supply chain / npm | Lockfile committed, `npm audit` in CI, pinned major versions. |
| Data loss | Supabase PITR / daily backups weekly check; `dump` script in repo. |
| PII leaks to logs | No card data ever touches our server (tokenized by gateway → we store only `payment_id`). Order emails masked in analytics. |

---

## 7. Payment Integration (configurable adapter, built LAST)

A thin interface so any gateway plugs in via env var — zero storefront changes:

```ts
// lib/payments/types.ts
interface PaymentProvider {
  id: "stripe" | "razorpay" | "paypal" | "cod";
  createCheckout(orderId: number, amount: number, opts): Promise<{ redirectUrl?: string; orderIdClient: string }>;
  verifyPayment(paymentId, orderIdClient, signature?): Promise<{ ok: boolean }>;
  handleWebhook(req): Promise<{ event_id: string; orderId: number; status: "paid" | "failed" }>;
}
```

- `lib/payments/stripe.ts` · `razorpay.ts` · `cod.ts` — registered in a factory keyed by `NEXT_PUBLIC_PAYMENT_PROVIDER`.
- Flow: `place order (status=pending) → gateway checkout → verify (server) → webhook confirms → status=paid → email`.
- COD = zero-config fallback so a store is sellable on day one even before a gateway is set up.
- Webhook route: `/api/webhooks/[provider]` — signature check first, idempotent via `webhook_events` table.

---

## 8. UI/UX — the "next level" conversion machine

Design principles: **sleek, minimal, fast, smooth** — motion only where it guides the eye.

### Design system
- Full token theming (light + dark mode via `next-themes`)
- Brand typography (variable fonts, `next/font` → zero layout shift)
- Consistent 8-pt spacing grid, generous whitespace, subtle glass borders, soft shadows
- Micro-interactions: hover card galleries, magnetic buttons, cart drawer slide, smooth page transitions, scroll-linked reveals (Motion)

### Storefront pages
1. **Home** — hero (split/editorial), marquee trust strip, featured collections, best sellers grid, "Why us" row, review wall, newsletter with strong CTA
2. **Shop / Collection** — sticky filter rail, instant sort, animated card hovers, skeletons, URL-state filters (shareable + SEO)
3. **Product** — sticky gallery (mobile swipe), variant selector, qty, **pinned sticky add-to-cart bar**, size guide, reviews, "pairs with", shipping estimator, urgency ("3 left in stock" — real data only)
4. **Cart drawer** (never a page) + slide-in from any page, free-shipping progress bar
5. **Checkout** — the conversion carot of `< 3 steps`, **guest checkout by default**, address autofill, order summary always visible, one prominent pay button
6. **Order success / track order** (by order no + email — no login needed)
7. Auth pages (magic link / email OTP — no passwords to forget), wishlist, account (orders, addresses)
8. **Admin `/admin`** — KPI cards (revenue, AOV, conversion), orders table with status pipeline, product CRUD with drag-image upload, review moderation, coupon manager

### Performance + SEO (this *is* UX)
- ISR + `Cache-Control` for product pages; `next/image` with Supabase image transforms for thumbnails
- Target: LCP < 2.0s, CLS < 0.05, Lighthouse ≥ 95 mobile
- Per-page metadata, OG images (`next/og`), `sitemap.xml`, `robots.ts`, JSON-LD `Product` schema with price + rating → **rich Google results = free conversion**
- Route-level error/empty states — no dead ends anywhere

### Conversion playbook (every item is a deliberate lever)
- Trust markers at every decision point: reviews with photos, "Secure checkout", "Easy 7-day returns", shipping/ETA near CTA
- Free-shipping progress bar in cart drawer, announcement bar with offer
- Persistent mini-cart badge with count animation
- Social proof: "X people bought this this week" (only from real data)
- Email capture popup with first-order coupon (frequency-capped)
- Empty cart → curated best sellers (never leave a page empty)

---

## 9. Repo Structure

```
├─ app/
│  ├─ (storefront)/ home, shop/[slug], product/[slug], checkout,
│  │                order/[id], wishlist, account/, legal pages
│  ├─ admin/        dashboard, orders, products, coupons, reviews, settings
│  ├─ api/          webhooks/[provider], health
│  └─ layout.tsx ← theme provider injected from store.config
├─ components/      ui/ (shadcn) · commerce/ (ProductCard, CartDrawer…)
│                   · layout/ (Header, Footer, AnnouncementBar) · motion/
├─ lib/             supabase/ (client, server, admin helpers)
│                   · payments/ (types, stripe, razorpay, cod)
│                   · cart, orders, money, validators (zod), rate-limit
├─ config/store.config.ts   ← THE client file
├─ supabase/migrations/     ← THE schema (identical all clients)
├─ styles/tokens.css        ← maps config → CSS variables
└─ .env.example
```

---

## 10. Build Phases

| Phase | Scope | Status |
|---|---|---|
| **P0 — Foundation** | Next.js + Tailwind + shadcn + Supabase client wiring, store.config engine, dark mode, layout skeleton | 🚧 **START HERE** |
| **P1 — Storefront UI (front-end only)** | Full design system, Home, Shop, PDP, cart drawer, wishlist — **mock data, no DB yet** | next |
| **P2 — Database + real data** | Run migrations on Supabase, seed, connect storefront RL to real tables, auth | ❌ |
| **P3 — Admin** | Products/orders/coupons/reviews CRUD + image uploads to Storage | ❌ |
| **P4 — Checkout + Orders** | Cart → checkout → order creation (COD), order tracking, emails | ❌ |
| **P5 — Payments adapter** | Stripe / Razorpay / PayPal behind the interface + webhooks | ❌ last |
| **P6 — Hardening + launch kit** | Rate limits, CSP headers, Lighthouse pass, OG/sitemap, `.env.example`, **client-onboarding README** (how to spin up a new client in 30 min) | ❌ |

**We start with P0 + P1 only** (pure front-end, mock data) so the design/UX gets judged on pixels before touching the backend.

---

## 11. Open Decisions (answer before P1 kickoff)

1. **Theme system depth** — config-file rebrand (recommended) vs. full admin UI theme editor later?
2. First reference store to design against (fashion? electronics? skincare?) — pick one so mock data has personality.
3. Home-market first gateway: **Razorpay (IN/UP)** or **Stripe (global)**?
4. Multi-currency needed, or one currency per store?
5. Email provider for transactional mail: Resend (recommended) vs Loops?

---

*Living document — every phase completion appends a dated changelog at the bottom.*
