const { responseHandler } = require('./responseHandler2')

const diffTexts = require('../resources/diffTexts')

const compareTexts = (req, res) => {
  responseHandler(res, () => {
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