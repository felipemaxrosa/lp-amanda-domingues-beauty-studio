import { getContent } from "@/lib/content";
import { getLogoAssets } from "@/lib/assets";
import { Hero, Services, Gallery, About, Prices, Testimonials, Location, Footer } from "./components/Sections";
import { JsonLd } from "./components/JsonLd";

export const revalidate = 60;

export default async function Home() {
  const c = await getContent();
  const logo = getLogoAssets();
  return (
    <>
      <Hero c={c} logoUrl={logo.lockup} monogramUrl={logo.monogram} />
      <main>
        <Services c={c} />
        <Gallery c={c} />
        <About c={c} />
        <Prices c={c} />
        <Testimonials c={c} />
        <Location c={c} />
      </main>
      <Footer c={c} logoUrl={logo.lockup} />
      <JsonLd c={c} />
    </>
  );
}
