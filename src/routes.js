const express = require('express')
const routes = express.Router()

const textController = require('./controllers/textController')
const passageController = require('./controllers/passageController')
const userController = require('../src/controllers/userController')
const externAPIController = require('./controllers/externAPIController')

routes.get('/bibles', externAPIController.getBibles)
routes.get('/bibles/:bibleAbbr/books', externAPIController.getBooks)
routes.get('/bibles/:bibleAbbr/books/:bookId/chapters', externAPIController.getChapters)
routes.get('/bibles/:bibleAbbr/chapters/:chapterId/verses', externAPIController.getChapterVerses)
routes.get('/bibles/:bibleAbbr/verses/:verseId', externAPIController.getVerse)
routes.get('/bibles/:bibleAbbr/passages/:passageRange', externAPIController.getPassage)

// Favourites passages
routes.get('/passages', passageController.getFavouritePassages)
routes.post('/passages', passageController.addFavouritePassage)
routes.delete('/passages/:id', passageController.deletePassage)
// Random passages
routes.get('/passages/random', passageController.getRandomPassage)
routes.post('/passages/random', passageController.createRandomPassages)
routes.get('/passages/random/all', passageController.getAllRandomPassages)


// Compare texts - Diff
routes.post('/texts/compare', textController.compareTexts)

// Users
routes.post('/register', userController.register)
routes.post('/login', userController.login)

routes.all('*', (_, res) => res.status(404).send('Page Not Found'))


module.exports = routes