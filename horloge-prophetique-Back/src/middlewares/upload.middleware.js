import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Dossier de destination des photos uploadées.
const UPLOAD_DIR = path.join(__dirname, '../uploads/team')

// Crée le dossier s'il n'existe pas encore (évite une erreur au premier upload).
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  // Nom de fichier unique : timestamp + nombre aléatoire + extension d'origine.
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  },
})

// Rejette les fichiers qui ne sont pas des images.
const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true)
  else cb(new Error('Seules les images sont acceptées (jpeg, png, webp…)'))
}

// Limite à 5 Mo par fichier.
export const uploadPhoto = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('photo') // Le champ FormData doit s'appeler "photo".
