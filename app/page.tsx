import {
  BestSellers,
  CategoryGrid,
  CraftSpotlight,
  DealOfDay,
  EditorialBanner,
  Faq,
  JustDropped,
  Lookbook,
  Marquee,
  Newsletter,
  OfferReveal,
  PressStrip,
  Reviews,
  StatsBand,
  TrustStrip,
  VideoShowcase,
} from "@/components/home/sections";
import { Hero } from "@/components/home/hero";
import { LiveSales } from "@/components/home/interactive";
import { liveSales } from "@/lib/data/home";

export default function HomePage() {
  return (
    <>
      {/* 1 — first impression */}
      <Hero />
      <TrustStrip />
      <Marquee />

      {/* 2 — navigation + newness */}
      <CategoryGrid />
      <JustDropped />

      {/* 3 — video showcase section */}
      <VideoShowcase />
      <BestSellers />

      {/* 4 — urgency + proof */}
      <CraftSpotlight />
      <OfferReveal />
      <DealOfDay />
      <StatsBand />

      {/* 5 — community + story */}
      <Lookbook />
      <PressStrip />
      <EditorialBanner />

      {/* 6 — reassurance + capture */}
      <Newsletter />
      <Reviews />
      <Faq />

      {/* Recent-purchase nudge — dismissible, desktop only */}
      <LiveSales items={liveSales} />
    </>
  );
}
