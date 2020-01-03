# Service web simple basé sur ExpressJs

Documentations :
- https://expressjs.com/fr/
- https://www.npmjs.com/

## Création du package NPM

`npm` est la commande du gestionnaire de packages de node.

1. Dans le terminal, créer un nouveau dossier et y entrer :

```bash
mkdir service-web && cd service-web
```

2. Créer ensuite le fichier descriptif du package en tapant la commande :

```bash
npm init
```

Et répondre à votre guise aux questions posées dans le terminal.

A l'issue du questionnaire, un fichier `package.json` est créer dans le dossier.

3. Ajouter ensuite la dépendance expressjs :

```bash
npm install express
```

Un dossier `node_modules` doit apparaitre dans le dossier. Il contient les sources de toutes les dépendances de notre package.

4. Créer un dossier `src`

```bash
mkdir src
```

5. Dans ce dossier `src`, créer un fichier `app.js` et y insérer le code suivant :

```js
const express = require('express')
const app = express()

app.get('/ping', function(request, response) {
  response.send('pong')
})

// routes ici

app.listen(8080, function() {
  console.log('Serveur démarré sur le port 8080')
})
```

6. Dernière étape, dans le fichier `package.json`, ajouter le script suivant permettant de démarrer le service web :

> Le script `test` existant peut être supprimé. Il est créé par défaut au moment du npm init mais est inutile dans notre cas.

```json
"scripts": {
  "serve": "node src/app.js"
},
```

**Vous y êtes !**

## Démarrer le service web

Pour démarrer le service web, dans le dossier du package, taper la commande :

```bash
npm run serve
```

La console doit afficher le message :

```bash
Serveur démarré sur le port 8080
```

**Le service web est démarré !**

Dans le navigateur, entrer l'url `http://localhost:8080/ping`. Le message `pong` devrait apparaitre.

Votre service web est prêt à l'emploi.

## Mettre le package sur Git

Avant de mettre le projet sur Git, il faut ignorer le dossier `node_modules` car il peut être recréé grâce au `package.json` et au dépôt npm.

Ajouter dans votre package, au même niveau que le fichier `package.json` un nouveau fichier `.gitignore` contenant les lignes

```bash
node_modules
```

> Noter bien le . en début de fichier !

Ainsi le dossier `node_modules` sera ignoré par Git.

## Réinstaller les dépendances du package après un git clone

Une fois le package créé, toutes les dépendances peuvent être réinstallées automatiquement en tapant dans le dossier la commande :

```bash
npm install
```

Toutes les dépendances seront téléchargées à nouveau dans le dossier `node_modules`.

> C'est la première chose à faire après avoir cloné le projet depuis le dépôt git.
