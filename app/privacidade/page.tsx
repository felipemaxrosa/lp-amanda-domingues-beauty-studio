import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { CookiePrefsButton } from "../components/CookiePrefsButton";

export const metadata: Metadata = {
  title: "Política de Privacidade e Cookies",
  description:
    "Como a Amanda Domingues Beauty Studio trata os dados pessoais e usa cookies (Google Analytics), e como gerir o teu consentimento.",
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const linkCls = "text-[var(--gold-ink)] hover:underline";

export default async function Privacidade() {
  const c = await getContent();
  const a = c.contact.address;

  return (
    <section className="band band--white">
      <div className="wrap">
        <div className="mx-auto max-w-[72ch]">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-3 text-[clamp(2rem,5vw,2.9rem)]">Política de Privacidade e Cookies</h1>
          <p className="lead mt-4">Última atualização: 4 de novembro de 2026.</p>

          <div className="mt-10 space-y-9 leading-relaxed text-[var(--brown)]">
            <section className="space-y-3">
              <h2 className="text-[1.35rem]">1. Responsável pelo tratamento</h2>
              <p>
                Os teus dados são tratados por{" "}
                <strong>
                  {c.brand.name} {c.brand.studio}
                </strong>
                , em {a.line}
                {a.venue ? `, ${a.venue}` : ""}, {a.area}, {a.city}, {a.country}. Para qualquer questão sobre
                privacidade, contacta-nos por telefone/WhatsApp ({c.contact.phoneDisplay}) ou pelo Instagram (
                {c.contact.instagramHandle}).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[1.35rem]">2. Que dados tratamos</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Dados de contacto e de agendamento</strong> que nos forneces ao marcar pela Fresha ou ao falar
                  connosco por WhatsApp/Instagram (ex.: nome, telefone, serviço pretendido).
                </li>
                <li>
                  <strong>Dados de navegação</strong> recolhidos por cookies de estatística (Google Analytics),{" "}
                  <em>apenas se consentires</em> — ver a secção 3.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-[1.35rem]">3. Cookies</h2>
              <p>
                Não usamos cookies não essenciais sem o teu consentimento. Se aceitares no banner, usamos o{" "}
                <strong>Google Analytics 4</strong> para perceber, de forma agregada, como o site é usado.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[0.9rem]">
                  <thead>
                    <tr className="border-b border-[var(--line)] text-left">
                      <th className="py-2 pr-4 font-medium">Cookie</th>
                      <th className="py-2 pr-4 font-medium">Finalidade</th>
                      <th className="py-2 pr-4 font-medium">Fornecedor</th>
                      <th className="py-2 font-medium">Duração</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[var(--line)]">
                      <td className="py-2 pr-4">_ga</td>
                      <td className="py-2 pr-4">Distinguir visitantes (estatística)</td>
                      <td className="py-2 pr-4">Google</td>
                      <td className="py-2">2 anos</td>
                    </tr>
                    <tr className="border-b border-[var(--line)]">
                      <td className="py-2 pr-4">{"_ga_<container>"}</td>
                      <td className="py-2 pr-4">Manter o estado da sessão (GA4)</td>
                      <td className="py-2 pr-4">Google</td>
                      <td className="py-2">2 anos</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-[1.35rem]">4. Google Analytics e transferências</h2>
              <p>
                O Google Analytics é fornecido pela Google Ireland Ltd. Os dados podem ser tratados fora do Espaço
                Económico Europeu (ex.: EUA), ao abrigo das cláusulas contratuais-tipo da Comissão Europeia. O endereço
                IP é tratado de forma anonimizada por predefinição no GA4. Mais informação na{" "}
                <a href="https://policies.google.com/privacy" {...ext} className={linkCls}>
                  política de privacidade da Google
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[1.35rem]">5. Agendamento (Fresha)</h2>
              <p>
                As marcações são geridas pela plataforma Fresha, que trata os teus dados enquanto subcontratante.
                Consulta a{" "}
                <a href="https://www.fresha.com/legal/privacy-policy" {...ext} className={linkCls}>
                  política de privacidade da Fresha
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[1.35rem]">6. O teu consentimento</h2>
              <p>
                Podes aceitar ou rejeitar os cookies de estatística no banner apresentado na primeira visita. Podes
                mudar de ideias a qualquer momento:
              </p>
              <div className="pt-1">
                <CookiePrefsButton />
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-[1.35rem]">7. Os teus direitos</h2>
              <p>
                Tens o direito de aceder, retificar, apagar, limitar ou opor-te ao tratamento dos teus dados, bem como à
                portabilidade. Para os exercer, contacta-nos pelos meios acima. Tens ainda o direito de apresentar
                reclamação à autoridade de controlo, a{" "}
                <a href="https://www.cnpd.pt" {...ext} className={linkCls}>
                  CNPD
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-[1.35rem]">8. Alterações</h2>
              <p>Esta política pode ser atualizada. A data no topo indica a última revisão.</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
