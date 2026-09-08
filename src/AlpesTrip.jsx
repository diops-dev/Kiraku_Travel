import React from 'react'
import { rt } from './paths.js'
import { CAROUSELS, DetailCarousel, DetailDays, DetailFacts } from './DetailParts.jsx'
import { SejourTabs } from './inclusions.jsx'
import { useLang, useT } from './i18n.js'
import { COMMON, ITIN } from './content/index.js'

// CL-09 · Tokyo, Kyoto et traversee meridionale des Alpes japonaises

export function AlpesDetail({ go }) {
  const lang = useLang();
  const c = useT(COMMON);
  const t = useT(ITIN);
  const a = t.alpes;
  return (
    <>
      <section className="detail-hero">
        <div className="wrap wrap-wide">
          <div className="crumbs">
            <a href={rt('home', null, lang)} onClick={(e)=>{e.preventDefault();go('home')}}>{c.ui.kiraku}</a>
            <span>›</span>
            <a href={rt('itineraries', null, lang)} onClick={(e)=>{e.preventDefault();go('itineraries')}}>{c.ui.fil}</a>
            <span>›</span>
            <span style={{color:'var(--fg)'}}>{a.fil}</span>
          </div>
          <div className="section-eyebrow">{a.eyebrow}</div>
          <h1>{a.titre}</h1>
          <p className="lede">{a.lede}</p>
        </div>
      </section>

      <section className="wrap wrap-wide">
        <div className="detail-layout">
          <div>
            <DetailCarousel slides={CAROUSELS['CL-09']} legendes={t.carrousels['CL-09']} />
            <SejourTabs circuit="CL-09" departs={a.departs} note={a.note} plus={a.plus} />

            <div className="section-head" style={{marginTop:72, marginBottom:24}}>
              <div className="left">
                <div className="section-eyebrow">{c.detail.detailEyebrow}</div>
                <h2>{a.detailTitre}</h2>
                <div className="kicker">{a.detailKicker}</div>
              </div>
            </div>
            <DetailDays days={a.jours} />
          </div>
          <aside className="detail-rail">
            <DetailFacts price={a.prix} priceSub={a.prixSub} cells={a.facts} recap={a.recap} formule={c.detail.formuleGroupe} go={go} circuitRef="CL-09" />
          </aside>
        </div>
      </section>
    </>
  );
}
