import { Router } from 'express'
import authRoutes from './auth.routes.js'
import podcastRoutes from './podcast.routes.js'
import prayerRequestRoutes from './prayerRequest.routes.js'
import prayerTopicRoutes from './prayerTopic.routes.js'
import newsletterRoutes from './newsletter.routes.js'
import bookRoutes from './book.routes.js'
import donationRoutes from './donation.routes.js'
import adminRoutes from './admin.routes.js'
import teamRoutes from './team.routes.js'
import mediaRoutes from './media.routes.js'
import contactRoutes from './contact.routes.js'

const router = Router()

// Route de santé : permet de vérifier rapidement que l'API est opérationnelle
router.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Horloge Prophétique API', version: '1.0' })
})

// Montage de tous les sous-routeurs sous leurs préfixes respectifs
router.use('/auth', authRoutes)
router.use('/podcasts', podcastRoutes)
router.use('/prayer-requests', prayerRequestRoutes)
router.use('/prayer-topics', prayerTopicRoutes)
router.use('/newsletter', newsletterRoutes)
router.use('/books', bookRoutes)
router.use('/donations', donationRoutes)
router.use('/admin', adminRoutes)
router.use('/team', teamRoutes)
router.use('/medias', mediaRoutes)
router.use('/contact', contactRoutes)

export default router
