import { Router } from 'express'
import { create, getAll, updateStatus } from '../controllers/donation.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'

const router = Router()

// Soumission publique : un visiteur peut faire un don sans être connecté.
router.post('/', create)

// Historique et gestion du statut réservés à l'admin.
router.get('/', protect, requireAdmin, getAll)
router.patch('/:id', protect, requireAdmin, updateStatus)

export default router
