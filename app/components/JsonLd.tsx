import type { SiteContent } from "@/lib/types";
import { siteUrl } from "@/lib/env";

/** Structured data (Schema.org BeautySalon) para SEO local em Coimbra. */
export function JsonLd({ c }: { c: SiteContent }) {
  const a = c.contact.address;
  const data = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteUrl}/#business`,
    name: `${c.brand.name} ${c.brand.studio}`,
    description: c.seo.description,
    url: siteUrl,
    telephone: c.contact.phoneDisplay.replace(/\s/g, ""),
    image: c.heroImageUrl ? [c.heroImageUrl] : undefined,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.line,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: "PT",
    },
    geo: c.contact.geo
      ? { "@type": "GeoCoordinates", latitude: c.contact.geo.lat, longitude: c.contact.geo.lng }
      : undefined,
    areaServed: { "@type": "City", name: a.city },
    sameAs: [c.contact.instagram, c.contact.freshaProfile].filter(Boolean),
    hasMap: c.contact.maps,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: c.stats.rating.replace(",", "."),
      reviewCount: c.stats.reviews,
      bestRating: "5",
    },
    makesOffer: c.services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.benefit },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
