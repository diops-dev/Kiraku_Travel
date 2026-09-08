// Validation des adresses email et des numéros de téléphone.
// Ce fichier a un jumeau côté serveur : public/api/validation.php.
// Toute règle modifiée ici doit l'être là-bas aussi, le serveur fait foi.

/* ---------------------------------------------------------------- EMAIL */

// Domaines jetables : une demande de voyage ne se fait pas avec une boîte
// qui expire dans dix minutes.
export const DOMAINES_JETABLES = [
  '0-mail.com', '10minutemail.com', '20minutemail.com', '33mail.com',
  'anonbox.net', 'armyspy.com', 'burnermail.io', 'cuvox.de', 'dispostable.com',
  'dropmail.me', 'einrot.com', 'emailondeck.com', 'fakeinbox.com', 'fakemail.net',
  'getairmail.com', 'getnada.com', 'grr.la', 'guerrillamail.com', 'guerrillamail.net',
  'guerrillamail.org', 'inboxbear.com', 'jetable.org', 'mail-temporaire.fr',
  'mail7.io', 'mailcatch.com', 'maildrop.cc', 'mailinator.com', 'mailnesia.com',
  'mailsac.com', 'mailtemp.info', 'moakt.com', 'mohmal.com', 'mytemp.email',
  'nowmymail.com', 'sharklasers.com', 'spam4.me', 'spamgourmet.com',
  'temp-mail.org', 'tempail.com', 'tempmail.net', 'tempmailo.com', 'tempr.email',
  'throwawaymail.com', 'trashmail.com', 'trashmail.fr', 'yopmail.com',
  'yopmail.fr', 'yopmail.net',
];

// Domaines courants chez nos voyageurs, servent à repérer les fautes de frappe.
const DOMAINES_COURANTS = [
  'gmail.com', 'googlemail.com', 'outlook.com', 'outlook.fr', 'hotmail.com',
  'hotmail.fr', 'live.fr', 'live.com', 'msn.com', 'yahoo.com', 'yahoo.fr',
  'orange.fr', 'wanadoo.fr', 'free.fr', 'sfr.fr', 'neuf.fr', 'laposte.net',
  'bbox.fr', 'numericable.fr', 'aliceadsl.fr', 'icloud.com', 'me.com',
  'protonmail.com', 'proton.me',
];

const RX_EMAIL = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

// Distance de Levenshtein, plafonnée : au delà de 2 on ne propose rien.
function distance(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return d[a.length][b.length];
}

// Propose une correction quand le domaine ressemble à un domaine courant.
export function suggererDomaine(email) {
  const at = String(email).lastIndexOf('@');
  if (at < 1) return null;
  const locale = email.slice(0, at);
  const domaine = email.slice(at + 1).toLowerCase();
  if (DOMAINES_COURANTS.indexOf(domaine) > -1) return null;
  let meilleur = null;
  let court = 3;
  for (const candidat of DOMAINES_COURANTS) {
    const d = distance(domaine, candidat);
    if (d > 0 && d < court) { court = d; meilleur = candidat; }
  }
  return meilleur ? `${locale}@${meilleur}` : null;
}

export function validerEmail(valeur) {
  const email = String(valeur || '').trim();
  if (!email) return { ok: false, erreur: 'Votre email est requis.' };
  if (email.length > 254) return { ok: false, erreur: 'Cette adresse est trop longue.' };
  if (!RX_EMAIL.test(email) || email.indexOf('..') > -1) {
    return { ok: false, erreur: "Cet email ne semble pas valide, vérifiez la partie après le @." };
  }
  const domaine = email.slice(email.lastIndexOf('@') + 1).toLowerCase();
  if (DOMAINES_JETABLES.indexOf(domaine) > -1) {
    return { ok: false, erreur: "Les adresses temporaires ne sont pas acceptées, indiquez une adresse que vous consultez." };
  }
  const suggestion = suggererDomaine(email);
  return { ok: true, valeur: email, suggestion };
}

/* ------------------------------------------------------------ TÉLÉPHONE */

// Indicatifs les plus courants chez nos voyageurs, pour un message utile.
const LONGUEURS_NATIONALES = { 33: [9], 32: [8, 9], 41: [9], 352: [9], 377: [8] };

