const passageModel = require ('../models/passageModel')
const { responseHandler, errorResponse } = require('./responseHandler')
const { LANGUAGES } = require('../constants')

const addFavouritePassage = async (req, res) => {
  const userId = req.user.userId

  responseHandler(res, async() => {
    const passage = {
      ...req.body,
      isFavourite: true,
      user: userId
    }
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

const getFavouritePassages = async (req, res) => {
  const userId = req.user.userId

  responseHandler(res, async () => {
    const query = { isFavourite: true, user: userId }
    const passages = await passageModel.getPassages(query) // Add later userID to find
    const response = {
      status: 200,
      body: passages
    }

    return response
  })
}

const deletePassage = async (req, res) =>{
  responseHandler(res, async () => {
    const passageId = req.params.id  
    const deleteResponse = await passageModel.deletePassage(passageId)

    if (!deleteResponse.deletedCount) throw errorResponse(400, 'Passage not found') 

    const body = { message: 'Passage deleted' }

    const response = {
      status: 201,
      body
    }

    return response
  })
}


//// Random Pasages ////

const createRandomPassages = async (req, res) => {
  responseHandler(res, async() => {
    const passage = {
      ...req.body,
      isRandom: true
    }
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

const getAllRandomPassages = async (req, res) => {
  responseHandler(res, async () => {
    const query = { isRandom: true }
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

module.exports = {
  addFavouritePassage,
  getFavouritePassages,
  deletePassage,
  createRandomPassages,
  getAllRandomPassages,
  getRandomPassage
}