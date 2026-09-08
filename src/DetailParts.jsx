import React, { useEffect, useState } from 'react'
import { photoSet } from './photos.js'
import { RailBooking } from './booking.jsx'
import { GRADIENTS, ImageSlot } from './components.jsx'
import { useT } from './i18n.js'
import { COMMON } from './content/index.js'

// Carrousel photo des pages itineraire, plus le bloc des faits essentiels.
// Les legendes viennent du dictionnaire de langue, dans le meme ordre.

export const CAROUSELS = {
  'CL-09': [
    { id: 'alpes-1', photo: '/photos/fuji-city.jpg', grad: 'snow' },
    { id: 'alpes-2', grad: 'snow' },
    { id: 'alpes-3', grad: 'forest' },
    { id: 'alpes-4', photo: '/photos/kiyomizu-street.jpg', grad: 'paper' },
  ],
  KUNISAKI: [
    { id: 'kunisaki-1', grad: 'forest' },
    { id: 'kunisaki-2', photo: '/photos/hands.jpg', grad: 'ember' },
    { id: 'kunisaki-3', grad: 'dusk' },
    { id: 'kunisaki-4', grad: 'rice' },
  ],
};

export function DetailCarousel({ slides, legendes = [] }) {
  const c = useT(COMMON);
  const [i, setI] = useState(0);
  const n = slides.length;
  const lg = (idx) => legendes[idx] || '';
  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);
  return (
    <>
      <div className="detail-carousel">
        {slides.map((s, idx) => (
          <div key={s.id} className={`slide${idx === i ? ' active' : ''}`}>
            <ImageSlot id={s.id} placeholder={lg(idx)} gradient={GRADIENTS[s.grad]} src={s.photo} />
          </div>
        ))}
        <div className="veil"></div>
        <button className="arrow prev" aria-label={c.ui.photoPrecedente} onClick={() => setI((i - 1 + n) % n)}>‹</button>
        <button className="arrow next" aria-label={c.ui.photoSuivante} onClick={() => setI((i + 1) % n)}>›</button>
        <div className="caption">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {lg(i)}</div>
        <div className="dots">
          {slides.map((_, idx) => (
            <button key={idx} className={idx === i ? 'active' : ''} onClick={() => setI(idx)} aria-label={`${c.ui.photoN} ${idx + 1}`}></button>
          ))}
        </div>
      </div>
      <div className="detail-thumbs">
        {slides.map((s, idx) => (
          <button key={s.id} className={idx === i ? 'active' : ''} onClick={() => setI(idx)} aria-label={lg(idx)}>
            {photoSet(s.photo) ? <img src={photoSet(s.photo).src} srcSet={photoSet(s.photo).srcSet} sizes="120px" alt="" loading="lazy" decoding="async" /> : <span style={{display:'block', width:'100%', height:'100%', background:'var(--kiraku-paper)'}}></span>}
          </button>
        ))}
      </div>
    </>
  );
}

// Pictos de ligne pour ce qui est inclus
const ICONS = {
  bed: 'M3 17v-4h18v4M3 13V8m18 5V9a2 2 0 0 0-2-2h-6v6M3 17v2m18-2v2M6 10.5h3',
  meal: 'M4 4v6a3 3 0 0 0 6 0V4M7 10v10M14 20V4c3 1 5 3 5 7 0 3-2 4-3 4h-2',
  guide: 'M12 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 6v7m0 0-3 8m3-8 3 8M8 9l8-1.5',
  train: 'M6 3h12v11H6zM6 14l-2 5m14-5 2 5M9 7h6M9 10.5h.5m5 0h.5M9 19h6',
  luggage: 'M6 7h12v13H6zM9 7V4h6v3M6 20v1m12-1v1M10 11v5m4-5v5',
  ticket: 'M3 8h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4V8zM9 8v12',
  wifi: 'M4 10a12 12 0 0 1 16 0M7 13.5a7.5 7.5 0 0 1 10 0M10.5 17a3 3 0 0 1 3 0',
  mountain: 'M2 19h20L14 5l-3.5 6-2-3L2 19zM10.5 11l1.5 2.5',
  onsen: 'M4 13h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM8 9c0-2 2-2 2-4m4 4c0-2 2-2 2-4',
  flag: 'M6 3v18M6 4h11l-2 4 2 4H6',
  temple: 'M3 8h18L12 3 3 8zM5 8v11m14-11v11M9 19v-6h6v6M3 21h18',
  market: 'M4 8h16l-1 12H5L4 8zM8 8V5a4 4 0 0 1 8 0v3',
};

