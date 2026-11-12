import { Router } from 'express'
import { getStats } from '../controllers/admin.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'

const router = Router()

// Statistiques globales : compteurs de toutes les entités pour le Dashboard.
router.get('/stats', protect, requireAdmin, getStats)

export default router
