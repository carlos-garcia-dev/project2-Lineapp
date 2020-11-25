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




//crear evento

router.get('/new-events', (req, res) => res.render('partner/new-event'))

router.post('/new-events', (req, res) => {

  const { name, description, duration, date, genre, location, partner, active } = req.body

  Events
    .create({ name, description, duration, date, genre, location, partner, active })
    .then(() => res.redirect('/events'))
    .catch(err => console.log('Error:', err))
})




//borrar evento

router.get('/delete/:id', (req, res) => {
    const eventId = req.params.id
    console.log(eventId)
    Event 
    .findByIdAndDelete(eventId)
    .then(()=> res.redirect('/events'))
    .catch(err=>console.log(err))   
})



router.get('/events/:id', (req, res) => res.render('main/event-details'))



//editar evento

router.get('/edit/:_id', (req, res) => {

  const eventsId = req.params.events_id

  Events
    .findById(eventsId)
    .then(theEvent => res.render('partner/edit-event', theEvent))
    .catch(err => console.log(err))

})

router.post('/edit-events', (req, res) => {

  const eventsId = req.params.events_id

  const { name, description, duration, date, genre, location, partner, active } = req.body

  Events
    .findByIdAndUpdate(eventsId, { name, description, duration, date, genre, location, partner, active})
    .then(theEvent => res.redirect('/events'))
    .catch(err => console.log(err))
})







//About
router.get('/about', (req, res) => res.render('main/about'))














module.exports = router