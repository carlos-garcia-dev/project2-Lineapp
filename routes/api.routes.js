const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model')

// Endpoints
router.get('/events', (req, res) => {

    Event
        .find()
        .then(events => res.json(events))
        .catch(err => next(err))
})

module.exports = router