/**
 * Service pour l'API Genius
 * Gère les interactions avec l'API Genius
 */

const axios = require('axios');

// Configuration
const GENIUS_API_URL = 'https://api.genius.com';
const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;

/**
 * Recherche une chanson sur Genius
 * @param {string} query - Terme de recherche (titre + artistes)
 * @returns {Promise<Object|null>} Premier résultat de recherche
 */
exports.searchSong = async (query) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${GENIUS_API_URL}/search`,
      params: {
        q: query
      },
      headers: {
        'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}`
      }
    });
    
    const hits = response.data.response.hits;
    
    if (hits.length === 0) {
      return null;
    }
    
    // Retourne le premier résultat
    const firstHit = hits[0].result;
    
    return {
      id: firstHit.id,
      title: firstHit.title,
      artistName: firstHit.primary_artist.name,
      url: firstHit.url,
      imageUrl: firstHit.song_art_image_url,
      releaseDate: firstHit.release_date_for_display
    };
  } catch (error) {
    console.error('Erreur lors de la recherche sur Genius:', error);
    return null;
  }
};

/**
 * Récupère les informations détaillées d'une chanson
 * @param {string} query - Terme de recherche (titre + artistes)
 * @returns {Promise<Object|null>} Informations détaillées de la chanson
 */
exports.getSongInfo = async (query) => {
  try {
    // Recherche d'abord la chanson
    const song = await exports.searchSong(query);
    
    if (!song) {
      return null;
    }
    
    // Récupère les détails de la chanson
    const response = await axios({
      method: 'get',
      url: `${GENIUS_API_URL}/songs/${song.id}`,
      headers: {
        'Authorization': `Bearer ${GENIUS_ACCESS_TOKEN}`
      }
    });
    
    const songData = response.data.response.song;
    
    // Extrait les producteurs
    const producers = songData.producer_artists.map(producer => producer.name);
    
    // Extrait les featuring artists
    const featuringArtists = songData.featured_artists.map(artist => artist.name);
    
    return {
      id: songData.id,
      title: songData.title,
      url: songData.url,
      imageUrl: songData.song_art_image_url,
      releaseDate: songData.release_date_for_display,
      album: songData.album ? songData.album.name : null,
      primaryArtist: songData.primary_artist.name,
      featuringArtists,
      producers,
      recordingLocation: songData.recording_location,
      lyrics: songData.embed_content // Paroles intégrées si disponibles
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des informations de la chanson sur Genius:', error);
    return null;
  }
}; 