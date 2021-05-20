import axios from 'axios'

class User {
  //BASE_URL = '/api'
  JWT_TOKEN = 'JWT_TOKEN'

  async register(username, email, password) {
    const url = '/api/register'
    const headers = {'Content-Type': 'application/json'}
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

  saveToken(token) {
    sessionStorage.setItem(this.JWT_TOKEN, token);
  }

  removeToken() {
    sessionStorage.removeItem(this.JWT_TOKEN)
  }


}

export default new User()