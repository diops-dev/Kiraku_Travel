<?php
declare(strict_types=1);
// Endpoint public, lu par le site pour afficher les places restantes.
// Aucune donnée sensible : uniquement ref, date, capacité, places restantes.
require __DIR__ . '/reservations-data.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$out = [];
foreach (resa_lire_etat() as $l) {
    $out[$l['ref'] . '|' . $l['date']] = [
        'capacite'  => (int)$l['capacite'],
        'restantes' => max(0, (int)$l['capacite'] - (int)$l['prises']),
    ];
}
echo json_encode($out, JSON_UNESCAPED_UNICODE);
