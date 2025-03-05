/**
 * Contrôleur pour les artistes
 * Gère les requêtes liées aux artistes
 */

// Services
const spotifyService = require('../services/spotifyService');
// const prisma = require('../services/prismaService');

/**
 * Recherche des artistes par nom
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.searchArtists = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        error: 'Le paramètre "name" est requis'
      });
    }
    
    // Recherche d'abord dans la base de données locale
    // const localArtists = await prisma.artist.findMany({
    //   where: {
    //     name: {
    //       contains: name,
    //       mode: 'insensitive'
    //     }
    //   },
    //   take: 10
    // });
    
    // Si pas assez de résultats locaux, recherche via Spotify
    // if (localArtists.length < 5) {
    const spotifyArtists = await spotifyService.searchArtists(name);
    
    // Combine et déduplique les résultats
    // const combinedArtists = [...localArtists];
    // for (const artist of spotifyArtists) {
    //   if (!combinedArtists.some(a => a.spotifyId === artist.spotifyId)) {
    //     combinedArtists.push(artist);
    //   }
    // }
    
    // Pour le moment, retourne uniquement les résultats de Spotify
    return res.json({
      artists: spotifyArtists
    });
    // }
    
    // return res.json({
    //   artists: localArtists
    // });
    
  } catch (error) {
    console.error('Erreur lors de la recherche d\'artistes:', error);
    return res.status(500).json({
      error: 'Erreur lors de la recherche d\'artistes',
      message: error.message
    });
  }
};

/**
 * Recherche des suggestions d'artistes basées sur un terme de recherche
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.searchArtistSuggestions = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim().length < 2) {
      return res.json([]);
    }
    
    // Recherche via Spotify
    const spotifyArtists = await spotifyService.searchArtists(query);
    
    // Transforme les données pour le format de suggestion
    const suggestions = spotifyArtists.map(artist => ({
      id: artist.id,
      name: artist.name,
      image: artist.imageUrl,
      genres: artist.genres,
      popularity: artist.popularity
    }));
    
    return res.json(suggestions);
    
  } catch (error) {
    console.error('Erreur lors de la recherche de suggestions d\'artistes:', error);
    return res.status(500).json({
      error: 'Erreur lors de la recherche de suggestions d\'artistes',
      message: error.message
    });
  }
};

/**
 * Récupère les détails d'un artiste par ID
 * @param {Object} req - Requête Express
 * @param {Object} res - Réponse Express
 */
exports.getArtistById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        error: 'L\'ID de l\'artiste est requis'
      });
    }
    
    // Recherche d'abord dans la base de données locale
    // const localArtist = await prisma.artist.findUnique({
    //   where: { id: parseInt(id) },
    //   include: {
    //     collaborations: {
    //       include: {
    //         artists: true
    //       }
    //     }
    //   }
    // });
    
    // Si trouvé localement, retourne les données
    // if (localArtist) {
    //   return res.json(localArtist);
    // }
    
    // Sinon, recherche via Spotify
    const spotifyArtist = await spotifyService.getArtistById(id);
    
    if (!spotifyArtist) {
      return res.status(404).json({
        error: 'Artiste non trouvé'
      });
    }
    
    return res.json(spotifyArtist);
    
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'artiste:', error);
    return res.status(500).json({
      error: 'Erreur lors de la récupération des détails de l\'artiste',
      message: error.message
    });
  }
}; 