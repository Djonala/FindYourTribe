/** ----------------------------------------------------------------------------
 * Le router n'est en charge que de la partie requête-réponse des clients.
 * Il appelle seulement les méthodes de manipulation des données sur le service
 * mais ne connait pas la façon dont le service les manipule.
 * Ceci afin de séparer les domaines de responsabilité des modules :
 * 
 * Router <-> Service
 * -------------------------------------------------------------------------- */

// imports des modules nécessaire au router
// -----------------------------------------------------------------------------
const express = require('express')
const inscription = require('./service')

// création du router
// -----------------------------------------------------------------------------
const router = module.exports.router = express.Router()

// définition des routes
// -----------------------------------------------------------------------------
router.get('/', function(request, response) {
  response.send(inscription.getInscription())
})

router.post('/', function(request, response) {
  const newInscription = inscription.addInscription(request.body)
  response.send(newInscription)
})

router.put('/', function(request, response) {
  const updatedInscription = inscription.updateInscription(request.body)
  response.send(updatedInscription)
})

router.delete('/', function(request, response) {
  inscription.deleteInscription(request.body)
  response.sendStatus(204)
})