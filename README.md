# MVC Express

## Description

Ce dépôt est une structure simple en MVC avec Express, créée à partir de zéro.

## Étapes

1. Clonez le dépôt depuis Github.
2. Exécutez `npm install`.
3. Créez un fichier `.env` à partir du fichier `.env.sample` et ajoutez vos paramètres de base de données. Ne supprimez pas le fichier `.env.sample`, il doit être conservé.

   ```ini
   APP_PORT=5050
   FRONTEND_URL=http://localhost:5173
   DB_HOST=your_db_host
   DB_PORT=your_db_port
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name

   # JWT options
   # Create a secret JWT decryption key.
   # ex : JggP476!pKIJgF3
   JWT_SECRET =
   # Expiration timing 1h, 50s, 10m, u choose
   JWT_TIMING = 10m
   ```

4. Adaptez au besoin `database.sql` avec vos propres tables. Importez le script dans votre serveur SQL. Vous pouvez le faire manuellement ou exécuter le script _migrate_ :

   ```sh
   npm run migrate
   ```

5. Démarrez le serveur en mode développement avec :

   ```sh
   npm run dev
   ```

   Cela exécutera `index.js` en utilisant _nodemon_.

6. Accédez à `http://localhost:5050` avec votre navigateur préféré.
7. À partir de ce kit de démarrage, créez votre propre application web.

### Utilisateurs Windows

Si vous développez sur Windows, vous devez modifier la configuration de git pour changer les règles de fin de ligne avec cette commande :

```sh
git config --global core.autocrlf true
```

## Exemple

Une liste basique d'articles et de catégorie est fourni (vous pouvez charger le fichier `database.sql` dans une base de données de test). Les URLs accessibles sont :

- **Page d'accueil** : [`GET localhost:5050/`](http://localhost:5050/)
- **Parcourir les articles** : [`GET localhost:5050/articles`](http://localhost:5050/articles)
- **Lire un article** : [`GET localhost:5050/articles/:id`](http://localhost:5050/articles/2)
- **Modifier un article** :
  ```http
  PUT localhost:5050/articles/:id
  ```
- **Ajouter un article** :
  ```http
  POST localhost:5050/articles
  ```
- **Supprimer un article** :
  ```http
  DELETE localhost:5050/articles/:id
  ```

Vous trouverez toutes ces routes déclarées dans le fichier `src/router.js`. Vous pouvez ajouter vos propres routes, contrôleurs et modèles.
