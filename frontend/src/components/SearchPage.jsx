import { useState, useEffect, useRef } from 'react'
import CollaborationResults from './CollaborationResults'
import { searchService } from '../services/api'
import './SearchPage.css'

function SearchPage() {
  const [artist1, setArtist1] = useState('')
  const [artist2, setArtist2] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [suggestions1, setSuggestions1] = useState([])
  const [suggestions2, setSuggestions2] = useState([])
  const [showSuggestions1, setShowSuggestions1] = useState(false)
  const [showSuggestions2, setShowSuggestions2] = useState(false)
  const [selectedArtist1, setSelectedArtist1] = useState(false)
  const [selectedArtist2, setSelectedArtist2] = useState(false)
  
  const suggestionRef1 = useRef(null)
  const suggestionRef2 = useRef(null)
  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  
  // Gestion des clics en dehors des suggestions pour les fermer
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef1.current && !suggestionRef1.current.contains(event.target) && 
          inputRef1.current && !inputRef1.current.contains(event.target)) {
        setShowSuggestions1(false)
      }
      
      if (suggestionRef2.current && !suggestionRef2.current.contains(event.target) && 
          inputRef2.current && !inputRef2.current.contains(event.target)) {
        setShowSuggestions2(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Recherche de suggestions pour l'artiste 1
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (artist1.trim().length >= 2) {
        const data = await searchService.searchArtist(artist1)
        setSuggestions1(data.slice(0, 5))
      } else {
        setSuggestions1([])
      }
    }
    
    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [artist1])
  
  // Recherche de suggestions pour l'artiste 2
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (artist2.trim().length >= 2) {
        const data = await searchService.searchArtist(artist2)
        setSuggestions2(data.slice(0, 5))
      } else {
        setSuggestions2([])
      }
    }
    
    const timer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(timer)
  }, [artist2])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!artist1 || !artist2) {
      setError('Veuillez entrer les noms des deux artistes')
      return
    }
    
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await searchService.searchArtist(artist1)
      const data2 = await searchService.searchArtist(artist2)
      setResults({ artist1: data, artist2: data2 })
    } catch (err) {
      setError('Une erreur est survenue lors de la recherche. Veuillez réessayer.')
      console.error('Erreur de recherche:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setArtist1('')
    setArtist2('')
    setResults(null)
    setError(null)
    setSuggestions1([])
    setSuggestions2([])
    setShowSuggestions1(false)
    setShowSuggestions2(false)
    setSelectedArtist1(false)
    setSelectedArtist2(false)
  }
  
  const handleSelectSuggestion = (artist, field) => {
    if (field === 'artist1') {
      setArtist1(artist.name)
      setShowSuggestions1(false)
      setSelectedArtist1(true)
    } else {
      setArtist2(artist.name)
      setShowSuggestions2(false)
      setSelectedArtist2(true)
    }
  }

  return (
    <div className="search-page">
      <div className="search-hero">
        <h1>Découvrez les collaborations entre artistes</h1>
        <p>Entrez les noms de deux artistes pour voir s'ils ont collaboré ensemble</p>
      </div>
      
      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-inputs">
            <div className="form-group">
              <label htmlFor="artist1">Premier artiste</label>
              <div className="selected-artist-container">
                {selectedArtist1 ? (
                  <div className="selected-artist">
                    <span>{artist1}</span>
                    <button 
                      type="button" 
                      className="clear-artist" 
                      onClick={() => {
                        setArtist1('')
                        setSuggestions1([])
                        setSelectedArtist1(false)
                      }}
                      aria-label="Effacer"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="input-with-icon">
                    <i className="fas fa-microphone"></i>
                    <input
                      type="text"
                      id="artist1"
                      ref={inputRef1}
                      value={artist1}
                      onChange={(e) => setArtist1(e.target.value)}
                      onFocus={() => setShowSuggestions1(true)}
                      placeholder="Ex: Booba"
                      autoComplete="off"
                      className={artist1 ? 'has-value' : ''}
                    />
                    {artist1 && (
                      <button 
                        type="button" 
                        className="clear-input" 
                        onClick={() => {
                          setArtist1('')
                          setSuggestions1([])
                          inputRef1.current.focus()
                        }}
                        aria-label="Effacer"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                )}
                
                {showSuggestions1 && suggestions1.length > 0 && (
                  <div className="suggestions" ref={suggestionRef1}>
                    {suggestions1.map((suggestion, index) => (
                      <div 
                        key={`artist1-${index}`}
                        className="suggestion-item"
                        onClick={() => handleSelectSuggestion(suggestion, 'artist1')}
                      >
                        {suggestion.image && (
                          <img src={suggestion.image} alt={suggestion.name} className="suggestion-image" />
                        )}
                        <div className="suggestion-info">
                          <span className="suggestion-name">{suggestion.name}</span>
                          {suggestion.genres && (
                            <span className="suggestion-genre">{suggestion.genres.join(', ')}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="search-separator">
              <i className="fas fa-times"></i>
            </div>
            
            <div className="form-group">
              <label htmlFor="artist2">Deuxième artiste</label>
              <div className="selected-artist-container">
                {selectedArtist2 ? (
                  <div className="selected-artist">
                    <span>{artist2}</span>
                    <button 
                      type="button" 
                      className="clear-artist" 
                      onClick={() => {
                        setArtist2('')
                        setSuggestions2([])
                        setSelectedArtist2(false)
                      }}
                      aria-label="Effacer"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="input-with-icon">
                    <i className="fas fa-microphone"></i>
                    <input
                      type="text"
                      id="artist2"
                      ref={inputRef2}
                      value={artist2}
                      onChange={(e) => setArtist2(e.target.value)}
                      onFocus={() => setShowSuggestions2(true)}
                      placeholder="Ex: Kaaris"
                      autoComplete="off"
                      className={artist2 ? 'has-value' : ''}
                    />
                    {artist2 && (
                      <button 
                        type="button" 
                        className="clear-input" 
                        onClick={() => {
                          setArtist2('')
                          setSuggestions2([])
                          inputRef2.current.focus()
                        }}
                        aria-label="Effacer"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>
                )}
                
                {showSuggestions2 && suggestions2.length > 0 && (
                  <div className="suggestions" ref={suggestionRef2}>
                    {suggestions2.map((suggestion, index) => (
                      <div 
                        key={`artist2-${index}`}
                        className="suggestion-item"
                        onClick={() => handleSelectSuggestion(suggestion, 'artist2')}
                      >
                        {suggestion.image && (
                          <img src={suggestion.image} alt={suggestion.name} className="suggestion-image" />
                        )}
                        <div className="suggestion-info">
                          <span className="suggestion-name">{suggestion.name}</span>
                          {suggestion.genres && (
                            <span className="suggestion-genre">{suggestion.genres.join(', ')}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="search-actions">
            <button type="submit" className="btn-search" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Recherche...
                </>
              ) : (
                <>
                  <i className="fas fa-search"></i> Rechercher
                </>
              )}
            </button>
            
            <button type="button" className="btn-clear" onClick={handleClear} disabled={isLoading}>
              <i className="fas fa-times"></i> Effacer
            </button>
          </div>
        </form>
        
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i> {error}
          </div>
        )}
        
        {isLoading && (
          <div className="loading-container">
            <i className="fas fa-compact-disc fa-spin fa-3x"></i>
            <p>Recherche en cours...</p>
          </div>
        )}
        
        {results && <CollaborationResults results={results} artist1={artist1} artist2={artist2} />}
      </div>
    </div>
  )
}

export default SearchPage 