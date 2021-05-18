const express = require('express')
const routes = express.Router()

const auth = require('./middlewares/auth')

const externAPIController = require('./controllers/externAPIController')
const passageController = require('./controllers/passageController')
const textController = require('./controllers/textController')
const userController = require('./controllers/userController')

routes.get('/bibles', externAPIController.getBibles)
routes.get('/bibles/:bibleAbbr/books', externAPIController.getBooks)
routes.get('/bibles/:bibleAbbr/books/:bookId/chapters', externAPIController.getChapters)
routes.get('/bibles/:bibleAbbr/chapters/:chapterId/verses', externAPIController.getChapterVerses)
routes.get('/bibles/:bibleAbbr/verses/:verseId', externAPIController.getVerse)
routes.get('/bibles/:bibleAbbr/passages/:passageRange', externAPIController.getPassage)

// Random passages
routes.get('/passages/random', passageController.getRandomPassage)

// Compare texts - Diff
routes.post('/texts/compare', textController.compareTexts)

// Users
routes.post('/register', userController.register)
routes.post('/login', userController.login)


/// Private routes

// Favourites passages
routes.get('/passages', auth.authenticate, passageController.getFavouritePassages)
routes.post('/passages', auth.authenticate, passageController.addFavouritePassage)
routes.delete('/passages/:id', auth.authenticate, passageController.deletePassage)


/// Admin rountes

// Random passages
routes.post('/passages/random', passageController.createRandomPassages)
routes.get('/passages/random/all', passageController.getAllRandomPassages)

routes.all('*', (_, res) => res.status(404).send('Page Not Found'))


module.exports = routes