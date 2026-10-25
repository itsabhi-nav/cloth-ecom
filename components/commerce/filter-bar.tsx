"use client";

import { useRouter } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top rated" },
];

export function SortSelect({
  value,
  basePath = "/shop",
  query = {},
}: {
  value: string;
  basePath?: string;
  query?: Record<string, string | undefined>;
}) {
  const router = useRouter();

  return (
    <div className="border-line text-ink relative inline-flex h-11 items-center gap-2 rounded-full border bg-card pl-4 pr-2 text-[13px] font-semibold">
      <ArrowUpDown className="text-soft size-3.5" aria-hidden />
      <select
        aria-label="Sort products"
        value={value}
        onChange={(e) => {
          const sp = new URLSearchParams();
          Object.entries({ ...query, sort: e.target.value === "featured" ? undefined : e.target.value }).forEach(
            ([k, v]) => v && sp.set(k, v)
          );
          const qs = sp.toString();
          router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
        }}
        className="focus:outline-none appearance-none cursor-pointer pr-2 bg-transparent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Filter chip row — links keep filter state shareable & SEO-friendly. */
export function CategoryChips({
  categories,
  active,
  basePath = "/shop",
  sort,
}: {
  categories: { name: string; slug: string }[];
  active?: string;
  basePath?: string;
  sort?: string;
}) {
  const router = useRouter();
  const go = (slug?: string) => {
    // Chips jump to the dedicated category pages; "All" stays in shop.
    if (slug) {
      router.push(sort && sort !== "featured" ? `/category/${slug}?sort=${sort}` : `/category/${slug}`);
      return;
    }
    router.push(basePath, { scroll: false });
  };

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5">
      <button
        onClick={() => go()}
        className={cn(
          "h-10 shrink-0 rounded-full border px-5 text-[13px] font-semibold transition-all duration-300",
          !active ? "bg-ink text-bg border-ink" : "border-line text-ink/70 hover:border-ink hover:text-ink bg-card"
        )}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c.slug}
          onClick={() => go(c.slug)}
          className={cn(
            "h-10 shrink-0 rounded-full border px-5 text-[13px] font-semibold transition-all duration-300",
            active === c.slug
              ? "bg-ink text-bg border-ink"
              : "border-line text-ink/70 hover:border-ink hover:text-ink bg-card"
          )}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
