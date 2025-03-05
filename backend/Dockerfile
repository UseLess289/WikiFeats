FROM node:18-alpine

# Installer les dépendances nécessaires pour Prisma et les outils de débogage
RUN apk add --no-cache openssl openssl-dev libc6-compat curl postgresql-client

# Créer un utilisateur non-root pour exécuter l'application
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Définir le répertoire de travail
WORKDIR /app

# Afficher le contenu du répertoire courant pour le débogage
RUN pwd
RUN ls -la

# Copier les fichiers du backend
COPY . .

# Afficher le contenu après la copie pour le débogage
RUN ls -la

# Installer les dépendances
RUN npm install

# Rendre le script de démarrage exécutable
RUN chmod +x /app/start.sh

# Définir les permissions correctes
RUN chmod -R 777 /app
RUN chown -R appuser:appgroup /app

# Passer à l'utilisateur non-root
USER appuser

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port
EXPOSE 5000

# Commande de démarrage
CMD ["/app/start.sh"] 