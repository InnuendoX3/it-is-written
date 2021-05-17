const express = require('express')

const app = express()
const routes = require('./routes')
//const dbConnect = require('./db')

//dbConnect()

app.use(express.json())
app.use('/api', routes)

app.use('/debugging', (req, res) => {
  res.status(200).send({saludo: 'Hello!'})
})

module.exports = app
