export type IconName = "nail" | "makeup" | "hair" | "brow";
export type Tone = "rose" | "nude";

export interface ServiceItem {
  title: string;
  benefit: string;
  priceLabel: string;
  icon: IconName;
}

export interface PriceItem {
  name: string;
  price: string;
  duration: string;
  group?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface GalleryItem {
  caption: string;
  icon: IconName;
  tone: Tone;
  /** URL resolvido da imagem no Sanity (quando existir). */
  imageUrl?: string;
  alt?: string;
}

export interface SiteContent {
  brand: { name: string; studio: string; tagline: string; bio: string };
  contact: {
    phoneDisplay: string;
    whatsapp: string;
    freshaBooking: string;
    freshaProfile: string;
    instagram: string;
    instagramHandle: string;
    address: { line: string; area: string; city: string; region: string; country: string; postalCode?: string };
    geo?: { lat: number; lng: number };
    hours: string;
    maps: string;
  };
  stats: { rating: string; appointments: string; clients: string; reviews: string };
  services: ServiceItem[];
  prices: PriceItem[];
  about: { eyebrow: string; heading: string; pullquote: string; body: string; imageUrl?: string; alt?: string };
  testimonials: Testimonial[];
  gallery: GalleryItem[];
  heroImageUrl?: string;
  seo: { title: string; description: string };
}
