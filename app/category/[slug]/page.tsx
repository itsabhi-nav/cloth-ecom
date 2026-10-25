import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageOpen } from "lucide-react";
import { store } from "@/config/store.config";
import {
  catDescriptions, catProductCount, catStartingPrice, categories, products, sortFns,
  subBySku, getSubcats, subcatCount,
} from "@/lib/data/catalog";
import { ProductCard } from "@/components/commerce/product-card";
import { SortSelect } from "@/components/commerce/filter-bar";
import { Reveal } from "@/components/motion/reveal";
import { formatMoney } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} — collection`,
    description: catDescriptions[slug] ?? `${cat.name} collection at ${store.fullName}.`,
    openGraph: { images: [{ url: cat.image_url }] },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const subParam = typeof sp.s === "string" ? sp.s : undefined;
  const sortParam = typeof sp.sort === "string" && sp.sort in sortFns ? sp.sort : "featured";

  let list = products.filter((p) => p.category_id === cat.id);
  if (subParam) list = list.filter((p) => subBySku[p.sku] === subParam);
  list = [...list].sort(sortFns[sortParam]);

  const subHref = (s?: string) => {
    const q = new URLSearchParams();
    if (s) q.set("s", s);
    if (sortParam !== "featured") q.set("sort", sortParam);
    const qs = q.toString();
    return qs ? `/category/${cat.slug}?${qs}` : `/category/${cat.slug}`;
  };

  return (
    <>
      {/* Hero banner */}
      <div className="relative h-[46svh] min-h-[360px] w-full overflow-hidden">
        <Image src={cat.image_url} alt={cat.name} fill priority sizes="100vw" className="object-cover" />
        {/* Strong darkening so text stays legible on any crop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        {/* z-10: guaranteed above the overlays, on every viewport (painting order of
            absolute overlays vs normal-flow siblings broke this on mobile) */}
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl px-4 pb-9 sm:px-6 lg:px-8">
          <Reveal y={16}>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-white/80 uppercase">
              <Link href="/" className="underline-offset-4 hover:underline">Home</Link>
              {" \u2192 "}
              <span className="text-white">The {cat.name} edit</span>
            </p>
            <h1 className="font-display mt-3 text-[42px] leading-none font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {cat.name}
            </h1>
            <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/90">
              {catDescriptions[cat.slug]}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Sub-collections + sort */}
      <div className="mx-auto max-w-7xl px-4 pt-7 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <Link
              href={subHref()}
              className={cn(
                "flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-5 text-sm font-semibold transition-all duration-300",
                !subParam ? "bg-ink text-bg border-ink" : "border-line bg-card text-ink/75 hover:border-ink hover:text-ink"
              )}
            >
              All {cat.name}
              <span className={cn("tabular-nums text-xs font-bold", !subParam ? "opacity-60" : "text-accent opacity-100")}>
                {catProductCount(cat.slug)}
              </span>
            </Link>
            {getSubcats(cat.slug).map((s) => (
              <Link
                key={s}
                href={subHref(s)}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-5 text-sm font-semibold transition-all duration-300",
                  subParam === s
                    ? "bg-ink text-bg border-ink"
                    : "border-line bg-card text-ink/75 hover:border-ink hover:text-ink"
                )}
              >
                {s}
                <span className={cn("tabular-nums text-xs font-bold", subParam === s ? "opacity-60" : "text-accent opacity-100")}>
                  {subcatCount(cat.slug, s)}
                </span>
              </Link>
            ))}
          </div>
          <SortSelect value={sortParam} basePath={`/category/${cat.slug}`} query={{ s: subParam }} />
        </div>
        <div className="bg-line mt-5 h-px w-full" />
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="bg-card border-line grid size-16 place-items-center rounded-full border">
              <PackageOpen className="text-soft size-6" />
            </div>
            <p className="font-display text-lg font-semibold">This edit is restocking</p>
            <p className="text-soft max-w-xs text-sm">Small batches mean short gaps. Check back soon.</p>
            <Link href={subHref()} className="bg-ink text-bg hover:opacity-90 mt-2 inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold transition-opacity">
              View all {cat.name}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* SEO copy band */}
      <section className="border-line mx-auto max-w-7xl border-t px-4 py-14 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
            About our {cat.name.toLowerCase()} collection
          </h2>
          <p className="text-soft mt-4 max-w-3xl text-sm leading-relaxed">
            {catDescriptions[cat.slug]} Every piece is produced in a run of roughly 300 — enough to reach the people who
            want it, small enough to never be mass anything. Fabrics are chosen for a decade of wear, not a season of
            looks: heavyweight cottons, brushed fleece, Japanese selvedge, and full-grain leathers. Prices start at
            {` ${formatMoney(1499)}`} and everything ships express in 1–2 days to metros — free over {formatMoney(store.shipping.freeOver)}.
          </p>
          <p className="text-soft mt-3 max-w-3xl text-sm leading-relaxed">
            Not sure where to begin? Start with the <Link href="/shop" className="text-ink font-semibold underline underline-offset-4">full shop</Link>,
            or the best rated pieces in <Link href="/category/women" className="text-ink font-semibold underline underline-offset-4">Women</Link>
            {" "}<Link href="/category/men" className="text-ink font-semibold underline underline-offset-4">Men</Link>{" "}
            and <Link href="/category/accessories" className="text-ink font-semibold underline underline-offset-4">Accessories</Link>.
          </p>
        </Reveal>
      </section>
    </>
  );
}
