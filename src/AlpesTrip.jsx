import React from 'react'
import { rt } from './paths.js'
import { CAROUSELS, DetailCarousel, DetailDays, DetailFacts } from './DetailParts.jsx'
import { SejourTabs } from './inclusions.jsx'

// CL-09 · Tokyo, Kyoto et traversée méridionale des Alpes japonaises

export const ALPES = {
  ref: 'CL-09',
  title: 'Tokyo, Kyoto et traversée méridionale des Alpes japonaises',
  lede: "Une traversée méridionale des Alpes du nord, en cinq étapes sur la voie Omote Ginza, avec l'ascension d'un sommet à plus de 3 000 mètres. Cinq jours de haute montagne au-delà de 2 500 mètres, encadrés par Tokyo au départ et Kyoto à l'arrivée.",
  duree: '12 jours / 11 nuits',
  activite: 'Randonnée',
  niveau: 'Confirmé',
  groupe: '4 à 8 personnes',
  hebergement: 'Hôtels, refuges de montagne',
  prix: '3 990 €',
  prixSub: "par personne, base chambre twin · vols et transfert non inclus",
  inclus: [
    "5 nuits en hôtel équivalent 3 étoiles, chambre twin",
    "5 nuits en refuge de montagne, dont une nuit en ryokan avec accès aux onsen",
    "Guide francophone sur l'ensemble du séjour",
    "Transferts en train et en car du jour 1 au jour 12",
    "Portage de vos bagages jusqu'à Kyoto pendant le trek",
  ],
  options: [
    "Chambre individuelle en hôtel, selon disponibilité : 425 € pour les 5 nuits du séjour, puis 75 € par nuit supplémentaire",
    "Nuit supplémentaire à Tokyo ou Kyoto : 125 € par personne en chambre double, petit-déjeuner inclus",
    "Nuit supplémentaire en chambre individuelle : 200 €",
  ],
  departs: [
    { du: '27 septembre 2026', au: '8 octobre 2026', prix: '3 990,00 €' },
    { du: '1 août 2027', au: '12 août 2027', prix: '4 250,00 €' },
    { du: '26 septembre 2027', au: '7 octobre 2027', prix: '4 250,00 €' },
  ],
};

export const ALPES_DAYS = [
  { n: 1, title: 'Vol pour Tokyo', body: "Départ de France. Vol pour Tokyo, repas et nuit à bord selon l'horaire de votre compagnie.", tags: ['Vol'] },
  { n: 2, title: 'Arrivée à Tokyo', body: "Accueil à l'aéroport, transfert et installation à l'hôtel. Le reste de la journée est libre, le temps de laisser le décalage se poser.", tags: ['Transfert', 'Hôtel'] },
  { n: 3, title: 'Tokyo avec votre guide', body: "Journée dans la capitale avec votre guide tokyoïte, des grands sanctuaires aux quartiers qui ne dorment jamais. Petit-déjeuner, déjeuner et dîner inclus.", tags: ['Ville', 'Guide francophone'] },
  { n: 4, title: 'Tokyo, Matsumoto et Nakabusa onsen', body: "Vous confiez vos bagages à l'hôtel et ne gardez que vos affaires de trek pour les jours 5 à 10 : vous les retrouverez à Kyoto. Train jusqu'à Matsumoto (2 h 30), visite du château, puis route vers Nakabusa onsen (1 h), point de départ du trek. Nuit au refuge Ariake.", tags: ['Train', 'Château de Matsumoto', 'Refuge'] },
  { n: 5, title: 'Montée au refuge Enzanso et mont Tsubakuro', body: "L'itinérance débute par une montée régulière en forêt jusqu'au refuge Enzanso. Les premiers panoramas ouvrent sur les chaînes alpines. Après une halte au refuge, vous poursuivez jusqu'au mont Tsubakuro et ses roches granitiques aux formes étranges.", tags: ['Montée en forêt', 'Panorama', 'Refuge'] },
  { n: 6, title: "Sur la crête, vers le mont Jōnen", body: "Journée de crête à plus de 2 500 mètres. Une colonie de macaques est installée au pied du mont Jōnen : avec un peu de patience, vous les croiserez. Pour celles et ceux qui veulent prolonger, une variante ajoute un sommet à l'étape.", tags: ['Crête', 'Faune', 'Refuge'] },
  { n: 7, title: 'La voie Omote Ginza', body: "Le cœur de la traversée, sur la voie Omote Ginza. Le sentier suit la ligne de partage des eaux, entre pierriers et pentes d'herbe rase, avec les Alpes du nord de part et d'autre.", tags: ['Haute montagne', 'Refuge'] },
  { n: 8, title: "Ascension d'un sommet à plus de 3 000 mètres", body: "L'étape la plus haute du séjour, avec l'ascension d'un sommet à plus de 3 000 mètres. Départ tôt, sac allégé, et une vue qui porte jusqu'au Fuji par temps clair.", tags: ['Sommet', '3 000 m', 'Refuge'] },
  { n: 9, title: 'Descente vers la vallée et onsen', body: "Après cinq jours passés à randonner au-delà de 2 500 mètres, vous retrouvez la vallée. La descente traverse une végétation alpine, ses lacs et ses rivières. Retour en douceur, et longue soirée aux bains du ryokan Yarimikan. D+ 150 m, D- 1 550 m, 6 h 30 à 7 h de marche.", tags: ['Descente', 'Onsen', 'Ryokan'] },
  { n: 10, title: 'Kamikōchi, puis Kyoto', body: "Transfert en car jusqu'au village de Kamikōchi, la capitale des Alpes japonaises, et découverte de la vallée. Route vers Kyoto dans l'après-midi, retrouvailles avec vos bagages et installation à l'hôtel.", tags: ['Kamikōchi', 'Car', 'Hôtel'] },
  { n: 11, title: 'Kyoto', body: "Journée à Kyoto. Temples, jardins et ruelles de l'ancienne capitale, à pied et à votre rythme.", tags: ['Ville', 'Temples'] },
  { n: 12, title: 'Vol de retour', body: "Transfert vers l'aéroport et vol de retour vers la France.", tags: ['Vol'] },
];

