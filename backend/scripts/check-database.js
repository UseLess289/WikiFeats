/**
 * Script de vérification de l'état de la base de données
 * Ce script vérifie si la base de données est vide ou contient déjà des données
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDatabase() {
  try {
    console.log('Connexion à la base de données...');
    
    // Vérifier la connexion à la base de données
    await prisma.$connect();
    console.log('Connexion à la base de données établie avec succès');
    
    // Vérifier si la table Artist existe et contient des données
    const artistCount = await prisma.artist.count();
    console.log(`Nombre d'artistes dans la base de données: ${artistCount}`);
    
    if (artistCount === 0) {
      console.log('DATABASE_EMPTY');
      return 'empty';
    } else {
      console.log('DATABASE_NOT_EMPTY');
      return 'not_empty';
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de la base de données:', error);
    console.log('DATABASE_ERROR');
    return 'error';
  } finally {
    await prisma.$disconnect();
  }
}

// Si le script est exécuté directement
if (require.main === module) {
  checkDatabase()
    .then(status => {
      process.exit(status === 'error' ? 1 : 0);
    })
    .catch(error => {
      console.error('Erreur non gérée:', error);
      process.exit(1);
    });
}

module.exports = checkDatabase; 