const express = require('express');
const router = express.Router();
const collaborationController = require('../controllers/collaborationController');

/**
 * @route GET /api/collaborations
 * @desc Récupération de toutes les collaborations
 * @access Public
 */
router.get('/', collaborationController.getAllCollaborations);

/**
 * @route GET /api/collaborations/search
 * @desc Recherche de collaborations entre deux artistes
 * @access Public
 */
router.get('/search', collaborationController.searchCollaborations);

/**
 * @route POST /api/collaborations
 * @desc Soumission d'une nouvelle collaboration
 * @access Public
 */
router.post('/', collaborationController.submitCollaboration);

module.exports = router; 