/**
 * Generates every brand image the site needs from one source design:
 * favicon.ico, app icons, PWA icons, Apple touch icon and the social share card.
 *
 * Run: node scripts/generate-brand-assets.mjs
 * Outputs are committed, so this only needs re-running when the logo changes.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const ink = "#15130E";
const cream = "#F7F6F2";
const accent = "#AE5230";
const soft = "#6F6A61";

/** The mark, as raw SVG shapes — keeps every export pixel-identical. */
const mark = (size) => `
  <g transform="scale(${size / 512})">
    <rect width="512" height="512" rx="116" fill="${ink}"/>
    <path d="M138 380 256 132 374 380" fill="none" stroke="${cream}" stroke-width="48"
      stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M184.6 282H327.4L350.2 330H161.8Z" fill="${accent}"/>
  </g>`;

const square = (size, inner = mark(size)) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  ${inner}
</svg>`;

/** Full-bleed mark for maskable icons (safe zone = centre 80%). */
const maskable = (size) => {
  const pad = size * 0.12;
  const inner = size - pad * 2;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" fill="${ink}"/>
  <g transform="translate(${pad} ${pad})">${mark(inner)}</g>
</svg>`;
};

const og = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="${cream}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${accent}"/>
  <g transform="translate(516 88)">${mark(168)}</g>
  <text x="600" y="378" text-anchor="middle" fill="${ink}"
    font-family="Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    font-size="92" font-weight="600" letter-spacing="20">AUR</text>
  <rect x="568" y="412" width="64" height="4" rx="2" fill="${accent}"/>
  <text x="600" y="472" text-anchor="middle" fill="${soft}"
    font-family="Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    font-size="28" font-weight="400" letter-spacing="1">Everyday essentials, elevated</text>
  <text x="600" y="556" text-anchor="middle" fill="${ink}" fill-opacity="0.55"
    font-family="Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif"
    font-size="16" font-weight="600" letter-spacing="6">AUR STUDIO · SMALL-BATCH ESSENTIALS</text>
</svg>`;

/** Build a multi-size .ico whose entries are PNG-encoded (Vista+ format). */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

async function png(svg, size, { alpha = false } = {}) {
  let img = sharp(Buffer.from(svg), { density: 384 }).resize(size, size);
  // Next's .ico decoder requires RGBA PNG entries, even for fully opaque icons.
  if (alpha) img = img.ensureAlpha();
  return img.png().toBuffer();
}

async function main() {
  await mkdir(join(root, "public/brand"), { recursive: true });

  // App icons (Next.js picks these up automatically)
  await writeFile(join(root, "app/icon.png"), await png(square(512), 512));
  await writeFile(join(root, "app/apple-icon.png"), await png(square(512), 180));

  // PWA / home-screen icons
  await writeFile(join(root, "public/brand/icon-192.png"), await png(square(512), 192));
  await writeFile(join(root, "public/brand/icon-512.png"), await png(square(512), 512));
  await writeFile(join(root, "public/brand/icon-maskable-512.png"), await png(maskable(512), 512));

  // Legacy favicon.ico (16/32/48)
  const ico = buildIco(
    await Promise.all(
      [16, 32, 48].map(async (size) => ({ size, data: await png(square(512), size, { alpha: true }) }))
    )
  );
  await writeFile(join(root, "app/favicon.ico"), ico);

  // Social share card (WhatsApp, Instagram DMs, X, Facebook, Slack, iMessage…)
  const ogPng = await sharp(Buffer.from(og), { density: 144 })
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(join(root, "app/opengraph-image.png"), ogPng);

  console.log("Brand assets generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
