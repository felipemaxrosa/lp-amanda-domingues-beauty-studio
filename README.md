# Amanda Domingues Beauty Studio — Landing Page

Site institucional / landing page de conversão para o **Amanda Domingues Beauty Studio**
(manicure, maquilhagem, penteados e sobrancelhas em Fonte da Cheira, Coimbra).
Objetivo: ranquear em buscas locais em Coimbra e converter em agendamento (Fresha + WhatsApp).

## Stack
- **Next.js 16** (App Router, TypeScript, **Turbopack**) + **React 19**
- **Sanity 6** como CMS (`next-sanity`; Studio embutido em `/studio` e publicado)
- **Tailwind CSS v4** (CSS-first): tokens da marca em `@theme` → utilities; efeitos próprios em `@layer components` ([`app/globals.css`](app/globals.css))
- Fontes **auto-hospedadas** (`next/font/local`): Cormorant Garamond, Jost, Petit Formal Script (RGPD-friendly)
- SEO: Metadata API, JSON-LD `BeautySalon`, `sitemap.xml`, `robots.txt`
- Deploy alvo: **Vercel**

## Começar
```bash
npm install
npm run dev        # http://localhost:3000 (Turbopack)
```
`.env.local` (necessário para ler do Sanity):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=3a2j22ey
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
NEXT_PUBLIC_SITE_URL=https://amandadominguesbeauty.pt
# Apenas para os scripts de conteúdo — NÃO é usado em runtime (o site lê anónimo):
SANITY_API_WRITE_TOKEN=<token com permissão Editor>
```
Sem `PROJECT_ID`, o site usa o **conteúdo "semente"** ([`lib/content.seed.ts`](lib/content.seed.ts)) como fallback.

> Rede com **Netskope**: o Node precisa confiar no CA. Neste ambiente já está resolvido via
> `NODE_EXTRA_CA_CERTS` (global). Em Node 22+ também existe a flag `--use-system-ca`.

## Conteúdo (Sanity)
- Modelos em [`sanity/schemaTypes.ts`](sanity/schemaTypes.ts): `siteSettings`, `service`, `testimonial`, `galleryItem`.
- [`getContent()`](lib/content.ts) lê do Sanity e faz *merge* sobre a semente (fallback para a semente em caso de erro).
- **Editável no Studio:** imagem do hero, secção "Sobre" (foto + textos), galeria/portfólio, serviços, depoimentos, contactos, números e textos de SEO.
- A **tabela de preços** detalhada vive no código ([`lib/content.seed.ts`](lib/content.seed.ts)) — é sempre usada via `merge`, não vem do Studio.
- **Studio:** `/studio` (embutido) e publicado em **https://amandadominguesbeauty.sanity.studio** (`npx sanity deploy`).
  Para editar em `localhost`, adicionar `http://localhost:3000` como **CORS origin** no projeto Sanity.
- ⚠️ IDs de documentos **sem ponto** (`service-nail`, `gallery-01`…): ids com `.` são tratados como privados no Sanity e não são lidos anonimamente.

## Imagens
- Fotos reais (hero, "Sobre", galeria) estão **no Sanity**, servidas via `cdn.sanity.io` (`next/image`; domínio já em [`next.config.ts`](next.config.ts)).
- O **logótipo** fica local em `public/logo/` (`lockup`/`monogram`/`og`), detetado automaticamente por [`lib/assets.ts`](lib/assets.ts).

## Scripts de conteúdo (one-off)
Correr com `--env-file` para carregar o token:
```bash
node --env-file=.env.local scripts/seed-sanity.mjs [--dry-run]    # migra/semeia conteúdo + imagens
node --env-file=.env.local scripts/set-hero.mjs caminho/foto.jpg  # troca a imagem do hero
```

## Rotas
| Rota | O quê |
|---|---|
| `/` | Home (hero, serviços, portfólio, sobre, depoimentos, CTA) |
| `/portfolio` | Galeria completa + lightbox |
| `/precos` | Tabela de preços agrupada |
| `/contacto` | Contactos + mapa Google |
| `/studio` | Sanity Studio (embutido) |
| `/proposta` | Proposta comercial — **privada** (`noindex`), sem header/rodapé |

Header e rodapé são ocultados em rotas "nuas" por [`app/components/SiteChrome.tsx`](app/components/SiteChrome.tsx).

## SEO
- Metadata + Open Graph em [`app/layout.tsx`](app/layout.tsx) (idioma `pt-PT`, keywords locais de Coimbra).
- JSON-LD `BeautySalon` em [`app/components/JsonLd.tsx`](app/components/JsonLd.tsx) (morada, geo, `aggregateRating`, serviços).
- `sitemap.xml` e `robots.txt` via rotas em `app/`.
- **Fora do código:** criar/reivindicar o **Google Business Profile** (maior alavanca do pacote local) e submeter o sitemap no Search Console.

## Deploy (Vercel)
1. Importar o repositório na Vercel.
2. Definir as variáveis `NEXT_PUBLIC_SANITY_*` e `NEXT_PUBLIC_SITE_URL` (o `SANITY_API_WRITE_TOKEN` **não** é necessário em produção).
3. Ligar o domínio (ex.: `amandadominguesbeauty.pt`).
4. (Opcional) Webhook do Sanity → revalidação para updates instantâneos.
5. Para o Studio publicado refletir mudanças de schema: `npx sanity deploy`.

## Scripts (npm)
| Comando | O quê |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build de produção (Turbopack) |
| `npm start` | Servir o build |
| `npm run lint` | ESLint (flat config) |

## Referência de design
Os mockups aprovados (incl. o seletor dos 3 modelos) estão em [`mockups/`](mockups/) — `editorial.html` é a direção escolhida.
