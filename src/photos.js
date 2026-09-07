// Généré depuis public/photos : largeurs disponibles par visuel.
export const PHOTOS = {
  "alley": [
    640,
    1280,
    1920
  ],
  "chidorigafuchi": [
    640,
    1280,
    1920
  ],
  "chureito-fuji": [
    640,
    1280,
    1920
  ],
  "fuji-city": [
    640,
    1280,
    1920
  ],
  "fushimi-inari": [
    640,
    1280,
    1920
  ],
  "hands": [
    640,
    1280,
    1920
  ],
  "kamakura": [
    640,
    1280,
    1920
  ],
  "kinkakuji": [
    640,
    1280
  ],
  "kiyomizu-street": [
    640,
    1280,
    1920
  ],
  "koinobori": [
    640,
    1280,
    1920
  ],
  "miyajima-torii": [
    640,
    1280,
    1920
  ],
  "osaka-castle": [
    640,
    1280,
    1920
  ],
  "takachiho": [
    640
  ],
  "tokyo-night": [
    640,
    1280,
    1920
  ],
  "torii-walkway": [
    640,
    1280,
    1920
  ],
  "yasaka-kimono": [
    640,
    1280,
    1920
  ],
  "youtei-snow": [
    640,
    1280,
    1920
  ]
};

// '/photos/tokyo-night.jpg' → jeu d'images responsive en WebP.
export function photoSet(src) {
  if (!src) return null;
  const stem = String(src).split('/').pop().replace(/\.[a-z]+$/i, '').replace(/-\d+$/, '');
  const widths = PHOTOS[stem];
  if (!widths || !widths.length) return null;
  const srcSet = widths.map(w => `/photos/${stem}-${w}.webp ${w}w`).join(', ');
  const fallback = widths.includes(1280) ? 1280 : widths[widths.length - 1];
  return { src: `/photos/${stem}-${fallback}.webp`, srcSet };
}
