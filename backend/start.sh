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

# Générer le client Prisma
echo "Génération du client Prisma..."
npx prisma generate

# Appliquer les migrations Prisma pour créer les tables
echo "Application des migrations Prisma..."
npx prisma migrate deploy

# Si les migrations sont réussies, essayer de remplir la base de données
if [ $? -eq 0 ]; then
  echo "Migrations appliquées avec succès!"
  
  # Vérifier si la base de données est vide en utilisant le script dédié
  echo "Vérification des données existantes..."
  node scripts/check-database.js > /tmp/db_check_output
  
  # Vérifier le résultat du script
  if grep -q "DATABASE_EMPTY" /tmp/db_check_output; then
    echo "Base de données vide, exécution du script de seed..."
    npx prisma db seed
  elif grep -q "DATABASE_NOT_EMPTY" /tmp/db_check_output; then
    echo "La base de données contient déjà des données."
  else
    echo "AVERTISSEMENT: Impossible de vérifier l'état de la base de données. Tentative de démarrage de l'application..."
  fi
  
  # Nettoyer le fichier temporaire
  rm -f /tmp/db_check_output
  
  echo "Démarrage de l'application..."
  npm start
else
  echo "ERREUR: Impossible d'appliquer les migrations à la base de données!"
  exit 1
fi 