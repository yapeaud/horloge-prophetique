import { Router } from 'express'
import { sendMessage } from '../controllers/contact.controller.js'

const router = Router()

router.post('/', sendMessage)

export default router
