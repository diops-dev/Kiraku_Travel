import React, { useEffect, useState } from 'react'
import { GRADIENTS, ImageSlot } from './components.jsx'
import { envoyerFormulaire, MSG_ERREUR_RESEAU } from './envoi.js'
import { validerEmail, validerTelephone } from './validation.js'

// Page CSE, présentation + formulaire de mise en relation
const CSE_APPORTS = [
  { n: '01', t: 'Une offre négociée, sans surcoût pour le CSE', p: "Des tarifs de groupe sur nos itinéraires signatures, avec la même prestation que nos voyageurs individuels. Aucun frais de dossier facturé au comité." },
  { n: '02', t: 'Un interlocuteur unique du premier échange au retour', p: "Une personne qui connaît votre dossier, joignable par téléphone, qui suit les inscriptions, les acomptes et les imprévus." },
  { n: '03', t: 'Des supports prêts à diffuser', p: "Affiches, fiches itinéraires, textes pour votre intranet et votre newsletter. Nous préparons la communication interne avec vous." },
  { n: '04', t: 'Une billetterie souple', p: "Départs échelonnés, paiement en plusieurs fois, participation du comité modulable par collaborateur ou par foyer." },
];
const CSE_BENEFS = [
  { n: '01', t: 'Des groupes de quatre à huit personnes', p: "Jamais de car, jamais de fanion. Des trains, des auberges familiales, des tables où l'on s'assied avec les habitants." },
  { n: '02', t: 'Un accompagnement francophone sur place', p: "Un guide qui vit au Japon ou au Pérou, disponible pendant tout le séjour et joignable en dehors des activités." },
  { n: '03', t: 'Tout est inclus, y compris ce qui se voit peu', p: "Transferts, entrées, transports intérieurs, assistance vingt-quatre heures sur vingt-quatre et assurance annulation." },
  { n: '04', t: 'Un voyage qui se raconte au retour', p: "Les collaborateurs rentrent avec un carnet de voyage imprimé, leurs photos et de quoi en parler pendant des mois." },
];
const CSE_TAILLES = ['0 à 250 collaborateurs', '250 à 599 collaborateurs', '600 à 999 collaborateurs', '1 000 collaborateurs et plus'];
const CSE_PAYS = [
  { key: 'japon', label: 'Japon', sub: 'huit itinéraires signatures' },
  { key: 'perou', label: 'Pérou', sub: 'des Andes au Machu Picchu, à pied et sans hâte' },
];
const CSE_DUREES = ['7 à 9 jours', '10 à 13 jours', '14 à 17 jours', '18 à 21 jours et plus'];
const CSE_SAISONS = [
  { key: 'hiver', label: 'Hiver', mois: 'déc · janv · févr' },
  { key: 'printemps', label: 'Printemps', mois: 'mars · avr · mai' },
  { key: 'ete', label: 'Été', mois: 'juin · juil · août' },
  { key: 'automne', label: 'Automne', mois: 'sept · oct · nov' },
];
const API_ADRESSE = 'https://api-adresse.data.gouv.fr/search/';

