import type { Category, Product } from "@/lib/types";

/** Unsplash CDN helper — verified URLs only. Replaced by Supabase Storage URLs in P2. */
export const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const categories: Category[] = [
  { id: "cat_women", name: "Women", slug: "women", image_url: u("1558769132-cb1aea458c5e", 1400) },
  { id: "cat_men", name: "Men", slug: "men", image_url: u("1487222477894-8943e31ef7b2", 1400) },
  { id: "cat_acc", name: "Accessories", slug: "accessories", image_url: u("1469334031218-e382a71b716b", 1400) },
];

const sizes = (sku: string, stocks: number[]) =>
  ["XS", "S", "M", "L", "XL"].map((v, i) => ({
    id: `${sku}-${v}`,
    product_id: "",
    name: "Size",
    value: v,
    stock_qty: stocks[i],
  }));

const accSizes = (sku: string) =>
  ["One size"].map((v) => ({ id: `${sku}-OS`, product_id: "", name: "Size", value: v, stock_qty: 34 }));

const shoeSizes = (sku: string) =>
  ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"].map((v, i) => ({
    id: `${sku}-${v.replace(" ", "")}`,
    product_id: "",
    name: "Size",
    value: v,
    stock_qty: [4, 12, 9, 14, 7][i],
  }));

export const products: Product[] = [
  {
    id: "prd_01", sku: "AUR-TS-101", name: "Essential Heavyweight Tee", slug: "essential-heavyweight-tee",
    category_id: "cat_men", price: 1499, compare_at_price: 2299,
    images: [u("1521572163474-6864f9cf17ab"), u("1618354691373-d851c5c3a990")],
    variants: sizes("AUR-TS-101", [8, 14, 20, 11, 3]),
    rating_avg: 4.8, rating_count: 214, is_featured: true, badge: "BESTSELLER",
    short_desc: "240 GSM organic cotton. Boxy cut that keeps its shape after a hundred washes.",
  },
  {
    id: "prd_02", sku: "AUR-HD-201", name: "Cloud Fleece Hoodie", slug: "cloud-fleece-hoodie",
    category_id: "cat_men", price: 3299, compare_at_price: 4499,
    images: [u("1611312449408-fcece27cdbb7"), u("1509319117193-57bab727e09d")],
    variants: sizes("AUR-HD-201", [5, 9, 16, 12, 6]),
    rating_avg: 4.9, rating_count: 187, is_featured: true, badge: "BESTSELLER",
    short_desc: "Brushed 400 GSM fleece with a double-lined hood. The one you will reach for daily.",
  },
  {
    id: "prd_03", sku: "AUR-DN-301", name: "Rigid Selvedge Jacket", slug: "rigid-selvedge-jacket",
    category_id: "cat_men", price: 4999, compare_at_price: null,
    images: [u("1516762689617-e1cffcef479d"), u("1441986300917-64674bd600d8")],
    variants: sizes("AUR-DN-301", [0, 7, 10, 8, 4]),
    rating_avg: 4.7, rating_count: 96, is_featured: true, badge: null,
    short_desc: "14 oz Japanese selvedge that fades to your own story. No stretch, all character.",
  },
  {
    id: "prd_04", sku: "AUR-WM-401", name: "Structure Wool Coat", slug: "structure-wool-coat",
    category_id: "cat_women", price: 6499, compare_at_price: 8999,
    images: [u("1539109136881-3be0616acf4b"), u("1509631179647-0177331693ae")],
    variants: sizes("AUR-WM-401", [3, 8, 9, 5, 2]),
    rating_avg: 4.8, rating_count: 143, is_featured: true, badge: "NEW",
    short_desc: "Sharp single-breasted silhouette in a wool blend that drapes like made-to-measure.",
  },
  {
    id: "prd_05", sku: "AUR-WM-402", name: "Bias Slip Dress", slug: "bias-slip-dress",
    category_id: "cat_women", price: 3699, compare_at_price: null,
    images: [u("1509631179647-0177331693ae"), u("1496747611176-843222e1e57c")],
    variants: sizes("AUR-WM-402", [6, 10, 12, 7, 3]),
    rating_avg: 4.6, rating_count: 88, is_featured: true, badge: "NEW",
    short_desc: "Cut on the bias so it moves with you. Midnight heavyweight satin.",
  },
  {
    id: "prd_06", sku: "AUR-SN-501", name: "Court Low Sneaker", slug: "court-low-sneaker",
    category_id: "cat_acc", price: 4499, compare_at_price: 5999,
    images: [u("1542291026-7eec264c27ff"), u("1600185365483-26d7a4cc7519")],
    variants: shoeSizes("AUR-SN-501"),
    rating_avg: 4.7, rating_count: 265, is_featured: true, badge: "BESTSELLER",
    short_desc: "Full-grain leather upper on a stitched cupsole. Breaks in, never breaks down.",
  },
  {
    id: "prd_07", sku: "AUR-SN-502", name: "Field Runner", slug: "field-runner",
    category_id: "cat_acc", price: 3799, compare_at_price: null,
    images: [u("1539533018447-63fcce2678e3"), u("1600185365483-26d7a4cc7519")],
    variants: shoeSizes("AUR-SN-502"),
    rating_avg: 4.5, rating_count: 121, is_featured: false, badge: null,
    short_desc: "MinimalRunner silhouette with a cloud-foam midsole. City miles, all day.",
  },
  {
    id: "prd_08", sku: "AUR-AC-601", name: "Meridian Automatic Watch", slug: "meridian-automatic-watch",
    category_id: "cat_acc", price: 9999, compare_at_price: 12499,
    images: [u("1523170335258-f5ed11844a49"), u("1548126032-079a0fb0099d")],
    variants: accSizes("AUR-AC-601"),
    rating_avg: 4.9, rating_count: 73, is_featured: true, badge: null,
    short_desc: "Sapphire crystal, Swiss movement, 38mm brushed steel. An heirloom at a non-heirloom price.",
  },
  {
    id: "prd_09", sku: "AUR-AC-602", name: "Outline Sunglasses", slug: "outline-sunglasses",
    category_id: "cat_acc", price: 1899, compare_at_price: 2499,
    images: [u("1511499767150-a48a237f0083"), u("1544441893-675973e31985")],
    variants: accSizes("AUR-AC-602"),
    rating_avg: 4.4, rating_count: 167, is_featured: false, badge: null,
    short_desc: "Hand-polished acetate frames with polarized CR-39 lenses. UV400, forever.",
  },
  {
    id: "prd_10", sku: "AUR-WM-403", name: "Soft Knit Cardigan", slug: "soft-knit-cardigan",
    category_id: "cat_women", price: 2899, compare_at_price: null,
    images: [u("1434389677669-e08b4cac3105"), u("1490481651871-ab68de25d43d")],
    variants: sizes("AUR-WM-403", [7, 11, 13, 9, 4]),
    rating_avg: 4.6, rating_count: 92, is_featured: false, badge: null,
    short_desc: "Hold-everything merino-blend rib with mother-of-pearl buttons.",
  },
  {
    id: "prd_11", sku: "AUR-WM-404", name: "Nomad Block Heel", slug: "nomad-block-heel",
    category_id: "cat_women", price: 4199, compare_at_price: 5499,
    images: [u("1543163521-1bf539c55dd2"), u("1483985988355-763728e1935b")],
    variants: shoeSizes("AUR-WM-404"),
    rating_avg: 4.5, rating_count: 61, is_featured: false, badge: null,
    short_desc: "A 55mm block heel engineered on a cushioned footbed. Walk ten hours. Really.",
  },
  {
    id: "prd_12", sku: "AUR-TS-102", name: "Boxy Oversized Tee", slug: "boxy-oversized-tee",
    category_id: "cat_men", price: 1699, compare_at_price: null,
    images: [u("1520975954732-35dd22299614"), u("1556905055-8f358a7a47b2")],
    variants: sizes("AUR-TS-102", [6, 13, 17, 10, 5]),
    rating_avg: 4.7, rating_count: 134, is_featured: false, badge: "NEW",
    short_desc: "Drop-shoulder relaxed fit in heavyweight cotton jersey. Styled to be lived in.",
  },
];

