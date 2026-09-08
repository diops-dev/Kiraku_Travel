// Table des URL du site, dans les trois langues. Une seule source de verite :
// le mock Claude.design navigue par cles de route ('home', 'detail'...), le
// site reel navigue par URL. Ce module traduit les unes dans les autres.
import { DEFAULT_LANG, LANGS, prefixe } from './langs.js'

// Segment de tete des fiches circuit, par langue.
export const SEG_ITIN = { fr: 'itineraires', en: 'itineraries', es: 'itinerarios' };

export const SLUGS_L = {
  fr: {
    'CL-01': 'du-neon-au-silence',
    'CL-02': 'mille-marches-vers-le-nord',
    'CL-03': 'des-temples-aux-coraux',
    'CL-04': 'le-premier-souffle',
    'CL-05': 'au-coeur-du-vieux-japon',
    'CL-06': 'la-traversee-sans-hate',
    'CL-07': 'des-tours-aux-toits-de-chaume',
    'CL-08': 'jusqu-aux-cedres-millenaires',
    'CL-09': 'traversee-des-alpes-japonaises',
  },
  en: {
    'CL-01': 'from-neon-to-silence',
    'CL-02': 'a-thousand-steps-north',
    'CL-03': 'from-temples-to-coral',
    'CL-04': 'the-first-breath',
    'CL-05': 'the-heart-of-old-japan',
    'CL-06': 'the-unhurried-crossing',
    'CL-07': 'from-towers-to-thatched-roofs',
    'CL-08': 'to-the-thousand-year-cedars',
    'CL-09': 'japanese-alps-traverse',
  },
  es: {
    'CL-01': 'del-neon-al-silencio',
    'CL-02': 'mil-escalones-hacia-el-norte',
    'CL-03': 'de-los-templos-a-los-corales',
    'CL-04': 'el-primer-aliento',
    'CL-05': 'el-corazon-del-viejo-japon',
    'CL-06': 'la-travesia-sin-prisa',
    'CL-07': 'de-las-torres-a-los-tejados-de-paja',
    'CL-08': 'hasta-los-cedros-milenarios',
    'CL-09': 'travesia-de-los-alpes-japoneses',
  },
};

// Compatibilite avec l'ancien module monolingue.
export const SLUGS = SLUGS_L.fr;

export const REFS_L = Object.fromEntries(
  LANGS.map(l => [l, Object.fromEntries(Object.entries(SLUGS_L[l]).map(([r, s]) => [s, r]))])
);

// Chemins sans prefixe de langue. Le prefixe est ajoute par rt().
const BRUT = {
  fr: {
    home: '/',
    itineraries: '/itineraires',
    japon: '/le-japon',
    'japon-histoire': '/le-japon/histoire',
    'japon-gastronomie': '/le-japon/gastronomie',
    guide: '/guide-pratique',
    about: '/notre-approche',
    journal: '/journal',
    cse: '/cse-comites-entreprise',
    contact: '/contact',
    cgv: '/cgv-mentions-legales',
  },
  en: {
    home: '/',
    itineraries: '/itineraries',
    japon: '/japan',
    'japon-histoire': '/japan/history',
    'japon-gastronomie': '/japan/food',
    guide: '/travel-guide',
    about: '/our-approach',
    journal: '/journal',
    cse: '/works-councils',
    contact: '/contact',
    cgv: '/terms-and-legal-notice',
  },
  es: {
    home: '/',
    itineraries: '/itinerarios',
    japon: '/japon',
    'japon-histoire': '/japon/historia',
    'japon-gastronomie': '/japon/gastronomia',
    guide: '/guia-practica',
    about: '/nuestro-enfoque',
    journal: '/diario',
    cse: '/comites-de-empresa',
    contact: '/contacto',
    cgv: '/condiciones-y-aviso-legal',
  },
};

// URL completes, prefixe de langue compris.
export const PATHS_L = Object.fromEntries(
  LANGS.map(l => [l, Object.fromEntries(
    Object.entries(BRUT[l]).map(([k, v]) => [k, k === 'home' ? (prefixe(l) || '/') : prefixe(l) + v])
  )])
);

export const PATHS = PATHS_L.fr;

export const ROUTE_KEYS = Object.keys(BRUT.fr);

// Chemin relatif utilise par react-router dans l'arbre de routes d'une langue.
export function segment(key, lang) {
  return BRUT[lang][key].replace(/^\//, '');
}

// rt('detail', 'CL-02', 'en') donne '/en/itineraries/a-thousand-steps-north'
export function rt(route, param, lang = DEFAULT_LANG) {
  const l = LANGS.indexOf(lang) > -1 ? lang : DEFAULT_LANG;
  if (route === 'detail') {
    const slug = SLUGS_L[l][param] || SLUGS_L[l]['CL-01'];
    return prefixe(l) + '/' + SEG_ITIN[l] + '/' + slug;
  }
  return (PATHS_L[l] && PATHS_L[l][route]) || (prefixe(l) || '/');
}

// Chemin d'URL vers { lang, key, ref } , pour l'etat actif du menu et le hreflang.
export function analyser(pathname) {
  const brut = String(pathname || '/').replace(/\/+$/, '') || '/';
  const seg = brut.split('/')[1];
  const lang = LANGS.indexOf(seg) > 0 ? seg : DEFAULT_LANG;
  const reste = lang === DEFAULT_LANG ? brut : (brut.slice(('/' + lang).length) || '/');
  const debutItin = '/' + SEG_ITIN[lang] + '/';
  if (reste.indexOf(debutItin) === 0) {
    const slug = reste.slice(debutItin.length);
    return { lang, key: 'detail', ref: REFS_L[lang][slug] || null };
  }
  const trouve = Object.entries(BRUT[lang]).find(([, v]) => v === reste);
  return { lang, key: trouve ? trouve[0] : 'home', ref: null };
}

// Compatibilite : ancienne signature, cle de route seule.
export function routeKey(pathname) {
  return analyser(pathname).key;
}

// Les trois URL equivalentes d'une page, pour les balises hreflang.
export function alternatives(key, ref) {
  return LANGS.map(l => ({ lang: l, path: key === 'detail' ? rt('detail', ref, l) : rt(key, null, l) }));
}
