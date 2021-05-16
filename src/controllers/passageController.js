const passageModel = require ('../models/passageModel')
const { responseHandler, errorResponse } = require('./responseHandler')

const setFavouritePassage = async (req, res) => {
  responseHandler(res, async() => {
    const passage = req.body
    const passageSaved = await passageModel.savePassage(passage)
    const body = {
      message: 'Passage added as favourite',
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
    const passages = await passageModel.getPassages() // Add later userID to find
    const response = {
      status: 200,
      body: passages
    }

    return response
  })
}

const unsetFavouritePassage = async (req, res) =>{
  responseHandler(res, async () => {
    const passageId = req.params.id  
    const deleteResponse = await passageModel.deletePassage(passageId)

    if (!deleteResponse.deletedCount) throw errorResponse(400, 'Passage not found') 

    const body = { message: 'Passage is no longer a favourite' }

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

module.exports = {
  setFavouritePassage,
  getFavouritePassages,
  unsetFavouritePassage,
  createRandomPassages
}