const e = require('express')
const express = require('express')
const router = express.Router()

const Event = require('./../models/event.model')

//General Routes
router.get('/about', (req, res) => res.render('main/about'))



// Read event
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


// Create event
router.get('/new-event', (req, res) => res.render('main/event-new'))

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
      location
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
  res.render(eventsId)

  // const eventsId = req.params.events_id


  //  const {
  //    name,
  //    description,
  //    pictureUrl,
  //    duration,
  //    date,
  //    genre,
  //    latitude,
  //    longitude
  //  } = req.body

  // console.log(req.body)






})

module.exports = router