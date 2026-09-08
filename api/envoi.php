<?php
/**
 * Réception des formulaires du site Kiraku Travel.
 * Deux formulaires arrivent ici : "contact" et "cse".
 * Réponse JSON : { ok: true } ou { ok: false, erreur: "..." }
 */

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$cfg = require __DIR__ . '/config.php';
require __DIR__ . '/validation.php';

function repondre(int $code, array $corps): void {
    http_response_code($code);
    echo json_encode($corps, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    repondre(405, ['ok' => false, 'erreur' => 'Méthode non autorisée.']);
}

$brut = file_get_contents('php://input');
if ($brut === false || strlen($brut) > 60000) {
    repondre(400, ['ok' => false, 'erreur' => 'Requête invalide.']);
}
$d = json_decode($brut, true);
if (!is_array($d)) {
    repondre(400, ['ok' => false, 'erreur' => 'Requête invalide.']);
}

// Pot de miel : un robot remplit le champ caché, on fait semblant d'accepter.
if (!empty($d['hp'])) {
    repondre(200, ['ok' => true]);
}

$type = ($d['type'] ?? '') === 'cse' ? 'cse' : 'contact';

function texte($v, int $max = 2000): string {
    if (is_array($v)) { $v = implode(', ', array_map('strval', $v)); }
    $v = trim((string)$v);
    $v = str_replace(["\r", "\0"], '', $v);
    if (function_exists('mb_substr')) { $v = mb_substr($v, 0, $max, 'UTF-8'); }
    else { $v = substr($v, 0, $max); }
    return $v;
}
// Une valeur destinée à un en-tête de mail ne doit contenir aucun saut de ligne.
function entete(string $v): string {
    return trim(str_replace(["\r", "\n", "\t"], ' ', $v));
}

$prenom = texte($d['prenom'] ?? '', 100);
$nom    = texte($d['nom'] ?? '', 100);

if ($prenom === '' && $nom === '') {
    repondre(422, ['ok' => false, 'erreur' => 'Le nom est requis.']);
}

// L'email et les téléphones sont revalidés ici : le contrôle du navigateur
// est un confort pour le visiteur, celui-ci est la vraie barrière.
$vEmail = kiraku_valider_email(texte($d['email'] ?? '', 254));
if (!$vEmail['ok']) {
    repondre(422, ['ok' => false, 'champ' => 'email', 'erreur' => $vEmail['erreur']]);
}
$email = $vEmail['valeur'];
$d['email'] = $email;

// 'tel' sur le formulaire de contact, 'mobile' sur le formulaire CSE.
foreach (['tel', 'mobile'] as $champMobile) {
    if (!isset($d[$champMobile])) { continue; }
    $v = kiraku_valider_telephone(texte($d[$champMobile], 40), true, true);
    if (!$v['ok']) {
        repondre(422, ['ok' => false, 'champ' => $champMobile, 'erreur' => $v['erreur']]);
    }
    $d[$champMobile] = kiraku_formater_telephone($v['valeur']);
}
// Le fixe est facultatif, et n'a pas à être un mobile.
if (isset($d['fixe']) && trim((string)$d['fixe']) !== '') {
    $v = kiraku_valider_telephone(texte($d['fixe'], 40), false, false);
    if (!$v['ok']) {
        repondre(422, ['ok' => false, 'champ' => 'fixe', 'erreur' => $v['erreur']]);
    }
    $d['fixe'] = kiraku_formater_telephone($v['valeur']);
}

/* ---------- Anti-abus, par adresse IP ---------- */
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$compteur = sys_get_temp_dir() . '/kiraku-' . md5($ip) . '.cnt';
$fenetre = 3600;
$hits = [];
if (is_readable($compteur)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string)file_get_contents($compteur))),
        static fn($t) => $t > time() - $fenetre
    );
}
if (count($hits) >= (int)$cfg['max_par_heure']) {
    repondre(429, ['ok' => false, 'erreur' => 'Trop de demandes envoyées depuis cet appareil. Réessayez dans une heure ou écrivez-nous directement.']);
}
$hits[] = time();
@file_put_contents($compteur, implode(',', $hits), LOCK_EX);

