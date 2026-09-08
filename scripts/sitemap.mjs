// Genere public/sitemap.xml a partir de la table des URL (src/paths.js),
// dans les trois langues, avec les alternatives hreflang.
import { writeFileSync } from 'node:fs'
import { PATHS_L, ROUTE_KEYS, SLUGS_L, SEG_ITIN, alternatives } from '../src/paths.js'
import { LANGS, HTML_LANG } from '../src/langs.js'

const SITE = 'https://kirakutravel.com'
const today = new Date().toISOString().slice(0, 10)

const entrees = []
for (const lang of LANGS) {
  for (const key of ROUTE_KEYS) {
    entrees.push({ loc: PATHS_L[lang][key], key, ref: null, lang })
  }
  for (const ref of Object.keys(SLUGS_L[lang])) {
    entrees.push({ loc: (lang === 'fr' ? '' : '/' + lang) + '/' + SEG_ITIN[lang] + '/' + SLUGS_L[lang][ref], key: 'detail', ref, lang })
  }
}

const prio = (e) => {
  if (e.key === 'home') return e.lang === 'fr' ? '1.0' : '0.9'
  if (e.key === 'itineraries') return '0.9'
  if (e.key === 'detail') return '0.8'
  return '0.6'
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entrees.map(e => `  <url>
    <loc>${SITE}${e.loc}</loc>
${alternatives(e.key, e.ref).map(a => `    <xhtml:link rel="alternate" hreflang="${HTML_LANG[a.lang]}" href="${SITE}${a.path}"/>`).join('\n')}
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${prio(e)}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log('sitemap.xml :', entrees.length, 'URL')
