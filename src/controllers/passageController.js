const passageModel = require ('../models/passageModel')
const { responseHandler, errorResponse } = require('./responseHandler')

const addFavouritePassage = async (req, res) => {
  responseHandler(res, async() => {
    const passage = {
      ...req.body,
      isFavourite: true
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
  responseHandler(res, async () => {
    const query = { isFavourite: true }
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

module.exports = {
  addFavouritePassage,
  getFavouritePassages,
  deletePassage,
  createRandomPassages,
  getAllRandomPassages
}