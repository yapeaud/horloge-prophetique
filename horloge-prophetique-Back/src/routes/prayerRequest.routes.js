import { Router } from 'express'
import { create, getAll, updateStatus, remove } from '../controllers/prayerRequest.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'

const router = Router()

// Soumission publique : n'importe qui peut soumettre une demande de prière.
router.post('/', create)

// Gestion admin : consultation, changement de statut et suppression.
router.get('/', protect, requireAdmin, getAll)
router.patch('/:id', protect, requireAdmin, updateStatus)
router.delete('/:id', protect, requireAdmin, remove)

export default router
