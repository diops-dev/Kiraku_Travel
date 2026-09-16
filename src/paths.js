// Table des URL du site, dans les trois langues. Une seule source de verite :
// le mock Claude.design navigue par cles de route ('home', 'detail'...), le
// site reel navigue par URL. Ce module traduit les unes dans les autres.
import { DEFAULT_LANG, LANGS, prefixe } from './langs.js'

// Segment de tete des fiches circuit, par langue.
export const SEG_ITIN = { fr: 'itineraires', en: 'itineraries', es: 'itinerarios' };

// Segment de tete des fiches "sejour liberte" (modules CT et extension EX),
// par langue.
export const SEG_MOD = { fr: 'sejours-libertes', en: 'freedom-stays', es: 'estancias-libres' };

export const SLUGS_MOD_L = {
  fr: {
    'CT-01': 'le-tokyo-des-neons', 'CT-02': 'le-tokyo-d-edo', 'CT-03': 'tokyo-hauteurs-et-baie',
    'CT-04': 'le-tokyo-lettre', 'CT-05': 'le-tokyo-des-panoramas', 'CT-06': 'le-tokyo-de-l-imaginaire',
    'CT-07': 'yokohama', 'CT-08': 'enoshima-et-kamakura', 'CT-09': 'takaosan', 'CT-10': 'nikko',
    'CT-11': 'kyoto-centre', 'CT-12': 'kyoto-est', 'CT-13': 'kyoto-nord', 'CT-14': 'kyoto-fushimi-inari',
    'CT-15': 'osaka-nord', 'CT-16': 'osaka-sud', 'EX-01': 'l-ete-des-ryukyu',
  },
  en: {
    'CT-01': 'neon-tokyo', 'CT-02': 'edo-tokyo', 'CT-03': 'tokyo-of-heights-and-bay',
    'CT-04': 'literary-tokyo', 'CT-05': 'tokyo-of-panoramas', 'CT-06': 'tokyo-of-the-imagination',
    'CT-07': 'yokohama', 'CT-08': 'enoshima-and-kamakura', 'CT-09': 'takaosan', 'CT-10': 'nikko',
    'CT-11': 'central-kyoto', 'CT-12': 'eastern-kyoto', 'CT-13': 'northern-kyoto', 'CT-14': 'kyoto-ten-thousand-torii',
    'CT-15': 'osaka-the-city-that-eats', 'CT-16': 'popular-osaka', 'EX-01': 'ryukyu-summer',
  },
  es: {
    'CT-01': 'el-tokio-de-los-neones', 'CT-02': 'el-tokio-de-edo', 'CT-03': 'tokio-alturas-y-bahia',
    'CT-04': 'el-tokio-letrado', 'CT-05': 'el-tokio-de-los-panoramas', 'CT-06': 'el-tokio-de-lo-imaginario',
    'CT-07': 'yokohama', 'CT-08': 'enoshima-y-kamakura', 'CT-09': 'takaosan', 'CT-10': 'nikko',
    'CT-11': 'kioto-centro', 'CT-12': 'kioto-este', 'CT-13': 'kioto-norte', 'CT-14': 'kioto-diez-mil-torii',
    'CT-15': 'osaka-la-ciudad-que-come', 'CT-16': 'osaka-popular', 'EX-01': 'el-verano-de-las-ryukyu',
  },
};

export const REFS_MOD_L = Object.fromEntries(
  LANGS.map(l => [l, Object.fromEntries(Object.entries(SLUGS_MOD_L[l]).map(([r, s]) => [s, r]))])
);

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
// rt('module', 'CT-01', 'en') donne '/en/freedom-stays/ct-01'
export function rt(route, param, lang = DEFAULT_LANG, hash) {
  const l = LANGS.indexOf(lang) > -1 ? lang : DEFAULT_LANG;
  const avecHash = (chemin) => hash ? chemin + '#' + hash : chemin;
  if (route === 'detail') {
    const slug = SLUGS_L[l][param] || SLUGS_L[l]['CL-01'];
    return avecHash(prefixe(l) + '/' + SEG_ITIN[l] + '/' + slug);
  }
  if (route === 'module') {
    const slug = SLUGS_MOD_L[l][param];
    return avecHash(slug ? prefixe(l) + '/' + SEG_MOD[l] + '/' + slug : rt('itineraries', null, l));
  }
  return avecHash((PATHS_L[l] && PATHS_L[l][route]) || (prefixe(l) || '/'));
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
  const debutMod = '/' + SEG_MOD[lang] + '/';
  if (reste.indexOf(debutMod) === 0) {
    const slug = reste.slice(debutMod.length);
    return { lang, key: 'module', ref: REFS_MOD_L[lang][slug] || null };
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
