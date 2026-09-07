import React, { useEffect, useState } from 'react'
import { rt } from './paths.js'
import { GRADIENTS, ImageSlot } from './components.jsx'

// Homepage, hero, featured itineraries, approche, règles, formules, premier contact

const P = '/photos/';

export const CIRCUITS_LONG = [
  { ref: 'CL-01', kanji: '静', title: 'Du Néon au Silence', duree: '14 j / 13 n', grad: 'dusk', ribbon: 'Culturel', photo: P+'tokyo-night.jpg' },
  { ref: 'CL-02', kanji: '北', title: 'Mille Marches vers le Nord', duree: '14 j / 13 n', grad: 'forest', ribbon: 'Spirituel', photo: P+'takachiho.jpg' },
  { ref: 'CL-03', kanji: '海', title: 'Des Temples aux Coraux', duree: '14 j / 13 n', grad: 'ocean', ribbon: 'Bien Être', photo: P+'miyajima-torii.jpg' },
  { ref: 'CL-04', kanji: '息', title: 'Le Premier Souffle', duree: '7 j / 6 n', grad: 'cherry', ribbon: 'Culturel', photo: P+'yasaka-kimono.jpg' },
  { ref: 'CL-05', kanji: '古', title: 'Au Cœur du Vieux Japon', duree: '7 j / 6 n', grad: 'paper', ribbon: 'Arts Martiaux', photo: P+'kiyomizu-street.jpg' },
  { ref: 'CL-06', kanji: '渡', title: 'La Traversée sans Hâte', duree: '21 j / 20 n', grad: 'snow', ribbon: 'Gastronomie', photo: P+'youtei-snow.jpg' },
  { ref: 'CL-07', kanji: '茅', title: 'Des Tours aux Toits de Chaume', duree: '21 j / 20 n', grad: 'rice', ribbon: 'Anime & Manga', photo: P+'fuji-city.jpg' },
  { ref: 'CL-08', kanji: '杉', title: 'Jusqu\'aux Cèdres Millénaires', duree: '22 j / 21 n', grad: 'ember', ribbon: 'Miyazaki', photo: P+'fushimi-inari.jpg' },
  { ref: 'CL-09', kanji: '岳', title: 'Tokyo, Kyoto et traversée méridionale des Alpes japonaises', duree: '12 j / 11 n', grad: 'snow', ribbon: 'Randonnée', privateNote: '4 à 8 en petit groupe' },
];

export const CIRCUITS_SHORT = [
  { ref: 'CT-01', title: 'Le Tokyo des Néons', zone: 'Shinjuku, Harajuku, Shibuya', intensite: 'Soutenue' },
  { ref: 'CT-02', title: 'Le Tokyo d\'Edo', zone: 'Asakusa, Ueno, Akihabara', intensite: 'Modérée' },
  { ref: 'CT-03', title: 'Le Tokyo des Hauteurs et de la Baie', zone: 'Asakusa, Skytree, Odaiba', intensite: 'Modérée' },
  { ref: 'CT-04', title: 'Le Tokyo Lettré', zone: 'Ueno, Akihabara, Kanda, Jimbocho', intensite: 'Modérée' },
  { ref: 'CT-05', title: 'Le Tokyo des Panoramas', zone: 'Shinjuku, Roppongi, Daimon', intensite: 'Modérée' },
  { ref: 'CT-06', title: 'Le Tokyo de l\'Imaginaire', zone: 'Ghibli, Kichijoji, Koenji, Nakano', intensite: 'Douce' },
  { ref: 'CT-07', title: 'Yokohama, la Porte du Large', zone: 'Kanagawa', intensite: 'Douce' },
  { ref: 'CT-08', title: 'Enoshima et Kamakura', zone: 'Kanagawa', intensite: 'Soutenue' },
  { ref: 'CT-09', title: 'Takaosan, la Montagne des Tengu', zone: 'Tokyo ouest', intensite: 'Sportive' },
  { ref: 'CT-10', title: 'Nikko, le Sanctuaire dans les Cèdres', zone: 'Tochigi', intensite: 'Modérée à sportive' },
  { ref: 'CT-11', title: 'Kyoto Centre', zone: 'Palais impérial, Nishiki, Gion', intensite: 'Douce' },
  { ref: 'CT-12', title: 'Kyoto Est, le Chemin des Philosophes', zone: 'Higashiyama nord', intensite: 'Soutenue' },
  { ref: 'CT-13', title: 'Kyoto Nord', zone: 'Arashiyama, Hozugawa, Kinkakuji', intensite: 'Modérée' },
  { ref: 'CT-14', title: 'Kyoto, les Dix Mille Torii', zone: 'Fushimi Inari, Higashiyama sud', intensite: 'Sportive' },
  { ref: 'CT-15', title: 'Osaka, la Ville qui Mange', zone: 'Umeda, château d\'Osaka', intensite: 'Douce' },
  { ref: 'CT-16', title: 'Osaka Populaire', zone: 'Shinsekai, Shitennoji, Namba, Dotonbori', intensite: 'Modérée' },
];

