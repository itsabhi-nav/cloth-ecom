import { existsSync } from "node:fs";
import { join } from "node:path";
import { products, u } from "@/lib/data/catalog";
import type { Product } from "@/lib/types";

/* ------------------------------------------------------------------ */
/*  IMAGE SLOTS                                                        */
/* ------------------------------------------------------------------ */
/**
 * Drop custom artwork into /public/images/home/ using the base names below
 * (any of .jpg .jpeg .png .webp .avif works). Until a file exists we fall
 * back to a verified Unsplash photo, so the page never breaks.
 *
 * The full art-direction + ChatGPT prompt sheet lives in
 * public/images/home/README.md
 */
const findLocal = (name: string) => {
  for (const ext of ["jpg", "jpeg", "png", "webp", "avif"]) {
    const src = `/images/home/${name}.${ext}`;
    if (existsSync(join(process.cwd(), "public", src))) return src;
  }
  return null;
};

const asset = (name: string, fallback: string) => findLocal(name) ?? fallback;

export const homeImages = {
  heroMain: asset("hero-main", u("1490481651871-ab68de25d43d", 1600)),
  heroDetail: asset("hero-detail", u("1611312449408-fcece27cdbb7", 700)),
  offer: asset("offer-banner", u("1479064555552-3ef4979f8908", 1400)),
  catWomen: asset("cat-women", u("1558769132-cb1aea458c5e", 1400)),
  catMen: asset("cat-men", u("1487222477894-8943e31ef7b2", 1400)),
  catAccessories: asset("cat-accessories", u("1469334031218-e382a71b716b", 1400)),
  editEveryday: asset("edit-everyday", u("1521572163474-6864f9cf17ab", 900)),
  editWorkwear: asset("edit-workwear", u("1539109136881-3be0616acf4b", 900)),
  editWeekend: asset("edit-weekend", u("1509631179647-0177331693ae", 900)),
  editNight: asset("edit-night", u("1496747611176-843222e1e57c", 900)),
  deal: asset("deal", u("1542291026-7eec264c27ff", 1200)),
  craft: asset("craft", u("1509319117193-57bab727e09d", 1400)),
  editorial: asset("editorial", u("1483985988355-763728e1935b", 1400)),
  look1: asset("lookbook-1", u("1520975954732-35dd22299614", 900)),
  look2: asset("lookbook-2", u("1542291026-7eec264c27ff", 900)),
  look3: asset("lookbook-3", u("1434389677669-e08b4cac3105", 900)),
  look4: asset("lookbook-4", u("1516762689617-e1cffcef479d", 900)),
  look5: asset("lookbook-5", u("1523170335258-f5ed11844a49", 900)),
  look6: asset("lookbook-6", u("1511499767150-a48a237f0083", 900)),
} as const;

/* ------------------------------------------------------------------ */
/*  SALE / OFFER                                                       */
/* ------------------------------------------------------------------ */
export const sale = {
  code: "AUR40",
  percent: 40,
  /** Leave blank for a rolling "today + 2 days" countdown. Set an ISO date for a real sale. */
  endsAt: "",
  note: "Selected styles only · No code needed at checkout · While stocks last",
} as const;

/* ------------------------------------------------------------------ */
/*  DEAL OF THE DAY                                                    */
/* ------------------------------------------------------------------ */
export const heroProduct: Product =
  products.find((p) => p.slug === "rigid-selvedge-jacket") ?? products[0];

export const dealProduct: Product =
  products.find((p) => p.slug === "court-low-sneaker") ?? products[0];

export const deal = {
  claimed: 63,
  left: 7,
  bundle: "Pair it with the Essential Tee and save another ₹300 at checkout",
} as const;

