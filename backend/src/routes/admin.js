const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

/**
 * @route GET /api/admin/collaborations/pending
 * @desc Récupération des collaborations en attente de validation
 * @access Admin
 */
router.get('/collaborations/pending', adminController.getPendingCollaborations);

/**
 * @route PUT /api/admin/collaborations/:id/approve
 * @desc Approbation d'une collaboration
 * @access Admin
 */
router.put('/collaborations/:id/approve', adminController.approveCollaboration);

/**
 * @route PUT /api/admin/collaborations/:id/reject
 * @desc Rejet d'une collaboration
 * @access Admin
 */
router.put('/collaborations/:id/reject', adminController.rejectCollaboration);

module.exports = router; 