// Script pour lancer le serveur de développement
const { spawn } = require('child_process');
const path = require('path');

console.log('Démarrage du serveur de développement...');

// Lancement de Vite
const vite = spawn('npx', ['vite'], {
  stdio: 'inherit',
  shell: true,
  cwd: path.resolve(__dirname)
});

vite.on('error', (error) => {
  console.error('Erreur lors du démarrage de Vite:', error);
});

vite.on('close', (code) => {
  console.log(`Vite s'est arrêté avec le code: ${code}`);
}); 