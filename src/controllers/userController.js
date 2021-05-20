const userModel = require('../models/userModel')
const { responseHandler } = require("./responseHandler")


const register = async (req, res) => {
  const { username, email, password, role } = req.body
  const userToSignUp = { username, email, password, role}

  responseHandler(res, async () => {
    const userCreated = await userModel.createUser(userToSignUp)
    
    // Log in
    const userLogged = await userModel.login(userCreated.email, password)
    
    const body = {
      message: 'User signed up and logged in!',
      user: userLogged
    }

    const response = {
      status: 200,
      body
    }
    return response
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  responseHandler(res, async () => {
    const userLogged = await userModel.login(email, password)
    const body = {
      message: 'Logged in!',
      user: userLogged
    }
    const response = {
      status: 200,
      body
    }
    return response
  })
}

const getMyInfo = async (req, res) => {
  const userId = req.user.userId
  responseHandler(res, async () => {
    const userInfo = await userModel.getUser(userId)
    const response = {
      status: 200,
      body: userInfo
    }
    return response
  })
}



module.exports = {
  register,
  login,
  getMyInfo
}