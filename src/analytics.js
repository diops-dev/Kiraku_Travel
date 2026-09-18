// Google Analytics 4, chargé uniquement après consentement du visiteur.
// Voir CookieConsent.jsx pour le bandeau qui pilote ce module.

export const GA_MEASUREMENT_ID = 'G-6KH6ZE5L7Y';
export const CONSENT_KEY = 'kiraku-consent';

// 'accepted' | 'refused' | null (pas encore répondu)
export function getConsent() {
  try { return window.localStorage.getItem(CONSENT_KEY); }
  catch { return null; }
}

export function setConsent(value) {
  try { window.localStorage.setItem(CONSENT_KEY, value); }
  catch { /* stockage indisponible (navigation privée stricte, etc.) */ }
}

let loaded = false;

// Injecte gtag.js et démarre la mesure. Idempotent : sans effet si déjà
// chargé ou si aucun ID n'est configuré pour ce site.
export function loadGoogleAnalytics() {
  if (loaded || !GA_MEASUREMENT_ID || typeof window === 'undefined') return;
  loaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  // anonymize_ip : conforme aux recommandations CNIL pour limiter la
  // durée de conservation et l'identifiabilité des visiteurs.
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

// Au chargement de l'app, si le visiteur avait déjà accepté lors d'une
// visite précédente, on relance la mesure sans lui redemander.
export function initAnalyticsFromStoredConsent() {
  if (getConsent() === 'accepted') loadGoogleAnalytics();
}
