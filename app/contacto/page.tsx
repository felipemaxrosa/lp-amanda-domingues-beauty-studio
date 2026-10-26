import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { ContactSection } from "../components/Sections";
import { Reveal } from "../components/Reveal";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contacto — Fonte da Cheira, Coimbra",
  description:
    "Amanda Domingues Beauty Studio — Rua João de Deus Ramos 146, Fonte da Cheira, Coimbra. Agende por Fresha ou WhatsApp. Veja o mapa e o horário.",
  alternates: { canonical: "/contacto" },
};

export default async function ContactoPage() {
  const c = await getContent();
  return (
    <main>
      <Reveal>
        <ContactSection c={c} />
      </Reveal>
    </main>
  );
}
