#!/bin/bash
# Recopie les sources depuis le dossier de référence sur le Drive vers ce
# clone Git. À lancer avant de committer si vous avez modifié le site côté
# Drive.
set -e
DRIVE="$HOME/Library/CloudStorage/GoogleDrive-contact@kirakutravel.com/Mi unidad/Kiraku - 08 Site Web & Outils/Code site (kiraku-site-2026)"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
rsync -a --exclude node_modules --exclude dist --exclude .DS_Store --exclude '.vite*' --exclude '.git' "$DRIVE/" "$REPO/"
echo "Sources recopiées depuis le Drive."
