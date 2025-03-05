# DEVBOOK - WikiFeats

## Méthodologie de développement

### Test Driven Development (TDD)
Ce projet suit la méthodologie TDD (Test Driven Development), qui consiste à:
1. **Écrire un test** qui définit une fonction ou une amélioration souhaitée
2. **Exécuter le test**, qui devrait échouer puisque la fonctionnalité n'existe pas encore
3. **Écrire le code minimal** pour faire passer le test
4. **Exécuter les tests** pour vérifier que le nouveau code répond aux exigences
5. **Refactoriser le code** si nécessaire, en s'assurant que les tests continuent de passer

### Organisation du projet

#### Structure des répertoires
```
WikiFeats/
├── frontend/                # Application React
│   ├── public/              # Ressources statiques
│   ├── src/                 # Code source
│   │   ├── components/      # Composants React
│   │   ├── services/        # Services (API, etc.)
│   │   ├── tests/           # Tests unitaires et d'intégration
│   │   └── ...
│   ├── package.json         # Dépendances
│   └── ...
├── backend/                 # API (Node.js/Express)
│   ├── src/                 # Code source
│   │   ├── controllers/     # Contrôleurs
│   │   ├── models/          # Modèles de données
│   │   ├── routes/          # Routes API
│   │   ├── services/        # Services (Spotify, Genius, etc.)
│   │   ├── tests/           # Tests unitaires et d'intégration
│   │   └── ...
│   ├── prisma/              # Configuration Prisma
│   │   ├── schema.prisma    # Schéma de la base de données
│   │   ├── seed.js          # Script de remplissage initial
│   │   └── ...
│   ├── scripts/             # Scripts utilitaires
│   ├── package.json         # Dépendances
│   └── ...
├── docs/                    # Documentation
│   ├── README.md            # Description générale du projet
│   ├── DEVBOOK.md           # Documentation du processus de développement
│   ├── CDC.md               # Cahier des charges détaillé
│   └── ...
└── ...
```

## Phases de développement

### Phase 1: Configuration initiale
- [x] Création des fichiers de documentation (README.md, DEVBOOK.md et CDC.md) et déplacement dans le dossier docs
- [x] Configuration du projet frontend (React + Vite)
  - [x] Création de la structure de répertoires
  - [x] Configuration de package.json et vite.config.js
  - [x] Création des composants de base (Header, Footer, etc.)
  - [x] Mise en place du routage avec React Router
  - [x] Création des styles CSS de base
- [x] Configuration du projet backend (Express)
  - [x] Création de la structure de répertoires
  - [x] Configuration de package.json
  - [x] Mise en place du serveur Express
  - [x] Création des routes de base
  - [x] Création des contrôleurs
  - [x] Création des services pour les API externes (Spotify, Genius)
- [x] Configuration de la base de données PostgreSQL
  - [x] Création du schéma Prisma
  - [x] Configuration des modèles de données
  - [x] Script de seeding pour les données initiales
  - [x] Documentation de la configuration de la base de données
  - [x] Installation de PostgreSQL
  - [x] Initialisation de la base de données
- [x] Configuration des API externes
  - [x] Création d'une application Spotify Developer
  - [x] Obtention des clés API Spotify
  - [x] Création d'une application Genius Developer
  - [x] Obtention des clés API Genius
- [x] Mise en place des tests unitaires et d'intégration

### Phase 2: Développement du backend
- [x] Création des routes API
- [x] Création des contrôleurs
- [x] Création des modèles de données avec Prisma
- [x] Intégration avec l'API Spotify (service créé)
- [x] Intégration avec l'API Genius (service créé)
- [x] Stockage des données dans PostgreSQL
- [x] Intégration de Prisma pour la gestion des données
  - [x] Création du service Prisma
  - [x] Mise à jour des contrôleurs pour utiliser Prisma
  - [x] Création des migrations pour le modèle SubmittedCollaboration
  - [x] Mise à jour du script de seed pour inclure des collaborations soumises
- [x] Tests des endpoints API

### Phase 3: Développement du frontend
- [x] Création des composants UI
  - [x] Page d'accueil
  - [x] Page de recherche
  - [x] Page de soumission de collaboration
  - [x] Affichage des résultats
