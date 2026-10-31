"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { motion } from "motion/react";

export function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000",
  ];

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Auto-sliding background images */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="flex h-full w-[400%]"
          animate={{ x: ["0%", "-25%", "-50%", "-75%"] }}
          transition={{
            duration: 16,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.25, 0.5, 0.75],
          }}
        >
          {images.map((src, i) => (
            <div key={i} className="relative h-full w-[25%] shrink-0">
              <Image src={src} alt="Hero background" fill className="object-cover" priority={i === 0} />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <Reveal y={30}>
          <h1 className="font-display text-[56px] leading-[0.9] font-bold tracking-[-0.04em] sm:text-[84px] lg:text-[100px]">
            Dress like you<br />
            <span className="text-accent italic">mean it.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.3} y={20}>
          <p className="mt-6 text-lg text-white/80 max-w-md mx-auto">
            Small batch, premium essentials designed to outlive trends.
          </p>
        </Reveal>
        <Reveal delay={0.5} y={20}>
          <Link
            href="/shop"
            className="mt-10 inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-8 text-[14px] font-semibold text-ink transition-all hover:bg-white/90 active:scale-95 shadow-lg"
          >
            Shop the collection
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
