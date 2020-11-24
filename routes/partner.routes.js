const express = require('express')
const router = express.Router()
const passport = require('passport')

const Client = require('./../models/client.model')
const Event = require('./../models/event.model')

const bcrypt = require("bcryptjs")
const bcryptSalt = 10


//SIGNUP

router.get('/signup', (req, res, next) => res.render("partner/signup"))

router.post('/signup', (req, res, next) => {
    const {
        username,
        password
    } = req.body

    if (username === "" || password === "") {
        res.render("partner/signup", {
            errorMsg: "Rellena todos los campos"
        })
        return
    }

    Client
        .findOne({
            username
        })
        .then(client => {
            if (client) {
                res.render("partner/signup", {
                    errorMsg: "Este usuario ya existe"
                })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            Client.create({
                    username,
                    password: hashPass
                })
                .then(() => res.redirect('/'))
                .catch(() => res.render("partner/signup", {
                    errorMsg: "Hubo un error"
                }))
        })
        .catch(error => next(error))
})

//LOGIN 

router.get('/login', (req, res, next) => res.render('partner/login')) //{ errorMsg: req.flash("error") }))
router.post('/partner/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))



router.get('/logout', (req, res) => {
    req.logout()
    res.redirect("/login")
})

router.get('/logout', (req, res) => req.session.destroy((err) => res.redirect("/")))


//CRUD


// router.get('/', (req, res, next) => {
//     Event
//         .find()
//         .populate('partner_id')
//         //.then(allEvents => res.render('partner/index', { events: allEvents}))
//         .then (console.log('id'))
//         .catch(err => next(new Error(err)))
// })


// router.get('/', (req, res, next) => {
//     Partner
//         .find()
//         .then(allPartners => res.render('partner/index', { partner: allPartners}))
//         .catch(err => next(new Error(err)))
// })

// router.get('/events', (req, res) => {

//     Event
//         .find()
//         .then(allEvents => res.render('main/event-list', {
//             allEvents
//         }))
//         .catch(() => res.render("main/event-list", {
//             errorMsg: "Hubo un error"
//         }))
// })





module.exports = router