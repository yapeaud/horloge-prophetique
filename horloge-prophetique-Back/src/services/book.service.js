import prisma from '../lib/prisma.js'

/** Retourne tous les livres triés du plus récent au plus ancien */
export const getAllBooks = () => prisma.book.findMany({ orderBy: { createdAt: 'desc' } })

/** Retourne un livre par son UUID public */
export const getBookById = (id) => prisma.book.findUnique({ where: { bookId: id } })

/** Crée un nouveau livre dans la librairie */
export const createBook = (data) => prisma.book.create({ data })

/** Met à jour les informations d'un livre par son UUID public */
export const updateBook = (id, data) => prisma.book.update({ where: { bookId: id }, data })

/** Supprime un livre par son UUID public */
export const deleteBook = (id) => prisma.book.delete({ where: { bookId: id } })
