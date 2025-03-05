/**
 * Contrôleur pour l'administration
 * Gère les requêtes liées à l'administration du site
 */

// Services
const prisma = require('../services/prismaService');

// Données temporaires pour simuler une base de données (à conserver pour la compatibilité)
let pendingCollaborations = [];
let approvedCollaborations = [];
let rejectedCollaborations = [];

// Générer un ID unique (à conserver pour la compatibilité)
const generateId = () => Math.floor(Math.random() * 10000);

/**
 * Récupère les collaborations en attente de validation
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.getPendingCollaborations = async (req, res) => {
  try {
    // Récupérer les collaborations en attente depuis la base de données
    const pendingCollaborations = await prisma.submittedCollaboration.findMany({
      where: {
        status: 'PENDING'
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    // Transformer les données pour correspondre au format attendu par le frontend
    const formattedCollaborations = pendingCollaborations.map(collab => ({
      id: collab.id,
      artist1: collab.artist1Name,
      artist2: collab.artist2Name,
      title: collab.title || '',
      album: collab.album || '',
      releaseDate: collab.releaseDate ? collab.releaseDate.toISOString() : null,
      producers: collab.producers || [],
      musicLink: collab.musicLink,
      additionalInfo: collab.additionalInfo || '',
      status: collab.status,
      createdAt: collab.submittedAt.toISOString()
    }));

    return res.json({
      collaborations: formattedCollaborations
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des collaborations en attente:', error);
    return res.status(500).json({
      error: 'Erreur lors de la récupération des collaborations en attente',
      message: error.message
    });
  }
};

/**
 * Approuve une collaboration
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.approveCollaboration = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        error: 'ID de collaboration manquant'
      });
    }
    
    // Mettre à jour le statut de la collaboration dans la base de données
    const collaboration = await prisma.submittedCollaboration.update({
      where: {
        id: parseInt(id)
      },
      data: {
        status: 'APPROVED',
        approvedAt: new Date()
      }
    });
    
    // Transformer les données pour correspondre au format attendu par le frontend
    const formattedCollaboration = {
      id: collaboration.id,
      artist1: collaboration.artist1Name,
      artist2: collaboration.artist2Name,
      title: collaboration.title || '',
      album: collaboration.album || '',
      releaseDate: collaboration.releaseDate ? collaboration.releaseDate.toISOString() : null,
      producers: collaboration.producers || [],
      musicLink: collaboration.musicLink,
      additionalInfo: collaboration.additionalInfo || '',
      status: collaboration.status,
      createdAt: collaboration.submittedAt.toISOString(),
      approvedAt: collaboration.approvedAt.toISOString()
    };
    
    return res.json({
      success: true,
      message: 'Collaboration approuvée avec succès',
      collaboration: formattedCollaboration
    });
  } catch (error) {
    console.error('Erreur lors de l\'approbation de la collaboration:', error);
    return res.status(500).json({
      error: 'Erreur lors de l\'approbation de la collaboration',
      message: error.message
    });
  }
};

/**
 * Rejette une collaboration
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.rejectCollaboration = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        error: 'ID de collaboration manquant'
      });
    }
    
    // Mettre à jour le statut de la collaboration dans la base de données
    const collaboration = await prisma.submittedCollaboration.update({
      where: {
        id: parseInt(id)
      },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date()
      }
    });
    
    // Transformer les données pour correspondre au format attendu par le frontend
    const formattedCollaboration = {
      id: collaboration.id,
      artist1: collaboration.artist1Name,
      artist2: collaboration.artist2Name,
      title: collaboration.title || '',
      album: collaboration.album || '',
      releaseDate: collaboration.releaseDate ? collaboration.releaseDate.toISOString() : null,
      producers: collaboration.producers || [],
      musicLink: collaboration.musicLink,
      additionalInfo: collaboration.additionalInfo || '',
      status: collaboration.status,
      createdAt: collaboration.submittedAt.toISOString(),
      rejectedAt: collaboration.rejectedAt.toISOString()
    };
    
    return res.json({
      success: true,
      message: 'Collaboration rejetée avec succès',
      collaboration: formattedCollaboration
    });
  } catch (error) {
    console.error('Erreur lors du rejet de la collaboration:', error);
    return res.status(500).json({
      error: 'Erreur lors du rejet de la collaboration',
      message: error.message
    });
  }
};

// Exporter les données temporaires pour les autres contrôleurs (à conserver pour la compatibilité)
exports.pendingCollaborations = pendingCollaborations;
exports.approvedCollaborations = approvedCollaborations;
exports.rejectedCollaborations = rejectedCollaborations;
exports.generateId = generateId; 