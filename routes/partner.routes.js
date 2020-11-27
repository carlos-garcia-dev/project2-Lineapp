const express = require('express')
const router = express.Router()
const passport = require('passport')

const Client = require('./../models/client.model')
const Event = require('./../models/event.model')

const bcrypt = require("bcryptjs")
const {
    isValidObjectId
} = require('mongoose')
const bcryptSalt = 10




//ABOUT
router.get('/about', (req, res, next) => res.render("partner/about"))

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
    successRedirect: "/:partner_id",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))


router.get('/logout', (req, res) => {
    req.logout()
    res.redirect("/login")
})

router.get('/logout', (req, res) => req.session.destroy((err) => res.redirect("/")))


router.get('/:partner_id', (req, res, next) => {
    const partnerId = req.user.id
    const filter = mongoose.Types.ObjectId(partnerId)
    Event
        .find({
            'partner': ObjectId(partnerId)
        })
        // .populate('partner')
        .then(console.log(partnerId))
        .then(allPartnerEvents => res.render('partner/index', {
            allPartnerEvents
        }))
        .find({
            partner: filter
        })
        .then(allPartnerEvents => res.render('partner/index', {
            allPartnerEvents
        }))
        .catch(err => next(new Error(err)))
})



module.exports = router