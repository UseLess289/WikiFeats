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
    origin: function(origin, callback) {
      const allowedOrigins = process.env.CORS_ORIGIN 
        ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
        : [`http://localhost:${process.env.FRONTEND_PORT || 3000}`];
      
      // Autoriser les requêtes sans origine (comme les appels API directs)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        console.warn(`Origine non autorisée: ${origin}`);
        callback(new Error('Origine non autorisée par CORS'));
      }
    },
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