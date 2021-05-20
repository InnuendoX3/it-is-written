const express = require('express')
const routes = express.Router()

const auth = require('./middlewares/auth')

const externAPIController = require('./controllers/externAPIController')
const passageController = require('./controllers/passageController')
const textController = require('./controllers/textController')
const userController = require('./controllers/userController')

//// Public routes ////
// BibleAPI
routes.get('/bibles', externAPIController.getBibles)
routes.get('/bibles/:bibleAbbr/books', externAPIController.getBooks)
routes.get('/bibles/:bibleAbbr/books/:bookId/chapters', externAPIController.getChapters)
routes.get('/bibles/:bibleAbbr/chapters/:chapterId/verses', externAPIController.getChapterVerses)
routes.get('/bibles/:bibleAbbr/verses/:verseId', externAPIController.getVerse)
routes.get('/bibles/:bibleAbbr/passages/:passageRange', externAPIController.getPassage)
// Random passages
routes.get('/passages/random/passage', passageController.getRandomPassage)
// Compare texts - Diff
routes.post('/texts/compare', textController.compareTexts)
// Users
routes.post('/register', userController.register)
routes.post('/login', userController.login)

//// Admin routes ////
// Random passages
routes.post('/passages/random', auth.authenticate, auth.isAdmin, passageController.createRandomPassage)
routes.get('/passages/random', auth.authenticate, auth.isAdmin , passageController.getRandomPassagesList)
routes.delete('/passages/random/:id', auth.authenticate, auth.isAdmin, passageController.deleteRandomPassage)
// User info
routes.get('/me', auth.authenticate, userController.getMyInfo)

//// Private routes for users ////
// Favourites passages
routes.post('/passages', auth.authenticate, passageController.createFavouritePassage)
routes.get('/passages', auth.authenticate, passageController.getFavouritePassageList)
routes.get('/passages/:id', auth.authenticate, passageController.getFavouritePassage)
routes.delete('/passages/:id', auth.authenticate, passageController.deleteFavouritePassage)
routes.patch('/passages/:id', auth.authenticate, passageController.setPassageDiffResult)



routes.all('*', (_, res) => res.status(404).send('Page Not Found'))


module.exports = routes