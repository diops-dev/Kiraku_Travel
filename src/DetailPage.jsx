import React from 'react'
import { CIRCUITS_SHORT, EXTENSIONS } from './HomePage.jsx'
import { rt } from './paths.js'
import { AlpesDetail } from './AlpesTrip.jsx'
import { CAROUSELS, DetailCarousel, DetailDays, DetailFacts } from './DetailParts.jsx'
import { CIRCUITS_LONG, ItineraryCard } from './HomePage.jsx'
import { SejourTabs } from './inclusions.jsx'

// Itinerary Detail page

const DAYS_KUNISAKI = [
  { n: 1, title: 'Arrivée à Oita, dîner chez Mariko-san', body: 'Vol direct Paris → Tokyo, puis Shinkansen jusqu\'à Kokura, puis ligne locale. On vous attend à la gare avec un thermos. Dîner familial au minshuku, du poisson grillé, du riz local, et un long bain.', tags: ['Train local', 'Minshuku', 'Cuisine maison'] },
  { n: 2, title: 'Premier sentier : Futagoji', body: 'Trente kilomètres à pied à travers les temples Tendai cachés dans la forêt. On marche lentement. Pause de midi chez un moine qui prépare son propre nattō.', tags: ['Randonnée', 'Temple', 'Déjeuner au temple'] },
  { n: 3, title: 'Atelier de teinture aizome avec Tanaka-san', body: 'Journée entière à apprendre la teinture à l\'indigo. Tanaka-san a 78 ans, n\'a pas internet, et vous laissera repartir avec votre propre tissu, séché au vent.', tags: ['Artisanat', 'Une journée entière'] },
  { n: 4, title: 'Onsen secret à Beppu, version locale', body: 'Pas les onsens du guide. Un petit bain de quartier où on paye 200 yens à une dame qui vous donne une serviette. Sieste l\'après-midi, dîner d\'izakaya le soir.', tags: ['Onsen', 'Izakaya'] },
  { n: 5, title: 'Le marché de poissons de Saiki', body: 'Lever 5 h. On y croise les pêcheurs qui rentrent, on choisit le déjeuner sur place, et un cuisinier nous le prépare en sashimi à 10 h du matin. Après-midi libre.', tags: ['Marché', 'Repas'] },
  { n: 6, title: 'Bain de forêt au mont Tsurumi', body: 'Marche douce, six heures, pause méditation dans une clairière. Repas du soir au ryokan, kaiseki saisonnier, neuf petits plats préparés par la patronne.', tags: ['Marche douce', 'Kaiseki'] },
  { n: 7, title: 'Retour à Fukuoka, dernier kissaten', body: 'On rentre tranquillement à Fukuoka. Un dernier café dans un kissaten d\'avant-guerre tenu par le même monsieur depuis 47 ans, et c\'est terminé.', tags: ['Kissaten', 'Retour'] },
];

const KUNISAKI_ESSENTIALS = [
  { lbl: 'À partir de', val: '3 980 €', sub: 'par voyageur, base chambre double' },
  { lbl: 'Départs', val: 'À la date de votre choix', sub: 'voyage privé, sans date imposée' },
  { lbl: 'Durée', val: '7 jours / 6 nuits', sub: "de l'arrivée à Oita au dernier café de Fukuoka" },
  { lbl: 'Niveau', val: 'Marche douce', sub: 'une journée de trente kilomètres, le reste à votre rythme' },
  { lbl: 'Voyageurs', val: '1 à 8 personnes', sub: 'guide francophone permanent' },
  { lbl: 'Hébergement', val: "Minshuku et ryokan", sub: "6 nuits en maisons familiales, tous les dîners inclus" },
];

const KUNISAKI_RECAP = "Oita · sentier de Futagoji · atelier aizome chez Tanaka-san · onsen de quartier à Beppu · marché de Saiki · mont Tsurumi · Fukuoka";

const KUNISAKI_PLUS = [
  "Une péninsule que les circuits classiques ignorent, sans autre groupe sur les sentiers",
  "Six nuits en minshuku et en ryokan, tous les dîners inclus",
  "Une journée entière de teinture aizome avec Tanaka-san, vous repartez avec votre tissu",
  "Le marché de poissons de Saiki au petit matin, déjeuner choisi et préparé sur place",
  "Un onsen de quartier à Beppu, celui où on paye 200 yens à la dame de l'entrée",
  "De un à huit voyageurs, à la date de votre choix, sans date imposée",
];

const KUNISAKI_FACTS = [
  { lbl: 'Départs', val: 'À la date de votre choix' },
  { lbl: 'Durée', val: '7 jours / 6 nuits' },
  { lbl: 'Niveau', val: 'Marche douce' },
  { lbl: 'Voyageurs', val: '1 à 8 personnes' },
  { lbl: 'Pension', val: 'Pension complète, sauf après-midi libres' },
  { lbl: 'Hébergement', val: "Minshuku et ryokan" },
];

const KUNISAKI_NOTE = "Les vols internationaux ne sont pas inclus, nous vous aidons à les réserver au meilleur horaire. La saison va d'avril à juin, la péninsule est plus belle avant les pluies. Un voyage lent, dans une péninsule que les circuits classiques ignorent. Vous dormez en minshuku et en ryokan, vous mangez ce qui a été pêché le matin, et vous marchez sur des sentiers de temples que peu de voyageurs empruntent.";

