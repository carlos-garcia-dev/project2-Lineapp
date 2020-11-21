const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => res.render('index'))

// // Events
// router.get('/events', (req, res) => res.render('main/event-list'))
// router.get('/events/:id', (req, res) => res.render('main/event-details'))


// // Hierarchical routing

module.exports = router