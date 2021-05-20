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

}

export default new PassageKit()