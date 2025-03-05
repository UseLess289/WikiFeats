/**
 * Service API pour communiquer avec le backend
 */

import axios from 'axios';
import config from '../config';

// Création d'une instance axios avec la configuration de base
const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Service pour vérifier la disponibilité du backend
export const statusService = {
  checkBackendAvailability: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la vérification du backend:', error);
      throw error;
    }
  }
};

// Service pour les collaborations
export const collaborationService = {
  // Récupérer toutes les collaborations approuvées
  getAll: async () => {
    try {
      const response = await api.get('/collaborations');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des collaborations:', error);
      throw error;
    }
  },
  
  // Soumettre une nouvelle collaboration
  submit: async (collaboration) => {
    try {
      const response = await api.post('/collaborations/submit', collaboration);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la soumission de la collaboration:', error);
      throw error;
    }
  }
};

// Service pour la recherche d'artistes
export const searchService = {
  // Rechercher un artiste
  searchArtist: async (query) => {
    try {
      const response = await api.get(`/search/artist?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche d\'artiste:', error);
      throw error;
    }
  },
  
  // Récupérer les collaborations d'un artiste
  getArtistCollaborations: async (artistId) => {
    try {
      const response = await api.get(`/search/collaborations?artistId=${artistId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des collaborations de l\'artiste:', error);
      throw error;
    }
  }
};

// Service pour l'administration
export const adminService = {
  // Récupérer les collaborations en attente
  getPendingCollaborations: async () => {
    try {
      const response = await api.get('/admin/pending');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des collaborations en attente:', error);
      throw error;
    }
  },
  
  // Approuver une collaboration
  approveCollaboration: async (id) => {
    try {
      const response = await api.put(`/admin/approve/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la collaboration:', error);
      throw error;
    }
  },
  
  // Rejeter une collaboration
  rejectCollaboration: async (id) => {
    try {
      const response = await api.put(`/admin/reject/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors du rejet de la collaboration:', error);
      throw error;
    }
  }
};

export default api; 