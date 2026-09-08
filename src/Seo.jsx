import React from 'react'
import { Head } from 'vite-react-ssg'
import { HTML_LANG, LANGS, OG_LOCALE } from './i18n.js'
import { alternatives } from './paths.js'

export const SITE = 'https://kirakutravel.com';

// Titre, description, canonique, carte sociale et alternatives de langue.
export default function Seo({ titre, description, path = '/', image = '/photos/chureito-fuji-1280.webp', lang = 'fr', routeKey, circuitRef }) {
  const url = SITE + path;
  const alts = routeKey ? alternatives(routeKey, circuitRef) : [];
  return (
    <Head>
      <html lang={HTML_LANG[lang] || 'fr'} />
      <title>{titre}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {alts.map(a => (
        <link key={a.lang} rel="alternate" hrefLang={HTML_LANG[a.lang]} href={SITE + a.path} />
      ))}
      {alts.length ? <link rel="alternate" hrefLang="x-default" href={SITE + alts[0].path} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kiraku Travel" />
      <meta property="og:locale" content={OG_LOCALE[lang] || 'fr_FR'} />
      {LANGS.filter(l => l !== lang).map(l => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
      ))}
      <meta property="og:title" content={titre} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE + image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
