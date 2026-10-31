import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { homeImages } from "@/lib/data/home";

export function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000",
  ];

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Auto-sliding background images */}
      <div className="absolute inset-0 z-0">
        <div className="flex h-full w-full animate-scroll-images">
          {images.map((src, i) => (
            <div key={i} className="relative h-full w-full shrink-0">
              <Image src={src} alt="Hero background" fill className="object-cover" priority={i === 0} />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <Reveal y={20}>
          <h1 className="font-display text-[52px] leading-[0.95] font-bold tracking-[-0.03em] sm:text-[72px] lg:text-[84px]">
            Dress like you<br />
            <span className="text-accent">mean it.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2} y={20}>
          <Link
            href="/shop"
            className="mt-10 inline-flex h-[56px] items-center gap-2 rounded-full bg-white px-8 text-[15px] font-semibold text-ink transition-all hover:bg-white/90 active:scale-95"
          >
            Shop the collection
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
