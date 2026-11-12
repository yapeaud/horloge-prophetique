import * as mediaService from '../services/media.service.js'

export const getAll = async (req, res, next) => {
  try {
    res.json(await mediaService.getAllMedias())
  } catch (err) {
    next(err)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const media = await mediaService.getMediaById(req.params.id)
    if (!media) return res.status(404).json({ message: 'Média introuvable' })
    res.json(media)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const { titre, tag, description, objectif, icone, ordre } = req.body
    const media = await mediaService.createMedia({
      titre,
      tag,
      description,
      objectif,
      icone: icone || 'Tv',
      ordre: ordre ? parseInt(ordre, 10) : 0,
    })
    res.status(201).json(media)
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const existing = await mediaService.getMediaById(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Média introuvable' })

    const { titre, tag, description, objectif, icone, ordre } = req.body
    const updated = await mediaService.updateMedia(req.params.id, {
      titre: titre ?? existing.titre,
      tag: tag ?? existing.tag,
      description: description ?? existing.description,
      objectif: objectif ?? existing.objectif,
      icone: icone ?? existing.icone,
      ordre: ordre !== undefined ? parseInt(ordre, 10) : existing.ordre,
    })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next) => {
  try {
    const existing = await mediaService.getMediaById(req.params.id)
    if (!existing) return res.status(404).json({ message: 'Média introuvable' })
    await mediaService.deleteMedia(req.params.id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}
