import prisma from '../lib/prisma.js'

/** Enregistre une nouvelle demande de prière soumise par un visiteur */
export const createPrayerRequest = (data) => prisma.prayerRequest.create({ data })

/** Retourne toutes les demandes de prière (admin uniquement), de la plus récente à la plus ancienne */
export const getAllPrayerRequests = () =>
  prisma.prayerRequest.findMany({ orderBy: { createdAt: 'desc' } })

/**
 * Met à jour le statut d'une demande de prière.
 * Utilise prayerRequestId (UUID) plutôt que l'id entier pour l'API publique.
 *
 * @param {string} id - UUID de la demande (prayerRequestId)
 * @param {string} statut - EN_ATTENTE | TRAITE | ARCHIVE
 */
export const updatePrayerRequestStatus = (id, statut) =>
  prisma.prayerRequest.update({ where: { prayerRequestId: id }, data: { statut } })

/** Supprime définitivement une demande de prière */
export const deletePrayerRequest = (id) =>
  prisma.prayerRequest.delete({ where: { prayerRequestId: id } })
