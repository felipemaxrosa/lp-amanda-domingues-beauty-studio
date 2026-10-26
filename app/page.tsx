import { getContent } from "@/lib/content";
import { getLogoAssets, buildContent } from "@/lib/assets";
import { Hero, Services, Gallery, About, Testimonials, CtaBand } from "./components/Sections";
import { Reveal } from "./components/Reveal";
import { JsonLd } from "./components/JsonLd";

export const revalidate = 60;

export default async function Home() {
  const content = buildContent(await getContent());
  const logo = getLogoAssets();
  const featured = content.gallery.slice(0, 8);

  return (
    <>
      <Hero c={content} logoUrl={logo.lockup} />
      <main>
        <Reveal>
          <Services c={content} />
        </Reveal>
        <Reveal>
          <Gallery items={featured} variant="featured" showCta />
        </Reveal>
        <Reveal>
          <About c={content} />
        </Reveal>
        <Reveal>
          <Testimonials c={content} />
        </Reveal>
        <Reveal>
          <CtaBand c={content} />
        </Reveal>
      </main>
      <JsonLd c={content} />
    </>
  );
}
