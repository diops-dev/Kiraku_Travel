import React, { useEffect, useState } from 'react'
import { photoSet } from './photos.js'
import { rt } from './paths.js'

// Shared components — Nav, Footer, primitives

export const MENU_ITIN = [
  { key: 'signatures', label: 'Signatures', target: ['itineraries'], note: 'Nos huit itinéraires longs, de sept à vingt-deux jours',
    links: [
      { label: 'Du Néon au Silence · 14 j', go: ['detail','CL-01'] },
      { label: 'Mille Marches vers le Nord · 14 j', go: ['detail','CL-02'] },
      { label: 'Des Temples aux Coraux · 14 j', go: ['detail','CL-03'] },
      { label: 'Le Premier Souffle · 7 j', go: ['detail','CL-04'] },
      { label: 'Au Cœur du Vieux Japon · 7 j', go: ['detail','CL-05'] },
      { label: 'La Traversée sans Hâte · 21 j', go: ['detail','CL-06'] },
      { label: 'Des Tours aux Toits de Chaume · 21 j', go: ['detail','CL-07'] },
      { label: "Jusqu'aux Cèdres Millénaires · 22 j", go: ['detail','CL-08'] },
    ],
    more: { label: 'Tous nos itinéraires signatures', go: ['itineraries'] } },
  { key: 'libertes', label: 'Séjours libertés', target: ['itineraries'], note: 'Journées prêtes à vivre, sans guide, à votre rythme',
    links: [
      { label: 'Le Tokyo des Néons', go: ['itineraries'] },
      { label: "Le Tokyo d'Edo", go: ['itineraries'] },
      { label: "Le Tokyo de l'Imaginaire", go: ['itineraries'] },
      { label: 'Kyoto Centre', go: ['itineraries'] },
      { label: 'Kyoto Est, le Chemin des Philosophes', go: ['itineraries'] },
      { label: 'Osaka Populaire', go: ['itineraries'] },
      { label: 'Enoshima et Kamakura', go: ['itineraries'] },
      { label: "L'Été des Ryukyu", go: ['itineraries'] },
    ],
    more: { label: 'Les seize séjours libertés', go: ['itineraries'] } },
  { key: 'groupe', label: 'Séjours en groupe', target: ['itineraries'], note: 'Quatre à huit voyageurs, accompagnés du départ au retour',
    links: [
      { label: 'Traversée des Alpes japonaises · 12 j', go: ['detail','CL-09'] },
      { label: 'Nos départs à venir', go: ['contact'] },
      { label: 'Voyager en petit groupe', go: ['about'] },
    ],
    more: { label: 'Nous écrire pour un départ', go: ['contact'] } },
  { key: 'sur-mesure', label: 'Sur-mesure', target: ['contact'], note: 'Un itinéraire écrit pour vous, à partir de vos envies',
    links: [
      { label: 'Comment nous travaillons', go: ['about'] },
      { label: 'Ce qui est toujours inclus', go: ['guide'] },
    ],
    more: { label: 'Demander une proposition', go: ['contact'] } },
];

