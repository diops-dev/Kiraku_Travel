import React from 'react'
import { rt } from './paths.js'
import { GRADIENTS, ImageSlot } from './components.jsx'

// Le Japon (hub, Histoire, Gastronomie) + Guide pratique

const ERES = [
  { nom: 'Heian', annees: '794 · 1185', sur: 'La cour de Kyoto', kanji: '平',
    txt: 'La capitale se déplace à Kyoto. Pendant quatre siècles, une aristocratie raffinée invente une grande partie de l’esthétique japonaise : la littérature de cour, le culte de la saison, un sens du beau qui n’a jamais vraiment quitté le pays.' },
  { nom: 'Edo', annees: '1603 · 1868', sur: 'La paix des Tokugawa', kanji: '江',
    txt: 'Deux cent cinquante ans de paix imposée par les shoguns Tokugawa, un pays fermé sur lui-même, et l’essor d’une culture urbaine et marchande : l’estampe, le kabuki, les grandes routes comme le Nakasendo que l’on parcourt encore aujourd’hui.' },
  { nom: 'Meiji', annees: '1868 · 1912', sur: 'L’ouverture', kanji: '明',
    txt: 'Le pays s’ouvre par la force au commerce occidental, puis se modernise à une vitesse inédite : industrie, armée, institutions occidentales, tout en gardant l’empereur comme figure centrale.' },
];

const ERES_RESERVE = [
  'Les origines, jusqu’au VIIe siècle',
  'Nara et l’arrivée du bouddhisme',
  'Kamakura, les premiers shoguns',
  'Muromachi, l’âge des guerres',
  'Guerre et reconstruction',
  'Le Japon contemporain',
];

const PREFECTURES = [
  { nom: 'Tokyo', num: 'Préfecture 13', kanji: '東', grad: 'dusk', photo: '/photos/tokyo-night.jpg',
    txt: 'La capitale a inventé le sushi tel qu’on le connaît aujourd’hui : l’Edomae, né sur les quais de la baie d’Edo, pensé pour se manger vite et debout. On y trouve aussi le tempura, la friture légère venue du XVIe siècle, l’anguille grillée (unagi) et le soba, la nouille de sarrasin des artisans d’Edo. Tokyo est une ville de spécialistes : un restaurant, un plat, toute une vie à le perfectionner.' },
  { nom: 'Kyoto', num: 'Préfecture 26', kanji: '京', grad: 'cherry', photo: '/photos/kiyomizu-street.jpg',
    txt: 'Ancienne capitale impériale, Kyoto a donné naissance au kaiseki, le repas en plusieurs services qui suit les saisons à la lettre. La ville vit aussi de son tofu, réputé pour la pureté de son eau, de sa cuisine végétarienne des temples bouddhistes (shojin ryori), et de son obanzai, la cuisine familiale kyotoïte, discrète et jamais gaspillée. C’est enfin la capitale du thé et des wagashi, les pâtisseries pensées pour l’accompagner.' },
  { nom: 'Osaka', num: 'Préfecture 27', kanji: '阪', grad: 'ember', photo: '/photos/osaka-castle.jpg',
    txt: 'Osaka se surnomme elle-même « la cuisine du pays » (tenka no daidokoro). Ville marchande, elle a fait de la rue sa table : takoyaki (boulettes de poulpe), okonomiyaki (galette garnie), kushikatsu (brochettes panées). Une cuisine généreuse, populaire, pensée pour se partager entre amis, à l’opposé de la retenue de Kyoto à quelques dizaines de kilomètres.' },
];

