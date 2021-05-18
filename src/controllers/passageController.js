const passageModel = require ('../models/passageModel')
const { responseHandler, errorResponse } = require('./responseHandler')
const { LANGUAGES } = require('../constants')

const createFavouritePassage = async (req, res) => {
  const userId = req.user.userId
  const passage = {
    ...req.body,
    isFavourite: true,
    user: userId
  }

  responseHandler(res, async() => {
    const passageSaved = await passageModel.savePassage(passage)
    const body = {
      message: 'Passage saved as favourite',
      body: passageSaved
    }
    const response = {
      status: 201,
      body
    }

    return response
  })
}

const getFavouritePassageList = async (req, res) => {
  const userId = req.user.userId
  const query = { isFavourite: true, user: userId }

  responseHandler(res, async () => {
    const passages = await passageModel.getPassages(query) // Add later userID to find
    const response = {
      status: 200,
      body: passages
    }

    return response
  })
}

const deleteFavouritePassage = async (req, res) =>{
  const passageId = req.params.id
  const userId = req.user.userId

  responseHandler(res, async () => {
    const passageFound = await passageModel.getPassage(passageId)
    if(passageFound.user != userId) throw errorResponse(401, 'User does not own this passage.')
  
    const deleteResponse = await passageModel.deletePassage(passageId)
    if (!deleteResponse.deletedCount) throw errorResponse(400, 'Passage not found') 

    const body = { message: 'Passage deleted' }

    const response = {
      status: 200,
      body
    }

    return response
  })
}


//// Random Pasages ////

const createRandomPassage = async (req, res) => {
  const userId = req.user.userId
  const passage = {
    ...req.body,
    user: userId,
    isRandom: true
  }

  responseHandler(res, async() => {
    const passageSaved = await passageModel.savePassage(passage)
    const body = {
      message: 'Random passage created',
      body: passageSaved
    }
    const response = {
      status: 201,
      body
    }

    return response
  })
}

const getRandomPassagesList = async (req, res) => {
  const query = { isRandom: true }

  responseHandler(res, async () => {
    const passages = await passageModel.getPassages(query)
    const response = {
      status: 200,
      body: passages
    }

    return response
  })
}

const getRandomPassage = async (req, res) => {
  const langExists = LANGUAGES.find( ({id}) => id == req.query.language )
  const language = langExists ? parseInt(req.query.language) : 1 // Default English

  responseHandler(res, async () => {
    const passage = await passageModel.getRandomPassage(language)
    const response = {
      status: 200,
      body: passage
    }

    return response
  })
}

const deleteRandomPassage = async (req, res) => {
  const passageId = req.params.id

  responseHandler(res, async () => {
    const passageFound = await passageModel.getPassage(passageId)
    if ( !passageFound.isRandom ) throw errorResponse(400, 'This is not a random passage')

    const deleteResponse = await passageModel.deletePassage(passageId)
    if ( !deleteResponse.deletedCount ) throw errorResponse(400, 'Passage not found')

    const body = { message: 'Random passage deleted' }

    const response = {
      status: 200,
      body
    }

    return response
  })
}

module.exports = {
  createFavouritePassage,
  getFavouritePassageList,
  deleteFavouritePassage,
  createRandomPassage,
  getRandomPassagesList,
  getRandomPassage,
  deleteRandomPassage
}