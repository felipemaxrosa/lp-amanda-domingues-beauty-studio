import Link from "next/link";
import type { PriceItem, SiteContent, IconName } from "@/lib/types";
import { BrandLockup, Figure, Icon, Stars } from "./ui";
import { ServiceIcon, type ServiceIconName } from "./ServiceIcon";

type P = { c: SiteContent };
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const SERVICE_ICON: Record<IconName, ServiceIconName> = {
  nail: "manicure",
  makeup: "maquiagem",
  hair: "penteado",
  brow: "sobrancelhas",
};

export function Hero({ c, logoUrl }: P & { logoUrl?: string | null }) {
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <h1>
              <BrandLockup name={c.brand.name} studio={c.brand.studio} onLight imageUrl={logoUrl} />
            </h1>
            <p className="script">{c.brand.tagline}</p>
            <p className="lead">
              Manicure, maquilhagem, penteados e sobrancelhas em {c.contact.address.city} — com tempo, carinho e
              atenção ao detalhe.
            </p>
            <div className="hero-cta">
              <a className="btn btn-gold" href={book} {...ext}>
                <Icon name="cal" />
                Agendar
              </a>
              <a className="btn btn-ghost" href={c.contact.whatsapp} {...ext}>
                <Icon name="wa" />
                WhatsApp
              </a>
            </div>
            <p className="rating">
              <Stars /> <b>{c.stats.rating}</b> · {c.stats.appointments} atendimentos · {c.stats.clients} clientes
            </p>
          </div>
          <Figure
            tone="rose"
            icon="makeup"
            caption="Retrato / ambiente"
            tag={c.heroImageUrl ? undefined : "referência"}
            imageUrl={c.heroImageUrl}
            alt="Estúdio Amanda Domingues Beauty Studio, em Fonte da Cheira, Coimbra"
            priority
            sizes="(max-width: 860px) 100vw, 46vw"
          />
        </div>
      </div>
    </section>
  );
}

