import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  BadgeIndianRupee,
  Check,
  Flame,
  Headphones,
  Heart,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
  Undo2,
} from "lucide-react";
import { store } from "@/config/store.config";
import {
  categories,
  catProductCount,
  catStartingPrice,
  getJustDropped,
  products,
  reviews,
} from "@/lib/data/catalog";
import {
  craftPoints,
  deal,
  dealProduct,
  edits,
  faqs,
  homeImages,
  lookbook,
  newsletterPerks,
  press,
  sale,
  stats,
} from "@/lib/data/home";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/motion/reveal";
import { Glow, Pill, SectionHeading, Stars } from "@/components/home/shared";
import {
  BestSellerTabs,
  CopyCode,
  Countdown,
  DealAddButton,
  FaqAccordion,
  NewsletterForm,
  StatCounter,
} from "@/components/home/interactive";
import { CraftSpotlight } from "./craft-spotlight";
import { EditorialBanner as EditorialBannerNew } from "./editorial-banner";
import { OfferReveal } from "./offer-reveal";
import { VideoShowcase } from "./video-showcase";
import { cn, formatMoney, initial } from "@/lib/utils";

/* ================================================================== */
/*  TRUST STRIP                                                        */
/* ================================================================== */
const trustItems = [
  { icon: Truck, title: "Free express shipping", sub: `On orders over ${formatMoney(store.shipping.freeOver)}` },
  { icon: BadgeIndianRupee, title: "COD available", sub: "Pay when it arrives" },
  { icon: Undo2, title: "7-day easy returns", sub: "Free pickup, no forms" },
  { icon: ShieldCheck, title: "Secure payments", sub: "UPI · Cards · Netbanking" },
];

