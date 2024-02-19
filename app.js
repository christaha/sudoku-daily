const express = require('express')
const boardRouter = require('./routes/board')
var bodyParser = require('body-parser')

// initialize app
const app = express()
const port = 3000

// parse json responses 
app.use(bodyParser.json());

// attach routes to app
app.use('/api/board', boardRouter);


// start the application
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})