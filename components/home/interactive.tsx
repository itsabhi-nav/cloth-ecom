"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/commerce/product-card";
import { useCart } from "@/lib/store/cart";
import { cn, formatMoney, initial } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  COUNTDOWN                                                          */
/* ------------------------------------------------------------------ */
const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({
  to,
  dark = true,
  compact = false,
}: {
  to?: string;
  dark?: boolean;
  compact?: boolean;
}) {
  const [left, setLeft] = useState<{ d: string; h: string; m: string; s: string } | null>(null);

  useEffect(() => {
    const target = (() => {
      if (to) {
        const parsed = Date.parse(to);
        if (!Number.isNaN(parsed) && parsed > Date.now()) return parsed;
      }
      // Rolling deadline: end of the day, two days out.
      const d = new Date();
      d.setHours(23, 59, 59, 0);
      d.setDate(d.getDate() + 2);
      return d.getTime();
    })();

    const tick = () => {
      const total = Math.max(0, Math.floor((target - Date.now()) / 1000));
      setLeft({
        d: pad(Math.floor(total / 86400)),
        h: pad(Math.floor((total % 86400) / 3600)),
        m: pad(Math.floor((total % 3600) / 60)),
        s: pad(total % 60),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [to]);

  const parts = [
    { label: "Days", value: left?.d },
    { label: "Hrs", value: left?.h },
    { label: "Min", value: left?.m },
    { label: "Sec", value: left?.s },
  ];

  return (
    <div
      className={cn("flex items-center", compact ? "gap-1.5" : "gap-2 sm:gap-2.5")}
      role="timer"
      aria-label="Offer countdown"
    >
      {parts.map((p, i) => (
        <Fragment key={p.label}>
          <div
            className={cn(
              "flex flex-col items-center rounded-xl border text-center tabular-nums",
              compact ? "min-w-11 px-2 py-1.5" : "min-w-14 px-2.5 py-2 sm:min-w-16",
              dark
                ? "border-white/15 bg-white/[0.07] text-white backdrop-blur"
                : "border-line bg-card text-ink"
            )}
          >
            <span className={cn("font-display font-bold tracking-tight", compact ? "text-base" : "text-xl sm:text-2xl")}>
              {p.value ?? "--"}
            </span>
            <span
              className={cn(
                "text-[9px] font-semibold tracking-[0.18em] uppercase",
                dark ? "text-white/50" : "text-soft"
              )}
            >
              {p.label}
            </span>
          </div>
          {i < parts.length - 1 && (
            <span className={cn("text-sm", dark ? "text-white/30" : "text-soft/50")}>:</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ANIMATED STAT                                                      */
/* ------------------------------------------------------------------ */
export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const started = performance.now();
    const duration = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - started) / duration);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);

  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  BEST SELLER TABS                                                   */
/* ------------------------------------------------------------------ */
export function BestSellerTabs({
  products,
  categories,
}: {
  products: Product[];
  categories: { id: string; name: string }[];
}) {
  const [tab, setTab] = useState("all");
  const tabs = [{ id: "all", name: "All" }, ...categories];
  const list = (tab === "all" ? products : products.filter((p) => p.category_id === tab)).slice(0, 4);

  return (
    <div className="mt-8">
      <div
        className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        role="tablist"
        aria-label="Filter best sellers"
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
                active ? "text-bg" : "text-soft hover:text-ink"
              )}
            >
              {active && (
                <motion.span
                  layoutId="best-tab-pill"
                  className="bg-ink absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{t.name}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4"
      >
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ ACCORDION                                                      */
/* ------------------------------------------------------------------ */
export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-line border-t">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-line border-b">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="group flex w-full items-center justify-between gap-5 py-5 text-left"
            >
              <span className="font-display group-hover:text-accent text-[15.5px] font-semibold tracking-tight transition-colors sm:text-base">
                {item.q}
              </span>
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                  isOpen ? "bg-ink text-bg border-ink rotate-180" : "border-line text-soft"
                )}
              >
                <ChevronDown className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-soft max-w-2xl pb-6 pr-10 text-[14px] leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NEWSLETTER FORM                                                    */
/* ------------------------------------------------------------------ */
export function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-white/15 bg-white/[0.07] flex flex-col items-start gap-2 rounded-2xl border p-6 backdrop-blur"
      >
        <span className="grid size-10 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
          <Check className="size-5" />
        </span>
        <p className="font-display text-lg font-bold text-white">You&apos;re in.</p>
        <p className="text-[13.5px] leading-relaxed text-white/65">
          Your code is on its way to your inbox. First access to the next drop is now yours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="w-full"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/[0.07] p-1.5 backdrop-blur sm:flex-row sm:rounded-full">
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          className="placeholder:text-white/35 h-12 w-full rounded-full bg-transparent px-4 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        />
        <button
          type="submit"
          className="group hover:bg-white/90 inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-6 text-sm font-semibold text-black transition-all active:scale-[0.98]"
        >
          Claim ₹300
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-white/45">
        <Sparkles className="size-3" /> No spam. Unsubscribe in one tap.
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  ADD-TO-BAG (deal of the day)                                       */
/* ------------------------------------------------------------------ */
export function DealAddButton({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.stock_qty > 0) ?? product.variants[0];

  return (
    <button
      onClick={() => {
        add(product, variant.id);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
      className="group bg-ink text-bg hover:opacity-90 inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[14px] font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.99]"
    >
      {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
      {added ? "Added to bag" : `Add to bag · ${formatMoney(product.price)}`}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  COPY CODE                                                          */
/* ------------------------------------------------------------------ */
export function CopyCode({ code, dark = true }: { code: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
        } catch {
          /* clipboard blocked — the code is visible anyway */
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }}
      aria-label={`Copy discount code ${code}`}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full border border-dashed px-4 text-[12.5px] font-bold tracking-[0.14em] uppercase transition-colors",
        dark
          ? "border-white/30 bg-white/[0.06] text-white hover:bg-white/10"
          : "border-ink/25 bg-card text-ink hover:bg-ink/5"
      )}
    >
      {code}
      {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5 opacity-60" />}
      <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  LIVE SALES TICKER                                                  */
/* ------------------------------------------------------------------ */
export function LiveSales({
  items,
}: {
  items: readonly { name: string; city: string; item: string; mins: number }[];
}) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(() => setShow(true), 4500);
    const cycle = window.setInterval(() => setIndex((n) => (n + 1) % items.length), 8000);
    return () => {
      window.clearTimeout(showTimer);
      window.clearInterval(cycle);
    };
  }, [items.length]);

  if (closed) return null;
  const sale = items[index];

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-30 hidden sm:block">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="border-line bg-card/95 pointer-events-auto relative flex max-w-[330px] items-center gap-3 rounded-2xl border p-3 pr-9 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          >
            <button
              onClick={() => setClosed(true)}
              aria-label="Dismiss recent purchase"
              className="text-soft hover:text-ink absolute right-2 top-2 grid size-6 place-items-center rounded-full transition-colors"
            >
              <X className="size-3.5" />
            </button>
            <motion.span
              key={`${index}-avatar`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-ink text-bg font-display relative grid size-10 shrink-0 place-items-center rounded-full text-[11px] font-bold"
            >
              {initial(sale.name)}
              <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-400" />
            </motion.span>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="min-w-0"
            >
              <p className="truncate text-[12px] font-semibold">
                {sale.name} from {sale.city}
              </p>
              <p className="text-soft truncate text-[11px]">
                just bought <span className="text-ink font-medium">{sale.item}</span>
              </p>
              <p className="text-soft/80 mt-0.5 flex items-center gap-1 text-[10px]">
                <Star className="fill-accent text-accent size-2.5" /> Verified · {sale.mins} min ago
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
