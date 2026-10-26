"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Item = { url: string; alt?: string };

export function PortfolioGallery({ items }: { items: Item[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const open = idx !== null;

  const close = useCallback(() => setIdx(null), []);
  const prev = useCallback(() => setIdx((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length]);
  const next = useCallback(() => setIdx((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, prev, next]);

  return (
    <>
      <div className="gallery gallery--all">
        {items.map((it, i) => (
          <button key={i} type="button" className="fig fig--rose gallery-btn" onClick={() => setIdx(i)} aria-label={`Abrir imagem ${i + 1} de ${items.length}`}>
            <Image src={it.url} alt={it.alt || ""} fill sizes="(max-width:520px) 50vw, 33vw" className="object-cover" />
          </button>
        ))}
      </div>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Portfólio" onClick={close}>
          <button type="button" className="lb-close" aria-label="Fechar" onClick={close}>
            ×
          </button>
          <button
            type="button"
            className="lb-nav lb-prev"
            aria-label="Imagem anterior"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            ‹
          </button>
          <figure className="lb-stage" onClick={(e) => e.stopPropagation()}>
            <Image src={items[idx!].url} alt={items[idx!].alt || ""} fill sizes="92vw" className="object-contain" priority />
            <figcaption className="lb-count">
              {idx! + 1} / {items.length}
            </figcaption>
          </figure>
          <button
            type="button"
            className="lb-nav lb-next"
            aria-label="Imagem seguinte"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
