"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Gallery: horizontal snap-scroll strip on mobile, sticky stacked editorial
 * column on desktop with jump-to thumbnails.
 */
export function ProductGallery({ product }: { product: Product }) {
  const items = product.images;
  const [active, setActive] = useState(0);

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      {/* Mobile: snap strip */}
      <div className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto lg:hidden" onScroll={(e) => {
        const el = e.currentTarget;
        setActive(Math.round(el.scrollLeft / el.clientWidth));
      }}>
        {items.map((src, i) => (
          <div key={src} className="bg-card relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={`${product.name} — view ${i + 1}`}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5 lg:hidden">
          {items.map((_, i) => (
            <span key={i} className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-5 bg-ink" : "w-1.5 bg-line")} />
          ))}
        </div>
      )}

      {/* Desktop: editorial stack + thumbnails */}
      <div className="hidden lg:block">
        <div className="flex gap-4">
          <div className="flex w-16 shrink-0 flex-col gap-3">
            {items.map((src, i) => (
              <button
                key={src}
                aria-label={`View image ${i + 1}`}
                onClick={() => document.getElementById(`pdp-img-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className={cn(
                  "bg-card relative aspect-square w-full overflow-hidden rounded-xl border transition-all duration-300",
                  i === active ? "border-ink" : "border-line opacity-70 hover:opacity-100"
                )}
              >
                <Image src={src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 space-y-4">
            {items.map((src, i) => (
              <div key={src} id={`pdp-img-${i}`} className="bg-card relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={`${product.name} — view ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
