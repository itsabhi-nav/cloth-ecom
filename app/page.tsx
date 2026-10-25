import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Star, Truck, Undo2 } from "lucide-react";
import { store } from "@/config/store.config";
import {
  catStartingPrice, categories, editorialImage, getFeatured, getJustDropped, heroImage, reviews,
} from "@/lib/data/catalog";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/motion/reveal";
import { ScrollCue } from "@/components/motion/scroll-cue";
import { cn, formatMoney } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  HERO — full-bleed editorial                                         */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[82svh] min-h-[540px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.03] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5" />

        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <Reveal y={16} delay={0.05}>
            <span className="border-white/25 inline-flex w-fit items-center gap-2 rounded-full border bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" />
              New season drop — live now
            </span>
          </Reveal>
          <Reveal delay={0.12} y={24}>
            <h1 className="font-display mt-5 max-w-3xl text-[44px] leading-[1.0] font-bold tracking-tight text-white sm:text-6xl lg:text-[84px]">
              Dress like you
              <br />
              mean it.
            </h1>
          </Reveal>
          <Reveal delay={0.2} y={20}>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-lg">
              Small-batch essentials in premium fabrics. Honest pricing. Nothing you do not need.
            </p>
          </Reveal>
          <Reveal delay={0.28} y={20}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="group hover:-translate-y-0.5 inline-flex h-[54px] items-center gap-2 rounded-full bg-white px-8 text-[15px] font-semibold text-black shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 active:scale-[0.98]"
              >
                Shop the collection
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/shop"
                className="hover:bg-white/15 inline-flex h-[54px] items-center gap-2 rounded-full border border-white/30 px-8 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors active:scale-[0.98]"
              >
                Explore lookbook
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.36} y={14}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-white/80">
              <span className="flex items-center gap-1.5"><BadgeCheck className="size-4" aria-hidden /> 4.8 rated by 1,500+ customers</span>
              <span className="flex items-center gap-1.5"><Truck className="size-4" aria-hidden /> Free express over {formatMoney(store.shipping.freeOver)}</span>
              <span className="flex items-center gap-1.5"><Undo2 className="size-4" aria-hidden /> 7-day returns</span>
            </div>
          </Reveal>
        </div>
        <ScrollCue />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MARQUEE                                                             */
