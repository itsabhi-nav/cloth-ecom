import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { store } from "@/config/store.config";
import { InfoCta, InfoPage, InfoSection } from "@/components/layout/info-page";

export const metadata: Metadata = {
  title: "Track your order",
  description: `Where your ${store.fullName} order is and what to do if it stalls.`,
  alternates: { canonical: "/track" },
};

export default function TrackPage() {
  return (
    <InfoPage
      eyebrow="Help"
      title="Track your order"
      intro="Every order ships with a tracking link. Here is where to find it and what to do if it stops moving."
    >
      <div className="bg-card border-line flex items-start gap-3 rounded-2xl border p-5">
        <PackageSearch className="text-accent mt-0.5 size-5 shrink-0" aria-hidden />
        <div>
          <p className="text-[15px] font-semibold">Your tracking link is in your inbox</p>
          <p className="text-soft mt-1 text-[14px] leading-relaxed">
            Search your email and SMS for “shipped”. The link updates within a few hours of pickup and
            works for 30 days.
          </p>
        </div>
      </div>

      <InfoSection title="Nothing has moved in 48 hours">
        <p>
          Couriers occasionally miss a scan. If the last update is more than two working days old, email
          us the order number and we will raise a trace with them the same day.
        </p>
      </InfoSection>

      <InfoSection title="Marked delivered but not received">
        <p>
          Check with neighbours and your building reception first. If it is still missing, tell us within
          48 hours of the delivery scan and we will investigate with the courier and make it right.
        </p>
      </InfoSection>

      <InfoSection title="Need the order number?">
        <p>
          It starts with <span className="text-ink font-medium">{store.name}</span> and is in your order
          confirmation email. Still stuck? <Link href="/contact" className="text-ink underline underline-offset-4">Contact us</Link> with the
          email address you ordered with.
        </p>
      </InfoSection>

      <InfoCta href="/contact">Contact support</InfoCta>
    </InfoPage>
  );
}
