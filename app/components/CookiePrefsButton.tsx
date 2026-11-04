"use client";

/** Limpa a escolha guardada e recarrega — o banner de cookies reaparece. */
export function CookiePrefsButton() {
  function reset() {
    try {
      localStorage.removeItem("cookie-consent");
    } catch {
      /* ignora */
    }
    location.reload();
  }
  return (
    <button type="button" className="btn btn-ghost" onClick={reset}>
      Repor preferências de cookies
    </button>
  );
}