/* ------------------------------------------------------------------ */
const marqueeItems = [
  "Free express shipping over ₹1,499", "COD available", "7-day easy returns",
  "Small-batch productions", "Premium organic fabrics", "Real human support",
];
function Marquee() {
  return (
    <div className="bg-ink text-bg overflow-hidden py-3.5">
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center px-6 text-[13px] font-semibold tracking-wide whitespace-nowrap">
                {item}
                <span className="bg-accent ml-4 size-1.5 rounded-full" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION HEADING                                                     */
/* ------------------------------------------------------------------ */
function SectionHeading({
  eyebrow, title, sub, action,
}: {
  eyebrow: string; title: string; sub?: string; action?: { label: string; href: string };
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-accent text-[12px] font-bold tracking-[0.18em] uppercase">{eyebrow}</p>
          <h2 className="font-display mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {sub && <p className="text-soft mt-2 max-w-md text-sm">{sub}</p>}
        </div>
        {action && (
          <Link
            href={action.href}
            className="group text-ink/70 hover:text-ink flex items-center gap-1.5 text-sm font-semibold"
          >
            {action.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </Link>
        )}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  CATEGORIES — editorial trio with real counts                        */
/* ------------------------------------------------------------------ */
const catCounts: Record<string, number> = { women: 132, men: 96, accessories: 54 };
function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Browse"
        title="Where to start"
        action={{ label: "View shop", href: "/shop" }}
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.08}>
            <Link
              href={`/shop?c=${cat.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-card"
            >
              <Image
                src={cat.image_url}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                <div>
                  <p className="font-display text-2xl font-bold tracking-tight text-white">{cat.name}</p>
                  <p className="text-sm text-white/70">From {formatMoney(catStartingPrice(cat.slug))}</p>
                </div>
                <span className="border-white/20 grid size-11 place-items-center rounded-full border bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-white group-hover:bg-white">
                  <ArrowRight className="size-5 text-white transition-colors group-hover:text-black" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  JUST DROPPED + BEST SELLERS                                         */
/* ------------------------------------------------------------------ */
function JustDropped() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Fresh this week"
        title="Just dropped"
        sub="Limited quantities. Once it sells out, it joins the archive."
      />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
        {getJustDropped(4).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Loved right now"
        title="Best sellers"
        action={{ label: "Shop all", href: "/shop" }}
      />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
        {getFeatured(8).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  STATS BAND                                                          */
/* ------------------------------------------------------------------ */
const stats = [
  { value: "12,400+", label: "orders shipped" },
  { value: "4.8/5", label: "average rating" },
  { value: "38 min", label: "avg. support reply" },
  { value: "92%", label: "would order again" },
];
function StatsBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="border-line grid grid-cols-2 gap-px overflow-hidden rounded-3xl border bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card flex flex-col items-center gap-1 px-4 py-8 text-center">
              <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{s.value}</p>
              <p className="text-soft text-[13px]">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  EDITORIAL BANNER                                                    */
/* ------------------------------------------------------------------ */
function EditorialBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="bg-card relative grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:order-1 lg:self-center">
            <p className="text-accent text-[12px] font-bold tracking-[0.18em] uppercase">The winter edit</p>
            <h2 className="font-display mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Heavyweight fabrics.<br />Lighten your decisions.
            </h2>
            <p className="text-soft mt-4 max-w-md text-[15px] leading-relaxed">
              We make 300 pieces per style, once. When they sell out, they are gone — no flash sales, no fake urgency, honestly.
            </p>
            <div className="mt-8">
              <Link
                href="/shop"
                className="group bg-ink text-bg hover:opacity-90 inline-flex h-12 items-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              >
                Shop the edit
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="relative min-h-[320px] lg:order-2 lg:min-h-[500px]">
            <Image
              src={editorialImage}
              alt="The winter edit"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SOCIAL PROOF — summary + real-feeling review wall                   */
/* ------------------------------------------------------------------ */
const ratingDist = [78, 16, 5, 1, 0]; // 5★ → 1★
const initial = (name: string) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

function StarRow({ n, size = "size-3.5" }: { n: number; size?: string }) {
  return (
    <span className="text-accent flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(size, i < n ? "fill-current" : "fill-line text-line")} />
      ))}
    </span>
  );
}

function Reviews() {
  return (
    <section className="mx-auto max-w-7xl pt-24 lg:px-8">
      <div className="px-4 sm:px-6 lg:px-0">
        <SectionHeading eyebrow="Social proof" title="Worn and verified" />
      </div>

      {/* Summary card */}
      <Reveal>
        <div className="bg-card border-line mt-8 grid items-center gap-8 rounded-3xl border p-7 sm:grid-cols-[auto_1fr] sm:p-9">
          <div className="flex items-center gap-5">
            <p className="font-display text-[64px] leading-none font-bold tracking-tight">4.8</p>
            <div>
              <StarRow n={5} size="size-4" />
              <p className="text-soft mt-2 text-[13px]">Based on <span className="text-ink font-semibold">1,543</span> verified reviews</p>
              <p className="text-soft text-[13px]">94% rate us 5 stars</p>
            </div>
          </div>
          <div className="space-y-1.5">
            {ratingDist.map((pct, i) => (
              <div key={i} className="flex items-center gap-3 text-[11px]">
                <span className="text-soft w-8 text-right">{5 - i}★</span>
                <div className="bg-line h-2 flex-1 overflow-hidden rounded-full">
                  <div className="bg-ink h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-soft w-9 tabular-nums">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Review cards — snap row on mobile, 4-up on desktop */}
      <Reveal>
        <div className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="bg-card border-line flex w-[86%] snap-start flex-col rounded-2xl border p-5 sm:w-[340px] lg:w-auto"
            >
              <div className="flex items-center justify-between gap-2">
                <StarRow n={r.rating} />
                <span className="text-soft shrink-0 text-[11px]">{r.date}</span>
              </div>
              <blockquote className="text-ink/85 mt-3 flex-1 text-[14px] leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="border-line mt-4 flex items-center gap-3 border-t pt-4">
                <span className="bg-ink text-bg font-display grid size-9 shrink-0 place-items-center rounded-full text-[12px] font-bold tracking-wide">
                  {initial(r.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold">{r.name} · {r.city}</p>
                  <p className="text-soft truncate text-[11px]">Purchased: {r.item}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  NEWSLETTER                                                          */
/* ------------------------------------------------------------------ */
function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="bg-ink text-bg relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12 lg:py-20">
          <div className="bg-accent pointer-events-none absolute -top-24 -right-24 size-72 rounded-full blur-[100px] opacity-25" />
          <div className="bg-accent pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full blur-[100px] opacity-20" />
          <div className="relative mx-auto max-w-md">
            <p className="text-[12px] font-bold tracking-[0.18em] uppercase opacity-70">First order perk</p>
            <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Get ₹300 off your first order
            </h2>
            <p className="mt-3 text-[15px] opacity-75">
              Drops, restocks and one honest email a week. No spam, ever.
            </p>
            <form className="mx-auto mt-7 flex max-w-md gap-2 rounded-full bg-white/10 p-1.5 backdrop-blur">
              <input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                className="placeholder:text-white/40 h-11 w-full rounded-full bg-transparent px-4 text-sm text-white outline-none"
              />
              <button type="submit" className="group hover:opacity-90 inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-semibold text-black transition-opacity active:scale-[0.98]">
                Join
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <JustDropped />
      <BestSellers />
      <StatsBand />
      <EditorialBanner />
      <Reviews />
      <Newsletter />
    </>
  );
}
