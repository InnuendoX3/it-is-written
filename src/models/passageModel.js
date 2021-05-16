const mongoose = require('mongoose')

const passageSquema = new mongoose.Schema({
  content:    { type: String, required: true },
  reference:  { type: String, required: true },
  bible:      { type: String, required: true },
  language:   Number,  // 1=English, 2=Spanish
  user:       String,
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

const getPassages = async (query) => {
  return await Passage.find(query)
    .then( data => data)
    .catch( error => {
      console.log(error)
      throw new Error(error)
    })
}

const deletePassage = async (passageId) => {
  const query = {_id: passageId}
  return await Passage.deleteOne(query)
    .then( data => data)
    .catch( error => {
      console.log(error)
      throw new Error(error)
    })
}

const getRandomPassage = async (language) => {
  const query = { isRandom: true, language: language }
  const count = await Passage.countDocuments(query)
  const randomNumber = Math.floor(Math.random() * count)
  return await Passage.findOne(query).skip(randomNumber)
    .then( data => {
      console.log('data', data)
      return data
    })
    .catch( error => {
      console.log(error)
      throw new Error(error)
    })
}

module.exports = {
  savePassage,
  getPassages,
  deletePassage,
  getRandomPassage
}