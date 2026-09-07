import React from 'react'
import Layout, { useGo } from './Layout.jsx'
import Seo from './Seo.jsx'
import { HomePage } from './HomePage.jsx'
import { DetailPage, ItinerariesPage } from './DetailPage.jsx'
import { JaponPage, HistoirePage, GastronomiePage, GuidePage } from './JaponPages.jsx'
import { AboutPage, ContactPage, JournalPage } from './Pages.jsx'
import { CSEPage } from './CSEPage.jsx'
import { CGVPage } from './Legal.jsx'
import { CIRCUITS_LONG } from './HomePage.jsx'
import { SLUGS } from './paths.js'

// Une page = son SEO + le composant du design, alimenté par go().
function Page({ Comp, seo, ...rest }) {
  const go = useGo();
  return (
    <>
      <Seo {...seo} />
      <Comp go={go} {...rest} />
    </>
  );
}

function CircuitRoute({ circuitRef }) {
  const it = CIRCUITS_LONG.find(c => c.ref === circuitRef);
  const titre = it ? `${it.title}, ${it.duree.replace(' / ', ' et ')} au Japon · Kiraku Travel`
                   : 'Itinéraire au Japon · Kiraku Travel';
  return (
    <Page
      Comp={DetailPage}
      param={circuitRef}
      seo={{
        titre,
        description: it
          ? `${it.title}, itinéraire de ${it.duree} au Japon, écrit et accompagné par Kiraku Travel. Jour par jour, hébergements choisis, rythme sans hâte.`
          : 'Itinéraire sur-mesure au Japon avec Kiraku Travel.',
        path: '/itineraires/' + (SLUGS[circuitRef] || ''),
      }}
    />
  );
}

const circuitRoutes = Object.entries(SLUGS).map(([ref, slug]) => ({
  path: 'itineraires/' + slug,
  element: <CircuitRoute circuitRef={ref} />,
}));

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Page Comp={HomePage} seo={{
          titre: 'Kiraku Travel · Voyages sur-mesure au Japon, de un à huit voyageurs',
          description: "Agence de voyage française spécialisée sur le Japon. Itinéraires privés et petits groupes, écrits main dans la main avec vous, du Tokyo des néons aux cèdres millénaires.",
          path: '/',
        }} />,
      },
      {
        path: 'itineraires',
        element: <Page Comp={ItinerariesPage} seo={{
          titre: 'Nos itinéraires au Japon · Kiraku Travel',
          description: "Huit itinéraires signatures de sept à vingt-deux jours, seize séjours libertés et une extension à Okinawa. Tous adaptables, tous en voyage privé.",
          path: '/itineraires',
        }} />,
      },
      ...circuitRoutes,
      {
        path: 'le-japon',
        element: <Page Comp={JaponPage} seo={{
          titre: 'Le Japon avant le voyage · Kiraku Travel',
          description: "Comprendre le pays avant d'y aller : son histoire en trois ères, sa géographie racontée dans l'assiette, et ce que cela change à votre itinéraire.",
          path: '/le-japon',
        }} />,
      },
      {
        path: 'le-japon/histoire',
        element: <Page Comp={HistoirePage} seo={{
          titre: "Histoire du Japon, de Heian à Meiji · Kiraku Travel",
          description: "Heian, Edo, Meiji : trois ères qui expliquent les villes, les temples et les paysages que vous allez traverser.",
          path: '/le-japon/histoire',
        }} />,
      },
      {
        path: 'le-japon/gastronomie',
        element: <Page Comp={GastronomiePage} seo={{
          titre: 'Gastronomie japonaise, préfecture par préfecture · Kiraku Travel',
          description: "Tokyo, Kyoto, Osaka : ce que l'on mange, où, et pourquoi la géographie du Japon se lit dans l'assiette.",
          path: '/le-japon/gastronomie',
        }} />,
      },
      {
        path: 'guide-pratique',
        element: <Page Comp={GuidePage} seo={{
          titre: 'Guide pratique du Japon, métro, Suica, hiragana · Kiraku Travel',
          description: "La boîte à outils du voyage : métro et Shinkansen, carte Suica, usage des baguettes, hiragana, katakana, quinze kanji et trente phrases utiles.",
          path: '/guide-pratique',
        }} />,
      },
      {
        path: 'notre-approche',
        element: <Page Comp={AboutPage} seo={{
          titre: 'Notre approche du voyage au Japon · Kiraku Travel',
          description: "Ce que nous ne faisons pas, ce que nous faisons, et pourquoi nos itinéraires laissent de la place au vide.",
          path: '/notre-approche',
        }} />,
      },
      {
        path: 'journal',
        element: <Page Comp={JournalPage} seo={{
          titre: 'Le journal · Kiraku Travel',
          description: "Carnets de repérage, rencontres d'artisans et notes de saison, écrits depuis le Japon.",
          path: '/journal',
        }} />,
      },
      {
        path: 'cse-comites-entreprise',
        element: <Page Comp={CSEPage} seo={{
          titre: "Voyages au Japon pour CSE et comités d'entreprise · Kiraku Travel",
          description: "Offres dédiées aux comités sociaux et économiques : dotations, tarifs négociés, accompagnement des salariés et supports de communication prêts à diffuser.",
          path: '/cse-comites-entreprise',
        }} />,
      },
      {
        path: 'contact',
        element: <Page Comp={ContactPage} seo={{
          titre: 'Nous écrire · Kiraku Travel',
          description: "Trente minutes au téléphone, sans engagement, pour parler de votre voyage au Japon.",
          path: '/contact',
        }} />,
      },
      {
        path: 'cgv-mentions-legales',
        element: <Page Comp={CGVPage} seo={{
          titre: 'CGV et mentions légales · Kiraku Travel',
          description: "Conditions générales de vente, mentions légales et informations réglementaires de Kiraku Travel, immatriculée Atout France IM075260052.",
          path: '/cgv-mentions-legales',
        }} />,
      },
    ],
  },
];
