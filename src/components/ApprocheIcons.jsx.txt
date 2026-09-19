// Pictogrammes de la section "Ce qu'on fait, ce qu'on ne fait pas" (accueil).
// Meme convention que le systeme de vignettes (src/circuitTypes.js) :
// grille 24x24, trait fin, sans remplissage, couleur heritee via currentColor.

const base = {
  viewBox: '0 0 24 24',
  width: '100%',
  height: '100%',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const APPROCHE_ICONS = {
  'japon-secret': (
    <svg {...base}>
      <path d="M2.5 12S6.2 6 12 6s9.5 6 9.5 6-3.7 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.8" />
      <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" />
    </svg>
  ),
  'ryokan-facade': (
    <svg {...base}>
      <path d="M3 11 12 4l9 7" />
      <path d="M5.5 10v9.5h13V10" />
      <line x1="12" y1="19.5" x2="12" y2="13.5" />
    </svg>
  ),
  'visite-troupeau': (
    <svg {...base}>
      <circle cx="8.3" cy="8" r="2.8" />
      <path d="M2.2 19.5c0-3.2 2.7-5.8 6.1-5.8s6.1 2.6 6.1 5.8" />
      <circle cx="17.2" cy="9" r="2.2" />
      <path d="M14.9 19.5c.2-2.6 2-4.7 4.9-5" />
    </svg>
  ),
  'lieux-insolites': (
    <svg {...base}>
      <path d="M12 21s7-7.3 7-12.3a7 7 0 1 0-14 0C5 13.7 12 21 12 21Z" />
      <circle cx="12" cy="8.9" r="2.3" />
    </svg>
  ),
  'tables-locales': (
    <svg {...base}>
      <path d="M3.5 12h17" />
      <path d="M4.3 12a7.7 7.7 0 0 0 15.4 0" />
      <line x1="9" y1="12" x2="7.2" y2="3.2" />
      <line x1="15" y1="12" x2="16.8" y2="3.2" />
    </svg>
  ),
  'vie-quotidienne': (
    <svg {...base}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.4 2" />
    </svg>
  ),
  'culture-vecue': (
    <svg {...base}>
      <path d="M3 7c3-1.3 15-1.3 18 0" />
      <line x1="5" y1="11" x2="19" y2="11" />
      <line x1="6.3" y1="7" x2="6.3" y2="21" />
      <line x1="17.7" y1="7" x2="17.7" y2="21" />
    </svg>
  ),
  train: (
    <svg {...base}>
      <rect x="4" y="5.5" width="16" height="10.5" rx="4.5" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="8.3" y1="16" x2="6.3" y2="19.5" />
      <line x1="15.7" y1="16" x2="17.7" y2="19.5" />
      <circle cx="8.3" cy="19.2" r=".2" />
      <circle cx="15.7" cy="19.2" r=".2" />
    </svg>
  ),
  'lever-du-jour': (
    <svg {...base}>
      <path d="M12 3.5v3.8" />
      <path d="M4.6 10.1l1.5 1.5" />
      <path d="M19.4 10.1l-1.5 1.5" />
      <path d="M2 17h20" />
      <path d="M6.2 17a5.8 5.8 0 0 1 11.6 0" />
    </svg>
  ),
};

export function ApprocheIcon({ id, size = 22, ...rest }) {
  const icon = APPROCHE_ICONS[id];
  if (!icon) return null;
  return (
    <span
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      {...rest}>
      {icon}
    </span>
  );
}
