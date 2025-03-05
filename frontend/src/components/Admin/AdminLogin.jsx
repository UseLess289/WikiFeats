import { useState } from 'react';
import './AdminStyles.css';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Vérification simple des identifiants (à remplacer par une vérification côté serveur)
    if (username === 'admin' && password === 'admin') {
      // Simuler un délai pour l'authentification
      setTimeout(() => {
        setIsLoading(false);
        // Stocker l'état de connexion dans le localStorage
        localStorage.setItem('wikifeats_admin', JSON.stringify({ isLoggedIn: true }));
        onLogin();
      }, 800);
    } else {
      setIsLoading(false);
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Administration WikiFeats</h2>
        <p className="admin-login-subtitle">Connectez-vous pour gérer les collaborations</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="admin-error-message">{error}</div>}

          <button 
            type="submit" 
            className="admin-login-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin; 