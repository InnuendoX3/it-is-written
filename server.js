require('dotenv').config()
const express = require('express')
const path = require('path')

const app = require('./src/app')

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  
  // Set static files from the React app
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}, from index`)
})