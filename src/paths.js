// Table des URL du site. Une seule source de vérité : le mock Claude.design
// navigue par clés de route ('home', 'detail'...), le site réel navigue par
// URL. Ce module traduit les unes dans les autres.

export const SLUGS = {
  'CL-01': 'du-neon-au-silence',
  'CL-02': 'mille-marches-vers-le-nord',
  'CL-03': 'des-temples-aux-coraux',
  'CL-04': 'le-premier-souffle',
  'CL-05': 'au-coeur-du-vieux-japon',
  'CL-06': 'la-traversee-sans-hate',
  'CL-07': 'des-tours-aux-toits-de-chaume',
  'CL-08': 'jusqu-aux-cedres-millenaires',
  'CL-09': 'traversee-des-alpes-japonaises',
};

export const REFS = Object.fromEntries(Object.entries(SLUGS).map(([r, s]) => [s, r]));

export const PATHS = {
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
};

// rt('detail', 'CL-02') → '/itineraires/mille-marches-vers-le-nord'
export function rt(route, param) {
  if (route === 'detail') return '/itineraires/' + (SLUGS[param] || 'du-neon-au-silence');
  return PATHS[route] || '/';
}

// Chemin d'URL → clé de route, pour l'état actif du menu.
export function routeKey(pathname) {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p.startsWith('/itineraires/')) return 'detail';
  const found = Object.entries(PATHS).find(([, v]) => v === p);
  return found ? found[0] : 'home';
}
