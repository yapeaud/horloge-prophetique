import { Router } from 'express'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'
import * as mediaController from '../controllers/media.controller.js'

const router = Router()

// Lecture publique — la page H-Médias affiche la liste sans authentification.
router.get('/', mediaController.getAll)
router.get('/:id', mediaController.getOne)

// Écriture réservée aux admins.
router.post('/', protect, requireAdmin, mediaController.create)
router.put('/:id', protect, requireAdmin, mediaController.update)
router.delete('/:id', protect, requireAdmin, mediaController.remove)

export default router
