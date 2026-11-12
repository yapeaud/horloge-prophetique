import { Router } from 'express'
import { getAll, getOne, create, update, remove } from '../controllers/podcast.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'

const router = Router()

// Lecture publique — aucun token requis.
router.get('/', getAll)
router.get('/:id', getOne)

// Écriture réservée aux admins — protect + requireAdmin en série.
router.post('/', protect, requireAdmin, create)
router.put('/:id', protect, requireAdmin, update)
router.delete('/:id', protect, requireAdmin, remove)

export default router
