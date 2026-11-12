import prisma from '../lib/prisma.js'

/**
 * Retourne les sujets de prière, avec filtrage optionnel par type.
 * @param {string|undefined} type - HEBDOMADAIRE | MENSUEL | CONTINENTAL (optionnel)
 */
export const getAllPrayerTopics = (type) =>
  prisma.prayerTopic.findMany({
    where: type ? { type } : undefined, // Sans filtre = tous les types
    orderBy: { createdAt: 'desc' },
  })

/** Retourne un sujet de prière par son UUID public */
export const getPrayerTopicById = (id) =>
  prisma.prayerTopic.findUnique({ where: { prayerTopicId: id } })

/** Crée un nouveau sujet de prière */
export const createPrayerTopic = (data) => prisma.prayerTopic.create({ data })

/** Met à jour un sujet de prière par son UUID public */
export const updatePrayerTopic = (id, data) =>
  prisma.prayerTopic.update({ where: { prayerTopicId: id }, data })

/** Supprime un sujet de prière par son UUID public */
export const deletePrayerTopic = (id) =>
  prisma.prayerTopic.delete({ where: { prayerTopicId: id } })
