const bibleAPI = require('../resources/bibleAPI/bibleAPI')

const { BIBLES } = require('../resources/bibleAPI/constans')

const ExternAPIController = () => {

  const _findBibleByAbbreviature = abbr => {
    const bibleFound = BIBLES.find( ({ abbreviation }) => abbreviation === abbr )
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

  const getBibles = (req, res) => {
    const bibles = bibleAPI.getBibles()
    res.status(200).json(bibles) 
  }

  const getBooks = async (req, res) => {
    const bibleAbbr = req.params.bibleAbbr
    const booksFromApi = await bibleAPI.getBibleBooks(bibleAbbr)
    const books = booksFromApi.map( book => ({ id: book.id, name: book.name}))
    const response = {
      bible: _findBibleByAbbreviature(bibleAbbr),
      books: books
    }
    
    res.status(200).json(response)
  }
  
  const getChapters = async (req, res) => {
    const bibleAbbr = req.params.bibleAbbr
    const bookId = req.params.bookId
    const chaptersFromApi = await bibleAPI.getBookChapters(bibleAbbr, bookId)
    const chapters = chaptersFromApi.map( chapter => ({
      id: chapter.id,
      bookId: chapter.bookId,
      number: chapter.number,
      reference: chapter.reference
    }))
    const response = {
      bible: _findBibleByAbbreviature(bibleAbbr),
      chapters: chapters
    }

    res.status(200).json(response)
  }

  const getChapterVerses = async (req, res) => {
    const bibleAbbr = req.params.bibleAbbr
    const chapterId = req.params.chapterId
    const versesFromApi = await bibleAPI.getChapterVerses(bibleAbbr, chapterId)
    const verses = versesFromApi.map( verse => ({
      id: verse.id,
      reference: verse.reference,
      verseNr: _getVerseNr(verse.id)
    }))
    const response = {
      bible: _findBibleByAbbreviature(bibleAbbr),
      verses: verses
    }
    
    res.status(200).json(response)
  }
  
  const getVerse = async (req, res) => {
    const bibleAbbr = req.params.bibleAbbr
    const verseId = req.params.verseId
    const verseFromApi = await bibleAPI.getSingleVerse(bibleAbbr, verseId)
    const verse = {
      id: verseFromApi.id,
      reference: verseFromApi.reference,
      content: verseFromApi.content,
      copyright: verseFromApi.copyright
    }
    const response = {
      bible: _findBibleByAbbreviature(bibleAbbr),
      verse: verse
    }
    
    res.status(200).json(response)
  }
  
  const getPassage = async (req, res) => {
    const bibleAbbr = req.params.bibleAbbr
    const passageRange = req.params.passageRange
    const passageFromApi = await bibleAPI.getPassage(bibleAbbr, passageRange)
    const passage = {
      id: passageFromApi.id,
      reference: passageFromApi.reference,
      content: passageFromApi.content,
      copyright: passageFromApi.copyright
    }
    const response = {
      bible: _findBibleByAbbreviature(bibleAbbr),
      passage: passage
    }

    res.status(200).json(response)
  }

  return {
    getBibles,
    getBooks,
    getChapters,
    getChapterVerses,
    getVerse,
    getPassage
  }
}

module.exports = ExternAPIController()