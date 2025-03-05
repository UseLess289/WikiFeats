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
CMD ["npm", "start"] 