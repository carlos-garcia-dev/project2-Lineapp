const express = require('express')
const router = express.Router()
const passport = require('passport')

const Client = require('./../models/client.model.js')
const Event = require('./../models/event.model')

const bcrypt = require("bcryptjs")
const bcryptSalt = 10

// Authenticated
router.get('/', (req, res) => {
    console.log('EL USUARIO CON SESION INCIADA ES:', req.user)
    res.render('index')
  })
  
  const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('client/login', {
    errorMsg: 'Por favor, inicia sesión'
  })


//Client
//SIGNUP
router.get('/signup', (req, res, next) => res.render("client/signup"))

router.post('/signup', (req, res, next) => {
    const {
        username,
        password
    } = req.body

    if (username === "" || password === "") { //Crear condicional acceso usuario Regex
        res.render("client/signup", {
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
                res.render("client/signup", {
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
                .catch(() => res.render("client/signup", {
                    errorMsg: "Hubo un error"
                }))
        })
        .catch(error => next(error))
})


//LOGIN   
router.get('/login', (req, res, next) => res.render("client/login", {
    errorMsg: req.flash("error")
}))

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect("/login")
})





//Admin
router.get('/management', (req, res) => res.render('admin/login'))


router.post('/management', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})





router.get('/logout', (req, res) => req.session.destroy((err) => res.redirect("/")))
module.exports = router
