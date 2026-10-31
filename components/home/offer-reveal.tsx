"use client";
import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function OfferReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="relative h-96 w-full overflow-hidden rounded-[2rem] border border-line bg-card shadow-xl">
          <Image
            src="/images/home/offer-reveal.jpg"
            alt="Offer background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-500 hover:bg-black/20 hover:backdrop-blur-0">
            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="rounded-full bg-white px-8 py-4 font-bold text-ink transition-transform hover:scale-105 active:scale-95"
              >
                Reveal your offer
              </button>
            ) : (
              <div className="text-center text-white">
                <p className="text-2xl font-bold">Your Exclusive Offer:</p>
                <p className="text-5xl font-extrabold text-accent">EXTRA 20% OFF</p>
                <p className="mt-2">Use code: CRAZY20</p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
