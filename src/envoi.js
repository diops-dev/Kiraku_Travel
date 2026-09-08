// Envoi des formulaires vers l'endpoint PHP hébergé avec le site.
export const ENDPOINT = '/api/envoi.php';

import commonFr from './content/common.fr.js'

// Message de repli, remplace par celui de la langue courante dans les pages.
export const MSG_ERREUR_RESEAU = commonFr.validation.reseau;

export async function envoyerFormulaire(donnees) {
  let reponse;
  try {
    reponse = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...donnees,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      }),
    });
  } catch (e) {
    const err = new Error(MSG_ERREUR_RESEAU);
    err.reseau = true;
    throw err;
  }

  let corps = null;
  try { corps = await reponse.json(); } catch (e) { corps = null; }

  if (!reponse.ok || !corps || corps.ok !== true) {
    const err = new Error((corps && corps.erreur) || MSG_ERREUR_RESEAU);
    err.reseau = !corps;
    // Le serveur peut désigner le champ fautif, on l'affiche au bon endroit.
    if (corps && corps.champ) err.champ = corps.champ;
    throw err;
  }
  return corps;
}
