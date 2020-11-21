const express = require('express')
const router = express.Router()

// Events
router.get('/events', (req, res) => res.render('main/event-list'))
router.get('/events/:id', (req, res) => res.render('main/event-details'))


module.exports = router