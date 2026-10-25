import { existsSync } from "node:fs";
import { join } from "node:path";

const has = (rel: string) => {
  try {
    return existsSync(join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
};
const pick = (...rels: string[]) => rels.find(has) ?? null;
const toUrl = (rel: string | null) => (rel ? "/" + rel : null);

/**
 * Deteta os logótipos reais em public/logo/ (drop-in).
 * Largue os ficheiros com estes nomes e eles passam a ser usados automaticamente:
 *   - logo/lockup.(svg|png|webp)       → transparente, usado no hero (claro) e no rodapé (escuro)
 *   - logo/lockup-dark.(png|webp)      → lockup em fundo escuro, usado na imagem de partilha (OG)
 *   - logo/monogram.(svg|png)          → monograma transparente (favicon/ícone — futuro)
 * Enquanto não existirem, usa-se a recriação tipográfica.
 */
export function getLogoAssets() {
  return {
    lockup: toUrl(pick("logo/lockup.svg", "logo/lockup.png", "logo/lockup.webp")),
    dark: toUrl(pick("logo/lockup-dark.png", "logo/lockup-dark.webp", "logo/og.png")),
    monogram: toUrl(pick("logo/monogram.svg", "logo/monogram.png")),
  };
}
