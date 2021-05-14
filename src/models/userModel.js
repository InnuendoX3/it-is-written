const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { errorResponse } = require('../controllers/responseHandler')

const userSquema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true}
})

const User = mongoose.model('User', userSquema)

// Create user and login at once
const createUser = async userData => {
  if(!userData.password) throw errorResponse(400, 'Password is required')

  const userToSave = {
    username: userData.username,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 10)
  }

  const userFound = await User.findOne({ email: userToSave.email })
  if(userFound) throw errorResponse(400, 'User already exists')

  const userCreated = await User.create(userToSave)
  if(!userCreated) throw new Error('Something wrong saving user')

  const userCreatedInfo = {
    username: userCreated.username,
    email: userCreated.email
  }
  return userCreatedInfo
}

const login = async (email, password) => {
  const userFound = await User.findOne({ email: email })
  if(!userFound) throw errorResponse(400, 'Credentials not valid (e)')

  const passMatched = bcrypt.compareSync(password, userFound.password)
  if(!passMatched) throw errorResponse(400, 'Credentials not valid (p)')

  // TODO: return JWT token with some info
  const userLoggedInfo = {
    username: userFound.username,
    email: userFound.email
  }
  return userLoggedInfo
}

module.exports = {
  createUser,
  login
}