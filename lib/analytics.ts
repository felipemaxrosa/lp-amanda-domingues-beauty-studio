/**
 * Eventos do Google Analytics (GA4) e helper de tracking.
 *
 * `trackEvent` é seguro no cliente: se o `gtag` não existir (dev/preview sem GA),
 * não faz nada. O consentimento é tratado pelo Consent Mode — antes de a
 * visitante aceitar, o GA regista em modo negado (sem cookies). Ver
 * app/components/Analytics.tsx e app/components/CookieConsent.tsx.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Nomes dos eventos GA4 (snake_case). Fonte única de verdade. */
export const GA_EVENTS = {
  agendarClick: "agendar_click",
  whatsappClick: "whatsapp_click",
  instagramClick: "instagram_click",
  formacaoWhatsappClick: "formacao_whatsapp_click",
} as const;

export type GaEvent = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];

/** Envia um evento para o GA4 (no-op se o gtag ainda não estiver disponível). */
export function trackEvent(event: GaEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
