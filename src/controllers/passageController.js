const passageModel = require ('../models/passageModel')
const { responseHandler } = require('./responseHandler')

const savePassage = async (req, res) => {
  responseHandler(res, async() => {
    const passage = req.body
    const doc = await passageModel.savePassage(passage)
    const body = {
      message: 'Passage added as favourite',
      body: doc
    }
    const response = {
      status: 201,
      body
    }

    return response
  })
  


/*   await passageModel.savePassage(passage)
    .then( doc => {
      const response = {
        message: 'Passage added as favourite',
        body: doc
      }      
      res.status(201).json(response)
    })
    .catch(error => {
      console.log(error)
      res.status(400).send(error)
    }) */
}

module.exports = {
  savePassage
}