const userModel = require('../models/userModel')

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) return res.sendStatus(403)

  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = userModel.verifyToken(token)
    console.log('payload', payload)
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json(error)
  }
}

module.exports = {
  authenticate
}