function CseChips({ items, value, onToggle, multi }) {
  return (
    <div className="cse-chips">
      {items.map(it => {
        const key = it.key || it;
        const on = multi ? value.indexOf(key) > -1 : value === key;
        return (
          <button type="button" key={key} className={`cse-chip${on ? ' on' : ''}`} onClick={() => onToggle(key)} aria-pressed={on}>
            <span className="lb">{it.label || it}</span>
            {(it.sub || it.mois) ? <span className="sb">{it.sub || it.mois}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

export function CSEPage({ go }) {
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
    const t = setTimeout(() => {
      fetch(`${API_ADRESSE}?q=${encodeURIComponent(q)}&limit=5&autocomplete=1`)
        .then(r => r.ok ? r.json() : null)
        .then(d => { if (vivant && d && d.features) setSugg(d.features.map(x => x.properties)); })
        .catch(() => {});
    }, 260);
    return () => { vivant = false; clearTimeout(t); };
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
    const v = validerEmail(f.email);
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
    const v = validerTelephone(f[champ], { mobileSeul, requis: false });
    if (!v.ok) setErr(s => ({ ...s, [champ]: v.erreur }));
  };

  const bascule = (setter, list) => (k) => setter(list.indexOf(k) > -1 ? list.filter(x => x !== k) : list.concat([k]));

  const valide = () => {
    const e = {};
    if (!f.raison.trim()) e.raison = "La raison sociale est requise.";
    const siret = f.siret.replace(/\s/g, '');
    if (!siret) e.siret = 'Le numéro SIRET est requis.';
    else if (!/^\d{14}$/.test(siret)) e.siret = 'Le SIRET compte quatorze chiffres.';
    if (!f.adresse.trim()) e.adresse = "L'adresse est requise.";
    if (!/^\d{5}$/.test(f.cp.trim())) e.cp = 'Un code postal à cinq chiffres.';
    if (!f.ville.trim()) e.ville = 'La ville est requise.';
    if (!taille) e.taille = 'Indiquez un effectif sur site.';
    if (!f.prenom.trim()) e.prenom = 'Le prénom est requis.';
    if (!f.nom.trim()) e.nom = 'Le nom est requis.';
    const vMail = validerEmail(f.email);
    if (!vMail.ok) e.email = vMail.erreur;
    const vMob = validerTelephone(f.mobile);
    if (!vMob.ok) e.mobile = vMob.erreur;
    const vFixe = validerTelephone(f.fixe, { mobileSeul: false, requis: false });
    if (!vFixe.ok) e.fixe = vFixe.erreur;
    if (!pays.length) e.pays = 'Choisissez au moins une destination.';
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
        const t = liste.find(x => (x.key || x) === cle);
        return t ? (t.label || t) : cle;
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
        pays: pays.map(k => libelle(CSE_PAYS, k)),
        duree,
        saisons: saisons.map(k => libelle(CSE_SAISONS, k)),
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
        setErreurEnvoi(ex.reseau ? MSG_ERREUR_RESEAU : ex.message);
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
          <ImageSlot id="cse-hero" placeholder="Ruelle de Kyoto au crépuscule" gradient={GRADIENTS.dusk} src="/photos/kiyomizu-street.jpg" sizes="100vw" priority />
        </div>
        <div className="cse-hero-veil"></div>
        <div className="wrap cse-hero-inner">
          <img className="cse-hero-seal" src="/assets/seal-red.png" alt="" />
          <div className="section-eyebrow" style={{color:'rgba(246,241,232,0.72)'}}>COMITÉS SOCIAUX ET ÉCONOMIQUES</div>
          <h1>Offrez à vos collaborateurs un voyage dont ils parleront <span className="brush">longtemps</span>.</h1>
          <p className="cse-lede">
            Kiraku Travel écrit des voyages au Japon pour des groupes de quatre à huit personnes. Nous travaillons avec les CSE qui cherchent autre chose qu'un catalogue, et qui veulent un interlocuteur au bout du fil.
          </p>
          <div className="cse-hero-ctas">
            <a className="btn btn-primary" href="#cse-form">Demander une mise en relation</a>
            <a className="btn btn-link" href="#cse-form" style={{color:'var(--kiraku-washi)', borderBottomColor:'rgba(246,241,232,0.5)'}}>Voir ce que nous apportons</a>
          </div>
        </div>
      </section>

      <section className="wrap cse-intro">
        <div className="cse-intro-txt">
          <div className="section-eyebrow">LA MAISON</div>
          <h2>Une petite agence, immatriculée, qui repère elle-même ses itinéraires.</h2>
          <p>
            Kiraku Travel est une agence indépendante basée à Paris, immatriculée Atout France sous le numéro IM075260052. Nous ne revendons pas des circuits achetés ailleurs : chaque itinéraire est repéré sur place, saison par saison, auberge par auberge.
          </p>
          <p>
            Nos trois principes tiennent en peu de mots. Petits groupes, pour que le lieu reste vivant. Rythme lent, parce qu'un voyage se digère. Vérité des prix, tout est écrit avant de signer.
          </p>
          <div className="cse-facts">
            <div><b>8</b><i>itinéraires signatures, de 7 à 22 jours</i></div>
            <div><b>4 à 8</b><i>voyageurs par départ en groupe</i></div>
            <div><b>48 h</b><i>pour une réponse ouvrée à votre demande</i></div>
          </div>
        </div>
        <div className="cse-intro-photo">
          <ImageSlot id="cse-intro" placeholder="Atelier d'artisan, repérage sur place" gradient={GRADIENTS.forest} kanji="間" src="/photos/hands.jpg" sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
      </section>

      <section className="band cse-band">
        <div className="band-kanji" aria-hidden="true">縁</div>
        <div className="wrap">
          <div className="cse-two">
            <div>
              <div className="section-eyebrow">CE QUE NOUS APPORTONS AU CSE</div>
              <h3 className="cse-h3">Le comité garde la main, nous prenons la logistique.</h3>
              <div className="cse-list">
                {CSE_APPORTS.map(i => (
                  <div className="cse-item" key={i.n}>
                    <span className="n">{i.n}</span>
                    <div><b>{i.t}</b><p>{i.p}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="section-eyebrow">LES BÉNÉFICES POUR VOS COLLABORATEURS</div>
              <h3 className="cse-h3">Un voyage qui ne ressemble pas à un voyage d'entreprise.</h3>
              <div className="cse-list">
                {CSE_BENEFS.map(i => (
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
          <div className="section-eyebrow">MISE EN RELATION</div>
          <h2>Parlons de votre comité.</h2>
          <p className="lede" style={{maxWidth:640}}>
            Remplissez ce formulaire, nous revenons vers vous sous deux jours ouvrés avec une proposition d'appel et une première estimation chiffrée.
          </p>
        </div>

        {!sent ? (
          <form className="cse-card" onSubmit={envoyer} noValidate>
            <img className="cse-card-seal" src="/assets/seal-black.png" alt="" />

            <div className="cse-step"><span className="cse-num">1</span><span className="cse-lb">L'entreprise</span></div>
            <div className="form-grid">
              <div className={`field full${err.raison ? ' err' : ''}`}>
                <label htmlFor="cse-raison">Raison sociale <em>obligatoire</em></label>
                <input id="cse-raison" value={f.raison} onChange={set('raison')} placeholder="Kiraku Industries SAS" autoComplete="organization" />
                {err.raison ? <div className="field-err">{err.raison}</div> : null}
              </div>
              <div className={`field${err.siret ? ' err' : ''}`}>
                <label htmlFor="cse-siret">Numéro SIRET <em>obligatoire</em></label>
                <input id="cse-siret" inputMode="numeric" maxLength="17" value={f.siret} onChange={set('siret')} placeholder="123 456 789 00012" />
                {err.siret ? <div className="field-err">{err.siret}</div> : <div className="field-help">Quatorze chiffres, siège ou établissement concerné.</div>}
              </div>
              <div className={`field${err.taille ? ' err' : ''}`}>
                <label>Collaborateurs sur site <em>obligatoire</em></label>
                <CseChips items={CSE_TAILLES} value={taille} onToggle={(k)=>{ setTaille(k); setErr(s=>{const n={...s};delete n.taille;return n;}); }} />
                {err.taille ? <div className="field-err">{err.taille}</div> : null}
              </div>
              <div className={`field full cse-autoc${err.adresse ? ' err' : ''}`}>
                <label htmlFor="cse-adresse">Adresse <em>obligatoire</em></label>
                <input id="cse-adresse" value={f.adresse} onChange={set('adresse')} placeholder="Commencez à taper : 14 rue de l'Échiquier" autoComplete="off" />
                {sugg.length ? (
                  <ul className="cse-sugg">
                    {sugg.map((p, i) => (
                      <li key={i}><button type="button" onClick={() => choisirAdresse(p)}>
                        <b>{p.name}</b><span>{p.postcode} {p.city}</span>
                      </button></li>
                    ))}
                  </ul>
                ) : null}
                {err.adresse ? <div className="field-err">{err.adresse}</div> : <div className="field-help">Choisissez une suggestion, le code postal et la ville se remplissent.</div>}
              </div>
              <div className={`field${err.cp ? ' err' : ''}`}>
                <label htmlFor="cse-cp">Code postal <em>obligatoire</em></label>
                <input id="cse-cp" inputMode="numeric" maxLength="5" value={f.cp} onChange={set('cp')} placeholder="75010" autoComplete="postal-code" />
                {err.cp ? <div className="field-err">{err.cp}</div> : <div className="field-help">{cpEtat === 'cherche' ? 'Recherche de la commune…' : cpEtat === 'vide' ? 'Aucune commune trouvée, saisissez la ville.' : 'La ville se remplit automatiquement.'}</div>}
              </div>
              <div className={`field${err.ville ? ' err' : ''}`}>
                <label htmlFor="cse-ville">Ville <em>obligatoire</em></label>
                {villes.length > 1 ? (
                  <select id="cse-ville" value={f.ville} onChange={set('ville')}>
                    {villes.map(v => <option key={v}>{v}</option>)}
                  </select>
                ) : (
                  <input id="cse-ville" value={f.ville} onChange={set('ville')} placeholder="Paris" autoComplete="address-level2" />
                )}
                {err.ville ? <div className="field-err">{err.ville}</div> : villes.length > 1 ? <div className="field-help">Plusieurs communes partagent ce code postal.</div> : null}
              </div>
            </div>

            <div className="cse-step"><span className="cse-num">2</span><span className="cse-lb">L'interlocuteur</span></div>
            <div className="form-grid">
              <div className={`field${err.nom ? ' err' : ''}`}>
                <label htmlFor="cse-nom">Nom <em>obligatoire</em></label>
                <input id="cse-nom" value={f.nom} onChange={set('nom')} placeholder="Aoyama" autoComplete="family-name" />
                {err.nom ? <div className="field-err">{err.nom}</div> : null}
              </div>
              <div className={`field${err.prenom ? ' err' : ''}`}>
                <label htmlFor="cse-prenom">Prénom <em>obligatoire</em></label>
                <input id="cse-prenom" value={f.prenom} onChange={set('prenom')} placeholder="Camille" autoComplete="given-name" />
                {err.prenom ? <div className="field-err">{err.prenom}</div> : null}
              </div>
              <div className={`field${err.email ? ' err' : ''}`}>
                <label htmlFor="cse-email">Email <em>obligatoire</em></label>
                <input id="cse-email" type="email" inputMode="email" value={f.email} onChange={set('email')} onBlur={verifierEmail} placeholder="camille@entreprise.fr" autoComplete="email" />
                {err.email ? <div className="field-err">{err.email}</div>
                  : suggEmail ? <div className="field-help">Vouliez-vous dire <button type="button" className="lien-sugg" onClick={accepterSuggestion}>{suggEmail}</button> ?</div>
                  : null}
              </div>
              <div className={`field${err.poste ? ' err' : ''}`}>
                <label htmlFor="cse-poste">Poste dans l'entreprise</label>
                <input id="cse-poste" value={f.poste} onChange={set('poste')} placeholder="Secrétaire du CSE, élu, RH…" />
              </div>
              <div className={`field${err.fixe ? ' err' : ''}`}>
                <label htmlFor="cse-fixe">Téléphone fixe</label>
                <input id="cse-fixe" type="tel" inputMode="tel" value={f.fixe} onChange={set('fixe')} onBlur={verifierTel('fixe', false)} placeholder="01 42 33 12 90" />
                {err.fixe ? <div className="field-err">{err.fixe}</div> : null}
              </div>
              <div className={`field${err.mobile ? ' err' : ''}`}>
                <label htmlFor="cse-mobile">Téléphone portable <em>obligatoire</em></label>
                <input id="cse-mobile" type="tel" inputMode="tel" value={f.mobile} onChange={set('mobile')} onBlur={verifierTel('mobile', true)} placeholder="06 45 78 21 09" autoComplete="tel" />
                {err.mobile ? <div className="field-err">{err.mobile}</div> : <div className="field-help">Un mobile, français ou étranger au format +33 6 45 78 21 09.</div>}
              </div>
            </div>

            <div className="cse-step"><span className="cse-num">3</span><span className="cse-lb">Le projet de voyage</span></div>
            <div className="form-grid">
              <div className={`field full${err.pays ? ' err' : ''}`}>
                <label>Destinations qui vous intéressent <em>obligatoire</em></label>
                <CseChips items={CSE_PAYS} value={pays} multi onToggle={(k)=>{ setPays(p => p.indexOf(k) > -1 ? p.filter(x=>x!==k) : p.concat([k])); setErr(s=>{const n={...s};delete n.pays;return n;}); }} />
                {err.pays ? <div className="field-err">{err.pays}</div> : null}
              </div>
              <div className="field full">
                <label>Durée envisagée</label>
                <CseChips items={CSE_DUREES} value={duree} onToggle={setDuree} />
              </div>
              <div className="field full">
                <label>Saison voulue</label>
                <CseChips items={CSE_SAISONS} value={saisons} multi onToggle={bascule(setSaisons, saisons)} />
                <div className="field-help">Plusieurs saisons possibles, nous vous dirons ce qui se prête le mieux à un groupe.</div>
              </div>
              <div className="field full">
                <label htmlFor="cse-msg">Votre contexte</label>
                <textarea id="cse-msg" rows="4" value={f.message} onChange={set('message')} placeholder="Nombre de départs envisagés, budget par collaborateur, participation du comité, calendrier de votre communication interne…" />
              </div>
            </div>

            <div aria-hidden="true" style={{position:'absolute', left:'-9999px', width:1, height:1, overflow:'hidden'}}>
              <label htmlFor="cse-hp">Ne pas remplir</label>
              <input id="cse-hp" tabIndex="-1" autoComplete="off" value={f.hp} onChange={set('hp')} />
            </div>

            {nbErr ? (
              <div className="form-alert" style={{marginTop:20}}>Il manque {nbErr === 1 ? 'une information' : nbErr + ' informations'} avant l'envoi. Les champs en rouge sont à compléter.</div>
            ) : null}
            {erreurEnvoi ? (
              <div className="form-alert" style={{marginTop:20}} role="alert">{erreurEnvoi}</div>
            ) : null}

            <div className="cse-submit">
              <button type="submit" className="btn cse-send" disabled={envoiEnCours} aria-busy={envoiEnCours}>
                {envoiEnCours ? 'Envoi en cours…' : 'Envoyer la demande'}
              </button>
              <em className="cse-note">Réponse sous 48 h ouvrées. Vos données servent uniquement à cet échange.</em>
            </div>
          </form>
        ) : (
          <div className="cse-card cse-merci">
            <img src="/assets/seal-red.png" alt="" />
            <h3>C'est noté, {f.prenom || 'merci'}.</h3>
            <p>
              Nous revenons vers vous sous deux jours ouvrés au {f.mobile || 'numéro indiqué'}, avec une proposition d'horaire et une première estimation pour {f.raison || 'votre comité'}.
            </p>
            <div className="cse-merci-ctas">
              <button className="btn btn-secondary" onClick={() => setSent(false)}>Modifier ma demande</button>
              <button className="btn btn-link" onClick={() => go('itineraries')}>Parcourir les itinéraires</button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

