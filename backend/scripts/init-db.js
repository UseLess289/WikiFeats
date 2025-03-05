/**
 * Script d'initialisation de la base de données
 * Ce script vérifie si PostgreSQL est accessible et initialise la base de données
 */

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Fonction pour exécuter une commande shell
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`Exécution de la commande: ${command}`);
    exec(command, { cwd: path.resolve(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur: ${error.message}`);
        return reject(error);
      }
      if (stderr) {
        console.warn(`Avertissement: ${stderr}`);
      }
      console.log(`Sortie: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Fonction principale
async function main() {
  try {
    console.log('Vérification de la configuration de la base de données...');
    
    // Vérifier si le fichier .env existe
    const envPath = path.resolve(__dirname, '../.env');
    if (!fs.existsSync(envPath)) {
      console.error('Fichier .env non trouvé. Veuillez créer un fichier .env basé sur .env.example');
      process.exit(1);
    }
    
    // Vérifier si DATABASE_URL est défini
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL non défini dans le fichier .env');
      process.exit(1);
    }
    
    console.log('Génération du client Prisma...');
    await executeCommand('npx prisma generate');
    
    console.log('Création des migrations Prisma...');
    await executeCommand('npx prisma migrate dev --name init');
    
    console.log('Remplissage de la base de données avec des données initiales...');
    await executeCommand('node prisma/seed.js');
    
    console.log('Initialisation de la base de données terminée avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

// Exécuter la fonction principale
main(); 