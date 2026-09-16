import React from 'react'
import { rt } from './paths.js'
import { DetailCarousel, DetailFacts } from './DetailParts.jsx'
import { GRADIENTS } from './components.jsx'
import { useLang, useT } from './i18n.js'
import { COMMON, ITIN } from './content/index.js'

// Fiche d'un "sejour liberte" : les modules CT (une journee) et l'extension
// EX-01. Gabarit plus leger que les circuits signatures : une photo, un
// programme en un bloc, pas de reservation par date (module a la demande,
// souvent adosse a un circuit principal).

const GRAD_PAR_DEFAUT = 'paper';

export function ModulePage({ go, param }) {
  const lang = useLang();
  const c = useT(COMMON);
  const t = useT(ITIN);
  const mod = t.modules && t.modules[param];
  const court = t.circuitsCourts && t.circuitsCourts[param];
  if (!court) return null;

  const slides = [{ id: `mod-${param}`, photo: mod && mod.photo ? `/photos/${mod.photo}.jpg` : undefined, grad: GRADIENTS[GRAD_PAR_DEFAUT] }];

  return (
    <>
      <section className="detail-hero">
        <div className="wrap wrap-wide">
          <div className="crumbs">
            <a href={rt('home', null, lang)} onClick={(e)=>{e.preventDefault();go('home')}}>{c.ui.kiraku}</a>
            <span>›</span>
            <a href={rt('itineraries', null, lang)} onClick={(e)=>{e.preventDefault();go('itineraries')}}>{c.ui.fil}</a>
            <span>›</span>
            <span style={{color:'var(--fg)'}}>{mod ? mod.titre : court.title}</span>
          </div>
          <div className="section-eyebrow">{['SÉJOUR LIBERTÉ', param].join(' · ')}</div>
          <h1>{mod ? mod.titre : court.title}</h1>
          <p className="lede">{mod ? mod.lede : (t.finalisation ? t.finalisation.lede : '')}</p>
        </div>
      </section>

      <section className="wrap wrap-wide">
        <div className="detail-layout">
          <div>
            <DetailCarousel slides={slides} legendes={[mod ? mod.titre : court.title]} />

            {mod ? (
              <div style={{marginTop:56}}>
                <p style={{fontFamily:'var(--font-serif)', fontSize:17, lineHeight:1.75, color:'var(--fg-2)', maxWidth:720, textWrap:'pretty'}}>{mod.programme}</p>
              </div>
            ) : null}

            <div className="section-head" style={{marginTop:56, marginBottom:24}}>
              <div className="left">
                <div className="section-eyebrow">{c.detail.detailEyebrow}</div>
                <h2>{c.detail.tabs.forts}</h2>
              </div>
            </div>
            {mod ? (
              <div className="plus-grid">
                {mod.plus.map((txt, i) => (
                  <div className="item" key={txt}><span className="n">{String(i+1).padStart(2,'0')}</span><p>{txt}</p></div>
                ))}
              </div>
            ) : (
              <p style={{fontFamily:'var(--font-serif)', fontSize:17, lineHeight:1.7, color:'var(--fg-2)', maxWidth:640}}>
                {t.finalisation ? t.finalisation.joursMessage : ''}
              </p>
            )}
          </div>
          <aside className="detail-rail">
            <DetailFacts
              price={c.booking.surDevis}
              priceSub={t.finalisation ? t.finalisation.prixSub : ''}
              cells={[
                { lbl: mod ? 'Durée' : (t.finalisation ? t.finalisation.factDureeLbl : 'Durée'), val: mod ? mod.duree : court.intensite },
                { lbl: 'Zone', val: mod ? mod.zone : court.zone },
                ...(mod ? [{ lbl: 'Rythme', val: mod.rythme }] : []),
              ]}
              recap={mod ? mod.fil : null}
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
