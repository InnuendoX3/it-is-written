const express = require('express')
const routes = express.Router()

const externAPIController = require('./controllers/externAPIController')
const textController = require('./controllers/textController')
const passageController = require('./controllers/passageController')

routes.get('/bibles', externAPIController.getBibles)
routes.get('/bibles/:bibleAbbr/books', externAPIController.getBooks)
routes.get('/bibles/:bibleAbbr/books/:bookId/chapters', externAPIController.getChapters)
routes.get('/bibles/:bibleAbbr/chapters/:chapterId/verses', externAPIController.getChapterVerses)
routes.get('/bibles/:bibleAbbr/verses/:verseId', externAPIController.getVerse)
routes.get('/bibles/:bibleAbbr/passages/:passageRange', externAPIController.getPassage)

// Favourites passages
routes.get('/passages')
routes.post('/passages', passageController.savePassage)
routes.delete('/passages/:id')

// Compare texts - Diff
routes.post('/texts/compare', textController.compareTexts)

routes.all('*', (_, res) => res.status(404).send('Page Not Found'))


module.exports = routes