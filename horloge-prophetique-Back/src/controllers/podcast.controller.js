import * as podcastService from '../services/podcast.service.js'

// Liste tous les podcasts (accès public).
export const getAll = async (req, res, next) => {
  try {
    const podcasts = await podcastService.getAllPodcasts()
    res.json(podcasts)
  } catch (err) { next(err) }
}

// Retourne un podcast par son UUID public. 404 si introuvable.
export const getOne = async (req, res, next) => {
  try {
    const podcast = await podcastService.getPodcastById(req.params.id)
    if (!podcast) return res.status(404).json({ message: 'Podcast introuvable' })
    res.json(podcast)
  } catch (err) { next(err) }
}

// Crée un nouveau podcast (admin uniquement). Répond 201 Created.
export const create = async (req, res, next) => {
  try {
    const podcast = await podcastService.createPodcast(req.body)
    res.status(201).json(podcast)
  } catch (err) { next(err) }
}

// Met à jour un podcast existant par son UUID.
export const update = async (req, res, next) => {
  try {
    const podcast = await podcastService.updatePodcast(req.params.id, req.body)
    res.json(podcast)
  } catch (err) { next(err) }
}

// Supprime un podcast. Répond 204 No Content (corps vide).
export const remove = async (req, res, next) => {
  try {
    await podcastService.deletePodcast(req.params.id)
    res.status(204).send()
  } catch (err) { next(err) }
}
