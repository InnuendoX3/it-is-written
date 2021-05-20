import axios from 'axios'

class UserKit {
  REGISTER_URL = '/api/register'
  LOGIN_URL = '/api/login'
  ME_URL = '/api/me'

  JWT_TOKEN = 'JWT_TOKEN'

  
  getPublicHeaders() {
    return {
      headers:{ 'Content-Type': 'application/json' }      
    }
  }

  getTokenHeaders() {
    return {
      headers: {
        'authorization': `Bearer ${this.loadToken()}`
      }
    }
  }

  async register(username, email, password) {
    const url = this.REGISTER_URL
    const headers = this.getPublicHeaders()
    const registerInfo = {
      username: username,
      email: email,
      password: password,
      role: 'user'
    }
    
    return axios.post(url, registerInfo, headers)
      .then( data => data)
      .catch( error => {
        throw error
      })
  }

  async login(email, password) {
    const url = this.LOGIN_URL
    const headers = this.getPublicHeaders()
    const loginInfo = {
      email: email,
      password: password
    }

    return axios.post(url, loginInfo, headers)
      .then( data => data)
      .catch( error => {
        throw error
      })

  }

  async getUserInfo() {
    const url = this.ME_URL
    const headers = this.getTokenHeaders()

    return axios(url, headers)
      .then(data => data)
      .catch( error => {
        console.log(error)
      })
  }

  saveToken(token) {
    sessionStorage.setItem(this.JWT_TOKEN, token);
  }

  removeToken() {
    sessionStorage.removeItem(this.JWT_TOKEN)
  }

  loadToken() {
    return sessionStorage.getItem(this.JWT_TOKEN)
  }


}

export default new UserKit()