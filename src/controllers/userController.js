const userModel = require('../models/userModel')
const { responseHandler } = require("./responseHandler")


const signup = async (req, res) => {
  const userToSignUp = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  responseHandler(res, async () => {
    const userCreated = await userModel.createUser(userToSignUp)
    const body = {
      message: 'User signed up',
      user: userCreated
    }
    const response = {
      status: 200,
      body
    }

    return response
  })
}

module.exports = {
  signup
}