import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  SHARED BITS                                                        */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  eyebrow,
  title,
  sub,
  action,
  invert = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: string;
  action?: { label: string; href: string };
  invert?: boolean;
  className?: string;
}) {
  return (
    <Reveal>
      <div className={cn("flex flex-wrap items-end justify-between gap-x-6 gap-y-4", className)}>
        <div className="max-w-2xl">
          <p
            className={cn(
              "flex items-center gap-2.5 text-[11px] font-bold tracking-[0.2em] uppercase",
              invert ? "text-white/60" : "text-accent"
            )}
          >
            <span className={cn("h-px w-7", invert ? "bg-white/40" : "bg-accent/60")} />
            {eyebrow}
          </p>
          <h2
            className={cn(
              "font-display mt-3 text-[30px] leading-[1.05] font-bold tracking-tight sm:text-4xl lg:text-[42px]",
              invert && "text-white"
            )}
          >
            {title}
          </h2>
          {sub && (
            <p className={cn("mt-3 max-w-xl text-[14.5px] leading-relaxed", invert ? "text-white/65" : "text-soft")}>
              {sub}
            </p>
          )}
        </div>
        {action && (
          <Link
            href={action.href}
            className={cn(
              "group flex items-center gap-2 text-[13.5px] font-semibold",
              invert ? "text-white/80 hover:text-white" : "text-ink/70 hover:text-ink"
            )}
          >
            {action.label}
            <span
              className={cn(
                "grid size-8 place-items-center rounded-full border transition-all duration-300 group-hover:rotate-[-45deg]",
                invert ? "border-white/20" : "border-line"
              )}
            >
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        )}
      </div>
    </Reveal>
  );
}

export function Stars({
  n,
  size = "size-3.5",
  className,
}: {
  n: number;
  size?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("text-accent flex gap-0.5", className)}
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn(size, i < n ? "fill-current" : "text-line fill-line")} />
      ))}
    </span>
  );
}

export function Pill({
  children,
  invert = false,
  className,
}: {
  children: ReactNode;
  invert?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase",
        invert
          ? "border-white/20 bg-white/10 text-white backdrop-blur-md"
          : "border-line bg-card text-ink/75",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Big soft colour orb used behind dark promo blocks. */
export function Glow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-[110px] will-change-transform",
        className
      )}
    />
  );
}
