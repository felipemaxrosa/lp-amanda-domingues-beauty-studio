"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

const KEY = "cookie-consent";

/** Lê a escolha guardada (client-only). Vazio = ainda não escolheu. */
function readConsent() {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}
// Não há mudanças externas a observar; o clique é tratado por estado local.
const subscribe = () => () => {};
// No servidor/hidratação não sabemos o estado — sentinela que esconde o banner.
const serverSnapshot = () => "server";

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, readConsent, serverSnapshot);
  const [dismissed, setDismissed] = useState(false);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* localStorage indisponível (ex.: janela privada) — segue na mesma */
    }
    window.gtag?.("consent", "update", { analytics_storage: value });
    setDismissed(true);
  }

  // Só mostra no cliente quando ainda não há escolha ("") e não foi dispensado agora.
  if (consent !== "" || dismissed) return null;

  return (
    <div role="dialog" aria-label="Consentimento de cookies" className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="mx-auto flex max-w-[min(42rem,100%)] flex-col gap-4 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[var(--shadow)] sm:flex-row sm:items-center sm:gap-5 sm:p-6">
        <p className="text-[0.85rem] leading-relaxed text-[var(--brown)]">
          Usamos cookies para perceber como o site é usado (Google Analytics) e melhorar a tua experiência.{" "}
          <Link href="/privacidade" className="font-medium text-[var(--gold-ink)] hover:underline">
            Saber mais
          </Link>
        </p>
        <div className="flex flex-none gap-3">
          <button type="button" className="btn btn-ghost" onClick={() => choose("denied")}>
            Rejeitar
          </button>
          <button type="button" className="btn btn-gold" onClick={() => choose("granted")}>
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
