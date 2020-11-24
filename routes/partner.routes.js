const express = require('express')
const router = express.Router()
const passport = require('passport')

const Client = require('./../models/client.model.js')

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

module.exports = router