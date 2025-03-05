FROM node:18-alpine

# Installer les dépendances nécessaires pour Prisma
RUN apk add --no-cache openssl openssl-dev libc6-compat

# Créer un utilisateur non-root pour exécuter l'application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Afficher le répertoire de travail pour le débogage
RUN pwd
RUN ls -la

WORKDIR /app

# Afficher le contenu après avoir changé de répertoire
RUN pwd
RUN ls -la

# Copier les fichiers de dependances
COPY package*.json ./

# Installer les dependances
RUN npm install

# Créer le script de démarrage
RUN echo '#!/bin/sh\n\n# Afficher les variables d'\''environnement pour le débogage\necho "Démarrage de l'\''application..."\necho "Variables d'\''environnement :"\necho "DATABASE_URL: $DATABASE_URL"\necho "PORT: $PORT"\necho "NODE_ENV: $NODE_ENV"\n\n# Vérifier si la variable DATABASE_URL est définie\nif [ -z "$DATABASE_URL" ]; then\n  echo "ERREUR: La variable DATABASE_URL n'\''est pas définie!"\n  exit 1\nfi\n\n# Tester la connexion à la base de données avec Prisma\necho "Test de la connexion à la base de données..."\nnpx prisma db pull --force\n\n# Si la connexion est réussie, démarrer l'\''application\nif [ $? -eq 0 ]; then\n  echo "Connexion à la base de données réussie!"\n  echo "Démarrage de l'\''application..."\n  npm start\nelse\n  echo "ERREUR: Impossible de se connecter à la base de données!"\n  exit 1\nfi' > /app/start.sh
RUN chmod +x /app/start.sh

# Copier le reste des fichiers
COPY . .

# Définir les permissions correctes
RUN chmod -R 777 /app
RUN chown -R appuser:appgroup /app

# Afficher le contenu après la copie
RUN ls -la

# Passer à l'utilisateur non-root
USER appuser

# Generer le client Prisma avec les permissions correctes
RUN npx prisma generate

# Exposer le port
EXPOSE 5000

# Commande de demarrage
CMD ["/app/start.sh"] 