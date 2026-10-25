import type { Metadata } from "next";
import Link from "next/link";
import { store, formatMoney } from "@/config/store.config";
import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Terms of service",
  description: `The terms that apply when you order from ${store.fullName}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms of service"
      intro={`These terms apply to every order placed with ${store.fullName}. By checking out you accept them.`}
    >
      <InfoSection title="Orders and pricing">
        <p>
          All prices are in {store.currency} and include applicable taxes. An order is confirmed when you
          receive the confirmation email, not when payment is authorised. If an item turns out to be out
          of stock after you order, we will cancel that line and refund it in full.
        </p>
        <p>
          We reserve the right to refuse or cancel an order in cases of obvious pricing error, suspected
          fraud, or repeated returns abuse.
        </p>
      </InfoSection>

      <InfoSection title="Payments">
        <p>
          Payments are processed by third-party gateways; we never store your card details. Cash on
          delivery is available up to {formatMoney(10000)} and must be paid in full to the courier.
        </p>
      </InfoSection>

      <InfoSection title="Shipping and returns">
        <p>
          Delivery timelines and charges are set out in the <Link href="/shipping" className="text-ink underline underline-offset-4">shipping policy</Link>,
          and returns are governed by the <Link href="/returns" className="text-ink underline underline-offset-4">returns policy</Link>.
          Both form part of these terms.
        </p>
      </InfoSection>

      <InfoSection title="Product information">
        <p>
          We photograph products as accurately as we can, but screens and dye lots vary slightly. Care
          instructions on the label are part of the product description — damage caused by ignoring them
          is not covered.
        </p>
      </InfoSection>

      <InfoSection title="Intellectual property">
        <p>
          The {store.name} name, logo, product photography and site copy belong to us. You may share links
          and images for personal, non-commercial use; anything else needs written permission.
        </p>
      </InfoSection>

      <InfoSection title="Liability">
        <p>
          Our liability for any order is limited to the amount you paid for it. Nothing here limits rights
          you have under Indian consumer law.
        </p>
      </InfoSection>

      <InfoSection title="Governing law">
        <p>
          These terms are governed by the laws of India. Disputes are subject to the exclusive
          jurisdiction of the courts of Bengaluru, Karnataka.
        </p>
      </InfoSection>

      <InfoSection title="Changes">
        <p>
          We may update these terms from time to time. The version that applies to your order is the one
          published when you placed it.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
