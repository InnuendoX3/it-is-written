import axios from 'axios'

class PassageKit {
  REGISTER_URL = '/api/register'
  LOGIN_URL = '/api/login'
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

  async saveFavourite(passage) {
    const url = 'api/passages'
    const headers = this.getPrivateHeaders()
    
    return axios.post(url, passage, headers)
      .then( data => data)
      .catch( error => {
        throw error
      })
  }
}

export default new PassageKit()