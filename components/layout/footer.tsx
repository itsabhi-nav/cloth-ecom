import Link from "next/link";
import { Mail, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { store } from "@/config/store.config";
import { Logo } from "@/components/brand/logo";

const columns = [
  {
    title: "Shop",
    links: store.nav.map((n) => ({ label: n.label, href: n.href })),
  },
  {
    title: "Help",
    links: [
      { label: "Track Order", href: "/track" },
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Journal", href: "/journal" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

const promises = [
  { icon: Truck, label: "Free shipping over ₹1,499" },
  { icon: Undo2, label: "7-day easy returns" },
  { icon: ShieldCheck, label: "Secure payments" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      {/* Promise strip */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-8 sm:justify-between">
          {promises.map((p) => (
            <div key={p.label} className="flex items-center gap-2.5 text-[13.5px] font-medium text-ink/80">
              <p.icon className="size-[18px]" aria-hidden />
              {p.label}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="text-soft mt-4 max-w-xs text-sm leading-relaxed">{store.description}</p>
            <p className="text-soft mt-6 flex items-center gap-2 text-sm">
              <Mail className="size-4" aria-hidden /> hello@{store.name.toLowerCase()}.store
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display mb-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-soft">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink/75 text-sm transition-colors hover:text-ink hover:underline hover:underline-offset-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-soft mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs">
          <p>© {new Date().getFullYear()} {store.fullName}. All rights reserved.</p>
          <p>Designed to convert. Built once, rebranded forever.</p>
        </div>
      </div>
    </footer>
  );
}
