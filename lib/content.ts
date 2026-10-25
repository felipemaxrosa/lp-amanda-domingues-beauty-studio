import { seedContent } from "./content.seed";
import { hasSanity } from "./env";
import { client } from "./sanity.client";
import { SITE_QUERY } from "./queries";
import type { GalleryItem, ServiceItem, SiteContent, Testimonial } from "./types";

type Raw = {
  settings?: Partial<SiteContent> & { heroImageUrl?: string; about?: SiteContent["about"] };
  services?: ServiceItem[];
  testimonials?: Testimonial[];
  gallery?: GalleryItem[];
};

function merge(seed: SiteContent, raw: Raw): SiteContent {
  const s = raw.settings ?? {};
  return {
    brand: { ...seed.brand, ...(s.brand ?? {}) },
    contact: { ...seed.contact, ...(s.contact ?? {}) },
    stats: { ...seed.stats, ...(s.stats ?? {}) },
    about: { ...seed.about, ...(s.about ?? {}) },
    heroImageUrl: s.heroImageUrl ?? seed.heroImageUrl,
    seo: { ...seed.seo, ...(s.seo ?? {}) },
    services: raw.services?.length ? raw.services : seed.services,
    prices: seed.prices, // preços geridos aqui (ou mover para Sanity depois)
    testimonials: raw.testimonials?.length ? raw.testimonials : seed.testimonials,
    gallery: raw.gallery?.length ? raw.gallery : seed.gallery,
  };
}

export async function getContent(): Promise<SiteContent> {
  if (!hasSanity) return seedContent;
  try {
    const raw = await client.fetch<Raw>(SITE_QUERY);
    if (!raw || !raw.settings) return seedContent;
    return merge(seedContent, raw);
  } catch (err) {
    console.warn("[content] falha a obter do Sanity — a usar conteúdo semente.", err);
    return seedContent;
  }
}
