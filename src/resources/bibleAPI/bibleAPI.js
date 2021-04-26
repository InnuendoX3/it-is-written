const axios = require('axios').default

const {BASE_URL, BIBLES} = require('./constans')

const bibleAPI = () => {

  const _getHeaders = () => {
    return { 
      headers: {
        'api-key': process.env.BIBLE_API_KEY
      }
    }
  }

  const _makeAPIRequest = async url => {
    return axios.get(url, _getHeaders())
    .then( response => response.data.data)
    .catch( error => console.error(error))  
  }

  const _getBibleID = bibleAbbr => {
    const bible = BIBLES.find( ({ abbreviation }) => abbreviation === bibleAbbr)
    return bible.id
  }

  const getBibles = () => {
    return BIBLES
  }

  const getBibleBooks = async bibleAbbr => {
    const bibleId = _getBibleID(bibleAbbr)
    const booksUrl = `${BASE_URL}/v1/bibles/${bibleId}/books`

    return _makeAPIRequest(booksUrl)
  }

  const getBookChapters = async (bibleAbbr, bookId) => {
    const bibleId = _getBibleID(bibleAbbr)
    const chaptersUrl = `${BASE_URL}/v1/bibles/${bibleId}/books/${bookId}/chapters`
    
    return _makeAPIRequest(chaptersUrl)
  }

  const getChapterVerses = async (bibleAbbr, chapterId) => {
    const bibleId = _getBibleID(bibleAbbr)
    const chapterVersesURL = `${BASE_URL}/v1/bibles/${bibleId}/chapters/${chapterId}/verses`

    return _makeAPIRequest(chapterVersesURL)
  }

  const getSingleVerse = async (bibleAbbr, verseId) => {
    const bibleId = _getBibleID (bibleAbbr)
    const singleVerseUrl = `${BASE_URL}/v1/bibles/${bibleId}/verses/${verseId}`
    
    return _makeAPIRequest(singleVerseUrl)
  }

  // Passage: range of verses when looking for a grouping (i.e. MAT.1.12-MAT.1.20)
  const getPassage = async (bibleAbbr, versesRange) => {
    const bibleId = _getBibleID (bibleAbbr)
    const passageUrl = `${BASE_URL}/v1/bibles/${bibleId}/passages/${versesRange}`
    
    return _makeAPIRequest(passageUrl)
  }

  return {
    getBibles,
    getBibleBooks,
    getBookChapters,
    getChapterVerses,
    getSingleVerse,
    getPassage
  }

}

module.exports = bibleAPI()