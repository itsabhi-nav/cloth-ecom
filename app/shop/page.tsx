import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, PackageOpen } from "lucide-react";
import { categories, products, sortFns } from "@/lib/data/catalog";
import { ProductCard } from "@/components/commerce/product-card";
import { CategoryChips, SortSelect } from "@/components/commerce/filter-bar";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Shop",
  description: "The full collection — essentials made in small batches, premium fabrics, honest pricing.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const catParam = typeof sp.c === "string" ? sp.c : undefined;
  const sortParam = typeof sp.sort === "string" && sp.sort in sortFns ? sp.sort : "featured";

  const filtered = products
    .filter((p) => (catParam ? categories.find((c) => c.slug === catParam)?.id === p.category_id : true))
    .sort(sortFns[sortParam]);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-24 sm:px-6 lg:px-8">
      {/* Breadcrumb + heading */}
      <Reveal>
        <p className="text-soft text-xs font-semibold tracking-[0.16em] uppercase">
          <Link href="/" className="hover:text-ink">Home</Link>
          {" \u2192 "}
          <span className="text-ink">{catParam ? categories.find((c) => c.slug === catParam)?.name : "Shop All"}</span>
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4 pt-3">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {catParam ? categories.find((c) => c.slug === catParam)?.name : "Shop all"}
            </h1>
            <p className="text-soft mt-2 text-sm">
              {filtered.length} pieces · made in small batches, restocked rarely
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <CategoryChips
          categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
          active={catParam}
          sort={sortParam}
        />
        <SortSelect value={sortParam} />
      </div>

      <div className="h-px w-full bg-line mt-6" />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
          <div className="bg-card grid size-16 place-items-center rounded-full border border-line">
            <PackageOpen className="text-soft size-6" />
          </div>
          <p className="font-display text-lg font-semibold">Nothing here yet</p>
          <p className="text-soft max-w-xs text-sm">This collection is being restocked. Check back soon.</p>
          <Link href="/shop" className="bg-ink text-bg hover:opacity-90 mt-2 inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold transition-opacity">
            View everything
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
