import React, { useEffect, useState } from 'react'
import { GRADIENTS, ImageSlot } from './components.jsx'
import { envoyerFormulaire } from './envoi.js'
import { validerEmail, validerTelephone } from './validation.js'
import { useT } from './i18n.js'
import { COMMON, CSE } from './content/index.js'

// Page CSE, presentation et formulaire de mise en relation

const API_ADRESSE = 'https://api-adresse.data.gouv.fr/search/';

function CseChips({ items, value, onToggle, multi }) {
  return (
    <div className="cse-chips">
      {items.map(it => {
        // Attention : sur une chaine, `it.sub` renvoie String.prototype.sub,
        // une fonction. On distingue donc explicitement les deux formes.
        const brut = typeof it === 'string';
        const key = brut ? it : it.key;
        const label = brut ? it : it.label;
        const sub = brut ? null : (it.sub || it.mois || null);
        const on = multi ? value.indexOf(key) > -1 : value === key;
        return (
          <button type="button" key={key} className={`cse-chip${on ? ' on' : ''}`} onClick={() => onToggle(key)} aria-pressed={on}>
            <span className="lb">{label}</span>
            {sub ? <span className="sb">{sub}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

export function CSEPage({ go }) {
  const c = useT(COMMON);
  const t = useT(CSE);
  const F = t.form;
  const V = c.validation;
  const [f, setF] = useState({ raison: '', siret: '', adresse: '', cp: '', ville: '', prenom: '', nom: '', email: '', fixe: '', mobile: '', poste: '', message: '', hp: '' });
  const [taille, setTaille] = useState('');
  const [pays, setPays] = useState(['japon']);
  const [duree, setDuree] = useState('');
  const [saisons, setSaisons] = useState([]);
  const [sugg, setSugg] = useState([]);
  const [villes, setVilles] = useState([]);
  const [cpEtat, setCpEtat] = useState('');
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [erreurEnvoi, setErreurEnvoi] = useState('');
  const [suggEmail, setSuggEmail] = useState('');

  const set = (k) => (e) => {
    const v = e.target.value;
    setF(s => ({ ...s, [k]: v }));
    if (err[k]) setErr(s => { const n = { ...s }; delete n[k]; return n; });
  };

  // Suggestions d'adresse (Base Adresse Nationale)
  useEffect(() => {
    const q = f.adresse.trim();
    if (q.length < 4) { setSugg([]); return; }
    let vivant = true;
    const t2 = setTimeout(() => {
      fetch(`${API_ADRESSE}?q=${encodeURIComponent(q)}&limit=5&autocomplete=1`)
        .then(r => r.ok ? r.json() : null)
        .then(d => { if (vivant && d && d.features) setSugg(d.features.map(x => x.properties)); })
        .catch(() => {});
    }, 260);
    return () => { vivant = false; clearTimeout(t2); };
  }, [f.adresse]);

  // Code postal, la ville se remplit toute seule
  useEffect(() => {
    const cp = f.cp.trim();
    if (!/^\d{5}$/.test(cp)) { setVilles([]); setCpEtat(''); return; }
    let vivant = true;
    setCpEtat('cherche');
    fetch(`${API_ADRESSE}?q=${cp}&type=municipality&postcode=${cp}&limit=12`)
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (!vivant) return;
        const noms = d && d.features ? Array.from(new Set(d.features.map(x => x.properties.city || x.properties.name))) : [];
        setVilles(noms);
        setCpEtat(noms.length ? 'ok' : 'vide');
        if (noms.length) setF(s => (s.ville && noms.indexOf(s.ville) > -1) ? s : { ...s, ville: noms[0] });
      })
      .catch(() => { if (vivant) setCpEtat('vide'); });
    return () => { vivant = false; };
  }, [f.cp]);

  const choisirAdresse = (p) => {
    setF(s => ({ ...s, adresse: p.name || p.label, cp: p.postcode || s.cp, ville: p.city || s.ville }));
    setSugg([]);
    setErr(s => { const n = { ...s }; delete n.adresse; delete n.cp; delete n.ville; return n; });
  };
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
  const verifierTel = (champ, mobileSeul) => () => {
    if (!f[champ].trim()) return;
    const v = validerTelephone(f[champ], { mobileSeul, requis: false, M: V });
    if (!v.ok) setErr(s => ({ ...s, [champ]: v.erreur }));
  };

  const bascule = (setter, list) => (k) => setter(list.indexOf(k) > -1 ? list.filter(x => x !== k) : list.concat([k]));

  const valide = () => {
    const e = {};
    if (!f.raison.trim()) e.raison = F.errRaison;
    const siret = f.siret.replace(/\s/g, '');
    if (!siret) e.siret = F.errSiretRequis;
    else if (!/^\d{14}$/.test(siret)) e.siret = F.errSiretFormat;
    if (!f.adresse.trim()) e.adresse = F.errAdresse;
    if (!/^\d{5}$/.test(f.cp.trim())) e.cp = F.errCp;
    if (!f.ville.trim()) e.ville = F.errVille;
    if (!taille) e.taille = F.errTaille;
    if (!f.prenom.trim()) e.prenom = F.errPrenom;
    if (!f.nom.trim()) e.nom = F.errNom;
    const vMail = validerEmail(f.email, V);
    if (!vMail.ok) e.email = vMail.erreur;
    const vMob = validerTelephone(f.mobile, { M: V });
    if (!vMob.ok) e.mobile = vMob.erreur;
    const vFixe = validerTelephone(f.fixe, { mobileSeul: false, requis: false, M: V });
    if (!vFixe.ok) e.fixe = vFixe.erreur;
    if (!pays.length) e.pays = F.errPays;
    return e;
  };

  const envoyer = async (ev) => {
    ev.preventDefault();
    if (f.hp || envoiEnCours) return;
    const e = valide();
    setErr(e);
    if (Object.keys(e).length) {
      const ordre = ['raison', 'siret', 'adresse', 'cp', 'ville', 'prenom', 'nom', 'email', 'mobile'];
      const cible = ordre.find(k => e[k]);
      const el = cible ? document.getElementById('cse-' + cible) : null;
      if (el) el.focus();
      return;
    }
    setErreurEnvoi('');
    setEnvoiEnCours(true);
    try {
      const libelle = (liste, cle) => {
        const x = liste.find(y => (y.key || y) === cle);
        return x ? (x.label || x) : cle;
      };
      await envoyerFormulaire({
        type: 'cse',
        raison: f.raison.trim(),
        siret: f.siret.trim(),
        taille,
        adresse: f.adresse.trim(),
        cp: f.cp.trim(),
        ville: f.ville.trim(),
        prenom: f.prenom.trim(),
        nom: f.nom.trim(),
        email: f.email.trim(),
        poste: f.poste.trim(),
        fixe: f.fixe.trim(),
        mobile: f.mobile.trim(),
        pays: pays.map(k => libelle(F.pays, k)),
        duree,
        saisons: saisons.map(k => libelle(F.saisons, k)),
        message: f.message.trim(),
        hp: f.hp,
      });
      setSent(true);
      if (typeof window !== 'undefined') window.scrollTo({ top: document.getElementById('cse-form')?.offsetTop || 0, behavior: 'smooth' });
    } catch (ex) {
      if (ex.champ) {
        setErr(s => ({ ...s, [ex.champ]: ex.message }));
        const el = document.getElementById('cse-' + ex.champ);
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
    <>
      <section className="cse-hero">
        <div className="cse-hero-photo">
          <ImageSlot id="cse-hero" placeholder={t.hero.photo} gradient={GRADIENTS.dusk} src="/photos/kiyomizu-street.jpg" sizes="100vw" priority />
        </div>
        <div className="cse-hero-veil"></div>
        <div className="wrap cse-hero-inner">
          <img className="cse-hero-seal" src="/assets/seal-red.png" alt="" />
          <div className="section-eyebrow" style={{color:'rgba(246,241,232,0.72)'}}>{t.hero.eyebrow}</div>
          <h1>{t.hero.titreAvant}<span className="brush">{t.hero.titreBrush}</span>{t.hero.titreApres}</h1>
          <p className="cse-lede">{t.hero.lede}</p>
          <div className="cse-hero-ctas">
            <a className="btn btn-primary" href="#cse-form">{t.hero.cta1}</a>
            <a className="btn btn-link" href="#cse-form" style={{color:'var(--kiraku-washi)', borderBottomColor:'rgba(246,241,232,0.5)'}}>{t.hero.cta2}</a>
          </div>
        </div>
      </section>

      <section className="wrap cse-intro">
        <div className="cse-intro-txt">
          <div className="section-eyebrow">{t.intro.eyebrow}</div>
          <h2>{t.intro.titre}</h2>
          <p>{t.intro.p1}</p>
          <p>{t.intro.p2}</p>
          <div className="cse-facts">
            {t.intro.facts.map((x, i) => <div key={i}><b>{x.n}</b><i>{x.t}</i></div>)}
          </div>
        </div>
        <div className="cse-intro-photo">
          <ImageSlot id="cse-intro" placeholder={t.intro.photo} gradient={GRADIENTS.forest} kanji="間" src="/photos/hands.jpg" sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
      </section>

      <section className="band cse-band">
        <div className="band-kanji" aria-hidden="true">縁</div>
        <div className="wrap">
          <div className="cse-two">
            <div>
              <div className="section-eyebrow">{t.apports.eyebrow}</div>
              <h3 className="cse-h3">{t.apports.titre}</h3>
              <div className="cse-list">
                {t.apports.items.map(i => (
                  <div className="cse-item" key={i.n}>
                    <span className="n">{i.n}</span>
                    <div><b>{i.t}</b><p>{i.p}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-eyebrow">{t.benefices.eyebrow}</div>
              <h3 className="cse-h3">{t.benefices.titre}</h3>
              <div className="cse-list">
                {t.benefices.items.map(i => (
                  <div className="cse-item" key={i.n}>
                    <span className="n">{i.n}</span>
                    <div><b>{i.t}</b><p>{i.p}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap cse-form-wrap" id="cse-form">
        <div className="cse-form-head">
          <div className="section-eyebrow">{F.eyebrow}</div>
          <h2>{F.titre}</h2>
          <p className="lede" style={{maxWidth:640}}>{F.lede}</p>
        </div>

        {!sent ? (
          <form className="cse-card" onSubmit={envoyer} noValidate>
            <img className="cse-card-seal" src="/assets/seal-black.png" alt="" />

            <div className="cse-step"><span className="cse-num">1</span><span className="cse-lb">{F.etape1}</span></div>
            <div className="form-grid">
              <div className={`field full${err.raison ? ' err' : ''}`}>
                <label htmlFor="cse-raison">{F.raison} <em>{c.form.obligatoire}</em></label>
                <input id="cse-raison" value={f.raison} onChange={set('raison')} placeholder={F.raisonPh} autoComplete="organization" />
                {err.raison ? <div className="field-err">{err.raison}</div> : null}
              </div>
              <div className={`field${err.siret ? ' err' : ''}`}>
                <label htmlFor="cse-siret">{F.siret} <em>{c.form.obligatoire}</em></label>
                <input id="cse-siret" inputMode="numeric" maxLength="17" value={f.siret} onChange={set('siret')} placeholder={F.siretPh} />
                {err.siret ? <div className="field-err">{err.siret}</div> : <div className="field-help">{F.siretAide}</div>}
              </div>
              <div className={`field${err.taille ? ' err' : ''}`}>
                <label>{F.taille} <em>{c.form.obligatoire}</em></label>
                <CseChips items={F.tailles} value={taille} onToggle={(k)=>{ setTaille(k); setErr(s=>{const n={...s};delete n.taille;return n;}); }} />
                {err.taille ? <div className="field-err">{err.taille}</div> : null}
              </div>
              <div className={`field full cse-autoc${err.adresse ? ' err' : ''}`}>
                <label htmlFor="cse-adresse">{F.adresse} <em>{c.form.obligatoire}</em></label>
                <input id="cse-adresse" value={f.adresse} onChange={set('adresse')} placeholder={F.adressePh} autoComplete="off" />
                {sugg.length ? (
                  <ul className="cse-sugg">
                    {sugg.map((p, i) => (
                      <li key={i}><button type="button" onClick={() => choisirAdresse(p)}>
                        <b>{p.name}</b><span>{p.postcode} {p.city}</span>
                      </button></li>
                    ))}
                  </ul>
                ) : null}
                {err.adresse ? <div className="field-err">{err.adresse}</div> : <div className="field-help">{F.adresseAide}</div>}
              </div>
              <div className={`field${err.cp ? ' err' : ''}`}>
                <label htmlFor="cse-cp">{F.cp} <em>{c.form.obligatoire}</em></label>
                <input id="cse-cp" inputMode="numeric" maxLength="5" value={f.cp} onChange={set('cp')} placeholder={F.cpPh} autoComplete="postal-code" />
                {err.cp ? <div className="field-err">{err.cp}</div> : <div className="field-help">{cpEtat === 'cherche' ? F.cpCherche : cpEtat === 'vide' ? F.cpVide : F.cpAuto}</div>}
              </div>
              <div className={`field${err.ville ? ' err' : ''}`}>
                <label htmlFor="cse-ville">{F.ville} <em>{c.form.obligatoire}</em></label>
                {villes.length > 1 ? (
                  <select id="cse-ville" value={f.ville} onChange={set('ville')}>
                    {villes.map(v => <option key={v}>{v}</option>)}
                  </select>
                ) : (
                  <input id="cse-ville" value={f.ville} onChange={set('ville')} placeholder={F.villePh} autoComplete="address-level2" />
                )}
                {err.ville ? <div className="field-err">{err.ville}</div> : villes.length > 1 ? <div className="field-help">{F.villeMultiple}</div> : null}
              </div>
            </div>

            <div className="cse-step"><span className="cse-num">2</span><span className="cse-lb">{F.etape2}</span></div>
            <div className="form-grid">
              <div className={`field${err.nom ? ' err' : ''}`}>
                <label htmlFor="cse-nom">{F.nom} <em>{c.form.obligatoire}</em></label>
                <input id="cse-nom" value={f.nom} onChange={set('nom')} placeholder={F.nomPh} autoComplete="family-name" />
                {err.nom ? <div className="field-err">{err.nom}</div> : null}
              </div>
              <div className={`field${err.prenom ? ' err' : ''}`}>
                <label htmlFor="cse-prenom">{F.prenom} <em>{c.form.obligatoire}</em></label>
                <input id="cse-prenom" value={f.prenom} onChange={set('prenom')} placeholder={F.prenomPh} autoComplete="given-name" />
                {err.prenom ? <div className="field-err">{err.prenom}</div> : null}
              </div>
              <div className={`field${err.email ? ' err' : ''}`}>
                <label htmlFor="cse-email">{F.email} <em>{c.form.obligatoire}</em></label>
                <input id="cse-email" type="email" inputMode="email" value={f.email} onChange={set('email')} onBlur={verifierEmail} placeholder={F.emailPh} autoComplete="email" />
                {err.email ? <div className="field-err">{err.email}</div>
                  : suggEmail ? <div className="field-help">{c.form.vouliezVousDire} <button type="button" className="lien-sugg" onClick={accepterSuggestion}>{suggEmail}</button> ?</div>
                  : null}
              </div>
              <div className={`field${err.poste ? ' err' : ''}`}>
                <label htmlFor="cse-poste">{F.poste}</label>
                <input id="cse-poste" value={f.poste} onChange={set('poste')} placeholder={F.postePh} />
              </div>
              <div className={`field${err.fixe ? ' err' : ''}`}>
                <label htmlFor="cse-fixe">{F.fixe}</label>
                <input id="cse-fixe" type="tel" inputMode="tel" value={f.fixe} onChange={set('fixe')} onBlur={verifierTel('fixe', false)} placeholder={F.fixePh} />
                {err.fixe ? <div className="field-err">{err.fixe}</div> : null}
              </div>
              <div className={`field${err.mobile ? ' err' : ''}`}>
                <label htmlFor="cse-mobile">{F.mobile} <em>{c.form.obligatoire}</em></label>
                <input id="cse-mobile" type="tel" inputMode="tel" value={f.mobile} onChange={set('mobile')} onBlur={verifierTel('mobile', true)} placeholder={F.mobilePh} autoComplete="tel" />
                {err.mobile ? <div className="field-err">{err.mobile}</div> : <div className="field-help">{F.mobileAide}</div>}
              </div>
            </div>

            <div className="cse-step"><span className="cse-num">3</span><span className="cse-lb">{F.etape3}</span></div>
            <div className="form-grid">
              <div className={`field full${err.pays ? ' err' : ''}`}>
                <label>{F.destinations} <em>{c.form.obligatoire}</em></label>
                <CseChips items={F.pays} value={pays} multi onToggle={(k)=>{ setPays(p => p.indexOf(k) > -1 ? p.filter(x=>x!==k) : p.concat([k])); setErr(s=>{const n={...s};delete n.pays;return n;}); }} />
                {err.pays ? <div className="field-err">{err.pays}</div> : null}
              </div>
              <div className="field full">
                <label>{F.dureeLabel}</label>
                <CseChips items={F.durees} value={duree} onToggle={setDuree} />
              </div>
              <div className="field full">
                <label>{F.saisonLabel}</label>
                <CseChips items={F.saisons} value={saisons} multi onToggle={bascule(setSaisons, saisons)} />
                <div className="field-help">{F.saisonAide}</div>
              </div>
              <div className="field full">
                <label htmlFor="cse-msg">{F.contexte}</label>
                <textarea id="cse-msg" rows="4" value={f.message} onChange={set('message')} placeholder={F.contextePh} />
              </div>
            </div>

            <div aria-hidden="true" style={{position:'absolute', left:'-9999px', width:1, height:1, overflow:'hidden'}}>
              <label htmlFor="cse-hp">{c.form.nePasRemplir}</label>
              <input id="cse-hp" tabIndex="-1" autoComplete="off" value={f.hp} onChange={set('hp')} />
            </div>

            {nbErr ? (
              <div className="form-alert" style={{marginTop:20}}>{nbErr === 1 ? c.form.manqueUne : c.form.manquePlusieurs.replace('{n}', String(nbErr))}</div>
            ) : null}
            {erreurEnvoi ? (
              <div className="form-alert" style={{marginTop:20}} role="alert">{erreurEnvoi}</div>
            ) : null}

            <div className="cse-submit">
              <button type="submit" className="btn cse-send" disabled={envoiEnCours} aria-busy={envoiEnCours}>
                {envoiEnCours ? c.form.envoiEnCours : c.form.envoyer}
              </button>
              <em className="cse-note">{F.note}</em>
            </div>
          </form>
        ) : (
          <div className="cse-card cse-merci">
            <img src="/assets/seal-red.png" alt="" />
            <h3>{F.merciTitre(f.prenom || F.merciDefautPrenom)}</h3>
            <p>{F.merciTexte(f.mobile || F.merciDefautMobile, f.raison || F.merciDefautRaison)}</p>
            <div className="cse-merci-ctas">
              <button className="btn btn-secondary" onClick={() => setSent(false)}>{F.merciModifier}</button>
              <button className="btn btn-link" onClick={() => go('itineraries')}>{F.merciParcourir}</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
