import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 5001

// Point d'entrée du serveur : démarre l'écoute sur le port défini dans .env
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