export const EXTENSIONS = [
  { ref: 'EX-01', title: 'L\'Été des Ryukyu', zone: 'Extension', intensite: '5 j / 4 n' },
];

export function ItineraryCard({ it, go }) {
  return (
    <a className="itin" onClick={(e)=>{e.preventDefault(); go('detail', it.ref)}} href={rt('detail', it.ref)}>
      <div className="photo">
        <ImageSlot id={`itin-${it.ref}`} placeholder={`Photo, ${it.title}`} gradient={GRADIENTS[it.grad]} src={it.photo} />
        <div className="kanji-watermark">{it.kanji}</div>
        {it.ribbon ? <div className="ribbon">{it.ribbon}</div> : null}
      </div>
      <div className="body">
        <div className="eyebrow-sm">ITINÉRAIRE LONG · {it.ref}</div>
        <h3 className="title">{it.title}</h3>
        <div className="meta">
          <span>{it.duree}</span>
          <span>{it.privateNote || 'Jusqu\'à 6 en privé'}</span>
        </div>
      </div>
    </a>
  );
}

function HeroCarousel({ go }) {
  const slides = [
    { id: 'hero-1', photo: P+'alley.jpg', placeholder: 'Photo héro 1 · ruelle, ryokan, marché…', grad: GRADIENTS.dusk },
    { id: 'hero-2', photo: P+'chureito-fuji.jpg', placeholder: 'Photo héro 2 · sentier, forêt, temple…', grad: GRADIENTS.forest },
    { id: 'hero-3', photo: P+'torii-walkway.jpg', placeholder: 'Photo héro 3 · artisan, atelier, mains…', grad: GRADIENTS.ember },
    { id: 'hero-4', photo: P+'youtei-snow.jpg', placeholder: 'Photo héro 4 · onsen, neige, brume…', grad: GRADIENTS.snow },
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
            <ImageSlot id={s.id} placeholder={s.placeholder} gradient={s.grad} src={s.photo} sizes="100vw" priority={idx === 0} />
          </div>
        ))}
        <div className="hero-scrim"></div>
      </div>

      <img className="hero-stamp" src="/assets/seal-red.png" alt="" />

      <div className="hero-content">
        <div className="hero-eyebrow">VOYAGES AU JAPON · DEPUIS PARIS</div>
        <h1>Le Japon qui prend <span className="brush">son temps</span>.</h1>
        <p>
          Des circuits retissés autour de vous, de un à huit voyageurs en privé, de quatre à huit en petit groupe. On voyage en train, parce que c'est comme ça que le Japon est pensé.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={() => go('itineraries')}>Voir les itinéraires</button>
          <button className="btn btn-link" onClick={() => go('about')}>Notre approche →</button>
        </div>
      </div>

      <div className="hero-counter">{String(i + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</div>
      <div className="hero-dots">
        {slides.map((_, idx) => (
          <button key={idx}
                  className={idx === i ? 'active' : ''}
                  onClick={() => setI(idx)}
                  aria-label={`Image ${idx + 1}`}></button>
        ))}
      </div>
    </section>
  );
}

const NE_FAIT_PAS = [
  'On ne vous promet pas un Japon secret. Le Japon n\'a pas besoin d\'être caché pour être vécu autrement.',
  'On ne vous met pas dans un ryokan qui a gardé le nom mais qui sert son petit-déjeuner en buffet.',
  'On ne vous fait pas visiter en groupe, aux heures où tout le monde visite.',
];

