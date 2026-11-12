import { Router } from 'express'
import { getAll, getOne, create, update, remove } from '../controllers/book.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'

const router = Router()

// Catalogue public — lecture libre.
router.get('/', getAll)
router.get('/:id', getOne)

// Gestion du catalogue réservée à l'admin.
router.post('/', protect, requireAdmin, create)
router.put('/:id', protect, requireAdmin, update)
router.delete('/:id', protect, requireAdmin, remove)

export default router
