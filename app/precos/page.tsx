import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { Prices } from "../components/Sections";
import { Reveal } from "../components/Reveal";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Preços — manicure, unhas de gel e mais em Coimbra",
  description:
    "Tabela de preços do Amanda Domingues Beauty Studio em Coimbra: manicure desde 12€, verniz de gel desde 20€, alongamentos, pedicure, penteados e mais.",
  alternates: { canonical: "/precos" },
};

export default async function PrecosPage() {
  const c = await getContent();
  return (
    <main>
      <Reveal>
        <Prices c={c} />
      </Reveal>
    </main>
  );
}
