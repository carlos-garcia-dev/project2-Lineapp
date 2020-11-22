const express = require('express')
const router = express.Router()
const Partner = require('./../models/partner.model.js')
const bcrypt = require("bcryptjs")
const bcryptSalt = 10
const passport = require('passport')


router.get('/signup', (req, res, next) => res.render("partner/signup"))

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password,salt)
    Client
        .create({ username, password:hashPass })
        .then(() => res.render("index", {successMsg:"Registro completado"}))
    .catch(err=>next(err))
})

router.get('/login', (req, res, next) => res.render("partner/login"))
router.get('/register', (req, res, next) => res.render("partner/signup"))



























module.exports = router
