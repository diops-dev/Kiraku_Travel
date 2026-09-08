import React from 'react'
import { rt } from './paths.js'
import { AlpesDetail } from './AlpesTrip.jsx'
import { CAROUSELS, DetailCarousel, DetailDays, DetailFacts } from './DetailParts.jsx'
import { circuitsLong, ItineraryCard, REFS_COURTS } from './HomePage.jsx'
import { SejourTabs } from './inclusions.jsx'
import { useLang, useT } from './i18n.js'
import { COMMON, ITIN } from './content/index.js'

// Fiche itineraire et page d'index des itineraires

export function DetailPage({ go, param }) {
  const lang = useLang();
  const c = useT(COMMON);
  const t = useT(ITIN);
  const k = t.kunisaki;
  if (param === 'CL-09') return <AlpesDetail go={go} />;
  return (
    <>
      <section className="detail-hero">
        <div className="wrap wrap-wide">
          <div className="crumbs">
            <a href={rt('home', null, lang)} onClick={(e)=>{e.preventDefault();go('home')}}>{c.ui.kiraku}</a>
            <span>›</span>
            <a href={rt('itineraries', null, lang)} onClick={(e)=>{e.preventDefault();go('itineraries')}}>{c.ui.fil}</a>
            <span>›</span>
            <span style={{color:'var(--fg)'}}>{k.fil}</span>
          </div>
          <div className="section-eyebrow">{k.eyebrow}</div>
          <h1>{k.titre}</h1>
          <p className="lede">
            {k.ledeAvant}<i>{k.ledeItalique}</i>{k.ledeApres}
          </p>
        </div>
      </section>

      <section className="wrap wrap-wide">
        <div className="detail-layout">
          <div>
            <DetailCarousel slides={CAROUSELS.KUNISAKI} legendes={t.carrousels.KUNISAKI} />
            <SejourTabs circuit="KUNISAKI" note={k.note} plus={k.plus} />

            <div className="section-head" style={{marginTop:72, marginBottom:24}}>
              <div className="left">
                <div className="section-eyebrow">{c.detail.detailEyebrow}</div>
                <h2>{k.detailTitre}</h2>
              </div>
            </div>
            <DetailDays days={k.jours} />
          </div>
          <aside className="detail-rail">
            <DetailFacts price={k.prix} priceSub={k.prixSub} cells={k.facts} recap={k.recap} formule={c.detail.formulePrive} go={go} circuitRef="CL-01" />
          </aside>
        </div>
      </section>
    </>
  );
}

export function ItinerariesPage({ go }) {
  const t = useT(ITIN);
  const x = t.index;
  const th = { textAlign:'left', fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-muted)', fontWeight:500, padding:'0 16px 12px 0', borderBottom:'1px solid var(--border-strong)' };
  const td = { fontFamily:'var(--font-serif)', fontSize:17, color:'var(--fg-2)', padding:'16px 16px 16px 0', borderBottom:'1px solid var(--hairline)', verticalAlign:'top' };
  const tdRef = { ...td, fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.08em', color:'var(--kiraku-shu)', whiteSpace:'nowrap' };
  const tdName = { ...td, color:'var(--fg)', fontFamily:'var(--font-display)', fontSize:19, fontWeight:600, letterSpacing:'-0.01em' };
  const rows = REFS_COURTS.map(ref => ({ ref, ...(t.circuitsCourts[ref] || {}) }));
  return (
    <section className="wrap wrap-wide" style={{padding: '80px 48px'}}>
      <div className="section-head">
        <div className="left">
          <div className="section-eyebrow">{x.eyebrow}</div>
          <h2>{x.titre}</h2>
          <div className="kicker">{x.kicker}</div>
        </div>
        <div className="right">{x.droite}</div>
      </div>

      <div className="itin-grid">
        {circuitsLong(t).map(it => <ItineraryCard key={it.ref} it={it} go={go} />)}
      </div>

      <div className="section-head" style={{marginTop:100}}>
        <div className="left">
          <div className="section-eyebrow">{x.courtsEyebrow}</div>
          <h2>{x.courtsTitre}</h2>
          <div className="kicker">{x.courtsKicker}</div>
        </div>
        <div className="right">{x.courtsDroite}</div>
      </div>

      <table style={{width:'100%', borderCollapse:'collapse', marginTop:8}}>
        <thead>
          <tr>
            <th style={{...th, width:80}}>{x.thRef}</th>
            <th style={th}>{x.thNom}</th>
            <th style={{...th, width:'32%'}}>{x.thZone}</th>
            <th style={{...th, width:190}}>{x.thIntensite}</th>
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
        <button className="btn btn-primary" onClick={()=>go('contact')}>{x.bouton}</button>
        <span style={{fontFamily:'var(--font-serif)', fontSize:16, color:'var(--fg-muted)'}}>{x.note}</span>
      </div>
    </section>
  );
}
