<?php
declare(strict_types=1);
require __DIR__ . '/reservations-auth.php';

$erreur = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (resa_verrouille()) {
        $erreur = 'Trop de tentatives. Réessayez dans quelques minutes.';
    } else {
        $id = trim((string)($_POST['id'] ?? ''));
        $mdp = (string)($_POST['mdp'] ?? '');
        $comptes = resa_utilisateurs();
        if (isset($comptes[$id]) && password_verify($mdp, $comptes[$id])) {
            session_regenerate_id(true);
            $_SESSION['resa_user'] = $id;
            resa_reussite_connexion();
            header('Location: /api/reservations-admin.php');
            exit;
        }
        resa_echec_connexion();
        $erreur = 'Identifiant ou mot de passe incorrect.';
    }
}
if (resa_connecte()) {
    header('Location: /api/reservations-admin.php');
    exit;
}
?><!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Connexion · Réservations Kiraku</title>
<meta name="robots" content="noindex, nofollow">
<style>
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#FDFCF8;color:#1A1A1A;display:flex;min-height:100vh;align-items:center;justify-content:center;margin:0}
  form{background:#fff;border:1px solid #e5e1d8;border-radius:14px;padding:40px;width:100%;max-width:360px}
  h1{font-size:19px;margin:0 0 24px}
  label{display:block;font-size:13px;color:#6b6558;margin:16px 0 6px}
  input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #d8d3c7;border-radius:8px;font-size:15px}
  button{margin-top:24px;width:100%;padding:12px;border:0;border-radius:8px;background:#E25822;color:#fff;font-size:15px;font-weight:600;cursor:pointer}
  .err{background:#fdeceb;color:#9c2c20;padding:10px 12px;border-radius:8px;font-size:14px;margin-bottom:16px}
</style>
</head>
<body>
<form method="post" autocomplete="off">
  <h1>Kiraku Travel · Réservations</h1>
  <?php if ($erreur): ?><div class="err"><?= htmlspecialchars($erreur) ?></div><?php endif; ?>
  <label for="id">Identifiant</label>
  <input id="id" name="id" autofocus required>
  <label for="mdp">Mot de passe</label>
  <input id="mdp" name="mdp" type="password" required>
  <button type="submit">Se connecter</button>
</form>
</body>
</html>
