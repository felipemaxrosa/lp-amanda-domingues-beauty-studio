import localFont from "next/font/local";

// Fontes auto-hospedadas (RGPD-friendly, sem fetch externo no build/runtime).
export const display = localFont({
  src: [
    { path: "./fonts/CormorantGaramond-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/CormorantGaramond-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const body = localFont({
  src: [
    { path: "./fonts/Jost-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Jost-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Jost-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const script = localFont({
  src: [{ path: "./fonts/PetitFormalScript-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-script",
  display: "swap",
  fallback: ["Cormorant Garamond", "cursive"],
});
