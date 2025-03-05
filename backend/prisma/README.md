# Configuration de la Base de Données PostgreSQL pour WikiFeats

Ce document explique comment configurer et utiliser la base de données PostgreSQL pour le projet WikiFeats.

## Prérequis

- PostgreSQL installé et en cours d'exécution
- Node.js et npm installés

## Configuration initiale

1. Assurez-vous que PostgreSQL est installé et en cours d'exécution sur votre machine.
2. Créez une base de données PostgreSQL nommée `wikifeats` :

```sql
CREATE DATABASE wikifeats;
```

3. Configurez les variables d'environnement dans le fichier `.env` à la racine du dossier backend :

```
DATABASE_URL="postgresql://username:password@localhost:5432/wikifeats"
```

Remplacez `username` et `password` par vos identifiants PostgreSQL.

## Commandes Prisma

Voici les commandes disponibles pour gérer la base de données :

### Générer le client Prisma

```bash
npm run prisma:generate
```

Cette commande génère le client Prisma basé sur votre schéma.

### Appliquer les migrations

```bash
npm run prisma:migrate
```

Cette commande crée et applique les migrations de base de données.

### Explorer la base de données

```bash
npm run prisma:studio
```

Cette commande lance Prisma Studio, une interface graphique pour explorer et modifier les données.

### Remplir la base de données avec des données initiales

```bash
npm run db:seed
```

Cette commande remplit la base de données avec des données initiales définies dans `seed.js`.

## Structure de la base de données

Le schéma de la base de données comprend les modèles suivants :

- **Artist** : Représente les artistes (rappeurs)
- **Collaboration** : Représente les collaborations entre artistes
- **User** : Représente les utilisateurs de l'application
- **Game** : Représente les parties de jeu

Pour plus de détails sur la structure, consultez le fichier `schema.prisma`.

## Dépannage

Si vous rencontrez des problèmes avec la base de données, essayez les solutions suivantes :

1. Vérifiez que PostgreSQL est en cours d'exécution
2. Vérifiez les identifiants dans le fichier `.env`
3. Réinitialisez la base de données :

```bash
npx prisma migrate reset
```

Cette commande supprime toutes les données et réapplique les migrations. 