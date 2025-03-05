import { useState, useEffect } from 'react';
import { statusService } from '../services/api';

/**
 * Composant qui vérifie et affiche l'état de connexion avec le backend
 */
const BackendStatus = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkStatus = async () => {
      try {
        await statusService.checkBackendAvailability();
        setStatus('connected');
      } catch (error) {
        console.error('Erreur de connexion au backend:', error);
        setStatus('disconnected');
      }
    };

    checkStatus();
    
    // Vérifier périodiquement la connexion
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (status === 'disconnected') {
    return (
      <div className="backend-status-alert">
        <div className="alert-content">
          <h3>⚠️ Service temporairement indisponible</h3>
          <p>
            Le serveur est actuellement en pause pour économiser les ressources. 
            Les fonctionnalités de recherche et de soumission ne sont pas disponibles pour le moment.
          </p>
          <p>
            Veuillez réessayer plus tard ou contacter l'administrateur si le problème persiste.
          </p>
        </div>
      </div>
    );
  }

  return null; // Ne rien afficher si le backend est disponible
};

export default BackendStatus; 