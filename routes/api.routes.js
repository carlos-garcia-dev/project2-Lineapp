const express = require('express')
const router = express.Router()

const Client = require('./../models/client.model')

// Endpoints
router.get('/events', (req, res) => {

    Client
        .find()
        .then(partners=> res.json(partners))
        .catch(err => next(err))
})

module.exports = router