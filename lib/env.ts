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

/** Domínio final e canónico do site (metadata/SEO/sitemap/robots). */
export const CANONICAL_URL = "https://amandadominguesbeauty.pt";

/**
 * URL pública do site. Em produção é SEMPRE o domínio canónico — assim nenhuma
 * variável de ambiente desatualizada na Vercel (ex.: um URL *.vercel.app) pode
 * estragar o sitemap/canonical/OG. Fora de produção respeita
 * NEXT_PUBLIC_SITE_URL (ex.: http://localhost:3000 em dev). Só é usado no
 * servidor (sitemap, robots, layout, JsonLd), por isso pode ler VERCEL_ENV.
 */
export const siteUrl = (
  process.env.VERCEL_ENV === "production"
    ? CANONICAL_URL
    : process.env.NEXT_PUBLIC_SITE_URL || CANONICAL_URL
).replace(/\/$/, "");

/**
 * ID do Google Analytics (GA4). Só ativo em PRODUÇÃO — dev/preview não poluem
 * os dados. O id tem default no código, por isso não é preciso definir env var
 * na Vercel (opcionalmente, NEXT_PUBLIC_GA_ID substitui-o). Lido só no servidor
 * (layout), por isso pode usar VERCEL_ENV.
 */
export const gaId = (
  process.env.VERCEL_ENV === "production" ? process.env.NEXT_PUBLIC_GA_ID || "G-DVECEY1JY7" : ""
).trim();
