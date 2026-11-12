import prisma from '../lib/prisma.js'

// Retourne tous les membres triés par leur ordre d'affichage.
export const getAllTeamMembers = () =>
  prisma.teamMember.findMany({ orderBy: { ordre: 'asc' } })

export const getTeamMemberById = (memberId) =>
  prisma.teamMember.findUnique({ where: { memberId } })

export const createTeamMember = (data) =>
  prisma.teamMember.create({ data })

export const updateTeamMember = (memberId, data) =>
  prisma.teamMember.update({ where: { memberId }, data })

export const deleteTeamMember = (memberId) =>
  prisma.teamMember.delete({ where: { memberId } })