export function Nav({ route, go }) {
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
  const items = [
    { id: 'home', label: 'Accueil' },
    { id: 'itineraries', label: 'Itinéraires' },
    { id: 'japon', label: 'Le Japon' },
    { id: 'guide', label: 'Guide pratique' },
    { id: 'about', label: 'Notre approche' },
    { id: 'journal', label: 'Journal' },
  ];
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
            <a key={it.id} className={cls} onClick={(e) => { e.preventDefault(); go(it.id); }} href={rt(it.id)}>{it.label}</a>
          );
          return (
            <div key={it.id} className="nav-has-mega" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <a className={cls + (open ? ' open' : '')} onClick={(e) => { e.preventDefault(); go(it.id); }} href={rt(it.id)}>
                {it.label}<span className="caret" aria-hidden="true">⌄</span>
              </a>
            </div>
          );
        })}
      </div>
      <div className="nav-actions">
        <button className={`nav-cse${route === 'cse' ? ' active' : ''}`} onClick={() => go('cse')}>
          <span className="dot" aria-hidden="true"></span>CSE
        </button>
        <button className="nav-cta" onClick={() => go('contact')}>Contactez-nous</button>
        <button className={`nav-burger${drawer ? ' on' : ''}`} onClick={() => setDrawer(d => !d)} aria-label="Menu" aria-expanded={drawer}>
          <span></span><span></span><span></span>
        </button>
      </div>
      <div className={`mega${open ? ' open' : ''}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        <div className="mega-inner">
          {MENU_ITIN.map(col => (
            <div className="mega-col" key={col.key}>
              <a className="mega-title" href={rt(...col.target)} onClick={(e)=>{e.preventDefault(); setOpen(false); go(...col.target);}}>{col.label}<span aria-hidden="true"> →</span></a>
              <p className="mega-note">{col.note}</p>
              <ul>
                {col.links.map(l => (
                  <li key={l.label}><a href={rt(...l.go)} onClick={(e)=>{e.preventDefault(); setOpen(false); go(...l.go);}}>{l.label}</a></li>
                ))}
              </ul>
              <a className="mega-more" href={rt(...col.more.go)} onClick={(e)=>{e.preventDefault(); setOpen(false); go(...col.more.go);}}>{col.more.label}</a>
            </div>
          ))}
        </div>
      </div>
      <div className={`nav-drawer${drawer ? ' open' : ''}`}>
        <div className="nav-drawer-inner">
          <div className="nav-drawer-links">
            {items.map(it => (
              <a key={it.id} href={rt(it.id)} className={route === it.id ? 'active' : ''} onClick={(e)=>{e.preventDefault(); allerA(it.id);}}>{it.label}</a>
            ))}
          </div>
          <div className="nav-drawer-sub">
            <h6>Itinéraires</h6>
            {MENU_ITIN.map(col => (
              <a key={col.key} href={rt(...col.target)} onClick={(e)=>{e.preventDefault(); allerA(...col.target);}}>{col.label}</a>
            ))}
          </div>
          <div className="nav-drawer-ctas">
            <button className="nav-cse" onClick={() => allerA('cse')}><span className="dot" aria-hidden="true"></span>CSE</button>
            <button className="nav-cta" onClick={() => allerA('contact')}>Contactez-nous</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Footer({ go }) {
  return (
    <footer className="footer">
      <img className="seal-bg" src="/assets/seal-black.png" alt="" style={{position:'absolute', right:'-100px', bottom:'-140px', width:'460px', opacity:0.07, filter:'invert(1)'}} />
      <div className="wrap" style={{position:'relative'}}>
        <div className="ftr-grid">
          <div className="brand-block">
            <img className="mark" src="/assets/wordmark-white.png" alt="KIRAKU" />
            <div style={{fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(246,241,232,0.65)', marginTop:-8}}>Travel</div>
            <p>Des voyages au Japon retissés autour de vous, au rythme des saisons. De un à huit voyageurs en privé, de quatre à huit en petit groupe.</p>
          </div>
          <div>
            <h5>Itinéraires</h5>
            <ul>
              <li><a href={rt('itineraries')} onClick={(e)=>{e.preventDefault();go('itineraries')}}>Signatures</a></li>
              <li><a href={rt('itineraries')} onClick={(e)=>{e.preventDefault();go('itineraries')}}>Séjours libertés</a></li>
              <li><a href={rt('itineraries')} onClick={(e)=>{e.preventDefault();go('itineraries')}}>Séjours en groupe</a></li>
              <li><a href={rt('contact')} onClick={(e)=>{e.preventDefault();go('contact')}}>Sur-mesure</a></li>
            </ul>
          </div>
          <div>
            <h5>Maison</h5>
            <ul>
              <li><a href={rt('japon')} onClick={(e)=>{e.preventDefault();go('japon')}}>Le Japon</a></li>
              <li><a href={rt('japon-histoire')} onClick={(e)=>{e.preventDefault();go('japon-histoire')}}>Histoire</a></li>
              <li><a href={rt('japon-gastronomie')} onClick={(e)=>{e.preventDefault();go('japon-gastronomie')}}>Gastronomie</a></li>
              <li><a href={rt('guide')} onClick={(e)=>{e.preventDefault();go('guide')}}>Guide pratique</a></li>
              <li><a href={rt('about')} onClick={(e)=>{e.preventDefault();go('about')}}>Notre approche</a></li>
              <li><a href={rt('journal')} onClick={(e)=>{e.preventDefault();go('journal')}}>Le journal</a></li>
              <li><a href={rt('cse')} onClick={(e)=>{e.preventDefault();go('cse')}}>Comités d'entreprise, CSE</a></li>
              <li><a href={rt('contact')} onClick={(e)=>{e.preventDefault();go('contact')}}>Nous écrire</a></li>
            </ul>
          </div>
          <div>
            <h5>Suivre</h5>
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
          <span>Immatriculée Atout France sous le n° IM075260052</span>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Kiraku Travel · IM075260052 · Paris &amp; partout au Japon</span>
          <span><a href={rt('cgv')} onClick={(e)=>{e.preventDefault();go('cgv')}}>Mentions légales</a> · <a href={rt('cgv')} onClick={(e)=>{e.preventDefault();go('cgv')}}>CGV</a> · <a href={rt('cgv')} onClick={(e)=>{e.preventDefault();go('cgv')}}>Confidentialité</a></span>
          <span>Site réalisé par <a href="https://www.shorai-group.com" target="_blank" rel="noopener" style={{color:'var(--kiraku-shu-soft)', textDecoration:'none'}}>ShorAI Consulting</a></span>
        </div>
      </div>
    </footer>
  );
}

export function ImageSlot({ id, placeholder, gradient, kanji, aspect, src, sizes, priority }) {
  // Photo responsive en WebP, avec dégradé de marque en fond tant que
  // l'image n'est pas chargée ou lorsque le visuel n'existe pas encore.
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
          fetchPriority={priority ? 'high' : undefined}
        />
      )}
      {kanji && <div className="k-photo-kanji">{kanji}</div>}
    </div>
  );
}

// Stock-ish gradients pour les itinéraires (couleurs chaudes, jamais trop saturées)
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

