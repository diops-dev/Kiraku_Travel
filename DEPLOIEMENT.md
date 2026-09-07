# Mettre le site en ligne sur Hostinger

Le dépôt a deux branches, chacune avec un rôle précis.

| Branche  | Contenu                                   | À quoi elle sert                    |
|----------|-------------------------------------------|-------------------------------------|
| `main`   | le code source du site                    | travailler, versionner              |
| `deploy` | le site déjà compilé, `.htaccess` compris | ce que Hostinger met dans `public_html` |

Hostinger en hébergement mutualisé ne sait pas compiler un projet Node. Il
clone une branche telle quelle. D'où la branche `deploy`, qui ne contient que
le résultat du build, prêt à servir.

## Une fois, à la première mise en ligne

1. Pousser le dépôt (voir plus bas).
2. Dans hPanel : **Sites web → votre domaine → Avancé → Git**.
3. Renseigner :
   - Dépôt : `https://github.com/diops-dev/Kiraku_Travel`
   - Branche : `deploy`
   - Répertoire : laisser vide, c'est `public_html`
4. Cliquer sur **Créer**, puis sur **Déployer**.
5. Copier l'URL de webhook proposée par Hostinger et la coller dans GitHub :
   **Settings → Webhooks → Add webhook**, content type `application/json`,
   événement « Just the push event ». Chaque publication sur `deploy` mettra
   alors le site en ligne toute seule.

Si le dépôt est privé, hPanel affiche une clé SSH à ajouter dans GitHub sous
**Settings → Deploy keys**.

## À chaque mise à jour du site

```bash
cd ~/Documents/Claude/Projects/Kiraku\ Travel/Kiraku_Travel-github
./scripts/sync-depuis-drive.sh   # si vous avez modifié les sources sur le Drive
git add -A && git commit -m "Ce qui a changé"
git push origin main
./scripts/deploy.sh              # compile, publie sur deploy, met le Drive à jour
```

`deploy.sh` fait tout : dépendances, build, mise à jour de la branche
`deploy`, envoi sur GitHub et recopie de `dist/` sur le Drive.

## Vérifier après mise en ligne

- `https://japonautrement.fr/` doit répondre en HTTPS, `www` redirigé
- `https://japonautrement.fr/itineraires` doit s'ouvrir directement, sans
  passer par l'accueil : c'est la preuve que le `.htaccess` est actif
- `https://japonautrement.fr/sitemap.xml` doit lister les vingt URL

Si une URL interne renvoie une erreur 404, c'est que le `.htaccess` n'a pas
été copié ou que `mod_rewrite` est inactif. Le fichier est à la racine de la
branche `deploy`.