const ALPES_ESSENTIALS = [
  { lbl: 'À partir de', val: '3 990 €', sub: 'par personne, base chambre twin' },
  { lbl: 'Prochain départ', val: '27 septembre 2026', sub: 'retour le 8 octobre, deux autres dates en 2027, en août et en septembre' },
  { lbl: 'Durée', val: '12 jours / 11 nuits', sub: 'dont 6 jours de trek, du jour 5 au jour 10' },
  { lbl: 'Niveau', val: 'Confirmé', sub: '5 à 7 h de marche par jour, jusqu'+"'"+'à 1 550 m de dénivelé négatif' },
  { lbl: 'Groupe', val: '4 à 8 personnes', sub: 'petit groupe, guide francophone de haute montagne' },
  { lbl: 'Hébergement', val: 'Hôtels et refuges', sub: '5 nuits en hôtel 3 étoiles, 5 nuits en refuge dont un ryokan' },
];

const ALPES_NOTE = "Les vols internationaux ne sont pas inclus, nous vous aidons à les réserver au meilleur horaire. Le circuit ne part qu'en août et en septembre, les sentiers d'altitude n'étant praticables qu'en été. Le trek se déroule cinq jours durant au-delà de 2 500 mètres, en autonomie de portage léger : vos bagages voyagent de Tokyo à Kyoto pendant que vous marchez. Une bonne condition physique et une expérience de la moyenne montagne sont nécessaires.";

const ALPES_RECAP = "Tokyo, 3 jours · Matsumoto · Nakabusa onsen · refuges Enzanso, Tsubakuro, Jōnen · voie Omote Ginza · sommet à 3 000 m · ryokan Yarimikan · Kamikōchi · Kyoto, 2 jours";

const ALPES_PLUS = [
  "Cinq jours de haute montagne au-delà de 2 500 mètres, sur la voie Omote Ginza",
  "L'ascension d'un sommet à plus de 3 000 mètres, sac allégé, départ au petit jour",
  "Petit groupe de 4 à 8 personnes, encadré par un guide francophone de haute montagne",
  "Vos bagages voyagent de Tokyo à Kyoto pendant que vous marchez, vous ne portez que le nécessaire",
  "Une nuit au ryokan Yarimikan et ses onsen, après la descente vers la vallée",
  "Tokyo au départ et Kyoto à l'arrivée, avec un guide sur chacune des deux villes",
];

const ALPES_FACTS = [
  { lbl: 'Prochain départ', val: '27 sept. 2026' },
  { lbl: 'Durée', val: '12 jours / 11 nuits' },
  { lbl: 'Niveau', val: 'Confirmé · 5 à 7 h de marche' },
  { lbl: 'Groupe', val: '4 à 8 personnes' },
  { lbl: 'Pension', val: 'Pension complète, jours 3 à 11' },
  { lbl: 'Hébergement', val: 'Hôtels 3★ et refuges' },
];

export function AlpesDetail({ go }) {
  return (
    <>
      <section className="detail-hero">
        <div className="wrap wrap-wide">
          <div className="crumbs">
            <a href={rt('home')} onClick={(e)=>{e.preventDefault();go('home')}}>Kiraku</a>
            <span>›</span>
            <a href={rt('itineraries')} onClick={(e)=>{e.preventDefault();go('itineraries')}}>Itinéraires</a>
            <span>›</span>
            <span style={{color:'var(--fg)'}}>Alpes japonaises, douze jours</span>
          </div>
          <div className="section-eyebrow">ITINÉRAIRE LONG · {ALPES.ref} · RANDONNÉE</div>
          <h1>{ALPES.title}</h1>
          <p className="lede">{ALPES.lede}</p>
        </div>
      </section>

      <section className="wrap wrap-wide">
        <div className="detail-layout">
          <div>
            <DetailCarousel slides={CAROUSELS['CL-09']} />
            <SejourTabs circuit={ALPES.ref} departs={ALPES.departs} note={ALPES_NOTE} plus={ALPES_PLUS} />

            <div className="section-head" style={{marginTop:72, marginBottom:24}}>
              <div className="left">
                <div className="section-eyebrow">LE DÉTAIL DU SÉJOUR</div>
                <h2>Douze jours, dont six en montagne.</h2>
                <div className="kicker">· le trek occupe les jours 5 à 10.</div>
              </div>
            </div>
            <DetailDays days={ALPES_DAYS} />
          </div>
          <aside className="detail-rail">
            <DetailFacts price={ALPES.prix} priceSub={ALPES.prixSub} cells={ALPES_FACTS} recap={ALPES_RECAP} formule="Circuit accompagné" go={go} circuitRef={ALPES.ref} />
          </aside>
        </div>
      </section>
    </>
  );
}

