/**
 * Middleware de vérification du rôle administrateur.
 * Doit toujours être utilisé APRÈS le middleware `protect` car il dépend de req.user.
 */
export const requireAdmin = (req, res, next) => {
  // L'opérateur ?. évite un crash si protect n'a pas été appelé avant
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Accès réservé aux administrateurs' })
  }
  next()
}
