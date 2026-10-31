import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function EditorialBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-ink p-16 text-center text-white">
          <Image
            src="/images/home/editorial.jpg"
            alt="Editorial banner"
            fill
            className="absolute inset-0 opacity-40 object-cover"
          />
          <div className="relative z-10">
            <h2 className="font-display text-5xl font-bold">The New Standard</h2>
            <p className="mt-4 max-w-lg text-lg text-white/80">
              Redefining luxury essentials for the modern lifestyle. Experience the difference.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
