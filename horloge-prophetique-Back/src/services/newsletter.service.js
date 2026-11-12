import prisma from '../lib/prisma.js'

/** Abonne un nouvel utilisateur à la newsletter */
export const subscribe = (data) => prisma.newsletterSubscriber.create({ data })

/** Retourne la liste complète des abonnés, du plus récent au plus ancien */
export const getAllSubscribers = () =>
  prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } })

/** Supprime un abonné par son UUID public (subscriberId) */
export const unsubscribe = (id) =>
  prisma.newsletterSubscriber.delete({ where: { subscriberId: id } })

/**
 * Génère une chaîne CSV de tous les abonnés.
 * Utilisée pour l'export depuis le tableau de bord administrateur.
 *
 * @returns {string} Contenu CSV avec en-tête
 */
export const exportSubscribersCSV = async () => {
  const subscribers = await getAllSubscribers()
  const header = 'prenom,email,createdAt'
  const rows = subscribers.map((s) => `${s.prenom},${s.email},${s.createdAt.toISOString()}`)
  return [header, ...rows].join('\n')
}
