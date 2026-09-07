import React, { useState } from 'react'

// Réservation dans le panneau de droite des pages itinéraire
// Départ en groupe (dates du calendrier 2027) ou voyage privé (calendrier libre)

export const DEPARTS = {
  'CL-01': { nom: 'Du Néon au Silence', jours: 14, prix: 5600, dates: ['2027-03-13','2027-04-03','2027-05-08','2027-07-10','2027-09-11','2027-12-11'] },
  'CL-02': { nom: 'Mille Marches vers le Nord', jours: 14, prix: 5600, dates: ['2027-04-17','2027-05-29','2027-06-19','2027-08-21'] },
  'CL-03': { nom: 'Des Temples aux Coraux', jours: 14, prix: 5600, dates: ['2027-10-23'] },
  'CL-06': { nom: 'La Traversée sans Hâte', jours: 21, prix: 8400, dates: ['2027-11-13'] },
  'CL-09': { nom: 'Traversée des Alpes japonaises', jours: 12, prix: 3990, dates: ['2026-09-27'] },
  'TR-01': { nom: 'La Ligne de Crête', jours: 12, prix: 4250, dates: ['2027-09-26'] },
};

const MOIS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
const MOIS_COURT = ['janv.','févr.','mars','avril','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
const JOURS_L = ['L','M','M','J','V','S','D'];

function parseD(s) { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); }
function addDays(dt, n) { const d = new Date(dt); d.setDate(d.getDate()+n); return d; }
function fmtCourt(dt) { return `${dt.getDate()} ${MOIS_COURT[dt.getMonth()]} ${dt.getFullYear()}`; }
function fmtEuro(n) { return n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ') + ' €'; }

// Fenêtres fermées : janvier, février, Golden Week, Obon, Nouvel An
function estFerme(d) {
  const m = d.getMonth(), j = d.getDate();
  if (m === 0 || m === 1) return true;
  if (m === 3 && j >= 29) return true;
  if (m === 4 && j <= 5) return true;
  if (m === 7 && j >= 11 && j <= 17) return true;
  if (m === 11 && j >= 28) return true;
  return false;
}

export function MiniCalendrier({ value, onPick }) {
  const base = value ? parseD(value) : new Date(2027, 2, 1);
  const [cur, setCur] = useState({ y: base.getFullYear(), m: base.getMonth() });
  const first = new Date(cur.y, cur.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const nb = new Date(cur.y, cur.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= nb; d++) cells.push(new Date(cur.y, cur.m, d));
  const shift = (n) => setCur(c => { const d = new Date(c.y, c.m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const limite = new Date(2026, 8, 6);
  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" aria-label="Mois précédent" onClick={() => shift(-1)}>‹</button>
        <span>{MOIS[cur.m]} {cur.y}</span>
        <button type="button" aria-label="Mois suivant" onClick={() => shift(1)}>›</button>
      </div>
      <div className="cal-grid cal-dow">{JOURS_L.map((j, i) => <span key={i}>{j}</span>)}</div>
      <div className="cal-grid">
        {cells.map((d, i) => {
          if (!d) return <span key={i}></span>;
          const off = estFerme(d) || d < limite;
          const on = value === iso(d);
          return (
            <button type="button" key={i} className={`cal-d${off ? ' off' : ''}${on ? ' on' : ''}`} disabled={off} onClick={() => onPick(iso(d))}>{d.getDate()}</button>
          );
        })}
      </div>
      <div className="cal-note">Grisé : janvier, février, Golden Week, Obon et Nouvel An.</div>
    </div>
  );
}

export function LigneCompteur({ label, sub, value, min = 0, max = 12, onChange }) {
  return (
    <div className="cnt-row">
      <div className="cnt-lbl">{label}{sub ? <small>{sub}</small> : null}</div>
      <div className="cnt-step">
        <button type="button" aria-label={`Retirer · ${label}`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
        <span>{value}</span>
        <button type="button" aria-label={`Ajouter · ${label}`} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
      </div>
    </div>
  );
}

export function RailBooking({ circuitRef, go }) {
  const c = DEPARTS[circuitRef] || { jours: 14, prix: null, dates: [] };
  const dates = c.dates.map(parseD);
  const jours = c.jours;

  const [mode, setMode] = useState(dates.length ? 'groupe' : 'prive');
  const choisirMode = (m) => { setMode(m); if (m === 'groupe' && adultes < 4) setAdultes(4); };
  const [pick, setPick] = useState(null);
  const [dateLibre, setDateLibre] = useState('');
  const [adultes, setAdultes] = useState(dates.length ? 4 : 2);
  const [enfants, setEnfants] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [chambresManuel, setChambresManuel] = useState(null);

  const chambres = chambresManuel === null ? Math.max(1, Math.ceil((adultes + enfants) / 2)) : chambresManuel;
  const payants = adultes + enfants;
  const pret = mode === 'groupe' ? pick !== null : !!dateLibre;

  return (
    <div className="resa-rail">
      <div className="resa-tabs">
        <button type="button" className={mode === 'groupe' ? 'on' : ''} onClick={() => choisirMode('groupe')}>En groupe</button>
        <button type="button" className={mode === 'prive' ? 'on' : ''} onClick={() => choisirMode('prive')}>En privé</button>
      </div>

      {mode === 'groupe' ? (
        dates.length ? (
          <div className="resa-list">
            {dates.map((d, i) => (
              <button type="button" key={i} className={`resa-line${pick === i ? ' on' : ''}`} onClick={() => setPick(i)}>
                <span className="dot" aria-hidden="true"></span>
                <span className="d">{fmtCourt(d)}<small>retour le {fmtCourt(addDays(d, jours - 1))}</small></span>
                {c.prix ? <span className="p">{fmtEuro(c.prix)}</span> : null}
              </button>
            ))}
          </div>
        ) : (
          <div className="resa-vide">Aucune date de groupe publiée. Nous en ouvrons une à partir de quatre voyageurs.</div>
        )
      ) : (
        <div className="resa-cal">
          <MiniCalendrier value={dateLibre} onPick={setDateLibre} />
          {dateLibre ? (
            <div className="resa-choix">Départ le {fmtCourt(parseD(dateLibre))}, retour le {fmtCourt(addDays(parseD(dateLibre), jours - 1))}.</div>
          ) : null}
        </div>
      )}

      <div className="resa-qui">
        <LigneCompteur label="Voyageurs" sub={mode === 'groupe' ? 'quatre minimum en groupe' : '13 ans et plus'} value={adultes} min={mode === 'groupe' ? 4 : 1} max={8} onChange={setAdultes} />
        <LigneCompteur label="Enfants" sub="moins de 13 ans" value={enfants} max={8} onChange={setEnfants} />
        <LigneCompteur label="Bébés" sub="moins de 2 ans" value={bebes} max={4} onChange={setBebes} />
        <LigneCompteur label="Chambres" sub={chambresManuel === null ? 'deux par chambre' : 'à votre demande'} value={chambres} min={1} max={8} onChange={setChambresManuel} />
      </div>

      <div className="resa-cta">
        {mode === 'groupe' && c.prix ? (
          <div className="resa-tot"><span>Estimation</span><b>{pick === null ? '—' : fmtEuro(payants * c.prix)}</b></div>
        ) : (
          <div className="resa-tot"><span>Voyage privé</span><b>Sur devis</b></div>
        )}
        <button className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}} onClick={() => go('contact')}>
          {mode === 'groupe' ? 'Demander cette date' : 'Demander un devis'}
        </button>
        <div className="resa-mini">
          {pret
            ? `${adultes + enfants} voyageur${payants > 1 ? 's' : ''}${bebes ? ` et ${bebes} bébé${bebes > 1 ? 's' : ''}` : ''} · ${chambres} chambre${chambres > 1 ? 's' : ''}. Aucun paiement à cette étape.`
            : (mode === 'groupe' ? 'Choisissez une date ci-dessus. Aucun paiement à cette étape.' : 'Choisissez une date au calendrier. Aucun paiement à cette étape.')}
        </div>
      </div>
    </div>
  );
}

