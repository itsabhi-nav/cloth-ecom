"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Heart, Menu, ShoppingBag, Sparkles, User, X } from "lucide-react";
import { store } from "@/config/store.config";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { cartCount, useCart } from "@/lib/store/cart";

/* Announcement bar: single line, config-driven */
function AnnouncementBar() {
  if (!store.features.announcement) return null;
  return (
    <div className="bg-ink text-bg">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-2 overflow-hidden px-4 text-[12.5px] tracking-wide">
        <Sparkles className="size-3.5 shrink-0 opacity-80" aria-hidden />
        <p className="min-w-0 truncate">{store.announcement}</p>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useCart((s) => s.items);
  const setDrawer = useCart((s) => s.setDrawer);
  const pathname = usePathname();
  const count = cartCount(items);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500 ease-[var(--ease-out-expo)]",
          scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Mobile menu button */}
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="grid size-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {store.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative text-[14px] font-medium text-ink/80 transition-colors hover:text-ink"
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-ink transition-all duration-300 ease-[var(--ease-out-expo)] group-hover:w-full",
                      active ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button aria-label="Account" className="hidden size-10 place-items-center rounded-full hover:bg-ink/5 sm:grid">
              <User className="size-[18px]" />
            </button>
            <button aria-label="Wishlist" className="hidden size-10 place-items-center rounded-full hover:bg-ink/5 sm:grid">
              <Heart className="size-[18px]" />
            </button>
            <button
              aria-label={`Cart, ${count} items`}
              onClick={() => setDrawer(true)}
              className="relative grid size-10 place-items-center rounded-full hover:bg-ink/5"
            >
              <ShoppingBag className="size-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="bg-accent absolute -right-0.5 -top-0.5 grid size-[18px] place-items-center rounded-full text-[10px] font-bold text-white"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-over menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 flex w-[84vw] max-w-sm flex-col bg-bg px-7 py-6 shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="grid size-10 place-items-center rounded-full hover:bg-ink/5"
                >
                  <X className="size-5" />
                </button>
              </div>
              <p className="text-soft mb-3 text-[10px] font-bold tracking-[0.24em] uppercase">Menu</p>
              <nav className="flex flex-col">
                {store.nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={item.href}
                      className="font-display group flex items-center justify-between border-b border-line py-[18px] text-[26px] font-semibold tracking-tight"
                    >
                      {item.label}
                      <span className="text-accent/0 transition-all duration-300 group-hover:text-accent">
                        <ArrowRight className="size-5" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="text-soft mt-auto pb-2">
                <p className="text-sm leading-relaxed">{store.tagline}</p>
                <p className="mt-1 text-xs">{store.announcement}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
