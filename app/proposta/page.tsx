import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { Check, Icon } from "../components/ui";

// RASCUNHO para reagir — proposta comercial para a Amanda. Página privada (noindex).
export const metadata: Metadata = {
  title: "Proposta",
  robots: { index: false, follow: false },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function Proposta() {
  const c = await getContent();
  const book = c.contact.freshaBooking || c.contact.freshaProfile;
  // CTA da proposta → WhatsApp do Felipe (com mensagem pré-preenchida).
  const wa = (t: string) => `https://wa.me/5512981472329?text=${encodeURIComponent(t)}`;

  const valor = [
    { t: "Aparece no Google de Coimbra", d: "Quem procura “manicure” ou “unhas de gel em Coimbra” passa a encontrá-la. O site já foi preparado para isso (SEO)." },
    { t: "Transmite confiança", d: "Um site profissional diz “isto é a sério”. Quem chega pelo Instagram ou pelo passa-a-palavra fica — e marca." },
    { t: "Mostra o trabalho e os preços", d: "Portfólio, serviços e tabela de preços num só sítio, sempre a levar ao agendamento no Fresha." },
    { t: "Trabalha por si 24/7", d: "Bonito e rápido no telemóvel, a qualquer hora, sem depender de um algoritmo." },
  ];

  const editavel = [
    "A foto principal (hero)",
    "A secção “Sobre a Amanda” — foto e textos",
    "A galeria de trabalhos (portfólio)",
    "Os serviços e as suas descrições",
    "Os depoimentos de clientes",
    "Contactos, Instagram, WhatsApp e link do Fresha",
    "Os números (avaliação, atendimentos, clientes)",
  ];

  return (
    <>
      {/* ---------- Abertura: a página é a prova ---------- */}
      <section className="hero">
        <div className="wrap py-[clamp(3.5rem,8vw,6.5rem)] text-center">
          <span className="eyebrow">Proposta · para a Amanda</span>
          <h1 className="mx-auto mt-4 max-w-[18ch] text-[clamp(2.4rem,6vw,4.2rem)] font-medium leading-[1.05]">
            Isto que está a ver já é o seu site.
          </h1>
          <p className="lead mx-auto mt-5 max-w-[52ch]">
            Não é uma maquete nem uma promessa. É o site da <strong>{c.brand.name} {c.brand.studio}</strong> —
            pronto, no ar e feito ao detalhe. Esta proposta vive dentro dele, para a Amanda sentir exatamente o que os seus clientes vão sentir.
          </p>
          <div className="hero-cta mt-8 justify-center">
            <Link className="btn btn-gold" href="/">
              <Icon name="pin" />
              Ver o meu site
            </Link>
            <a className="btn btn-ghost" href="#planos">
              Ver os planos
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Porque muda tudo ---------- */}
      <section className="band band--white">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Porque muda tudo</span>
            <h2>Hoje: Fresha e Instagram. A partir de agora: uma casa sua.</h2>
          </div>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {valor.map((v, i) => (
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

      {/* ---------- Já está pronto ---------- */}
      <section className="band band--nude">
        <div className="wrap cta-center">
          <span className="eyebrow">Sem risco</span>
          <h2 className="max-w-[20ch]">Não está a comprar uma ideia. Já está pronto.</h2>
          <p className="lead max-w-[48ch]">
            Avaliação <strong>{c.stats.rating}★</strong> · {c.stats.appointments} atendimentos · {c.stats.clients} clientes já fazem parte da sua história.
            O site mostra tudo isso com o cuidado que a Amanda põe em cada cliente.
          </p>
          <div className="cta-center__btns hero-cta">
            <Link className="btn btn-gold" href="/">
              <Icon name="pin" />
              Explorar o site
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- O que pode editar sozinha ---------- */}
      <section className="band band--white">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">A Amanda no controlo</span>
            <h2>Muda o que quiser, quando quiser — em português.</h2>
            <p className="lead">
              O site vem com um painel simples (o Studio). Sem saber de código, a Amanda pode editar sozinha:
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {editavel.map((e, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check />
                <span className="text-[1.02rem]">{e}</span>
              </li>
            ))}
          </ul>
          <p className="lead mt-6 text-[.92rem] italic">
            A tabela de preços e ajustes ao desenho do site ficam comigo — conforme o plano que escolher.
          </p>
        </div>
      </section>

      {/* ---------- Planos ---------- */}
      <section id="planos" className="band band--nude">
        <div className="wrap">
          <div className="sec-head mx-auto text-center">
            <span className="eyebrow">Investimento</span>
            <h2>Dois planos. Ambos valem cada cêntimo.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Plano 1 */}
            <article className="relative flex flex-col rounded-2xl border-2 border-[var(--gold)] bg-white p-8 shadow-[var(--shadow)]">
              <span className="btn-gold absolute -top-3 left-8 rounded-full px-3 py-1 text-[.62rem] font-semibold uppercase tracking-[.18em]">
                Recomendado
              </span>
              <h3 className="text-[1.5rem] font-medium">Acompanhada</h3>
              <p className="lead mt-1 text-[.95rem]">Eu trato de tudo por si.</p>
              <div className="mt-5 flex items-end gap-3">
                <span className="text-[var(--muted)] text-[1.1rem] line-through">500€</span>
                <span className="font-display text-[2.8rem] font-semibold leading-none text-[var(--brown)]">300€</span>
              </div>
              <p className="mt-1 text-[.9rem] text-[var(--gold-ink)]">+ 20€/mês de manutenção</p>
              <ul className="mt-6 flex flex-col gap-3">
                {["Rondas de atualização semanais", "Conteúdos sempre a dia — eu edito por si", "Não precisa de mexer em nada", "Apoio contínuo"].map((x, i) => (
                  <li key={i} className="flex items-start gap-3 text-[.98rem]"><Check />{x}</li>
                ))}
              </ul>
              <a className="btn btn-gold mt-8 justify-center" href={wa("Olá Felipe! Quero avançar com a proposta do site — Plano Acompanhada (300€ + 20€/mês).")} {...ext}>
                Quero este plano
              </a>
            </article>

            {/* Plano 2 */}
            <article className="relative flex flex-col rounded-2xl border border-[var(--line)] bg-white p-8">
              <h3 className="text-[1.5rem] font-medium">Autónoma</h3>
              <p className="lead mt-1 text-[.95rem]">A Amanda no comando total.</p>
              <div className="mt-5 flex items-end gap-3">
                <span className="text-[var(--muted)] text-[1.1rem] line-through">700€</span>
                <span className="font-display text-[2.8rem] font-semibold leading-none text-[var(--brown)]">400€</span>
              </div>
              <p className="mt-1 text-[.9rem] text-[var(--gold-ink)]">sem mensalidade</p>
              <ul className="mt-6 flex flex-col gap-3">
                {["Controla o conteúdo no Studio", "Edita trabalhos, textos e fotos quando quiser", "Sem custo mensal", "Ajustes ao site a 50€ cada (pequenos)"].map((x, i) => (
                  <li key={i} className="flex items-start gap-3 text-[.98rem]"><Check />{x}</li>
                ))}
              </ul>
              <a className="btn btn-ghost mt-8 justify-center" href={wa("Olá Felipe! Quero avançar com a proposta do site — Plano Autónoma (400€).")} {...ext}>
                Quero este plano
              </a>
            </article>
          </div>
          <p className="lead mt-6 text-center text-[.85rem]">Valores de lançamento.</p>
        </div>
      </section>

      {/* ---------- Próximos passos ---------- */}
      <section className="band band--white">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Depois do sim</span>
            <h2>Dois passos para ir ainda mais longe.</h2>
            <p className="lead">Assim que avançarmos, trato também disto consigo:</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-[var(--line)] bg-white p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.25rem] font-medium">Domínio próprio</h3>
                <span className="flex-none rounded-full bg-[var(--nude-soft)] px-3 py-1 text-[.68rem] font-semibold uppercase tracking-[.12em] text-[var(--gold-ink)]">≈ 20€/ano</span>
              </div>
              <p className="lead mt-3 text-[.98rem]">
                Em vez de um endereço genérico, algo como <strong>amandadominguesbeauty.pt</strong> — mais profissional,
                mais confiança e melhor para o Google. O domínio é um custo anual à parte dos planos; eu faço a ligação.
              </p>
            </article>
            <article className="rounded-2xl border border-[var(--line)] bg-white p-7">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.25rem] font-medium">Google Business Profile</h3>
                <span className="flex-none rounded-full bg-[var(--nude-soft)] px-3 py-1 text-[.68rem] font-semibold uppercase tracking-[.12em] text-[var(--gold-ink)]">Grátis</span>
              </div>
              <p className="lead mt-3 text-[.98rem]">
                O registo que faz a Amanda aparecer no <strong>Google e no Maps</strong> quando procuram “manicure” ou
                “unhas em Coimbra” — a maior alavanca para novos clientes locais. Trato do registo e da otimização.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ---------- Fecho ---------- */}
      <section className="band band--nude">
        <div className="wrap cta-center">
          <p className="script text-[clamp(1.8rem,4vw,2.6rem)]">Vale o investimento?</p>
          <h2 className="max-w-[22ch]">Já está a usá-lo. Agora é só torná-lo oficialmente seu.</h2>
          <div className="cta-center__btns hero-cta">
            <a className="btn btn-gold" href={wa("Olá Felipe! Vi a proposta do site e quero falar.")} {...ext}>
              <Icon name="wa" />
              Falar e avançar
            </a>
            <a className="btn btn-ghost" href={book} {...ext}>
              Ver o Fresha
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
