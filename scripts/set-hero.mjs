// Troca a imagem do hero no Sanity: carrega um ficheiro de imagem (convertido
// para JPEG) e repointa siteSettings.heroImage.
//
// Uso:
//   node --env-file=.env.local scripts/set-hero.mjs public/hero-novo.png
//
// Requer SANITY_API_WRITE_TOKEN + NEXT_PUBLIC_SANITY_PROJECT_ID em .env.local.

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { basename, extname } from "node:path";
import sharp from "sharp";

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3a2j22ey").trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01").trim();
const token = (process.env.SANITY_API_WRITE_TOKEN || "").trim();

const src = process.argv[2];
if (!src) { console.error("✗ Falta o caminho da imagem (argv)"); process.exit(1); }
if (!token) { console.error("✗ Falta SANITY_API_WRITE_TOKEN em .env.local"); process.exit(1); }

const HERO_ALT = "Estúdio Amanda Domingues Beauty Studio, em Fonte da Cheira, Coimbra";

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function main() {
  console.log(`A otimizar ${src}…`);
  const jpeg = await sharp(readFileSync(src)).rotate().jpeg({ quality: 85, mozjpeg: true }).toBuffer();
  const filename = basename(src, extname(src)) + ".jpg";
  console.log(`A carregar para o Sanity (${(jpeg.length / 1024).toFixed(0)} KB)…`);
  const asset = await client.assets.upload("image", jpeg, { filename });
  console.log(`  asset: ${asset._id}`);
  await client
    .patch("siteSettings")
    .set({ heroImage: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: HERO_ALT } })
    .commit();
  console.log("✅ heroImage atualizado em siteSettings.");
}

main().catch((e) => { console.error("✗ Erro:", e?.message || e); process.exit(1); });
