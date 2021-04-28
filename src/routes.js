const express = require('express')
const routes = express.Router()

const ExternAPIController = require('./controllers/ExternAPIController')

routes.get('/bibles', ExternAPIController.getBibles)
routes.get('/bibles/:bibleAbbr/books', ExternAPIController.getBooks)
routes.get('/bibles/:bibleAbbr/books/:bookId/chapters', ExternAPIController.getChapters)
routes.get('/bibles/:bibleAbbr/chapters/:chapterId/verses', ExternAPIController.getChapterVerses)
routes.get('/bibles/:bibleAbbr/verses/:verseId', ExternAPIController.getVerse)
routes.get('/bibles/:bibleAbbr/passages/:passageRange', ExternAPIController.getPassage)

routes.all('*', (_, res) => res.status(404).send('Page Not Found'))


module.exports = routes