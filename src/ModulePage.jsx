import React from 'react'
import { rt } from './paths.js'
import { DetailCarousel, DetailDays, DetailFacts } from './DetailParts.jsx'
import { SejourTabs } from './inclusions.jsx'
import { useLang, useT } from './i18n.js'
import { COMMON, ITIN } from './content/index.js'

// Fiche d'un "sejour liberte" (module CT ou extension EX-01). Meme gabarit
// exact que la fiche circuit signature (SignatureDetail dans DetailPage.jsx) :
// carrousel, onglets sejour, puis jour par jour, pour que l'experience de
// lecture soit identique d'une fiche a l'autre. Seule difference : un
// programme d'une seule journee au lieu de plusieurs.

const LEGENDE_PHOTO = {
  'tokyo-night': 'Tokyo de nuit', 'chureito-fuji': 'Le mont Fuji depuis la pagode Chureito',
  'fuji-city': 'Le mont Fuji', 'kiyomizu-street': 'Une ruelle de Kyoto',
  'osaka-castle': "Le château d'Osaka", 'chidorigafuchi': 'Chidorigafuchi, Tokyo',
  'youtei-snow': 'Le mont Yotei sous la neige', 'alley': 'Une ruelle japonaise',
  'fushimi-inari': 'Fushimi Inari Taisha', 'kinkakuji': "Le pavillon d'or, Kinkakuji",
  'torii-walkway': 'Un chemin de torii', 'yasaka-kimono': 'Le sanctuaire Yasaka',
  'miyajima-torii': 'Le torii de Miyajima', 'takachiho': 'Les gorges de Takachiho',
  'hands': 'Artisanat local', 'kamakura': 'Kamakura', 'koinobori': 'Carpes koinobori',
};

export function ModulePage({ go, param }) {
  const lang = useLang();
  const c = useT(COMMON);
  const t = useT(ITIN);
  const mod = t.modules && t.modules[param];
  const court = t.circuitsCourts && t.circuitsCourts[param];
  if (!court) return null;

  // Fiche pas encore traduite dans cette langue : repli honnete sur les
  // donnees deja trilingues de l'index (titre, zone, intensite), jamais un
  // retour silencieux vers une autre page.
  if (!mod) {
    return (
      <>
        <section className="detail-hero">
          <div className="wrap wrap-wide">
            <div className="crumbs">
              <a href={rt('home', null, lang)} onClick={(e)=>{e.preventDefault();go('home')}}>{c.ui.kiraku}</a>
              <span>›</span>
              <a href={rt('itineraries', null, lang)} onClick={(e)=>{e.preventDefault();go('itineraries')}}>{c.ui.fil}</a>
              <span>›</span>
              <span style={{color:'var(--fg)'}}>{court.title}</span>
            </div>
            <div className="section-eyebrow">{['SÉJOUR LIBERTÉ', param].join(' · ')}</div>
            <h1>{court.title}</h1>
          </div>
        </section>
        <section className="wrap wrap-wide">
          <div className="detail-layout">
            <div>
              <DetailCarousel slides={[{ id: `mod-${param}`, grad: 'paper' }]} legendes={[court.title]} />
            </div>
            <aside className="detail-rail">
              <DetailFacts price={c.booking.surDevis} priceSub="" cells={[{ lbl: 'Zone', val: court.zone }, { lbl: 'Intensité', val: court.intensite }]} recap={null} formule={c.detail.formulePrive} go={go} circuitRef={null} />
            </aside>
          </div>
        </section>
      </>
    );
  }

  const slides = (mod.photos && mod.photos.length ? mod.photos : ['_grad']).map((slug, i) => ({
    id: `${param}-${i}`, photo: slug === '_grad' ? undefined : `/photos/${slug}.jpg`, grad: 'paper',
  }));
  const legendes = (mod.photos && mod.photos.length ? mod.photos : [mod.titre]).map(slug => LEGENDE_PHOTO[slug] || mod.titre);

  return (
    <>
      <section className="detail-hero">
        <div className="wrap wrap-wide">
          <div className="crumbs">
            <a href={rt('home', null, lang)} onClick={(e)=>{e.preventDefault();go('home')}}>{c.ui.kiraku}</a>
            <span>›</span>
            <a href={rt('itineraries', null, lang)} onClick={(e)=>{e.preventDefault();go('itineraries')}}>{c.ui.fil}</a>
            <span>›</span>
            <span style={{color:'var(--fg)'}}>{mod.titre}</span>
          </div>
          <div className="section-eyebrow">{['SÉJOUR LIBERTÉ', param].join(' · ')}</div>
          <h1>{mod.titre}</h1>
          <p className="lede">{mod.lede}</p>
        </div>
      </section>

      <section className="wrap wrap-wide">
        <div className="detail-layout">
          <div>
            <DetailCarousel slides={slides} legendes={legendes} />
            <SejourTabs circuit={param} plus={mod.plus} titre={mod.titre} />

            <div className="section-head" style={{marginTop:72, marginBottom:24}}>
              <div className="left">
                <div className="section-eyebrow">{c.detail.detailEyebrow}</div>
                <h2>Le programme</h2>
                <div className="kicker">{mod.fil}</div>
              </div>
            </div>
            <DetailDays days={[{ n: 1, title: mod.titre, body: mod.programme, tags: [] }]} />
          </div>
          <aside className="detail-rail">
            <DetailFacts
              price={c.booking.surDevis}
              priceSub={t.finalisation ? t.finalisation.prixSub : ''}
              cells={[
                { lbl: 'Durée', val: mod.duree },
                { lbl: 'Zone', val: mod.zone },
                { lbl: 'Rythme', val: mod.rythme },
              ]}
              recap={mod.fil}
              formule={c.detail.formulePrive}
              go={go}
              circuitRef={null}
            />
          </aside>
        </div>
      </section>
    </>
  );
}
