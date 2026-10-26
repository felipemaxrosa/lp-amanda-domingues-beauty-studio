// Migração do conteúdo "semente" + imagens locais para o Sanity.
//
// Uso:
//   node --env-file=.env.local scripts/seed-sanity.mjs --dry-run   (só mostra o que existe)
//   node --env-file=.env.local scripts/seed-sanity.mjs             (carrega imagens + cria documentos)
//
// Requer em .env.local:
//   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
//   SANITY_API_WRITE_TOKEN   (token com permissão Editor — NÃO é NEXT_PUBLIC_)
//
// Idempotente: usa _id fixos + createOrReplace; o Sanity deduplica imagens
// idênticas por hash, por isso re-correr não cria duplicados. O logo NÃO é
// migrado (fica em public/logo/, detetado por lib/assets.ts).
//
// IMPORTANTE: os _id NÃO podem conter ponto (".") — no Sanity, ids com ponto
// são tratados como privados (como "drafts.") e não são lidos sem token, mesmo
// num dataset público. Por isso usamos hífens (service-nail, gallery-01…).

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01").trim();
const token = (process.env.SANITY_API_WRITE_TOKEN || "").trim();
const dryRun = process.argv.includes("--dry-run");

if (!projectId) { console.error("✗ Falta NEXT_PUBLIC_SANITY_PROJECT_ID em .env.local"); process.exit(1); }
if (!token) { console.error("✗ Falta SANITY_API_WRITE_TOKEN (token Editor) em .env.local"); process.exit(1); }

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p) => join(root, "public", p);

// ---- Conteúdo (espelha lib/content.seed.ts) ----
const brand = {
  name: "Amanda Domingues",
  studio: "Beauty Studio",
  tagline: "Mais que beleza, é sobre você.",
  bio: "Beleza, cuidado e autoestima num só lugar.",
};
const contact = {
  phoneDisplay: "+351 932 965 698",
  whatsapp: "https://wa.me/351932965698",
  freshaBooking:
    "https://www.fresha.com/pt/a/amandadominguesbeauty-coimbra-rua-joao-de-deus-ramos-146-d8kru9kb/booking?share=true&pId=3027852&employeeId=5455049&back=%2Fp%2Famanda-domingues-6492286",
  freshaProfile: "https://www.fresha.com/pt/p/amanda-domingues-6492286?share=true&pId=3027852",
  instagram: "https://instagram.com/amandadomingues.beauty",
  instagramHandle: "@amandadomingues.beauty",
  address: {
    line: "Rua João de Deus Ramos 146",
    area: "Fonte da Cheira",
    city: "Coimbra",
    region: "Coimbra",
    country: "Portugal",
    postalCode: "3045",
  },
  geo: { lat: 40.1957, lng: -8.4486 },
  hours: "Atendimento por marcação",
  maps: "https://www.google.com/maps/search/?api=1&query=Rua+Jo%C3%A3o+de+Deus+Ramos+146+Coimbra",
};
const stats = { rating: "5,0", appointments: "282", clients: "114", reviews: "8" };
const about = {
  eyebrow: "Sobre a Amanda",
  heading: "Cada cliente é única.",
  pullquote: "É sobre você — sempre.",
  body: "Mais do que unhas bonitas ou uma maquilhagem perfeita, o que fica é a sensação de ter sido bem cuidada. É assim que a Amanda trabalha: com calma, carinho e olho no detalhe, do início ao fim.",
};
const seo = {
  title: "Amanda Domingues Beauty Studio — Manicure, Maquilhagem e Penteados em Coimbra",
  description:
    "Studio de beleza em Fonte da Cheira, Coimbra. Manicure e unhas de gel, maquilhagem, penteados e sobrancelhas, com atenção ao detalhe. Avaliação 5,0 ★. Agende já.",
};
const services = [
  { title: "Manicure", benefit: "Unhas que realçam a sua beleza", priceLabel: "A partir de 12€", icon: "nail" },
  { title: "Maquilhagem", benefit: "Beleza em cada detalhe", priceLabel: "Sob consulta", icon: "makeup" },
  { title: "Penteado", benefit: "Estilo para todas as ocasiões", priceLabel: "Sob consulta", icon: "hair" },
  { title: "Sobrancelhas", benefit: "Harmonia para o seu olhar", priceLabel: "Sob consulta", icon: "brow" },
];
const testimonials = [
  { quote: "Super simpática e profissional. O trabalho ficou impecável.", author: "Cliente verificada · Fresha" },
  { quote: "Superou as minhas expectativas. Volto de certeza.", author: "Cliente verificada · Fresha" },
  { quote: "Atenção e carinho do início ao fim. Recomendo muito.", author: "Cliente verificada · Fresha" },
];
const galleryFiles = ["01.jpeg", "02.jpeg", "03.jpeg", "04.jpeg", "05.jpeg", "06.jpeg", "07.jpeg"];

