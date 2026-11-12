import { Router } from 'express'
import { protect } from '../middlewares/auth.middleware.js'
import { requireAdmin } from '../middlewares/role.middleware.js'
import { uploadPhoto } from '../middlewares/upload.middleware.js'
import * as teamController from '../controllers/team.controller.js'

const router = Router()

// Lecture publique — tout visiteur peut voir l'équipe.
router.get('/', teamController.getAll)
router.get('/:id', teamController.getOne)

// Écriture réservée aux admins.
// uploadPhoto (multer) est appliqué avant le controller pour parser le multipart/form-data.
router.post('/', protect, requireAdmin, uploadPhoto, teamController.create)
router.put('/:id', protect, requireAdmin, uploadPhoto, teamController.update)
router.delete('/:id', protect, requireAdmin, teamController.remove)

export default router