function chiffres(v) {
  return String(v || '').replace(/[^\d+]/g, '');
}

// Un seul chiffre répété, ou une suite croissante ou décroissante.
function sequence(n) {
  if (n.length < 6) return false;
  if (/^(\d)\1+$/.test(n)) return true;
  let monte = true;
  let descend = true;
  for (let i = 1; i < n.length; i++) {
    if ((+n[i]) !== ((+n[i - 1] + 1) % 10)) monte = false;
    if ((+n[i]) !== ((+n[i - 1] + 9) % 10)) descend = false;
  }
  return monte || descend;
}

// Numéro qui ne peut pas exister. On regarde le numéro entier, mais aussi la
// partie abonné : 06 00 00 00 00 et 06 12 34 56 78 sont les faux les plus
// courants, et leurs deux premiers chiffres masquent le motif.
function motifImprobable(n) {
  if (sequence(n)) return true;
  if (n.length >= 9) {
    const abonne = n.slice(-8);
    if (sequence(abonne)) return true;
    if (/^(\d{2})\1{3}$/.test(abonne)) return true;
  }
  return false;
}

/**
 * Valide un numéro et le renvoie au format international.
 * mobileSeul : n'accepte que les mobiles français 06 et 07.
 */
export function validerTelephone(valeur, { mobileSeul = true, requis = true } = {}) {
  const brut = chiffres(valeur);
  if (!brut) {
    return requis
      ? { ok: false, erreur: 'Votre téléphone portable est requis.' }
      : { ok: true, valeur: '' };
  }

  // Format international
  if (brut[0] === '+') {
    const n = brut.slice(1);
    if (!/^\d{8,15}$/.test(n)) {
      return { ok: false, erreur: 'Ce numéro international ne semble pas valide.' };
    }
    if (motifImprobable(n)) {
      return { ok: false, erreur: "Ce numéro n'existe pas, vérifiez les chiffres." };
    }
    if (n.slice(0, 2) === '33') {
      const reste = n.slice(2);
      if (reste[0] === '0') {
        return { ok: false, erreur: "Après +33, le zéro ne se met pas : +33 6 45 78 21 09." };
      }
      if (reste.length !== 9) {
        return { ok: false, erreur: 'Un numéro français compte neuf chiffres après le +33.' };
      }
      if (mobileSeul && reste[0] !== '6' && reste[0] !== '7') {
        return { ok: false, erreur: 'Indiquez un mobile, il commence par 6 ou 7 après le +33.' };
      }
      return { ok: true, valeur: '+33' + reste };
    }
    for (const [ind, tailles] of Object.entries(LONGUEURS_NATIONALES)) {
      if (ind !== '33' && n.slice(0, ind.length) === ind) {
        const reste = n.slice(ind.length);
        if (tailles.indexOf(reste.length) === -1) {
          return { ok: false, erreur: 'Ce numéro ne semble pas complet.' };
        }
      }
    }
    return { ok: true, valeur: '+' + n };
  }

  // Format national français
  if (brut[0] !== '0') {
    return { ok: false, erreur: 'Commencez par 0 pour un numéro français, ou par + pour l\'étranger.' };
  }
  if (brut.length !== 10) {
    return {
      ok: false,
      erreur: brut.length < 10
        ? `Il manque ${10 - brut.length} chiffre${10 - brut.length > 1 ? 's' : ''}, un numéro français en compte dix.`
        : 'Un numéro français compte dix chiffres.',
    };
  }
  const national = brut.slice(1);
  if (motifImprobable(national)) {
    return { ok: false, erreur: "Ce numéro n'existe pas, vérifiez les chiffres." };
  }
  if (national[0] === '0' || national[0] === '8') {
    return { ok: false, erreur: 'Ce préfixe n\'est pas attribué aux particuliers.' };
  }
  if (mobileSeul && national[0] !== '6' && national[0] !== '7') {
    return { ok: false, erreur: 'Indiquez un mobile, il commence par 06 ou 07.' };
  }
  return { ok: true, valeur: '+33' + national };
}

// Affichage lisible : +33612345678 devient 06 12 34 56 78.
export function formaterTelephone(e164) {
  const v = String(e164 || '');
  if (v.slice(0, 3) === '+33' && v.length === 12) {
    return ('0' + v.slice(3)).replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  }
  return v;
}
