import React, { useState } from 'react'
import { LigneCompteur } from './booking.jsx'
import { GRADIENTS, ImageSlot } from './components.jsx'
import { envoyerFormulaire, MSG_ERREUR_RESEAU } from './envoi.js'
import { validerEmail, validerTelephone } from './validation.js'

// About + Contact + Journal pages

export function AboutPage({ go }) {
  return (
    <>
      <section className="about-hero wrap">
        <div className="section-eyebrow">NOTRE APPROCHE</div>
        <h1>On ne fait pas de tourisme. On fait découvrir le Japon authentique.</h1>
        <p className="lede">
          Kiraku, 喜楽, c'est « joie » et « aise », côte à côte. Pas un slogan : c'est notre seule règle de travail.
        </p>
      </section>

      <section className="wrap" style={{paddingBottom: 80}}>
        <div style={{aspectRatio:'21/9', borderRadius:14, overflow:'hidden', marginBottom: 80}}>
          <ImageSlot id="about-banner" placeholder="Photo large, paysage ou ruelle" gradient={GRADIENTS.dusk} src="/photos/tokyo-night.jpg" />
        </div>

        <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap: 80}}>
          <div style={{position:'sticky', top:100, alignSelf:'start'}}>
            <div className="section-eyebrow" style={{marginBottom: 18}}>Sommaire</div>
            <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:12, fontFamily:'var(--font-sans)', fontSize:14}}>
              <li><a href="#a1" style={{color:'var(--fg)', textDecoration:'none', borderLeft:'2px solid var(--kiraku-shu)', paddingLeft:12}}>01 · Pourquoi Kiraku</a></li>
              <li><a href="#a2" style={{color:'var(--fg-muted)', textDecoration:'none', paddingLeft:14}}>02 · Comment on travaille</a></li>
              <li><a href="#a3" style={{color:'var(--fg-muted)', textDecoration:'none', paddingLeft:14}}>03 · Qui on est</a></li>
              <li><a href="#a4" style={{color:'var(--fg-muted)', textDecoration:'none', paddingLeft:14}}>04 · Ce qu'on ne fait pas</a></li>
            </ul>
          </div>

          <div style={{maxWidth: 680}}>
            <h2 id="a1" style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:36, lineHeight:1.15, letterSpacing:'-0.02em', marginTop:0, marginBottom:24, textWrap:'balance'}}>01 · Pourquoi Kiraku.</h2>
            <p style={{fontFamily:'var(--font-serif)', fontSize:19, lineHeight:1.75, color:'var(--fg-2)', marginBottom:18, textWrap:'pretty'}}>
              Vous connaissez l'effet : vous rentrez de trois semaines au Japon, et vous avez l'impression de n'avoir vu personne. Trop de gares, trop d'écrans, trop d'algorithmes. Kiraku est né de ce sentiment.
            </p>
            <p style={{fontFamily:'var(--font-serif)', fontSize:19, lineHeight:1.75, color:'var(--fg-2)', marginBottom:48, textWrap:'pretty'}}>
              On ne vous promet pas un Japon secret. Le Japon n'a pas besoin d'être caché pour être vécu autrement. On vous emmène dans des lieux insolites, on vous fait manger là où les Japonais eux-mêmes vont manger, et on visite au lever du jour, avant les groupes.
            </p>

            <h2 id="a2" style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:36, lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:24, textWrap:'balance'}}>02 · Comment on travaille.</h2>
            <p style={{fontFamily:'var(--font-serif)', fontSize:19, lineHeight:1.75, color:'var(--fg-2)', marginBottom:18, textWrap:'pretty'}}>
              Chaque itinéraire est testé en personne avant d'être proposé. Si on n'y a pas dormi nous-mêmes, on ne le vend pas. C'est lent. C'est cher, pour nous. Mais c'est la seule façon de garantir qu'Hirosan sera toujours là, et qu'elle préparera le petit-déjeuner à sept heures.
            </p>

            <div style={{background:'var(--kiraku-washi-2)', borderRadius:14, padding:'32px 36px', margin:'32px 0', borderLeft:'3px solid var(--kiraku-shu)'}}>
              <div className="section-eyebrow" style={{marginBottom:10}}>EN CHIFFRES</div>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24}}>
                <div><div style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:40, color:'var(--kiraku-shu)', lineHeight:1}}>20</div><div style={{fontSize:13, color:'var(--fg-muted)', marginTop:4}}>ans, ou presque, tournés vers le Japon</div></div>
                <div><div style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:40, color:'var(--kiraku-shu)', lineHeight:1}}>10</div><div style={{fontSize:13, color:'var(--fg-muted)', marginTop:4}}>ans, au moins, à guider le Japon</div></div>
                <div><div style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:40, color:'var(--kiraku-shu)', lineHeight:1}}>8</div><div style={{fontSize:13, color:'var(--fg-muted)', marginTop:4}}>voyageurs au maximum, en privé comme en groupe</div></div>
              </div>
            </div>

            <h2 id="a4" style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:36, lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:24, marginTop:48, textWrap:'balance'}}>Ce qu'on ne fait pas.</h2>
            <ul style={{fontFamily:'var(--font-serif)', fontSize:18, lineHeight:1.85, color:'var(--fg-2)', paddingLeft:24, margin:0}}>
              <li>Les cars de tourisme. Huit personnes au maximum, en privé comme en groupe.</li>
              <li>Les ryokan qui ont gardé le nom mais qui servent leur petit-déjeuner en buffet.</li>
              <li>Les visites en groupe, aux heures où tout le monde visite.</li>
              <li>Les itinéraires « clé en main » sans appel préalable.</li>
              <li>Les paiements en plusieurs fois sans discussion sur votre budget réel.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactPage({ go }) {
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
    if (!f.prenom.trim()) e.prenom = 'Votre prénom est requis.';
    if (!f.nom.trim()) e.nom = 'Votre nom est requis.';
    const vMail = validerEmail(f.email);
    if (!vMail.ok) e.email = vMail.erreur;
    const vTel = validerTelephone(f.tel);
    if (!vTel.ok) e.tel = vTel.erreur;
    return e;
  };

  // À la sortie du champ email, on propose la correction d'une faute de frappe.
  const verifierEmail = () => {
    const v = validerEmail(f.email);
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
    const v = validerTelephone(f.tel);
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
        setErreurEnvoi(ex.reseau ? MSG_ERREUR_RESEAU : ex.message);
      }
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <section className="wrap">
      <div className="about-hero" style={{padding:'60px 0 20px'}}>
        <div className="section-eyebrow">NOUS ÉCRIRE</div>
        <h1>Trente minutes au téléphone, sans engagement.</h1>
        <p className="lede" style={{maxWidth:680}}>
          Dites-nous ce qui vous tente. On revient vers vous sous deux jours ouvrés, avec une proposition d'horaire pour un appel.
        </p>
      </div>

      <div className="contact-grid">
        <div>
          {!submitted ? (
            <form className="form-grid" onSubmit={envoyer} noValidate>
              <div className={`field${err.prenom ? ' err' : ''}`}>
                <label htmlFor="c-prenom">Prénom <em>obligatoire</em></label>
                <input id="c-prenom" placeholder="Camille" value={f.prenom} onChange={set('prenom')} aria-invalid={!!err.prenom} />
                {err.prenom ? <div className="field-err">{err.prenom}</div> : null}
              </div>
              <div className={`field${err.nom ? ' err' : ''}`}>
                <label htmlFor="c-nom">Nom <em>obligatoire</em></label>
                <input id="c-nom" placeholder="Aoyama" value={f.nom} onChange={set('nom')} aria-invalid={!!err.nom} />
                {err.nom ? <div className="field-err">{err.nom}</div> : null}
              </div>
              <div className={`field${err.email ? ' err' : ''}`}>
                <label htmlFor="c-email">Email <em>obligatoire</em></label>
                <input id="c-email" type="email" inputMode="email" placeholder="camille@exemple.com" value={f.email} onChange={set('email')} onBlur={verifierEmail} aria-invalid={!!err.email} />
                {err.email ? <div className="field-err">{err.email}</div>
                  : suggEmail ? <div className="field-help">Vouliez-vous dire <button type="button" className="lien-sugg" onClick={accepterSuggestion}>{suggEmail}</button> ?</div>
                  : <div className="field-help">On garde votre adresse pour vous. Pas de revente, pas de newsletter sans accord.</div>}
              </div>
              <div className={`field${err.tel ? ' err' : ''}`}>
                <label htmlFor="c-tel">Téléphone portable <em>obligatoire</em></label>
                <input id="c-tel" type="tel" inputMode="tel" placeholder="06 45 78 21 09" value={f.tel} onChange={set('tel')} onBlur={verifierTel} aria-invalid={!!err.tel} />
                {err.tel ? <div className="field-err">{err.tel}</div> : <div className="field-help">Un mobile, français ou étranger au format +33 6 45 78 21 09. Pour l'appel, rien d'autre.</div>}
              </div>

              <div className="field full">
                <label>Qui voyage</label>
                <div className="qui-grid">
                  <LigneCompteur label="Adultes" sub="13 ans et plus" value={adultes} min={1} max={8} onChange={setAdultes} />
                  <LigneCompteur label="Enfants" sub="moins de 13 ans" value={enfants} max={8} onChange={setEnfants} />
                  <LigneCompteur label="Chambres" sub={chambresManuel === null ? 'deux par chambre' : 'à votre demande'} value={chambres} min={1} max={8} onChange={setChambresManuel} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-mois">Mois souhaité</label>
                <select id="c-mois" value={f.mois} onChange={set('mois')}>
                  <option value="" disabled>Choisir un mois</option>
                  <option>Avril, sakura</option>
                  <option>Mai, début d'été</option>
                  <option>Septembre, après les pluies</option>
                  <option>Octobre, momiji</option>
                  <option>Janvier, neige</option>
                  <option>Pas encore décidé</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-duree">Durée envisagée</label>
                <select id="c-duree" value={f.duree} onChange={set('duree')}>
                  <option value="" disabled>Choisir</option>
                  <option>3 – 5 nuits</option>
                  <option>6 – 10 nuits</option>
                  <option>2 semaines ou plus</option>
                </select>
              </div>
              <div className="field full">
                <label htmlFor="c-msg">Ce qui vous tente</label>
                <textarea id="c-msg" rows="5" placeholder="Onsen, randonnée, cuisine, artisanat, calme, rien… racontez-nous." value={f.message} onChange={set('message')} />
                <div className="field-help">Plus c'est précis, mieux on peut vous aider. Même « je ne sais pas » est une bonne réponse.</div>
              </div>
              <div aria-hidden="true" style={{position:'absolute', left:'-9999px', width:1, height:1, overflow:'hidden'}}>
                <label htmlFor="c-site">Ne pas remplir</label>
                <input id="c-site" tabIndex="-1" autoComplete="off" value={f.hp} onChange={set('hp')} />
              </div>
              <div className="field full" style={{flexDirection:'row', gap:10, alignItems:'flex-start'}}>
                <input type="checkbox" id="news" checked={news} onChange={(e)=>setNews(e.target.checked)} style={{width:18, height:18, marginTop:3, accentColor:'var(--kiraku-shu)'}} />
                <label htmlFor="news" style={{fontWeight:400, color:'var(--fg-muted)', lineHeight:1.5}}>
                  Vous pouvez aussi m'écrire quatre fois par an avec vos carnets de voyage et les nouveaux itinéraires.
                </label>
              </div>
              {Object.keys(err).length ? (
                <div className="field full form-alert">Il manque {Object.keys(err).length === 1 ? 'une information' : Object.keys(err).length + ' informations'} avant l'envoi. Les champs en rouge sont à compléter.</div>
              ) : null}
              {erreurEnvoi ? (
                <div className="field full form-alert" role="alert">{erreurEnvoi}</div>
              ) : null}
              <div className="field full" style={{flexDirection:'row', gap:14, alignItems:'center', marginTop:8}}>
                <button type="submit" className="btn btn-primary" disabled={envoiEnCours} aria-busy={envoiEnCours}>
                  {envoiEnCours ? 'Envoi en cours…' : 'Envoyer la demande'}
                </button>
                <span style={{fontSize:13, color:'var(--fg-muted)'}}>Réponse sous 48 h ouvrées.</span>
              </div>
            </form>
          ) : (
            <div style={{padding:'40px 36px', background:'var(--kiraku-paper)', borderRadius:14, border:'1px solid var(--hairline)'}}>
              <img src="/assets/seal-red.png" alt="" style={{width:72, height:72, marginBottom:18}} />
              <h3 style={{fontFamily:'var(--font-display)', fontWeight:600, fontSize:28, margin:'0 0 12px', lineHeight:1.2}}>C'est noté.</h3>
              <p style={{fontFamily:'var(--font-serif)', fontSize:17, lineHeight:1.7, color:'var(--fg-2)', margin:'0 0 24px'}}>
                On revient vers vous sous deux jours ouvrés avec une proposition d'horaire. En attendant, jetez un œil au journal, il y a des choses qu'on ne dit qu'à l'écrit.
              </p>
              <button className="btn btn-secondary" onClick={()=>setSubmitted(false)}>Envoyer une autre demande</button>
            </div>
          )}
        </div>

        <aside className="contact-side">
          <h3>Autres façons de nous joindre.</h3>
          <div className="row">
            <div>
              <b>Par téléphone</b>
              <span><a href="tel:+33670094964" style={{color:'inherit', textDecoration:'none'}}>+33 6 70 09 49 64</a><br/>Lun–sam, 10 h – 18 h (Paris)</span>
            </div>
          </div>
          <div className="row">
            <div>
              <b>Par email</b>
              <span><a href="mailto:contact@kirakutravel.com" style={{color:'inherit', textDecoration:'none'}}>contact@kirakutravel.com</a></span>
            </div>
          </div>
          <div className="row">
            <div>
              <b>Au bureau</b>
              <span>47 rue Vivienne<br/>75002 Paris<br/>sur rendez-vous</span>
            </div>
          </div>
          <div className="row" style={{borderBottom:0}}>
            <div>
              <b>Notre carnet</b>
              <span><a href="https://www.instagram.com/japonautrement/" target="_blank" rel="noopener" style={{color:'var(--kiraku-enji)'}}>@japonautrement</a> sur Instagram, photos prises pendant les repérages.</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function JournalPage({ go }) {
  const posts = [
    { eyebrow: 'CARNET · MAI 2026', title: 'Trois jours sans téléphone à Yakushima.', kicker: 'Et ce qu\'on a perdu en route.', grad: 'forest', kanji: '島' },
    { eyebrow: 'CARNET · MARS 2026', title: 'Comment on choisit un ryokan.', kicker: 'ou plutôt, comment Hiroko-san a choisi pour nous.', grad: 'paper', kanji: '宿' },
    { eyebrow: 'CARNET · FÉVRIER 2026', title: 'Le kissaten d\'avant-guerre de Mori-san, 47 ans plus tard.', kicker: 'On y est retourné une troisième fois.', grad: 'ember', kanji: '咖' },
    { eyebrow: 'CARNET · NOVEMBRE 2025', title: 'Momiji : pourquoi octobre est trop tôt.', kicker: 'Et pourquoi on programme désormais en novembre.', grad: 'cherry', kanji: '紅' },
  ];
  return (
    <section className="wrap" style={{padding:'60px 48px 100px'}}>
      <div className="about-hero" style={{padding:'20px 0 60px'}}>
        <div className="section-eyebrow">LE JOURNAL</div>
        <h1>Ce qu'on note quand on rentre.</h1>
        <p className="lede">Des carnets de voyage, des cartes dessinées à la main, et de temps en temps un coup de gueule sur les guides en plastique. Une parution toutes les trois semaines environ.</p>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px 56px'}}>
        {posts.map((p,i) => (
          <a key={i} href="#" onClick={(e)=>e.preventDefault()} style={{textDecoration:'none', color:'inherit'}}>
            <div style={{aspectRatio:'16/10', borderRadius:14, overflow:'hidden', marginBottom:20, position:'relative'}}>
              <ImageSlot id={`journal-${i}`} placeholder={p.title} gradient={GRADIENTS[p.grad]} src={['/photos/chidorigafuchi.jpg','/photos/koinobori.jpg','/photos/osaka-castle.jpg','/photos/kinkakuji.jpg'][i % 4]} />
              <div style={{position:'absolute', right:14, bottom:-12, fontFamily:'var(--font-display)', fontSize:108, color:'rgba(255,255,255,0.22)', fontWeight:600, lineHeight:1}}>{p.kanji}</div>
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

