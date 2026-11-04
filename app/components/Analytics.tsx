import Script from "next/script";

/**
 * Google Analytics (GA4) com Google Consent Mode v2.
 * O estado por omissão é NEGADO; só passa a "granted" depois de a visitante
 * aceitar no banner (ver CookieConsent). Lê a escolha já guardada para não
 * perder medição de quem voltou e já tinha aceitado.
 */
export function Analytics({ gaId }: { gaId: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga-bootstrap" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
var granted = false;
try { granted = localStorage.getItem('cookie-consent') === 'granted'; } catch (e) {}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage: granted ? 'granted' : 'denied'});
gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
