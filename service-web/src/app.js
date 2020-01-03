const express = require('express')
const apiRouter = require('./router')
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use('/inscription', apiRouter.router)

app.get('/ping', function(request, response) {
  response.send('pong')
})

// routes ici

app.listen(8080, function() {
  console.log('Serveur démarré sur le port 8080')
})