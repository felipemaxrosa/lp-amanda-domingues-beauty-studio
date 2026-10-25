import { defineType, defineField } from "sanity";

const ICONS = [
  { title: "Manicure (unha)", value: "nail" },
  { title: "Maquilhagem (pincel)", value: "makeup" },
  { title: "Penteado (cabelo)", value: "hair" },
  { title: "Sobrancelha", value: "brow" },
];

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Texto alternativo (acessibilidade/SEO)", type: "string" })],
  });

const siteSettings = defineType({
  name: "siteSettings",
  title: "Definições do site",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Marca",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Nome", type: "string" }),
        defineField({ name: "studio", title: "Sufixo (ex.: Beauty Studio)", type: "string" }),
        defineField({ name: "tagline", title: "Tagline", type: "string" }),
        defineField({ name: "bio", title: "Bio curta", type: "string" }),
      ],
    }),
    defineField({
      name: "contact",
      title: "Contacto",
      type: "object",
      fields: [
        defineField({ name: "phoneDisplay", title: "Telefone (visível)", type: "string" }),
        defineField({ name: "whatsapp", title: "Link WhatsApp (wa.me/...)", type: "url" }),
        defineField({ name: "freshaBooking", title: "Link de agendamento Fresha", type: "url" }),
        defineField({ name: "freshaProfile", title: "Perfil Fresha", type: "url" }),
        defineField({ name: "instagram", title: "Link Instagram", type: "url" }),
        defineField({ name: "instagramHandle", title: "@handle Instagram", type: "string" }),
        defineField({
          name: "address",
          title: "Morada",
          type: "object",
          fields: [
            defineField({ name: "line", title: "Rua e número", type: "string" }),
            defineField({ name: "area", title: "Zona/Bairro", type: "string" }),
            defineField({ name: "city", title: "Cidade", type: "string" }),
            defineField({ name: "region", title: "Distrito", type: "string" }),
            defineField({ name: "country", title: "País", type: "string" }),
            defineField({ name: "postalCode", title: "Código postal", type: "string" }),
          ],
        }),
        defineField({
          name: "geo",
          title: "Coordenadas",
          type: "object",
          fields: [
            defineField({ name: "lat", title: "Latitude", type: "number" }),
            defineField({ name: "lng", title: "Longitude", type: "number" }),
          ],
        }),
        defineField({ name: "hours", title: "Horário", type: "string" }),
        defineField({ name: "maps", title: "Link Google Maps", type: "url" }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Números",
      type: "object",
      fields: [
        defineField({ name: "rating", title: "Avaliação (ex.: 5,0)", type: "string" }),
        defineField({ name: "appointments", title: "Atendimentos", type: "string" }),
        defineField({ name: "clients", title: "Clientes", type: "string" }),
        defineField({ name: "reviews", title: "Nº de avaliações", type: "string" }),
      ],
    }),
    defineField({
      name: "about",
      title: "Sobre a Amanda",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Rótulo", type: "string" }),
        defineField({ name: "heading", title: "Título", type: "string" }),
        defineField({ name: "pullquote", title: "Frase em destaque", type: "string" }),
        defineField({ name: "body", title: "Texto", type: "text", rows: 4 }),
        imageWithAlt("image", "Foto"),
      ],
    }),
    imageWithAlt("heroImage", "Imagem do hero"),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título (meta)", type: "string", validation: (r) => r.max(65) }),
        defineField({ name: "description", title: "Descrição (meta)", type: "text", rows: 3, validation: (r) => r.max(160) }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Definições do site" }) },
});

const service = defineType({
  name: "service",
  title: "Serviço",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "benefit", title: "Benefício (frase curta)", type: "string" }),
    defineField({ name: "priceLabel", title: "Preço (ex.: A partir de 12€ / Sob consulta)", type: "string" }),
    defineField({ name: "icon", title: "Ícone", type: "string", options: { list: ICONS, layout: "radio" } }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
  orderings: [{ title: "Ordem", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "priceLabel" } },
});

const testimonial = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Texto", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "author", title: "Autor (ex.: Cliente verificada · Fresha)", type: "string" }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
  orderings: [{ title: "Ordem", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "quote", subtitle: "author" } },
});

const galleryItem = defineType({
  name: "galleryItem",
  title: "Portfólio (foto)",
  type: "document",
  fields: [
    defineField({ name: "caption", title: "Legenda", type: "string" }),
    defineField({ name: "icon", title: "Ícone (fallback s/ foto)", type: "string", options: { list: ICONS, layout: "radio" } }),
    defineField({
      name: "tone",
      title: "Tom (fallback s/ foto)",
      type: "string",
      options: { list: [{ title: "Rosé", value: "rose" }, { title: "Nude", value: "nude" }], layout: "radio" },
      initialValue: "rose",
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
    }),
    defineField({ name: "order", title: "Ordem", type: "number" }),
  ],
  orderings: [{ title: "Ordem", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "caption", media: "image" } },
});

export const schemaTypes = [siteSettings, service, testimonial, galleryItem];
