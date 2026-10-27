import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { Check, Icon } from "../components/ui";

export const metadata: Metadata = {
  title: "Formação de Unhas — Molde F1 + Verniz Gel em Coimbra",
  description:
    "Formação de unhas em Coimbra: aprende a técnica de molde F1 e verniz de gel do zero, com teoria, prática e acompanhamento individual. Vagas limitadas — agenda a tua.",
  alternates: { canonical: "/formacoes" },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function Formacoes() {
  const c = await getContent();
  const wa = `${c.contact.whatsapp}?text=${encodeURIComponent("Olá! Quero saber mais sobre a formação Molde F1 + Verniz Gel.")}`;

  const porque = [
    { t: "Do zero ao profissional", d: "Começas sem experiência e sais a aplicar molde F1 e verniz de gel com confiança. Ideal para quem quer entrar na área das unhas." },
    { t: "A técnica mais procurada", d: "Molde F1 + verniz de gel é das técnicas com mais procura — aprende uma competência que te põe a faturar." },
    { t: "Atenção individual (1:1)", d: "Formação individual: o ritmo é teu e a atenção é toda tua. Tiras as dúvidas na prática, não só na teoria." },
    { t: "Evolução garantida", d: "Já trabalhas na área? O aperfeiçoamento afina a tua técnica e eleva os teus resultados." },
  ];

  const inclui = [
    "Teoria + prática",
    "Material durante a formação",
    "Acompanhamento individual",
    "Vagas limitadas",
  ];

  const cursos = [
    { nome: "Curso Molde F1 + Verniz Gel", sub: "Iniciante", preco: "120€", destaque: false },
    { nome: "Curso Intensivo 1:1", sub: "1 dia", preco: "150€", destaque: false },
    { nome: "Curso Completo", sub: "", preco: "180€", destaque: true },
    { nome: "Aperfeiçoamento", sub: "Para profissionais", preco: "90€", destaque: false },
    { nome: "Aula extra / Suporte individual", sub: "", preco: "40€", destaque: false },
  ];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="wrap py-[clamp(3.5rem,8vw,6.5rem)] text-center">
          <span className="eyebrow">Formação</span>
          <h1 className="mx-auto mt-4 max-w-[14ch] text-[clamp(2.6rem,7vw,4.6rem)] font-medium leading-[1.03]">
            Molde F1 + Verniz Gel
          </h1>
          <p className="script mx-auto">Aprende do zero</p>
          <p className="eyebrow mt-4">Técnica · Prática · Resultado</p>
          <p className="lead mx-auto mt-5 max-w-[52ch]">
            Transforma a tua paixão por unhas numa profissão — domina a técnica de molde F1 e verniz de gel, do primeiro
            ao último detalhe, com acompanhamento individual.
          </p>
          <div className="hero-cta mt-8 justify-center">
            <a className="btn btn-gold" href={wa} {...ext}>
              <Icon name="wa" />
              Agenda a tua vaga
            </a>
          </div>
          <p className="mt-4 text-[.72rem] font-semibold uppercase tracking-[.28em] text-[var(--gold-ink)]">Vagas limitadas</p>
        </div>
      </section>

      {/* ---------- Para quem / porquê ---------- */}
      <section className="band band--white">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Para quem é</span>
            <h2>Do zero — ou para subir de nível.</h2>
          </div>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {porque.map((v, i) => (
              <div key={i} className="flex gap-4">
                <Check />
                <div>
                  <h3 className="text-[1.3rem] font-medium">{v.t}</h3>
                  <p className="lead mt-1 text-[.98rem]">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- O que inclui ---------- */}
      <section className="band band--nude">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">O que inclui</span>
            <h2>Tudo o que precisas para evoluir.</h2>
          </div>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {inclui.map((e, i) => (
              <li key={i} className="flex items-start gap-3 text-[1.02rem]">
                <Check />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Tabela de preços ---------- */}
      <section className="band band--white">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Tabela de preços</span>
            <h2>Escolhe o teu formato.</h2>
          </div>
          <div className="mx-auto max-w-[620px] overflow-hidden rounded-2xl border border-[var(--line)] shadow-[var(--shadow)]">
            {cursos.map((cur, i) => (
              <div
                key={i}
                className={`flex items-center justify-between gap-4 px-6 py-5 ${i > 0 ? "border-t border-[var(--line)]" : ""} ${cur.destaque ? "bg-[var(--nude-soft)]" : "bg-white"}`}
              >
                <div>
                  <p className="font-display text-[1.15rem] leading-tight text-[var(--brown)]">
                    {cur.nome}
                    {cur.destaque && (
                      <span className="ml-2 inline-block rounded-full bg-[var(--gold-ink)] px-2.5 py-0.5 align-middle text-[.58rem] font-semibold uppercase tracking-[.14em] text-white">
                        Mais completo
                      </span>
                    )}
                  </p>
                  {cur.sub && <p className="mt-0.5 text-[.72rem] uppercase tracking-[.12em] text-[var(--muted)]">{cur.sub}</p>}
                </div>
                <span className="whitespace-nowrap font-display text-[1.7rem] font-semibold text-[var(--brown)]">{cur.preco}</span>
              </div>
            ))}
          </div>
          <div className="section-cta">
            <a className="btn btn-gold" href={wa} {...ext}>
              <Icon name="wa" />
              Quero inscrever-me
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Fecho ---------- */}
      <section className="band band--nude">
        <div className="wrap cta-center">
          <p className="script text-[clamp(1.8rem,4vw,2.6rem)]">Curso individual</p>
          <h2 className="max-w-[20ch]">Atenção total, evolução garantida.</h2>
          <div className="cta-center__btns hero-cta">
            <a className="btn btn-gold" href={wa} {...ext}>
              <Icon name="wa" />
              Falar no WhatsApp
            </a>
            <a className="btn btn-ghost" href={c.contact.instagram} {...ext}>
              <Icon name="ig" />
              {c.contact.instagramHandle}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
