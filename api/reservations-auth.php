<?php
// Authentification et utilitaires communs au back-office des réservations.
// Kiraku Travel. Ne pas appeler directement : inclus par les autres scripts.

declare(strict_types=1);
session_name('kiraku_resa');
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

// Comptes : chargés depuis un fichier NON versionné, créé à la main sur le
// serveur (hPanel → Gestionnaire de fichiers), exactement comme
// api/config.local.php pour le SMTP. Voir reservations-users.local.php.example.
function resa_utilisateurs(): array {
    $fichier = __DIR__ . '/reservations-users.local.php';
    if (!is_readable($fichier)) return [];
    $u = require $fichier;
    return is_array($u) ? $u : [];
}

function resa_connecte(): bool {
    return !empty($_SESSION['resa_user']);
}

function resa_exiger_connexion(): void {
    if (!resa_connecte()) {
        header('Location: /api/reservations-login.php');
        exit;
    }
}

function resa_csrf_token(): string {
    if (empty($_SESSION['resa_csrf'])) {
        $_SESSION['resa_csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['resa_csrf'];
}

function resa_csrf_verifier(string $jeton): bool {
    return !empty($_SESSION['resa_csrf']) && hash_equals($_SESSION['resa_csrf'], $jeton);
}

// Anti-brute-force minimal : compte les échecs par IP dans un fichier hors
// public_html, verrou 15 minutes après 8 échecs.
function resa_chemin_tentatives(): string {
    return __DIR__ . '/../../kiraku-reservations/tentatives.json';
}

function resa_ip(): string {
    return $_SERVER['REMOTE_ADDR'] ?? 'inconnu';
}

function resa_verrouille(): bool {
    $f = resa_chemin_tentatives();
    if (!is_readable($f)) return false;
    $data = json_decode((string)file_get_contents($f), true) ?: [];
    $ip = resa_ip();
    if (empty($data[$ip])) return false;
    [$n, $depuis] = $data[$ip];
    if ($n >= 8 && (time() - $depuis) < 900) return true;
    return false;
}

function resa_echec_connexion(): void {
    $f = resa_chemin_tentatives();
    $dossier = dirname($f);
    if (!is_dir($dossier)) @mkdir($dossier, 0700, true);
    $fp = fopen($f, 'c+');
    if (!$fp) return;
    flock($fp, LOCK_EX);
    $taille = filesize($f) ?: 0;
    $data = $taille ? (json_decode((string)fread($fp, $taille), true) ?: []) : [];
    $ip = resa_ip();
    if (empty($data[$ip]) || (time() - $data[$ip][1]) > 900) {
        $data[$ip] = [1, time()];
    } else {
        $data[$ip] = [$data[$ip][0] + 1, $data[$ip][1]];
    }
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data));
    flock($fp, LOCK_UN);
    fclose($fp);
}

function resa_reussite_connexion(): void {
    $f = resa_chemin_tentatives();
    if (!is_readable($f)) return;
    $data = json_decode((string)file_get_contents($f), true) ?: [];
    unset($data[resa_ip()]);
    file_put_contents($f, json_encode($data), LOCK_EX);
}
