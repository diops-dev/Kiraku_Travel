<?php
declare(strict_types=1);
require __DIR__ . '/reservations-auth.php';
$_SESSION = [];
session_destroy();
header('Location: /api/reservations-login.php');
