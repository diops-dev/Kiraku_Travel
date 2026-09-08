// Envoi des formulaires vers l'endpoint PHP hébergé avec le site.
export const ENDPOINT = '/api/envoi.php';

export const MSG_ERREUR_RESEAU =
  "L'envoi n'a pas abouti. Vérifiez votre connexion et réessayez, ou écrivez-nous à contact@kirakutravel.com.";

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
    throw err;
  }
  return corps;
}
