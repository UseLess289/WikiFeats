# Cahier des Charges - WikiFeats

## 1. Présentation du projet

### 1.1 Contexte
WikIFeats est une application web destinée à éviter els conflits lors du Roland Gamos. Le principe du jeu est le suivant : un joueur nomme un rappeur, puis le joueur suivant doit nommer un artiste avec lequel ce rappeur a collaboré. L'application permettra de vérifier l'existence de collaborations entre artistes et d'afficher les détails de ces collaborations.

### 1.2 Objectifs
- Créer une interface utilisateur intuitive permettant de rechercher des collaborations entre artistes
- Fournir des informations détaillées sur les collaborations (titre, pochette, artistes, producteurs, etc.)
- Permettre aux utilisateurs de soumettre des collaborations manquantes
- Offrir une expérience utilisateur fluide et responsive sur tous les appareils

## 2. Spécifications fonctionnelles

### 2.1 Fonctionnalités principales

#### 2.1.1 Recherche de collaborations
- L'utilisateur peut saisir deux noms d'artistes dans des champs de recherche distincts
- Le système vérifie si une collaboration existe entre ces deux artistes
- Si une collaboration existe, le système affiche les détails de cette collaboration
- Si plusieurs collaborations existent, le système les affiche toutes
- Si aucune collaboration n'existe, le système affiche un message approprié

#### 2.1.2 Affichage des détails de collaboration
Pour chaque collaboration, le système affiche :
- Titre de la chanson/album
- Pochette de l'album
- Artistes principaux
- Artistes en featuring
- Producteurs
- Date de sortie
- Lien vers la chanson sur les plateformes de streaming (Spotify, Apple Music, etc.)
- Lien vers les paroles (via Genius)

#### 2.1.3 Soumission de collaborations manquantes
- L'utilisateur peut soumettre une collaboration qui n'est pas référencée dans le système
- Le formulaire de soumission comprend des champs pour tous les détails pertinents (les noms des deux artistes et un lien vers la musique sont nécéssaires, les autres champs sont facultatifs)
- Les soumissions sont validées par un administrateur avant d'être ajoutées à la base de données

### 2.2 Fonctionnalités secondaires

#### 2.2.1 Recherche d'artistes
- Autocomplétion lors de la saisie des noms d'artistes


#### 2.2.2 Profils d'artistes
- Affichage de la liste des collaborations d'un artiste
- Liens vers les profils sur les plateformes de streaming


## 3. Spécifications techniques

### 3.1 Architecture

#### 3.1.1 Frontend
- **Technologie** : React avec Vite
- **Hébergement** : GitHub Pages
- **Composants principaux** :
  - Barre de recherche
  - Affichage des résultats
  - Formulaire de soumission
  - Profils d'artistes

#### 3.1.2 Backend
- **Technologie** : Node.js avec Express ou Python avec FastAPI
- **Hébergement** : Railway.app
- **Endpoints API** :
  - `/api/collaborations?artist1=X&artist2=Y` : Recherche de collaborations
  - `/api/artists?name=X` : Recherche d'artistes
  - `/api/artists/:id` : Détails d'un artiste
  - `/api/collaborations` (POST) : Soumission d'une collaboration
  - `/api/auth/*` : Endpoints d'authentification (optionnels)

#### 3.1.3 Base de données
- **Technologie** : PostgreSQL
- **Hébergement** : Railway.app
- **Schéma** :
  - Table `artists` : Informations sur les artistes
  - Table `collaborations` : Détails des collaborations
  - Table `users` : Informations utilisateurs (optionnel)

### 3.2 Intégrations externes

#### 3.2.1 API Spotify
- Recherche d'artistes
- Récupération des détails des artistes
- Récupération des collaborations
- Récupération des pochettes d'albums et des liens de streaming

#### 3.2.2 API Genius
- Récupération des paroles
- Informations supplémentaires sur les collaborations
- Détails des crédits (producteurs, etc.)

### 3.3 Sécurité
- Protection contre les injections SQL
- Validation des entrées utilisateur
- Rate limiting pour les requêtes API
- HTTPS pour toutes les communications

### 3.4 Performance
- Mise en cache des résultats de recherche fréquents
- Optimisation des requêtes à la base de données
- Chargement différé des images et des contenus lourds

## 4. Contraintes et exigences

### 4.1 Contraintes techniques
- Le backend sera mis en pause manuellement pour ne pas dépasser les 500 heures gratuites sur Railway.app
- L'application doit être responsive et fonctionner sur mobile, tablette et desktop
- Les temps de réponse doivent être optimisés pour une expérience utilisateur fluide

### 4.2 Exigences légales
- Respect des conditions d'utilisation des API Spotify et Genius
- Mention des sources de données
- Respect du RGPD pour les données utilisateurs (si applicable)

## 5. Livrables

### 5.1 Livrables attendus
- Code source complet (frontend et backend)
- Documentation technique
- Guide d'utilisation
- Guide de déploiement

### 5.2 Jalons
- **J1** : Configuration initiale et mise en place de l'environnement de développement
- **J2** : Développement du backend et intégration des API externes
- **J3** : Développement du frontend et intégration avec le backend
- **J4** : Tests, corrections et optimisations
- **J5** : Déploiement

## 6. Évolutions futures

### 6.1 Fonctionnalités envisagées
- Mode jeu avec scoring et timer
- Visualisation des réseaux de collaborations sous forme de graphe
- Suggestions de collaborations basées sur les goûts de l'utilisateur
- Support pour d'autres genres musicaux 