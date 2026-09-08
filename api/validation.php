<?php
/**
 * Validation des emails et des téléphones, côté serveur.
 * Jumeau de src/validation.js, avec en plus le contrôle DNS du domaine :
 * le navigateur ne peut pas le faire, et c'est lui qui attrape les faux
 * domaines qui passent la vérification de forme.
 */

declare(strict_types=1);

const KIRAKU_DOMAINES_JETABLES = [
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

/**
 * @return array{ok: bool, valeur?: string, erreur?: string}
 */
function kiraku_valider_email(string $valeur): array {
    $email = trim($valeur);
    if ($email === '') {
        return ['ok' => false, 'erreur' => "L'adresse email est requise."];
    }
    if (strlen($email) > 254 || str_contains($email, '..')) {
        return ['ok' => false, 'erreur' => "Cette adresse email n'est pas valide."];
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['ok' => false, 'erreur' => "Cet email ne semble pas valide, vérifiez la partie après le @."];
    }

    $domaine = strtolower(substr($email, strrpos($email, '@') + 1));
    if (in_array($domaine, KIRAKU_DOMAINES_JETABLES, true)) {
        return ['ok' => false, 'erreur' => "Les adresses temporaires ne sont pas acceptées, indiquez une adresse que vous consultez."];
    }

    // Le domaine doit pouvoir recevoir du courrier. Un MX, ou à défaut un A,
    // les petits domaines servant leur mail depuis la même machine.
    if (function_exists('checkdnsrr')) {
        $recevable = @checkdnsrr($domaine, 'MX')
            || @checkdnsrr($domaine, 'A')
            || @checkdnsrr($domaine, 'AAAA');
        if (!$recevable) {
            return ['ok' => false, 'erreur' => "Le domaine « $domaine » ne reçoit pas de courrier. Vérifiez l'orthographe de votre adresse."];
        }
    }

    return ['ok' => true, 'valeur' => $email];
}

/** Un seul chiffre répété, ou une suite croissante ou décroissante. */
function kiraku_sequence(string $n): bool {
    if (strlen($n) < 6) { return false; }
    if (preg_match('/^(\d)\1+$/', $n)) { return true; }
    $monte = true; $descend = true;
    for ($i = 1, $l = strlen($n); $i < $l; $i++) {
        if ((int)$n[$i] !== ((int)$n[$i - 1] + 1) % 10) { $monte = false; }
        if ((int)$n[$i] !== ((int)$n[$i - 1] + 9) % 10) { $descend = false; }
    }
    return $monte || $descend;
}

/**
 * Numéro qui ne peut pas exister. On regarde le numéro entier, mais aussi
 * la partie abonné : 06 00 00 00 00 et 06 12 34 56 78 sont les faux numéros
 * les plus courants, et leurs deux premiers chiffres masquent le motif.
 */
function kiraku_motif_improbable(string $n): bool {
    if (kiraku_sequence($n)) { return true; }
    if (strlen($n) >= 9) {
        $abonne = substr($n, -8);
        if (kiraku_sequence($abonne)) { return true; }
        // Une paire répétée quatre fois : 06 12 12 12 12
        if (preg_match('/^(\d{2})\1{3}$/', $abonne)) { return true; }
    }
    return false;
}

/**
 * @return array{ok: bool, valeur?: string, erreur?: string}
 */
function kiraku_valider_telephone(string $valeur, bool $mobileSeul = true, bool $requis = true): array {
    $brut = preg_replace('/[^\d+]/', '', $valeur) ?? '';
    if ($brut === '') {
        return $requis
            ? ['ok' => false, 'erreur' => 'Le téléphone portable est requis.']
            : ['ok' => true, 'valeur' => ''];
    }

    if ($brut[0] === '+') {
        $n = substr($brut, 1);
        if (!preg_match('/^\d{8,15}$/', $n)) {
            return ['ok' => false, 'erreur' => 'Ce numéro international ne semble pas valide.'];
        }
        if (kiraku_motif_improbable($n)) {
            return ['ok' => false, 'erreur' => "Ce numéro n'existe pas, vérifiez les chiffres."];
        }
        if (str_starts_with($n, '33')) {
            $reste = substr($n, 2);
            if (($reste[0] ?? '') === '0') {
                return ['ok' => false, 'erreur' => "Après +33, le zéro ne se met pas."];
            }
            if (strlen($reste) !== 9) {
                return ['ok' => false, 'erreur' => 'Un numéro français compte neuf chiffres après le +33.'];
            }
            if ($mobileSeul && $reste[0] !== '6' && $reste[0] !== '7') {
                return ['ok' => false, 'erreur' => 'Indiquez un mobile, il commence par 6 ou 7 après le +33.'];
            }
            return ['ok' => true, 'valeur' => '+33' . $reste];
        }
        return ['ok' => true, 'valeur' => '+' . $n];
    }

    if ($brut[0] !== '0') {
        return ['ok' => false, 'erreur' => "Commencez par 0 pour un numéro français, ou par + pour l'étranger."];
    }
    if (strlen($brut) !== 10) {
        return ['ok' => false, 'erreur' => 'Un numéro français compte dix chiffres.'];
    }
    $national = substr($brut, 1);
    if (kiraku_motif_improbable($national)) {
        return ['ok' => false, 'erreur' => "Ce numéro n'existe pas, vérifiez les chiffres."];
    }
    if ($national[0] === '0' || $national[0] === '8') {
        return ['ok' => false, 'erreur' => "Ce préfixe n'est pas attribué aux particuliers."];
    }
    if ($mobileSeul && $national[0] !== '6' && $national[0] !== '7') {
        return ['ok' => false, 'erreur' => 'Indiquez un mobile, il commence par 06 ou 07.'];
    }
    return ['ok' => true, 'valeur' => '+33' . $national];
}

/** +33612345678 devient 06 12 34 56 78, plus lisible dans le mail. */
function kiraku_formater_telephone(string $e164): string {
    if (str_starts_with($e164, '+33') && strlen($e164) === 12) {
        return trim(chunk_split('0' . substr($e164, 3), 2, ' '));
    }
    return $e164;
}
