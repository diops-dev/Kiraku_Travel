import React from 'react'
import Layout, { useGo } from './Layout.jsx'
import Seo from './Seo.jsx'
import { HomePage } from './HomePage.jsx'
import { DetailPage, ItinerariesPage } from './DetailPage.jsx'
import { ModulePage } from './ModulePage.jsx'
import { JaponPage, HistoirePage, GastronomiePage, GuidePage } from './JaponPages.jsx'
import { AboutPage, ContactPage, JournalPage } from './Pages.jsx'
import { CSEPage } from './CSEPage.jsx'
import { CGVPage } from './Legal.jsx'
import { LANGS, prefixe } from './i18n.js'
import { rt, segment, SEG_ITIN, SEG_MOD, SLUGS_L, SLUGS_MOD_L } from './paths.js'
import { COMMON, ITIN } from './content/index.js'

// Une page = son SEO + le composant du design, alimente par go().
function Page({ Comp, seo, ...rest }) {
  const go = useGo();
  return (
    <>
      <Seo {...seo} />
      <Comp go={go} {...rest} />
    </>
  );
}

const PAGES_SIMPLES = [
  { key: 'itineraries', Comp: ItinerariesPage },
  { key: 'japon', Comp: JaponPage },
  { key: 'japon-histoire', Comp: HistoirePage },
  { key: 'japon-gastronomie', Comp: GastronomiePage },
  { key: 'guide', Comp: GuidePage },
  { key: 'about', Comp: AboutPage },
  { key: 'journal', Comp: JournalPage },
  { key: 'cse', Comp: CSEPage },
  { key: 'contact', Comp: ContactPage },
  { key: 'cgv', Comp: CGVPage },
];

function seoPage(lang, key) {
  const s = COMMON[lang].seo[key];
  return { ...s, path: rt(key, null, lang), lang, routeKey: key };
}

function seoCircuit(lang, ref) {
  const s = COMMON[lang].seo;
  const it = ITIN[lang].circuitsLong[ref];
  return {
    titre: it ? s.circuitTitre(it.title, it.duree) : s.circuitDefautTitre,
    description: it ? s.circuitDescription(it.title, it.duree) : s.circuitDefautDescription,
    path: rt('detail', ref, lang),
    lang,
    routeKey: 'detail',
    circuitRef: ref,
  };
}

function seoModule(lang, ref) {
  const s = COMMON[lang].seo;
  const mod = ITIN[lang].modules && ITIN[lang].modules[ref];
  const court = ITIN[lang].circuitsCourts[ref];
  const titre = mod ? mod.titre : (court ? court.title : ref);
  return {
    titre: s.circuitTitre ? s.circuitTitre(titre, mod ? mod.duree : '1 jour') : titre,
    description: mod ? mod.lede : s.circuitDefautDescription,
    path: rt('module', ref, lang),
    lang,
    routeKey: 'module',
    circuitRef: ref,
  };
}

function arbre(lang) {
  const enfants = [
    { index: true, element: <Page Comp={HomePage} seo={seoPage(lang, 'home')} /> },
    ...PAGES_SIMPLES.map(p => ({
      path: segment(p.key, lang),
      element: <Page Comp={p.Comp} seo={seoPage(lang, p.key)} />,
    })),
    ...Object.entries(SLUGS_L[lang]).map(([ref, slug]) => ({
      path: SEG_ITIN[lang] + '/' + slug,
      element: <Page Comp={DetailPage} param={ref} seo={seoCircuit(lang, ref)} />,
    })),
    ...Object.entries(SLUGS_MOD_L[lang]).map(([ref, slug]) => ({
      path: SEG_MOD[lang] + '/' + slug,
      element: <Page Comp={ModulePage} param={ref} seo={seoModule(lang, ref)} />,
    })),
  ];
  return { path: prefixe(lang) || '/', element: <Layout />, children: enfants };
}

export const routes = LANGS.map(arbre);
