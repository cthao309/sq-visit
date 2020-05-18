const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  company: String,
  purpose: String,
  dateOfVisit: Date,
})

mongoose.model('Visitor', visitorSchema)
