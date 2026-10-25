import type { Metadata } from "next";
import { store } from "@/config/store.config";
import { InfoCta, InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Our story",
  description: `How ${store.fullName} makes considered wardrobe essentials in small batches.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Company"
      title="Our story"
      intro={`${store.fullName} makes a small number of things properly. No seasonal churn, no fifty shades of the same tee — just the pieces you reach for.`}
    >
      <InfoSection title="Why we started">
        <p>
          Most wardrobes are full and still feel empty. We built {store.name} around the opposite idea:
          a tight edit of essentials, made from fabrics that hold up, at a price that reflects what the
          garment actually costs to make.
        </p>
        <p>
          Every piece is designed in-house and produced in limited runs with mills and workshops we visit
          ourselves. When something works, we keep making it. When it does not, it does not come back.
        </p>
      </InfoSection>

      <InfoSection title="How we make things">
        <p>
          Small batches mean we can check every lot instead of sampling a few. Fabrics are chosen for
          weight and hand-feel first, then tested for shrinkage and colour fastness before a single unit
          ships.
        </p>
        <p>
          We publish real measurements on every product page and keep our size guide honest. If a fit
          runs small, we say so.
        </p>
      </InfoSection>

      <InfoSection title="What we leave out">
        <p>
          No fake countdowns, no inflated list prices, no “was ₹4,999” theatre. Honest pricing is the
          whole point — {store.tagline.toLowerCase()}.
        </p>
      </InfoSection>

      <InfoCta href="/shop">Shop the collection</InfoCta>
    </InfoPage>
  );
}
