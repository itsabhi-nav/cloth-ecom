This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Brand, favicon & link previews

One mark drives every surface — browser tab, phone home screen, and the card shown when the
link is pasted into WhatsApp, Instagram, iMessage, X or Slack.

| Surface | File |
| --- | --- |
| Browser tab (legacy) | `app/favicon.ico` |
| Browser tab / Android | `app/icon.png` (512×512) |
| iOS home screen | `app/apple-icon.png` (180×180) |
| PWA / installable | `app/manifest.ts` + `public/brand/icon-*.png` |
| Share card (1200×630) | `app/opengraph-image.png` (+ `app/opengraph-image.alt.txt`) |

The header logo lives in `components/brand/logo.tsx` and uses the same geometry.

To change the mark, edit `scripts/generate-brand-assets.mjs`, then regenerate every file:

```bash
node scripts/generate-brand-assets.mjs
```

Set `NEXT_PUBLIC_SITE_URL` to your live domain (see `.env.example`) so shared links point at an
absolute image URL. Vercel deployments pick up their production domain automatically.
