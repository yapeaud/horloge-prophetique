import * as donationService from '../services/donation.service.js'

// Enregistre un don (accès public).
// Le paiement effectif (Stripe/PayPal/etc.) est géré côté client ;
// ici on persiste uniquement la trace du don avec statut EN_ATTENTE par défaut.
export const create = async (req, res, next) => {
  try {
    const { montant, moyenPaiement, donorEmail } = req.body
    if (!montant || !donorEmail)
      return res.status(400).json({ message: 'Montant et email sont requis' })
    const donation = await donationService.createDonation({ montant, moyenPaiement, donorEmail })
    res.status(201).json(donation)
  } catch (err) { next(err) }
}

// Retourne l'historique des dons (admin uniquement, tri par date décroissante).
export const getAll = async (req, res, next) => {
  try {
    const donations = await donationService.getAllDonations()
    res.json(donations)
  } catch (err) { next(err) }
}

// Permet à l'admin de faire passer un don de EN_ATTENTE à COMPLETE ou ECHOUE
// après confirmation du prestataire de paiement.
export const updateStatus = async (req, res, next) => {
  try {
    const donation = await donationService.updateDonationStatus(req.params.id, req.body.statut)
    res.json(donation)
  } catch (err) { next(err) }
}
