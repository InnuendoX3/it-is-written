const express = require('express')

const app = express()
const route = express.Router()


// route
route.get('/bye', function(req, res) {
  res.send('Chaoooo')
})

app.use('/aqui', route)


module.exports = app
