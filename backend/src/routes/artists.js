const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

/**
 * @route GET /api/artists
 * @desc Recherche d'artistes par nom
 * @access Public
 */
router.get('/', artistController.searchArtists);

/**
 * @route GET /api/artists/search
 * @desc Recherche de suggestions d'artistes
 * @access Public
 */
router.get('/search', artistController.searchArtistSuggestions);

/**
 * @route GET /api/artists/:id
 * @desc Récupération des détails d'un artiste par ID
 * @access Public
 */
router.get('/:id', artistController.getArtistById);

module.exports = router; 