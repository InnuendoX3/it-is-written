const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { errorResponse } = require('../controllers/responseHandler')

const userSquema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true},
  role:     { type: String, required: true} // 'user' or 'admin'
})

const User = mongoose.model('User', userSquema)

// Create user and login at once
const createUser = async userData => {
  if(!userData.password) throw errorResponse(400, 'Password is required')

  const userToSave = {
    username: userData.username,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 10),
    role: userData.role
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

  const token = jwt.sign(
    { userId: userFound._id, username: userFound.username, role: userFound.role },
    process.env.JWT_SECRET,
    { expiresIn: '6h'}
  )

  const userLoggedInfo = {
    tempID: userFound._id,  // TODO: delete, just testing
    username: userFound.username,
    email: userFound.email, 
    role: userFound.role    // TODO: delete? Already sent via token
  }

  const response = {
    token: token,
    user: userLoggedInfo
  }

  return response
}

const verifyToken = token => {
  const validToken = jwt.verify(token, process.env.JWT_SECRET)
  return validToken
}


module.exports = {
  createUser,
  login,
  verifyToken
}