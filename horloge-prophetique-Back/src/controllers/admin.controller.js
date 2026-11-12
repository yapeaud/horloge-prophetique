import prisma from '../lib/prisma.js'

// Retourne les compteurs de toutes les entités en une seule requête parallèle.
// Utilisé par le Dashboard admin pour afficher les statistiques globales.
// Promise.all garantit que toutes les requêtes COUNT s'exécutent simultanément.
export const getStats = async (req, res, next) => {
  try {
    const [podcasts, prayerRequests, prayerTopics, subscribers, books, donations, teamMembers, medias] =
      await Promise.all([
        prisma.podcast.count(),
        prisma.prayerRequest.count(),
        prisma.prayerTopic.count(),
        prisma.newsletterSubscriber.count(),
        prisma.book.count(),
        prisma.donation.count(),
        prisma.teamMember.count(),
        prisma.media.count(),
      ])

    res.json({ podcasts, prayerRequests, prayerTopics, subscribers, books, donations, teamMembers, medias })
  } catch (err) {
    next(err)
  }
}
