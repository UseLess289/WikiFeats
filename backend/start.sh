#!/bin/sh

# Afficher les variables d'environnement pour le débogage
echo "Démarrage de l'application..."
echo "Variables d'environnement :"
echo "DATABASE_URL: $DATABASE_URL"
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"

# Vérifier si la variable DATABASE_URL est définie
if [ -z "$DATABASE_URL" ]; then
  echo "ERREUR: La variable DATABASE_URL n'est pas définie!"
  exit 1
fi

# Tester la connexion à la base de données avec Prisma
echo "Test de la connexion à la base de données..."
npx prisma db pull --force

# Si la connexion est réussie, démarrer l'application
if [ $? -eq 0 ]; then
  echo "Connexion à la base de données réussie!"
  echo "Démarrage de l'application..."
  npm start
else
  echo "ERREUR: Impossible de se connecter à la base de données!"
  exit 1
fi 