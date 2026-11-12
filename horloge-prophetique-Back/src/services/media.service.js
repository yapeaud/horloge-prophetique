import prisma from '../lib/prisma.js'

export const getAllMedias = () =>
  prisma.media.findMany({ orderBy: { ordre: 'asc' } })

export const getMediaById = (mediaId) =>
  prisma.media.findUnique({ where: { mediaId } })

export const createMedia = (data) =>
  prisma.media.create({ data })

export const updateMedia = (mediaId, data) =>
  prisma.media.update({ where: { mediaId }, data })

export const deleteMedia = (mediaId) =>
  prisma.media.delete({ where: { mediaId } })
