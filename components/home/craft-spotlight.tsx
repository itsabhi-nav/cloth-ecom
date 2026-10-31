import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/home/shared";

export function CraftSpotlight() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Craftsmanship"
        title="Details that matter"
        sub="Hover over the image to explore the precision behind every stitch."
      />
      <Reveal>
        <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-[2rem] border border-line bg-card shadow-xl">
          <Image
            src="/images/home/craft.jpg"
            alt="Craftsmanship detail"
            fill
            className="object-cover"
          />
          {/* Interactive markers */}
          <div className="absolute inset-0">
            <Hotspot top="30%" left="40%" label="Premium Stitching" />
            <Hotspot top="60%" left="60%" label="High-grade Hardware" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Hotspot({ top, left, label }: { top: string; left: string; label: string }) {
  return (
    <div className="group absolute size-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer" style={{ top, left }}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75"></span>
      <span className="relative inline-flex size-8 items-center justify-center rounded-full bg-accent text-white font-bold text-xs shadow-lg">
        +
      </span>
      <div className="absolute left-10 top-0 hidden w-48 rounded-xl bg-black/80 p-3 text-xs text-white backdrop-blur group-hover:block">
        {label}
      </div>
    </div>
  );
}