/* ---------- Mise en forme du message ---------- */
$etiquettes = [
    'raison'   => 'Raison sociale',
    'siret'    => 'SIRET',
    'taille'   => 'Collaborateurs sur site',
    'adresse'  => 'Adresse',
    'cp'       => 'Code postal',
    'ville'    => 'Ville',
    'prenom'   => 'Prénom',
    'nom'      => 'Nom',
    'email'    => 'Email',
    'poste'    => 'Poste',
    'fixe'     => 'Téléphone fixe',
    'mobile'   => 'Téléphone portable',
    'tel'      => 'Téléphone portable',
    'adultes'  => 'Adultes',
    'enfants'  => 'Enfants',
    'chambres' => 'Chambres',
    'mois'     => 'Mois souhaité',
    'duree'    => 'Durée envisagée',
    'pays'     => 'Destinations',
    'saisons'  => 'Saisons voulues',
    'news'     => 'Accepte le carnet trimestriel',
    'message'  => 'Message',
    'page'     => 'Page d\'origine',
];

$lignes = [];
foreach ($etiquettes as $cle => $lb) {
    if (!array_key_exists($cle, $d)) { continue; }
    $v = $d[$cle];
    if (is_bool($v)) { $v = $v ? 'oui' : 'non'; }
    $v = texte($v, 4000);
    if ($v === '') { continue; }
    $lignes[$lb] = $v;
}

$titre = $type === 'cse'
    ? 'Demande CSE, ' . ($lignes['Raison sociale'] ?? ($prenom . ' ' . $nom))
    : 'Demande de contact, ' . trim($prenom . ' ' . $nom);

$horodatage = (new DateTimeImmutable('now', new DateTimeZone('Europe/Paris')))->format('d/m/Y à H:i');

$corpsTexte = ($type === 'cse'
        ? "Nouvelle demande de mise en relation CSE, reçue le $horodatage."
        : "Nouvelle demande de contact, reçue le $horodatage.")
    . "\n\n";
foreach ($lignes as $lb => $v) {
    $large = function_exists('mb_strlen') ? mb_strlen($lb, 'UTF-8') : strlen($lb);
    $cale  = str_repeat(' ', max(1, 26 - $large));
    $corpsTexte .= $lb . $cale . ': ' . str_replace("\n", "\n" . str_repeat(' ', 28), $v) . "\n";
}
$corpsTexte .= "\n" . str_repeat('-', 52) . "\n"
    . "Répondre à ce message écrit directement au visiteur.\n"
    . "Envoyé depuis kirakutravel.com\n";

$rangs = '';
foreach ($lignes as $lb => $v) {
    $rangs .= '<tr><th align="left" valign="top" style="padding:7px 18px 7px 0;font-weight:600;color:#1A1A1A;white-space:nowrap">'
        . htmlspecialchars($lb, ENT_QUOTES, 'UTF-8')
        . '</th><td valign="top" style="padding:7px 0;color:#3a3a3a">'
        . nl2br(htmlspecialchars($v, ENT_QUOTES, 'UTF-8'))
        . '</td></tr>';
}
$corpsHtml = '<!doctype html><html lang="fr"><meta charset="utf-8"><body style="margin:0;background:#FDFCF8;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif">'
    . '<div style="max-width:640px;margin:0 auto;padding:28px 24px">'
    . '<div style="border-left:3px solid #E25822;padding-left:14px;margin-bottom:22px">'
    . '<div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#8a8a8a">'
    . ($type === 'cse' ? 'Mise en relation CSE' : 'Demande de contact')
    . '</div><div style="font-size:20px;font-weight:600;color:#1A1A1A;margin-top:4px">'
    . htmlspecialchars($titre, ENT_QUOTES, 'UTF-8')
    . '</div><div style="font-size:13px;color:#8a8a8a;margin-top:3px">Reçue le ' . $horodatage . '</div></div>'
    . '<table cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.55;width:100%">' . $rangs . '</table>'
    . '<p style="margin-top:24px;font-size:12px;color:#8a8a8a;border-top:1px solid #e6e2d8;padding-top:14px">'
    . 'Répondre à ce message écrit directement au visiteur. Envoyé depuis kirakutravel.com</p>'
    . '</div></body></html>';

