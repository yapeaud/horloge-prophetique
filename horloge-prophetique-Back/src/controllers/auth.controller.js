import * as authService from '../services/auth.service.js'

// Authentifie un utilisateur et retourne un JWT.
// La validation minimale (email + password présents) est faite ici ;
// la vérification du hash est déléguée au service.
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email et mot de passe requis' })
    const result = await authService.loginUser(email, password)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

// Retourne le profil de l'utilisateur actuellement connecté.
// req.user.id est l'UUID injecté par le middleware protect.
export const me = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id)
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' })
    res.json(user)
  } catch (err) {
    next(err)
  }
}
