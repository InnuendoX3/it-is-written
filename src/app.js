const express = require('express')
const { 
  getBibleBooks,
  getBookChapters,
  getChapterVerses,
  getSingleVerse,
  getPassage
} = require('./resources/bibleAPI/bibleAPI')

const app = express()
const route = express.Router()


// route
route.get('/bye', async function(req, res) {
  const bibleBooks = await getBibleBooks('RVR09')
  const bookChapters = await getBookChapters('RVR09', 'LEV')
  const chapterVerses = await getChapterVerses('RVR09', 'DEU.1')
  const singleVerse = await getSingleVerse('RVR09', 'ACT.1.1')
  const passage = await getPassage('RVR09', 'MAT.1.12-MAT.1.20')

  res.json(passage)
})

app.use('/aqui', route)


module.exports = app
