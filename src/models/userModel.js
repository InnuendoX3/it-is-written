const mongoose = require('mongoose')

const userSquema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true },
  password: { type: String, required: true}
})

const User = mongoose.model('User', userSquema)

const createUser = (userData) => {
  const userToSave = {
    username: userData.username,
    email: userData.email,
    password: userData.password
  }

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