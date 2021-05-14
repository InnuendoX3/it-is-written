const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { errorResponse } = require('../controllers/responseHandler')

const userSquema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true}
})

const User = mongoose.model('User', userSquema)

const createUser = async userData => {
  const userToSave = {
    username: userData.username,
    email: userData.email,
    password: bcrypt.hashSync(userData.password, 10)
  }

  const userExists = await User.findOne({ email: userToSave.email })

  if(userExists) throw errorResponse(400, 'User already exists')

  return User.create(userToSave)
    .then( data => data)
    .catch( error => {
      console.log(error)
      throw new Error(error)
    })
}

module.exports = {
  createUser,
}