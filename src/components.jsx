import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { photoSet } from './photos.js'
import { alternatives, analyser, rt } from './paths.js'
import { LANG_LABELS, LANG_NAMES, LANGS, useLang } from './i18n.js'
import { COMMON } from './content/index.js'
import { useT } from './i18n.js'

// Composants partages : navigation, selecteur de langue, pied de page, primitives

// Selecteur de langue : pointe vers la page equivalente dans chaque langue.
export function SelecteurLangue({ pathname, compact }) {
  const lang = useLang();
  const c = useT(COMMON);
  const { key, ref } = analyser(pathname || '/');
  const liens = alternatives(key, ref);
  return (
    <div className={`nav-lang${compact ? ' compact' : ''}`} role="group" aria-label={c.nav.changerLangue}>
      {liens.map(l => (
        <Link key={l.lang}
              to={l.path}
              hrefLang={l.lang}
              lang={l.lang}
              className={l.lang === lang ? 'on' : ''}
              aria-current={l.lang === lang ? 'true' : undefined}
              title={LANG_NAMES[l.lang]}>
          {LANG_LABELS[l.lang]}
        </Link>
      ))}
    </div>
  );
}

export function Nav({ route, go, pathname }) {
  const lang = useLang();
  const c = useT(COMMON);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setDrawer(false); }, [route]);
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);
  const allerA = (r, p) => { setDrawer(false); go(r, p); };
  const overHero = route === 'home' && !scrolled;
  const showBg = scrolled || route !== 'home';
  const items = ['home', 'itineraries', 'japon', 'guide', 'about', 'journal']
    .map(id => ({ id, label: c.nav.items[id] }));
  return (
    <nav className={`nav${showBg ? ' scrolled' : ''}${overHero ? ' over-hero' : ''}`}>
      <div className="nav-brand" onClick={() => go('home')}>
        <img className="seal" src="/assets/seal-red.png" alt="" style={{width:51, height:52}} />
        <div style={{display:'flex', flexDirection:'column'}}>
          <img className="mark" src="/assets/wordmark-noir.png" alt="KIRAKU" style={{width:101, height:19}} />
          <span className="descriptor">Travel</span>
        </div>
      </div>
      <div className="nav-links">
        {items.map(it => {
          const cls = route === it.id || (it.id === 'itineraries' && route === 'detail') || (it.id === 'japon' && (route === 'japon-histoire' || route === 'japon-gastronomie')) ? 'active' : '';
          if (it.id !== 'itineraries') return (
            <a key={it.id} className={cls} onClick={(e) => { e.preventDefault(); go(it.id); }} href={rt(it.id, null, lang)}>{it.label}</a>
          );
          return (
            <div key={it.id} className="nav-has-mega" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <a className={cls + (open ? ' open' : '')} onClick={(e) => { e.preventDefault(); go(it.id); }} href={rt(it.id, null, lang)}>
                {it.label}<span className="caret" aria-hidden="true">⌄</span>
              </a>
            </div>
          );
        })}
      </div>
      <div className="nav-actions">
        <SelecteurLangue pathname={pathname} />
        <button className={`nav-cse${route === 'cse' ? ' active' : ''}`} onClick={() => go('cse')}>
          <span className="dot" aria-hidden="true"></span>{c.nav.cse}
        </button>
        <button className="nav-cta" onClick={() => go('contact')}>{c.nav.cta}</button>
        <button className={`nav-burger${drawer ? ' on' : ''}`} onClick={() => setDrawer(d => !d)} aria-label={c.nav.menu} aria-expanded={drawer}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`mega${open ? ' open' : ''}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <div className="mega-inner">
          {c.mega.map(col => (
            <div className="mega-col" key={col.key}>
              <a className="mega-title" href={rt(col.target[0], col.target[1], lang)} onClick={(e)=>{e.preventDefault(); setOpen(false); go(...col.target);}}>{col.label}<span aria-hidden="true"> →</span></a>
              <p className="mega-note">{col.note}</p>
              <ul>
                {col.links.map(l => (
                  <li key={l.label}><a href={rt(l.go[0], l.go[1], lang)} onClick={(e)=>{e.preventDefault(); setOpen(false); go(...l.go);}}>{l.label}</a></li>
                ))}
              </ul>
              <a className="mega-more" href={rt(col.more.go[0], col.more.go[1], lang)} onClick={(e)=>{e.preventDefault(); setOpen(false); go(...col.more.go);}}>{col.more.label}</a>
            </div>
          ))}
        </div>
      </div>
      <div className={`nav-drawer${drawer ? ' open' : ''}`}>
        <div className="nav-drawer-inner">
          <div className="nav-drawer-links">
            {items.map(it => (
              <a key={it.id} href={rt(it.id, null, lang)} className={route === it.id ? 'active' : ''} onClick={(e)=>{e.preventDefault(); allerA(it.id);}}>{it.label}</a>
            ))}
          </div>
          <div className="nav-drawer-sub">
            <h6>{c.nav.sousTitre}</h6>
            {c.mega.map(col => (
              <a key={col.key} href={rt(col.target[0], col.target[1], lang)} onClick={(e)=>{e.preventDefault(); allerA(...col.target);}}>{col.label}</a>
            ))}
          </div>
          <div className="nav-drawer-lang">
            <h6>{c.nav.langue}</h6>
            <SelecteurLangue pathname={pathname} compact />
          </div>
          <div className="nav-drawer-ctas">
            <button className="nav-cse" onClick={() => allerA('cse')}><span className="dot" aria-hidden="true"></span>{c.nav.cse}</button>
            <button className="nav-cta" onClick={() => allerA('contact')}>{c.nav.cta}</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Footer({ go }) {
  const lang = useLang();
  const c = useT(COMMON);
  const f = c.footer;
  const lien = (route, label) => (
    <li><a href={rt(route, null, lang)} onClick={(e)=>{e.preventDefault();go(route)}}>{label}</a></li>
  );
  return (
    <footer className="footer">
      <img className="seal-bg" src="/assets/seal-black.png" alt="" style={{position:'absolute', right:'-100px', bottom:'-140px', width:'460px', opacity:0.07, filter:'invert(1)'}} />
      <div className="wrap" style={{position:'relative'}}>
        <div className="ftr-grid">
          <div className="brand-block">
            <img className="mark" src="/assets/wordmark-white.png" alt="KIRAKU" />
            <div style={{fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(246,241,232,0.65)', marginTop:-8}}>Travel</div>
            <p>{f.baseline}</p>
          </div>
          <div>
            <h5>{f.colItin}</h5>
            <ul>
              {lien('itineraries', f.signatures)}
              {lien('itineraries', f.libertes)}
              {lien('itineraries', f.groupe)}
              {lien('contact', f.surMesure)}
            </ul>
          </div>
          <div>
            <h5>{f.colMaison}</h5>
            <ul>
              {lien('japon', f.japon)}
              {lien('japon-histoire', f.histoire)}
              {lien('japon-gastronomie', f.gastronomie)}
              {lien('guide', f.guide)}
              {lien('about', f.about)}
              {lien('journal', f.journal)}
              {lien('cse', f.cse)}
              {lien('contact', f.contact)}
            </ul>
          </div>
          <div>
            <h5>{f.colSuivre}</h5>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/japonautrement/" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="https://www.facebook.com/people/Kiraku-Travel/61594161231653/" target="_blank" rel="noopener">Facebook</a></li>
              <li><a href="#">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="atout-france">
          <img src="/assets/atout-france-logo.png" alt="Atout France" />
          <span>{f.atout}</span>
        </div>
        <div className="footer-bottom">
          <span>{f.copyright}</span>
          <span>
            <a href={rt('cgv', null, lang)} onClick={(e)=>{e.preventDefault();go('cgv')}}>{f.mentions}</a>
            {' · '}
            <a href={rt('cgv', null, lang)} onClick={(e)=>{e.preventDefault();go('cgv')}}>{f.cgv}</a>
            {' · '}
            <a href={rt('cgv', null, lang)} onClick={(e)=>{e.preventDefault();go('cgv')}}>{f.confidentialite}</a>
          </span>
          <span>{f.realise} <a href="https://www.shorai-group.com" target="_blank" rel="noopener" style={{color:'var(--kiraku-shu-soft)', textDecoration:'none'}}>ShorAI Consulting</a></span>
        </div>
      </div>
    </footer>
  );
}

export function ImageSlot({ id, placeholder, gradient, kanji, aspect, src, sizes, priority }) {
  // Photo responsive en WebP, avec degrade de marque en fond tant que
  // l'image n'est pas chargee ou lorsque le visuel n'existe pas encore.
  const style = {
    width: '100%', height: '100%',
    background: gradient || 'linear-gradient(135deg, #C8B89A 0%, #6B5A3E 100%)',
    position: 'relative', overflow: 'hidden',
  };
  if (aspect) style.aspectRatio = aspect;
  const set = photoSet(src);
  return (
    <div className="k-photo-wrap" style={style} data-slot={id}>
      {set && (
        <img
          className="k-photo"
          src={set.src}
          srcSet={set.srcSet}
          sizes={sizes || '(max-width: 900px) 100vw, 50vw'}
          alt={placeholder || ''}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={priority ? 'high' : undefined}
        />
      )}
      {kanji && <div className="k-photo-kanji">{kanji}</div>}
    </div>
  );
}

// Degrades de marque pour les itineraires, couleurs chaudes, jamais trop saturees
export const GRADIENTS = {
  forest:    'linear-gradient(160deg, #4A5F3A 0%, #2A3722 100%)',
  paper:     'linear-gradient(160deg, #C8B89A 0%, #6B5A3E 100%)',
  dusk:      'linear-gradient(160deg, #8B5A4A 0%, #3D2418 100%)',
  ocean:     'linear-gradient(160deg, #5B7A8C 0%, #2A3D4A 100%)',
  cherry:    'linear-gradient(160deg, #D4A0A8 0%, #8B4A5E 100%)',
  snow:      'linear-gradient(160deg, #C9D0D6 0%, #6E7884 100%)',
  rice:      'linear-gradient(160deg, #C9B872 0%, #6E5A28 100%)',
  ember:     'linear-gradient(160deg, #B8722E 0%, #5C3318 100%)',
};
