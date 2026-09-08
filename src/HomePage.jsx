import React, { useEffect, useState } from 'react'
import { rt } from './paths.js'
import { GRADIENTS, ImageSlot } from './components.jsx'
import { useLang, useT } from './i18n.js'
import { COMMON, HOME, ITIN } from './content/index.js'

// Accueil : hero, itineraires en vedette, approche, regles, formules, premier contact

const P = '/photos/';

// Partie technique des cartes : kanji, degrade et visuel. Les libelles
// viennent du dictionnaire de la langue courante.
export const CIRCUITS_META = [
  { ref: 'CL-01', kanji: '静', grad: 'dusk', photo: P + 'tokyo-night.jpg' },
  { ref: 'CL-02', kanji: '北', grad: 'forest', photo: P + 'takachiho.jpg' },
  { ref: 'CL-03', kanji: '海', grad: 'ocean', photo: P + 'miyajima-torii.jpg' },
  { ref: 'CL-04', kanji: '息', grad: 'cherry', photo: P + 'yasaka-kimono.jpg' },
  { ref: 'CL-05', kanji: '古', grad: 'paper', photo: P + 'kiyomizu-street.jpg' },
  { ref: 'CL-06', kanji: '渡', grad: 'snow', photo: P + 'youtei-snow.jpg' },
  { ref: 'CL-07', kanji: '茅', grad: 'rice', photo: P + 'fuji-city.jpg' },
  { ref: 'CL-08', kanji: '杉', grad: 'ember', photo: P + 'fushimi-inari.jpg' },
  { ref: 'CL-09', kanji: '岳', grad: 'snow' },
];

export const REFS_COURTS = ['CT-01','CT-02','CT-03','CT-04','CT-05','CT-06','CT-07','CT-08','CT-09','CT-10','CT-11','CT-12','CT-13','CT-14','CT-15','CT-16','EX-01'];

// Cartes completes dans une langue donnee.
export function circuitsLong(t) {
  return CIRCUITS_META.map(m => ({ ...m, ...(t.circuitsLong[m.ref] || {}) }));
}

export function ItineraryCard({ it, go }) {
  const lang = useLang();
  const h = useT(HOME);
  return (
    <a className="itin" onClick={(e)=>{e.preventDefault(); go('detail', it.ref)}} href={rt('detail', it.ref, lang)}>
      <div className="photo">
        <ImageSlot id={`itin-${it.ref}`} placeholder={`${h.carte.photo}, ${it.title}`} gradient={GRADIENTS[it.grad]} src={it.photo} />
        <div className="kanji-watermark">{it.kanji}</div>
        {it.ribbon ? <div className="ribbon">{it.ribbon}</div> : null}
      </div>
      <div className="body">
        <div className="eyebrow-sm">{h.carte.eyebrow} · {it.ref}</div>
        <h3 className="title">{it.title}</h3>
        <div className="meta">
          <span>{it.duree}</span>
          <span>{it.privateNote || h.carte.prive}</span>
        </div>
      </div>
    </a>
  );
}

function HeroCarousel({ go }) {
  const h = useT(HOME);
  const c = useT(COMMON);
  const slides = [
    { id: 'hero-1', photo: P+'alley.jpg', grad: GRADIENTS.dusk },
    { id: 'hero-2', photo: P+'chureito-fuji.jpg', grad: GRADIENTS.forest },
    { id: 'hero-3', photo: P+'torii-walkway.jpg', grad: GRADIENTS.ember },
    { id: 'hero-4', photo: P+'youtei-snow.jpg', grad: GRADIENTS.snow },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(prev => (prev + 1) % slides.length), 5400);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero">
      <div className="hero-stage">
        {slides.map((s, idx) => (
          <div key={s.id} className={`hero-slide${idx === i ? ' active' : ''}`}>
            <ImageSlot id={s.id} placeholder={h.hero.slides[idx]} gradient={s.grad} src={s.photo} sizes="100vw" priority={idx === 0} />
          </div>
        ))}
        <div className="hero-scrim"></div>
      </div>

      <img className="hero-stamp" src="/assets/seal-red.png" alt="" />

      <div className="hero-content">
        <div className="hero-eyebrow">{h.hero.eyebrow}</div>
        <h1>{h.hero.titreAvant}<span className="brush">{h.hero.titreBrush}</span>{h.hero.titreApres}</h1>
        <p>{h.hero.lede}</p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={() => go('itineraries')}>{h.hero.ctaPrimaire}</button>
          <button className="btn btn-link" onClick={() => go('about')}>{h.hero.ctaSecondaire}</button>
        </div>
      </div>

      <div className="hero-counter">{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
      <div className="hero-dots">
        {slides.map((_, idx) => (
          <button key={idx}
                  className={idx === i ? 'active' : ''}
                  onClick={() => setI(idx)}
                  aria-label={`${c.ui.imageN} ${idx + 1}`}></button>
        ))}
      </div>
    </section>
  );
}