export function TrustStrip() {
  return (
    <div className="relative z-20 mx-auto -mt-8 max-w-6xl px-4 sm:px-6 lg:-mt-16 lg:px-8">
      <Reveal y={12}>
        <div className="bg-line border-line grid grid-cols-2 gap-px overflow-hidden rounded-2xl border shadow-lg lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="bg-card flex items-center gap-3 px-5 py-5 sm:px-6 sm:py-6"
            >
              <span className="bg-accent/10 text-accent grid size-10 shrink-0 place-items-center rounded-full">
                <item.icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-bold text-ink">{item.title}</span>
                <span className="text-soft block text-[11px] leading-tight">{item.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ================================================================== */
/*  MARQUEE                                                            */
/* ================================================================== */
const marqueeItems = [
  "Free express shipping over ₹1,499",
  "COD available",
  "7-day easy returns",
  "300-piece limited runs",
  "Premium organic fabrics",
  "Repairs for a full year",
];

export function Marquee() {
  return (
    <div className="bg-ink text-bg relative mt-10 overflow-hidden py-4 lg:mt-14">
      <div className="animate-marquee hover:[animation-play-state:paused] flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center" aria-hidden={half === 1}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center px-8 text-[13px] font-medium tracking-[0.1em] whitespace-nowrap uppercase opacity-90"
              >
                {item}
                <span className="bg-accent ml-6 size-1.5 rotate-45 rounded-[1px]" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  CATEGORY BENTO                                                     */
/* ================================================================== */
const catImage = (slug: string) =>
  slug === "women"
    ? homeImages.catWomen
    : slug === "men"
      ? homeImages.catMen
      : homeImages.catAccessories;

const catSpans = [
  "sm:col-span-2 lg:row-span-2",
  "sm:col-span-2",
  "",
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-24">
      <SectionHeading
        eyebrow="Browse"
        title="Find your uniform"
        sub="Three departments, one point of view. Built to mix, made to last."
        action={{ label: "Shop everything", href: "/shop" }}
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:auto-rows-[240px] lg:grid-cols-4 lg:gap-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 0.06} className={cn(catSpans[i], "h-full")}>
            <Link
              href={`/shop?c=${cat.slug}`}
              className="group bg-card relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl lg:min-h-0"
            >
              <Image
                src={catImage(cat.slug)}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
              <div className="relative z-10 flex items-start justify-between p-5 sm:p-6">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                  0{i + 1} / {cat.name}
                </span>
                <span className="grid size-9 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <div className="relative z-10 p-5 sm:p-6">
                <p className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {cat.name}
                </p>
                <p className="mt-1 text-[11.5px] text-white/65">
                  From {formatMoney(catStartingPrice(cat.slug))} · {catProductCount(cat.slug)} pieces
                </p>
              </div>
            </Link>
          </Reveal>
        ))}

        <Reveal delay={0.2} className="h-full">
          <Link
            href="/shop"
            className="group bg-ink text-bg relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl p-5 sm:p-6 lg:min-h-0"
          >
            <Glow className="bg-accent/45 -top-20 -right-16 size-52" />
            <div className="relative z-10">
              <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[9.5px] font-bold tracking-[0.18em] text-white/60 uppercase">
                Full collection
              </span>
            </div>
            <div className="relative z-10">
              <p className="font-display text-2xl leading-tight font-bold">
                The full
                <br />
                edit
              </p>
              <p className="mt-1 text-[11.5px] text-white/50">Every piece, one page</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-white">
                Shop all
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  JUST DROPPED                                                       */
/* ================================================================== */
export function JustDropped() {
  const items = getJustDropped(3);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8 lg:pt-24">
      <SectionHeading
        eyebrow="Fresh this week"
        title="Just dropped"
        sub="Limited quantities. Once it sells out, it joins the archive."
        action={{ label: "See everything new", href: "/shop" }}
      />

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}

        <Reveal delay={0.18}>
          <Link
            href="/shop"
            className="group bg-ink text-bg relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl p-5"
          >
            <Glow className="bg-accent/40 -top-16 -right-16 size-48" />
            <span className="relative z-10 text-[9.5px] font-bold tracking-[0.2em] text-white/45 uppercase">
              Dropping every Friday
            </span>
            <div className="relative z-10">
              <p className="font-display text-[22px] leading-tight font-bold">
                Never miss
                <br />a drop.
              </p>
              <p className="mt-1 text-[11px] text-white/50">New pieces land weekly.</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-semibold">
                Shop new in
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  OFFER BANNER                                                       */
/* ================================================================== */
export function OfferBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grain bg-ink text-bg relative overflow-hidden rounded-[2rem]">
          <Glow className="bg-accent/45 -top-28 -right-24 size-[440px]" />
          <Glow className="bg-accent/20 -bottom-32 left-1/4 size-[320px]" />

          <div className="relative z-10 grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <Pill invert>
                <Sparkles className="size-3" />
                Mid-season sale · live now
              </Pill>

              <h2 className="font-display mt-5 text-[34px] leading-[1.02] font-bold tracking-tight text-balance sm:text-5xl lg:text-[52px]">
                Up to <span className="text-accent">{sale.percent}% off</span>
                <br />
                the pieces you
                <br className="hidden sm:block" /> actually wear.
              </h2>

              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/60">
                60+ styles across women, men and accessories. Same fabrics, same small
                batches — just a much better number.
              </p>

              <div className="mt-7">
                <p className="mb-2 text-[9.5px] font-bold tracking-[0.2em] text-white/40 uppercase">
                  Sale ends in
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  <Countdown to={sale.endsAt || undefined} />
                  <CopyCode code={sale.code} />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
                <Link
                  href="/shop"
                  className="group text-ink inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[13.5px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:scale-[0.98]"
                >
                  Shop the sale
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <p className="max-w-[220px] text-[10.5px] leading-snug text-white/35">{sale.note}</p>
              </div>
            </div>

            <div className="relative min-h-[300px] lg:min-h-[540px]">
              <Image
                src={homeImages.offer}
                alt="Mid-season sale campaign"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/10 lg:to-transparent" />
              <div className="absolute right-5 top-5 grid size-24 rotate-[-8deg] place-items-center rounded-full bg-accent text-center text-white shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)] sm:right-7 sm:top-7">
                <div>
                  <span className="font-display block text-[26px] leading-none font-bold">
                    {sale.percent}%
                  </span>
                  <span className="mt-1 block text-[8.5px] font-bold tracking-[0.22em] uppercase">
                    off
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/15 bg-black/30 px-4 py-3 backdrop-blur-md lg:bottom-7 lg:left-7">
                <p className="text-[9px] font-bold tracking-[0.2em] text-white/45 uppercase">Ends this week</p>
                <p className="font-display mt-0.5 text-[15px] font-semibold text-white">
                  {sale.code} · auto-applied
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  SHOP BY MOOD                                                       */
/* ================================================================== */
export function EditTiles() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Shop by mood"
        title="One wardrobe, four lives"
        sub="Start from how you actually live, not from a category tree."
        action={{ label: "All collections", href: "/shop" }}
      />

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {edits.map((edit, i) => (
          <Reveal key={edit.title} delay={i * 0.06} className="h-full">
            <Link
              href={edit.href}
              className="group bg-card relative block aspect-[3/4] h-full overflow-hidden rounded-2xl"
            >
              <Image
                src={edit.image}
                alt={edit.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 text-[10px] font-bold tracking-[0.2em] text-white/55 uppercase">
                0{i + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-[17px] font-bold tracking-tight text-white">
                  {edit.title}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/60">{edit.copy}</p>
                <span className="mt-3 inline-flex translate-y-1 items-center gap-1 text-[11px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Shop the edit
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  BEST SELLERS                                                       */
/* ================================================================== */
export function BestSellers() {
  const ranked = [...products].sort(
    (a, b) => Number(b.is_featured) - Number(a.is_featured) || b.rating_count - a.rating_count
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Loved right now"
        title="Best sellers"
        sub="The pieces our customers keep coming back for — and reordering in a second colour."
        action={{ label: "Shop all", href: "/shop" }}
      />
      <BestSellerTabs
        products={ranked}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />
    </section>
  );
}

/* ================================================================== */
/*  DEAL OF THE DAY                                                    */
/* ================================================================== */
export function DealOfDay() {
  const p = dealProduct;
  const discount = p.compare_at_price
    ? Math.round((1 - p.price / p.compare_at_price) * 100)
    : 0;
  const save = p.compare_at_price ? p.compare_at_price - p.price : 0;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="border-line bg-card grid overflow-hidden rounded-[2rem] border lg:grid-cols-[0.92fr_1.08fr]">
          {/* visual */}
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <Image
              src={homeImages.deal}
              alt={p.name}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />

            <span className="text-ink absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase">
              <Flame className="size-3" />
              Deal of the day
            </span>

            {discount > 0 && (
              <div className="border-bg bg-ink text-bg absolute right-5 top-5 grid size-20 rotate-[6deg] place-items-center rounded-full border-[3px] text-center shadow-xl">
                <div>
                  <span className="font-display block text-xl leading-none font-bold">−{discount}%</span>
                  <span className="mt-1 block text-[8px] font-bold tracking-[0.2em] uppercase text-white/50">
                    today
                  </span>
                </div>
              </div>
            )}

            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 backdrop-blur-md">
              <Stars n={5} size="size-3" />
              <span className="text-[10.5px] font-semibold text-white">
                {p.rating_avg} · {p.rating_count} reviews
              </span>
            </div>
          </div>

          {/* content */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Pill>
                <Flame className="text-accent size-3" />
                Today only
              </Pill>
              <Countdown compact dark={false} />
            </div>

            <h2 className="font-display mt-4 text-[30px] leading-[1.05] font-bold tracking-tight sm:text-4xl">
              {p.name}
            </h2>
            <p className="text-soft mt-2 max-w-md text-[13.5px] leading-relaxed">{p.short_desc}</p>

            <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
              <span className="font-display text-[34px] leading-none font-bold tracking-tight">
                {formatMoney(p.price)}
              </span>
              {p.compare_at_price && (
                <s className="text-soft/80 pb-0.5 text-[15px]">{formatMoney(p.compare_at_price)}</s>
              )}
              {save > 0 && (
                <span className="text-accent bg-accent/10 mb-0.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold">
                  Save {formatMoney(save)}
                </span>
              )}
            </div>

            <div className="border-line bg-bg mt-5 rounded-2xl border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11.5px] font-semibold">
                <span className="text-accent flex items-center gap-1.5">
                  <Flame className="size-3.5" />
                  Selling fast
                </span>
                <span className="text-soft">{deal.claimed}% claimed</span>
              </div>
              <div className="bg-line relative mt-2 h-2 overflow-hidden rounded-full">
                <div
                  className="bg-accent relative h-full overflow-hidden rounded-full"
                  style={{ width: `${deal.claimed}%` }}
                >
                  <span className="shine absolute inset-0 block" />
                </div>
              </div>
              <p className="text-soft mt-2 text-[11px]">
                Only <span className="text-accent font-semibold">{deal.left} left</span> in the most-loved sizes
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <DealAddButton product={p} />
              <Link
                href={`/product/${p.slug}`}
                className="border-line hover:border-ink/30 inline-flex h-[52px] items-center gap-2 rounded-full border px-6 text-[13.5px] font-semibold transition-colors"
              >
                View details
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <p className="text-soft mt-4 flex items-start gap-1.5 text-[11px] leading-relaxed">
              <Sparkles className="text-accent mt-0.5 size-3.5 shrink-0" />
              {deal.bundle}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  WHY AUR                                                            */
/* ================================================================== */
export function Craft() {
  return (
    <section className="bg-ink text-bg relative mt-24 overflow-hidden py-20 sm:py-24 lg:py-28">
      <Glow className="bg-accent/30 -left-24 top-0 size-[380px]" />
      <Glow className="bg-accent/20 -right-24 bottom-0 size-[320px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:px-8">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src={homeImages.craft}
              alt="Inside the AUR studio"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-black/30 p-4 backdrop-blur-md">
              <p className="font-display text-3xl leading-none font-bold">300</p>
              <p className="mt-1 text-[11px] text-white/60">
                pieces per style. Then it is gone.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            invert
            eyebrow="Why AUR"
            title={
              <>
                Built slow.
                <br />
                Worn hard.
              </>
            }
            sub="We make fewer things, better. Here is what that actually means — no vague promises, just the way the clothes are made."
          />

          <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {craftPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.06}>
                <div>
                  <span className="font-display text-accent text-[11px] font-bold tracking-[0.2em]">
                    0{i + 1}
                  </span>
                  <p className="font-display mt-1.5 text-[16px] font-semibold text-white">
                    {point.title}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-white/55">{point.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/about"
              className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Read our story
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  STATS                                                              */
/* ================================================================== */
export function StatsBand() {
  return (
    <section
      aria-label="AUR by the numbers"
      className="relative z-10 mx-auto -mt-10 max-w-6xl px-4 sm:px-6 lg:-mt-12"
    >
      <Reveal>
        <div className="bg-line border-line grid grid-cols-2 gap-px overflow-hidden rounded-3xl border shadow-[0_30px_80px_-45px_rgba(0,0,0,0.5)] lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card flex flex-col items-center gap-1 px-4 py-7 text-center">
              <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                <StatCounter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </p>
              <p className="text-soft text-[10.5px] font-semibold tracking-[0.14em] uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  LOOKBOOK                                                           */
/* ================================================================== */
export function Lookbook() {
  return (
    <section id="lookbook" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="#AURinTheWild"
        title="Worn in the wild"
        sub="Real customers, real fits, real light. Tag us and you might land here next."
        action={{ label: "Shop the looks", href: "/shop" }}
      />

      <div className="mt-8 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] lg:auto-rows-[215px] lg:grid-cols-4 lg:gap-4">
        {lookbook.map((look, i) => (
          <Reveal key={look.handle + i} delay={i * 0.05} className={look.span}>
            <Link
              href="/shop"
              className="group bg-card relative block h-full w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={look.image}
                alt={`${look.handle} wearing AUR`}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-white">{look.handle}</p>
                  <p className="truncate text-[10.5px] text-white/60">{look.caption}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-white/70">
                  <Heart className="size-3 fill-white/70" />
                  {look.likes}
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Link
          href="/shop"
          className="group border-line bg-card hover:border-ink/25 inline-flex h-11 items-center gap-2 rounded-full border px-5 text-[12px] font-semibold transition-colors"
        >
          <AtSign className="text-accent size-3.5" />
          Tag @aur.studio to be featured
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  PRESS                                                              */
/* ================================================================== */
export function PressStrip() {
  return (
    <section className="border-line mx-auto mt-16 max-w-7xl border-y px-4 py-7 sm:px-6 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <p className="text-soft/70 text-[9.5px] font-bold tracking-[0.24em] uppercase">
            As featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {press.map((name) => (
              <span
                key={name}
                className="font-display hover:text-ink text-lg font-bold tracking-tight opacity-30 transition-opacity hover:opacity-100 sm:text-xl"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
/*  EDITORIAL                                                          */
/* ================================================================== */
export { EditorialBannerNew as EditorialBanner };

/* ================================================================== */
/*  CRAFT SPOTLIGHT                                                    */
/* ================================================================== */
export { CraftSpotlight };

/* ================================================================== */
/*  OFFER REVEAL                                                       */
/* ================================================================== */
export { OfferReveal };

/* ================================================================== */
/*  VIDEO SHOWCASE                                                     */
/* ================================================================== */
export { VideoShowcase };

/* ================================================================== */
/*  REVIEWS                                                            */
/* ================================================================== */
const ratingDist = [78, 16, 5, 1, 0];

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl pt-24 lg:px-8">
      <div className="px-4 sm:px-6 lg:px-0">
        <SectionHeading
          eyebrow="Social proof"
          title="Worn. Verified. Reordered."
          sub="No paid placements, no stock photos of smiling strangers. Just what landed and what held up."
        />
      </div>

      <div className="mt-8 grid gap-4 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-0">
        <Reveal className="h-full">
          <div className="bg-card border-line flex h-full flex-col justify-between rounded-3xl border p-7 sm:p-8">
            <div>
              <p className="font-display text-[72px] leading-none font-bold tracking-tight">
                4.8
                <span className="text-soft/40 text-3xl font-semibold">/5</span>
              </p>
              <Stars n={5} size="size-4" className="mt-3" />
              <p className="text-soft mt-2 text-[13px]">
                Based on <span className="text-ink font-semibold">1,543</span> verified reviews
              </p>
            </div>

            <div className="mt-6 space-y-1.5">
              {ratingDist.map((pct, i) => (
                <div key={i} className="flex items-center gap-3 text-[10.5px]">
                  <span className="text-soft w-7 text-right">{5 - i}★</span>
                  <div className="bg-line h-2 flex-1 overflow-hidden rounded-full">
                    <div className="bg-ink h-full rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-soft w-8 tabular-nums">{pct}%</span>
                </div>
              ))}
            </div>

            <div className="bg-bg text-soft mt-6 flex items-center gap-2 rounded-2xl p-3 text-[11.5px]">
              <BadgeCheck className="text-accent size-4 shrink-0" />
              94% of buyers rate us five stars
            </div>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06} className="h-full">
              <figure className="bg-card border-line flex h-full flex-col rounded-2xl border p-5">
                <div className="flex items-center justify-between">
                  <Stars n={r.rating} />
                  <Quote className="text-accent/25 size-4" />
                </div>
                <blockquote className="text-ink/85 mt-3 flex-1 text-[13px] leading-relaxed">
                  “{r.text}”
                </blockquote>
                <figcaption className="border-line mt-4 flex items-center gap-2.5 border-t pt-3.5">
                  <span className="bg-ink text-bg font-display grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                    {initial(r.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold">
                      {r.name} · {r.city}
                    </p>
                    <p className="text-soft flex items-center gap-1 truncate text-[10px]">
                      <BadgeCheck className="size-3 shrink-0 text-emerald-500" />
                      Verified · {r.item}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FAQ                                                                */
/* ================================================================== */
export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="text-soft mt-4 text-base">
          Shipping, sizing, returns, and how we actually make the clothes.
        </p>
      </div>

      <Reveal delay={0.1}>
        <FaqAccordion items={faqs} />
      </Reveal>

      <div className="mt-12 flex justify-center">
        <Link
          href="/contact"
          className="group border-line bg-card hover:border-ink/20 inline-flex items-center gap-3 rounded-full border px-6 py-3 transition-colors"
        >
          <span className="text-soft text-[13px] font-semibold">Still stuck?</span>
          <span className="text-ink text-[13px] font-semibold flex items-center gap-1.5">
            Contact support <ArrowRight className="size-4" />
          </span>
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

/* ================================================================== */
/*  NEWSLETTER                                                         */
/* ================================================================== */
export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 pb-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="grain bg-ink text-bg relative overflow-hidden rounded-[2rem] p-7 sm:p-12 lg:p-16">
          <Glow className="bg-accent/40 -top-28 -right-24 size-[400px]" />
          <Glow className="bg-accent/20 -bottom-28 -left-20 size-[300px]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <Pill invert>
                <Sparkles className="size-3" />
                First order perk
              </Pill>
              <h2 className="font-display mt-5 text-[32px] leading-[1.02] font-bold tracking-tight text-balance sm:text-4xl lg:text-[46px]">
                ₹300 off, and first dibs
                <br className="hidden sm:block" /> on every drop.
              </h2>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/60">
                Join 12,000+ people who get one honest email a week — restocks, new fabrics,
                and the occasional studio note. No spam, ever.
              </p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {newsletterPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-[12.5px] text-white/70">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-300" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur sm:p-6">
              <p className="font-display text-lg font-bold text-white">Get your code</p>
              <p className="mt-1 mb-4 text-[12px] text-white/45">
                Takes 8 seconds. Unsubscribe anytime.
              </p>
              <NewsletterForm />
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-[10px] text-white/40">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5" /> Secure
                </span>
                <span className="flex items-center gap-1.5">
                  <Headphones className="size-3.5" /> Real support
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="size-3.5" /> Fast shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
