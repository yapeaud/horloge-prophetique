import jwt from 'jsonwebtoken'

/**
 * Middleware de protection des routes.
 * Vérifie la présence et la validité du token JWT dans l'en-tête Authorization.
 * Si le token est valide, attache le payload décodé à req.user pour les middlewares suivants.
 */
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization

  // Le token doit être envoyé sous la forme : "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Non autorisé — token manquant' })
  }

  const token = authHeader.split(' ')[1]

  try {
    // Vérifie la signature et l'expiration du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // req.user contient : { id (userId UUID), email, role }
    req.user = decoded
    next()
  } catch {
    // Couvre les cas : signature invalide, token expiré, format malformé
    return res.status(401).json({ message: 'Token invalide ou expiré' })
  }
}
