<?php
declare(strict_types=1);
require __DIR__ . '/reservations-auth.php';
require __DIR__ . '/reservations-data.php';
resa_exiger_connexion();

$lignes = resa_lire_etat();
$jeton = resa_csrf_token();

$noms = [
  'CL-01' => 'Du Néon au Silence', 'CL-02' => 'Mille Marches vers le Nord',
  'CL-03' => 'Des Temples aux Coraux', 'CL-06' => 'La Traversée sans Hâte',
  'CL-09' => 'Alpes japonaises', 'TR-01' => 'La Ligne de Crête',
];
function resa_date_fr(string $iso): string {
    $mois = ['janv.','févr.','mars','avril','mai','juin','juil.','août','sept.','oct.','nov.','déc.'];
    [$y,$m,$d] = array_map('intval', explode('-', $iso));
    return $d . ' ' . $mois[$m-1] . ' ' . $y;
}
?><!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Réservations · Kiraku Travel</title>
<meta name="robots" content="noindex, nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#FDFCF8;color:#1A1A1A;margin:0;padding:24px}
  .wrap{max-width:920px;margin:0 auto}
  header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:8px}
  h1{font-size:20px;margin:0}
  .qui{font-size:13px;color:#6b6558}
  .qui a{color:#E25822;text-decoration:none}
  table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e5e1d8;border-radius:10px;overflow:hidden}
  th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #eee6da;font-size:14px}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#6b6558;background:#f7f4ec}
  tr:last-child td{border-bottom:0}
  input[type=number]{width:64px;padding:6px 8px;border:1px solid #d8d3c7;border-radius:6px;font-size:14px}
  .restantes{font-weight:600}
  .restantes.bas{color:#E25822}
  .restantes.complet{color:#9c2c20}
  .bar{margin-top:20px;display:flex;align-items:center;gap:14px}
  button.save{padding:10px 22px;border:0;border-radius:8px;background:#E25822;color:#fff;font-size:14px;font-weight:600;cursor:pointer}
  button.save:disabled{opacity:.5;cursor:default}
  .msg{font-size:14px}
  .msg.ok{color:#2a6e3f}
  .msg.err{color:#9c2c20}
  .note{font-size:12px;color:#8a8374;margin-top:6px}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>Places restantes par départ</h1>
    <div class="qui">Connecté·e : <?= htmlspecialchars($_SESSION['resa_user']) ?> · <a href="/api/reservations-logout.php">Se déconnecter</a></div>
  </header>

  <table>
    <thead><tr><th>Circuit</th><th>Départ</th><th>Jours</th><th>Capacité</th><th>Places prises</th><th>Places restantes</th></tr></thead>
    <tbody id="corps">
      <?php foreach ($lignes as $i => $l):
        $restantes = $l['capacite'] - $l['prises'];
        $cls = $restantes <= 0 ? 'complet' : ($restantes <= 2 ? 'bas' : '');
      ?>
      <tr data-ref="<?= htmlspecialchars($l['ref']) ?>" data-date="<?= htmlspecialchars($l['date']) ?>">
        <td><?= htmlspecialchars($noms[$l['ref']] ?? $l['ref']) ?><br><small style="color:#8a8374"><?= htmlspecialchars($l['ref']) ?></small></td>
        <td><?= resa_date_fr($l['date']) ?></td>
        <td><?= (int)$l['jours'] ?></td>
        <td><input type="number" class="in-capacite" min="0" max="999" value="<?= (int)$l['capacite'] ?>"></td>
        <td><input type="number" class="in-prises" min="0" max="999" value="<?= (int)$l['prises'] ?>"></td>
        <td class="out-restantes restantes <?= $cls ?>"><?= $restantes <= 0 ? 'Complet' : $restantes ?></td>
      </tr>
      <?php endforeach; ?>
    </tbody>
  </table>

  <div class="bar">
    <button class="save" id="btnSave">Enregistrer</button>
    <span class="msg" id="msg"></span>
  </div>
  <p class="note">Les modifications sont visibles sur le site en quelques secondes. Les dates et durées viennent du site et ne se modifient pas ici.</p>
</div>
<script>
const jeton = <?= json_encode($jeton) ?>;
const corps = document.getElementById('corps');
const btn = document.getElementById('btnSave');
const msg = document.getElementById('msg');

function recalcLigne(tr) {
  const cap = parseInt(tr.querySelector('.in-capacite').value || '0', 10);
  const pr = parseInt(tr.querySelector('.in-prises').value || '0', 10);
  const out = tr.querySelector('.out-restantes');
  const rest = cap - pr;
  out.textContent = rest <= 0 ? 'Complet' : rest;
  out.className = 'out-restantes restantes' + (rest <= 0 ? ' complet' : (rest <= 2 ? ' bas' : ''));
}
corps.addEventListener('input', (e) => {
  if (e.target.matches('.in-capacite, .in-prises')) recalcLigne(e.target.closest('tr'));
});

btn.addEventListener('click', async () => {
  btn.disabled = true;
  msg.textContent = 'Enregistrement…';
  msg.className = 'msg';
  const lignes = [...corps.querySelectorAll('tr')].map(tr => ({
    ref: tr.dataset.ref,
    date: tr.dataset.date,
    capacite: parseInt(tr.querySelector('.in-capacite').value || '0', 10),
    prises: parseInt(tr.querySelector('.in-prises').value || '0', 10),
  }));
  try {
    const r = await fetch('/api/reservations-save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jeton, lignes }),
    });
    const d = await r.json();
    if (d.ok) { msg.textContent = 'Enregistré.'; msg.className = 'msg ok'; }
    else { msg.textContent = d.erreur || "Échec de l'enregistrement."; msg.className = 'msg err'; }
  } catch {
    msg.textContent = 'Connexion impossible.';
    msg.className = 'msg err';
  }
  btn.disabled = false;
});
</script>
</body>
</html>