export function Services({ c }: P) {
  return (
    <section id="servicos" className="band band--white">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">O que fazemos</span>
          <h2>Quatro cuidados, um só lugar.</h2>
        </div>
        <div className="svc">
          {c.services.map((s, i) => (
            <div className="svc-row" key={s.title}>
              <span className="svc-no">{String(i + 1).padStart(2, "0")}</span>
              <ServiceIcon name={SERVICE_ICON[s.icon] ?? "manicure"} className="svc-ic" />
              <div>
                <h3>{s.title}</h3>
                <span className="b">{s.benefit}</span>
              </div>
              <span className="pr">{s.priceLabel}</span>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link className="btn btn-ghost" href="/precos">
            Ver tabela de preços
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Gallery({
  items,
  variant = "featured",
  showCta = false,
  eyebrow = "Portfólio",
  heading = "O trabalho fala por si.",
}: {
  items: SiteContent["gallery"];
  variant?: "featured" | "all";
  showCta?: boolean;
  eyebrow?: string;
  heading?: string;
}) {
  return (
    <section id="portfolio" className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
        </div>
        <div className={`gallery gallery--${variant}`}>
          {items.map((g, i) => (
            <Figure
              key={i}
              tone={g.tone}
              icon={g.icon}
              caption={g.imageUrl ? undefined : g.caption}
              imageUrl={g.imageUrl}
              alt={g.alt || "Trabalho de unhas — Amanda Domingues Beauty Studio"}
              sizes={variant === "featured" ? "(max-width:520px) 50vw, 25vw" : "(max-width:520px) 50vw, 33vw"}
            />
          ))}
        </div>
        {showCta && (
          <div className="section-cta">
            <Link className="btn btn-gold" href="/portfolio">
              Ver portfólio completo
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function About({ c }: P) {
  return (
    <section id="sobre" className="band band--nude">
      <div className="wrap">
        <div className="about">
          <Figure
            tone="rose"
            icon="makeup"
            caption="A Amanda"
            tag={c.about.imageUrl ? undefined : "referência"}
            imageUrl={c.about.imageUrl}
            alt={c.about.alt}
            className="order-ph"
            sizes="(max-width: 860px) 100vw, 45vw"
          />
          <div>
            <span className="eyebrow">{c.about.eyebrow}</span>
            <h2 className="text-[clamp(2rem,4vw,2.8rem)] mt-[.4rem]">{c.about.heading}</h2>
            <p className="pq">“{c.about.pullquote}”</p>
            <p className="lead">{c.about.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Prices({ c }: P) {
  const groups: { name: string; items: PriceItem[] }[] = [];
  for (const p of c.prices) {
    const key = p.group || "Serviços";
    let g = groups.find((x) => x.name === key);
    if (!g) {
      g = { name: key, items: [] };
      groups.push(g);
    }
    g.items.push(p);
  }
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
  return (
    <section id="precos" className="band band--white">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Tabela de preços</span>
          <h2>Transparente, como deve ser.</h2>
        </div>
        <div className="price-groups">
          {groups.map((g) => (
            <div className="price-group" key={g.name}>
              <h3 className="price-group__title">{g.name}</h3>
              <div className="prices">
                {g.items.map((p) => (
                  <div className="price-row" key={p.name}>
                    <span className="nm">{p.name}</span>
                    <span className="pr">
                      {p.price}
                      {p.duration && <span className="du">{p.duration}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <a className="btn btn-gold" href={book} {...ext}>
            <Icon name="cal" />
            Agendar no Fresha
          </a>
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ c }: P) {
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Quem já veio</span>
          <h2 className="rating-title">
            <Stars /> Avaliação <span className="num">{c.stats.rating}</span> no Fresha
          </h2>
        </div>
        <div className="quotes">
          {c.testimonials.map((t, i) => (
            <figure className="quote m-0" key={i}>
              <Icon name="quote" className="qi" />
              <blockquote className="m-0">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="who">{t.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ c }: P) {
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
  const a = c.contact.address;
  return (
    <section className="band band--nude">
      <div className="wrap cta-center">
        <span className="eyebrow">Vamos cuidar de si?</span>
        <h2>O seu momento de beleza começa aqui.</h2>
        <p className="lead">
          {a.line}, {a.city} · {c.contact.hours.toLowerCase()}
        </p>
        <div className="hero-cta cta-center__btns">
          <a className="btn btn-gold" href={book} {...ext}>
            <Icon name="cal" />
            Agendar
          </a>
          <a className="btn btn-ghost" href={c.contact.whatsapp} {...ext}>
            <Icon name="wa" />
            WhatsApp
          </a>
        </div>
        <Link className="cta-link" href="/contacto">
          Ver localização e contacto →
        </Link>
      </div>
    </section>
  );
}

export function ContactSection({ c }: P) {
  const a = c.contact.address;
  const q = encodeURIComponent(`${a.line}, ${a.area}, ${a.city}, Portugal`);
  const mapSrc = `https://www.google.com/maps?q=${q}&output=embed`;
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Contacto</span>
          <h2>Onde estamos</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="ci">
              <Icon name="pin" className="inline-ic" />
              <div>
                <b>{a.line}</b>
                <span>
                  {a.area}, {a.city}
                </span>
              </div>
            </div>
            <div className="ci">
              <Icon name="clock" className="inline-ic" />
              <div>
                <b>Horário</b>
                <span>{c.contact.hours}</span>
              </div>
            </div>
            <div className="ci">
              <Icon name="wa" className="inline-ic" />
              <div>
                <b>Telefone / WhatsApp</b>
                <span className="select-all">{c.contact.phoneDisplay}</span>
              </div>
            </div>
            <div className="ci">
              <Icon name="ig" className="inline-ic" />
              <div>
                <b>Instagram</b>
                <a href={c.contact.instagram} {...ext}>
                  {c.contact.instagramHandle}
                </a>
              </div>
            </div>
            <div className="hero-cta mt-[1.2rem]">
              <a className="btn btn-gold" href={book} {...ext}>
                <Icon name="cal" />
                Agendar
              </a>
              <a className="btn btn-ghost" href={c.contact.whatsapp} {...ext}>
                <Icon name="wa" />
                WhatsApp
              </a>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              title={`Mapa — ${c.brand.name} ${c.brand.studio}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer({ c, logoUrl }: P & { logoUrl?: string | null }) {
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
  const a = c.contact.address;
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="top">
          <BrandLockup name={c.brand.name} studio={c.brand.studio} imageUrl={logoUrl} />
          <p className="lead max-w-[40ch]">
            {c.brand.tagline}
          </p>
        </div>
        <div className="cols">
          <div className="col">
            <span className="lbl">Contacto</span>
            <p>{a.line}</p>
            <p>
              {a.area}, {a.city}
            </p>
            <p className="select-all">{c.contact.phoneDisplay}</p>
          </div>
          <div className="col">
            <span className="lbl">Navegar</span>
            <Link href="/portfolio">Portfólio</Link>
            <Link href="/precos">Preços</Link>
            <Link href="/contacto">Contacto</Link>
          </div>
          <div className="col">
            <span className="lbl">Siga / agende</span>
            <a href={c.contact.instagram} {...ext}>
              <Icon name="ig" className="inline-ic" /> {c.contact.instagramHandle}
            </a>
            <a href={book} {...ext}>
              Agendar no Fresha
            </a>
            <a href={c.contact.whatsapp} {...ext}>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="legal">
        <div className="wrap">
          <div className="row">
            <span>
              © {new Date().getFullYear()} {c.brand.name} {c.brand.studio}
            </span>
            <span>
              {c.contact.address.city} · {c.contact.address.country}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
