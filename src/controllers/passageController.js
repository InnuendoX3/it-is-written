const passageModel = require ('../models/passageModel')
const { responseHandler, errorResponse } = require('./responseHandler')

const savePassage = async (req, res) => {
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

const getPassages = async (req, res) => {
  responseHandler(res, async () => {
    const passages = await passageModel.getPassages() // Add later userID to find
    const response = {
      status: 200,
      body: passages
    }

    return response
  })
}

const unfavouritePassage = async (req, res) =>{
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

module.exports = {
  savePassage,
  getPassages,
  unfavouritePassage
}