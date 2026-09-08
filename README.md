# Kiraku Travel · site web

Site de production construit à partir du design Claude.design
« Site Web Kiraku Travel 092026 CSE.zip » (Drive, `Kiraku - 08 Site Web & Outils`).

React 18 + Vite, routes réelles avec react-router, et **pré-rendu statique** :
au build, chaque URL devient une page HTML complète, indexable par les moteurs
et lisible par les IA, puis React prend la main côté navigateur.

## Dépôt GitHub

`https://github.com/diops-dev/Kiraku_Travel`

- `main` : le code source, ce dossier
- `deploy` : le site compilé, ce que Hostinger clone dans `public_html`

La procédure complète de mise en ligne est dans `DEPLOIEMENT.md`.

## Où vit le projet

Deux emplacements, deux rôles :

- **Drive**, `Kiraku - 08 Site Web & Outils/Code site (kiraku-site-2026)` :
  le dossier de référence, sources et `dist/`, consultable depuis n'importe où.
- **Mac**, `Documents/Claude/Projects/Kiraku Travel/Kiraku_Travel-github` :
  le clone Git, celui qui pousse vers GitHub. Un dossier `.git` ne doit jamais
  être synchronisé par Google Drive, la synchro corrompt les dépôts.

`scripts/sync-depuis-drive.sh` recopie les sources du Drive vers le clone,
`scripts/deploy.sh` renvoie le build vers le Drive après compilation.

`node_modules` n'est volontairement pas sur le Drive : c'est 318 Mo et des
dizaines de milliers de fichiers que Google Drive n'a aucune raison de
synchroniser. On travaille donc avec une copie locale de travail, et le Drive
reste la référence, `dist/` compris.

```bash
# copie de travail, hors Drive
rsync -a --exclude node_modules --exclude dist \
  ~/Library/CloudStorage/GoogleDrive-contact@kirakutravel.com/"Mi unidad"/"Kiraku - 08 Site Web & Outils"/"Code site (kiraku-site-2026)"/ \
  ~/kiraku-build/
cd ~/kiraku-build && npm install
```

## Commandes

```bash
npm run dev      # développement, http://localhost:5173
npm run build    # génère le sitemap puis le site statique dans dist/
npm run preview  # relit dist/ en local
```

Après un build, recopier `dist/` et les sources modifiées vers le dossier
Drive pour que la référence reste à jour.

## Structure

```
index.html            page d'entrée, données structurées TravelAgency
src/main.jsx          point d'entrée, polices, feuille de style
src/routes.jsx        table des pages, titres et descriptions SEO
src/paths.js          correspondance clé de route ↔ URL, slugs des circuits
src/Layout.jsx        barre de navigation, contenu, pied de page
src/Seo.jsx           titre, description, canonique, carte sociale
src/components.jsx    Nav, Footer, ImageSlot (photos responsive)
src/HomePage.jsx      accueil, données CIRCUITS_LONG / CIRCUITS_SHORT / EXTENSIONS
src/DetailPage.jsx    fiche itinéraire, page index des itinéraires
src/AlpesTrip.jsx     fiche CL-09, la seule fiche entièrement rédigée
src/DetailParts.jsx   carrousel, jour par jour, encadré prix
src/inclusions.jsx    onglets « votre séjour en détails »
src/booking.jsx       panneau de réservation, dates et compteurs
src/JaponPages.jsx    Le Japon, Histoire, Gastronomie, Guide pratique
src/Pages.jsx         Notre approche, Contact, Journal
src/CSEPage.jsx       page comités d'entreprise et son formulaire
src/Legal.jsx         CGV et mentions légales (données dans cgv-data.js)
src/photos.js         manifeste des visuels, généré depuis public/photos
public/photos/        17 visuels en WebP, trois largeurs (640, 1280, 1920)
public/fonts/         Shippori Mincho sous-ensemblée, 4 graisses
public/.htaccess      réécritures et cache pour Hostinger
scripts/sitemap.mjs   génère public/sitemap.xml depuis src/paths.js
```

## URL

`/` · `/itineraires` · `/itineraires/<slug>` (9 circuits) · `/le-japon` ·
`/le-japon/histoire` · `/le-japon/gastronomie` · `/guide-pratique` ·
`/notre-approche` · `/journal` · `/cse-comites-entreprise` · `/contact` ·
`/cgv-mentions-legales`

Les slugs des circuits sont définis dans `src/paths.js`. Modifier un slug
change l'URL publique : prévoir une redirection dans `.htaccess`.

## Mise en ligne sur Hostinger

1. `npm run build`
2. envoyer **le contenu** de `dist/` dans `public_html/` (le `.htaccess` est
   inclus dans le dépôt sous `public/`, il est copié au build)
3. le fichier `.htaccess` force HTTPS, redirige `www` vers le domaine nu et
   sert les pages pré-rendues

Pour un déploiement automatique depuis GitHub, une action qui lance
`npm ci && npm run build` puis dépose `dist/` par FTP suffit.

## Écarts connus, à traiter

- Les fiches CL-01 à CL-08 affichent le contenu de démonstration du design
  (Kunisaki). Seul CL-09, la traversée des Alpes, est rédigé. Le jour par jour
  extrait du Drive est prêt à être branché.
- Quelques emplacements photo restent en aplat de marque : carrousel des
  fiches (crête, onsen, marché de Saiki, montée vers Enzanso) et vignette du
  circuit CL-09.
- Les formulaires (contact et CSE) ne sont pas connectés : ils valident les
  saisies puis affichent un message. Il faut brancher un envoi, par exemple
  vers HubSpot ou une adresse mail.
- Liens LinkedIn et TikTok du pied de page en attente d'URL.
- Le journal n'a pas encore d'articles : la page liste des titres sans pages
  de destination.

## Polices

Toutes auto-hébergées, aucun appel à Google Fonts. Shippori Mincho est
sous-ensemblée depuis les fichiers de marque (latin complet plus les
caractères japonais utilisés), soit 85 Ko par graisse au lieu de 8,5 Mo.
Les familles Noto Sans JP, Noto Serif JP, Yuji Mai et JetBrains Mono viennent
des paquets @fontsource en sous-ensemble latin.

## Trois langues

Le site est servi en francais a la racine, en anglais sous `/en` et en espagnol
sous `/es`, avec des adresses traduites (`/itineraires`, `/en/itineraries`,
`/es/itinerarios`) et des balises `hreflang` sur chaque page.

- `src/langs.js` : la liste des langues et les fonctions sans dependance React.
- `src/i18n.js` : le contexte de langue, `useLang()` et `useT(dictionnaire)`.
- `src/paths.js` : la table des URL des trois langues, `rt(route, param, lang)`,
  `analyser(pathname)` et `alternatives(cle, ref)` pour les `hreflang`.
- `src/content/` : un fichier par page et par langue (`home.fr.js`, `home.en.js`,
  `home.es.js`...), assembles dans `src/content/index.js`. Les composants ne
  contiennent plus de texte, ils lisent le dictionnaire de la langue courante.
- Les CGV francaises restent dans `src/cgv-data.js`, leurs traductions dans
  `src/content/cgv.en.js` et `src/content/cgv.es.js`. Les pages traduites
  portent la mention que seule la version francaise fait foi.

Pour ajouter une page : sa cle dans `BRUT` de `src/paths.js` pour les trois
langues, son entree dans `PAGES_SIMPLES` de `src/routes.jsx`, ses metadonnees
dans le bloc `seo` des trois `common.<lang>.js`. Le build genere 60 pages.