const CE_QUON_FAIT = [
  'On vous emmène dans des lieux insolites.',
  'On vous fait manger dans les tables où les Japonais eux-mêmes vont manger.',
  'On vous montre comment les Japonais vivent au quotidien.',
  'On vous fait épouser la culture pour de vrai : la religion, la philosophie, le travail, la gastronomie, les transports.',
  'On voyage en train, parce que c\'est comme ça que le Japon est pensé.',
  'On visite au lever du jour, avant les groupes.',
];

function ApprocheSection() {
  const col = { display:'flex', flexDirection:'column', gap:18 };
  const item = { fontFamily:'var(--font-serif)', fontSize:18, lineHeight:1.7, color:'var(--fg-2)', margin:0, textWrap:'pretty' };
  return (
    <section className="wrap" style={{padding:'20px 48px 40px'}}>
      <div className="section-head">
        <div className="left">
          <div className="section-eyebrow">NOTRE APPROCHE</div>
          <h2>Ce qu'on fait, ce qu'on ne fait pas.</h2>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 56px', alignItems:'stretch', marginTop:12}}>
        <div style={{background:'var(--kiraku-washi-2)', borderRadius:14, padding:'34px 36px', borderTop:'3px solid transparent'}}>
          <div className="section-eyebrow" style={{marginBottom:20, color:'var(--fg-muted)'}}>CE QU'ON NE FAIT PAS</div>
          <div style={col}>
            {NE_FAIT_PAS.map((t,i) => <p key={i} style={item}>{t}</p>)}
          </div>
        </div>
        <div style={{background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderTop:'3px solid var(--kiraku-shu)', borderRadius:14, padding:'34px 36px'}}>
          <div className="section-eyebrow" style={{marginBottom:20, color:'var(--kiraku-shu)'}}>CE QU'ON FAIT</div>
          <div style={col}>
            {CE_QUON_FAIT.map((t,i) => <p key={i} style={item}>{t}</p>)}
          </div>
        </div>
      </div>
      <blockquote style={{margin:'48px auto 0', maxWidth:820, textAlign:'center', fontFamily:'var(--font-serif)', fontStyle:'italic', fontSize:23, lineHeight:1.6, color:'var(--fg)', textWrap:'pretty'}}>
        « C'est lent. C'est cher, pour nous. Mais c'est la seule façon de garantir qu'Hirosan sera toujours là, et qu'elle préparera le petit-déjeuner à sept heures. »
      </blockquote>
    </section>
  );
}

