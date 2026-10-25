"use client";

import { motion, useReducedMotion } from "motion/react";

/** Gentle bouncing scroll cue under the hero */
export function ScrollCue() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2"
      aria-hidden
      animate={reduce ? {} : { y: [0, 8, 0], opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="border-white/30 flex h-9 w-6 items-start justify-center rounded-full border-2 p-1.5 backdrop-blur-sm">
        <div className="size-1 rounded-full bg-white" />
      </div>
    </motion.div>
  );
}
