import { Router } from 'express'
import { subscribe, getAll, unsubscribe, exportCSV } from '../controllers/newsletter.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'

const router = Router()

// Abonnement public — aucun compte requis.
router.post('/subscribe', subscribe)

// Routes admin : consultation, export CSV et désabonnement manuel.
router.get('/subscribers', protect, requireAdmin, getAll)
router.get('/export', protect, requireAdmin, exportCSV)
router.delete('/unsubscribe/:id', protect, requireAdmin, unsubscribe)

export default router
