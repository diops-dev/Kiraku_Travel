import React, { useState } from 'react'
import { DetailPlus, InclusionsVisuelles } from './DetailParts.jsx'
import { useT } from './i18n.js'
import { COMMON, INCL } from './content/index.js'

// Compris et non compris dans le prix, une fiche par circuit long.
// Les donnees viennent du dictionnaire de la langue courante.

function fiche(t, circuit) {
  return t.circuits[circuit] || t.circuits.KUNISAKI;
}

export function PriceInclusions({ circuit }) {
  const c = useT(COMMON);
  const t = useT(INCL);
  const data = fiche(t, circuit);
  const inclus = [...data.inclus, ...t.inclusBase];
  const exclus = [...(data.exclus || []), ...t.exclusBase];
  const li = { fontFamily:'var(--font-serif)', fontSize:16, lineHeight:1.65, color:'var(--fg-2)', paddingLeft:22, position:'relative', textWrap:'pretty' };
  const mark = { position:'absolute', left:0, top:1, fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600 };
  const colHead = { fontFamily:'var(--font-display)', fontSize:20, fontWeight:600, letterSpacing:'-0.01em', color:'var(--fg)', margin:'0 0 16px', paddingBottom:12, borderBottom:'1px solid var(--border-strong)' };
  return (
    <div style={{marginTop:72}}>
      <div className="section-head" style={{marginBottom:24}}>
        <div className="left">
          <div className="section-eyebrow">{c.detail.inclusEyebrow}</div>
          <h2>{c.detail.inclusTitre}</h2>
          <div className="kicker">· {data.titre}</div>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'40px 56px'}}>
        <div>
          <h3 style={colHead}>{c.detail.colInclus}</h3>
          <ul style={{display:'flex', flexDirection:'column', gap:12, margin:0, padding:0, listStyle:'none'}}>
            {inclus.map(x => <li key={x} style={li}><span style={{...mark, color:'var(--kiraku-shu)'}}>✦</span>{x}</li>)}
          </ul>
        </div>
        <div>
          <h3 style={colHead}>{c.detail.colExclus}</h3>
          <ul style={{display:'flex', flexDirection:'column', gap:12, margin:0, padding:0, listStyle:'none'}}>
            {exclus.map(x => <li key={x} style={li}><span style={{...mark, color:'var(--fg-muted)'}}>·</span>{x}</li>)}
          </ul>
          <p style={{fontFamily:'var(--font-serif)', fontSize:15, lineHeight:1.6, color:'var(--fg-muted)', margin:'18px 0 0'}}>{t.notePourboire}.</p>
        </div>
      </div>
      <div style={{background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderRadius:14, padding:'24px 26px', marginTop:40}}>
        <div className="section-eyebrow" style={{marginBottom:12}}>{c.detail.optionsEyebrow}</div>
        <ul style={{display:'flex', flexDirection:'column', gap:10, margin:0, paddingLeft:20}}>
          {(data.options || []).map(o => <li key={o} style={{fontFamily:'var(--font-serif)', fontSize:16, lineHeight:1.65, color:'var(--fg-2)'}}>{o}</li>)}
        </ul>
      </div>
    </div>
  );
}

// Les memes informations, en onglets, pour gagner de la place
export function SejourTabs({ circuit, departs, note, plus }) {
  const c = useT(COMMON);
  const t = useT(INCL);
  const data = fiche(t, circuit);
  const pratique = t.fiches[circuit] || {};
  const inclus = [...data.inclus, ...t.inclusBase];
  const exclus = [...(data.exclus || []), ...t.exclusBase];
  const th = { textAlign:'left', fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg-muted)', fontWeight:500, padding:'0 16px 12px 0', borderBottom:'1px solid var(--border-strong)' };
  const td = { fontFamily:'var(--font-serif)', fontSize:17, color:'var(--fg-2)', padding:'14px 16px 14px 0', borderBottom:'1px solid var(--hairline)' };
  const list = (items) => <ul>{items.map(x => <li key={x}>{x}</li>)}</ul>;
  const L = c.detail.tabs;

  const tabs = [];
  if (plus && plus.length) tabs.push({ id: 'forts', lbl: L.forts, render: () => <DetailPlus items={plus} /> });
  if (pratique.hebergements) tabs.push({ id: 'heb', lbl: L.heb, render: () => list(pratique.hebergements) });
  if (pratique.transports) tabs.push({ id: 'tr', lbl: L.tr, render: () => list(pratique.transports) });
  if (pratique.guide) tabs.push({ id: 'guide', lbl: L.guide, render: () => list(pratique.guide) });
  if (pratique.equipement) tabs.push({ id: 'equip', lbl: L.equip, render: () => list(pratique.equipement) });
  tabs.push({ id: 'options', lbl: L.options, render: () => list(data.options || []) });
  if (note) tabs.push({ id: 'savoir', lbl: L.savoir, render: () => (
    <p style={{fontFamily:'var(--font-serif)', fontSize:17, lineHeight:1.7, color:'var(--fg-2)', margin:0, maxWidth:760, textWrap:'pretty'}}>{note}</p>
  ) });
  tabs.push({ id: 'inclus', lbl: L.inclus, render: () => (
    <>
      {t.visuels[circuit] ? <InclusionsVisuelles items={t.visuels[circuit]} /> : null}
      <div style={{margin:'26px 0 0', paddingTop:26, borderTop:'1px solid var(--hairline)'}}>{list(inclus)}</div>
    </>
  ) });
  tabs.push({ id: 'exclus', lbl: L.exclus, render: () => (
    <>
      {list(exclus)}
      <p style={{fontFamily:'var(--font-serif)', fontSize:15, lineHeight:1.6, color:'var(--fg-muted)', margin:'18px 0 0'}}>{t.notePourboire}.</p>
    </>
  ) });
  if (departs && departs.length) tabs.splice(tabs.length - 2, 0, { id: 'departs', lbl: L.departs, render: () => (
    <table style={{width:'100%', borderCollapse:'collapse', maxWidth:720}}>
      <thead><tr><th style={th}>{c.detail.thDepart}</th><th style={th}>{c.detail.thRetour}</th><th style={{...th, width:160}}>{c.detail.thAdulte}</th></tr></thead>
      <tbody>
        {departs.map(d => (
          <tr key={d.du}>
            <td style={td}>{d.du}</td>
            <td style={td}>{d.au}</td>
            <td style={{...td, fontFamily:'var(--font-display)', fontWeight:600, color:'var(--fg)'}}>{d.prix}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) });

  const [active, setActive] = useState(tabs[0].id);
  const cur = tabs.find(x => x.id === active) || tabs[0];
  return (
    <div className="tabs">
      <div className="section-head" style={{marginBottom:20}}>
        <div className="left">
          <div className="section-eyebrow">{c.detail.sejourEyebrow}</div>
          <h2>{c.detail.sejourTitre}</h2>
          <div className="kicker">· {data.titre}</div>
        </div>
      </div>
      <div className="tabbar">
        {tabs.map(x => (
          <button key={x.id} className={x.id === active ? 'active' : ''} onClick={()=>setActive(x.id)}>{x.lbl}</button>
        ))}
      </div>
      <div className="panel">{cur.render()}</div>
    </div>
  );
}
