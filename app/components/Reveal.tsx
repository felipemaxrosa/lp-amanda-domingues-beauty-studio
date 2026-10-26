"use client";

import { useEffect, useRef, useState } from "react";

/** Revela o conteúdo ao entrar na viewport (fade + subida). Acessível e com fallback. */
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // prefers-reduced-motion é tratado por CSS (globals.css força .reveal visível),
    // por isso aqui só configuramos o observer — sem setState síncrono no efeito.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal${visible ? " is-visible" : ""}${className ? " " + className : ""}`}>
      {children}
    </div>
  );
}
