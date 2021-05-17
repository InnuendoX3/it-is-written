const express = require('express')

const app = express()
const routes = require('./routes')
const dbConnect = require('./db')

//dbConnect()

app.use(express.json())
app.use('/api', routes)

module.exports = app
