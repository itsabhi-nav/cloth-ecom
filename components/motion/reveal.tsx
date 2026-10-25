"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SSR-safe scroll reveal.
 *
 * The server always renders content VISIBLE, so a slow phone network can
 * never show a blank page. Only after hydration do we hide elements that are
 * still below the fold, then animate them in as the user scrolls.
 * (Framer Motion's own `whileInView` puts opacity:0 into the SSR HTML itself,
 * which is exactly what caused the "blank page" on mobile.)
 */
export function useSSRSafeInView<T extends HTMLElement>(margin = "-60px 0px") {
  const ref = useRef<T>(null);
  const [hidden, setHidden] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion preference
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // Already on screen at load → show immediately, no animation needed
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return;

    setHidden(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHidden(false);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, hidden };
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, hidden } = useSSRSafeInView<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={hidden ? { opacity: 0, y } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
