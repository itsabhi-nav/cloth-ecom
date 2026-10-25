import type { Metadata } from "next";
import { store } from "@/config/store.config";
import { InfoCta, InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Journal",
  description: `Notes on fabric, fit and buying less from ${store.fullName}.`,
  alternates: { canonical: "/journal" },
};

const entries = [
  {
    date: "October 2026",
    title: "Why heavyweight cotton is worth the extra ₹200",
    body: "A 240 GSM tee feels like a tee should: it holds its shape, stops showing every crease, and gets softer for years instead of thinner. The jump from 180 to 240 GSM costs a little more at the mill and a lot less at the wardrobe level — you buy one instead of three. That is the entire argument.",
  },
  {
    date: "September 2026",
    title: "The case for a five-piece wardrobe",
    body: "Most people wear a fifth of what they own. If you strip a wardrobe back to five pieces you actually rotate — a heavy tee, a knit, a trouser, a jacket, a shirt — the daily decision disappears and the clothes last longer because they are washed less often. Fewer, better, repeated. It is not minimalism as an aesthetic, it is just arithmetic.",
  },
  {
    date: "August 2026",
    title: "How we test a fabric before it becomes a product",
    body: "Every lot is washed three times at 40°C, tumble dried, then measured against the original spec. We check shrinkage, pilling and colour bleed, and reject anything that moves more than 2%. It is slow and unglamorous, and it is the reason a piece still fits in year three.",
  },
];

export default function JournalPage() {
  return (
    <InfoPage
      eyebrow="Journal"
      title="Notes on buying less"
      intro="Short reads on fabric, fit and the economics of keeping clothes longer."
    >
      {entries.map((entry) => (
        <InfoSection key={entry.title} title={entry.title}>
          <p className="text-soft text-[11px] font-semibold tracking-[0.18em] uppercase">{entry.date}</p>
          <p>{entry.body}</p>
        </InfoSection>
      ))}

      <InfoCta href="/shop">Shop the collection</InfoCta>
    </InfoPage>
  );
}
