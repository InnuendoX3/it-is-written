import axios from 'axios'

class PassageKit {
  JWT_TOKEN = 'JWT_TOKEN'

  getPrivateHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${this.loadToken()}`
      }
    }
  }

  getPublicHeaders() {
    return {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  loadToken() {
    return sessionStorage.getItem(this.JWT_TOKEN)
  }

  async getFavourite(id) {
    const url = `api/passages/${id}`
    const headers = this.getPrivateHeaders()

    return axios.get(url, headers)
      .then( res => res)
      .catch( error => {
        throw error
      })
  }

  async saveFavourite(passage) {
    const url = 'api/passages'
    const headers = this.getPrivateHeaders()
    
    return axios.post(url, passage, headers)
      .then( res => res)
      .catch( error => {
        throw error
      })
  }

  async deleteFavourite(passageId) {
    const url = `api/passages/${passageId}`
    const headers = this.getPrivateHeaders()
    
    return axios.delete(url, headers)
      .then( res => res)
      .catch( error => {
        throw error
      })
  }

  async compareTexts(passage, userText) {
    const url = `/api/texts/compare`
    const body = { 
      bibleText: passage.content,
      userText: userText
     }
    
    return axios.post(url, body)
      .then( res => res.data)
      .catch( error => console.log(error))
  }

  async setDiffResult(passageId, result) {
    const url = `/api/passages/${passageId}`
    const resultData = { passageDiffResult: result}
    const headers = this.getPrivateHeaders()

    return axios.patch(url, resultData, headers)
      .then( res => res)
      .catch( error => {
        throw error
      })
  }

  async getFavouriteList() {
    const url= 'api/passages'
    const headers = this.getPrivateHeaders()

    return axios.get(url, headers)
      .then( res => res)
      .catch( error => {
        throw error
      })
  }

  async saveRandom(passage) {
    const url = 'api/passages/random'
    const headers = this.getPrivateHeaders()
    
    return axios.post(url, passage, headers)
      .then( res => res)
      .catch( error => {
        throw error
      })
  }

  async getRandom(languageId) {
    const url = `/api/passages/random/passage/?language=${languageId}`
    const headers = this.getPublicHeaders()

    return axios.get(url, headers)
      .then( res => res )
      .catch( error => {
        throw error
      })
  }

  /* Bible content: Bibles, Books, Chapters and Verses */
  async getBibles() {
    const url = '/api/bibles'
    const headers = this.getPublicHeaders()

    return axios.get(url, headers)
      .then( res => res )
      .catch( error => {
        throw error
      })  
  }
  
  async getBooks(bibleAbbr) {
    const url = `/api/bibles/${bibleAbbr}/books/`
    const headers = this.getPublicHeaders()

    return axios.get(url, headers)
      .then( res => res )
      .catch( error => {
        throw error
      })  
  }

  
  async getChapters(bibleAbbr, bookId) {
    const url = `/api/bibles/${bibleAbbr}/books/${bookId}/chapters`
    const headers = this.getPublicHeaders()

    return axios.get(url, headers)
      .then( res => res )
      .catch( error => {
        throw error
      })  
  }
  
  async getVerses(bibleAbbr, chapterId) {
    const url = `/api/bibles/${bibleAbbr}/chapters/${chapterId}/verses`
    const headers = this.getPublicHeaders()

    return axios.get(url, headers)
      .then( res => res )
      .catch( error => {
        throw error
      })  
  }

  async getPassage(bibleAbbr, initialVerseId, finalVerseId) {
    const url = `/api/bibles/${bibleAbbr}/passages/${initialVerseId}-${finalVerseId}`
    const headers = this.getPublicHeaders()

    return axios.get(url, headers)
      .then( res => res )
      .catch( error => {
        throw error
      })  
  }

  isFavourite(passage) {
    if (passage.hasOwnProperty('isFavourite') && passage.isFavourite === true) {
      return true
    }
    return false
  }
  

}

export default new PassageKit()