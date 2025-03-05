/**
 * Contrôleur pour les collaborations
 * Gère les requêtes liées aux collaborations entre artistes
 */

// Services
const spotifyService = require('../services/spotifyService');
const geniusService = require('../services/geniusService');
const prisma = require('../services/prismaService');

// Importer les données temporaires du contrôleur d'administration (à conserver pour la compatibilité)
const adminController = require('./adminController');

/**
 * Récupère toutes les collaborations
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.getAllCollaborations = async (req, res) => {
  try {
    // Récupérer les collaborations approuvées depuis la base de données
    const approvedSubmissions = await prisma.submittedCollaboration.findMany({
      where: {
        status: 'APPROVED'
      },
      orderBy: {
        approvedAt: 'desc'
      }
    });
    
    // Transformer les données pour correspondre au format attendu par le frontend
    const formattedCollaborations = approvedSubmissions.map(collab => ({
      id: collab.id,
      artist1: collab.artist1Name,
      artist2: collab.artist2Name,
      title: collab.title || '',
      album: collab.album || '',
      releaseDate: collab.releaseDate ? collab.releaseDate.toISOString() : null,
      producers: collab.producers || [],
      musicLink: collab.musicLink,
      additionalInfo: collab.additionalInfo || '',
      approvedAt: collab.approvedAt.toISOString()
    }));
    
    return res.json({
      collaborations: formattedCollaborations
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des collaborations:', error);
    return res.status(500).json({
      error: 'Erreur lors de la récupération des collaborations',
      message: error.message
    });
  }
};

/**
 * Recherche des collaborations entre deux artistes
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.searchCollaborations = async (req, res) => {
  try {
    const { artist1, artist2 } = req.query;
    
    if (!artist1 || !artist2) {
      return res.status(400).json({
        error: 'Les paramètres "artist1" et "artist2" sont requis'
      });
    }
    
    // Recherche d'abord dans la base de données locale (collaborations approuvées)
    const localCollaborations = await prisma.submittedCollaboration.findMany({
      where: {
        status: 'APPROVED',
        OR: [
          {
            AND: [
              { artist1Name: { contains: artist1, mode: 'insensitive' } },
              { artist2Name: { contains: artist2, mode: 'insensitive' } }
            ]
          },
          {
            AND: [
              { artist1Name: { contains: artist2, mode: 'insensitive' } },
              { artist2Name: { contains: artist1, mode: 'insensitive' } }
            ]
          }
        ]
      }
    });
    
    // Si des collaborations sont trouvées localement, les retourner
    if (localCollaborations.length > 0) {
      const formattedCollaborations = localCollaborations.map(collab => ({
        id: collab.id,
        title: collab.title || 'Titre inconnu',
        album: collab.album || 'Album inconnu',
        releaseDate: collab.releaseDate ? collab.releaseDate.toISOString() : null,
        artists: [collab.artist1Name, collab.artist2Name],
        producers: collab.producers || [],
        spotifyUrl: collab.musicLink,
        coverUrl: 'https://via.placeholder.com/300', // Image par défaut
        geniusUrl: null
      }));
      
      return res.json({
        found: true,
        collaborations: formattedCollaborations
      });
    }
    
    // Si pas de résultats locaux, recherche via Spotify et Genius
    const spotifyArtist1 = await spotifyService.searchArtists(artist1);
    const spotifyArtist2 = await spotifyService.searchArtists(artist2);
    
    if (!spotifyArtist1.length || !spotifyArtist2.length) {
      return res.json({
        found: false,
        message: 'Un ou plusieurs artistes n\'ont pas été trouvés'
      });
    }
    
    // Utilise le premier résultat pour chaque artiste
    const artist1Id = spotifyArtist1[0].id;
    const artist2Id = spotifyArtist2[0].id;
    
    // Recherche les collaborations via Spotify
    const spotifyCollaborations = await spotifyService.findCollaborations(artist1Id, artist2Id);
    
    // Enrichit les données avec Genius si disponible
    const enrichedCollaborations = [];
    for (const collab of spotifyCollaborations) {
      try {
        const geniusData = await geniusService.getSongInfo(
          `${collab.title} ${collab.artists.join(' ')}`
        );
        
        if (geniusData) {
          collab.geniusUrl = geniusData.url;
          collab.producers = geniusData.producers || [];
          // Autres données de Genius si disponibles
        }
        
        enrichedCollaborations.push(collab);
      } catch (error) {
        console.error('Erreur lors de la récupération des données Genius:', error);
        enrichedCollaborations.push(collab);
      }
    }
    
    return res.json({
      found: enrichedCollaborations.length > 0,
      collaborations: enrichedCollaborations
    });
    
  } catch (error) {
    console.error('Erreur lors de la recherche de collaborations:', error);
    return res.status(500).json({
      error: 'Erreur lors de la recherche de collaborations',
      message: error.message
    });
  }
};

/**
 * Soumission d'une nouvelle collaboration
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.submitCollaboration = async (req, res) => {
  try {
    const {
      artist1,
      artist2,
      title,
      album,
      releaseDate,
      producers,
      musicLink,
      additionalInfo
    } = req.body;
    
    // Validation de base
    if (!artist1 || !artist2 || !musicLink) {
      return res.status(400).json({
        error: 'Les noms des deux artistes et un lien vers la musique sont requis'
      });
    }
    
    // Créer la collaboration dans la base de données
    const newCollaboration = await prisma.submittedCollaboration.create({
      data: {
        artist1Name: artist1,
        artist2Name: artist2,
        title,
        album,
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        producers: producers ? producers.split(',').map(p => p.trim()) : [],
        musicLink,
        additionalInfo,
        status: 'PENDING'
      }
    });
    
    // Transformer les données pour correspondre au format attendu par le frontend
    const formattedCollaboration = {
      id: newCollaboration.id,
      artist1: newCollaboration.artist1Name,
      artist2: newCollaboration.artist2Name,
      title: newCollaboration.title || '',
      album: newCollaboration.album || '',
      releaseDate: newCollaboration.releaseDate ? newCollaboration.releaseDate.toISOString() : null,
      producers: newCollaboration.producers || [],
      musicLink: newCollaboration.musicLink,
      additionalInfo: newCollaboration.additionalInfo || '',
      status: newCollaboration.status,
      createdAt: newCollaboration.submittedAt.toISOString()
    };
    
    return res.status(201).json({
      success: true,
      message: 'Collaboration soumise avec succès',
      collaboration: formattedCollaboration
    });
    
  } catch (error) {
    console.error('Erreur lors de la soumission d\'une collaboration:', error);
    return res.status(500).json({
      error: 'Erreur lors de la soumission d\'une collaboration',
      message: error.message
    });
  }
}; 