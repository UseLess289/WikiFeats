import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const adminData = localStorage.getItem('wikifeats_admin');
    if (adminData) {
      try {
        const { isLoggedIn } = JSON.parse(adminData);
        setIsLoggedIn(isLoggedIn);
      } catch (error) {
        console.error('Erreur lors de la lecture des données d\'authentification:', error);
        localStorage.removeItem('wikifeats_admin');
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="admin-page">
      {isLoggedIn ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}

export default AdminPage; 