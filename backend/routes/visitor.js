const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()
const Visitor = mongoose.model('Visitor')

/* Get all visitor records */
router.get('/', (req, res) => {
  const queryByDate = req.query.startingDate !== 'null' && req.query.endingDate !== 'null' && req.query.startingDate !== '' && req.query.endingDate !== ''
  const queryByCompany = req.query.company !== 'null' && req.query.company !== ''
  const queryByLastName = req.query.lastName !== 'null' && req.query.lastName !== ''

  if (queryByDate) {
    Visitor.find({
      dateOfVisit:
      {
        $gt: new Date(req.query.startingDate),
        $lt: new Date(req.query.endingDate),
      },
    }, (err, result) => {
      if (err) { return res.json(err) }
      return res.json(result)
    })
  } else if (queryByCompany) {
    Visitor.find({ company: new RegExp(`^${req.query.company}`, 'i') }, (err, result) => {
      if (err) { return res.json(err) }
      return res.json(result)
    })
  } else if (queryByLastName) {
    Visitor.find({ lastName: new RegExp(`^${req.query.lastName}`, 'i') }, (err, result) => {
      if (err) { return res.json(err) }
      return res.json(result)
    })
  } else {
    Visitor.find({}, (err, result) => {
      if (err) return res.json(err)
      return res.json(result)
    })
  }
})

/* Add a new visitor record */
router.post('/', (req, res) => {
  const visitor = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    company: req.body.company,
    purpose: req.body.purpose,
    dateOfVisit: Date.now(),
  }
  Visitor.create(visitor, (err) => {
    if (err) return res.json({ status: 'error', error: err })
    return res.json({ status: 'ok' })
  })
})

module.exports = router
