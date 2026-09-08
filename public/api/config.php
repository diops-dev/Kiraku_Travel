<?php
// Configuration des envois de formulaires, Kiraku Travel.
// Ce fichier est le seul à modifier si une adresse ou un mode d'envoi change.

$config = [
  // Boîte qui reçoit les demandes. Plusieurs adresses possibles, séparées par une virgule.
  'destinataire'      => 'contact@kirakutravel.com',

  // Expéditeur technique. DOIT être une adresse du domaine, sinon les mails partent en spam.
  'expediteur'        => 'site@kirakutravel.com',
  'expediteur_nom'    => 'Site Kiraku Travel',

  // Accusé de réception envoyé au visiteur. false pour le désactiver.
  'accuse_reception'  => true,

  // Envoi par SMTP authentifié. Laisser 'actif' à false pour utiliser mail() de Hostinger.
  // Passer à true et remplir les identifiants si les mails n'arrivent pas.
  'smtp' => [
    'actif'  => false,
    'hote'   => 'smtp.hostinger.com',
    'port'   => 465,
    'chiffr' => 'ssl',           // 'ssl' pour le port 465, 'tls' pour le port 587
    'user'   => 'site@kirakutravel.com',
    'passe'  => '',
  ],

  // Journal de secours : toute demande y est écrite avant l'envoi, rien ne se perd.
  // Placé hors de public_html pour ne pas être accessible depuis le web.
  'journal'           => __DIR__ . '/../../kiraku-demandes/demandes.jsonl',

  // Anti-abus : nombre maximum d'envois par adresse IP et par heure.
  'max_par_heure'     => 5,
];

// Réglages confidentiels : créez config.local.php À CÔTÉ de ce fichier,
// directement sur le serveur, pour y mettre le mot de passe SMTP.
// Ce fichier n'est pas versionné, rien de secret ne part dans Git.
// Exemple de contenu :
//   <?php return ['smtp' => ['actif' => true, 'passe' => 'le-mot-de-passe']];
$local = __DIR__ . '/config.local.php';
if (is_readable($local)) {
    $sur = require $local;
    if (is_array($sur)) {
        if (isset($sur['smtp']) && is_array($sur['smtp'])) {
            $config['smtp'] = array_merge($config['smtp'], $sur['smtp']);
            unset($sur['smtp']);
        }
        $config = array_merge($config, $sur);
    }
}

return $config;
