# Le bureau de Younes Atemani

Portfolio interactif en français, développé avec React et Vite. La photo du bureau, les styles et les dépendances de production sont servis par le même site statique.

## Publier sur Cloudflare Pages

1. Dans [Workers & Pages](https://dash.cloudflare.com/), ouvrir **Create application → Pages → Import an existing Git repository**.
2. Connecter GitHub et accorder à Cloudflare Pages l’accès à `Atemani/portfolio-younes`. Le dépôt peut rester privé.
3. Choisir la branche de production `main`, la commande `npm run build` et le dossier de sortie `dist`. Laisser le répertoire racine vide. Le fichier `.node-version` indique la version de Node.
4. Lancer **Save and Deploy**. Ouvrir l’adresse `pages.dev` fournie à la fin du déploiement. Chaque mise à jour de `main` déclenche une nouvelle publication.

[Guide officiel React sur Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)

## Modifier depuis le navigateur

Ouvrir le dépôt dans GitHub et appuyer sur la touche `.` pour utiliser l’éditeur web. Les titres, lectures, textes des compétences et positions des objets se trouvent dans `src/content.js`. Les coordonnées sont des pourcentages de la photo entière. Le décor se trouve dans `public/images/bureau.jpg`.

Sur téléphone, le bureau défile horizontalement. L’index donne accès à tous les objets. Les fenêtres acceptent Échap, le bouton de fermeture et des liens directs tels que `/#competences`. Les deux secrets sont comptés pendant la visite.
