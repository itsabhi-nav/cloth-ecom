"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Product Gallery:
 * - Mobile: Horizontal snap-scroll strip with dots indicator
 * - Desktop: Sticky large image with vertical thumbnail strip on the side
 */
export function ProductGallery({ product }: { product: Product }) {
  const items = product.images;
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setActive((prev) => (prev - 1 + items.length) % items.length);
      if (e.key === "ArrowRight") setActive((prev) => (prev + 1) % items.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  // Touch handling for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      setActive((prev) => (diff > 0 ? (prev + 1) % items.length : (prev - 1 + items.length) % items.length));
    }
    setTouchStart(null);
  };

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      {/* Mobile: Horizontal snap scroll strip */}
      <div
        ref={mainImageRef}
        className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto lg:hidden pb-4"
        onScroll={(e) => {
          const el = e.currentTarget;
          setActive(Math.round(el.scrollLeft / el.clientWidth));
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="bg-card relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt={`${product.name} — view ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>

      {/* Mobile dots indicator */}
      {items.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5 lg:hidden">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-6 bg-ink" : "w-1.5 bg-line hover:bg-ink/50"
              )}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}

        {/* Desktop: Large sticky image + vertical thumbnail strip */}
      <div className="hidden lg:block">
        <div className="flex gap-6">
          {/* Thumbnail strip */}
          <div className="flex w-20 shrink-0 flex-col gap-3">
            {items.map((src, i) => (
              <button
                key={`${src}-${i}`}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative aspect-square w-full overflow-hidden rounded-xl border transition-all duration-300",
                  i === active ? "border-ink ring-2 ring-accent/20" : "border-line opacity-50 hover:opacity-100 hover:border-ink/50"
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1">
            <div className="bg-card relative aspect-[4/5] max-h-[80vh] w-full overflow-hidden rounded-2xl">
              <Image
                src={items[active]}
                alt={`${product.name} — view ${active + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}