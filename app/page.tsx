import { getContent } from "@/lib/content";
import { getLogoAssets, getPhotoAssets } from "@/lib/assets";
import type { GalleryItem, Tone } from "@/lib/types";
import { Hero, Services, Gallery, About, Prices, Testimonials, Location, Footer } from "./components/Sections";
import { JsonLd } from "./components/JsonLd";

export const revalidate = 60;

export default async function Home() {
  const c = await getContent();
  const logo = getLogoAssets();
  const photos = getPhotoAssets();

  // Fotos: preferir Sanity (imageUrl já vem preenchido) → senão fotos locais → senão placeholders.
  const hasSanityGallery = c.gallery.some((g) => g.imageUrl);
  const gallery: GalleryItem[] = hasSanityGallery
    ? c.gallery
    : photos.gallery.length
      ? photos.gallery.map((url, i) => ({
          caption: `${c.brand.name} ${c.brand.studio}`,
          icon: c.gallery[i % c.gallery.length]?.icon ?? "nail",
          tone: (i % 2 ? "nude" : "rose") as Tone,
          imageUrl: url,
        }))
      : c.gallery;

  const content = {
    ...c,
    heroImageUrl: c.heroImageUrl ?? photos.hero ?? undefined,
    about: { ...c.about, imageUrl: c.about.imageUrl ?? photos.about ?? undefined },
    gallery,
  };

  return (
    <>
      <Hero c={content} logoUrl={logo.lockup} monogramUrl={logo.monogram} />
      <main>
        <Services c={content} />
        <Gallery c={content} />
        <About c={content} />
        <Prices c={content} />
        <Testimonials c={content} />
        <Location c={content} />
      </main>
      <Footer c={content} logoUrl={logo.lockup} />
      <JsonLd c={content} />
    </>
  );
}
