import React, { useState } from 'react'
import { useT } from './i18n.js'
import { COMMON } from './content/index.js'

// Reservation dans le panneau de droite des pages itineraire.
// Depart en groupe (dates du calendrier) ou voyage prive (calendrier libre).

export const DEPARTS = {
  'CL-01': { jours: 14, prix: 5600, dates: ['2027-03-13','2027-04-03','2027-05-08','2027-07-10','2027-09-11','2027-12-11'] },
  'CL-02': { jours: 14, prix: 5600, dates: ['2027-04-17','2027-05-29','2027-06-19','2027-08-21'] },
  'CL-03': { jours: 14, prix: 5600, dates: ['2027-10-23'] },
  'CL-06': { jours: 21, prix: 8400, dates: ['2027-11-13'] },
  'CL-09': { jours: 12, prix: 3990, dates: ['2026-09-27'] },
  'TR-01': { jours: 12, prix: 4250, dates: ['2027-09-26'] },
};

function parseD(s) { const [y,m,d] = s.split('-').map(Number); return new Date(y, m-1, d); }
function addDays(dt, n) { const d = new Date(dt); d.setDate(d.getDate()+n); return d; }

// Fenetres fermees : janvier, fevrier, Golden Week, Obon, Nouvel An
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
  const c = useT(COMMON);
  const b = c.booking;
  const base = value ? parseD(value) : new Date(2027, 2, 1);
  const [cur, setCur] = useState({ y: base.getFullYear(), m: base.getMonth() });
  const first = new Date(cur.y, cur.m, 1);
  const offset = (first.getDay() + 6) % 7;
  const nb = new Date(cur.y, cur.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= nb; d++) cells.push(new Date(cur.y, cur.m, d));
  const shift = (n) => setCur(s => { const d = new Date(s.y, s.m + n, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const limite = new Date(2026, 8, 6);
  return (
    <div className="cal">
      <div className="cal-head">
        <button type="button" aria-label={c.ui.moisPrecedent} onClick={() => shift(-1)}>‹</button>
        <span>{b.mois[cur.m]} {cur.y}</span>
        <button type="button" aria-label={c.ui.moisSuivant} onClick={() => shift(1)}>›</button>
      </div>
      <div className="cal-grid cal-dow">{b.joursL.map((j, i) => <span key={i}>{j}</span>)}</div>
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
      <div className="cal-note">{b.calNote}</div>
    </div>
  );
}

export function LigneCompteur({ label, sub, value, min = 0, max = 12, onChange }) {
  const c = useT(COMMON);
  return (
    <div className="cnt-row">
      <div className="cnt-lbl">{label}{sub ? <small>{sub}</small> : null}</div>
      <div className="cnt-step">
        <button type="button" aria-label={`${c.ui.retirer} · ${label}`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
        <span>{value}</span>
        <button type="button" aria-label={`${c.ui.ajouter} · ${label}`} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
      </div>
    </div>
  );
}

export function RailBooking({ circuitRef, go }) {
  const c = useT(COMMON);
  const b = c.booking;
  const fmtCourt = (dt) => `${dt.getDate()} ${b.moisCourt[dt.getMonth()]} ${dt.getFullYear()}`;
  const fmtEuro = (n) => n.toLocaleString(b.locale).replace(/\u202f|\u00a0/g, ' ') + ' €';
  const circuit = DEPARTS[circuitRef] || { jours: 14, prix: null, dates: [] };
  const dates = circuit.dates.map(parseD);
  const jours = circuit.jours;

  const [mode, setMode] = useState(dates.length ? 'groupe' : 'prive');
  const [pick, setPick] = useState(null);
  const [dateLibre, setDateLibre] = useState('');
  const [adultes, setAdultes] = useState(dates.length ? 4 : 2);
  const [enfants, setEnfants] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [chambresManuel, setChambresManuel] = useState(null);
  const choisirMode = (m) => { setMode(m); if (m === 'groupe' && adultes < 4) setAdultes(4); };

  const chambres = chambresManuel === null ? Math.max(1, Math.ceil((adultes + enfants) / 2)) : chambresManuel;
  const payants = adultes + enfants;
  const pret = mode === 'groupe' ? pick !== null : !!dateLibre;

  const recap = () => {
    const v = `${payants} ${payants > 1 ? b.recapVoyageurs : b.recapVoyageur}`;
    const bb = bebes ? ` ${b.recapEt} ${bebes} ${bebes > 1 ? b.recapBebes : b.recapBebe}` : '';
    const ch = `${chambres} ${chambres > 1 ? b.recapChambres : b.recapChambre}`;
    return `${v}${bb} · ${ch}. ${b.recapFin}`;
  };

  return (
    <div className="resa-rail">
      <div className="resa-tabs">
        <button type="button" className={mode === 'groupe' ? 'on' : ''} onClick={() => choisirMode('groupe')}>{b.enGroupe}</button>
        <button type="button" className={mode === 'prive' ? 'on' : ''} onClick={() => choisirMode('prive')}>{b.enPrive}</button>
      </div>

      {mode === 'groupe' ? (
        dates.length ? (
          <div className="resa-list">
            {dates.map((d, i) => (
              <button type="button" key={i} className={`resa-line${pick === i ? ' on' : ''}`} onClick={() => setPick(i)}>
                <span className="dot" aria-hidden="true"></span>
                <span className="d">{fmtCourt(d)}<small>{b.retourLe} {fmtCourt(addDays(d, jours - 1))}</small></span>
                {circuit.prix ? <span className="p">{fmtEuro(circuit.prix)}</span> : null}
              </button>
            ))}
          </div>
        ) : (
          <div className="resa-vide">{b.aucuneDate}</div>
        )
      ) : (
        <div className="resa-cal">
          <MiniCalendrier value={dateLibre} onPick={setDateLibre} />
          {dateLibre ? (
            <div className="resa-choix">{b.departLe} {fmtCourt(parseD(dateLibre))}, {b.retourLePhrase} {fmtCourt(addDays(parseD(dateLibre), jours - 1))}.</div>
          ) : null}
        </div>
      )}

      <div className="resa-qui">
        <LigneCompteur label={b.voyageurs} sub={mode === 'groupe' ? b.voyageursSubGroupe : b.voyageursSubPrive} value={adultes} min={mode === 'groupe' ? 4 : 1} max={8} onChange={setAdultes} />
        <LigneCompteur label={b.enfants} sub={b.enfantsSub} value={enfants} max={8} onChange={setEnfants} />
        <LigneCompteur label={b.bebes} sub={b.bebesSub} value={bebes} max={4} onChange={setBebes} />
        <LigneCompteur label={b.chambres} sub={chambresManuel === null ? b.chambresAuto : b.chambresManuel} value={chambres} min={1} max={8} onChange={setChambresManuel} />
      </div>

      <div className="resa-cta">
        {mode === 'groupe' && circuit.prix ? (
          <div className="resa-tot"><span>{b.estimation}</span><b>{pick === null ? '·' : fmtEuro(payants * circuit.prix)}</b></div>
        ) : (
          <div className="resa-tot"><span>{b.voyagePrive}</span><b>{b.surDevis}</b></div>
        )}
        <button className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}} onClick={() => go('contact')}>
          {mode === 'groupe' ? b.demanderDate : b.demanderDevis}
        </button>
        <div className="resa-mini">
          {pret ? recap() : (mode === 'groupe' ? b.choisirDateListe : b.choisirDateCal)}
        </div>
      </div>
    </div>
  );
}
