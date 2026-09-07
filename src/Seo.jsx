import React from 'react'
import { Head } from 'vite-react-ssg'

export const SITE = 'https://japonautrement.fr';

// Titre, description, canonique et carte sociale d'une page.
export default function Seo({ titre, description, path = '/', image = '/photos/chureito-fuji-1280.webp' }) {
  const url = SITE + path;
  return (
    <Head>
      <title>{titre}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Kiraku Travel" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={titre} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE + image} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
}
