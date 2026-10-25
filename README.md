# Amanda Domingues Beauty Studio — Landing Page

Site institucional / landing page de conversão para o **Amanda Domingues Beauty Studio**
(manicure, maquilhagem, penteados e sobrancelhas em Fonte da Cheira, Coimbra).
Objetivo: ranquear em buscas locais em Coimbra e converter em agendamento (Fresha + WhatsApp).

## Stack
- **Next.js 15** (App Router, TypeScript) + **React 19**
- **Sanity.io** como CMS (Studio embutido em `/studio`)
- CSS próprio com tokens da marca (sem framework) — design "Editorial" aprovado
- Fontes **auto-hospedadas** (`next/font/local`): Cormorant Garamond, Jost, Petit Formal Script (RGPD-friendly)
- SEO: Metadata API, JSON-LD `BeautySalon`, `sitemap.xml`, `robots.txt`
- Deploy alvo: **Vercel**

## Começar
```bash
npm install
cp .env.example .env.local   # já existe um .env.local de dev
npm run dev                  # http://localhost:3000
```
Sem Sanity configurado, o site usa o **conteúdo "semente"** em [`lib/content.seed.ts`](lib/content.seed.ts)
(espelha o mockup). Basta editar esse ficheiro para mudar textos/preços enquanto o CMS não está ligado.

> Rede com **Netskope**: o Node precisa confiar no CA. Neste ambiente já está resolvido via
> `NODE_EXTRA_CA_CERTS` (global). Em Node 22+ também existe a flag `--use-system-ca`.

## Conteúdo (Sanity)
1. Criar projeto em https://www.sanity.io (ou `npx sanity login` depois `npx sanity init --env .env.local`).
2. Preencher em `.env.local`:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Abrir **`/studio`**, criar o documento **Definições do site** e os **Serviços / Depoimentos / Portfólio**.
4. Com o `PROJECT_ID` definido, o site passa a ler do Sanity automaticamente (fallback para a semente em caso de erro).

Modelos de conteúdo em [`sanity/schemaTypes.ts`](sanity/schemaTypes.ts): `siteSettings`, `service`, `testimonial`, `galleryItem`.

## Imagens
Hoje são **placeholders de referência**. As fotos reais (unhas, maquilhagem, penteado, sobrancelha, ambiente)
entram pelo Sanity — cada `galleryItem`/`heroImage`/`about.image` aceita upload com texto alternativo.
O `next/image` serve a partir de `cdn.sanity.io` (já configurado em `next.config.ts`).

## SEO
- Metadata + Open Graph em [`app/layout.tsx`](app/layout.tsx) (idioma `pt-PT`, keywords locais de Coimbra).
- JSON-LD `BeautySalon` em [`app/components/JsonLd.tsx`](app/components/JsonLd.tsx) (morada, geo, `aggregateRating`, serviços).
- `sitemap.xml` e `robots.txt` via rotas em `app/`.
- **Fora do código:** criar/reivindicar o **Google Business Profile** (maior alavanca do pacote local) e submeter o sitemap no Search Console.

## Deploy (Vercel)
1. Importar o repositório na Vercel.
2. Definir as variáveis de ambiente (`NEXT_PUBLIC_SANITY_*`, `NEXT_PUBLIC_SITE_URL`).
3. Ligar o domínio (ex.: `amandadominguesbeauty.pt`).
4. (Opcional) Webhook do Sanity → revalidação para updates instantâneos.

## Scripts
| Comando | O quê |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build de produção |
| `npm start` | Servir o build |
| `npm run lint` | ESLint |

## Referência de design
Os mockups aprovados (incl. o seletor dos 3 modelos) estão em [`mockups/`](mockups/) — `editorial.html` é a direção escolhida.