export const heroImage = u("1490481651871-ab68de25d43d", 1800);
export const editorialImage = u("1479064555552-3ef4979f8908", 1400);

export const reviews = [
  {
    name: "Ananya R.", city: "Mumbai", rating: 5,
    item: "Cloud Fleece Hoodie", date: "2 days ago",
    text: "Bought three fast-fashion hoodies last year, all pilled by month two. This one is heavier, warmer, and it still looks new after eight washes. Reordered in grey.",
  },
  {
    name: "Karthik S.", city: "Bengaluru", rating: 5,
    item: "Essential Heavyweight Tee", date: "1 week ago",
    text: "Ordered Tuesday, wearing it by Friday. The fit guide was actually accurate, which no brand gets right. Sleeve hits exactly where I want.",
  },
  {
    name: "Meera D.", city: "Delhi", rating: 5,
    item: "Structure Wool Coat", date: "3 weeks ago",
    text: "People ask which boutique this is from. Packaging, tags, the drape — everything felt considered. Worth every rupee.",
  },
  {
    name: "Rohit V.", city: "Pune", rating: 4,
    item: "Rigid Selvedge Jacket", date: "3 weeks ago",
    text: "Exchanged sizes in one WhatsApp message, pickup came next morning. Zero forms, zero calls — this is how it should be.",
  },
];

