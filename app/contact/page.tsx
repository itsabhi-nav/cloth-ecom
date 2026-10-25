import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { store } from "@/config/store.config";
import { InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Contact",
  description: `Talk to the ${store.fullName} team about an order, a size, or a return.`,
  alternates: { canonical: "/contact" },
};

const email = `hello@${store.name.toLowerCase()}.store`;

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Help"
      title="Contact us"
      intro="Real people, one working day. Include your order number if your question is about an order and we will get to it faster."
    >
      <InfoSection title="Email">
        <p className="text-ink flex items-center gap-2 font-medium">
          <Mail className="size-4" aria-hidden />
          <a href={`mailto:${email}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">
            {email}
          </a>
        </p>
        <p>We reply Monday to Saturday, 10:00–18:00 IST.</p>
      </InfoSection>

      <InfoSection title="Order help">
        <p>
          Already ordered? Track it from the <Link href="/track" className="text-ink underline underline-offset-4">order tracking</Link> page.
          For size swaps and returns, see <Link href="/returns" className="text-ink underline underline-offset-4">returns & exchanges</Link>.
        </p>
        <p>
          Shipping timelines and charges are listed on the <Link href="/shipping" className="text-ink underline underline-offset-4">shipping</Link> page.
        </p>
      </InfoSection>

      <InfoSection title="Wholesale & press">
        <p>
          For stockist enquiries or press requests, write to the same address with “Wholesale” or “Press”
          in the subject line.
        </p>
      </InfoSection>
    </InfoPage>
  );
}
