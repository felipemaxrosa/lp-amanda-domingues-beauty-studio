import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { Icon } from "./components/ui";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function NotFound() {
  const c = await getContent();
  const book = c.contact.freshaBooking || c.contact.freshaProfile;

  return (
    <section className="hero">
      <div className="wrap py-[clamp(4rem,10vw,7rem)] text-center">
        <span className="eyebrow">Erro 404</span>
        <h1 className="mx-auto mt-4 max-w-[16ch] text-[clamp(2.2rem,6vw,3.8rem)] font-medium leading-[1.06]">
          Página não encontrada
        </h1>
        <p className="lead mx-auto mt-5 max-w-[46ch]">
          Esta página não existe (ou já saiu de cena) — mas o teu momento de beleza, sim. Vamos levar-te de volta.
        </p>
        <div className="hero-cta mt-8 justify-center">
          <Link className="btn btn-gold" href="/">
            <Icon name="pin" />
            Voltar ao início
          </Link>
          <a className="btn btn-ghost" href={book} {...ext}>
            <Icon name="cal" />
            Agendar
          </a>
        </div>
      </div>
    </section>
  );
}
