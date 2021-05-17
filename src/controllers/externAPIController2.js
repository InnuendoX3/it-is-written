const bibleAPI = require('../resources/bibleAPI/bibleAPI')

const { responseHandler } = require('./responseHandler2')
const { cleanCopyrightText, htmlPassageToText } = require('../resources/textFormat')

const { BIBLES } = require('../resources/bibleAPI/bibleConstants')

//// PRIVATE

const _findBibleByAbbreviature = abbr => {
  const bibleFound = BIBLES.find(({ abbreviation }) => abbreviation === abbr)
  const bible = {
    abbreviation: bibleFound.abbreviation,
    name: bibleFound.name
  }

  return bible
}

const _getVerseNr = verseId => {
  const verseIdParts = verseId.split('.') // Example "GEN.3.10"
  return verseIdParts[2]
}

//// PUBLIC

const getBibles = (req, res) => {
  responseHandler(res, () => {
    const bibles = bibleAPI.getBibles().map( bible => {
      return {
        abbreviation: bible.abbreviation,
        name: bible.name,
        language: bible.language
      }
    })

    const response = {
      status: 200,
      body: bibles
    }

    return response
  })
}

const getBooks = async (req, res) => {
  responseHandler(res, async () => {
    const bibleAbbr = req.params.bibleAbbr
    const booksFromApi = await bibleAPI.getBibleBooks(bibleAbbr)
    const books = booksFromApi.map( book => ({ id: book.id, name: book.name }))
    const body = {
      bible: _findBibleByAbbreviature(bibleAbbr),
      books: books
    }

    const response = {
      status: 200,
      body
    }

    return response
  })
}

const getChapters = async (req, res) => {
  responseHandler(res, async () => {
    const bibleAbbr = req.params.bibleAbbr
    const bookId = req.params.bookId
    const chaptersFromApi = await bibleAPI.getBookChapters(bibleAbbr, bookId)
    const chapters = chaptersFromApi.map( chapter => ({
      id: chapter.id,
      bookId: chapter.bookId,
      number: chapter.number,
      reference: chapter.reference
    }))
    const body = {
      bible: _findBibleByAbbreviature(bibleAbbr),
      chapters: chapters
    }

    const response = {
      status: 200,
      body
    }

    return response
  })
}

const getChapterVerses = async (req, res) => {
  responseHandler(res, async () => {
    const bibleAbbr = req.params.bibleAbbr
    const chapterId = req.params.chapterId
    const versesFromApi = await bibleAPI.getChapterVerses(bibleAbbr, chapterId)
    const verses = versesFromApi.map( verse => ({
      id: verse.id,
      reference: verse.reference,
      number: _getVerseNr(verse.id)
    }))
    const body = {
      bible: _findBibleByAbbreviature(bibleAbbr),
      verses: verses
    }

    const response = {
      status: 200,
      body
    }

    return response
  })
}

const getVerse = async (req, res) => {
  responseHandler(res, async () => {
    const bibleAbbr = req.params.bibleAbbr
    const bible = _findBibleByAbbreviature(bibleAbbr)
    const verseId = req.params.verseId
    const verseFromApi = await bibleAPI.getSingleVerse(bibleAbbr, verseId)
    const verse = {
      id: verseFromApi.id,
      reference: verseFromApi.reference,
      content: htmlPassageToText(verseFromApi.content),
      copyright: cleanCopyrightText(verseFromApi.copyright),
      bible: bible.name
    }

    const response = {
      status: 200,
      body: verse
    }

    return response
  })
}

const getPassage = (req, res) => {
  responseHandler(res, async () => {
    const bibleAbbr = req.params.bibleAbbr
    const bible = _findBibleByAbbreviature(bibleAbbr)
    const passageRange = req.params.passageRange
    const passageFromApi = await bibleAPI.getPassage(bibleAbbr, passageRange)
    const passage = {
      verseRange: passageFromApi.id, // Not used on client
      reference: passageFromApi.reference,
      content: htmlPassageToText(passageFromApi.content),
      copyright: cleanCopyrightText(passageFromApi.copyright),
      bible: bible.name
    }

    const response = {
      status: 200,
      body: passage
    }

    return response
  })
}

module.exports = {
  getBibles,
  getBooks,
  getChapters,
  getChapterVerses,
  getVerse,
  getPassage
}
