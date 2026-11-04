"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "./ui";
import { TrackedLink } from "./TrackedLink";
import { GA_EVENTS } from "@/lib/analytics";

const LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/precos", label: "Preços" },
  { href: "/formacoes", label: "Formações" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader({
  brandName,
  studio,
  monogramUrl,
  bookUrl,
}: {
  brandName: string;
  studio: string;
  monogramUrl?: string | null;
  bookUrl: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="hdr-brand" aria-label={`${brandName} ${studio}`}>
          {monogramUrl ? (
            <Image className="hdr-mono" src={monogramUrl} alt="" width={52} height={40} priority />
          ) : (
            <span className="brand sm brand--onlight">
              <span className="mono">AD</span>
            </span>
          )}
          <span className="hdr-name">{brandName}</span>
        </Link>

        <nav className="site-nav" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <TrackedLink event={GA_EVENTS.agendarClick} eventParams={{ location: "header" }} className="btn btn-gold site-nav__cta" href={bookUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="cal" />
            Agendar
          </TrackedLink>
        </nav>

        <button
          type="button"
          className="site-burger"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className="site-menu" aria-label="Menu">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <TrackedLink event={GA_EVENTS.agendarClick} eventParams={{ location: "header_menu" }} className="btn btn-gold" href={bookUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="cal" />
            Agendar
          </TrackedLink>
        </nav>
      )}
    </header>
  );
}