function ReglesSection() {
  return (
    <section className="band">
      <div className="band-kanji">楽</div>
      <div className="wrap" style={{position:'relative'}}>
        <div className="section-head">
          <div className="left">
            <div className="section-eyebrow">NOS RÈGLES</div>
            <h2>Trois règles qu'on s'est données.</h2>
          </div>
        </div>
        <div className="principles">
          <div className="principle">
            <div className="num">01 ·</div>
            <h3>Huit personnes maximum, en privé comme en groupe.</h3>
            <p>De un à huit voyageurs en privé, de quatre à huit en petit groupe. Au-delà, ce n'est plus le même voyage.</p>
          </div>
          <div className="principle">
            <div className="num">02 ·</div>
            <h3>Le ryokan familial, le <i>minshuku</i> : quand c'est possible.</h3>
            <p>Selon les étapes et la saison. On ne promet pas à huit ce qu'on ne peut tenir qu'à deux, et on vous dit lesquelles avant de partir.</p>
          </div>
          <div className="principle">
            <div className="num">03 ·</div>
            <h3>Chaque circuit est retissé autour de vous.</h3>
            <p>Votre rythme, vos goûts, votre saison. Rien n'est standardisé.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormulesSection({ go }) {
  const card = { background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderRadius:14, padding:'36px 38px' };
  const h = { fontFamily:'var(--font-display)', fontWeight:600, fontSize:30, lineHeight:1.15, letterSpacing:'-0.02em', margin:'0 0 16px' };
  const p = { fontFamily:'var(--font-serif)', fontSize:18, lineHeight:1.75, color:'var(--fg-2)', margin:0, textWrap:'pretty' };
  const tag = { fontFamily:'var(--font-sans)', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--kiraku-shu)', marginTop:22, display:'block' };
  return (
    <section className="wrap" style={{padding:'80px 48px'}}>
      <div className="section-head">
        <div className="left">
          <div className="section-eyebrow">NOS FORMULES DE VOYAGE</div>
          <h2>Deux façons de partir.</h2>
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:32, alignItems:'start'}}>
        <div style={card}>
          <h3 style={h}>Le voyage privé.</h3>
          <p style={p}>Pas de date imposée. Vous partez quand vous voulez, pour la durée que vous voulez. On dessine le circuit autour de vos envies, de votre rythme, de votre saison.</p>
          <span style={tag}>De un à huit voyageurs</span>
        </div>
        <div style={card}>
          <h3 style={h}>Le petit groupe.</h3>
          <p style={p}>De quatre à huit voyageurs, à dates fixes, avec un guide francophone du premier au dernier jour.</p>
          <span style={tag}>De quatre à huit voyageurs</span>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ go }) {
  return (
    <>
      <HeroCarousel go={go} />

      <section className="wrap-full" style={{padding: '40px 48px 40px'}}>
        <div className="section-head">
          <div className="left">
            <div className="section-eyebrow">NOS ITINÉRAIRES LONGS</div>
            <h2>Neuf circuits, de sept à vingt-deux jours.</h2>
            <div className="kicker">· et seize itinéraires courts pour les compléter.</div>
          </div>
          <div className="right">
            Chaque circuit est retissé autour de vous : votre rythme, vos goûts, votre saison. Si la date vous va, on s'occupe du reste.
          </div>
        </div>
        <div className="itin-grid cols-4">
          {CIRCUITS_LONG.map(it => <ItineraryCard key={it.ref} it={it} go={go} />)}
        </div>
        <div style={{marginTop:40, textAlign:'center'}}>
          <button className="btn btn-secondary" onClick={()=>go('itineraries')}>Voir les vingt-cinq itinéraires</button>
        </div>
      </section>

      <ApprocheSection />
      <ReglesSection />
      <FormulesSection go={go} />

      <section className="story wrap">
        <div className="story-grid">
          <div className="story-visual">
            <ImageSlot id="story-portrait" placeholder="Portrait des fondateurs, Olivier et Frédéric" gradient={GRADIENTS.ember} src={P+'hands.jpg'} />
          </div>
          <div>
            <div className="section-eyebrow" style={{marginBottom:14}}>NOTRE HISTOIRE</div>
            <h2>Un Japon qu'on ne trouve pas sur Google Maps.</h2>
            <p>
              Kiraku est né il y a près de vingt ans, d'une passion pour le Japon qui ne s'est jamais démentie : des voyages, encore des voyages, une vie tournée vers le Japon.
            </p>
            <p>
              Un carnet d'adresses construit voyage après voyage : artisans, ryokan, cuisiniers. Pas d'algorithme, pas de plateforme. Juste des numéros qu'on appelle.
            </p>
            <div className="signature">
              <img src="/assets/seal-red.png" alt="" />
              <div>
                <b>Olivier et Frédéric</b>
                <span>Franco-japonais, une vie tournée vers le Japon. Ils font découvrir et guident le Japon depuis plus de dix ans.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{padding: '120px 48px', textAlign:'center'}}>
        <img src="/assets/seal-red.png" alt="" style={{width:96, height:96, marginBottom:24}} />
        <div className="section-eyebrow" style={{marginBottom:16}}>PREMIER CONTACT</div>
        <h2 style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:'clamp(36px, 4.5vw, 60px)', lineHeight:1.1, letterSpacing:'-0.02em', maxWidth:780, margin:'0 auto 18px'}}>
          On commence par un appel de trente minutes.
        </h2>
        <p style={{fontFamily:'var(--font-serif)', fontSize:19, lineHeight:1.6, color:'var(--fg-2)', maxWidth:580, margin:'0 auto 32px'}}>
          Vous nous racontez ce qui vous tente. On vous dit si c'est la bonne saison.
        </p>
        <button className="btn btn-primary" onClick={()=>go('contact')}>Prendre rendez-vous</button>
      </section>
    </>
  );
}

