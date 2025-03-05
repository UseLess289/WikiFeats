/**
 * Configuration de l'application frontend
 */

// Configuration pour le frontend
const config = {
  // URL de base de l'API
  apiUrl: import.meta.env.PROD 
    ? import.meta.env.VITE_API_URL || 'https://wikifeats-production.up.railway.app/api'
    : '/api', // En développement, on utilise le proxy configuré dans vite.config.js
  
  // Nom du projet pour les chemins relatifs en production
  basePath: import.meta.env.PROD ? '/WikiFeats/' : '/',
  
  // Version de l'application
  version: '0.1.0',
  
  // Autres configurations spécifiques au frontend
  defaultPageSize: 10,
  maxSearchResults: 20
};

export default config; 