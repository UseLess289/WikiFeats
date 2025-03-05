import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container">
      <section className="hero">
        <h1>Bienvenue sur WikiFeats</h1>
        <p className="hero-description">
          Découvre les collaborations entre des artistes bien sombres et deviens le GOAT du Roland Gamos.
        </p>
        <div className="hero-buttons">
          <Link to="/search" className="btn btn-primary">Rechercher un feat</Link>
          <Link to="/submit" className="btn btn-secondary">Soumettre un feat</Link>
        </div>
      </section>
      
      <section className="how-it-works">
        <h2>Comment ça marche ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Recherchez</h3>
            <p>Entre les noms de deux artistes pour vérifier s'ils ont feat.</p>
          </div>
          <div className="feature-card">
            <h3>Flexez</h3>
            <p>Montre que tu tabasse tes gars au Roland Gamos.</p>
          </div>
          <div className="feature-card">
            <h3>Contribuez</h3>
            <p>Tu connais une collaboration qui n'est pas référencée ? Soumet-la pour la culture.</p>
          </div>
        </div>
      </section>
      
      <section className="about">
        <h2>À propos du Roland Gamos</h2>
        <p>
          Le Roland Gamos est né dans les rap jeu de RedBull et présenté par Mehdi Maïzi. Un joueur nomme un rappeur, puis le joueur suivant doit nommer un artiste avec lequel ce rappeur a collaboré. WikiFeats permet de ne pas s'embouquaner sur Spotify.
        </p>
      </section>
    </div>
  )
}

export default Home 