export function Ico({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{color:'var(--kiraku-shu)'}} aria-hidden="true"><path d={ICONS[name] || ICONS.flag}></path></svg>
  );
}

export function InclusionsVisuelles({ items }) {
  return (
    <div className="incl-grid">
      {items.map(it => (
        <div className="row" key={it.lbl}><Ico name={it.ico} /><span>{it.lbl}</span></div>
      ))}
    </div>
  );
}

// Les points forts de l'itineraire, rendus dans l'onglet correspondant
export function DetailPlus({ items }) {
  return (
    <div className="plus-grid">
      {items.map((t, i) => (
        <div className="item" key={t}><span className="n">{String(i+1).padStart(2,'0')}</span><p>{t}</p></div>
      ))}
    </div>
  );
}

// Faits essentiels, panneau compact place a cote du carrousel
export function DetailFacts({ price, priceSub, cells, recap, formule, go, circuitRef }) {
  const c = useT(COMMON);
  return (
    <div className="facts">
      <div className="head">
        {formule ? <span className="badge" style={{flexBasis:'100%', marginBottom:6}}>{formule}</span> : null}
        <span className="from">{c.detail.aPartirDe}</span>
        <span className="price">{price}</span>
        <span className="sub">{priceSub}</span>
      </div>
      <div className="grid">
        {recap ? (
          <div className="cell span">
            <div className="lbl">{c.detail.leCircuitEnBref}</div>
            <div className="val">{recap}</div>
          </div>
        ) : null}
        {cells.map(cell => (
          <div className="cell" key={cell.lbl}>
            <div className="lbl">{cell.lbl}</div>
            <div className="val">{cell.val}</div>
          </div>
        ))}
      </div>
      <div className="foot">
        {circuitRef ? <RailBooking circuitRef={circuitRef} go={go} /> : (
          <>
            <button className="btn btn-primary" style={{width:'100%', justifyContent:'center'}} onClick={()=>go('contact')}>{c.detail.reserverAppel}</button>
            <div className="note">{c.detail.noteAppel}</div>
          </>
        )}
      </div>
    </div>
  );
}

// Bloc des informations decisives, avant le detail du sejour
export function DetailEssentials({ items, note }) {
  const c = useT(COMMON);
  const cell = { padding: '20px 24px', borderRight: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' };
  return (
    <div style={{marginBottom: 56}}>
      <div className="section-head" style={{marginBottom: 20}}>
        <div className="left">
          <div className="section-eyebrow">{c.detail.essentielEyebrow}</div>
          <h2>{c.detail.essentielTitre}</h2>
        </div>
      </div>
      <div style={{border: '1px solid var(--hairline)', borderRadius: 14, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', background: 'var(--kiraku-paper)'}}>
        {items.map(it => (
          <div key={it.lbl} style={cell}>
            <div style={{fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-muted)'}}>{it.lbl}</div>
            <div style={{fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, color: 'var(--fg)', marginTop: 6, lineHeight: 1.25}}>{it.val}</div>
            {it.sub ? <div style={{fontFamily: 'var(--font-serif)', fontSize: 15, color: 'var(--fg-2)', marginTop: 6, lineHeight: 1.5}}>{it.sub}</div> : null}
          </div>
        ))}
      </div>
      {note ? <p style={{fontFamily: 'var(--font-serif)', fontSize: 16, lineHeight: 1.65, color: 'var(--fg-2)', margin: '18px 0 0', maxWidth: 720, textWrap: 'pretty'}}>{note}</p> : null}
    </div>
  );
}

// Le detail du sejour, jour par jour, en lecture verticale
export function DetailDays({ days }) {
  const c = useT(COMMON);
  return (
    <div className="days-flow">
      {days.map(d => (
        <div className="day" key={d.n}>
          <div className="num">{String(d.n).padStart(2,'0')}<small>{c.detail.jour}</small></div>
          <div>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
            <div className="tags">
              {d.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