const HIRAGANA = [
  ['', 'a あ','i い','u う','e え','o お'],
  ['k','ka か','ki き','ku く','ke け','ko こ'],
  ['s','sa さ','shi し','su す','se せ','so そ'],
  ['t','ta た','chi ち','tsu つ','te て','to と'],
  ['n','na な','ni に','nu ぬ','ne ね','no の'],
  ['h','ha は','hi ひ','fu ふ','he へ','ho ほ'],
  ['m','ma ま','mi み','mu む','me め','mo も'],
  ['y','ya や','','yu ゆ','','yo よ'],
  ['r','ra ら','ri り','ru る','re れ','ro ろ'],
  ['w','wa わ','','','','wo を'],
  ['n','n ん','','','',''],
];
const KATAKANA = [
  ['', 'a ア','i イ','u ウ','e エ','o オ'],
  ['k','ka カ','ki キ','ku ク','ke ケ','ko コ'],
  ['s','sa サ','shi シ','su ス','se セ','so ソ'],
  ['t','ta タ','chi チ','tsu ツ','te テ','to ト'],
  ['n','na ナ','ni ニ','nu ヌ','ne ネ','no ノ'],
  ['h','ha ハ','hi ヒ','fu フ','he ヘ','ho ホ'],
  ['m','ma マ','mi ミ','mu ム','me メ','mo モ'],
  ['y','ya ヤ','','yu ユ','','yo ヨ'],
  ['r','ra ラ','ri リ','ru ル','re レ','ro ロ'],
  ['w','wa ワ','','','','wo ヲ'],
  ['n','n ン','','','',''],
];
const KANJI_VOYAGE = [
  ['日','hi / nichi','jour, soleil'],
  ['本','hon','origine, livre (日本 = Japon)'],
  ['人','hito / jin','personne'],
  ['大','dai / oo','grand'],
  ['小','shou / chii','petit'],
  ['中','chuu / naka','milieu, dans'],
  ['出','shutsu / de','sortie, sortir'],
  ['入','nyuu / hai','entrée, entrer'],
  ['口','kuchi / kou','ouverture (出口 = sortie)'],
  ['駅','eki','gare'],
  ['円','en','yen'],
  ['山','yama / san','montagne'],
  ['川','kawa','rivière'],
  ['東','higashi / tou','est (東京 = Tokyo)'],
  ['京','kyou','capitale (京都 = Kyoto)'],
];
const PHRASES_UTILES = [
  ['Bonjour','Konnichiwa'],['Bonsoir','Konbanwa'],['Au revoir','Sayonara'],
  ['Merci','Arigatou gozaimasu'],['Merci beaucoup','Doumo arigatou gozaimasu'],
  ['S’il vous plaît','Onegaishimasu'],['Excusez-moi, pardon','Sumimasen'],
  ['Oui','Hai'],['Non','Iie'],['Je ne comprends pas','Wakarimasen'],
  ['Parlez-vous français / anglais ?','Furansugo / Eigo o hanasemasu ka'],
  ['Combien ça coûte ?','Ikura desu ka'],['Où sont les toilettes ?','Toire wa doko desu ka'],
  ['L’addition, s’il vous plaît','Okaikei onegaishimasu'],['C’est délicieux','Oishii desu'],
  ['Une / deux / trois personnes','Hitori / Futari / San-nin'],['Je voudrais…','… o kudasai'],
  ['Sans (ingrédient, allergie)','… nashi de'],['Où est la gare ?','Eki wa doko desu ka'],
  ['À quelle heure part le train ?','Densha wa nanji ni demasu ka'],
  ['Je suis perdu','Michi ni mayoimashita'],['Pouvez-vous m’aider ?','Tetsudatte moraemasu ka'],
  ['C’est combien jusqu’à… ?','… made ikura desu ka'],['Un billet pour…','… made no kippu o kudasai'],
  ['Où puis-je acheter… ?','… wa doko de kaemasu ka'],['Je suis allergique à…','… arerugii ga arimasu'],
  ['Au secours','Tasukete'],['Appelez une ambulance','Kyuukyuusha o yonde kudasai'],
  ['Où est l’hôpital ?','Byouin wa doko desu ka'],['Avant de manger','Itadakimasu'],
  ['Après avoir mangé','Gochisousama deshita'],
];

const jp = { display:'var(--font-display)' };
const bodyTxt = { fontFamily:'var(--font-serif)', fontSize:18, lineHeight:1.75, color:'var(--fg-2)', margin:0, textWrap:'pretty' };

function PageHero({ eyebrow, titre, lede, kanji, id, photo, grad }) {
  return (
    <section style={{position:'relative', background:'var(--kiraku-sumi)', overflow:'hidden', marginBottom:0}}>
      <div style={{position:'absolute', inset:0, opacity:0.34}}>
        <ImageSlot id={id} placeholder={`Photo, ${titre}`} gradient={GRADIENTS[grad || 'dusk']} src={photo} />
      </div>
      <div style={{position:'absolute', right:-40, bottom:-140, fontFamily:jp.display, fontSize:420, lineHeight:0.8, color:'rgba(246,241,232,0.09)', pointerEvents:'none'}}>{kanji}</div>
      <div className="wrap" style={{position:'relative', padding:'120px 48px 88px'}}>
        <div className="section-eyebrow" style={{color:'var(--kiraku-shu-soft)'}}>{eyebrow}</div>
        <h1 style={{fontFamily:jp.display, fontWeight:600, fontSize:'clamp(40px, 5vw, 68px)', lineHeight:1.08, letterSpacing:'-0.025em', color:'var(--kiraku-washi)', margin:'18px 0 0', maxWidth:900, textWrap:'balance'}}>{titre}</h1>
        <p style={{fontFamily:'var(--font-serif)', fontSize:21, lineHeight:1.62, color:'rgba(246,241,232,0.8)', margin:'24px 0 0', maxWidth:820, textWrap:'pretty'}}>{lede}</p>
      </div>
    </section>
  );
}

