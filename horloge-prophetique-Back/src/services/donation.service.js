import prisma from '../lib/prisma.js'

/** Enregistre un nouveau don soumis par un visiteur */
export const createDonation = (data) => prisma.donation.create({ data })

/** Retourne l'historique de tous les dons (admin uniquement) */
export const getAllDonations = () =>
  prisma.donation.findMany({ orderBy: { createdAt: 'desc' } })

/**
 * Met à jour le statut d'un don (ex: EN_ATTENTE → COMPLETE après confirmation paiement).
 *
 * @param {string} id - UUID public du don (donationId)
 * @param {string} statut - EN_ATTENTE | COMPLETE | ECHOUE
 */
export const updateDonationStatus = (id, statut) =>
  prisma.donation.update({ where: { donationId: id }, data: { statut } })
