import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'

import router from './routes/index.js'
import { errorHandler } from './middlewares/error.middleware.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// crossOriginResourcePolicy à "cross-origin" pour permettre au frontend (origine différente)
// de charger les images hébergées dans /uploads.
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

// CORS : autorise uniquement le frontend défini dans .env à communiquer avec l'API.
// credentials: true est requis pour transmettre les cookies ou l'en-tête Authorization.
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

// Sert les fichiers uploadés (photos d'équipe…) en accès public.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Journalisation des requêtes HTTP en mode développement
app.use(morgan('dev'))

// Permet de lire les corps de requêtes au format JSON et URL-encoded (formulaires)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Toutes les routes de l'API sont préfixées par /api
app.use('/', router)

// Gestionnaire d'erreurs global — doit être déclaré en DERNIER pour intercepter
// les erreurs transmises via next(err) depuis les controllers
app.use(errorHandler)

export default app
