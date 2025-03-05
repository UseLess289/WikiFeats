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

# Appliquer les migrations Prisma pour créer les tables
echo "Application des migrations Prisma..."
npx prisma migrate deploy

# Si les migrations sont réussies, essayer de remplir la base de données
if [ $? -eq 0 ]; then
  echo "Migrations appliquées avec succès!"
  
  # Vérifier si la base de données est vide et la remplir si nécessaire
  echo "Vérification des données existantes..."
  ARTIST_COUNT=$(npx prisma studio --port 5555 --browser none & sleep 5 && curl -s http://localhost:5555/artist | grep -c "id")
  
  if [ "$ARTIST_COUNT" -eq "0" ]; then
    echo "Base de données vide, exécution du script de seed..."
    npx prisma db seed
  else
    echo "La base de données contient déjà des données."
  fi
  
  echo "Démarrage de l'application..."
  npm start
else
  echo "ERREUR: Impossible d'appliquer les migrations à la base de données!"
  exit 1
fi 