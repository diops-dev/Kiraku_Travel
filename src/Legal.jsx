import React, { useEffect, useState } from 'react'
import { useLang, useT, pick } from './i18n.js'
import { CGV, PAGES } from './content/index.js'

// Page CGV et renseignements legaux. Les donnees viennent de cgv-data.js
// pour le francais, de content/cgv.<lang>.js pour les traductions.

export function CGVPage({ go }) {
  const lang = useLang();
  const D = pick(CGV, lang);
  const L = useT(PAGES).cgv;
  const { CGV_BLOCKS, CGV_FACTS, CGV_PREAMBULE, CGV_TABLES, CGV_TOC, CGV_VERSION } = D;
  const [active, setActive] = useState(CGV_TOC[0][0]);
  useEffect(() => {
    const ids = CGV_TOC.map(t => t[0]);
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [CGV_TOC]);

  const jump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
  };

  const body = { fontFamily: 'var(--font-serif)', fontSize: 16.5, lineHeight: 1.8, color: 'var(--fg-2)', margin: '0 0 16px', textWrap: 'pretty' };
  const leadStyle = { fontFamily: 'var(--font-sans)', fontSize: 15.5, fontWeight: 600, color: 'var(--fg)' };

  const table = (key, i) => {
    const t = CGV_TABLES[key];
    if (!t) return null;
    const cols = t.head.length === 2 ? '1fr 1fr' : 'repeat(' + t.head.length + ', 1fr)';
    return (
      <div key={i} className="cgv-table">
        <div className="cgv-tr cgv-th" style={{ gridTemplateColumns: cols }}>{t.head.map((h, j) => <div key={j}>{h}</div>)}</div>
        {t.rows.map((r, j) => (
          <div className="cgv-tr" key={j} style={{ gridTemplateColumns: cols }}>{r.map((cell, k) => <div key={k}>{cell}</div>)}</div>
        ))}
      </div>
    );
  };

  return (
    <>
      <section className="wrap" style={{ paddingTop: 140 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 720 }}>
            <div className="section-eyebrow">{L.eyebrowVersion} · {CGV_VERSION.label}</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 'clamp(38px,5vw,64px)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 20px', textWrap: 'balance' }}>
              {L.titre}
            </h1>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1.65, color: 'var(--fg-2)', margin: 0, maxWidth: 620 }}>
              {L.sousTitre(CGV_VERSION)}
            </p>
            {L.primaute ? (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-muted)', margin: '18px 0 0', maxWidth: 620, paddingLeft: 14, borderLeft: '2px solid var(--kiraku-shu)' }}>
                {L.primaute}
              </p>
            ) : null}
          </div>
          <img src="/assets/seal-red.png" alt="" style={{ width: 96, height: 96, objectFit: 'contain', opacity: 0.9 }} />
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 56 }}>
        <div style={{ background: 'var(--kiraku-washi-2)', borderRadius: 14, padding: '36px 40px', border: '1px solid var(--hairline)' }}>
          <div className="section-eyebrow" style={{ marginBottom: 22 }}>{L.preambule}</div>
          <p style={{ ...body, fontSize: 16, maxWidth: 900, margin: '0 0 26px' }}>{CGV_PREAMBULE}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(280px,1fr))', gap: '2px 56px' }}>
            {CGV_FACTS.map(([k, v], i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '190px 1fr', gap: 16, padding: '11px 0', borderBottom: '1px solid var(--hairline)' }}>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', paddingTop: 3 }}>{k}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--fg)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ padding: '72px 48px 120px' }}>
        <div className="cgv-layout">
          <nav className="cgv-toc">
            <div className="section-eyebrow" style={{ marginBottom: 16 }}>{L.sommaire}</div>
            <ul>
              {CGV_TOC.map(([id, label]) => (
                <li key={id}>
                  <a href={'#' + id} onClick={(e) => jump(e, id)} className={active === id ? 'on' : ''}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="cgv-body">
            {CGV_BLOCKS.map((b, i) => {
              const t = b[0];
              if (t === 'h2') return (
                <h2 key={i} id={b[1]} style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 30, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--fg)', margin: '56px 0 18px', paddingTop: 20, borderTop: '1px solid var(--hairline)', textWrap: 'balance' }}>{b[2]}</h2>
              );
              if (t === 'h3') return (
                <h3 key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--kiraku-enji)', margin: '34px 0 12px' }}>{b[1]}</h3>
              );
              if (t === 'li') return (
                <p key={i} style={{ ...body, paddingLeft: 22, borderLeft: '1px solid var(--hairline)', fontSize: 16, margin: '0 0 10px' }}>{b[1]}</p>
              );
              if (t === 'lead') return (
                <p key={i} style={body}><b style={leadStyle}>{b[1]} </b>{b[2]}</p>
              );
              if (t === 'formule') return (
                <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.7, color: 'var(--fg)', background: 'var(--kiraku-washi-2)', border: '1px solid var(--hairline)', borderRadius: 10, padding: '18px 22px', margin: '4px 0 20px' }}>{b[1]}</div>
              );
              if (t === 'panel') return (
                <div key={i} style={{ background: 'var(--kiraku-paper)', border: '1px solid var(--hairline)', borderRadius: 12, padding: '24px 26px', margin: '8px 0 22px' }}>
                  <div className="section-eyebrow" style={{ marginBottom: 10 }}>{b[1]}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.75, color: 'var(--fg)' }} dangerouslySetInnerHTML={{ __html: b[2] }} />
                </div>
              );
              if (t === 'table') return table(b[1], i);
              return <p key={i} style={body}>{b[1]}</p>;
            })}

            <div style={{ marginTop: 64, paddingTop: 28, borderTop: '1px solid var(--hairline)', display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => go('contact')}>{L.question}</button>
              <span style={{ fontSize: 13, color: 'var(--fg-muted)' }}>{L.pied(CGV_VERSION)}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