function ApprocheSection() {
  const h = useT(HOME);
  const col = { display:'flex', flexDirection:'column', gap:18 };
  const item = { fontFamily:'var(--font-serif)', fontSize:18, lineHeight:1.7, color:'var(--fg-2)', margin:0, textWrap:'pretty' };
  return (
    <section className="wrap" style={{padding:'20px 48px 40px'}}>
      <div className="section-head">
        <div className="left">
          <div className="section-eyebrow">{h.approche.eyebrow}</div>
          <h2>{h.approche.titre}</h2>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 56px', alignItems:'stretch', marginTop:12}}>
        <div style={{background:'var(--kiraku-washi-2)', borderRadius:14, padding:'34px 36px', borderTop:'3px solid transparent'}}>
          <div className="section-eyebrow" style={{marginBottom:20, color:'var(--fg-muted)'}}>{h.approche.colonneNon}</div>
          <div style={col}>
            {h.approche.neFaitPas.map((t,i) => <p key={i} style={item}>{t}</p>)}
          </div>
        </div>
        <div style={{background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderTop:'3px solid var(--kiraku-shu)', borderRadius:14, padding:'34px 36px'}}>
          <div className="section-eyebrow" style={{marginBottom:20, color:'var(--kiraku-shu)'}}>{h.approche.colonneOui}</div>
          <div style={col}>
            {h.approche.fait.map((t,i) => <p key={i} style={item}>{t}</p>)}
          </div>
        </div>
      </div>
      <blockquote style={{margin:'48px auto 0', maxWidth:820, textAlign:'center', fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:23, lineHeight:1.6, color:'var(--fg)', textWrap:'pretty'}}>
        {h.approche.citation}
      </blockquote>
    </section>
  );
}

function ReglesSection() {
  const h = useT(HOME);
  return (
    <section className="band">
      <div className="band-kanji">楽</div>
      <div className="wrap" style={{position:'relative'}}>
        <div className="section-head">
          <div className="left">
            <div className="section-eyebrow">{h.regles.eyebrow}</div>
            <h2>{h.regles.titre}</h2>
          </div>
        </div>
        <div className="principles">
          {h.regles.items.map((r, i) => (
            <div className="principle" key={i}>
              <div className="num">{String(i + 1).padStart(2, '0')} ·</div>
              <h3>{r.titreItalique
                ? <>{r.titreAvant}<i>{r.titreItalique}</i>{r.titreApres}</>
                : r.titre}</h3>
              <p>{r.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormulesSection() {
  const h = useT(HOME);
  const card = { background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderRadius:14, padding:'36px 38px' };
  const ht = { fontFamily:'var(--font-display)', fontWeight:600, fontSize:30, lineHeight:1.15, letterSpacing:'-0.02em', margin:'0 0 16px' };
  const p = { fontFamily:'var(--font-serif)', fontSize:18, lineHeight:1.75, color:'var(--fg-2)', margin:0, textWrap:'pretty' };
  const tag = { fontFamily:'var(--font-sans)', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--kiraku-shu)', marginTop:22, display:'block' };
  return (
    <section className="wrap" style={{padding:'80px 48px'}}>
      <div className="section-head">
        <div className="left">
          <div className="section-eyebrow">{h.formules.eyebrow}</div>
          <h2>{h.formules.titre}</h2>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:32, alignItems:'start'}}>
        <div style={card}>
          <h3 style={ht}>{h.formules.prive.titre}</h3>
          <p style={p}>{h.formules.prive.texte}</p>
          <span style={tag}>{h.formules.prive.tag}</span>
        </div>
        <div style={card}>
          <h3 style={ht}>{h.formules.groupe.titre}</h3>
          <p style={p}>{h.formules.groupe.texte}</p>
          <span style={tag}>{h.formules.groupe.tag}</span>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ go }) {
  const h = useT(HOME);
  const t = useT(ITIN);
  const cartes = circuitsLong(t);
  return (
    <>
      <HeroCarousel go={go} />

      <section className="wrap-full" style={{padding: '40px 48px 40px'}}>
        <div className="section-head">
          <div className="left">
            <div className="section-eyebrow">{h.itineraires.eyebrow}</div>
            <h2>{h.itineraires.titre}</h2>
            <div className="kicker">{h.itineraires.kicker}</div>
          </div>
          <div className="right">{h.itineraires.droite}</div>
        </div>
        <div className="itin-grid cols-4">
          {cartes.map(it => <ItineraryCard key={it.ref} it={it} go={go} />)}
        </div>
        <div style={{marginTop:40, textAlign:'center'}}>
          <button className="btn btn-secondary" onClick={()=>go('itineraries')}>{h.itineraires.bouton}</button>
        </div>
      </section>

      <ApprocheSection />
      <ReglesSection />
      <FormulesSection />

      <section className="story wrap">
        <div className="story-grid">
          <div className="story-visual">
            <ImageSlot id="story-portrait" placeholder={h.histoire.portrait} gradient={GRADIENTS.ember} src={P+'hands.jpg'} />
          </div>
          <div>
            <div className="section-eyebrow" style={{marginBottom:14}}>{h.histoire.eyebrow}</div>
            <h2>{h.histoire.titre}</h2>
            <p>{h.histoire.p1}</p>
            <p>{h.histoire.p2}</p>
            <div className="signature">
              <img src="/assets/seal-red.png" alt="" />
              <div>
                <b>{h.histoire.signature}</b>
                <span>{h.histoire.signatureSub}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{padding: '120px 48px', textAlign:'center'}}>
        <img src="/assets/seal-red.png" alt="" style={{width:96, height:96, marginBottom:24}} />
        <div className="section-eyebrow" style={{marginBottom:16}}>{h.contact.eyebrow}</div>
        <h2 style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:'clamp(36px, 4.5vw, 60px)', lineHeight:1.1, letterSpacing:'-0.02em', maxWidth:780, margin:'0 auto 18px'}}>
          {h.contact.titre}
        </h2>
        <p style={{fontFamily:'var(--font-serif)', fontSize:19, lineHeight:1.6, color:'var(--fg-2)', maxWidth:580, margin:'0 auto 32px'}}>
          {h.contact.texte}
        </p>
        <button className="btn btn-primary" onClick={()=>go('contact')}>{h.contact.bouton}</button>
      </section>
    </>
  );
}
