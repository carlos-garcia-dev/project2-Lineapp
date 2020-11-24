const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model')



// Events
router.get('/events', (req, res) => {

    Event
        .find()
        .then(allEvents => res.render('main/event-list', {
            allEvents
        }))
        .catch(() => res.render("main/event-list", {
            errorMsg: "Hubo un error"
        }))
})


router.get('/events/:id', (req, res) => res.render('main/event-details'))




//About
router.get('/about', (req, res) => res.render('main/about'))














module.exports = router