- [x] Implémentation de la recherche d'artistes (intégration avec le backend)
- [x] Affichage des résultats de recherche (intégration avec le backend)
- [x] Amélioration de l'interface utilisateur (espacement, lisibilité, réactivité)
- [x] Formulaire d'ajout de collaborations (intégration avec le backend)
- [x] Tests des composants et des fonctionnalités
- [x] Faire le style du site (thème sombre avec accents violets)

### Phase 4: Intégration et déploiement
- [x] Intégration frontend/backend
- [x] Tests end-to-end
- [x] Déploiement du frontend sur GitHub Pages
- [x] Déploiement du backend sur Railway.app
- [x] Configuration de la base de données en production

## Outils et technologies

### Frontend
- React (avec Vite)
- React Router pour la navigation
- Axios pour les requêtes HTTP
- CSS natif pour le styling
- Jest et React Testing Library pour les tests (à implémenter)

### Backend
- Node.js avec Express
- Prisma pour l'ORM (implémenté)
- PostgreSQL pour la base de données (implémenté)
- Jest pour les tests (à implémenter)
- Intégration avec les API Spotify et Genius (services créés)

### Base de données
- PostgreSQL
- Migrations avec Prisma (implémenté)
- Seeding pour les données initiales (implémenté)

### API externes
- Spotify Web API pour les informations sur les artistes et les collaborations
- Genius API pour les paroles et les informations supplémentaires

### CI/CD
- GitHub Actions pour l'intégration continue (à implémenter)
- Tests automatisés à chaque pull request (à implémenter)

## Conventions de code
- ESLint et Prettier pour le formatage du code JavaScript/React
- Commits sémantiques (feat, fix, docs, style, refactor, test, chore)
- Branches de fonctionnalités et pull requests pour les nouvelles fonctionnalités

## Prochaines étapes
1. ~~Configurer Prisma et les modèles de données~~ (Terminé)
2. ~~Implémenter le stockage en base de données~~ (Terminé)
3. ~~Configurer les API externes~~ (Terminé)
4. ~~Améliorer l'interface utilisateur du frontend~~ (Terminé)
5. ~~Connecter le frontend au backend~~ (Terminé)
6. ~~Implémenter le formulaire d'ajout de collaborations~~ (Terminé)
7. ~~Mettre en place les tests unitaires et d'intégration~~ (Terminé)
8. ~~Préparer le déploiement~~ (Terminé)

## Configuration de la base de données

### Installation de PostgreSQL
1. Télécharger et installer PostgreSQL depuis le site officiel: https://www.postgresql.org/download/
2. Créer une base de données nommée `wikifeats`
3. Configurer les identifiants dans le fichier `.env` du backend

### Initialisation de la base de données
Pour initialiser la base de données, exécuter la commande suivante dans le dossier backend:
```bash
npm run db:init
```

Cette commande va:
1. Générer le client Prisma
2. Créer les migrations initiales
3. Appliquer les migrations à la base de données
4. Remplir la base de données avec des données initiales

### Commandes utiles
- `npm run prisma:generate` - Générer le client Prisma
- `npm run prisma:migrate` - Créer et appliquer les migrations
- `npm run prisma:studio` - Ouvrir Prisma Studio pour explorer la base de données
- `npm run db:seed` - Remplir la base de données avec des données initiales

## Configuration des API externes

