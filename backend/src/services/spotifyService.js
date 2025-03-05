/**
 * Service pour l'API Spotify
 * Gère les interactions avec l'API Spotify
 */

const axios = require('axios');

// Configuration
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Variables pour le token
let accessToken = null;
let tokenExpiration = null;

/**
 * Obtient un token d'accès Spotify
 * @returns {Promise<string>} Token d'accès
 */
const getAccessToken = async () => {
  // Si le token est valide, le retourne
  if (accessToken && tokenExpiration && Date.now() < tokenExpiration) {
    return accessToken;
  }
  
  try {
    // Sinon, obtient un nouveau token
    const response = await axios({
      method: 'post',
      url: SPOTIFY_AUTH_URL,
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')
      }
    });
    
    accessToken = response.data.access_token;
    tokenExpiration = Date.now() + (response.data.expires_in * 1000);
    
    return accessToken;
  } catch (error) {
    console.error('Erreur lors de l\'obtention du token Spotify:', error);
    throw new Error('Impossible d\'obtenir un token d\'accès Spotify');
  }
};

/**
 * Recherche des artistes par nom
 * @param {string} name - Nom de l'artiste à rechercher
 * @returns {Promise<Array>} Liste des artistes trouvés
 */
exports.searchArtists = async (name) => {
  try {
    const token = await getAccessToken();
    
    const response = await axios({
      method: 'get',
      url: `${SPOTIFY_API_URL}/search`,
      params: {
        q: name,
        type: 'artist',
        limit: 10
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    // Transforme les données pour notre format
    return response.data.artists.items.map(artist => ({
      id: artist.id,
      name: artist.name,
      spotifyId: artist.id,
      spotifyUrl: artist.external_urls.spotify,
      imageUrl: artist.images.length > 0 ? artist.images[0].url : null,
      popularity: artist.popularity,
      genres: artist.genres
    }));
  } catch (error) {
    console.error('Erreur lors de la recherche d\'artistes sur Spotify:', error);
    return [];
  }
};

/**
 * Récupère les détails d'un artiste par ID
 * @param {string} id - ID Spotify de l'artiste
 * @returns {Promise<Object|null>} Détails de l'artiste
 */
exports.getArtistById = async (id) => {
  try {
    const token = await getAccessToken();
    
    const [artistResponse, albumsResponse, topTracksResponse] = await Promise.all([
      // Détails de l'artiste
      axios({
        method: 'get',
        url: `${SPOTIFY_API_URL}/artists/${id}`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      // Albums de l'artiste
      axios({
        method: 'get',
        url: `${SPOTIFY_API_URL}/artists/${id}/albums`,
        params: {
          include_groups: 'album,single',
          limit: 10
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }),
      // Top tracks de l'artiste
      axios({
        method: 'get',
        url: `${SPOTIFY_API_URL}/artists/${id}/top-tracks`,
        params: {
          market: 'FR'
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    ]);
    
    const artist = artistResponse.data;
    const albums = albumsResponse.data.items;
    const topTracks = topTracksResponse.data.tracks;
    
    // Transforme les données pour notre format
    return {
      id: artist.id,
      name: artist.name,
      spotifyId: artist.id,
      spotifyUrl: artist.external_urls.spotify,
      imageUrl: artist.images.length > 0 ? artist.images[0].url : null,
      popularity: artist.popularity,
      genres: artist.genres,
      followers: artist.followers.total,
      albums: albums.map(album => ({
        id: album.id,
        name: album.name,
        releaseDate: album.release_date,
        spotifyUrl: album.external_urls.spotify,
        imageUrl: album.images.length > 0 ? album.images[0].url : null,
        totalTracks: album.total_tracks
      })),
      topTracks: topTracks.map(track => ({
        id: track.id,
        name: track.name,
        spotifyUrl: track.external_urls.spotify,
        previewUrl: track.preview_url,
        albumName: track.album.name,
        albumImageUrl: track.album.images.length > 0 ? track.album.images[0].url : null,
        popularity: track.popularity
      }))
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'artiste sur Spotify:', error);
    return null;
  }
};

/**
 * Recherche des collaborations entre deux artistes
 * @param {string} artist1Id - ID Spotify du premier artiste
 * @param {string} artist2Id - ID Spotify du deuxième artiste
 * @returns {Promise<Array>} Liste des collaborations trouvées
 */
exports.findCollaborations = async (artist1Id, artist2Id) => {
  try {
    const token = await getAccessToken();
    
    // Récupère les albums et singles du premier artiste
    const albumsResponse = await axios({
      method: 'get',
      url: `${SPOTIFY_API_URL}/artists/${artist1Id}/albums`,
      params: {
        include_groups: 'album,single',
        limit: 50
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const albums = albumsResponse.data.items;
    const collaborations = [];
    
    // Pour chaque album/single, récupère les tracks et vérifie si le deuxième artiste y participe
    for (const album of albums) {
      const tracksResponse = await axios({
        method: 'get',
        url: `${SPOTIFY_API_URL}/albums/${album.id}/tracks`,
        params: {
          limit: 50
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const tracks = tracksResponse.data.items;
      
      // Vérifie chaque track pour voir si le deuxième artiste y participe
      for (const track of tracks) {
        const artistIds = track.artists.map(artist => artist.id);
        
        if (artistIds.includes(artist2Id)) {
          // C'est une collaboration !
          collaborations.push({
            id: track.id,
            title: track.name,
            album: album.name,
            releaseDate: album.release_date,
            coverUrl: album.images.length > 0 ? album.images[0].url : null,
            artists: track.artists.map(artist => artist.name),
            spotifyUrl: track.external_urls.spotify,
            previewUrl: track.preview_url
          });
        }
      }
    }
    
    return collaborations;
  } catch (error) {
    console.error('Erreur lors de la recherche de collaborations sur Spotify:', error);
    return [];
  }
}; 