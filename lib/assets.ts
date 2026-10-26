import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { GalleryItem, SiteContent, Tone } from "./types";

const has = (rel: string) => {
  try {
    return existsSync(join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
};
const pick = (...rels: string[]) => rels.find(has) ?? null;
const toUrl = (rel: string | null) => (rel ? "/" + rel : null);

/**
 * Deteta os logótipos reais em public/logo/ (drop-in).
 * Largue os ficheiros com estes nomes e eles passam a ser usados automaticamente:
 *   - logo/lockup.(svg|png|webp)       → transparente, usado no hero (claro) e no rodapé (escuro)
 *   - logo/lockup-dark.(png|webp)      → lockup em fundo escuro, usado na imagem de partilha (OG)
 *   - logo/monogram.(svg|png)          → monograma transparente (favicon/ícone — futuro)
 * Enquanto não existirem, usa-se a recriação tipográfica.
 */
export function getLogoAssets() {
  return {
    lockup: toUrl(pick("logo/lockup.svg", "logo/lockup.png", "logo/lockup.webp")),
    dark: toUrl(pick("logo/lockup-dark.png", "logo/lockup-dark.webp", "logo/og.png")),
    monogram: toUrl(pick("logo/monogram.svg", "logo/monogram.png")),
  };
}

const IMG_RE = /\.(jpe?g|png|webp|avif)$/i;
function listDir(rel: string) {
  try {
    return readdirSync(join(process.cwd(), "public", rel))
      .filter((f) => IMG_RE.test(f))
      .sort()
      .map((f) => `/${rel}/${f}`);
  } catch {
    return [];
  }
}

/**
 * Fotos reais (drop-in). Largue os ficheiros em public/photos/:
 *   - public/photos/ambiente.jpg            → foto do hero (ambiente do estúdio)
 *   - public/photos/sobre.jpg               → retrato na secção "Sobre a Amanda"
 *   - public/photos/galeria/<qualquer>.jpg  → portfólio (quantas quiser; ordem alfabética)
 * Depois de migrar para o Sanity, pode apagar estas pastas.
 */
export function getPhotoAssets() {
  return {
    hero: toUrl(pick("photos/ambiente.jpg", "photos/ambiente.png", "photos/ambiente.webp")),
    about: toUrl(pick("photos/sobre.jpg", "photos/sobre.png", "photos/sobre.webp")),
    gallery: listDir("photos/galeria"),
  };
}

/** Galeria final: Sanity (se tiver imagens) → fotos locais → placeholders do seed. */
export function buildGallery(c: SiteContent): GalleryItem[] {
  if (c.gallery.some((g) => g.imageUrl)) return c.gallery;
  const photos = getPhotoAssets().gallery;
  if (!photos.length) return c.gallery;
  return photos.map((url, i) => ({
    caption: "",
    icon: c.gallery[i % c.gallery.length]?.icon ?? "nail",
    tone: (i % 2 ? "nude" : "rose") as Tone,
    imageUrl: url,
    alt: "Trabalho de unhas — Amanda Domingues Beauty Studio",
  }));
}

/** Conteúdo com fotos reais aplicadas (hero/sobre/galeria), com fallback. */
export function buildContent(c: SiteContent): SiteContent {
  const photos = getPhotoAssets();
  return {
    ...c,
    heroImageUrl: c.heroImageUrl ?? photos.hero ?? undefined,
    about: { ...c.about, imageUrl: c.about.imageUrl ?? photos.about ?? undefined },
    gallery: buildGallery(c),
  };
}
