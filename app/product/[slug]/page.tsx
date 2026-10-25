import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { getProduct, getRelated, products } from "@/lib/data/catalog";
import { ProductGallery } from "@/components/commerce/product-gallery";
import { ProductDetail } from "@/components/commerce/product-detail";
import { ProductCard } from "@/components/commerce/product-card";
import { Reveal } from "@/components/motion/reveal";
import { baseOpenGraph, baseTwitter } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.short_desc,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      url: `/product/${product.slug}`,
      title: product.name,
      description: product.short_desc,
      images: [{ url: product.images[0], alt: product.name }],
    },
    twitter: { ...baseTwitter, title: product.name, description: product.short_desc },
  };
}

/* ---------- Reviews ---------- */
function StarRow({ n }: { n: number }) {
  return (
    <span className="text-accent flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={i < n ? "size-3.5 fill-current" : "size-3.5 text-line fill-line"} />
      ))}
    </span>
  );
}

const reviewPool = [
  { author: "Ananya R.", city: "Mumbai", rating: 5, text: "Genuinely did not expect this quality at the price. Fabric is heavy in the good way and the fit is exactly as the size guide says." },
  { author: "Karthik S.", city: "Bengaluru", rating: 5, text: "Third purchase here. Delivery was quick and the packaging felt premium — this is how online shopping should feel." },
  { author: "Meera D.", city: "Delhi", rating: 4, text: "Beautiful piece. Washed it twice already and nothing changed. Docking one star only because I wanted more colours." },
  { author: "Devansh T.", city: "Pune", rating: 5, text: "Ordered two after the first one. Support responded in minutes when I needed a size swap." },
];

function Reviews({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const rows = [82, 14, 4, 0, 0];
  return (
    <section id="reviews" className="border-line mx-auto max-w-7xl border-t px-4 pt-14 pb-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
        {/* Summary */}
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Reviews</h2>
          <div className="mt-4 flex items-end gap-3">
            <p className="font-display text-5xl font-bold">{product.rating_avg}</p>
            <div className="pb-1.5">
              <StarRow n={Math.round(product.rating_avg)} />
              <p className="text-soft mt-1 text-xs">{product.rating_count} verified reviews</p>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {rows.map((pct, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs">
                <span className="text-soft w-6">{5 - i}★</span>
                <div className="bg-line h-1.5 flex-1 overflow-hidden rounded-full">
                  <div className="bg-ink h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-soft w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
        {/* Individual reviews */}
        <div className="grid gap-4 sm:grid-cols-2">
          {reviewPool.map((r) => (
            <figure key={r.author} className="bg-card h-fit rounded-2xl border border-line p-5">
              <div className="flex items-center justify-between">
                <StarRow n={r.rating} />
                <span className="border-line text-soft flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold">
                  <Star className="size-2.5 fill-current" /> Verified
                </span>
              </div>
              <blockquote className="text-ink/85 mt-3 text-[14px] leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="text-soft mt-3 text-xs">
                <span className="text-ink font-semibold">{r.author}</span> · {r.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = getRelated(product, 4);

  return (
    <>
      {/* Breadcrumb */}
      <div className="text-soft mx-auto max-w-7xl px-4 pt-6 text-xs font-semibold tracking-[0.14em] uppercase sm:px-6 lg:px-8">
        <Link href="/" className="hover:text-ink">Home</Link>
        {" \u2192 "}
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        {" \u2192 "}
        <span className="text-ink">{product.name}</span>
      </div>

      <section className="mx-auto max-w-7xl px-4 pt-5 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_460px] lg:gap-14">
          <ProductGallery product={product} />
          <ProductDetail product={product} />
        </div>
      </section>

      <Reviews product={product} />

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Pairs well with</h2>
            <Link href="/shop" className="text-soft hover:text-ink text-sm font-semibold">
              View all
            </Link>
          </div>
        </Reveal>
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
