import * as newsletterService from '../services/newsletter.service.js'

/**
 * Abonne un utilisateur à la newsletter.
 * Gère spécifiquement l'erreur P2002 de Prisma (violation de contrainte unique)
 * qui survient quand l'email est déjà présent dans la base.
 */
export const subscribe = async (req, res, next) => {
  try {
    const { prenom, email } = req.body
    if (!prenom || !email)
      return res.status(400).json({ message: 'Prénom et email sont requis' })

    const subscriber = await newsletterService.subscribe({ prenom, email })
    res.status(201).json(subscriber)
  } catch (err) {
    // P2002 = code Prisma pour "Unique constraint failed" (email déjà abonné)
    if (err.code === 'P2002') {
      return res.status(409).json({ message: 'Cet email est déjà abonné' })
    }
    next(err)
  }
}

/** Retourne la liste de tous les abonnés (accès admin uniquement) */
export const getAll = async (req, res, next) => {
  try {
    const subscribers = await newsletterService.getAllSubscribers()
    res.json(subscribers)
  } catch (err) { next(err) }
}

/** Désabonne un utilisateur par son UUID (subscriberId) */
export const unsubscribe = async (req, res, next) => {
  try {
    await newsletterService.unsubscribe(req.params.id)
    // 204 No Content : succès sans corps de réponse
    res.status(204).send()
  } catch (err) { next(err) }
}

/**
 * Génère et envoie un fichier CSV de tous les abonnés.
 * Les en-têtes forcent le navigateur à télécharger le fichier.
 */
export const exportCSV = async (req, res, next) => {
  try {
    const csv = await newsletterService.exportSubscribersCSV()
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv')
    res.send(csv)
  } catch (err) { next(err) }
}
