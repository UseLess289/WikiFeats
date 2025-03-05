const { PrismaClient } = require('@prisma/client');

// Initialisation du client Prisma avec des logs en mode développement
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Export du client Prisma pour l'utiliser dans d'autres fichiers
module.exports = prisma; 