import { useState } from 'react'
import { collaborationService } from '../services/api'
import './SubmitCollaboration.css'

function SubmitCollaboration() {
  const [formData, setFormData] = useState({
    artist1: '',
    artist2: '',
    title: '',
    album: '',
    releaseDate: '',
    producers: '',
    musicLink: '',
    additionalInfo: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState(null)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.artist1 || !formData.artist2 || !formData.musicLink) {
      setError('Les noms des deux artistes et un lien vers la musique sont requis.')
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      const collaborationData = {
        title: formData.title,
        artists: [formData.artist1, formData.artist2, ...formData.additionalArtists.filter(a => a.trim() !== '')],
        album: formData.album,
        releaseDate: formData.releaseDate,
        producers: formData.producers.filter(p => p.trim() !== ''),
        spotifyUrl: formData.musicLink,
        geniusUrl: formData.geniusUrl
      }
      
      const response = await collaborationService.submit(collaborationData)
      setSubmitSuccess(true)
      setIsSubmitting(false)
      setFormData({
        artist1: '',
        artist2: '',
        title: '',
        album: '',
        releaseDate: '',
        producers: '',
        musicLink: '',
        additionalInfo: '',
        additionalArtists: [],
        geniusUrl: ''
      })
    } catch (error) {
      console.error('Erreur lors de la soumission:', error)
      setIsSubmitting(false)
      setError('Une erreur est survenue lors de la soumission. Veuillez réessayer.')
    }
  }
  
  if (submitSuccess) {
    return (
      <div className="container">
        <div className="success-message">
          <i className="fas fa-check-circle success-icon"></i>
          <h2>Merci pour votre contribution !</h2>
          <p>Votre soumission a été enregistrée et sera examinée par notre équipe.</p>
          <p className="success-details">Nous vérifions chaque soumission pour assurer la qualité de notre base de données.</p>
          <button onClick={() => setSubmitSuccess(false)} className="btn-primary">
            <i className="fas fa-plus"></i> Soumettre une autre collaboration
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Soumettre une collaboration</h1>
      
      <div className="form-container">
        <p className="form-intro">
          Tu connais une collaboration qui n'est pas référencée dans notre base de données ? 
          Pour la culture, soumet-la. Partage un peu wsh. Ne fais pas de mytho, le boss va vérifier.
        </p>
        
        <form onSubmit={handleSubmit} className="submit-form">
          <div className="form-group">
            <label htmlFor="artist1">Artiste 1 *</label>
            <input
              type="text"
              id="artist1"
              name="artist1"
              value={formData.artist1}
              onChange={handleChange}
              required
              placeholder="Nom du premier artiste"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="artist2">Artiste 2 *</label>
            <input
              type="text"
              id="artist2"
              name="artist2"
              value={formData.artist2}
              onChange={handleChange}
              required
              placeholder="Nom du deuxième artiste"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Titre de la chanson</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titre de la collaboration"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="album">Album</label>
            <input
              type="text"
              id="album"
              name="album"
              value={formData.album}
              onChange={handleChange}
              placeholder="Nom de l'album"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="releaseDate">Date de sortie</label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="producers">Producteurs</label>
            <input
              type="text"
              id="producers"
              name="producers"
              value={formData.producers}
              onChange={handleChange}
              placeholder="Noms des producteurs (séparés par des virgules)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="musicLink">Lien vers la musique *</label>
            <input
              type="url"
              id="musicLink"
              name="musicLink"
              value={formData.musicLink}
              onChange={handleChange}
              required
              placeholder="Lien Spotify, YouTube, etc."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="additionalInfo">Informations supplémentaires</label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Toute information supplémentaire pertinente"
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="additionalArtists">Autres artistes</label>
            <input
              type="text"
              id="additionalArtists"
              name="additionalArtists"
              value={formData.additionalArtists.join(', ')}
              onChange={(e) => setFormData(prevData => ({
                ...prevData,
                additionalArtists: e.target.value.split(',').map(a => a.trim())
              }))}
              placeholder="Noms des autres artistes (séparés par des virgules)"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="geniusUrl">Lien Genius</label>
            <input
              type="url"
              id="geniusUrl"
              name="geniusUrl"
              value={formData.geniusUrl}
              onChange={handleChange}
              placeholder="Lien Genius"
            />
          </div>
          
          <p className="required-fields">* Champs obligatoires</p>
          
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-triangle"></i> {error}
            </div>
          )}
          
          <button type="submit" disabled={isSubmitting} className="btn-submit">
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Soumission en cours...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Soumettre la collaboration
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SubmitCollaboration 