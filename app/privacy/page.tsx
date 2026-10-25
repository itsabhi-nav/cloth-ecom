import type { Metadata } from "next";
import { store } from "@/config/store.config";
import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `What ${store.fullName} collects, why, and how to get it deleted.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="We collect the minimum needed to ship an order and answer your email. We do not sell data — not to advertisers, not to anyone."
    >
      <InfoSection title="What we collect">
        <ul className="list-disc space-y-2 pl-5">
          <li>Name, email, phone and shipping address when you order.</li>
          <li>Order history, so we can handle returns and support.</li>
          <li>Basic analytics: pages visited, device type, referring site.</li>
        </ul>
        <p>Payment card details are handled by the payment gateway and never reach our servers.</p>
      </InfoSection>

      <InfoSection title="Why we use it">
        <p>
          To process and deliver orders, send transactional updates, handle returns, prevent fraud, and
          understand which products and pages are working. Marketing email is opt-in and every message
          has a one-click unsubscribe.
        </p>
      </InfoSection>

      <InfoSection title="Cookies">
        <p>
          Essential cookies keep your cart and theme preference working. Analytics cookies are used in
          aggregate; you can block them in your browser without breaking checkout.
        </p>
      </InfoSection>

      <InfoSection title="Who we share it with">
        <p>
          Only the processors needed to run the store: payment gateway, courier partners, email provider
          and hosting. Each receives the minimum data required for their job and is bound by contract to
          use it only for that purpose.
        </p>
      </InfoSection>

      <InfoSection title="How long we keep it">
        <p>
          Order records are kept for eight years as required by Indian tax law. Marketing preferences and
          analytics data are kept for two years. Support emails are deleted after three years.
        </p>
      </InfoSection>

      <InfoSection title="Your rights">
        <p>
          You can ask for a copy of your data, correct it, or have it deleted (subject to tax record
          requirements). Email us from the address you ordered with and we will respond within 30 days.
        </p>
      </InfoSection>

      <InfoSection title="Contact">
        <p>
          Privacy questions: <span className="text-ink font-medium">privacy@{store.name.toLowerCase()}.store</span>.
          General support: <span className="text-ink font-medium">hello@{store.name.toLowerCase()}.store</span>.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
