import * as prayerTopicService from '../services/prayerTopic.service.js'

// Liste les sujets de prière. Le query param ?type= (HEBDOMADAIRE/MENSUEL/CONTINENTAL)
// est transmis au service pour filtrage optionnel.
export const getAll = async (req, res, next) => {
  try {
    const topics = await prayerTopicService.getAllPrayerTopics(req.query.type)
    res.json(topics)
  } catch (err) { next(err) }
}

// Retourne un sujet par son UUID. 404 si introuvable.
export const getOne = async (req, res, next) => {
  try {
    const topic = await prayerTopicService.getPrayerTopicById(req.params.id)
    if (!topic) return res.status(404).json({ message: 'Sujet introuvable' })
    res.json(topic)
  } catch (err) { next(err) }
}

// Crée un sujet de prière (admin uniquement).
export const create = async (req, res, next) => {
  try {
    const topic = await prayerTopicService.createPrayerTopic(req.body)
    res.status(201).json(topic)
  } catch (err) { next(err) }
}

// Met à jour un sujet existant.
export const update = async (req, res, next) => {
  try {
    const topic = await prayerTopicService.updatePrayerTopic(req.params.id, req.body)
    res.json(topic)
  } catch (err) { next(err) }
}

// Supprime un sujet de prière.
export const remove = async (req, res, next) => {
  try {
    await prayerTopicService.deletePrayerTopic(req.params.id)
    res.status(204).send()
  } catch (err) { next(err) }
}
