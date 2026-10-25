import type { SiteContent } from "@/lib/types";
import { BrandLockup, Figure, Icon, Stars } from "./ui";

type P = { c: SiteContent };
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function Hero({ c, logoUrl }: P & { logoUrl?: string | null }) {
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
  return (
    <header className="hero">
      <div className="wrap">
        <div className="topnav">
          <BrandLockup name={c.brand.name} studio={c.brand.studio} small onLight />
          <nav aria-label="Navegação principal">
            <a href="#servicos">Serviços</a>
            <a href="#sobre">Sobre</a>
            <a href="#precos">Preços</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
        <div className="hero-grid">
          <div>
            <span className="eyebrow">
              {c.brand.studio} · {c.contact.address.city}
            </span>
            <h1 style={{ margin: 0 }}>
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
          />
        </div>
      </div>
    </header>
  );
}

export function Services({ c }: P) {
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
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
              <Icon name={s.icon} className="svc-ic" />
              <div>
                <h3>{s.title}</h3>
                <span className="b">{s.benefit}</span>
              </div>
              <a className="pr" href={book} {...ext} aria-label={`Agendar ${s.title}`} style={{ textDecoration: "none" }}>
                {s.priceLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery({ c }: P) {
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Portfólio</span>
          <h2>O trabalho fala por si.</h2>
        </div>
        <div className="gallery">
          {c.gallery.map((g, i) => (
            <Figure
              key={i}
              tone={g.tone}
              icon={g.icon}
              caption={g.caption}
              imageUrl={g.imageUrl}
              alt={g.alt}
              sizes="(max-width: 520px) 50vw, 25vw"
            />
          ))}
        </div>
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
            <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", marginTop: ".4rem" }}>{c.about.heading}</h2>
            <p className="pq">“{c.about.pullquote}”</p>
            <p className="lead">{c.about.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Prices({ c }: P) {
  return (
    <section id="precos" className="band band--white">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Tabela de preços · unhas</span>
          <h2>Transparente, como deve ser.</h2>
        </div>
        <div className="prices">
          {c.prices.map((p) => (
            <div className="price-row" key={p.name}>
              <span className="nm">{p.name}</span>
              <span className="dots" />
              <span className="pr">
                {p.price}
                <span className="du">{p.duration}</span>
              </span>
            </div>
          ))}
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
          <h2>Avaliação {c.stats.rating} no Fresha.</h2>
        </div>
        <div className="quotes">
          {c.testimonials.map((t, i) => (
            <figure className="quote" key={i} style={{ margin: 0 }}>
              <Icon name="quote" className="qi" />
              <blockquote style={{ margin: 0 }}>
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

export function Location({ c }: P) {
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
  const a = c.contact.address;
  return (
    <section id="contacto" className="band band--nude">
      <div className="wrap">
        <div className="finale">
          <div>
            <span className="eyebrow">
              <Icon name="pin" className="inline-ic" /> Onde estamos
            </span>
            <h2 style={{ fontSize: "clamp(1.9rem,4vw,2.6rem)", margin: ".4rem 0 .6rem" }}>{a.line}</h2>
            <p className="lead">
              {a.area}, {a.city} ·{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                <Icon name="clock" className="inline-ic" /> {c.contact.hours.toLowerCase()}
              </span>
            </p>
            <div className="hero-cta" style={{ marginTop: "1.4rem" }}>
              <a className="btn btn-gold" href={book} {...ext}>
                Agendar agora
              </a>
              <a className="btn btn-ghost" href={c.contact.whatsapp} {...ext}>
                WhatsApp
              </a>
            </div>
          </div>
          <a className="fig fig--rose" href={c.contact.maps} {...ext} style={{ textDecoration: "none", aspectRatio: "16/11" }}>
            <Icon name="pin" className="fig-ic" />
            <span className="fig-cap">Ver no mapa</span>
          </a>
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
          <p className="lead" style={{ color: "var(--nude)", maxWidth: "40ch" }}>
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
            <p style={{ userSelect: "all" }}>{c.contact.phoneDisplay}</p>
          </div>
          <div className="col">
            <span className="lbl">Siga</span>
            <a href={c.contact.instagram} {...ext}>
              <Icon name="ig" className="inline-ic" /> {c.contact.instagramHandle}
            </a>
          </div>
          <div className="col">
            <span className="lbl">Agende</span>
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
