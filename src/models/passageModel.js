const mongoose = require('mongoose')

const passageSquema = new mongoose.Schema({
  content:    { type: String, required: true },
  reference:  { type: String, required: true },
  bible:      { type: String, required: true },
  language:   String,
  user:       String,
  isRandom:   { type: Boolean, default: false }
})

const Passage = mongoose.model('Passage', passageSquema)

const savePassage = async passage => {
  const doc = await Passage.create({
    content: passage.content,
    reference: passage.reference,
    bible: passage.bible,
    language: passage.language ? passage.language : '',
    user: passage.user ? passage.user : '',
    isRandom: passage.random ? passage.random : false
  })

  return doc
}

module.exports = {
  savePassage
}