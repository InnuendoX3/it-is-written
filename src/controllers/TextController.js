const { ResponseHandler } = require('./ResponseHandler')

const diffTexts = require('../resources/diffTexts')

const compareTexts = (req, res) => {
  ResponseHandler(res, () => {
    const bibleText = req.body.bibleText
    const userText = req.body.userText

    const textsComparedResults = diffTexts.compare(bibleText, userText)

    const response = {
      status: 200,
      body: textsComparedResults
    }

    return response
  })

}

module.exports = {
  compareTexts
}