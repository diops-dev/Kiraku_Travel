#!/bin/bash
# Compile le site et publie le résultat sur la branche deploy, celle que
# Hostinger clone dans public_html.
#
#   ./scripts/deploy.sh
#
set -e
REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"

echo "→ Dépendances"
[ -d node_modules ] || npm install --no-audit --no-fund

echo "→ Compilation"
npm run build

echo "→ Publication sur la branche deploy"
TMP="$(mktemp -d)"
git worktree add "$TMP" deploy 2>/dev/null || git worktree add -b deploy "$TMP"
rsync -a --delete --exclude '.git' dist/ "$TMP/"
cd "$TMP"
git add -A
git commit -m "Déploiement du $(date '+%d/%m/%Y à %H:%M')" || echo "Rien de nouveau à déployer"
git push origin deploy
cd "$REPO"
git worktree remove "$TMP" --force

echo "→ Copie du build vers le Drive"
DRIVE="$HOME/Library/CloudStorage/GoogleDrive-contact@kirakutravel.com/Mi unidad/Kiraku - 08 Site Web & Outils/Code site (kiraku-site-2026)"
[ -d "$DRIVE" ] && rsync -a dist/ "$DRIVE/dist/" && echo "Drive à jour."

echo "Terminé. Dans hPanel, lancez « Deploy » sur le dépôt, ou laissez le webhook faire."