export const getFeatured = (n = 8) =>
  products.filter((p) => p.is_featured).slice(0, n);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getJustDropped = (n = 4) => products.filter((p) => p.badge === "NEW").slice(0, n);

/** Sub-category system (mock; DB in P2 will store it properly) */
export const subBySku: Record<string, string> = {
  "AUR-TS-101": "Tops", "AUR-TS-102": "Tops", "AUR-HD-201": "Sweats", "AUR-DN-301": "Outerwear",
  "AUR-WM-401": "Outerwear", "AUR-WM-402": "Dresses", "AUR-WM-403": "Knitwear", "AUR-WM-404": "Shoes",
  "AUR-SN-501": "Footwear", "AUR-SN-502": "Footwear", "AUR-AC-601": "Watches", "AUR-AC-602": "Eyewear",
};

/** Preferred chip order per category — dead subcategories never render. */
const subOrder: Record<string, string[]> = {
  women: ["Tops", "Dresses", "Outerwear", "Knitwear", "Shoes"],
  men: ["Tops", "Tees", "Sweats", "Outerwear"],
  accessories: ["Footwear", "Watches", "Eyewear"],
};

const catOf = (slug: string) => categories.find((c) => c.slug === slug);

export const getSubcats = (catSlug: string): string[] => {
  const cat = catOf(catSlug);
  if (!cat) return [];
  const present = new Set(
    products.filter((p) => p.category_id === cat.id).map((p) => subBySku[p.sku])
  );
  return (subOrder[catSlug] ?? []).filter((s) => present.has(s));
};

export const catProductCount = (catSlug: string) =>
  products.filter((p) => p.category_id === catOf(catSlug)?.id).length;

export const subcatCount = (catSlug: string, sub: string) =>
  products.filter((p) => p.category_id === catOf(catSlug)?.id && subBySku[p.sku] === sub).length;

export const catStartingPrice = (catSlug: string) =>
  Math.min(...products.filter((p) => p.category_id === catOf(catSlug)?.id).map((p) => p.price));

export const catDescriptions: Record<string, string> = {
  women: "Sharp tailoring, soft knitted layers, and silhouettes designed to move. Cover-rack pieces, curated down to what is actually worn.",
  men: "Workhorses for the everyday — heavyweight tees that hold shape, outerwear that ages, and quiet details that read loudly from up close.",
  accessories: "Leather sneakers with a stitched cupsole, automatic watches, and polarized sunnies — the details that finish the whole fit.",
};

/* ---- sorting (shared by /shop and /category pages) ---- */
type SortFn = (a: Product, b: Product) => number;
export const sortFns: Record<string, SortFn> = {
  featured: (a, b) => Number(b.is_featured) - Number(a.is_featured) || b.rating_avg - a.rating_avg,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating_avg - a.rating_avg,
};

export const getRelated = (product: Product, n = 4): Product[] => {
  const sameCat = products.filter(
    (p) => p.id !== product.id && p.category_id === product.category_id
  );
  const others = products.filter(
    (p) => p.id !== product.id && p.category_id !== product.category_id
  );
  return [...sameCat, ...others].slice(0, n);
};
