# WikiFeats

## Description
WikiFeats est une application web qui permet aux utilisateurs de découvrir les collaborations entre artistes musicaux, principalement des rappeurs. L'application est conçue pour avoir une VAR lors du jeu du Roland Gamos.

## Fonctionnalités
- Recherche de collaborations entre deux artistes
- Affichage des détails de collaboration (pochette, titre, artistes, producteurs, etc.)
- Possibilité de soumettre des collaborations manquantes
- Interface utilisateur intuitive et responsive

## Architecture technique
### Frontend
- Hébergement: GitHub Pages
- Technologies: React (avec Vite), HTML, CSS, JavaScript
- Fonctionnalités:
  - Barre de recherche avec deux champs (artiste 1 et artiste 2)
  - Affichage des résultats de recherche
  - Formulaire d'ajout de collaborations manquantes

### Backend
- Hébergement: Railway.app
- Technologies: Node.js (Express) ou Python (FastAPI)
- Fonctionnalités:
  - API REST pour servir les données au frontend
  - Intégration avec les API Spotify et Genius
  - Stockage des données dans PostgreSQL

### Base de données
- PostgreSQL hébergé sur Railway.app
- Stockage des collaborations récupérées via API et soumises par les utilisateurs

## Développement
Ce projet suit la méthodologie TDD (Test Driven Development). Consultez le fichier DEVBOOK.md pour plus d'informations sur le processus de développement et le fichier CDC.md pour le cahier des charges détaillé.

## Installation et déploiement
Instructions à venir...

## Contribution
Instructions à venir...

## Licence
À définir 