// Constantes de langue, sans dependance a React : ce module est aussi
// charge par les scripts de build (sitemap).
export const LANGS = ['fr', 'en', 'es'];
export const DEFAULT_LANG = 'fr';

export const LANG_NAMES = { fr: 'Francais', en: 'English', es: 'Espanol' };
export const LANG_LABELS = { fr: 'FR', en: 'EN', es: 'ES' };
export const HTML_LANG = { fr: 'fr', en: 'en', es: 'es' };
export const OG_LOCALE = { fr: 'fr_FR', en: 'en_GB', es: 'es_ES' };

// Prefixe d'URL de la langue : '' en francais, '/en', '/es'.
export function prefixe(lang) {
  return lang === DEFAULT_LANG ? '' : '/' + lang;
}

// Lit la langue dans un chemin d'URL.
export function langDe(pathname) {
  const seg = String(pathname || '/').split('/')[1];
  return LANGS.indexOf(seg) > 0 ? seg : DEFAULT_LANG;
}

// Choisit la variante de langue d'un dictionnaire { fr, en, es }.
export function pick(dico, lang) {
  return (dico && dico[lang]) || (dico && dico[DEFAULT_LANG]) || null;
}