/* ------------------------------------------------------------------ */
/*  SHOP BY MOOD                                                       */
/* ------------------------------------------------------------------ */
export const edits = [
  {
    title: "The everyday",
    copy: "Heavyweight tees, soft fleece, zero decisions.",
    image: homeImages.editEveryday,
    href: "/shop?c=men",
  },
  {
    title: "Work mode",
    copy: "Sharp tailoring that still feels like you.",
    image: homeImages.editWorkwear,
    href: "/shop?c=women",
  },
  {
    title: "Off-duty",
    copy: "Weekend layers built for slow mornings.",
    image: homeImages.editWeekend,
    href: "/shop?c=women",
  },
  {
    title: "Night out",
    copy: "The one dress that does all the talking.",
    image: homeImages.editNight,
    href: "/shop?c=women",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  LOOKBOOK                                                           */
/* ------------------------------------------------------------------ */
export const lookbook = [
  { image: homeImages.look1, handle: "@ananya.r", caption: "Boxy tee + wide denim", likes: "2.4k", span: "row-span-2" },
  { image: homeImages.look2, handle: "@karthik.s", caption: "Court Low, every day", likes: "1.8k", span: "" },
  { image: homeImages.look3, handle: "@meera.d", caption: "Merino on repeat", likes: "3.1k", span: "" },
  { image: homeImages.look4, handle: "@rohit.v", caption: "Selvedge, 8 months in", likes: "4.2k", span: "row-span-2" },
  { image: homeImages.look5, handle: "@aur.studio", caption: "38mm, quiet flex", likes: "1.2k", span: "" },
  { image: homeImages.look6, handle: "@devika.m", caption: "Polarised, obviously", likes: "986", span: "" },
] as const;

/* ------------------------------------------------------------------ */
/*  PRESS                                                              */
/* ------------------------------------------------------------------ */
export const press = ["VOGUE", "GQ", "ELLE", "HYPEBEAST", "ESQUIRE", "GRAZIA"] as const;

/* ------------------------------------------------------------------ */
/*  WHY US                                                             */
/* ------------------------------------------------------------------ */
export const craftPoints = [
  {
    title: "Fabric first",
    copy: "240 GSM cotton, 14 oz selvedge, 400 GSM fleece. We start with the mill, not the margin.",
  },
  {
    title: "300-piece runs",
    copy: "Small batches, made once. No warehouse full of unsold stock, no landfill of regret.",
  },
  {
    title: "Direct pricing",
    copy: "No distributor, no mall rent. You pay for the garment, not the layer of middlemen.",
  },
  {
    title: "Built to be repaired",
    copy: "Free repairs for a year on every piece. Wear it out, not through it.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  STATS                                                              */
/* ------------------------------------------------------------------ */
export const stats = [
  { value: 12400, suffix: "+", decimals: 0, label: "orders shipped" },
  { value: 4.8, suffix: "/5", decimals: 1, label: "average rating" },
  { value: 92, suffix: "%", decimals: 0, label: "would order again" },
  { value: 38, suffix: " min", decimals: 0, label: "avg. support reply" },
] as const;

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export const faqs = [
  {
    q: "How long does delivery take?",
    a: "Metro cities get it in 2–4 working days, the rest of India in 4–7. Orders above ₹1,499 ship free by express; below that it is a flat ₹99. You get tracking on WhatsApp the moment it leaves the studio.",
  },
  {
    q: "Is cash on delivery available?",
    a: "Yes — COD is available on orders up to ₹10,000 across India. There is no extra COD fee. You can also pay by UPI, all major cards and netbanking.",
  },
  {
    q: "What if the size is wrong?",
    a: "Exchange it within 7 days, free pickup. Message us on WhatsApp with your order number and we book the pickup — no forms, no call centre. Refunds land back in 3–5 working days.",
  },
  {
    q: "How do your sizes run?",
    a: "True to size, with a slightly relaxed cut on tees and hoodies. Every product page has a flat-lay measurement chart in cm. If you are between sizes, size up for the oversized look or down for a clean fit.",
  },
  {
    q: "Do you restock sold-out styles?",
    a: "Rarely. Most styles are a one-time 300-piece run. When something sells out it joins the archive — but we do bring back proven favourites once a year, in new colours.",
  },
  {
    q: "How should I care for the pieces?",
    a: "Cold wash, inside out, hang dry. That is it. Wool coats should be dry-cleaned once a season. We also repair any stitching fault free of charge for the first 12 months.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  NEWSLETTER PERKS                                                   */
/* ------------------------------------------------------------------ */
export const newsletterPerks = [
  "₹300 off your first order",
  "Early access to every drop",
  "Restock alerts before they go public",
  "One honest email a week. No spam, ever.",
] as const;

/* ------------------------------------------------------------------ */
/*  LIVE SALES TICKER                                                  */
/* ------------------------------------------------------------------ */
export const liveSales = [
  { name: "Ananya", city: "Mumbai", item: "Cloud Fleece Hoodie", mins: 2 },
  { name: "Karthik", city: "Bengaluru", item: "Essential Heavyweight Tee", mins: 4 },
  { name: "Meera", city: "Delhi", item: "Structure Wool Coat", mins: 7 },
  { name: "Rohit", city: "Pune", item: "Rigid Selvedge Jacket", mins: 9 },
  { name: "Devika", city: "Hyderabad", item: "Meridian Automatic Watch", mins: 12 },
] as const;

/* ------------------------------------------------------------------ */
/*  HERO PROOF                                                         */
/* ------------------------------------------------------------------ */
export const heroAvatars = [
  { initials: "AR", tone: "bg-[#C97B5A]" },
  { initials: "KS", tone: "bg-[#5B6B5A]" },
  { initials: "MD", tone: "bg-[#8B6B4E]" },
  { initials: "RV", tone: "bg-[#4E5D73]" },
] as const;
