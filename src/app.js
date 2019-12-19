const express = require('express')
const app = express()

app.get('/ping', function(request, response) {
  response.send('pong')
})

// routes ici

app.listen(8080, function() {
  console.log('Serveur démarré sur le port 8080')
})