import { useState, useEffect } from 'react';
import { adminService } from '../../services/api';
import './AdminStyles.css';

function AdminDashboard({ onLogout }) {
  const [pendingCollaborations, setPendingCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchPendingCollaborations();
  }, []);

  const fetchPendingCollaborations = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPendingCollaborations();
      setPendingCollaborations(data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des collaborations en attente:', err);
      setError('Impossible de charger les collaborations en attente');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminService.approveCollaboration(id);
      // Mettre à jour la liste après approbation
      setPendingCollaborations(pendingCollaborations.filter(collab => collab.id !== id));
    } catch (err) {
      console.error('Erreur lors de l\'approbation:', err);
      setError('Erreur lors de l\'approbation de la collaboration');
    }
  };

  const handleReject = async (id) => {
    try {
      await adminService.rejectCollaboration(id);
      // Mettre à jour la liste après rejet
      setPendingCollaborations(pendingCollaborations.filter(collab => collab.id !== id));
    } catch (err) {
      console.error('Erreur lors du rejet:', err);
      setError('Erreur lors du rejet de la collaboration');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('wikifeats_admin');
    onLogout();
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Tableau de bord d'administration</h1>
        <button onClick={handleLogout} className="admin-logout-button">
          <i className="fas fa-sign-out-alt"></i> Déconnexion
        </button>
      </header>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Collaborations en attente
        </button>
        <button 
          className={`admin-tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Collaborations approuvées
        </button>
        <button 
          className={`admin-tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Collaborations rejetées
        </button>
      </div>

      <div className="admin-content">
        {error && <div className="admin-error-banner">{error}</div>}

        {loading ? (
          <div className="admin-loading">
            <i className="fas fa-spinner fa-spin"></i> Chargement des collaborations...
          </div>
        ) : (
          <>
            {activeTab === 'pending' && (
              <div className="admin-collaborations-list">
                <h2>Collaborations en attente de validation ({pendingCollaborations.length})</h2>
                
                {pendingCollaborations.length === 0 ? (
                  <p className="admin-empty-state">Aucune collaboration en attente de validation</p>
                ) : (
                  pendingCollaborations.map(collab => (
                    <div key={collab.id} className="admin-collaboration-card">
                      <div className="admin-collaboration-header">
                        <h3>{collab.artist1} × {collab.artist2}</h3>
                        <span className="admin-collaboration-date">
                          Soumis le {new Date(collab.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="admin-collaboration-details">
                        {collab.title && <p><strong>Titre:</strong> {collab.title}</p>}
                        {collab.album && <p><strong>Album:</strong> {collab.album}</p>}
                        {collab.releaseDate && (
                          <p><strong>Date de sortie:</strong> {new Date(collab.releaseDate).toLocaleDateString()}</p>
                        )}
                        {collab.producers && collab.producers.length > 0 && (
                          <p><strong>Producteurs:</strong> {collab.producers.join(', ')}</p>
                        )}
                        <p><strong>Lien:</strong> <a href={collab.musicLink} target="_blank" rel="noopener noreferrer">{collab.musicLink}</a></p>
                        
                        {collab.additionalInfo && (
                          <div className="admin-additional-info">
                            <strong>Informations supplémentaires:</strong>
                            <p>{collab.additionalInfo}</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="admin-collaboration-actions">
                        <button 
                          onClick={() => handleApprove(collab.id)}
                          className="admin-approve-button"
                        >
                          <i className="fas fa-check"></i> Approuver
                        </button>
                        <button 
                          onClick={() => handleReject(collab.id)}
                          className="admin-reject-button"
                        >
                          <i className="fas fa-times"></i> Rejeter
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'approved' && (
              <div className="admin-collaborations-list">
                <h2>Collaborations approuvées</h2>
                <p className="admin-empty-state">Fonctionnalité à venir</p>
              </div>
            )}

            {activeTab === 'rejected' && (
              <div className="admin-collaborations-list">
                <h2>Collaborations rejetées</h2>
                <p className="admin-empty-state">Fonctionnalité à venir</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard; 