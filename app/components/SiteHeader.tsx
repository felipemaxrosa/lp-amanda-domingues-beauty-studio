"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./ui";

const LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/precos", label: "Preços" },
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
            // eslint-disable-next-line @next/next/no-img-element
            <img className="hdr-mono" src={monogramUrl} alt="" />
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
          <a className="btn btn-gold site-nav__cta" href={bookUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="cal" />
            Agendar
          </a>
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
          <a className="btn btn-gold" href={bookUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="cal" />
            Agendar
          </a>
        </nav>
      )}
    </header>
  );
}
