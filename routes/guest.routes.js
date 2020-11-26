const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model')

//General Routes
router.get('/about', (req, res) => res.render('main/about'))



// Read event
router.get('/events', (req, res) => {

  Event
    .find()
    .then(allEvents => res.render('main/event-list', { allEvents }))
    .catch(() => res.render("main/event-list", { errorMsg: "Hubo un error" }))
})


// Create event
router.get('/new-event', (req, res) => res.render('main/event-new'))

router.post('/new-event', (req, res) => {

  const { name, description, duration, date, genre, location, partner, active } = req.body

  Event
    .create({ name, description, duration, date, genre, location, partner, active })
    .then(() => res.redirect('/events'))
    .catch(err => console.log('Error:', err))
})


//Delete event
router.get('/delete/:id', (req, res) => {
  const eventId = req.params.id
  console.log(eventId)

  Event
    .findByIdAndDelete(eventId)
    .then(() => res.redirect('/events'))
    .catch(err => console.log(err))
})



// router.get('/events/:_id', (req, res) => res.render('main/event-edit'))


//Edit event
router.get('/edit/:id', (req, res) => {

  const eventsId = req.query.events_id

  Event
    .findById(eventsId)
    // .then(theEvent => res.send(theEvent))
    .then(theEvent => res.render('main/event-edit', theEvent))
    .catch(err => console.log(err))
})


router.post('/edit/:id', (req, res) => {

  const eventsId = req.query.events_id

  const { name, description, duration, date, genre, location, partner, active } = req.body

  Event
    .findByIdAndUpdate(eventsId, { name, description, duration, date, genre, location, partner, active })
    // .then(res.send({ name, description, duration, date, genre, location, partner, active }))
    .then(theEvent => res.redirect('/events'))
    .catch(err => console.log(err))
})

module.exports = router