const HERO_ALT = "Estúdio Amanda Domingues Beauty Studio, em Fonte da Cheira, Coimbra";
const ABOUT_ALT = "Amanda a trabalhar no estúdio, em Coimbra";
const GALLERY_ALT = "Trabalho de unhas — Amanda Domingues Beauty Studio";

const imageField = (assetId, alt) => ({ _type: "image", asset: { _type: "reference", _ref: assetId }, alt });

async function uploadImage(relPath, label) {
  const buf = readFileSync(pub(relPath));
  const filename = relPath.split("/").pop();
  const asset = await client.assets.upload("image", buf, { filename });
  console.log(`  ↑ ${label.padEnd(14)} ${relPath} → ${asset._id}`);
  return asset._id;
}

async function main() {
  console.log(`\nSanity: projeto ${projectId} / dataset "${dataset}"${dryRun ? "  (DRY RUN)" : ""}\n`);

  const counts = await client.fetch(
    `{"siteSettings": count(*[_type=="siteSettings"]), "service": count(*[_type=="service"]), "testimonial": count(*[_type=="testimonial"]), "galleryItem": count(*[_type=="galleryItem"])}`
  );
  console.log("Documentos existentes:", counts);

  if (dryRun) {
    console.log("\nDry run — nada foi escrito. Remova --dry-run para migrar.\n");
    return;
  }

  console.log("\nA carregar imagens…");
  const heroAsset = await uploadImage("photos/ambiente.jpg", "hero");
  const aboutAsset = await uploadImage("photos/sobre.jpg", "sobre");
  const galleryAssets = [];
  for (const f of galleryFiles) galleryAssets.push(await uploadImage(`photos/galeria/${f}`, `galeria/${f}`));

  // Remove quaisquer versões antigas destes tipos (ex.: ids com ponto, privados).
  console.log("\nA limpar documentos antigos (service/testimonial/galleryItem)…");
  await client.delete({ query: '*[_type in ["service","testimonial","galleryItem"]]' });

  console.log("A criar/atualizar documentos…");
  const tx = client.transaction();
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brand,
    contact,
    stats,
    about: { ...about, image: imageField(aboutAsset, ABOUT_ALT) },
    heroImage: imageField(heroAsset, HERO_ALT),
    seo,
  });
  services.forEach((s, i) => tx.createOrReplace({ _id: `service-${s.icon}`, _type: "service", ...s, order: i + 1 }));
  testimonials.forEach((t, i) =>
    tx.createOrReplace({ _id: `testimonial-${i + 1}`, _type: "testimonial", ...t, order: i + 1 })
  );
  galleryAssets.forEach((assetId, i) =>
    tx.createOrReplace({
      _id: `gallery-${String(i + 1).padStart(2, "0")}`,
      _type: "galleryItem",
      caption: "",
      icon: "nail",
      tone: i % 2 ? "nude" : "rose",
      image: imageField(assetId, GALLERY_ALT),
      order: i + 1,
    })
  );
  await tx.commit();

  console.log(
    `\n✅ Concluído: 1 siteSettings, ${services.length} serviços, ${testimonials.length} depoimentos, ${galleryAssets.length} fotos de portfólio.\n`
  );
}

main().catch((e) => {
  console.error("\n✗ Erro na migração:", e?.message || e);
  process.exit(1);
});
