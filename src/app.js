const express = require('express')

const passageModel = require('../src/models/passage')

const app = express()
const routes = require('./routes')
const dbConnect = require('./db')

dbConnect()

app.use(express.json())
app.use('/api', routes)

app.get('/testDB', async (req, res) => {
  const pass = {
    content: 'Amaras al Señor tu Dios con todo tu corazon',
    reference: 'Alguna parte:en:Biblia',
    bible: 'Del Señor'
  }
  const resp = await passageModel.createPassage(pass)
  console.log('resp', resp)
  res.status(200).send(resp)
})


module.exports = app
