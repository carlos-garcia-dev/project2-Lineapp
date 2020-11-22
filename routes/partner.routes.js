const express = require('express')
const router = express.Router()
const Partner = require('./../models/partner.model.js')
const bcrypt = require("bcryptjs")
const bcryptSalt = 10
const passport = require("passport")


router.get('/signup', (req, res, next) => res.render("partner/signup"))

router.post('/signup', (req, res, next) => {
    const { name, password } = req.body

     if (name === "" || password === "") {
        res.render("partner/signup", { errorMsg: "Rellena todos los campos" })
        return
    }

    Partner
        .findOne({ name })
        .then(partner => {
            if (partner) {
                res.render("partner/signup", { errorMsg: "Este partner ya existe" })
                return
            }

            
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            Partner.create({ name, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(() => res.render("partner/signup", { errorMsg: "Hubo un error" }))
        })
        .catch(error => next(error))
})

router.get('/login', (req, res, next) => res.render("partner/login"))
router.get('/register', (req, res, next) => res.render("partner/signup"))



























module.exports = router
