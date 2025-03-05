import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container not-found">
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
      <Link to="/" className="btn btn-primary">Retour à l'accueil</Link>
    </div>
  )
}

export default NotFound 