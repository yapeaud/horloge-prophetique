/**
 * Gestionnaire d'erreurs global Express.
 * La signature à 4 paramètres (err, req, res, next) est obligatoire pour qu'Express
 * reconnaisse ce middleware comme gestionnaire d'erreurs — même si next n'est pas utilisé.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack)

  const status = err.status || 500

  res.status(status).json({
    message: err.message || 'Erreur interne du serveur',
    // La stack trace n'est exposée qu'en développement pour ne pas révéler l'architecture en production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
