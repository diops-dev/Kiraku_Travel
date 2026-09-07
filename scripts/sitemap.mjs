// Génère public/sitemap.xml à partir de la table des URL (src/paths.js).
import { writeFileSync } from 'node:fs'
import { PATHS, SLUGS } from '../src/paths.js'

const SITE = 'https://japonautrement.fr'
const today = new Date().toISOString().slice(0, 10)
const prio = { '/': '1.0', '/itineraires': '0.9' }

const urls = [
  ...Object.values(PATHS),
  ...Object.values(SLUGS).map(s => '/itineraires/' + s),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${SITE}${u === '/' ? '/' : u}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${prio[u] || (u.startsWith('/itineraires/') ? '0.8' : '0.6')}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log('sitemap.xml :', urls.length, 'URL')
