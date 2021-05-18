const { errorResponse } = require('../controllers/responseHandler')
const userModel = require('../models/userModel')

const authenticate = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(403).json({message: 'Unauthorized. Log in!'})

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

const isAdmin = async (req, res, next) => {
  const user = req.user
  const isAdmin = user.role === 'admin'
  if (!isAdmin) return res.status(401).json({message: 'Access denied! Admin only'})

  next()
}

module.exports = {
  authenticate,
  isAdmin
}