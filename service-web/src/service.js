/** ----------------------------------------------------------------------------
 * Le service n'est chargé que de manipuler les données
 * dans la base de données (ici un tableau) mais ne connait
 * en aucun cas la requête et la réponse du client.
 * Ceci afin de séparer les domaines de responsabilité des modules :
 * 
 * Router <-> Service
 * 
 * Le router quant à lui, n'est chargé que de s'occuper des requêtes
 * et des réponses du client. Il ne sait pas comment fonctionne le service, 
 * et appelle seulement ses méthodes de manipulation de données.
 * -------------------------------------------------------------------------- */

// simulation de la base de données
// -----------------------------------------------------------------------------
const inscriptiontdb = []

// définition des méthodes de CRUD sur les résultats du tableau
// -----------------------------------------------------------------------------
module.exports.getInscription = function() {
  return inscriptiontdb
}

module.exports.addInscription = function(inscription) {
  inscription.id = Date.now()
  inscriptiontdb.push(inscription)
  return inscription
}

module.exports.updateInscription = function(inscription) {
  const inscriptionInDb = inscriptiontbd.find(function(result) {
    return result.id === inscription.id
  })
  inscriptionInDb.name = inscription.name
  return inscriptionInDb
}

module.exports.deleteInscription = function(inscription) {
  const inscriptionInDb = inscriptiontdb.find(function(result) {
    return result.id === inscription.id
  })
  inscriptiontdb.splice(inscriptiontdb.indexOf(inscriptionInDb), 1)
}