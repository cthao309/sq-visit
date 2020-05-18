const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const path = require('path')

// connect to the database and define our models
require('./db/config')
require('./models')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type')
  if (req.method === 'OPTIONS') {
    return res.end()
  }
  return next()
})

// routes
const visitorRouter = require('./routes/visitor')

app.use('/api/v1/visitor', visitorRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)))

module.exports = app
