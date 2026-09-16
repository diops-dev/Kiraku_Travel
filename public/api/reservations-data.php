<?php
declare(strict_types=1);

// Emplacement du fichier d'état, hors de public_html, comme le journal des
// demandes. Voir DEPLOIEMENT.md.
function resa_chemin_etat(): string {
    return __DIR__ . '/../../kiraku-reservations/departs-etat.json';
}

// Départs connus du site (src/booking.jsx, objet DEPARTS). À tenir à jour
// manuellement si le calendrier change : voir kiraku-dates-departs-2027,
// grille V5. Sert de gabarit la première fois que le fichier est créé, et à
// ajouter automatiquement un nouveau départ s'il apparaît sur le site sans
// avoir encore de ligne ici.
function resa_departs_connus(): array {
    return [
        ['ref' => 'CL-01', 'date' => '2027-03-13', 'jours' => 14],
        ['ref' => 'CL-01', 'date' => '2027-04-03', 'jours' => 14],
        ['ref' => 'CL-01', 'date' => '2027-05-08', 'jours' => 14],
        ['ref' => 'CL-01', 'date' => '2027-07-10', 'jours' => 14],
        ['ref' => 'CL-01', 'date' => '2027-09-11', 'jours' => 14],
        ['ref' => 'CL-01', 'date' => '2027-12-11', 'jours' => 14],
        ['ref' => 'CL-02', 'date' => '2027-04-17', 'jours' => 14],
        ['ref' => 'CL-02', 'date' => '2027-05-29', 'jours' => 14],
        ['ref' => 'CL-02', 'date' => '2027-06-19', 'jours' => 14],
        ['ref' => 'CL-02', 'date' => '2027-08-21', 'jours' => 14],
        ['ref' => 'CL-03', 'date' => '2027-10-23', 'jours' => 14],
        ['ref' => 'CL-06', 'date' => '2027-11-13', 'jours' => 21],
        ['ref' => 'CL-09', 'date' => '2026-09-27', 'jours' => 12],
        ['ref' => 'TR-01', 'date' => '2027-09-26', 'jours' => 12],
    ];
}

const RESA_CAPACITE_DEFAUT = 8;

// Lit l'état actuel, en complétant avec tout départ connu qui n'aurait pas
// encore de ligne (capacité par défaut 8, 0 place prise).
function resa_lire_etat(): array {
    $f = resa_chemin_etat();
    $lignes = [];
    if (is_readable($f)) {
        $brut = json_decode((string)file_get_contents($f), true);
        if (is_array($brut) && isset($brut['lignes']) && is_array($brut['lignes'])) {
            foreach ($brut['lignes'] as $l) {
                if (isset($l['ref'], $l['date'])) {
                    $lignes[$l['ref'] . '|' . $l['date']] = $l;
                }
            }
        }
    }
    foreach (resa_departs_connus() as $d) {
        $cle = $d['ref'] . '|' . $d['date'];
        if (!isset($lignes[$cle])) {
            $lignes[$cle] = [
                'ref' => $d['ref'], 'date' => $d['date'], 'jours' => $d['jours'],
                'capacite' => RESA_CAPACITE_DEFAUT, 'prises' => 0,
            ];
        } else {
            // Le nombre de jours suit toujours le site, jamais modifiable ici.
            $lignes[$cle]['jours'] = $d['jours'];
        }
    }
    uasort($lignes, fn($a, $b) => [$a['ref'], $a['date']] <=> [$b['ref'], $b['date']]);
    return array_values($lignes);
}

// Écrit l'état avec verrou, pour éviter qu'une sauvegarde simultanée de
// Frédéric et d'Olivier n'en écrase une autre partiellement.
function resa_ecrire_etat(array $lignes): bool {
    $f = resa_chemin_etat();
    $dossier = dirname($f);
    if (!is_dir($dossier)) @mkdir($dossier, 0700, true);
    $fp = fopen($f, 'c+');
    if (!$fp) return false;
    if (!flock($fp, LOCK_EX)) { fclose($fp); return false; }
    ftruncate($fp, 0);
    rewind($fp);
    $ok = fwrite($fp, json_encode([
        'maj_le' => gmdate('c'),
        'lignes' => $lignes,
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false;
    flock($fp, LOCK_UN);
    fclose($fp);
    return $ok;
}
