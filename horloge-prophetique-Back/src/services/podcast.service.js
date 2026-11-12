import prisma from '../lib/prisma.js'

// Note : toutes les opérations par identifiant utilisent `podcastId` (UUID public)
// et non `id` (entier auto-incrémenté), pour ne pas exposer les IDs internes dans l'API.

/** Retourne tous les podcasts triés du plus récent au plus ancien */
export const getAllPodcasts = () => prisma.podcast.findMany({ orderBy: { createdAt: 'desc' } })

/** Retourne un podcast par son UUID public */
export const getPodcastById = (id) => prisma.podcast.findUnique({ where: { podcastId: id } })

/** Crée un nouveau podcast */
export const createPodcast = (data) => prisma.podcast.create({ data })

/** Met à jour un podcast existant par son UUID public */
export const updatePodcast = (id, data) =>
  prisma.podcast.update({ where: { podcastId: id }, data })

/** Supprime un podcast par son UUID public */
export const deletePodcast = (id) => prisma.podcast.delete({ where: { podcastId: id } })
