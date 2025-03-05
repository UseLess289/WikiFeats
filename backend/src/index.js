require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config');

// Routes
const artistRoutes = require('./routes/artists');
const collaborationRoutes = require('./routes/collaborations');
const adminRoutes = require('./routes/admin');

// Configuration
const PORT = process.env.PORT || 5000;
const RATE_LIMIT_WINDOW_MS = process.env.RATE_LIMIT_WINDOW_MS || 900000; // 15 minutes
const RATE_LIMIT_MAX = process.env.RATE_LIMIT_MAX || 100;

// Initialisation de l'application
const app = express();

// Debug des variables d'environnement
console.log('Variables d\'environnement:');
console.log(`CORS_ORIGIN: ${process.env.CORS_ORIGIN}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// Middleware
app.use(helmet()); // Sécurité
app.use(cors(config.corsOptions));
app.use(express.json()); // Parsing du JSON

// Route de santé pour vérifier que le backend est disponible
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Le backend est opérationnel' });
});

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(RATE_LIMIT_WINDOW_MS),
  max: parseInt(RATE_LIMIT_MAX),
  message: 'Trop de requêtes, veuillez réessayer plus tard.'
});
app.use('/api/', limiter);

// Routes
app.use('/api/artists', artistRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/admin', adminRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API WikiFeats',
    version: '0.1.0',
    endpoints: [
      '/api/artists',
      '/api/collaborations',
      '/api/admin'
    ]
  });
});

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route non trouvée'
  });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Erreur serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV || 'development'}`);
  
  // Afficher les origines CORS autorisées
  const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
    : [`http://localhost:${process.env.FRONTEND_PORT || 3000}`];
  console.log(`CORS autorisé pour: ${JSON.stringify(allowedOrigins)}`);
});

module.exports = app; // Pour les tests 