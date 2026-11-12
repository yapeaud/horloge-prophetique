import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as teamService from '../services/team.service.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Dossier racine des uploads, résolu de façon absolue pour éviter les problèmes de CWD.
const UPLOADS_ROOT = path.join(__dirname, '../uploads')

// Supprime le fichier photo associé au chemin stocké en base (ex : /uploads/team/xxx.jpg).
function removePhotoFile(photoPath) {
  if (!photoPath) return
  const abs = path.join(UPLOADS_ROOT, photoPath.replace('/uploads', ''))
  if (fs.existsSync(abs)) fs.unlinkSync(abs)
}

export const getAll = async (req, res, next) => {
  try {
    res.json(await teamService.getAllTeamMembers())
  } catch (err) {
    next(err)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const member = await teamService.getTeamMemberById(req.params.id)
    if (!member) return res.status(404).json({ message: 'Membre introuvable' })
    res.json(member)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const { nom, poste, description, ordre } = req.body
    // req.file est défini par le middleware multer si une image a été envoyée.
    const photo = req.file ? `/uploads/team/${req.file.filename}` : null
    const member = await teamService.createTeamMember({
      nom,
      poste,
      description: description || null,
      photo,
      ordre: ordre ? parseInt(ordre, 10) : 0,
    })
    res.status(201).json(member)
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const existing = await teamService.getTeamMemberById(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Membre introuvable' })

    const { nom, poste, description, ordre } = req.body
    let photo = existing.photo

    if (req.file) {
      // Supprime l'ancienne photo du disque avant d'enregistrer la nouvelle.
      removePhotoFile(existing.photo)
      photo = `/uploads/team/${req.file.filename}`
    }

    const updated = await teamService.updateTeamMember(req.params.id, {
      nom: nom ?? existing.nom,
      poste: poste ?? existing.poste,
      description: description !== undefined ? description : existing.description,
      photo,
      ordre: ordre !== undefined ? parseInt(ordre, 10) : existing.ordre,
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next) => {
  try {
    const existing = await teamService.getTeamMemberById(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Membre introuvable' })
    removePhotoFile(existing.photo)
    await teamService.deleteTeamMember(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
