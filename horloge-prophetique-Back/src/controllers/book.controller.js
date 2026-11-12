import * as bookService from '../services/book.service.js'

// Liste tous les livres disponibles (accès public).
export const getAll = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks()
    res.json(books)
  } catch (err) { next(err) }
}

// Retourne un livre par son UUID. 404 si introuvable.
export const getOne = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id)
    if (!book) return res.status(404).json({ message: 'Livre introuvable' })
    res.json(book)
  } catch (err) { next(err) }
}

// Ajoute un livre au catalogue (admin uniquement).
export const create = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body)
    res.status(201).json(book)
  } catch (err) { next(err) }
}

// Met à jour les informations d'un livre.
export const update = async (req, res, next) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body)
    res.json(book)
  } catch (err) { next(err) }
}

// Supprime un livre du catalogue.
export const remove = async (req, res, next) => {
  try {
    await bookService.deleteBook(req.params.id)
    res.status(204).send()
  } catch (err) { next(err) }
}
