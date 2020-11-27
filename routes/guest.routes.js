const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model')

//General Routes
router.get('/about', (req, res) => res.render('main/about'))
router.get('/streaming', (req, res) => res.render('main/streaming'))


// Authenticated
router.get('/', (req, res) => {
  console.log('EL USUARIO CON SESION INCIADA ES:', req.user)
  res.render('index')
})

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('client/login', {
  errorMsg: 'Por favor, inicia sesión'
})






// Read event
router.get('/events', (req, res) => {

  Event
    .find()
    .then(allEvents => {

      console.log({
        allEvents,
        isAdmin: req.user ? req.user.role === 'Admin' : false
      })

      allEvents.forEach(events => events)  

      res.render('main/event-list', {
        allEvents,
        isAdmin: true
      })
    })
    .catch(() => res.render("main/event-list", {
      errorMsg: "Hubo un error"
    }))
})


//Read Details
router.get('/details/:events_id', (req, res) => {

  const eventId = req.params.events_id
  Event
    .findById(eventId)
    .then(theEvent => res.render('main/event-details', theEvent))
    .catch(err => console.log('Error:', err))
})


// Create event
router.get('/new-event', ensureAuthenticated, (req, res) => res.render('main/event-new'))

router.post('/new-event', (req, res) => {

  const {
    name,
    description,
    pictureUrl,
    duration,
    date,
    genre,
    latitude,
    longitude
  } = req.body

  const location = {
    type: 'Point',
    coordinates: [latitude, longitude]
  }

  const eventId = req.query.eventId

  Event
    .create({
      name,
      description,
      pictureUrl,
      duration,
      date,
      genre,
      location,
      partner: req.user._id
    })
    .then(newEvent => res.redirect('/events'))
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


//Edit event
router.get('/edit/:events_id', (req, res) => {

  const eventsId = req.params.events_id

  console.log(eventsId)

  Event
    .findById(eventsId)
    .then(theEvent => {
      const latitude = theEvent.location.coordinates[0]
      const longitude = theEvent.location.coordinates[1]

      res.render('main/event-edit', {
        theEvent,
        latitude,
        longitude
      })
    })
    .catch(err => console.log(err))
})


router.post('/edit/:events_id', (req, res) => {

  const eventsId = req.params.events_id

  const {
    name,
    description,
    pictureUrl,
    duration,
    genre,
    latitude,
    longitude
  } = req.body

  Event
    .findByIdAndUpdate(eventsId, {
      name,
      description,
      pictureUrl,
      duration,
      genre,
      latitude,
      longitude
    }, {
      new: true
    })
    .then(theEvent => res.redirect('/events'))
    .catch(err => console.log(err))






})

module.exports = router