export function JaponPage({ go }) {
  const card = { textDecoration:'none', display:'block', background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderTop:'3px solid var(--kiraku-shu)', borderRadius:14, padding:'44px 44px 48px', color:'inherit' };
  return (
    <>
      <PageHero eyebrow="LE JAPON" titre="Le pays avant le voyage." kanji="日" id="japon-hero" photo="/photos/chureito-fuji.jpg" grad="dusk"
        lede="Deux entrées pour comprendre où vous allez : les ères qui ont façonné le pays, et la cuisine qui en raconte la géographie, préfecture par préfecture." />
      <section className="wrap" style={{padding:'80px 48px 100px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'stretch'}}>
          <a href={rt('japon-histoire')} style={card} onClick={(e)=>{e.preventDefault(); go('japon-histoire')}}>
            <div className="section-eyebrow">SOUS-PAGE</div>
            <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:40, lineHeight:1.14, letterSpacing:'-0.02em', margin:'14px 0 18px'}}>Histoire</h2>
            <p style={bodyTxt}>Le Japon ne se raconte pas comme une ligne droite. C’est une succession d’ères, certaines fondatrices, d’autres simplement calmes. On ne raconte que celles qui ont vraiment façonné le pays que vous allez visiter.</p>
            <div style={{marginTop:26, fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.2em', color:'var(--fg-subtle)'}}>HEIAN · EDO · MEIJI</div>
          </a>
          <a href={rt('japon-gastronomie')} style={card} onClick={(e)=>{e.preventDefault(); go('japon-gastronomie')}}>
            <div className="section-eyebrow">SOUS-PAGE</div>
            <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:40, lineHeight:1.14, letterSpacing:'-0.02em', margin:'14px 0 18px'}}>Gastronomie</h2>
            <p style={bodyTxt}>Le Japon ne se mange pas de la même façon d’un bout à l’autre de l’archipel. Chaque préfecture a ses produits, ses techniques, ses plats qu’on ne trouve qu’ici.</p>
            <div style={{marginTop:26, fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.2em', color:'var(--fg-subtle)'}}>TOKYO · KYOTO · OSAKA</div>
          </a>
        </div>
      </section>
    </>
  );
}

export function HistoirePage({ go }) {
  return (
    <>
      <PageHero eyebrow="LE JAPON · HISTOIRE" titre="Trois ères, et le pays que vous allez visiter." kanji="歴" id="histoire-hero" photo="/photos/kinkakuji.jpg" grad="ember"
        lede="Le Japon ne se raconte pas comme une ligne droite. C’est une succession d’ères, certaines fondatrices, d’autres simplement calmes. On ne raconte que celles qui ont vraiment façonné le pays que vous allez visiter." />
      <section className="wrap" style={{padding:'72px 48px 40px'}}>
        {ERES.map((e,i) => (
          <article key={e.nom} style={{display:'grid', gridTemplateColumns:'300px 1fr', gap:56, padding:'44px 0', borderTop:'1px solid var(--border)', borderBottom: i===ERES.length-1 ? '1px solid var(--border)' : 'none'}}>
            <div>
              <div style={{fontFamily:jp.display, fontSize:52, lineHeight:1, color:'var(--kiraku-shu)'}}>{e.kanji}</div>
              <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:30, letterSpacing:'-0.015em', margin:'18px 0 6px'}}>{e.nom}</h2>
              <div style={{fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.2em', color:'var(--fg-subtle)'}}>{e.annees}</div>
              <div style={{...bodyTxt, fontSize:16, color:'var(--fg-muted)', marginTop:14}}>{e.sur}</div>
            </div>
            <p style={bodyTxt}>{e.txt}</p>
          </article>
        ))}
      </section>
      <section className="wrap" style={{padding:'24px 48px 100px'}}>
        <div className="section-eyebrow" style={{color:'var(--fg-subtle)'}}>À PARAÎTRE</div>
        <div style={{display:'flex', flexWrap:'wrap', gap:10, marginTop:18}}>
          {ERES_RESERVE.map(t => (
            <span key={t} style={{fontFamily:'var(--font-sans)', fontSize:14, color:'var(--fg-muted)', background:'var(--kiraku-washi-2)', borderRadius:999, padding:'9px 18px'}}>{t}</span>
          ))}
        </div>
      </section>
    </>
  );
}

export function GastronomiePage({ go }) {
  return (
    <>
      <PageHero eyebrow="LE JAPON · GASTRONOMIE" titre="La géographie racontée dans l’assiette." kanji="食" id="gastronomie-hero" photo="/photos/alley.jpg" grad="ember"
        lede="Le Japon ne se mange pas de la même façon d’un bout à l’autre de l’archipel. Chaque préfecture a ses produits, ses techniques, ses plats qu’on ne trouve qu’ici. Cette page se construit préfecture par préfecture, au fil de nos voyages et de nos rencontres avec les producteurs et les cuisiniers." />
      <section className="wrap-full" style={{padding:'72px 48px 56px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32, alignItems:'stretch'}}>
          {PREFECTURES.map(p => (
            <article key={p.nom} style={{background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderRadius:14, overflow:'hidden', display:'flex', flexDirection:'column'}}>
              <div style={{aspectRatio:'16/10', position:'relative'}}>
                <ImageSlot id={`pref-${p.nom}`} placeholder={`Photo, cuisine de ${p.nom}`} gradient={GRADIENTS[p.grad]} src={p.photo} />
                <div style={{position:'absolute', right:14, bottom:-10, fontFamily:jp.display, fontSize:104, lineHeight:1, color:'rgba(255,255,255,0.24)', fontWeight:600, pointerEvents:'none'}}>{p.kanji}</div>
              </div>
              <div style={{padding:'32px 34px 38px'}}>
                <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:30, letterSpacing:'-0.015em', margin:'0 0 4px'}}>{p.nom}</h2>
                <div style={{fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.2em', color:'var(--fg-subtle)', marginBottom:18}}>{p.num}</div>
                <p style={{...bodyTxt, fontSize:17}}>{p.txt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap" style={{padding:'0 48px 100px'}}>
        <div style={{background:'var(--kiraku-washi-2)', borderRadius:14, padding:'36px 40px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:40, flexWrap:'wrap'}}>
          <p style={{...bodyTxt, fontSize:17, maxWidth:760}}>Les quarante-quatre autres préfectures s’ajouteront au fil des voyages. Chaque fiche part d’un producteur, d’un cuisinier, ou d’un plat qu’on ne trouve nulle part ailleurs.</p>
          <span style={{flex:'0 0 auto', fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--kiraku-washi)', background:'var(--kiraku-sumi)', borderRadius:999, padding:'14px 26px'}}>3 / 47 publiées</span>
        </div>
      </section>
    </>
  );
}

function KanaTable({ rows }) {
  const th = { fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-muted)', fontWeight:600, padding:'0 6px 10px', borderBottom:'1px solid var(--border-strong)', textAlign:'center' };
  const td = { fontFamily:'var(--font-serif)', fontSize:17, color:'var(--fg-2)', padding:'11px 6px', borderBottom:'1px solid var(--hairline)', textAlign:'center' };
  return (
    <table style={{width:'100%', borderCollapse:'collapse', margin:'8px 0 0'}}>
      <thead><tr><th style={{...th, textAlign:'left', width:56}}></th>{['a','i','u','e','o'].map(c => <th key={c} style={th}>{c}</th>)}</tr></thead>
      <tbody>
        {rows.map((r,i) => (
          <tr key={i}>
            <th style={{...th, textAlign:'left', borderBottom:'1px solid var(--hairline)', padding:'11px 6px', color:'var(--kiraku-shu)'}}>{r[0]}</th>
            {r.slice(1).map((c,j) => <td key={j} style={td}>{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function GuidePage({ go }) {
  const blocs = [
    { t: 'Le métro et le Shinkansen', k: '駅', txt: 'Le réseau est méthodique une fois qu’on en a la clé : lignes couleur, correspondances fléchées, quais numérotés. Le Shinkansen relie les grandes villes à plus de 300 km/h, avec une ponctualité devenue légendaire. Nous vous expliquons comment réserver, où vous placer sur le quai, et comment enchaîner les correspondances sans stress.' },
    { t: 'La carte Suica', k: '円', txt: 'Une carte, et le quotidien japonais s’ouvre : métro, bus, trains, distributeurs, konbini, casiers à bagages. On la charge en quelques secondes à une borne et on avance. Nous vous la préparons dès votre arrivée.' },
    { t: 'Les baguettes', k: '食', txt: 'Les tenir n’est pas si difficile ; les bons réflexes le sont un peu plus. Ne jamais les planter debout dans le riz, ne jamais se les passer de main à main, ne jamais pointer avec. Quelques règles simples, et un repas qui se passe sans accroc.' },
  ];
  const th = { textAlign:'left', fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-muted)', fontWeight:600, padding:'0 16px 10px 0', borderBottom:'1px solid var(--border-strong)' };
  const td = { fontFamily:'var(--font-serif)', fontSize:16, color:'var(--fg-2)', padding:'12px 16px 12px 0', borderBottom:'1px solid var(--hairline)', verticalAlign:'top' };
  return (
    <>
      <PageHero eyebrow="GUIDE PRATIQUE" titre="La boîte à outils du voyage." kanji="道" id="guide-hero" photo="/photos/torii-walkway.jpg" grad="forest"
        lede="Les transports, la carte Suica, les usages de table, et de quoi déchiffrer une enseigne. Ce qu’il faut savoir avant de partir, et ce qu’on vous prépare sur place." />
      <section className="wrap" style={{padding:'72px 48px 24px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32, alignItems:'stretch'}}>
          {blocs.map(b => (
            <article key={b.t} style={{background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderRadius:14, padding:'36px 34px 40px'}}>
              <div style={{fontFamily:jp.display, fontSize:48, lineHeight:1, color:'var(--kiraku-shu)'}}>{b.k}</div>
              <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:26, letterSpacing:'-0.015em', margin:'20px 0 14px'}}>{b.t}</h2>
              <p style={{...bodyTxt, fontSize:17}}>{b.txt}</p>
            </article>
          ))}
        </div>
        <div style={{marginTop:24, fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-subtle)'}}>
          Déjà en place sur le site : JR Pass · Takkyubin · saisons · budget
        </div>
      </section>

      <section className="wrap" style={{padding:'64px 48px 40px'}}>
        <div className="section-head">
          <div className="left">
            <div className="section-eyebrow">LANGUE</div>
            <h2>Deux alphabets, quinze kanji, trente phrases.</h2>
            <div className="kicker">· de quoi lire une enseigne et commander un repas.</div>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, marginTop:8}}>
          <div>
            <h3 style={{fontFamily:jp.display, fontWeight:600, fontSize:24, margin:'0 0 6px'}}>Hiragana</h3>
            <KanaTable rows={HIRAGANA} />
          </div>
          <div>
            <h3 style={{fontFamily:jp.display, fontWeight:600, fontSize:24, margin:'0 0 6px'}}>Katakana</h3>
            <div style={{...bodyTxt, fontSize:15, color:'var(--fg-muted)', marginBottom:6}}>Mêmes sons, alphabet différent, utilisé pour les mots étrangers et les enseignes.</div>
            <KanaTable rows={KATAKANA} />
          </div>
        </div>
      </section>

      <section className="wrap" style={{padding:'40px 48px 100px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:56}}>
          <div>
            <h3 style={{fontFamily:jp.display, fontWeight:600, fontSize:24, margin:'0 0 12px'}}>Quinze kanji utiles au voyage</h3>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead><tr><th style={{...th, width:70}}>Kanji</th><th style={{...th, width:150}}>Lecture</th><th style={th}>Sens</th></tr></thead>
              <tbody>
                {KANJI_VOYAGE.map(r => (
                  <tr key={r[0]}>
                    <td style={{...td, fontFamily:jp.display, fontSize:26, lineHeight:1}}>{r[0]}</td>
                    <td style={{...td, fontFamily:'var(--font-sans)', fontSize:14}}>{r[1]}</td>
                    <td style={td}>{r[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 style={{fontFamily:jp.display, fontWeight:600, fontSize:24, margin:'0 0 12px'}}>Une trentaine de phrases utiles</h3>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead><tr><th style={{...th, width:'46%'}}>Français</th><th style={th}>Japonais (romaji)</th></tr></thead>
              <tbody>
                {PHRASES_UTILES.map(r => (
                  <tr key={r[0]}>
                    <td style={td}>{r[0]}</td>
                    <td style={{...td, fontFamily:'var(--font-sans)', fontSize:15, color:'var(--fg)'}}>{r[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

