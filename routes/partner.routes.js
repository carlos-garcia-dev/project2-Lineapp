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
//     const PartnerId = req.params._id

//     Event
//         .find(PartnerId)
//         .then(allPartners => res.render('partner/index', {allPartners}))
//         .catch(err => next(new Error(err)))
// })




router.get('/:partner_id', (req, res, next) => {
    const partnerId = req.user.id
    const filter = mongoose.Types.ObjectId(partnerId)
    Event
        .find({partner: filter})
        .then(allPartnerEvents => res.render('partner/index', { allPartnerEvents }))
        .catch(err => next(new Error(err)))
})


// router.get('/new:partner_id', (req, res, next) => {
//     const partnerId = req.user.id
//     const filter = mongoose.Types.ObjectId(partnerId)
    
//     Partner
//     .find({partner: filter})
//     .then(allPartnerEvents => res.render('partner/new-event', { allPartnerEvents }))
//     .catch(err => next(new Error(err)))
// })


// router.post('/new:partner_id', (req, res, next) => {
//   const partnerId = req.user.id
//   const filter = mongoose.Types.ObjectId(partnerId)  
//   const { name, description, duration, date, genre, location, partner, active } = req.body

//     Event
        
//     .create({ name, description, duration, date, genre, location, partner, active, partner_id: partner })
//     .then(() => res.redirect('main/event-list'))
//     .catch(err => next(new Error(err)))
// })



// router.post('/edit:partner_id', (req, res, next) => {
//   const partnerId = req.user.id
//   const filter = mongoose.Types.ObjectId(partnerId)
//   const { name, description, duration, date, genre, location, partner, active  } = req.body

//     Event
//     .findByIdAndUpdate(req.query.id, { name, description, duration, date, genre, location, partner, active, partner_id: partner })
//     .then(() => res.redirect(`/events/${req.query.id}`))
//     .catch(err => next(new Error(err)))
// })


// router.get('/delete:partner_id', (req, res, next) => {
//     const partnerId = req.user.id
//     const filter = mongoose.Types.ObjectId(partnerId)
    
//     Event
//     .findByIdAndDelete(req.query.id)
//     .then(() => res.redirect('/main/event-list'))
//     .catch(err => next(new Error(err)))
// })




module.exports = router