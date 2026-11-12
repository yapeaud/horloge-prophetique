import { Router } from 'express'
import { login, me } from '../controllers/auth.controller.js'
import { protect } from '../middlewares/auth.middleware.js'
import { loginLimiter } from '../middlewares/rateLimit.middleware.js'

const router = Router()

// Le rate limiter est appliqué uniquement sur /login pour contrer les attaques par force brute.
router.post('/login', loginLimiter, login)
// protect vérifie le JWT avant de laisser accéder au profil connecté.
router.get('/me', protect, me)

export default router
