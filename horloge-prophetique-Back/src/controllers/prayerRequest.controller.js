import * as prayerRequestService from '../services/prayerRequest.service.js'

// Soumet une demande de prière (accès public).
// Validation des champs obligatoires avant d'appeler le service.
export const create = async (req, res, next) => {
  try {
    const { nom, email, sujet } = req.body
    if (!nom || !email || !sujet)
      return res.status(400).json({ message: 'Nom, email et sujet sont requis' })
    const request = await prayerRequestService.createPrayerRequest({ nom, email, sujet })
    res.status(201).json(request)
  } catch (err) { next(err) }
}

// Retourne toutes les demandes de prière (admin uniquement, triées du plus récent).
export const getAll = async (req, res, next) => {
  try {
    const requests = await prayerRequestService.getAllPrayerRequests()
    res.json(requests)
  } catch (err) { next(err) }
}

// Met à jour le statut d'une demande (EN_ATTENTE → TRAITE → ARCHIVE).
export const updateStatus = async (req, res, next) => {
  try {
    const { statut } = req.body
    const updated = await prayerRequestService.updatePrayerRequestStatus(req.params.id, statut)
    res.json(updated)
  } catch (err) { next(err) }
}

// Supprime définitivement une demande de prière.
export const remove = async (req, res, next) => {
  try {
    await prayerRequestService.deletePrayerRequest(req.params.id)
    res.status(204).send()
  } catch (err) { next(err) }
}
