import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'

/**
 * Authentifie un utilisateur et retourne un token JWT.
 * Le message d'erreur est identique que l'email soit inconnu ou le mot de passe incorrect
 * afin d'éviter l'énumération des comptes (user enumeration attack).
 *
 * @param {string} email
 * @param {string} password - Mot de passe en clair (comparé au hash bcrypt)
 * @returns {{ token: string, user: object }}
 */
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw { status: 401, message: 'Email ou mot de passe incorrect' }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw { status: 401, message: 'Email ou mot de passe incorrect' }

  // On signe avec userId (UUID) plutôt qu'avec id (Int) pour ne jamais exposer
  // un identifiant séquentiel dans le token, ce qui évite l'énumération des utilisateurs.
  const token = jwt.sign(
    { id: user.userId, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )

  // On renvoie userId comme 'id' côté client pour garder une API cohérente
  return { token, user: { id: user.userId, nom: user.nom, email: user.email, role: user.role } }
}

/**
 * Récupère le profil de l'utilisateur connecté à partir de son UUID.
 * Le userId provient du payload JWT décodé par le middleware protect.
 *
 * @param {string} userId - UUID de l'utilisateur (champ userId du modèle User)
 * @returns {object|null}
 */
export const getMe = async (userId) => {
  return prisma.user.findUnique({
    where: { userId },
    // On exclut le mot de passe du résultat pour ne jamais le retourner au client
    select: { userId: true, nom: true, email: true, role: true, createdAt: true },
  })
}
