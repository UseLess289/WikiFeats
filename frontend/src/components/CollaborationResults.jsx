import React from 'react';
import './CollaborationResults.css';

const CollaborationResults = ({ results, isLoading, error }) => {
  if (isLoading) {
    return <div className="loading">Recherche en cours...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!results || (Array.isArray(results) && results.length === 0) || 
      (results.artist1 && results.artist1.length === 0 && results.artist2 && results.artist2.length === 0)) {
    return <div className="no-results">Aucun résultat trouvé. Essayez d'autres artistes.</div>;
  }

  // Affichage des résultats pour les deux artistes
  return (
    <div className="collaboration-results">
      <h2>Résultats de la recherche</h2>
      
      {results.artist1 && results.artist1.length > 0 && (
        <div className="artist-section">
          <h3>Artiste 1</h3>
          <ul className="artist-list">
            {results.artist1.map((artist, index) => (
              <li key={`artist1-${index}`} className="artist-item">
                <div className="artist-card">
                  {artist.images && artist.images[0] && (
                    <img src={artist.images[0].url} alt={artist.name} className="artist-image" />
                  )}
                  <div className="artist-info">
                    <h4>{artist.name}</h4>
                    {artist.genres && artist.genres.length > 0 && (
                      <p className="genres">Genres: {artist.genres.join(', ')}</p>
                    )}
                    {artist.external_urls && artist.external_urls.spotify && (
                      <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="spotify-link">
                        Voir sur Spotify
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {results.artist2 && results.artist2.length > 0 && (
        <div className="artist-section">
          <h3>Artiste 2</h3>
          <ul className="artist-list">
            {results.artist2.map((artist, index) => (
              <li key={`artist2-${index}`} className="artist-item">
                <div className="artist-card">
                  {artist.images && artist.images[0] && (
                    <img src={artist.images[0].url} alt={artist.name} className="artist-image" />
                  )}
                  <div className="artist-info">
                    <h4>{artist.name}</h4>
                    {artist.genres && artist.genres.length > 0 && (
                      <p className="genres">Genres: {artist.genres.join(', ')}</p>
                    )}
                    {artist.external_urls && artist.external_urls.spotify && (
                      <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="spotify-link">
                        Voir sur Spotify
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CollaborationResults; 