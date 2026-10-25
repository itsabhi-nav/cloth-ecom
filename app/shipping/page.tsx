import type { Metadata } from "next";
import { store, formatMoney } from "@/config/store.config";
import { InfoCta, InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Shipping",
  description: `Dispatch times, delivery estimates and charges for ${store.fullName} orders.`,
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  const { freeOver, flat } = store.shipping;

  return (
    <InfoPage
      eyebrow="Help"
      title="Shipping"
      intro="Orders leave our studio within one working day. Everything is packed by hand and tracked door to door."
    >
      <InfoSection title="Charges">
        <ul className="list-disc space-y-2 pl-5">
          <li>Free express shipping on orders over {formatMoney(freeOver)}.</li>
          <li>A flat {formatMoney(flat)} on orders below that.</li>
          <li>Cash on delivery is available on orders up to {formatMoney(10000)}.</li>
        </ul>
      </InfoSection>

      <InfoSection title="Delivery estimates">
        <ul className="list-disc space-y-2 pl-5">
          <li>Metro cities: 2–4 working days.</li>
          <li>Rest of India: 4–7 working days.</li>
          <li>Remote pin codes can take a day or two longer.</li>
        </ul>
        <p>
          You will get a tracking link by email and SMS as soon as the parcel is picked up. If it has not
          moved in 48 hours, write to us and we will chase it.
        </p>
      </InfoSection>

      <InfoSection title="International orders">
        <p>
          We currently ship within India only. International shipping is on the roadmap — join the
          newsletter at the bottom of the page and you will hear when it opens.
        </p>
      </InfoSection>

      <InfoSection title="Missing or damaged parcels">
        <p>
          Report a missing or damaged order within 48 hours of delivery and we will replace it or refund
          it. Photographs help us raise the claim with the courier faster.
        </p>
      </InfoSection>

      <InfoCta href="/track">Track an order</InfoCta>
    </InfoPage>
  );
}
