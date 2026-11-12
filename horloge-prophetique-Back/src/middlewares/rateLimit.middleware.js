import rateLimit from 'express-rate-limit'

/**
 * Limiteur de tentatives de connexion.
 * Protège contre les attaques de type brute-force sur l'endpoint /auth/login.
 * Limite à 5 tentatives par minute par adresse IP.
 */
export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // Fenêtre de 1 minute
  max: 5,              // Maximum 5 requêtes par fenêtre
  message: { message: 'Trop de tentatives de connexion. Réessayez dans 1 minute.' },
  standardHeaders: true,  // Envoie les en-têtes RateLimit-* (standard RFC 6585)
  legacyHeaders: false,   // Désactive les anciens en-têtes X-RateLimit-*
})
