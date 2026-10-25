import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60svh] flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="bg-card border-line grid size-16 place-items-center rounded-full border">
        <Compass className="text-soft size-6" />
      </div>
      <p className="font-display text-4xl font-bold tracking-tight">Page not found</p>
      <p className="text-soft max-w-sm text-[15px]">
        The page you are looking for has moved, sold out, or never existed. The collection, however, is very real.
      </p>
      <Link href="/shop" className="bg-ink text-bg hover:opacity-90 mt-2 inline-flex h-12 items-center rounded-full px-7 text-sm font-semibold transition-opacity">
        Go to the shop
      </Link>
    </div>
  );
}
