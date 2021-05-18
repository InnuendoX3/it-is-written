const mongoose = require('mongoose')

const passageSquema = new mongoose.Schema({
  content:    { type: String, required: true },
  reference:  { type: String, required: true },
  bible:      { type: String, required: true },
  language:   Number,  // 1=English, 2=Spanish
  user:       { type: mongoose.Schema.Types.ObjectId },
  isFavourite:   { type: Boolean, default: false },
  isRandom:   { type: Boolean, default: false }
})

const Passage = mongoose.model('Passage', passageSquema)

const savePassage = async passage => {
  return await Passage.create({
    content:      passage.content,
    reference:    passage.reference,
    bible:        passage.bible,
    language:     passage.language ? passage.language : '',
    user:         passage.user ? passage.user : '',
    isFavourite:  passage.isFavourite ? passage.isFavourite : false,
    isRandom:     passage.isRandom ? passage.isRandom : false
  })
  .then( data => data )
  .catch( error => {
    console.log(error)
    throw new Error(error)
  })
}

const getPassage = async passageId => {
  return await Passage.findOne({_id: passageId})
    .then( data => data)
    .catch( error => {
      console.log(error)
      throw new Error(error)
    })
}

const getPassages = async query => {
  return await Passage.find(query)
    .then( data => data)
    .catch( error => {
      console.log(error)
      throw new Error(error)
    })
}

const deletePassage = async passageId => {
  return await Passage.deleteOne({_id: passageId})
    .then( data => data)
    .catch( error => {
      console.log(error)
      throw new Error(error)
    })
}

const getRandomPassage = async language => {
  const query = { isRandom: true, language: language }
  const count = await Passage.countDocuments(query)
  const randomNumber = Math.floor(Math.random() * count)
  return await Passage.findOne(query).skip(randomNumber)
    .then( data => data)
    .catch( error => {
      console.log(error)
      throw new Error(error)
    })
}

module.exports = {
  savePassage,
  getPassage,
  getPassages,
  deletePassage,
  getRandomPassage
}