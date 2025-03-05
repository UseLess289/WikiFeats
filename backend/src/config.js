// Configuration pour le backend
const config = {
  // Port du serveur, utilise la variable d'environnement PORT ou 5000 par défaut
  port: process.env.PORT || 5000,
  
  // URL de base de l'API en production
  apiUrl: process.env.NODE_ENV === 'production' 
    ? process.env.API_URL || 'https://wikifeats-production.up.railway.app/api' 
    : `http://localhost:${process.env.PORT || 5000}/api`,
  
  // URL du frontend en production
  frontendUrl: process.env.NODE_ENV === 'production'
    ? process.env.FRONTEND_URL || 'https://useless289.github.io/WikiFeats'
    : `http://localhost:${process.env.FRONTEND_PORT || 3000}`,
  
  // Configuration CORS
  corsOptions: {
    origin: '*', // Autoriser toutes les origines temporairement pour déboguer
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  },
  
  // Clés API
  spotify: {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
  },
  
  genius: {
    accessToken: process.env.GENIUS_ACCESS_TOKEN
  }
};

module.exports = config; 