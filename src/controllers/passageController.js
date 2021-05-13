const passageModel = require ('../models/passageModel')

const savePassage = async (req, res) => {
  const passage = req.body
  try {
    const doc = await passageModel.savePassage(passage)
    const response = {
      message: 'Passage added as favourite',
      body: doc
    }

    return res.status(201).json(response)

  } catch (error) {
    return res.status(400).send(error)
  }
}

module.exports = {
  savePassage
}