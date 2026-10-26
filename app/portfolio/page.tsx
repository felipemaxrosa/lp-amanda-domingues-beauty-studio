import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { buildGallery } from "@/lib/assets";
import { Gallery } from "../components/Sections";
import { Reveal } from "../components/Reveal";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Portfólio — unhas, maquilhagem e penteados em Coimbra",
  description:
    "Trabalhos reais do Amanda Domingues Beauty Studio em Coimbra: manicure, verniz de gel, nail art, maquilhagem, penteados e sobrancelhas.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const c = await getContent();
  const items = buildGallery(c);
  return (
    <main>
      <Reveal>
        <Gallery items={items} variant="all" eyebrow="Portfólio" heading="Trabalhos recentes" />
      </Reveal>
    </main>
  );
}