export function DetailPage({ go, param }) {
  if (param === 'CL-09') return <AlpesDetail go={go} />;
  return (
    <>
      <section className="detail-hero">
        <div className="wrap wrap-wide">
          <div className="crumbs">
            <a href={rt('home')} onClick={(e)=>{e.preventDefault();go('home')}}>Kiraku</a>
            <span>›</span>
            <a href={rt('itineraries')} onClick={(e)=>{e.preventDefault();go('itineraries')}}>Itinéraires</a>
            <span>›</span>
            <span style={{color:'var(--fg)'}}>Kunisaki, sept jours</span>
          </div>
          <div className="section-eyebrow">UNE EXPÉRIENCE · KYUSHU</div>
          <h1>Sept jours sur le sentier de Kunisaki.</h1>
          <p className="lede">
            La péninsule oubliée du Kyushu, ses temples Tendai cachés dans la forêt, une journée entière de teinture <i>aizome</i> avec Tanaka-san, et un onsen secret à Beppu, celui où on paye 200 yens à une dame.
          </p>
        </div>
      </section>

      <section className="wrap wrap-wide">
        <div className="detail-layout">
          <div>
            <DetailCarousel slides={CAROUSELS.KUNISAKI} />
            <SejourTabs circuit="KUNISAKI" note={KUNISAKI_NOTE} plus={KUNISAKI_PLUS} />

            <div className="section-head" style={{marginTop:72, marginBottom:24}}>
              <div className="left">
                <div className="section-eyebrow">LE DÉTAIL DU SÉJOUR</div>
                <h2>Sept matinées, sept dîners.</h2>
              </div>
            </div>
            <DetailDays days={DAYS_KUNISAKI} />
          </div>
          <aside className="detail-rail">
            <DetailFacts price="3 980 €" priceSub="par voyageur, base chambre double · vols non inclus" cells={KUNISAKI_FACTS} recap={KUNISAKI_RECAP} formule="Voyage sur-mesure" go={go} circuitRef="CL-01" />
          </aside>
        </div>
      </section>
    </>
  );
}

export function ItinerariesPage({ go }) {
  const th = { textAlign:'left', fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-muted)', fontWeight:500, padding:'0 16px 12px 0', borderBottom:'1px solid var(--border-strong)' };
  const td = { fontFamily:'var(--font-serif)', fontSize:17, color:'var(--fg-2)', padding:'16px 16px 16px 0', borderBottom:'1px solid var(--hairline)', verticalAlign:'top' };
  const tdRef = { ...td, fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.08em', color:'var(--kiraku-shu)', whiteSpace:'nowrap' };
  const tdName = { ...td, color:'var(--fg)', fontFamily:'var(--font-display)', fontSize:19, fontWeight:600, letterSpacing:'-0.01em' };
  const rows = [...CIRCUITS_SHORT, ...EXTENSIONS];
  return (
    <section className="wrap wrap-wide" style={{padding: '80px 48px'}}>
      <div className="section-head">
        <div className="left">
          <div className="section-eyebrow">NOS ITINÉRAIRES LONGS</div>
          <h2>Neuf circuits, de sept à vingt-deux jours.</h2>
          <div className="kicker">· chacun retissé autour de vous.</div>
        </div>
        <div className="right">
          Pas de date imposée en voyage privé : vous partez quand vous voulez, pour la durée que vous voulez. De un à huit voyageurs en privé, de quatre à huit en petit groupe.
        </div>
      </div>

      <div className="itin-grid">
        {CIRCUITS_LONG.map(it => <ItineraryCard key={it.ref} it={it} go={go} />)}
      </div>

      <div className="section-head" style={{marginTop:100}}>
        <div className="left">
          <div className="section-eyebrow">ITINÉRAIRES COURTS</div>
          <h2>Seize modules d'une journée.</h2>
          <div className="kicker">· sans hébergement ni transport longue distance.</div>
        </div>
        <div className="right">
          Des extensions, des escales, ou des briques pour composer un circuit sur mesure. Plus une extension de cinq jours.
        </div>
      </div>

      <table style={{width:'100%', borderCollapse:'collapse', marginTop:8}}>
        <thead>
          <tr>
            <th style={{...th, width:80}}>Réf</th>
            <th style={th}>Nom</th>
            <th style={{...th, width:'32%'}}>Zone</th>
            <th style={{...th, width:190}}>Intensité</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(c => (
            <tr key={c.ref}>
              <td style={tdRef}>{c.ref}</td>
              <td style={tdName}>{c.title}</td>
              <td style={td}>{c.zone}</td>
              <td style={td}>{c.intensite}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{marginTop:48, display:'flex', gap:16, alignItems:'center', flexWrap:'wrap'}}>
        <button className="btn btn-primary" onClick={()=>go('contact')}>Réserver un appel de trente minutes</button>
        <span style={{fontFamily:'var(--font-serif)', fontSize:16, color:'var(--fg-muted)'}}>Vous nous racontez ce qui vous tente. On vous dit si c'est la bonne saison.</span>
      </div>
    </section>
  );
}

