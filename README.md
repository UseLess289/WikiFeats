# WikiFeats

WikiFeats est une application web qui permet de découvrir et de soumettre des collaborations musicales entre artistes. L'application utilise les API Spotify et Genius pour récupérer des informations sur les artistes et leurs collaborations.

## Fonctionnalités

- Recherche d'artistes et de leurs collaborations
- Affichage des détails des collaborations (titre, artistes, producteurs, etc.)
- Soumission de nouvelles collaborations
- Interface d'administration pour approuver ou rejeter les collaborations soumises

## Structure du projet

Le projet est divisé en deux parties principales :

- **Frontend** : Application React avec Vite
- **Backend** : API Node.js/Express avec Prisma et PostgreSQL

## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- PostgreSQL
- Clés API Spotify et Genius

### Installation du frontend

```bash
cd frontend
npm install
```

### Installation du backend

```bash
cd backend
npm install
```

### Configuration de la base de données

1. Créez une base de données PostgreSQL nommée `wikifeats`
2. Configurez les variables d'environnement dans un fichier `.env` dans le dossier backend :

```
DATABASE_URL="postgresql://username:password@localhost:5432/wikifeats?schema=public"
SPOTIFY_CLIENT_ID=votre_client_id
SPOTIFY_CLIENT_SECRET=votre_client_secret
GENIUS_ACCESS_TOKEN=votre_access_token
```

3. Initialisez la base de données :

```bash
cd backend
npm run db:init
```

## Démarrage

### Démarrer le backend

```bash
cd backend
npm run dev
```

### Démarrer le frontend

```bash
cd frontend
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Déploiement

### Frontend

Le frontend est déployé sur GitHub Pages via GitHub Actions. Chaque push sur la branche `main` déclenche un déploiement automatique.

### Backend

Le backend peut être déployé sur Railway.app ou tout autre service d'hébergement compatible avec Node.js et PostgreSQL.

## Documentation

Pour plus d'informations sur le développement du projet, consultez les documents suivants :

- [Cahier des charges](docs/CDC.md)
- [Documentation du processus de développement](docs/DEVBOOK.md)

## Licence

Ce projet est sous licence MIT. 