const mongoose = require('mongoose')

const passageSquema = new mongoose.Schema({
  passage: String,
  reference: String,
  bible: String
})

const Passage = mongoose.model('Passage', passageSquema)

exports.createPassage = async passage => {
  const doc = await Passage.create({
    passage: passage.content,
    reference: passage.reference,
    bible: passage.bible
  })

  return doc
}