import { groq } from "next-sanity";

export const SITE_QUERY = groq`{
  "settings": *[_type == "siteSettings"][0]{
    brand, contact, stats,
    about{ eyebrow, heading, pullquote, body, "imageUrl": image.asset->url, "alt": image.alt },
    "heroImageUrl": heroImage.asset->url,
    seo
  },
  "services": *[_type == "service"] | order(order asc){ title, benefit, priceLabel, icon },
  "testimonials": *[_type == "testimonial"] | order(order asc){ quote, author },
  "gallery": *[_type == "galleryItem"] | order(order asc){ caption, icon, tone, "imageUrl": image.asset->url, "alt": image.alt }
}`;
