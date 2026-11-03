"use client";

import { usePathname } from "next/navigation";

/** Rotas "nuas" (sem header/rodapé do site). Vazio = todas as rotas têm chrome. */
const BARE_ROUTES: string[] = [];

/** Esconde o que envolve (header ou rodapé) nas rotas nuas. */
export function ChromeSlot({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && BARE_ROUTES.includes(pathname)) return null;
  return <>{children}</>;
}
