/**
 * Configuração do Sanity via variáveis de ambiente.
 * Enquanto não houver um Project ID real, o site funciona com o conteúdo
 * "semente" (lib/content.seed.ts). Assim que definir as variáveis em
 * .env.local, o conteúdo passa a vir do Sanity automaticamente.
 */
export const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
export const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
export const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01").trim();

/** true quando há um projeto Sanity configurado. */
export const hasSanity = projectId.length > 0;

/** URL pública do site (para metadata/SEO). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://amandadominguesbeauty.pt").replace(/\/$/, "");
