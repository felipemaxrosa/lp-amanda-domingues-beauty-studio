import type { Metadata, Viewport } from "next";
import "./globals.css";
import { display, body, script } from "./fonts";
import { getContent } from "@/lib/content";
import { getLogoAssets } from "@/lib/assets";
import { siteUrl } from "@/lib/env";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const fullName = `${c.brand.name} ${c.brand.studio}`;
  const og = getLogoAssets().dark;
  const ogImages = og ? [{ url: og, alt: fullName }] : undefined;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: c.seo.title, template: `%s · ${fullName}` },
    description: c.seo.description,
    applicationName: fullName,
    authors: [{ name: fullName }],
    generator: "Next.js",
    keywords: [
      "manicure Coimbra",
      "unhas de gel Coimbra",
      "verniz de gel Coimbra",
      "maquilhagem Coimbra",
      "penteados Coimbra",
      "sobrancelhas Coimbra",
      "nail art Coimbra",
      "Amanda Domingues Beauty Studio",
      "Fonte da Cheira",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "pt_PT",
      url: siteUrl,
      siteName: fullName,
      title: c.seo.title,
      description: c.seo.description,
      images: ogImages,
    },
    twitter: { card: "summary_large_image", title: c.seo.title, description: c.seo.description, images: og ? [og] : undefined },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  };
}

export const viewport: Viewport = {
  themeColor: "#FBF7F4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
