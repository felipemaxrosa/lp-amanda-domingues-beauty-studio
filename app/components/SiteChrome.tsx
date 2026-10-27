"use client";

import { usePathname } from "next/navigation";

/** Rotas "nuas" (sem header/rodapé do site), ex.: a página de proposta. */
const BARE_ROUTES = ["/proposta"];

/** Esconde o que envolve (header ou rodapé) nas rotas nuas. */
export function ChromeSlot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && BARE_ROUTES.includes(pathname)) return null;
  return <>{children}</>;
}
