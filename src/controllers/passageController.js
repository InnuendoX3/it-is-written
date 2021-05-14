const passageModel = require ('../models/passageModel')
const { responseHandler } = require('./responseHandler')

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
    const body = {
      passages
    }
    const response = {
      status: 200,
      body: passages
    }

    return response
  })
}

module.exports = {
  savePassage,
  getPassages
}