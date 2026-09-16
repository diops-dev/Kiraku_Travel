<?php
declare(strict_types=1);
require __DIR__ . '/reservations-auth.php';
require __DIR__ . '/reservations-data.php';

header('Content-Type: application/json; charset=utf-8');
if (!resa_connecte()) { http_response_code(401); echo json_encode(['ok'=>false,'erreur'=>'Non connecté.']); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok'=>false,'erreur'=>'Méthode non autorisée.']); exit; }

$corps = json_decode(file_get_contents('php://input'), true);
if (!is_array($corps) || !resa_csrf_verifier((string)($corps['jeton'] ?? ''))) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'erreur' => 'Session expirée, rechargez la page.']);
    exit;
}

$connues = [];
foreach (resa_departs_connus() as $d) { $connues[$d['ref'] . '|' . $d['date']] = $d; }

$lignes = [];
foreach ((array)($corps['lignes'] ?? []) as $l) {
    $ref = (string)($l['ref'] ?? '');
    $date = (string)($l['date'] ?? '');
    $cle = $ref . '|' . $date;
    if (!isset($connues[$cle])) continue; // on ignore toute ligne inconnue
    $capacite = max(0, min(999, (int)($l['capacite'] ?? RESA_CAPACITE_DEFAUT)));
    $prises = max(0, min($capacite, (int)($l['prises'] ?? 0)));
    $lignes[] = [
        'ref' => $ref, 'date' => $date, 'jours' => $connues[$cle]['jours'],
        'capacite' => $capacite, 'prises' => $prises,
    ];
}

if (!resa_ecrire_etat($lignes)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'erreur' => "Échec de l'enregistrement, réessayez."]);
    exit;
}
echo json_encode(['ok' => true]);
