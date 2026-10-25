import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared shell for static content pages (shipping, returns, terms, about…). */
export function InfoPage({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("mx-auto max-w-3xl px-4 pt-12 pb-24 sm:px-6 lg:px-8", className)}>
      <p className="text-soft text-[11px] font-semibold tracking-[0.2em] uppercase">{eyebrow}</p>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
      {intro && <p className="text-soft mt-4 text-[15px] leading-relaxed">{intro}</p>}
      <div className="mt-12 space-y-9">{children}</div>
    </article>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-line border-t pt-6">
      <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
      <div className="text-soft mt-2.5 space-y-3 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}

export function InfoCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="bg-ink text-bg hover:opacity-90 mt-2 inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold transition-opacity"
    >
      {children}
      <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}
