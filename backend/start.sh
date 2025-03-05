#!/bin/sh

# Fonction pour afficher les messages d'erreur
error_exit() {
  echo "ERREUR: $1"
  exit 1
}

# Afficher les variables d'environnement pour le débogage
echo "Démarrage de l'application..."
echo "Variables d'environnement :"
echo "DATABASE_URL: $DATABASE_URL"
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"

# Vérifier si la variable DATABASE_URL est définie
if [ -z "$DATABASE_URL" ]; then
  error_exit "La variable DATABASE_URL n'est pas définie!"
fi

# Vérifier si le répertoire prisma existe
if [ ! -d "./prisma" ]; then
  echo "AVERTISSEMENT: Le répertoire prisma n'existe pas dans le répertoire courant."
  echo "Répertoire courant: $(pwd)"
  echo "Contenu du répertoire:"
  ls -la
fi

# Générer le client Prisma
echo "Génération du client Prisma..."
npx prisma generate || error_exit "Impossible de générer le client Prisma!"

# Appliquer les migrations Prisma pour créer les tables
echo "Application des migrations Prisma..."
npx prisma migrate deploy || error_exit "Impossible d'appliquer les migrations à la base de données!"

echo "Migrations appliquées avec succès!"

# Vérifier si la base de données est vide
echo "Vérification des données existantes..."
if [ -f "./scripts/check-database.js" ]; then
  node ./scripts/check-database.js > /tmp/db_check_output
  
  # Vérifier le résultat du script
  if grep -q "DATABASE_EMPTY" /tmp/db_check_output; then
    echo "Base de données vide, exécution du script de seed..."
    npx prisma db seed || echo "AVERTISSEMENT: Erreur lors de l'exécution du script de seed, mais on continue..."
  elif grep -q "DATABASE_NOT_EMPTY" /tmp/db_check_output; then
    echo "La base de données contient déjà des données."
  else
    echo "AVERTISSEMENT: Impossible de vérifier l'état de la base de données. Tentative de démarrage de l'application..."
  fi
  
  # Nettoyer le fichier temporaire
  rm -f /tmp/db_check_output
else
  echo "AVERTISSEMENT: Le script check-database.js n'existe pas. Tentative de vérification directe..."
  
  # Tentative de vérification directe avec Prisma
  npx prisma db pull --print > /tmp/db_schema
  if grep -q "model" /tmp/db_schema; then
    echo "La base de données contient déjà des tables."
  else
    echo "Base de données vide ou inaccessible. Tentative d'exécution du script de seed..."
    npx prisma db seed || echo "AVERTISSEMENT: Erreur lors de l'exécution du script de seed, mais on continue..."
  fi
  
  # Nettoyer le fichier temporaire
  rm -f /tmp/db_schema
fi

# Démarrer l'application
echo "Démarrage de l'application..."
npm start 