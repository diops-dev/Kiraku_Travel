import React from 'react'
export { LANGS, DEFAULT_LANG, LANG_NAMES, LANG_LABELS, HTML_LANG, OG_LOCALE, prefixe, langDe, pick } from './langs.js'
import { DEFAULT_LANG, pick } from './langs.js'

// Contexte de langue du site. La langue est lue dans l'URL par Layout.
export const LangContext = React.createContext(DEFAULT_LANG);
export function useLang() { return React.useContext(LangContext); }

// Hook de contenu : useT(HOME) rend le bloc de la langue courante.
export function useT(dico) {
  return pick(dico, React.useContext(LangContext));
}
