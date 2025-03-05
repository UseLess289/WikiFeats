import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-container">
          <img src="/resources/logo-icon.png" alt="WikiFeats Logo" className="logo-icon" />
          <Link to="/" className="logo">WikiFeats</Link>
        </div>
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/search">Recherche</Link>
          <Link to="/submit">Soumettre un feat</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 