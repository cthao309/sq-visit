/* eslint-disable no-console */
const mongoose = require('mongoose')

const dbURI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI
  : 'mongodb://localhost:27017/sq-visit'
const options = {
  useNewUrlParser: true,
}

mongoose.connect(dbURI, options)

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`)
})


mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`)
})


mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

module.exports = dbURI
