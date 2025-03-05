const { PrismaClient } = require('@prisma/client');

// Initialisation du client Prisma
const prisma = new PrismaClient();

// Exporter l'instance pour l'utiliser dans d'autres fichiers
module.exports = prisma; 