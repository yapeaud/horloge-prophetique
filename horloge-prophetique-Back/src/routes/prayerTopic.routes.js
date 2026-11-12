import { Router } from 'express'
import { getAll, getOne, create, update, remove } from '../controllers/prayerTopic.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'

const router = Router()

// GET / accepte un query param ?type= pour filtrer par HEBDOMADAIRE/MENSUEL/CONTINENTAL.
router.get('/', getAll)
router.get('/:id', getOne)

// Création et modification réservées à l'admin.
router.post('/', protect, requireAdmin, create)
router.put('/:id', protect, requireAdmin, update)
router.delete('/:id', protect, requireAdmin, remove)

export default router
