import { sendContactEmail } from '../services/contact.service.js'

export const sendMessage = async (req, res, next) => {
  try {
    const { nom, email, sujet, message } = req.body

    if (!nom || !email || !sujet || !message) {
      return res.status(400).json({ message: 'Tous les champs sont requis.' })
    }

    await sendContactEmail({ nom, email, sujet, message })

    res.json({ message: 'Message envoyé avec succès.' })
  } catch (err) {
    next(err)
  }
}
