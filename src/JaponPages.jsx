import React from 'react'
import { rt } from './paths.js'
import { GRADIENTS, ImageSlot } from './components.jsx'
import { useLang, useT } from './i18n.js'
import { JAPON } from './content/index.js'

// Le Japon (hub, Histoire, Gastronomie) et Guide pratique

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

const KANJI_PHOTOS = { hub: '日', histoire: '歴', gastronomie: '食', guide: '道' };
const PREF_KANJI = ['東', '京', '阪'];
const PREF_GRAD = ['dusk', 'cherry', 'ember'];
const PREF_PHOTO = ['/photos/tokyo-night.jpg', '/photos/kiyomizu-street.jpg', '/photos/osaka-castle.jpg'];
const BLOC_KANJI = ['駅', '円', '食'];

const jp = { display:'var(--font-display)' };
const bodyTxt = { fontFamily:'var(--font-serif)', fontSize:18, lineHeight:1.75, color:'var(--fg-2)', margin:0, textWrap:'pretty' };

function PageHero({ eyebrow, titre, lede, kanji, id, photo, grad, alt }) {
  return (
    <section style={{position:'relative', background:'var(--kiraku-sumi)', overflow:'hidden', marginBottom:0}}>
      <div style={{position:'absolute', inset:0, opacity:0.34}}>
        <ImageSlot id={id} placeholder={alt} gradient={GRADIENTS[grad || 'dusk']} src={photo} />
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
  const lang = useLang();
  const t = useT(JAPON);
  const h = t.hub;
  const card = { textDecoration:'none', display:'block', background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderTop:'3px solid var(--kiraku-shu)', borderRadius:14, padding:'44px 44px 48px', color:'inherit' };
  return (
    <>
      <PageHero eyebrow={h.eyebrow} titre={h.titre} lede={h.lede} kanji={KANJI_PHOTOS.hub} id="japon-hero"
        photo="/photos/chureito-fuji.jpg" grad="dusk" alt={`${h.photo}, ${h.titre}`} />
      <section className="wrap" style={{padding:'80px 48px 100px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'stretch'}}>
          <a href={rt('japon-histoire', null, lang)} style={card} onClick={(e)=>{e.preventDefault(); go('japon-histoire')}}>
            <div className="section-eyebrow">{h.sousPage}</div>
            <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:40, lineHeight:1.14, letterSpacing:'-0.02em', margin:'14px 0 18px'}}>{h.histoireTitre}</h2>
            <p style={bodyTxt}>{h.histoireTexte}</p>
            <div style={{marginTop:26, fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.2em', color:'var(--fg-subtle)'}}>HEIAN · EDO · MEIJI</div>
          </a>
          <a href={rt('japon-gastronomie', null, lang)} style={card} onClick={(e)=>{e.preventDefault(); go('japon-gastronomie')}}>
            <div className="section-eyebrow">{h.sousPage}</div>
            <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:40, lineHeight:1.14, letterSpacing:'-0.02em', margin:'14px 0 18px'}}>{h.gastroTitre}</h2>
            <p style={bodyTxt}>{h.gastroTexte}</p>
            <div style={{marginTop:26, fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.2em', color:'var(--fg-subtle)'}}>TOKYO · KYOTO · OSAKA</div>
          </a>
        </div>
      </section>
    </>
  );
}

export function HistoirePage() {
  const t = useT(JAPON);
  const x = t.histoire;
  return (
    <>
      <PageHero eyebrow={x.eyebrow} titre={x.titre} lede={x.lede} kanji={KANJI_PHOTOS.histoire} id="histoire-hero"
        photo="/photos/kinkakuji.jpg" grad="ember" alt={x.titre} />
      <section className="wrap" style={{padding:'72px 48px 40px'}}>
        {x.eres.map((e,i) => (
          <article key={e.nom} style={{display:'grid', gridTemplateColumns:'300px 1fr', gap:56, padding:'44px 0', borderTop:'1px solid var(--border)', borderBottom: i===x.eres.length-1 ? '1px solid var(--border)' : 'none'}}>
            <div>
              <div style={{fontFamily:jp.display, fontSize:52, lineHeight:1, color:'var(--kiraku-shu)'}}>{['平','江','明'][i]}</div>
              <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:30, letterSpacing:'-0.015em', margin:'18px 0 6px'}}>{e.nom}</h2>
              <div style={{fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.2em', color:'var(--fg-subtle)'}}>{e.annees}</div>
              <div style={{...bodyTxt, fontSize:16, color:'var(--fg-muted)', marginTop:14}}>{e.sur}</div>
            </div>
            <p style={bodyTxt}>{e.txt}</p>
          </article>
        ))}
      </section>
      <section className="wrap" style={{padding:'24px 48px 100px'}}>
        <div className="section-eyebrow" style={{color:'var(--fg-subtle)'}}>{x.aParaitre}</div>
        <div style={{display:'flex', flexWrap:'wrap', gap:10, marginTop:18}}>
          {x.reserve.map(r => (
            <span key={r} style={{fontFamily:'var(--font-sans)', fontSize:14, color:'var(--fg-muted)', background:'var(--kiraku-washi-2)', borderRadius:999, padding:'9px 18px'}}>{r}</span>
          ))}
        </div>
      </section>
    </>
  );
}

export function GastronomiePage() {
  const t = useT(JAPON);
  const x = t.gastronomie;
  return (
    <>
      <PageHero eyebrow={x.eyebrow} titre={x.titre} lede={x.lede} kanji={KANJI_PHOTOS.gastronomie} id="gastronomie-hero"
        photo="/photos/alley.jpg" grad="ember" alt={x.titre} />
      <section className="wrap-full" style={{padding:'72px 48px 56px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32, alignItems:'stretch'}}>
          {x.prefectures.map((p, i) => (
            <article key={p.nom} style={{background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderRadius:14, overflow:'hidden', display:'flex', flexDirection:'column'}}>
              <div style={{aspectRatio:'16/10', position:'relative'}}>
                <ImageSlot id={`pref-${p.nom}`} placeholder={`${x.photoDe} ${p.nom}`} gradient={GRADIENTS[PREF_GRAD[i]]} src={PREF_PHOTO[i]} />
                <div style={{position:'absolute', right:14, bottom:-10, fontFamily:jp.display, fontSize:104, lineHeight:1, color:'rgba(255,255,255,0.24)', fontWeight:600, pointerEvents:'none'}}>{PREF_KANJI[i]}</div>
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
          <p style={{...bodyTxt, fontSize:17, maxWidth:760}}>{x.suite}</p>
          <span style={{flex:'0 0 auto', fontFamily:'var(--font-sans)', fontSize:13, fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--kiraku-washi)', background:'var(--kiraku-sumi)', borderRadius:999, padding:'14px 26px'}}>{x.compteur}</span>
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

export function GuidePage() {
  const t = useT(JAPON);
  const x = t.guide;
  const th = { textAlign:'left', fontFamily:'var(--font-sans)', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-muted)', fontWeight:600, padding:'0 16px 10px 0', borderBottom:'1px solid var(--border-strong)' };
  const td = { fontFamily:'var(--font-serif)', fontSize:16, color:'var(--fg-2)', padding:'12px 16px 12px 0', borderBottom:'1px solid var(--hairline)', verticalAlign:'top' };
  return (
    <>
      <PageHero eyebrow={x.eyebrow} titre={x.titre} lede={x.lede} kanji={KANJI_PHOTOS.guide} id="guide-hero"
        photo="/photos/torii-walkway.jpg" grad="forest" alt={x.titre} />
      <section className="wrap" style={{padding:'72px 48px 24px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32, alignItems:'stretch'}}>
          {x.blocs.map((b, i) => (
            <article key={b.t} style={{background:'var(--kiraku-paper)', border:'1px solid var(--hairline)', borderRadius:14, padding:'36px 34px 40px'}}>
              <div style={{fontFamily:jp.display, fontSize:48, lineHeight:1, color:'var(--kiraku-shu)'}}>{BLOC_KANJI[i]}</div>
              <h2 style={{fontFamily:jp.display, fontWeight:600, fontSize:26, letterSpacing:'-0.015em', margin:'20px 0 14px'}}>{b.t}</h2>
              <p style={{...bodyTxt, fontSize:17}}>{b.txt}</p>
            </article>
          ))}
        </div>
        <div style={{marginTop:24, fontFamily:'var(--font-sans)', fontSize:13, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--fg-subtle)'}}>
          {x.dejaEnPlace}
        </div>
      </section>

      <section className="wrap" style={{padding:'64px 48px 40px'}}>
        <div className="section-head">
          <div className="left">
            <div className="section-eyebrow">{x.langueEyebrow}</div>
            <h2>{x.langueTitre}</h2>
            <div className="kicker">{x.langueKicker}</div>
          </div>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, marginTop:8}}>
          <div>
            <h3 style={{fontFamily:jp.display, fontWeight:600, fontSize:24, margin:'0 0 6px'}}>{x.hiragana}</h3>
            <KanaTable rows={HIRAGANA} />
          </div>
          <div>
            <h3 style={{fontFamily:jp.display, fontWeight:600, fontSize:24, margin:'0 0 6px'}}>{x.katakana}</h3>
            <div style={{...bodyTxt, fontSize:15, color:'var(--fg-muted)', marginBottom:6}}>{x.katakanaNote}</div>
            <KanaTable rows={KATAKANA} />
          </div>
        </div>
      </section>

      <section className="wrap" style={{padding:'40px 48px 100px'}}>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:56}}>
          <div>
            <h3 style={{fontFamily:jp.display, fontWeight:600, fontSize:24, margin:'0 0 12px'}}>{x.kanjiTitre}</h3>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead><tr><th style={{...th, width:70}}>{x.thKanji}</th><th style={{...th, width:150}}>{x.thLecture}</th><th style={th}>{x.thSens}</th></tr></thead>
              <tbody>
                {x.kanji.map(r => (
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
            <h3 style={{fontFamily:jp.display, fontWeight:600, fontSize:24, margin:'0 0 12px'}}>{x.phrasesTitre}</h3>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead><tr><th style={{...th, width:'46%'}}>{x.thLangue}</th><th style={th}>{x.thJaponais}</th></tr></thead>
              <tbody>
                {x.phrases.map(r => (
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
