import React, { useEffect, useState } from 'react'
import { useT, useLang } from './i18n.js'
import { rt } from './paths.js'
import { COMMON } from './content/index.js'
import { getConsent, setConsent, loadGoogleAnalytics } from './analytics.js'

// Événement global : le lien "Gérer les cookies" du pied de page l'émet
// pour rouvrir le bandeau, même après un premier choix.
export const REOPEN_EVENT = 'kiraku:open-cookie-settings';
export function openCookieSettings() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export default function CookieConsent() {
  const c = useT(COMMON).cookies;
  const lang = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const accept = () => { setConsent('accepted'); loadGoogleAnalytics(); setVisible(false); };
  const refuse = () => { setConsent('refused'); setVisible(false); };

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label={c.aria}>
      <div className="cookie-banner-inner">
        <img className="cookie-banner-seal" src="/assets/seal-red.png" alt="" aria-hidden="true" />
        <p className="cookie-banner-text">
          {c.texte}{' '}
          <a href={rt('cgv', null, lang, 'article-23')}>{c.enSavoirPlus}</a>
        </p>
        <div className="cookie-banner-actions">
          <button type="button" className="cookie-btn cookie-btn-ghost" onClick={refuse}>
            {c.refuser}
          </button>
          <button type="button" className="cookie-btn cookie-btn-accent" onClick={accept}>
            {c.accepter}
          </button>
        </div>
      </div>
    </div>
  );
}