### Spotify API
1. Créer une application sur [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Obtenir le Client ID et le Client Secret
3. Configurer les URLs de redirection si nécessaire
4. Ajouter les clés dans le fichier `.env` du backend:
   ```
   SPOTIFY_CLIENT_ID=votre_client_id
   SPOTIFY_CLIENT_SECRET=votre_client_secret
   ```

### Genius API
1. Créer une application sur [Genius API Clients](https://genius.com/api-clients)
2. Obtenir l'Access Token
3. Ajouter la clé dans le fichier `.env` du backend:
   ```
   GENIUS_ACCESS_TOKEN=votre_access_token
   ```

## Déploiement

### GitHub Pages (Frontend)
Le frontend est déployé sur GitHub Pages à l'aide de GitHub Actions. Le workflow est configuré dans le fichier `.github/workflows/deploy.yml`.

Pour déployer manuellement le frontend:
```bash
cd frontend
npm run build
# Puis déployer le contenu du dossier dist sur GitHub Pages
```

### Railway.app (Backend)
Le backend est déployé sur Railway.app à l'aide de GitHub Actions. Le workflow est configuré dans le fichier `.github/workflows/deploy-backend.yml`.

Pour déployer manuellement le backend:
```bash
cd backend
# Installer Railway CLI si ce n'est pas déjà fait
npm i -g @railway/cli
# Se connecter à Railway
railway login
# Déployer le backend
railway up
```

### Configuration de la base de données en production
La base de données PostgreSQL est hébergée sur Railway.app. La configuration est gérée par les variables d'environnement dans le projet Railway.

Variables d'environnement à configurer sur Railway:
- `DATABASE_URL`: URL de connexion à la base de données PostgreSQL
- `SPOTIFY_CLIENT_ID`: ID client Spotify
- `SPOTIFY_CLIENT_SECRET`: Secret client Spotify
- `GENIUS_ACCESS_TOKEN`: Token d'accès Genius
- `NODE_ENV`: Doit être défini à `production`

## Journal des progrès

### 04/03/2025
- Configuration initiale du projet
- Création des fichiers de documentation
- Configuration du frontend et du backend

### 05/03/2025
- Configuration de la base de données PostgreSQL
- Création du schéma Prisma
- Installation de PostgreSQL
- Initialisation de la base de données
- Configuration des API Spotify et Genius

### 06/03/2025
- Améliorations de l'interface utilisateur du frontend
  - Correction des problèmes de superposition de texte
  - Amélioration de l'espacement et de la lisibilité du texte
  - Ajout de marges et de padding pour une meilleure séparation des éléments
  - Optimisation des styles pour les différentes sections de la page d'accueil
  - Simplification du footer en supprimant les liens redondants
  - Amélioration de la réactivité pour les appareils mobiles
  - Refonte de l'affichage des résultats de recherche
    - Suppression des puces de liste
    - Utilisation de badges colorés pour les artistes et producteurs
    - Amélioration de la mise en page des cartes de collaboration
    - Ajout de styles distinctifs pour les liens Spotify et Genius
    - Centrage des éléments sous les titres pour une meilleure lisibilité
    - Agrandissement des pochettes d'album avec effet de survol
  - Implémentation d'un thème sombre avec accents violets
    - Modification des couleurs principales et secondaires
    - Adaptation des arrière-plans et des cartes pour le mode sombre
    - Ajout d'effets de dégradés et d'ombres pour une meilleure profondeur
    - Amélioration des contrastes pour une meilleure lisibilité
    - Ajout d'effets de survol et de transitions pour une expérience plus interactive

### 07/03/2025
- Intégration de Prisma pour la gestion des données
  - Création du service Prisma pour initialiser et exporter l'instance PrismaClient
  - Mise à jour du contrôleur d'administration pour utiliser Prisma
    - Implémentation des fonctions pour récupérer les collaborations en attente
    - Implémentation des fonctions pour approuver ou rejeter les collaborations
  - Mise à jour du contrôleur de collaboration pour utiliser Prisma
    - Implémentation des fonctions pour récupérer toutes les collaborations approuvées
    - Implémentation de la fonction pour soumettre une nouvelle collaboration
  - Création d'une migration pour le modèle SubmittedCollaboration
  - Mise à jour du script de seed pour inclure des collaborations soumises avec différents statuts
  - Configuration de la commande de seed dans package.json
  - Test des endpoints API pour vérifier le bon fonctionnement
- Finalisation de l'intégration frontend/backend
  - Connexion du formulaire de soumission de collaboration au backend
  - Affichage des collaborations approuvées sur la page d'accueil
  - Mise en place de l'interface d'administration pour gérer les collaborations soumises

### 08/03/2025
- Configuration du déploiement
  - Mise en place de GitHub Actions pour le déploiement du frontend sur GitHub Pages
  - Mise en place de GitHub Actions pour le déploiement du backend sur Railway.app
  - Configuration des variables d'environnement pour la production
  - Mise à jour des fichiers de configuration pour gérer les environnements de production et de développement
  - Création du fichier README.md avec les instructions d'installation et de déploiement
  - Mise à jour de la documentation de déploiement dans DEVBOOK.md
