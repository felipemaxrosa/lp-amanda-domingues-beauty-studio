import { getContent } from "@/lib/content";
import { Hero, Services, Gallery, About, Prices, Testimonials, Location, Footer } from "./components/Sections";
import { JsonLd } from "./components/JsonLd";

export const revalidate = 60;

export default async function Home() {
  const c = await getContent();
  return (
    <>
      <Hero c={c} />
      <main>
        <Services c={c} />
        <Gallery c={c} />
        <About c={c} />
        <Prices c={c} />
        <Testimonials c={c} />
        <Location c={c} />
      </main>
      <Footer c={c} />
      <JsonLd c={c} />
    </>
  );
}
