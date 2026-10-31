import {
  BestSellers,
  CategoryGrid,
  CraftSpotlight,
  DealOfDay,
  Faq,
  JustDropped,
  Marquee,
  Newsletter,
  Reviews,
  StatsBand,
  VideoShowcase,
} from "@/components/home/sections";
import { Hero } from "@/components/home/hero";

export default function HomePage() {
  return (
    <>
      {/* 1 — first impression */}
      <Hero />
      <Marquee />

      {/* 2 — navigation + newness */}
      <CategoryGrid />
      <JustDropped />

      {/* 3 — video showcase section */}
      <VideoShowcase />
      <BestSellers />

      {/* 4 — urgency + proof */}
      <CraftSpotlight />
      <DealOfDay />
      <StatsBand />

      {/* 5 — community + story */}
      <Newsletter />
      <Reviews />
      <Faq />
    </>
  );
}
