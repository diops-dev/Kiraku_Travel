import React, { useState } from 'react'
import { LigneCompteur } from './booking.jsx'
import { GRADIENTS, ImageSlot } from './components.jsx'
import { envoyerFormulaire } from './envoi.js'
import { validerEmail, validerTelephone } from './validation.js'
import { useT } from './i18n.js'
import { COMMON, PAGES } from './content/index.js'

// Notre approche, contact et journal

export function AboutPage() {
  const t = useT(PAGES);
  const a = t.about;
  const h2 = { fontFamily:'var(--font-display)', fontWeight:600, fontSize:36, lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:24, textWrap:'balance' };
  const p = { fontFamily:'var(--font-serif)', fontSize:19, lineHeight:1.75, color:'var(--fg-2)', marginBottom:18, textWrap:'pretty' };
  return (
    <>
      <section className="about-hero wrap">
        <div className="section-eyebrow">{a.eyebrow}</div>
        <h1>{a.titre}</h1>
        <p className="lede">{a.lede}</p>
      </section>

      <section className="wrap" style={{paddingBottom: 80}}>
        <div style={{aspectRatio:'21/9', borderRadius:14, overflow:'hidden', marginBottom: 80}}>
          <ImageSlot id="about-banner" placeholder={a.banniere} gradient={GRADIENTS.dusk} src="/photos/tokyo-night.jpg" />
        </div>

        <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap: 80}}>
          <div style={{position:'sticky', top:100, alignSelf:'start'}}>
            <div className="section-eyebrow" style={{marginBottom: 18}}>{a.sommaire}</div>
            <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12, fontFamily:'var(--font-sans)', fontSize:14}}>
              {a.toc.map((x, i) => (
                <li key={i}>
                  <a href={'#a' + (i + 1)} style={i === 0
                    ? {color:'var(--fg)', textDecoration:'none', borderLeft:'2px solid var(--kiraku-shu)', paddingLeft:12}
                    : {color:'var(--fg-muted)', textDecoration:'none', paddingLeft:14}}>{x}</a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{maxWidth: 680}}>
            <h2 id="a1" style={{...h2, marginTop:0}}>{a.h1}</h2>
            <p style={p}>{a.p1}</p>
            <p style={{...p, marginBottom:48}}>{a.p2}</p>

            <h2 id="a2" style={h2}>{a.h2}</h2>
            <p style={p}>{a.p3}</p>

            <div style={{background:'var(--kiraku-washi-2)', borderRadius:14, padding:'32px 36px', margin:'32px 0', borderLeft:'3px solid var(--kiraku-shu)'}}>
              <div className="section-eyebrow" style={{marginBottom:10}}>{a.chiffresEyebrow}</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}}>
                {a.chiffres.map((x, i) => (
                  <div key={i}>
                    <div style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:40, color:'var(--kiraku-shu)', lineHeight:1}}>{x.n}</div>
                    <div style={{fontSize:13, color:'var(--fg-muted)', marginTop:4}}>{x.t}</div>
                  </div>
                ))}
              </div>
            </div>

            <h2 id="a4" style={{...h2, marginTop:48}}>{a.h4}</h2>
            <ul style={{fontFamily:'var(--font-serif)', fontSize:18, lineHeight:1.85, color:'var(--fg-2)', paddingLeft:24, margin:0}}>
              {a.liste.map((x, i) => <li key={i}>{x}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPage() {
  const c = useT(COMMON);
  const t = useT(PAGES);
  const x = t.contact;
  const V = c.validation;
  const [submitted, setSubmitted] = useState(false);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [erreurEnvoi, setErreurEnvoi] = useState('');
  const [news, setNews] = useState(false);
  const [suggEmail, setSuggEmail] = useState('');
  const [f, setF] = useState({ prenom: '', nom: '', email: '', tel: '', mois: '', duree: '', message: '', hp: '' });
  const [adultes, setAdultes] = useState(2);
  const [enfants, setEnfants] = useState(0);
  const [chambresManuel, setChambresManuel] = useState(null);
  const [err, setErr] = useState({});
  const chambres = chambresManuel === null ? Math.max(1, Math.ceil((adultes + enfants) / 2)) : chambresManuel;
  const set = (k) => (e) => { const v = e.target.value; setF(s => ({ ...s, [k]: v })); if (err[k]) setErr(s => { const n = { ...s }; delete n[k]; return n; }); };

  const valide = () => {
    const e = {};
    if (!f.prenom.trim()) e.prenom = V.prenomRequis;
    if (!f.nom.trim()) e.nom = V.nomRequis;
    const vMail = validerEmail(f.email, V);
    if (!vMail.ok) e.email = vMail.erreur;
    const vTel = validerTelephone(f.tel, { M: V });
    if (!vTel.ok) e.tel = vTel.erreur;
    return e;
  };

  // A la sortie du champ email, on propose la correction d'une faute de frappe.
  const verifierEmail = () => {
    const v = validerEmail(f.email, V);
    setSuggEmail(v.ok && v.suggestion ? v.suggestion : '');
    if (!v.ok && f.email.trim()) setErr(s => ({ ...s, email: v.erreur }));
  };
  const accepterSuggestion = () => {
    setF(s => ({ ...s, email: suggEmail }));
    setSuggEmail('');
    setErr(s => { const n = { ...s }; delete n.email; return n; });
  };
  const verifierTel = () => {
    if (!f.tel.trim()) return;
    const v = validerTelephone(f.tel, { M: V });
    if (!v.ok) setErr(s => ({ ...s, tel: v.erreur }));
  };

  const envoyer = async (ev) => {
    ev.preventDefault();
    if (f.hp || envoiEnCours) return;
    const e = valide();
    setErr(e);
    if (Object.keys(e).length) {
      const ordre = ['prenom', 'nom', 'email', 'tel'];
      const cible = ordre.find(k => e[k]);
      const el = cible ? document.getElementById('c-' + cible) : null;
      if (el) el.focus();
      return;
    }
    setErreurEnvoi('');
    setEnvoiEnCours(true);
    try {
      await envoyerFormulaire({
        type: 'contact',
        prenom: f.prenom.trim(),
        nom: f.nom.trim(),
        email: f.email.trim(),
        tel: f.tel.trim(),
        adultes, enfants, chambres,
        mois: f.mois,
        duree: f.duree,
        message: f.message.trim(),
        news,
        hp: f.hp,
      });
      setSubmitted(true);
    } catch (ex) {
      if (ex.champ) {
        setErr(s => ({ ...s, [ex.champ]: ex.message }));
        const el = document.getElementById('c-' + ex.champ);
        if (el) el.focus();
      } else {
        setErreurEnvoi(ex.reseau ? V.reseau : ex.message);
      }
    } finally {
      setEnvoiEnCours(false);
    }
  };

  const nbErr = Object.keys(err).length;

  return (
    <section className="wrap">
      <div className="about-hero" style={{padding:'60px 0 20px'}}>
        <div className="section-eyebrow">{x.eyebrow}</div>
        <h1>{x.titre}</h1>
        <p className="lede" style={{maxWidth:680}}>{x.lede}</p>
      </div>

      <div className="contact-grid">
        <div>
          {!submitted ? (
            <form className="form-grid" onSubmit={envoyer} noValidate>
              <div className={`field${err.prenom ? ' err' : ''}`}>
                <label htmlFor="c-prenom">{x.prenom} <em>{c.form.obligatoire}</em></label>
                <input id="c-prenom" placeholder={x.prenomPh} value={f.prenom} onChange={set('prenom')} aria-invalid={!!err.prenom} />
                {err.prenom ? <div className="field-err">{err.prenom}</div> : null}
              </div>
              <div className={`field${err.nom ? ' err' : ''}`}>
                <label htmlFor="c-nom">{x.nom} <em>{c.form.obligatoire}</em></label>
                <input id="c-nom" placeholder={x.nomPh} value={f.nom} onChange={set('nom')} aria-invalid={!!err.nom} />
                {err.nom ? <div className="field-err">{err.nom}</div> : null}
              </div>
              <div className={`field${err.email ? ' err' : ''}`}>
                <label htmlFor="c-email">{x.email} <em>{c.form.obligatoire}</em></label>
                <input id="c-email" type="email" inputMode="email" placeholder={x.emailPh} value={f.email} onChange={set('email')} onBlur={verifierEmail} aria-invalid={!!err.email} />
                {err.email ? <div className="field-err">{err.email}</div>
                  : suggEmail ? <div className="field-help">{c.form.vouliezVousDire} <button type="button" className="lien-sugg" onClick={accepterSuggestion}>{suggEmail}</button> ?</div>
                  : <div className="field-help">{x.emailAide}</div>}
              </div>
              <div className={`field${err.tel ? ' err' : ''}`}>
                <label htmlFor="c-tel">{x.tel} <em>{c.form.obligatoire}</em></label>
                <input id="c-tel" type="tel" inputMode="tel" placeholder={x.telPh} value={f.tel} onChange={set('tel')} onBlur={verifierTel} aria-invalid={!!err.tel} />
                {err.tel ? <div className="field-err">{err.tel}</div> : <div className="field-help">{x.telAide}</div>}
              </div>

              <div className="field full">
                <label>{x.qui}</label>
                <div className="qui-grid">
                  <LigneCompteur label={x.adultes} sub={x.adultesSub} value={adultes} min={1} max={8} onChange={setAdultes} />
                  <LigneCompteur label={x.enfants} sub={x.enfantsSub} value={enfants} max={8} onChange={setEnfants} />
                  <LigneCompteur label={x.chambres} sub={chambresManuel === null ? x.chambresAuto : x.chambresManuel} value={chambres} min={1} max={8} onChange={setChambresManuel} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-mois">{x.mois}</label>
                <select id="c-mois" value={f.mois} onChange={set('mois')}>
                  <option value="" disabled>{x.moisPh}</option>
                  {x.moisOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-duree">{x.duree}</label>
                <select id="c-duree" value={f.duree} onChange={set('duree')}>
                  <option value="" disabled>{x.dureePh}</option>
                  {x.dureeOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="field full">
                <label htmlFor="c-msg">{x.message}</label>
                <textarea id="c-msg" rows="5" placeholder={x.messagePh} value={f.message} onChange={set('message')} />
                <div className="field-help">{x.messageAide}</div>
              </div>
              <div aria-hidden="true" style={{position:'absolute', left:'-9999px', width:1, height:1, overflow:'hidden'}}>
                <label htmlFor="c-site">{c.form.nePasRemplir}</label>
                <input id="c-site" tabIndex="-1" autoComplete="off" value={f.hp} onChange={set('hp')} />
              </div>
              <div className="field full" style={{flexDirection:'row', gap:10, alignItems:'flex-start'}}>
                <input type="checkbox" id="news" checked={news} onChange={(e)=>setNews(e.target.checked)} style={{width:18, height:18, marginTop:3, accentColor:'var(--kiraku-shu)'}} />
                <label htmlFor="news" style={{fontWeight:400, color:'var(--fg-muted)', lineHeight:1.5}}>{x.news}</label>
              </div>
              {nbErr ? (
                <div className="field full form-alert">{nbErr === 1 ? c.form.manqueUne : c.form.manquePlusieurs.replace('{n}', String(nbErr))}</div>
              ) : null}
              {erreurEnvoi ? (
                <div className="field full form-alert" role="alert">{erreurEnvoi}</div>
              ) : null}
              <div className="field full" style={{flexDirection:'row', gap:14, alignItems:'center', marginTop:8}}>
                <button type="submit" className="btn btn-primary" disabled={envoiEnCours} aria-busy={envoiEnCours}>
                  {envoiEnCours ? c.form.envoiEnCours : c.form.envoyer}
                </button>
                <span style={{fontSize:13, color:'var(--fg-muted)'}}>{c.form.reponse48}</span>
              </div>
            </form>
          ) : (
            <div style={{padding:'40px 36px', background:'var(--kiraku-paper)', borderRadius:14, border:'1px solid var(--hairline)'}}>
              <img src="/assets/seal-red.png" alt="" style={{width:72, height:72, marginBottom:18}} />
              <h3 style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:28, margin:'0 0 12px', lineHeight:1.2}}>{x.merciTitre}</h3>
              <p style={{fontFamily:'var(--font-serif)', fontSize:17, lineHeight:1.7, color:'var(--fg-2)', margin:'0 0 24px'}}>{x.merciTexte}</p>
              <button className="btn btn-secondary" onClick={()=>setSubmitted(false)}>{x.merciBouton}</button>
            </div>
          )}
        </div>

        <aside className="contact-side">
          <h3>{x.asideTitre}</h3>
          <div className="row">
            <div>
              <b>{x.parTelephone}</b>
              <span><a href="tel:+33670094964" style={{color:'inherit', textDecoration:'none'}}>+33 6 70 09 49 64</a><br/>{x.horaires}</span>
            </div>
          </div>
          <div className="row">
            <div>
              <b>{x.parEmail}</b>
              <span><a href="mailto:contact@kirakutravel.com" style={{color:'inherit', textDecoration:'none'}}>contact@kirakutravel.com</a></span>
            </div>
          </div>
          <div className="row">
            <div>
              <b>{x.auBureau}</b>
              <span>{x.adresse}<br/>{x.adresse2}<br/>{x.adresse3}</span>
            </div>
          </div>
          <div className="row" style={{borderBottom:0}}>
            <div>
              <b>{x.carnet}</b>
              <span><a href="https://www.instagram.com/japonautrement/" target="_blank" rel="noopener" style={{color:'var(--kiraku-enji)'}}>@japonautrement</a> {x.carnetTexte}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function JournalPage() {
  const t = useT(PAGES);
  const x = t.journal;
  const KANJI = ['島', '宿', '咖', '紅'];
  const GRAD = ['forest', 'paper', 'ember', 'cherry'];
  const PHOTOS = ['/photos/chidorigafuchi.jpg', '/photos/koinobori.jpg', '/photos/osaka-castle.jpg', '/photos/kinkakuji.jpg'];
  return (
    <section className="wrap" style={{padding:'60px 48px 100px'}}>
      <div className="about-hero" style={{padding:'20px 0 60px'}}>
        <div className="section-eyebrow">{x.eyebrow}</div>
        <h1>{x.titre}</h1>
        <p className="lede">{x.lede}</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px 56px'}}>
        {x.posts.map((p,i) => (
          <a key={i} href="#" onClick={(e)=>e.preventDefault()} style={{textDecoration:'none', color:'inherit'}}>
            <div style={{aspectRatio:'16/10', borderRadius:14, overflow:'hidden', marginBottom:20, position:'relative'}}>
              <ImageSlot id={`journal-${i}`} placeholder={p.title} gradient={GRADIENTS[GRAD[i % 4]]} src={PHOTOS[i % 4]} />
              <div style={{position:'absolute', right:14, bottom:-12, fontFamily:'var(--font-display)', fontSize:108, color:'rgba(255,255,255,0.22)', fontWeight:600, lineHeight:1}}>{KANJI[i % 4]}</div>
            </div>
            <div className="eyebrow-sm" style={{fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--fg-muted)', marginBottom:10}}>{p.eyebrow}</div>
            <h3 style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:28, lineHeight:1.2, margin:'0 0 8px', textWrap:'balance'}}>{p.title}</h3>
            <div style={{fontFamily:'var(--font-serif)', fontStyle:'italic', color:'var(--kiraku-enji)', fontSize:16}}>{p.kicker}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
