<?php
/**
 * Envoi d'un mail multipart (texte + HTML).
 * Utilise mail() par défaut, ou un SMTP authentifié si config.php l'active.
 */

declare(strict_types=1);

function kiraku_mime_entete(string $v): string {
    return preg_match('/[\x80-\xFF]/', $v)
        ? '=?UTF-8?B?' . base64_encode($v) . '?='
        : $v;
}

function kiraku_corps_mime(array $m, string $frontiere): string {
    return "--$frontiere\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($m['texte'])) . "\r\n"
        . "--$frontiere\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($m['html'])) . "\r\n"
        . "--$frontiere--\r\n";
}

function kiraku_envoyer(array $cfg, array $m): bool {
    $frontiere = 'kiraku-' . bin2hex(random_bytes(12));
    $deAffiche = kiraku_mime_entete($m['de_nom']) . ' <' . $m['de'] . '>';
    $repAffiche = ($m['repondre_nom'] ?? '') !== ''
        ? kiraku_mime_entete($m['repondre_nom']) . ' <' . $m['repondre_a'] . '>'
        : $m['repondre_a'];

    $entetes = [
        'From'         => $deAffiche,
        'Reply-To'     => $repAffiche,
        'MIME-Version' => '1.0',
        'Content-Type' => "multipart/alternative; boundary=\"$frontiere\"",
        'X-Mailer'     => 'Kiraku Travel',
    ];
    $corps = kiraku_corps_mime($m, $frontiere);

    if (!empty($cfg['smtp']['actif'])) {
        return kiraku_envoyer_smtp($cfg['smtp'], $m, $entetes, $corps);
    }

    $lignes = [];
    foreach ($entetes as $k => $v) { $lignes[] = "$k: $v"; }
    return @mail(
        $m['a'],
        kiraku_mime_entete($m['sujet']),
        $corps,
        implode("\r\n", $lignes),
        '-f' . $m['de']
    );
}

/* --------- Client SMTP minimal, utilisé seulement si smtp.actif = true --------- */

function kiraku_lire($fp): string {
    $out = '';
    while (($ligne = fgets($fp, 515)) !== false) {
        $out .= $ligne;
        if (strlen($ligne) < 4 || $ligne[3] === ' ') { break; }
    }
    return $out;
}

function kiraku_dire($fp, string $cmd, string $attendu): bool {
    if ($cmd !== '') { fwrite($fp, $cmd . "\r\n"); }
    $r = kiraku_lire($fp);
    return str_starts_with(trim($r), $attendu);
}

function kiraku_envoyer_smtp(array $s, array $m, array $entetes, string $corps): bool {
    $prefixe = ($s['chiffr'] ?? '') === 'ssl' ? 'ssl://' : '';
    $fp = @stream_socket_client(
        $prefixe . $s['hote'] . ':' . $s['port'],
        $errno, $errstr, 20,
        STREAM_CLIENT_CONNECT,
        stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]])
    );
    if (!$fp) { return false; }
    stream_set_timeout($fp, 20);

    $ok = kiraku_dire($fp, '', '220')
        && kiraku_dire($fp, 'EHLO kirakutravel.com', '250');

    if ($ok && ($s['chiffr'] ?? '') === 'tls') {
        $ok = kiraku_dire($fp, 'STARTTLS', '220')
            && @stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
            && kiraku_dire($fp, 'EHLO kirakutravel.com', '250');
    }

    $ok = $ok
        && kiraku_dire($fp, 'AUTH LOGIN', '334')
        && kiraku_dire($fp, base64_encode((string)$s['user']), '334')
        && kiraku_dire($fp, base64_encode((string)$s['passe']), '235')
        && kiraku_dire($fp, 'MAIL FROM:<' . $m['de'] . '>', '250');

    if ($ok) {
        foreach (array_map('trim', explode(',', $m['a'])) as $dest) {
            if ($dest === '') { continue; }
            if (!kiraku_dire($fp, 'RCPT TO:<' . $dest . '>', '250')) { $ok = false; break; }
        }
    }

    if ($ok && kiraku_dire($fp, 'DATA', '354')) {
        $lignes = ['To: ' . $m['a'], 'Subject: ' . kiraku_mime_entete($m['sujet'])];
        foreach ($entetes as $k => $v) { $lignes[] = "$k: $v"; }
        $donnees = implode("\r\n", $lignes) . "\r\n\r\n"
            . preg_replace('/^\./m', '..', $corps);
        fwrite($fp, $donnees . "\r\n.\r\n");
        $ok = str_starts_with(trim(kiraku_lire($fp)), '250');
    } else {
        $ok = false;
    }

    @fwrite($fp, "QUIT\r\n");
    @fclose($fp);
    return $ok;
}