/* ---------- Journal de secours, écrit avant l'envoi ---------- */
$chemin = (string)$cfg['journal'];
$dossier = dirname($chemin);
if (!is_dir($dossier)) { @mkdir($dossier, 0750, true); }
if (!is_writable($dossier)) { $chemin = sys_get_temp_dir() . '/kiraku-demandes.jsonl'; }
@file_put_contents($chemin, json_encode([
    'date'   => date('c'),
    'type'   => $type,
    'ip'     => $ip,
    'champs' => $lignes,
], JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

/* ---------- Envoi ---------- */
require __DIR__ . '/smtp.php';

$deNom  = entete((string)$cfg['expediteur_nom']);
$de     = entete((string)$cfg['expediteur']);
$repNom = entete(trim($prenom . ' ' . $nom));
$sujet  = entete($titre);

$envoye = kiraku_envoyer($cfg, [
    'a'          => (string)$cfg['destinataire'],
    'sujet'      => $sujet,
    'texte'      => $corpsTexte,
    'html'       => $corpsHtml,
    'de'         => $de,
    'de_nom'     => $deNom,
    'repondre_a' => $email,
    'repondre_nom' => $repNom,
]);

if (!$envoye) {
    repondre(500, ['ok' => false, 'erreur' => "L'envoi a échoué. Écrivez-nous à contact@kirakutravel.com ou appelez le +33 6 70 09 49 64."]);
}

/* ---------- Accusé de réception au visiteur ---------- */
if (!empty($cfg['accuse_reception'])) {
    $bonjour = $prenom !== '' ? 'Bonjour ' . $prenom . ',' : 'Bonjour,';
    $arTexte = "$bonjour\n\n"
        . "Nous avons bien reçu votre demande, merci.\n\n"
        . "Nous revenons vers vous sous deux jours ouvrés avec une proposition d'horaire pour un appel. "
        . "Si votre projet est plus pressé, appelez-nous au +33 6 70 09 49 64, du lundi au samedi, de 10 h à 18 h.\n\n"
        . "À très vite,\n\nKiraku Travel\n47 rue Vivienne, 75002 Paris\ncontact@kirakutravel.com · kirakutravel.com\n"
        . "Immatriculée Atout France IM075260052\n";
    $arHtml = '<!doctype html><html lang="fr"><meta charset="utf-8"><body style="margin:0;background:#FDFCF8;font-family:Georgia,serif">'
        . '<div style="max-width:560px;margin:0 auto;padding:36px 24px;color:#1A1A1A;font-size:16px;line-height:1.7">'
        . '<div style="width:44px;height:44px;border-radius:6px;background:#E25822;margin-bottom:26px"></div>'
        . '<p style="margin:0 0 16px">' . htmlspecialchars($bonjour, ENT_QUOTES, 'UTF-8') . '</p>'
        . '<p style="margin:0 0 16px">Nous avons bien reçu votre demande, merci.</p>'
        . '<p style="margin:0 0 16px">Nous revenons vers vous sous deux jours ouvrés avec une proposition d\'horaire pour un appel. Si votre projet est plus pressé, appelez-nous au <a href="tel:+33670094964" style="color:#E25822">+33 6 70 09 49 64</a>, du lundi au samedi, de 10 h à 18 h.</p>'
        . '<p style="margin:0 0 28px">À très vite,</p>'
        . '<div style="border-top:1px solid #e6e2d8;padding-top:16px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:13px;color:#6a6a6a;line-height:1.6">'
        . '<b style="color:#1A1A1A">Kiraku Travel</b><br>47 rue Vivienne, 75002 Paris<br>'
        . '<a href="mailto:contact@kirakutravel.com" style="color:#6a6a6a">contact@kirakutravel.com</a> · '
        . '<a href="https://kirakutravel.com" style="color:#6a6a6a">kirakutravel.com</a><br>'
        . 'Immatriculée Atout France IM075260052</div></div></body></html>';

    @kiraku_envoyer($cfg, [
        'a'            => $email,
        'sujet'        => 'Votre demande est bien arrivée, Kiraku Travel',
        'texte'        => $arTexte,
        'html'         => $arHtml,
        'de'           => $de,
        'de_nom'       => 'Kiraku Travel',
        'repondre_a'   => entete((string)$cfg['destinataire']),
        'repondre_nom' => 'Kiraku Travel',
    ]);
}

repondre(200, ['ok' => true]);
