import type { Metadata } from "next";
import Link from "next/link";
import { store } from "@/config/store.config";
import { InfoCta, InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Returns & exchanges",
  description: `Seven-day returns and easy size exchanges at ${store.fullName}.`,
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <InfoPage
      eyebrow="Help"
      title="Returns & exchanges"
      intro="If it does not fit, send it back. Seven days from delivery, no interrogation."
    >
      <InfoSection title="The window">
        <p>
          Start a return within 7 days of delivery. Items must be unworn, unwashed and have the tags
          attached. Try things on — that is what the window is for.
        </p>
      </InfoSection>

      <InfoSection title="How to start">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Email us with your order number and the item you want to return or exchange.</li>
          <li>We send a pickup request to your address, usually within 24 hours.</li>
          <li>Hand the parcel over in its original packaging. Keep the courier receipt.</li>
        </ol>
      </InfoSection>

      <InfoSection title="Refunds">
        <p>
          Refunds are processed to the original payment method within 5–7 working days of the parcel
          reaching us. COD orders are refunded by bank transfer — we will ask for the details by email.
        </p>
        <p>
          Shipping charges are refunded only when the item was faulty or the wrong piece was sent.
        </p>
      </InfoSection>

      <InfoSection title="Exchanges">
        <p>
          Size exchanges are free, subject to stock. If the size you need is sold out, we will refund
          instead — your call.
        </p>
      </InfoSection>

      <InfoSection title="Not eligible">
        <p>
          For hygiene reasons, innerwear and pierced jewellery cannot be returned. Pieces marked final
          sale are also excluded; this is always stated on the product page.
        </p>
      </InfoSection>

      <InfoCta href="/contact">Start a return</InfoCta>
      <p className="text-soft text-[13px]">
        Need the shipping details first? Read the <Link href="/shipping" className="text-ink underline underline-offset-4">shipping policy</Link>.
      </p>
    </InfoPage>
  );
}
